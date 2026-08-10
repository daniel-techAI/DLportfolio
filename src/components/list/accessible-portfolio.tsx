"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import {
  formatPortfolioProficiency,
  formatPortfolioStatus,
  type PortfolioLocale,
  type PortfolioUiCopy,
} from "@/data/localization";
import type {
  GraphDefinition,
  PortfolioAction,
  PortfolioNode,
  PortfolioSiteData,
} from "@/types/portfolio";
import { LinkedInProfileBadge } from "@/components/shared/linkedin-profile-badge";

export function AccessiblePortfolio({
  graph,
  siteData,
  locale,
  copy,
  hidden,
  onActivate,
  onAction,
}: {
  graph: GraphDefinition;
  siteData: PortfolioSiteData;
  locale: PortfolioLocale;
  copy: PortfolioUiCopy;
  hidden: boolean;
  onActivate: (node: PortfolioNode, origin: HTMLButtonElement) => void;
  onAction: (action: PortfolioAction) => void;
}) {
  const center = graph.nodes.find((node) => node.id === graph.centerNodeId);
  const children = graph.nodes.filter((node) => node.id !== graph.centerNodeId);

  return (
    <section
      id="portfolio-list"
      className="list-view"
      aria-label={copy.list.label(graph.title)}
      hidden={hidden}
    >
      <header className="list-view__intro">
        <p className="graph-node__eyebrow">{copy.list.eyebrow(graph.layout)}</p>
        <h2 className="list-view__title">{center?.title ?? graph.title}</h2>
        <p>{center?.descriptor ?? graph.description}</p>
        {graph.id === siteData.rootGraphId ? (
          <LinkedInProfileBadge
            action={siteData.actions.linkedin}
            identity={siteData.identity}
            compact
            testId="linkedin-profile-badge-list"
            networkLabel={copy.linkedinProfile}
            onAction={onAction}
          />
        ) : null}
      </header>

      <div className="list-view__content" tabIndex={hidden ? -1 : 0}>
        {children.length ? (
          children.map((node) =>
            node.kind === "credential" && node.status !== "earned" ? (
              <article
                className="list-card"
                data-testid={`list-node-${node.id}`}
                aria-label={copy.list.unavailableCredential(
                  node.title,
                  formatPortfolioStatus(node.status ?? "planned", locale),
                )}
                key={node.id}
              >
                <div className="list-card__body py-6">
                  <span className="list-card__heading">
                    <strong>{node.title}</strong>
                    <span>{node.descriptor ?? copy.list.workInProgress}</span>
                  </span>
                  {node.status ? (
                    <span className="status-chip" data-status={node.status.replaceAll(" ", "-")}>
                      {formatPortfolioStatus(node.status, locale)}
                    </span>
                  ) : null}
                  <p>{copy.list.verifiedAfterCompletion}</p>
                </div>
              </article>
            ) : (
              <details className="list-card" key={node.id}>
                <summary>
                  <span className="list-card__heading">
                    <strong>{node.title}</strong>
                    <span>{node.descriptor ?? copy.node.kind[node.kind]}</span>
                  </span>
                  <ChevronDown size={17} aria-hidden="true" />
                </summary>
                <div className="list-card__body">
                  {node.status ? (
                    <span className="status-chip" data-status={node.status.replaceAll(" ", "-")}>
                      {formatPortfolioStatus(node.status, locale)}
                    </span>
                  ) : null}
                  {node.proficiency ? (
                    <span className="proficiency-chip">
                      {formatPortfolioProficiency(node.proficiency, locale)}
                    </span>
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
                      ? copy.list.openMap
                      : node.action
                        ? node.action.label
                        : copy.list.openDetails}
                    <ChevronRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </details>
            ),
          )
        ) : (
          <div className="list-card__body py-6">
            <p>{graph.emptyState?.title ?? copy.list.noEntries}</p>
            <p>{graph.emptyState?.description ?? copy.list.detailsWhenAvailable}</p>
          </div>
        )}
      </div>
    </section>
  );
}
