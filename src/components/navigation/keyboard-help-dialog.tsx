"use client";

import { Accessibility, X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

const shortcuts = [
  ["Tab", "Move between portfolio nodes and controls"],
  ["Enter or Space", "Open the focused node"],
  ["Escape", "Close details or move back one portfolio level"],
  ["Plus / Minus", "Zoom the interactive map in or out"],
  ["Home", "Return to Daniel’s root map"],
] as const;

export function KeyboardHelpDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            <span className="graph-node__eyebrow">Navigation guide</span>
            <h2 id={titleId} className="dialog-title">
              Keyboard help
            </h2>
          </div>
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
            aria-label="Close keyboard help"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="dialog-content">
          <section className="detail-section">
            <h3>Shortcuts</h3>
            <dl className="grid gap-3">
              {shortcuts.map(([keys, description]) => (
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
            <h3>Motion preference</h3>
            <p className="flex items-start gap-2" role="status">
              <Accessibility className="mt-1 shrink-0" size={16} aria-hidden="true" />
              Reduced-motion preferences are respected automatically. When active, map changes use
              short fades without large viewport movement.
            </p>
          </section>
        </div>
      </div>
    </dialog>
  );
}
