"use client";

import { ArrowLeft, CircleHelp, Download, Home, ListTree, Map } from "lucide-react";
import type { PortfolioLocale, PortfolioUiCopy } from "@/data/localization";

type CanvasControlsProps = {
  canGoBack: boolean;
  listView: boolean;
  cvAvailable: boolean;
  cvSlovakAvailable: boolean;
  basePath: string;
  cvHref: string;
  cvSlovakHref: string;
  locale: PortfolioLocale;
  copy: PortfolioUiCopy;
  onBack: () => void;
  onHome: () => void;
  onToggleList: () => void;
  onHelp: () => void;
  onCv: () => void;
  onCvSlovak: () => void;
  onLocaleChange: (locale: PortfolioLocale) => void;
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
    cvSlovakAvailable,
    basePath,
    cvHref,
    cvSlovakHref,
    locale,
    copy,
    onBack,
    onHome,
    onToggleList,
    onHelp,
    onCv,
    onCvSlovak,
    onLocaleChange,
  } = props;

  const languageSwitcher = (mobile = false) => (
    <div
      className="flex items-center"
      role="group"
      aria-label={copy.languageSwitcherLabel}
      data-testid={mobile ? "language-switcher-mobile" : "language-switcher"}
    >
      <IconButton
        label={copy.switchToEnglish}
        aria-pressed={locale === "en"}
        data-active={locale === "en"}
        onClick={() => onLocaleChange("en")}
      >
        <span className="toolbar-button__label">EN</span>
      </IconButton>
      <IconButton
        label={copy.switchToSlovak}
        aria-pressed={locale === "sk"}
        data-active={locale === "sk"}
        onClick={() => onLocaleChange("sk")}
      >
        <span className="toolbar-button__label">SK</span>
      </IconButton>
    </div>
  );

  return (
    <>
      <div className="toolbar desktop-controls" aria-label={copy.controls.label}>
        <IconButton label={copy.controls.back} onClick={onBack} disabled={!canGoBack}>
          <ArrowLeft size={17} aria-hidden="true" />
        </IconButton>
        <IconButton label={copy.controls.home} onClick={onHome} disabled={!canGoBack}>
          <Home size={17} aria-hidden="true" />
        </IconButton>
        <span className="mx-0.5 h-5 w-px bg-[var(--color-border)]" aria-hidden="true" />
        <IconButton
          label={listView ? copy.controls.showMap : copy.controls.showList}
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
        <IconButton label={copy.controls.keyboardHelp} onClick={onHelp} data-testid="keyboard-help">
          <CircleHelp size={17} aria-hidden="true" />
        </IconButton>
        {cvAvailable ? (
          <a
            className="toolbar-button px-3"
            href={`${basePath}${cvHref}`}
            download="Daniel_Laky_Remote_Roles_CV.pdf"
            aria-label={copy.controls.englishCv}
            title={copy.controls.englishCv}
            data-testid="cv-download"
            onClick={onCv}
          >
            <Download size={16} aria-hidden="true" />
            <span className="toolbar-button__label desktop-only">EN</span>
          </a>
        ) : (
          <button
            className="toolbar-button px-3"
            type="button"
            aria-label={copy.controls.englishCvMissing}
            title={copy.controls.englishCvMissingTitle}
            data-testid="cv-download"
            onClick={onCv}
          >
            <Download size={16} aria-hidden="true" />
            <span className="toolbar-button__label desktop-only">EN</span>
          </button>
        )}
        {cvSlovakAvailable ? (
          <a
            className="toolbar-button px-3"
            href={`${basePath}${cvSlovakHref}`}
            download="Daniel_Laky_CV_Slovak.pdf"
            aria-label={copy.controls.slovakCv}
            title={copy.controls.slovakCv}
            data-testid="cv-download-slovak"
            onClick={onCvSlovak}
          >
            <Download size={16} aria-hidden="true" />
            <span className="toolbar-button__label desktop-only">SK</span>
          </a>
        ) : (
          <button
            className="toolbar-button px-3"
            type="button"
            aria-label={copy.controls.slovakCvMissing}
            title={copy.controls.slovakCvMissingTitle}
            data-testid="cv-download-slovak"
            onClick={onCvSlovak}
          >
            <Download size={16} aria-hidden="true" />
            <span className="toolbar-button__label desktop-only">SK</span>
          </button>
        )}
        <span className="mx-0.5 h-5 w-px bg-[var(--color-border)]" aria-hidden="true" />
        {languageSwitcher()}
      </div>

      <nav className="mobile-nav" aria-label={copy.controls.mobileLabel}>
        <div className="toolbar">
          <IconButton label={copy.controls.back} onClick={onBack} disabled={!canGoBack}>
            <ArrowLeft size={18} aria-hidden="true" />
          </IconButton>
          <IconButton label={copy.controls.home} onClick={onHome} disabled={!canGoBack}>
            <Home size={18} aria-hidden="true" />
          </IconButton>
          <IconButton
            label={listView ? copy.controls.showMap : copy.controls.showList}
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
          <IconButton
            label={copy.controls.keyboardHelp}
            onClick={onHelp}
            data-testid="keyboard-help"
          >
            <CircleHelp size={18} aria-hidden="true" />
          </IconButton>
          {languageSwitcher(true)}
        </div>
      </nav>
    </>
  );
}
