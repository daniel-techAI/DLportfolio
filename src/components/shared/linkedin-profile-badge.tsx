"use client";

import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import type { PortfolioAction, PortfolioIdentity } from "@/types/portfolio";

type LinkedInProfileBadgeProps = {
  action: PortfolioAction;
  identity: PortfolioIdentity;
  compact?: boolean;
  testId?: string;
  onAction?: (action: PortfolioAction) => void;
};

export function LinkedInProfileBadge({
  action,
  identity,
  compact = false,
  testId = "linkedin-profile-badge",
  onAction,
}: LinkedInProfileBadgeProps) {
  if (action.availability !== "available" || !action.href) return null;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    onAction?.(action);
  };

  return (
    <a
      className={`linkedin-profile-badge nodrag nopan${compact ? "linkedin-profile-badge--compact" : ""}`}
      data-testid={testId}
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={action.ariaLabel}
      onClick={handleClick}
    >
      <span className="linkedin-profile-badge__monogram" aria-hidden="true">
        in
      </span>
      <span className="linkedin-profile-badge__copy">
        <span className="linkedin-profile-badge__network">LinkedIn profile</span>
        <strong>{identity.name}</strong>
        {!compact ? <span>{identity.descriptor}</span> : null}
      </span>
      <ArrowUpRight className="linkedin-profile-badge__arrow" size={16} aria-hidden="true" />
    </a>
  );
}
