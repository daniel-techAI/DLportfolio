"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { ArrowDownToLine, ArrowUpRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, type MouseEvent } from "react";
import { portfolioData } from "@/data/portfolio";
import type { PortfolioAction, PortfolioNode as PortfolioNodeModel } from "@/types/portfolio";
import { LinkedInProfileBadge } from "@/components/shared/linkedin-profile-badge";
import { PortfolioIconGlyph } from "@/components/shared/icon-map";

export type PortfolioFlowNodeData = {
  item: PortfolioNodeModel;
  isCenter: boolean;
  isActive: boolean;
  isDimmed: boolean;
  childCount: number;
  basePath: string;
  profileAvailable: boolean;
  onActivate: (node: PortfolioNodeModel, origin: HTMLButtonElement) => void;
  onAction: (action: PortfolioAction) => void;
};

export type PortfolioFlowNode = Node<PortfolioFlowNodeData, "portfolio">;

function normalizeStatus(status: string) {
  return status.replaceAll(" ", "-");
}

function statusLabel(status: string) {
  if (status === "in progress") return "Currently studying";
  if (status === "active development") return "Active development";
  if (status === "early-stage product development") return "Early stage";
  return status;
}

export function PortfolioNode({
  data,
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
}: NodeProps<PortfolioFlowNode>) {
  const {
    item,
    isCenter,
    isActive,
    isDimmed,
    childCount,
    basePath,
    profileAvailable,
    onActivate,
    onAction,
  } = data;
  const [portraitFailed, setPortraitFailed] = useState(false);
  const isProfile = item.kind === "profile";
  const isAction = Boolean(item.action);
  const hasChildGraph = Boolean(item.childGraphId);
  const profileImage = portfolioData.identity.profileImage;
  const profileSrc = `${basePath}${profileImage.src}`;

  const classNames = [
    "graph-node",
    isCenter && "graph-node--center",
    isProfile && "graph-node--profile",
    item.kind === "project" && "graph-node--project",
    (item.kind === "credential" || item.kind === "credential-category") && "graph-node--credential",
    item.kind === "timeline" && "graph-node--timeline",
  ]
    .filter(Boolean)
    .join(" ");

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    onActivate(item, event.currentTarget);
  };

  const actionSuffix = item.action?.kind === "download" ? "Download" : "Open";
  const ariaLabel = hasChildGraph
    ? `Open ${item.title} map${childCount ? `, ${childCount} items` : ""}`
    : isAction
      ? `${actionSuffix} ${item.title}`
      : `View details for ${item.title}`;

  return (
    <motion.article
      className={classNames}
      data-active={isActive}
      data-dimmed={isDimmed}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{
        opacity: isDimmed ? 0.2 : 1,
        scale: isActive ? 1.045 : 1,
      }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={false}
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      <motion.button
        type="button"
        className="graph-node__button nodrag nopan"
        data-testid={`node-${item.id}`}
        aria-label={ariaLabel}
        onClick={onClick}
        whileTap={{ scale: 0.985 }}
      >
        <span className="graph-node__topline">
          <span className="graph-node__icon" aria-hidden="true">
            <PortfolioIconGlyph name={item.icon} size={17} strokeWidth={1.65} />
          </span>
          <span className="graph-node__eyebrow">
            {isCenter ? "Current map" : (item.meta?.category ?? item.kind.replaceAll("-", " "))}
          </span>
        </span>

        <span className="graph-node__body">
          {isProfile ? (
            <span className="profile-portrait" aria-hidden="true">
              <span className="profile-portrait__fallback">DL</span>
              {profileAvailable && !portraitFailed && (
                // A native image permits a graceful runtime fallback for a user-supplied public asset.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileSrc}
                  alt=""
                  width={profileImage.width ?? 320}
                  height={profileImage.height ?? 320}
                  onError={() => setPortraitFailed(true)}
                />
              )}
            </span>
          ) : null}
          <span className="graph-node__title">{item.title}</span>
          {item.descriptor ? (
            <span className="graph-node__descriptor">{item.descriptor}</span>
          ) : null}
          {isProfile ? (
            <span className="graph-node__descriptor">
              {portfolioData.identity.location} · {portfolioData.identity.status}
            </span>
          ) : null}
        </span>

        <span className="graph-node__footer">
          <span className="flex flex-wrap items-center gap-1.5">
            {item.status ? (
              <span className="status-chip" data-status={normalizeStatus(item.status)}>
                {statusLabel(item.status)}
              </span>
            ) : null}
            {item.proficiency ? <span className="proficiency-chip">{item.proficiency}</span> : null}
            {childCount > 0 ? (
              <span className="graph-node__count">
                {childCount} {childCount === 1 ? "item" : "items"}
              </span>
            ) : null}
          </span>
          <span aria-hidden="true" className="text-[var(--color-accent-strong)]">
            {item.action?.kind === "download" ? (
              <ArrowDownToLine size={15} />
            ) : item.action?.external ? (
              <ArrowUpRight size={15} />
            ) : (
              <ChevronRight size={15} />
            )}
          </span>
        </span>
      </motion.button>
      {isProfile && isCenter ? (
        <LinkedInProfileBadge
          action={portfolioData.actions.linkedin}
          identity={portfolioData.identity}
          onAction={onAction}
        />
      ) : null}
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={false}
        style={{ opacity: 0, width: 1, height: 1 }}
      />
    </motion.article>
  );
}
