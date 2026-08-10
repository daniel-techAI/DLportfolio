"use client";

import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Position,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import { motion } from "motion/react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import type { PortfolioLocale, PortfolioUiCopy } from "@/data/localization";
import { applyGraphLayout } from "@/lib/graph-layout";
import type {
  GraphDefinition,
  PortfolioAction,
  PortfolioNode as PortfolioNodeModel,
  PortfolioSiteData,
} from "@/types/portfolio";
import {
  PortfolioNode,
  type PortfolioFlowNode,
  type PortfolioFlowNodeData,
} from "@/components/nodes/portfolio-node";

export type PortfolioCanvasHandle = {
  fit: (duration?: number) => void;
  focusNode: (nodeId: string, duration?: number) => Promise<void>;
};

type PortfolioCanvasProps = {
  graph: GraphDefinition;
  siteData: PortfolioSiteData;
  locale: PortfolioLocale;
  copy: PortfolioUiCopy;
  selectedNodeId: string | null;
  transitioning: boolean;
  reducedMotion: boolean;
  basePath: string;
  profileAvailable: boolean;
  onActivate: (node: PortfolioNodeModel, origin: HTMLButtonElement) => void;
  onAction: (action: PortfolioAction) => void;
};

const nodeTypes = { portfolio: PortfolioNode };

function dimensionsFor(node: PortfolioNodeModel, isCenter: boolean) {
  if (node.kind === "profile") return { width: 336, height: 368 };
  if (isCenter) return { width: 288, height: 192 };
  if (node.kind === "timeline") return { width: 272, height: 152 };
  if (node.kind === "project" || node.kind.includes("credential")) {
    return { width: 240, height: 148 };
  }
  return { width: 208, height: 116 };
}

function connectionPositions(x: number, y: number, isCenter: boolean) {
  if (isCenter) {
    return { sourcePosition: Position.Bottom, targetPosition: Position.Top };
  }

  if (Math.abs(x) > Math.abs(y)) {
    return x > 0
      ? { sourcePosition: Position.Right, targetPosition: Position.Left }
      : { sourcePosition: Position.Left, targetPosition: Position.Right };
  }

  return y > 0
    ? { sourcePosition: Position.Bottom, targetPosition: Position.Top }
    : { sourcePosition: Position.Top, targetPosition: Position.Bottom };
}

const PortfolioCanvasInner = forwardRef<PortfolioCanvasHandle, PortfolioCanvasProps>(
  function PortfolioCanvasInner(
    {
      graph,
      siteData,
      locale,
      copy,
      selectedNodeId,
      transitioning,
      reducedMotion,
      basePath,
      profileAvailable,
      onActivate,
      onAction,
    },
    ref,
  ) {
    const reactFlow = useReactFlow<PortfolioFlowNode, Edge>();
    const [viewport, setViewport] = useState({ width: 1280, height: 800 });

    useEffect(() => {
      const updateViewport = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      };
      updateViewport();
      window.addEventListener("resize", updateViewport, { passive: true });
      return () => window.removeEventListener("resize", updateViewport);
    }, []);

    const nodes = useMemo<PortfolioFlowNode[]>(() => {
      const inputs = graph.nodes.map((item) => {
        const isCenter = item.id === graph.centerNodeId;
        return {
          ...item,
          ...dimensionsFor(item, isCenter),
          weight: item.meta?.layoutWeight,
        };
      });

      const positioned = applyGraphLayout(inputs, graph.centerNodeId, graph.layout, {
        viewport,
      });

      return positioned.map((item, index) => {
        const isCenter = item.id === graph.centerNodeId;
        const childGraph = item.childGraphId ? siteData.graphs[item.childGraphId] : undefined;
        const childCount =
          item.childCount ??
          (childGraph
            ? childGraph.nodes.filter((child) => child.id !== childGraph.centerNodeId).length
            : 0);
        const positions = connectionPositions(item.position.x, item.position.y, isCenter);
        const data: PortfolioFlowNodeData = {
          item,
          isCenter,
          isActive: selectedNodeId === item.id,
          isDimmed: Boolean(selectedNodeId && selectedNodeId !== item.id),
          childCount,
          basePath,
          profileAvailable,
          identity: siteData.identity,
          linkedInAction: siteData.actions.linkedin,
          locale,
          copy,
          onActivate,
          onAction,
        };

        return {
          id: item.id,
          type: "portfolio",
          position: item.position,
          data,
          draggable: false,
          selectable: false,
          focusable: false,
          sourcePosition: positions.sourcePosition,
          targetPosition: positions.targetPosition,
          zIndex: isCenter ? 2 : 1,
          ariaLabel: `${item.title}${item.descriptor ? ` — ${item.descriptor}` : ""}`,
          style: { animationDelay: `${Math.min(index * 32, 220)}ms` },
        } satisfies PortfolioFlowNode;
      });
    }, [
      basePath,
      copy,
      graph,
      locale,
      onAction,
      onActivate,
      profileAvailable,
      selectedNodeId,
      siteData,
      viewport,
    ]);

    const edges = useMemo<Edge[]>(
      () =>
        graph.edges.map((edge, index) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: "default",
          animated: !reducedMotion && !transitioning,
          focusable: false,
          selectable: false,
          ariaLabel: edge.label,
          style: {
            opacity: selectedNodeId
              ? edge.source === selectedNodeId || edge.target === selectedNodeId
                ? 0.85
                : 0.12
              : 1,
            transitionDelay: `${Math.min(index * 20, 180)}ms`,
          },
        })),
      [graph.edges, reducedMotion, selectedNodeId, transitioning],
    );

    const fit = useCallback(
      (duration = reducedMotion ? 80 : 420) => {
        void reactFlow.fitView({
          padding: viewport.width < 720 ? 0.18 : 0.1,
          minZoom: 0.28,
          maxZoom: viewport.width < 720 ? 0.76 : 1,
          duration,
        });
      },
      [reactFlow, reducedMotion, viewport.width],
    );

    useEffect(() => {
      const frame = window.requestAnimationFrame(() => fit(reducedMotion ? 0 : 420));
      return () => window.cancelAnimationFrame(frame);
    }, [fit, graph.id, reducedMotion]);

    useImperativeHandle(
      ref,
      () => ({
        fit,
        focusNode: async (nodeId, duration = reducedMotion ? 0 : 460) => {
          const node = nodes.find((candidate) => candidate.id === nodeId);
          if (!node) return;
          await reactFlow.setCenter(node.position.x, node.position.y, {
            zoom: viewport.width < 720 ? 0.84 : 1.08,
            duration,
          });
        },
      }),
      [fit, nodes, reactFlow, reducedMotion, viewport.width],
    );

    const preventWrapperActivation: NodeMouseHandler<PortfolioFlowNode> = useCallback(() => {
      // Activation belongs to the semantic button inside each custom node.
    }, []);

    return (
      <motion.div
        className="canvas-shell"
        aria-hidden={false}
        animate={{ opacity: transitioning ? 0.72 : 1 }}
        transition={{ duration: reducedMotion ? 0.08 : 0.2 }}
      >
        <ReactFlow<PortfolioFlowNode, Edge>
          className="portfolio-flow"
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodeOrigin={[0.5, 0.5]}
          minZoom={0.24}
          maxZoom={1.8}
          fitView
          fitViewOptions={{ padding: 0.12, maxZoom: 1 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          panOnDrag
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling
          onlyRenderVisibleElements
          deleteKeyCode={null}
          selectionKeyCode={null}
          multiSelectionKeyCode={null}
          onNodeClick={preventWrapperActivation}
          aria-label={copy.canvas.interactiveMapLabel(graph.title)}
          colorMode="dark"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={54}
            size={0.75}
            color="rgba(243,239,230,0.075)"
          />
        </ReactFlow>
      </motion.div>
    );
  },
);

export const PortfolioCanvas = forwardRef<PortfolioCanvasHandle, PortfolioCanvasProps>(
  function PortfolioCanvas(props, ref) {
    return (
      <ReactFlowProvider>
        <PortfolioCanvasInner {...props} ref={ref} />
      </ReactFlowProvider>
    );
  },
);
