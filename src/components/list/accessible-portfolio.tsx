"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import type { GraphDefinition, PortfolioNode } from "@/types/portfolio";

export function AccessiblePortfolio({
  graph,
  hidden,
  onActivate,
}: {
  graph: GraphDefinition;
  hidden: boolean;
  onActivate: (node: PortfolioNode, origin: HTMLButtonElement) => void;
}) {
  const center = graph.nodes.find((node) => node.id === graph.centerNodeId);
  const children = graph.nodes.filter((node) => node.id !== graph.centerNodeId);

  return (
    <section
      id="portfolio-list"
      className="list-view"
      aria-label={`${graph.title} accessible list view`}
      hidden={hidden}
    >
      <header className="list-view__intro">
        <p className="graph-node__eyebrow">Text portfolio · {graph.layout} map</p>
        <h2 className="list-view__title">{center?.title ?? graph.title}</h2>
        <p>{center?.descriptor ?? graph.description}</p>
      </header>

      <div className="list-view__content" tabIndex={hidden ? -1 : 0}>
        {children.length ? (
          children.map((node) => (
            <details className="list-card" key={node.id}>
              <summary>
                <span className="list-card__heading">
                  <strong>{node.title}</strong>
                  <span>{node.descriptor ?? node.kind.replaceAll("-", " ")}</span>
                </span>
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <div className="list-card__body">
                {node.status ? <span className="status-chip">{node.status}</span> : null}
                {node.proficiency ? (
                  <span className="proficiency-chip">{node.proficiency}</span>
                ) : null}
                {node.detail?.description ? <p>{node.detail.description}</p> : null}
                {node.detail?.sections?.map((section) => (
                  <section key={section.id}>
                    {section.title ? (
                      <h3 className="text-sm font-semibold">{section.title}</h3>
                    ) : null}
                    {section.body ? <p>{section.body}</p> : null}
                    {section.items?.length ? (
                      <ul className="detail-list">
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
                <button
                  type="button"
                  className="list-node-button"
                  onClick={(event) => onActivate(node, event.currentTarget)}
                >
                  {node.childGraphId
                    ? "Open map"
                    : node.action
                      ? node.action.label
                      : "Open details"}
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </div>
            </details>
          ))
        ) : (
          <div className="list-card__body py-6">
            <p>{graph.emptyState?.title ?? "No entries yet"}</p>
            <p>
              {graph.emptyState?.description ?? "Details will be added as they become available."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
