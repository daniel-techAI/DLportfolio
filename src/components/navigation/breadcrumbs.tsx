"use client";

import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  id: string;
  title: string;
  path: string[];
};

export function Breadcrumbs({
  items,
  onNavigate,
}: {
  items: readonly BreadcrumbItem[];
  onNavigate: (path: string[]) => void;
}) {
  return (
    <div className="breadcrumbs-shell">
      <nav className="breadcrumbs" aria-label="Portfolio path" data-testid="breadcrumbs">
        {items.map((item, index) => (
          <span className="contents" key={item.id}>
            {index > 0 ? (
              <ChevronRight
                size={12}
                aria-hidden="true"
                className="shrink-0 text-[var(--color-text-faint)]"
              />
            ) : null}
            <button
              className="breadcrumb-button"
              type="button"
              aria-current={index === items.length - 1 ? "page" : undefined}
              onClick={() => onNavigate([...item.path])}
            >
              {index === 0 ? <Home size={13} aria-hidden="true" /> : null}
              {item.title}
            </button>
          </span>
        ))}
      </nav>
    </div>
  );
}
