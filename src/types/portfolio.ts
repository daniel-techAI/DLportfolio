/**
 * Presentation-agnostic contracts for the portfolio.
 *
 * Content lives in `src/data/portfolio.ts`. UI components resolve icon keys and
 * decide how graphs, details, actions, and media are rendered.
 */

export const credentialStatuses = ["earned", "in progress", "planned"] as const;
export type CredentialStatus = (typeof credentialStatuses)[number];

export const verificationTypes = [
  "Professional Certification",
  "Vendor Certification",
  "Applied Skills Credential",
  "GitHub Certification",
  "Course Completion Certificate",
  "Learning Badge",
  "Course Completion",
] as const;
export type VerificationType = (typeof verificationTypes)[number];

export const proficiencyLevels = [
  "credential-backed",
  "applied",
  "practical",
  "learning",
  "project-demonstrated",
] as const;
export type Proficiency = (typeof proficiencyLevels)[number];

export type AnalyticsEventName =
  | "graph_opened"
  | "project_viewed"
  | "project_link_clicked"
  | "credential_viewed"
  | "credential_verification_clicked"
  | "contact_action"
  | "cv_downloaded"
  | "linkedin_clicked"
  | "github_clicked"
  | "email_clicked";

/** Lucide names are stored as data; React components never enter the data layer. */
export type PortfolioIconKey =
  | "activity"
  | "award"
  | "badge-check"
  | "book-open"
  | "bot"
  | "briefcase-business"
  | "building-2"
  | "camera"
  | "chart-no-axes-combined"
  | "check-circle-2"
  | "circle-dashed"
  | "cloud"
  | "code-2"
  | "compass"
  | "contact"
  | "file-down"
  | "file-text"
  | "focus"
  | "folder-git-2"
  | "gallery-horizontal-end"
  | "github"
  | "globe-2"
  | "graduation-cap"
  | "handshake"
  | "heart-handshake"
  | "image"
  | "languages"
  | "layers-3"
  | "lightbulb"
  | "linkedin"
  | "list-checks"
  | "mail"
  | "map-pin"
  | "message-circle"
  | "monitor-smartphone"
  | "palette"
  | "phone"
  | "route"
  | "search"
  | "settings-2"
  | "shirt"
  | "shopping-bag"
  | "sparkles"
  | "target"
  | "timer"
  | "tool-case"
  | "trending-up"
  | "user-round"
  | "users-round"
  | "workflow"
  | "wrench";

export type GraphLayoutKind = "radial" | "timeline";

export type PortfolioNodeKind =
  | "profile"
  | "category"
  | "project"
  | "skill-cluster"
  | "skill"
  | "credential-category"
  | "credential"
  | "timeline"
  | "contact"
  | "detail"
  | "gallery";

export type PortfolioItemStatus =
  | CredentialStatus
  | "active development"
  | "early-stage product development"
  | "in development"
  | "prototype"
  | "concept"
  | "experimental"
  | "current"
  | "completed"
  | "studies";

export type PortfolioActionKind = "external" | "email" | "phone" | "download";

export type PortfolioActionAvailability = "available" | "placeholder" | "asset-dependent";

export interface PortfolioAction {
  id: string;
  label: string;
  kind: PortfolioActionKind;
  icon: PortfolioIconKey;
  /** Human-readable value, including clearly marked placeholder values. */
  value: string;
  /** Omitted until a placeholder has been replaced with a usable target. */
  href?: string;
  availability: PortfolioActionAvailability;
  external?: boolean;
  download?: string;
  analyticsEvent?: AnalyticsEventName;
  /** Non-sensitive context used to classify a meaningful analytics event. */
  analyticsContext?: string;
  analyticsDestination?: "live_site" | "repository" | "certificate" | "verification" | "other";
  ariaLabel?: string;
}

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  /** Text shown when the expected real asset has not yet been supplied. */
  placeholderLabel: string;
  availability: "available" | "placeholder";
  width?: number;
  height?: number;
}

export interface PortfolioDetailSection {
  id: string;
  title?: string;
  body?: string;
  items?: readonly string[];
  status?: PortfolioItemStatus;
}

export interface PortfolioDetail {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  sections?: readonly PortfolioDetailSection[];
  tags?: readonly string[];
  dates?: string;
  location?: string;
  images?: readonly PortfolioImage[];
  actions?: readonly PortfolioAction[];
  status?: PortfolioItemStatus;
  credential?: Credential;
}

export interface PortfolioNodeMeta {
  countLabel?: string;
  company?: string;
  category?: string;
  dates?: string;
  location?: string;
  issuer?: string;
  verificationType?: VerificationType;
  /** Helps radial layout reserve extra angular space without prescribing pixels. */
  layoutWeight?: number;
}

export interface PortfolioNode {
  id: string;
  /** URL-safe segment used when the node opens another graph. */
  slug: string;
  title: string;
  descriptor?: string;
  kind: PortfolioNodeKind;
  icon: PortfolioIconKey;
  childGraphId?: string;
  detail?: PortfolioDetail;
  action?: PortfolioAction;
  status?: PortfolioItemStatus;
  proficiency?: Proficiency;
  featured?: boolean;
  childCount?: number;
  meta?: PortfolioNodeMeta;
}

export interface PortfolioEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  kind?: "default" | "timeline" | "featured";
}

export interface GraphEmptyState {
  title: string;
  description: string;
}

export interface GraphDefinition {
  id: string;
  /** Segment used for this graph within the `?path=` hierarchy. */
  slug: string;
  title: string;
  description?: string;
  centerNodeId: string;
  nodes: readonly PortfolioNode[];
  edges: readonly PortfolioEdge[];
  layout: GraphLayoutKind;
  parentGraphId?: string;
  /** Node in the parent graph that opens this graph. */
  parentNodeId?: string;
  emptyState?: GraphEmptyState;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  category: string;
  issueDate: string | null;
  expirationDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  certificateUrl: string | null;
  /** Recipient name exactly as printed by the issuer, when it differs from the portfolio name. */
  certificateName: string | null;
  certificateImage: PortfolioImage | null;
  status: CredentialStatus;
  description: string;
  skills: readonly string[];
  featured: boolean;
  verificationType: VerificationType;
}

export interface PortfolioIdentity {
  name: string;
  descriptor: string;
  location: string;
  status: string;
  profileImage: PortfolioImage;
}

export interface PortfolioMetadata {
  title: string;
  description: string;
  siteName: string;
  locale: string;
  canonicalUrl: string | null;
  socialImage: PortfolioImage;
}

export interface PortfolioSiteData {
  rootGraphId: "root";
  identity: PortfolioIdentity;
  metadata: PortfolioMetadata;
  actions: Readonly<Record<string, PortfolioAction>>;
  credentials: readonly Credential[];
  graphs: Readonly<Record<string, GraphDefinition>>;
}
