"use client";

import { ArrowDownToLine, ArrowUpRight, BadgeCheck, CircleAlert, ImageIcon, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import type { PortfolioAction, PortfolioImage, PortfolioNode } from "@/types/portfolio";

type DetailPanelProps = {
  node: PortfolioNode | null;
  basePath: string;
  cvAvailable: boolean;
  onClose: () => void;
  onAction: (action: PortfolioAction) => void;
};

function statusLabel(status: string) {
  if (status === "in progress") return "Currently studying";
  return status;
}

function isActionAvailable(action: PortfolioAction, cvAvailable: boolean) {
  if (action.availability === "asset-dependent") return cvAvailable;
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

export function DetailPanel({ node, basePath, cvAvailable, onClose, onAction }: DetailPanelProps) {
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
              {detail?.eyebrow ?? node.kind.replaceAll("-", " ")}
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
            aria-label="Close details"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="dialog-content">
          <div className="flex flex-wrap gap-2" aria-label="Item status and dates">
            {(detail?.status ?? node.status) ? (
              <span
                className="status-chip"
                data-status={(detail?.status ?? node.status)?.replaceAll(" ", "-")}
              >
                {statusLabel((detail?.status ?? node.status) as string)}
              </span>
            ) : null}
            {node.proficiency ? <span className="proficiency-chip">{node.proficiency}</span> : null}
            {(detail?.dates ?? node.meta?.dates) ? (
              <span className="tag">{detail?.dates ?? node.meta?.dates}</span>
            ) : null}
            {(detail?.location ?? node.meta?.location) ? (
              <span className="tag">{detail?.location ?? node.meta?.location}</span>
            ) : null}
          </div>

          <section className="detail-section">
            <h3>Overview</h3>
            <p id={descriptionId}>
              {detail?.description ??
                node.descriptor ??
                "Additional details will be added as this work develops."}
            </p>
          </section>

          {detail?.sections?.map((section) => (
            <section className="detail-section" key={section.id}>
              {section.title ? <h3>{section.title}</h3> : null}
              {section.status ? (
                <span className="status-chip" data-status={section.status.replaceAll(" ", "-")}>
                  {statusLabel(section.status)}
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
              <h3>Credential information</h3>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Issuer: {credential.issuer}</span>
                <span className="tag">{credential.verificationType}</span>
                <span className="tag">Status: {statusLabel(credential.status)}</span>
                {credential.issueDate ? (
                  <span className="tag">Issued {credential.issueDate}</span>
                ) : null}
                {credential.expirationDate ? (
                  <span className="tag">Expires {credential.expirationDate}</span>
                ) : null}
              </div>
              {credential.status === "earned" && credential.credentialUrl ? (
                <a
                  className="detail-action"
                  href={credential.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BadgeCheck size={16} aria-hidden="true" />
                  Verify credential
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <p className="flex items-start gap-2">
                  <CircleAlert className="mt-1 shrink-0" size={15} aria-hidden="true" />
                  {credential.status === "planned"
                    ? "This is planned learning and is not presented as an earned credential."
                    : "Verification will appear when a credential URL is available."}
                </p>
              )}
            </section>
          ) : null}

          {detail?.tags?.length ? (
            <section className="detail-section">
              <h3>Skills and themes</h3>
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
              <h3>Gallery</h3>
              <div className="gallery-grid">
                {detail.images.map((image) => (
                  <DetailImage image={image} basePath={basePath} key={image.id} />
                ))}
              </div>
            </section>
          ) : null}

          {actions.length ? (
            <section className="detail-section">
              <h3>Actions</h3>
              <div className="action-list">
                {actions.map((action) => {
                  const available = isActionAvailable(action, cvAvailable);
                  if (!available || !action.href) {
                    return (
                      <span
                        className="detail-action"
                        aria-disabled="true"
                        title="This detail has not been configured yet"
                        key={action.id}
                      >
                        <CircleAlert size={15} aria-hidden="true" />
                        {action.label} unavailable
                      </span>
                    );
                  }

                  return (
                    <a
                      className="detail-action"
                      href={`${action.kind === "download" ? basePath : ""}${action.href}`}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noopener noreferrer" : undefined}
                      download={action.download}
                      aria-label={action.ariaLabel}
                      onClick={() => onAction(action)}
                      key={action.id}
                    >
                      {action.kind === "download" ? (
                        <ArrowDownToLine size={16} aria-hidden="true" />
                      ) : (
                        <ArrowUpRight size={16} aria-hidden="true" />
                      )}
                      {action.label}
                      {action.external ? (
                        <span className="sr-only"> (opens in a new tab)</span>
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
