"use client";

import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="error-screen">
      <div className="grid max-w-md justify-items-center gap-4">
        <p className="m-0 font-mono text-xs tracking-[0.16em] text-[var(--color-accent-strong)] uppercase">
          Map interrupted
        </p>
        <h1 className="m-0 text-4xl font-[var(--font-newsreader)] font-medium">
          The portfolio could not be displayed.
        </h1>
        <p className="m-0 text-sm leading-7 text-[var(--color-text-muted)]">
          Try rebuilding the map. The text portfolio remains available after a refresh.
        </p>
        <button className="detail-action" type="button" onClick={reset}>
          <RotateCcw aria-hidden="true" size={16} />
          Try again
        </button>
      </div>
    </main>
  );
}
