"use client";

import { Accessibility, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { PortfolioUiCopy } from "@/data/localization";

export function KeyboardHelpDialog({
  open,
  copy,
  onClose,
}: {
  open: boolean;
  copy: PortfolioUiCopy["help"];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="help-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog-shell">
        <header className="dialog-header">
          <div className="dialog-header__copy">
            <span className="graph-node__eyebrow">{copy.eyebrow}</span>
            <h2 id={titleId} className="dialog-title">
              {copy.title}
            </h2>
          </div>
          <button className="dialog-close" type="button" onClick={onClose} aria-label={copy.close}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="dialog-content">
          <section className="detail-section">
            <h3>{copy.shortcutsTitle}</h3>
            <dl className="grid gap-3">
              {copy.shortcuts.map(([keys, description]) => (
                <div className="grid grid-cols-[8rem_1fr] items-start gap-3" key={keys}>
                  <dt>
                    <kbd className="tag font-mono">{keys}</kbd>
                  </dt>
                  <dd className="m-0 text-sm leading-6 text-[var(--color-text-muted)]">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="detail-section">
            <h3>{copy.motionTitle}</h3>
            <p className="flex items-start gap-2" role="status">
              <Accessibility className="mt-1 shrink-0" size={16} aria-hidden="true" />
              {copy.motionDescription}
            </p>
          </section>
        </div>
      </div>
    </dialog>
  );
}
