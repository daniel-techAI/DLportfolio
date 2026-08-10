"use client";

import { ArrowDownToLine, ArrowUpRight, CircleAlert, ImageIcon, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import {
  formatPortfolioDate,
  formatPortfolioProficiency,
  formatPortfolioStatus,
  formatPortfolioVerificationType,
  type PortfolioLocale,
  type PortfolioUiCopy,
} from "@/data/localization";
import type { PortfolioAction, PortfolioImage, PortfolioNode } from "@/types/portfolio";

type DetailPanelProps = {
  node: PortfolioNode | null;
  basePath: string;
  cvAvailable: boolean;
  cvSlovakAvailable: boolean;
  locale: PortfolioLocale;
  copy: PortfolioUiCopy;
  onClose: () => void;
  onAction: (action: PortfolioAction) => void;
};

function isActionAvailable(
  action: PortfolioAction,
  cvAvailable: boolean,
  cvSlovakAvailable: boolean,
) {
  if (action.availability === "asset-dependent") {
    if (action.id === "cv") return cvAvailable;
    if (action.id === "cv-slovak") return cvSlovakAvailable;
    return false;
  }
  return action.availability === "available" && Boolean(action.href);
}

function DetailImage({ image, basePath }: { image: PortfolioImage; basePath: string }) {
  const [failed, setFailed] = useState(false);
  const available = image.availability === "available" && !failed;

  if (!available) {
    return (
      <div className="gallery-placeholder">
        <ImageIcon size={20} aria-hidden="true" />
        <span>{image.placeholderLabel}</span>
      </div>
    );
  }

  return (
    // User-provided static images intentionally bypass runtime optimisation in the exported site.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${basePath}${image.src}`}
      alt={image.alt}
      width={image.width ?? 720}
      height={image.height ?? 480}
      loading="lazy"
      onError={() => setFailed(true)}
      className="min-h-36 w-full rounded-2xl border border-[var(--color-border)] object-cover"
    />
  );
}

export function DetailPanel({
  node,
  basePath,
  cvAvailable,
  cvSlovakAvailable,
  locale,
  copy,
  onClose,
  onAction,
}: DetailPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !node) return;

    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [node]);

  if (!node) return null;

  const detail = node.detail;
  const credential = detail?.credential;
  const actions = [...(node.action ? [node.action] : []), ...(detail?.actions ?? [])].filter(
    (action, index, all) => all.findIndex((candidate) => candidate.id === action.id) === index,
  );

  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeOnBackdrop}
    >
      <motion.div
        className="dialog-shell"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="dialog-header">
          <div className="dialog-header__copy">
            <span className="graph-node__eyebrow">
              {detail?.eyebrow ?? copy.node.kind[node.kind]}
            </span>
            <h2 id={titleId} className="dialog-title">
              {detail?.title ?? node.title}
            </h2>
            {(detail?.subtitle ?? node.descriptor) ? (
              <p className="dialog-subtitle">{detail?.subtitle ?? node.descriptor}</p>
            ) : null}
          </div>
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
            aria-label={copy.detail.close}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="dialog-content">
          <div className="flex flex-wrap gap-2" aria-label={copy.detail.statusAndDates}>
            {(detail?.status ?? node.status) ? (
              <span
                className="status-chip"
                data-status={(detail?.status ?? node.status)?.replaceAll(" ", "-")}
              >
                {formatPortfolioStatus((detail?.status ?? node.status)!, locale)}
              </span>
            ) : null}
            {node.proficiency ? (
              <span className="proficiency-chip">
                {formatPortfolioProficiency(node.proficiency, locale)}
              </span>
            ) : null}
            {(detail?.dates ?? node.meta?.dates) ? (
              <span className="tag">
                {/^\d{4}-\d{2}-\d{2}$/.test((detail?.dates ?? node.meta?.dates)!)
                  ? formatPortfolioDate((detail?.dates ?? node.meta?.dates)!, locale)
                  : (detail?.dates ?? node.meta?.dates)}
              </span>
            ) : null}
            {(detail?.location ?? node.meta?.location) ? (
              <span className="tag">{detail?.location ?? node.meta?.location}</span>
            ) : null}
          </div>

          <section className="detail-section">
            <h3>{copy.detail.overview}</h3>
            <p id={descriptionId}>
              {detail?.description ?? node.descriptor ?? copy.detail.fallbackDescription}
            </p>
          </section>

          {detail?.sections?.map((section) => (
            <section className="detail-section" key={section.id}>
              {section.title ? <h3>{section.title}</h3> : null}
              {section.status ? (
                <span className="status-chip" data-status={section.status.replaceAll(" ", "-")}>
                  {formatPortfolioStatus(section.status, locale)}
                </span>
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

          {credential ? (
            <section className="detail-section">
              <h3>{copy.detail.credentialInformation}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="tag">
                  {copy.detail.issuer}: {credential.issuer}
                </span>
                <span className="tag">
                  {formatPortfolioVerificationType(credential.verificationType, locale)}
                </span>
                <span className="tag">
                  {copy.detail.status}: {formatPortfolioStatus(credential.status, locale)}
                </span>
                {credential.issueDate ? (
                  <span className="tag">
                    {copy.detail.issued}: {formatPortfolioDate(credential.issueDate, locale)}
                  </span>
                ) : null}
                {credential.expirationDate ? (
                  <span className="tag">
                    {copy.detail.expires}: {formatPortfolioDate(credential.expirationDate, locale)}
                  </span>
                ) : null}
                {credential.credentialId ? (
                  <span className="tag">
                    {copy.detail.credentialId}: {credential.credentialId}
                  </span>
                ) : null}
                {credential.certificateName ? (
                  <span className="tag">
                    {copy.detail.certificateName}: {credential.certificateName}
                  </span>
                ) : null}
              </div>
              {!credential.certificateUrl && !credential.credentialUrl ? (
                <p className="flex items-start gap-2">
                  <CircleAlert className="mt-1 shrink-0" size={15} aria-hidden="true" />
                  {credential.status === "planned"
                    ? copy.detail.plannedNotice
                    : copy.detail.verificationUnavailable}
                </p>
              ) : null}
            </section>
          ) : null}

          {detail?.tags?.length ? (
            <section className="detail-section">
              <h3>{copy.detail.skillsAndThemes}</h3>
              <div className="tag-list">
                {detail.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {detail?.images?.length ? (
            <section className="detail-section">
              <h3>{copy.detail.gallery}</h3>
              <div className="gallery-grid">
                {detail.images.map((image) => (
                  <DetailImage image={image} basePath={basePath} key={image.id} />
                ))}
              </div>
            </section>
          ) : null}

          {actions.length ? (
            <section className="detail-section">
              <h3>{copy.detail.actions}</h3>
              <div className="action-list">
                {actions.map((action) => {
                  const available = isActionAvailable(action, cvAvailable, cvSlovakAvailable);
                  const actionLabel =
                    action.analyticsDestination === "certificate"
                      ? copy.detail.viewCertificate
                      : action.analyticsDestination === "verification"
                        ? copy.detail.verifyCredential
                        : action.label;
                  const isCredentialAction =
                    action.analyticsDestination === "certificate" ||
                    action.analyticsDestination === "verification";
                  const actionAriaLabel = isCredentialAction
                    ? `${actionLabel}: ${detail?.title ?? node.title}${
                        action.external ? `, ${copy.detail.opensNewTab}` : ""
                      }`
                    : (action.ariaLabel ?? actionLabel);
                  if (!available || !action.href) {
                    return (
                      <span
                        className="detail-action"
                        aria-disabled="true"
                        title={copy.detail.unavailableTitle}
                        key={action.id}
                      >
                        <CircleAlert size={15} aria-hidden="true" />
                        {actionLabel} {copy.detail.unavailable}
                      </span>
                    );
                  }

                  return (
                    <a
                      className="detail-action"
                      href={`${action.href.startsWith("/") ? basePath : ""}${action.href}`}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noopener noreferrer" : undefined}
                      download={action.download}
                      aria-label={actionAriaLabel}
                      onClick={() => onAction(action)}
                      key={action.id}
                    >
                      {action.kind === "download" ? (
                        <ArrowDownToLine size={16} aria-hidden="true" />
                      ) : (
                        <ArrowUpRight size={16} aria-hidden="true" />
                      )}
                      {actionLabel}
                      {action.external ? (
                        <span className="sr-only"> ({copy.detail.opensNewTab})</span>
                      ) : null}
                    </a>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      </motion.div>
    </dialog>
  );
}
