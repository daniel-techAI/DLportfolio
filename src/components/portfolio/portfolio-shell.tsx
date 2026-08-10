"use client";

import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  defaultPortfolioLocale,
  getPortfolioUiCopy,
  localizePortfolioData,
  resolvePortfolioLocale,
  type PortfolioLocale,
} from "@/data/localization";
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
const LOCALE_PREFERENCE_KEY = "daniel-portfolio-locale";

type HistoryMarker = {
  [HISTORY_INDEX_KEY]?: number;
  [HISTORY_PATH_KEY]?: string;
};

type PortfolioShellProps = {
  basePath: string;
  cvAvailable: boolean;
  cvSlovakAvailable: boolean;
  profileAvailable: boolean;
};

function samePath(left: readonly string[], right: readonly string[]) {
  return left.length === right.length && left.every((segment, index) => segment === right[index]);
}

function wait(duration: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

export function PortfolioShell({
  basePath,
  cvAvailable,
  cvSlovakAvailable,
  profileAvailable,
}: PortfolioShellProps) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const canvasRef = useRef<PortfolioCanvasHandle>(null);
  const originRef = useRef<HTMLButtonElement | null>(null);
  const transitionTokenRef = useRef(0);
  const historyIndexRef = useRef(0);
  const historyEntriesRef = useRef(new Map<number, string[]>([[0, []]]));
  const localeInitializedRef = useRef(false);
  const [path, setPath] = useState<string[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [detailNodeId, setDetailNodeId] = useState<string | null>(null);
  const [listView, setListView] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [locale, setLocale] = useState<PortfolioLocale>(defaultPortfolioLocale);

  const localizedData = useMemo(() => localizePortfolioData(portfolioData, locale), [locale]);
  const copy = useMemo(() => getPortfolioUiCopy(locale), [locale]);

  const resolution = useMemo(
    () => validateGraphPath(path, localizedData.graphs, localizedData.rootGraphId),
    [localizedData, path],
  );
  const graph = resolution.graph;
  const breadcrumbs = useMemo(
    () => buildGraphBreadcrumbs(path, localizedData.graphs, localizedData.rootGraphId),
    [localizedData, path],
  );
  const detailNode = useMemo(
    () =>
      detailNodeId
        ? (Object.values(localizedData.graphs)
            .flatMap((candidate) => candidate.nodes)
            .find((node) => node.id === detailNodeId) ?? null)
        : null,
    [detailNodeId, localizedData.graphs],
  );
  const canGoBack = path.length > 0;

  useEffect(() => {
    if (!localeInitializedRef.current) {
      const storedLocale = resolvePortfolioLocale(
        window.localStorage.getItem(LOCALE_PREFERENCE_KEY),
      );
      if (storedLocale !== locale) {
        const frame = window.requestAnimationFrame(() => {
          localeInitializedRef.current = true;
          setLocale(storedLocale);
        });
        return () => window.cancelAnimationFrame(frame);
      }
      localeInitializedRef.current = true;
    }

    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_PREFERENCE_KEY, locale);
    document.title = localizedData.metadata.title;
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute("content", localizedData.metadata.description);
  }, [locale, localizedData.metadata.description, localizedData.metadata.title]);

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
      setDetailNodeId(null);
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
      setDetailNodeId(null);
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
      case "project_link_clicked":
        trackEvent("project_link_clicked", {
          projectId: action.analyticsContext ?? action.id,
          destination:
            action.analyticsDestination === "live_site" ||
            action.analyticsDestination === "repository"
              ? action.analyticsDestination
              : "other",
        });
        break;
      case "credential_verification_clicked": {
        const credentialId = action.analyticsContext ?? action.id;
        const issuer = portfolioData.credentials.find(
          (credential) => credential.id === credentialId,
        )?.issuer;
        trackEvent("credential_verification_clicked", { credentialId, issuer });
        break;
      }
      case "contact_action":
        trackEvent("contact_action", {
          method:
            action.kind === "phone"
              ? "phone"
              : action.id === "linkedin"
                ? "linkedin"
                : action.id === "github"
                  ? "github"
                  : "email",
          source: "portfolio",
        });
        break;
      default:
        break;
    }
  }, []);

  const actionAvailable = useCallback(
    (action: PortfolioAction) => {
      if (action.availability === "asset-dependent") {
        if (action.id === portfolioData.actions.cv.id) return cvAvailable;
        if (action.id === portfolioData.actions.cvSlovak.id) return cvSlovakAvailable;
        return false;
      }
      return action.availability === "available" && Boolean(action.href);
    },
    [cvAvailable, cvSlovakAvailable],
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
    if (node.kind === "credential" && node.status !== "earned") return;
    originRef.current = origin;
    setDetailNodeId(node.id);
    if (node.kind === "project") {
      trackEvent("project_viewed", { projectId: node.id });
    }
    if (node.kind === "credential") {
      trackEvent("credential_viewed", { credentialId: node.id, status: node.status });
    }
  }, []);

  const closeDetails = useCallback(() => {
    setDetailNodeId(null);
    window.requestAnimationFrame(() => {
      if (originRef.current?.isConnected) originRef.current.focus({ preventScroll: true });
    });
  }, []);

  const activateNode = useCallback(
    async (node: PortfolioNode, origin: HTMLButtonElement) => {
      if (transitioning) return;
      if (node.kind === "credential" && node.status !== "earned") return;
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

  const openCv = useCallback(
    (action: PortfolioAction, available: boolean, testId: string) => {
      if (available) {
        trackAction(action);
        return;
      }
      const cvNode = Object.values(localizedData.graphs)
        .flatMap((candidate) => candidate.nodes)
        .find((node) => node.action?.id === action.id);
      if (cvNode) {
        originRef.current = document.querySelector<HTMLButtonElement>(`[data-testid='${testId}']`);
        setDetailNodeId(cvNode.id);
      }
    },
    [localizedData.graphs, trackAction],
  );

  const openEnglishCv = useCallback(() => {
    openCv(localizedData.actions.cv, cvAvailable, "cv-download");
  }, [cvAvailable, localizedData.actions.cv, openCv]);

  const openSlovakCv = useCallback(() => {
    openCv(localizedData.actions.cvSlovak, cvSlovakAvailable, "cv-download-slovak");
  }, [cvSlovakAvailable, localizedData.actions.cvSlovak, openCv]);

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
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeDetails, detailNode, helpOpen, navigateBack, navigateHome, path.length]);

  const currentCenter = graph.nodes.find((node) => node.id === graph.centerNodeId);
  const cvHref = localizedData.actions.cv.href ?? "/documents/Daniel_Laky_Remote_Roles_CV.pdf";
  const cvSlovakHref =
    localizedData.actions.cvSlovak.href ?? "/documents/Daniel_Laky_CV_Slovak.pdf";

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio-app" data-testid="portfolio-root">
        <a className="skip-link" href="#portfolio-list" onClick={() => setListView(true)}>
          {copy.shell.skipToTextPortfolio}
        </a>
        <BackgroundAtmosphere />

        <header className="portfolio-header">
          <button
            className="brand-mark"
            type="button"
            onClick={navigateHome}
            aria-label={copy.shell.rootMapLabel}
          >
            <span className="brand-mark__glyph" aria-hidden="true">
              DL
            </span>
            <span className="brand-mark__label">
              <strong>{localizedData.identity.name}</strong>
              <span>{copy.shell.professionalIdentityMap}</span>
            </span>
          </button>
          <CanvasControls
            canGoBack={canGoBack}
            listView={listView}
            cvAvailable={cvAvailable}
            cvSlovakAvailable={cvSlovakAvailable}
            basePath={basePath}
            cvHref={cvHref}
            cvSlovakHref={cvSlovakHref}
            locale={locale}
            copy={copy}
            onBack={navigateBack}
            onHome={navigateHome}
            onToggleList={toggleListView}
            onHelp={() => setHelpOpen(true)}
            onCv={openEnglishCv}
            onCvSlovak={openSlovakCv}
            onLocaleChange={setLocale}
          />
        </header>

        <Breadcrumbs
          items={breadcrumbs.map((item) => ({ ...item, path: [...item.path] }))}
          label={copy.breadcrumbs.label}
          onNavigate={(nextPath) => void navigateToPath(nextPath)}
        />

        <div aria-hidden={listView ? "true" : undefined} {...(listView ? { inert: true } : {})}>
          <ClientErrorBoundary
            fallback={
              <AccessiblePortfolio
                graph={graph}
                siteData={localizedData}
                locale={locale}
                copy={copy}
                hidden={false}
                onActivate={activateNode}
                onAction={trackAction}
              />
            }
          >
            <PortfolioCanvas
              ref={canvasRef}
              graph={graph}
              siteData={localizedData}
              locale={locale}
              copy={copy}
              selectedNodeId={selectedNodeId}
              transitioning={transitioning}
              reducedMotion={reducedMotion}
              basePath={basePath}
              profileAvailable={profileAvailable}
              onActivate={activateNode}
              onAction={trackAction}
            />
          </ClientErrorBoundary>
        </div>

        <AccessiblePortfolio
          graph={graph}
          siteData={localizedData}
          locale={locale}
          copy={copy}
          hidden={!listView}
          onActivate={activateNode}
          onAction={trackAction}
        />

        <div className="canvas-footer" aria-hidden={listView}>
          <p className="canvas-caption">{copy.shell.canvasInstructions}</p>
          <p className="canvas-caption text-right">
            {currentCenter?.title ?? graph.title} · {graph.nodes.length - 1}{" "}
            {graph.nodes.length - 1 === 1 ? copy.shell.connectedItem : copy.shell.connectedItems}
          </p>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {copy.shell.currentMapAnnouncement}: {graph.title}
        </p>

        <AnimatePresence>
          {detailNode ? (
            <DetailPanel
              node={detailNode}
              basePath={basePath}
              cvAvailable={cvAvailable}
              cvSlovakAvailable={cvSlovakAvailable}
              locale={locale}
              copy={copy}
              onClose={closeDetails}
              onAction={trackAction}
            />
          ) : null}
        </AnimatePresence>
        <KeyboardHelpDialog open={helpOpen} copy={copy.help} onClose={() => setHelpOpen(false)} />
      </main>
    </MotionConfig>
  );
}
