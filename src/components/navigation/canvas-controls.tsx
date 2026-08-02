"use client";

import { ArrowLeft, CircleHelp, Download, Home, ListTree, Map, Minus, Plus } from "lucide-react";

type CanvasControlsProps = {
  canGoBack: boolean;
  listView: boolean;
  cvAvailable: boolean;
  basePath: string;
  cvHref: string;
  onBack: () => void;
  onHome: () => void;
  onToggleList: () => void;
  onHelp: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCv: () => void;
};

function IconButton({
  label,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button className="toolbar-button" type="button" aria-label={label} title={label} {...props}>
      {children}
    </button>
  );
}

export function CanvasControls(props: CanvasControlsProps) {
  const {
    canGoBack,
    listView,
    cvAvailable,
    basePath,
    cvHref,
    onBack,
    onHome,
    onToggleList,
    onHelp,
    onZoomIn,
    onZoomOut,
    onCv,
  } = props;

  return (
    <>
      <div className="toolbar desktop-controls" aria-label="Portfolio controls">
        <IconButton label="Go back one portfolio level" onClick={onBack} disabled={!canGoBack}>
          <ArrowLeft size={17} aria-hidden="true" />
        </IconButton>
        <IconButton label="Return to portfolio root" onClick={onHome} disabled={!canGoBack}>
          <Home size={17} aria-hidden="true" />
        </IconButton>
        <span className="mx-0.5 h-5 w-px bg-[var(--color-border)]" aria-hidden="true" />
        <IconButton label="Zoom in" onClick={onZoomIn} disabled={listView}>
          <Plus size={17} aria-hidden="true" />
        </IconButton>
        <IconButton label="Zoom out" onClick={onZoomOut} disabled={listView}>
          <Minus size={17} aria-hidden="true" />
        </IconButton>
        <IconButton
          label={listView ? "Show interactive map" : "Show accessible list view"}
          onClick={onToggleList}
          data-testid="list-view-toggle"
          data-active={listView}
        >
          {listView ? (
            <Map size={17} aria-hidden="true" />
          ) : (
            <ListTree size={17} aria-hidden="true" />
          )}
        </IconButton>
        <IconButton label="Open keyboard help" onClick={onHelp} data-testid="keyboard-help">
          <CircleHelp size={17} aria-hidden="true" />
        </IconButton>
        {cvAvailable ? (
          <a
            className="toolbar-button px-3"
            href={`${basePath}${cvHref}`}
            download="Daniel_Laky_Remote_Roles_CV.pdf"
            aria-label="Download Daniel Laky's CV"
            title="Download CV"
            data-testid="cv-download"
            onClick={onCv}
          >
            <Download size={16} aria-hidden="true" />
            <span className="toolbar-button__label desktop-only">CV</span>
          </a>
        ) : (
          <button
            className="toolbar-button px-3"
            type="button"
            aria-label="Daniel Laky's CV is not yet available"
            title="CV file not yet added"
            data-testid="cv-download"
            onClick={onCv}
          >
            <Download size={16} aria-hidden="true" />
            <span className="toolbar-button__label desktop-only">CV</span>
          </button>
        )}
      </div>

      <nav className="mobile-nav" aria-label="Mobile portfolio navigation">
        <div className="toolbar">
          <IconButton label="Go back one portfolio level" onClick={onBack} disabled={!canGoBack}>
            <ArrowLeft size={18} aria-hidden="true" />
          </IconButton>
          <IconButton label="Return to portfolio root" onClick={onHome} disabled={!canGoBack}>
            <Home size={18} aria-hidden="true" />
          </IconButton>
          <IconButton
            label={listView ? "Show interactive map" : "Show accessible list view"}
            onClick={onToggleList}
            data-testid="list-view-toggle"
            data-active={listView}
          >
            {listView ? (
              <Map size={18} aria-hidden="true" />
            ) : (
              <ListTree size={18} aria-hidden="true" />
            )}
          </IconButton>
          <IconButton label="Open keyboard help" onClick={onHelp} data-testid="keyboard-help">
            <CircleHelp size={18} aria-hidden="true" />
          </IconButton>
        </div>
      </nav>
    </>
  );
}
