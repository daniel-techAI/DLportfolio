"use client";

import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";
import {
  buildGraphBreadcrumbs,
  getGraphPathTo,
  getParentGraphPath,
  validateGraphPath,
} from "@/lib/graph-navigation";
import { createGraphUrl, parseGraphPathFromSearch, serializeGraphPath } from "@/lib/url-state";
import type { PortfolioAction, PortfolioNode } from "@/types/portfolio";
import { PortfolioCanvas, type PortfolioCanvasHandle } from "@/components/canvas/portfolio-canvas";
import { AccessiblePortfolio } from "@/components/list/accessible-portfolio";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { CanvasControls } from "@/components/navigation/canvas-controls";
import { KeyboardHelpDialog } from "@/components/navigation/keyboard-help-dialog";
import { DetailPanel } from "@/components/panels/detail-panel";
import { BackgroundAtmosphere } from "@/components/shared/background-atmosphere";
import { ClientErrorBoundary } from "@/components/shared/client-error-boundary";

const HISTORY_INDEX_KEY = "__danielPortfolioIndex";
const HISTORY_PATH_KEY = "__danielPortfolioPath";
const LIST_PREFERENCE_KEY = "daniel-portfolio-view";

type HistoryMarker = {
  [HISTORY_INDEX_KEY]?: number;
  [HISTORY_PATH_KEY]?: string;
};

type PortfolioShellProps = {
  basePath: string;
  cvAvailable: boolean;
  profileAvailable: boolean;
};

function samePath(left: readonly string[], right: readonly string[]) {
  return left.length === right.length && left.every((segment, index) => segment === right[index]);
}

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

export function PortfolioShell({ basePath, cvAvailable, profileAvailable }: PortfolioShellProps) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const canvasRef = useRef<PortfolioCanvasHandle>(null);
  const originRef = useRef<HTMLButtonElement | null>(null);
  const transitionTokenRef = useRef(0);
  const historyIndexRef = useRef(0);
  const historyEntriesRef = useRef(new Map<number, string[]>([[0, []]]));
  const [path, setPath] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [detailNode, setDetailNode] = useState<PortfolioNode | null>(null);
  const [listView, setListView] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const resolution = useMemo(
    () => validateGraphPath(path, portfolioData.graphs, portfolioData.rootGraphId),
    [path],
  );
  const graph = resolution.graph;
  const breadcrumbs = useMemo(
    () => buildGraphBreadcrumbs(path, portfolioData.graphs, portfolioData.rootGraphId),
    [path],
  );
  const canGoBack = path.length > 0;

  const announceGraph = useCallback((nextPath: readonly string[], graphId: string) => {
    trackEvent("graph_opened", {
      graphId,
      path: serializeGraphPath(nextPath) || "root",
    });
  }, []);

  const replaceHistory = useCallback(
    (nextPath: readonly string[], index: number) => {
      const nextState: HistoryMarker & Record<string, unknown> = {
        ...(window.history.state ?? {}),
        [HISTORY_INDEX_KEY]: index,
        [HISTORY_PATH_KEY]: serializeGraphPath(nextPath),
      };
      window.history.replaceState(nextState, "", createGraphUrl(nextPath, basePath));
      historyIndexRef.current = index;
      historyEntriesRef.current.set(index, [...nextPath]);
      setPath([...nextPath]);
    },
    [basePath],
  );

  const pushHistory = useCallback(
    (nextPath: readonly string[]) => {
      const nextIndex = historyIndexRef.current + 1;
      const nextState: HistoryMarker & Record<string, unknown> = {
        ...(window.history.state ?? {}),
        [HISTORY_INDEX_KEY]: nextIndex,
        [HISTORY_PATH_KEY]: serializeGraphPath(nextPath),
      };
      window.history.pushState(nextState, "", createGraphUrl(nextPath, basePath));
      historyIndexRef.current = nextIndex;
      for (const storedIndex of historyEntriesRef.current.keys()) {
        if (storedIndex >= nextIndex) historyEntriesRef.current.delete(storedIndex);
      }
      historyEntriesRef.current.set(nextIndex, [...nextPath]);
      setPath([...nextPath]);
    },
    [basePath],
  );

  const focusGraphCenter = useCallback((graphId: string) => {
    const nextGraph = portfolioData.graphs[graphId];
    if (!nextGraph) return;
    window.setTimeout(() => {
      const selector = `[data-testid="node-${CSS.escape(nextGraph.centerNodeId)}"]`;
      document.querySelector<HTMLButtonElement>(selector)?.focus({ preventScroll: true });
    }, 80);
  }, []);

  const settleGraphChange = useCallback(
    async (token: number, graphId: string) => {
      await wait(reducedMotion ? 80 : 280);
      if (token !== transitionTokenRef.current) return;
      setSelectedNodeId(null);
      setTransitioning(false);
      focusGraphCenter(graphId);
    },
    [focusGraphCenter, reducedMotion],
  );

  const navigateToPath = useCallback(
    async (nextPath: readonly string[], mode: "push" | "replace" = "push") => {
      const next = validateGraphPath(nextPath, portfolioData.graphs, portfolioData.rootGraphId);
      const normalizedPath = next.valid ? [...next.path] : [];
      const graphId = next.valid ? next.graphId : portfolioData.rootGraphId;
      const token = ++transitionTokenRef.current;
      setDetailNode(null);
      setTransitioning(true);

      if (mode === "push") pushHistory(normalizedPath);
      else replaceHistory(normalizedPath, historyIndexRef.current);

      announceGraph(normalizedPath, graphId);
      await settleGraphChange(token, graphId);
    },
    [announceGraph, pushHistory, replaceHistory, settleGraphChange],
  );

  useEffect(() => {
    const requestedPath = parseGraphPathFromSearch(window.location.search);
    const initial = validateGraphPath(
      requestedPath,
      portfolioData.graphs,
      portfolioData.rootGraphId,
    );
    const normalized = initial.valid ? [...initial.path] : [];
    const existingState = (window.history.state ?? {}) as HistoryMarker;
    const existingIndex = Number.isInteger(existingState[HISTORY_INDEX_KEY])
      ? (existingState[HISTORY_INDEX_KEY] as number)
      : 0;

    const preference = window.localStorage.getItem(LIST_PREFERENCE_KEY);
    const frame = window.requestAnimationFrame(() => {
      replaceHistory(normalized, existingIndex);
      announceGraph(normalized, initial.valid ? initial.graphId : portfolioData.rootGraphId);
      if (preference === "list") setListView(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [announceGraph, replaceHistory]);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const requested = parseGraphPathFromSearch(window.location.search);
      const next = validateGraphPath(requested, portfolioData.graphs, portfolioData.rootGraphId);
      const normalized = next.valid ? [...next.path] : [];
      const state = (event.state ?? {}) as HistoryMarker;
      const nextIndex = Number.isInteger(state[HISTORY_INDEX_KEY])
        ? (state[HISTORY_INDEX_KEY] as number)
        : 0;
      const token = ++transitionTokenRef.current;

      historyIndexRef.current = nextIndex;
      historyEntriesRef.current.set(nextIndex, normalized);
      setDetailNode(null);
      setSelectedNodeId(null);
      setTransitioning(true);
      setPath(normalized);

      if (!next.valid) {
        replaceHistory([], nextIndex);
      }
      announceGraph(normalized, next.valid ? next.graphId : portfolioData.rootGraphId);
      void settleGraphChange(token, next.valid ? next.graphId : portfolioData.rootGraphId);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [announceGraph, replaceHistory, settleGraphChange]);

  const navigateBack = useCallback(() => {
    if (!path.length) return;
    const parentPath = getParentGraphPath(path);
    const previous = historyEntriesRef.current.get(historyIndexRef.current - 1);

    if (historyIndexRef.current > 0 && previous && samePath(previous, parentPath)) {
      window.history.back();
      return;
    }

    void navigateToPath(parentPath, "replace");
  }, [navigateToPath, path]);

  const navigateHome = useCallback(() => {
    if (path.length) void navigateToPath([], "push");
  }, [navigateToPath, path.length]);

  const trackAction = useCallback((action: PortfolioAction) => {
    switch (action.analyticsEvent) {
      case "cv_downloaded":
        trackEvent("cv_downloaded", { source: "portfolio" });
        break;
      case "linkedin_clicked":
        trackEvent("linkedin_clicked", { source: "portfolio" });
        break;
      case "github_clicked":
        trackEvent("github_clicked", { source: "portfolio" });
        break;
      case "email_clicked":
        trackEvent("email_clicked", { source: "portfolio" });
        break;
      default:
        break;
    }
  }, []);

  const actionAvailable = useCallback(
    (action: PortfolioAction) => {
      if (action.availability === "asset-dependent") return cvAvailable;
      return action.availability === "available" && Boolean(action.href);
    },
    [cvAvailable],
  );

  const runAction = useCallback(
    (action: PortfolioAction) => {
      if (!actionAvailable(action) || !action.href) return false;
      trackAction(action);
      const href = action.kind === "download" ? `${basePath}${action.href}` : action.href;

      if (action.kind === "download") {
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.download = action.download ?? "Daniel_Laky_Remote_Roles_CV.pdf";
        anchor.click();
      } else if (action.external) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
      return true;
    },
    [actionAvailable, basePath, trackAction],
  );

  const openDetails = useCallback((node: PortfolioNode, origin: HTMLButtonElement) => {
    originRef.current = origin;
    setDetailNode(node);
    if (node.kind === "project") {
      trackEvent("project_viewed", { projectId: node.id });
    }
    if (node.kind === "credential") {
      trackEvent("credential_viewed", { credentialId: node.id, status: node.status });
    }
  }, []);

  const closeDetails = useCallback(() => {
    setDetailNode(null);
    window.requestAnimationFrame(() => {
      if (originRef.current?.isConnected) originRef.current.focus({ preventScroll: true });
    });
  }, []);

  const activateNode = useCallback(
    async (node: PortfolioNode, origin: HTMLButtonElement) => {
      if (transitioning) return;
      if (node.childGraphId) {
        const targetPath = getGraphPathTo(
          node.childGraphId,
          portfolioData.graphs,
          portfolioData.rootGraphId,
        );
        if (!targetPath) return;

        if (node.kind === "project") {
          trackEvent("project_viewed", { projectId: node.id });
        }
        setSelectedNodeId(node.id);
        setTransitioning(true);
        const token = ++transitionTokenRef.current;
        await canvasRef.current?.focusNode(node.id, reducedMotion ? 0 : 460);
        if (token !== transitionTokenRef.current) return;
        pushHistory(targetPath);
        announceGraph(targetPath, node.childGraphId);
        await settleGraphChange(token, node.childGraphId);
        return;
      }

      if (node.action && runAction(node.action)) return;
      openDetails(node, origin);
    },
    [
      announceGraph,
      openDetails,
      pushHistory,
      reducedMotion,
      runAction,
      settleGraphChange,
      transitioning,
    ],
  );

  const toggleListView = useCallback(() => {
    setListView((current) => {
      const next = !current;
      window.localStorage.setItem(LIST_PREFERENCE_KEY, next ? "list" : "map");
      if (!next) window.setTimeout(() => canvasRef.current?.fit(), 40);
      return next;
    });
  }, []);

  const openCv = useCallback(() => {
    const cvAction = portfolioData.actions.cv;
    if (cvAvailable) {
      trackAction(cvAction);
      return;
    }
    const cvNode = Object.values(portfolioData.graphs)
      .flatMap((candidate) => candidate.nodes)
      .find((node) => node.action?.id === cvAction.id);
    if (cvNode) {
      originRef.current = document.querySelector<HTMLButtonElement>("[data-testid='cv-download']");
      setDetailNode(cvNode);
    }
  }, [cvAvailable, trackAction]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      if (event.key === "Escape") {
        if (helpOpen) {
          event.preventDefault();
          setHelpOpen(false);
        } else if (detailNode) {
          event.preventDefault();
          closeDetails();
        } else if (path.length) {
          event.preventDefault();
          navigateBack();
        }
      } else if (event.key === "Home") {
        event.preventDefault();
        navigateHome();
      } else if ((event.key === "+" || event.key === "=") && !listView) {
        event.preventDefault();
        canvasRef.current?.zoomIn();
      } else if (event.key === "-" && !listView) {
        event.preventDefault();
        canvasRef.current?.zoomOut();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeDetails, detailNode, helpOpen, listView, navigateBack, navigateHome, path.length]);

  const currentCenter = graph.nodes.find((node) => node.id === graph.centerNodeId);
  const cvHref = portfolioData.actions.cv.href ?? "/documents/Daniel_Laky_Remote_Roles_CV.pdf";

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio-app" data-testid="portfolio-root">
        <a className="skip-link" href="#portfolio-list" onClick={() => setListView(true)}>
          Skip to text portfolio
        </a>
        <BackgroundAtmosphere />

        <header className="portfolio-header">
          <button
            className="brand-mark"
            type="button"
            onClick={navigateHome}
            aria-label="Return to Daniel Laky root map"
          >
            <span className="brand-mark__glyph" aria-hidden="true">
              DL
            </span>
            <span className="brand-mark__label">
              <strong>Daniel Laky</strong>
              <span>Professional identity map</span>
            </span>
          </button>
          <CanvasControls
            canGoBack={canGoBack}
            listView={listView}
            cvAvailable={cvAvailable}
            basePath={basePath}
            cvHref={cvHref}
            onBack={navigateBack}
            onHome={navigateHome}
            onToggleList={toggleListView}
            onHelp={() => setHelpOpen(true)}
            onZoomIn={() => canvasRef.current?.zoomIn()}
            onZoomOut={() => canvasRef.current?.zoomOut()}
            onCv={openCv}
          />
        </header>

        <Breadcrumbs
          items={breadcrumbs.map((item) => ({ ...item, path: [...item.path] }))}
          onNavigate={(nextPath) => void navigateToPath(nextPath)}
        />

        <div aria-hidden={listView ? "true" : undefined} {...(listView ? { inert: true } : {})}>
          <ClientErrorBoundary
            fallback={
              <AccessiblePortfolio graph={graph} hidden={false} onActivate={activateNode} />
            }
          >
            <PortfolioCanvas
              ref={canvasRef}
              graph={graph}
              selectedNodeId={selectedNodeId}
              transitioning={transitioning}
              reducedMotion={reducedMotion}
              basePath={basePath}
              profileAvailable={profileAvailable}
              onActivate={activateNode}
            />
          </ClientErrorBoundary>
        </div>

        <AccessiblePortfolio graph={graph} hidden={!listView} onActivate={activateNode} />

        <div className="canvas-footer" aria-hidden={listView}>
          <p className="canvas-caption">
            Drag to pan · Scroll or pinch to zoom · Select a node to move deeper
          </p>
          <p className="canvas-caption text-right">
            {currentCenter?.title ?? graph.title} · {graph.nodes.length - 1} connected items
          </p>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Current portfolio map: {graph.title}
        </p>

        <AnimatePresence>
          {detailNode ? (
            <DetailPanel
              node={detailNode}
              basePath={basePath}
              cvAvailable={cvAvailable}
              onClose={closeDetails}
              onAction={trackAction}
            />
          ) : null}
        </AnimatePresence>
        <KeyboardHelpDialog open={helpOpen} onClose={() => setHelpOpen(false)} />
      </main>
    </MotionConfig>
  );
}
