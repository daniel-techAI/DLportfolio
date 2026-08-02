import type { CredentialStatus } from "@/types/portfolio";

export type SupportedCredentialStatus = CredentialStatus | "in-progress";

export type CredentialStatusMeta = Readonly<{
  label: "Earned" | "Currently studying" | "Planned";
  tone: "positive" | "active" | "muted";
  description: string;
  canVerify: boolean;
}>;

const STATUS_META: Record<SupportedCredentialStatus, CredentialStatusMeta> = {
  earned: {
    label: "Earned",
    tone: "positive",
    description: "Credential earned",
    canVerify: true,
  },
  "in progress": {
    label: "Currently studying",
    tone: "active",
    description: "Learning currently in progress",
    canVerify: false,
  },
  "in-progress": {
    label: "Currently studying",
    tone: "active",
    description: "Learning currently in progress",
    canVerify: false,
  },
  planned: {
    label: "Planned",
    tone: "muted",
    description: "Planned future learning",
    canVerify: false,
  },
};

export function getCredentialStatusMeta(status: SupportedCredentialStatus): CredentialStatusMeta {
  return STATUS_META[status];
}

export function formatCredentialStatus(
  status: SupportedCredentialStatus,
): CredentialStatusMeta["label"] {
  return getCredentialStatusMeta(status).label;
}

export type VerifiableCredential = Readonly<{
  status: SupportedCredentialStatus;
  credentialUrl?: string | null;
}>;

export function isPlaceholderValue(value?: string | null): boolean {
  if (!value) {
    return true;
  }

  return /^\s*\[[A-Z0-9_ -]+\]\s*$/.test(value);
}

export function getCredentialVerificationUrl(credential: VerifiableCredential): string | null {
  if (
    !getCredentialStatusMeta(credential.status).canVerify ||
    isPlaceholderValue(credential.credentialUrl)
  ) {
    return null;
  }

  try {
    const url = new URL(credential.credentialUrl!);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function isCredentialVerifiable(credential: VerifiableCredential): boolean {
  return getCredentialVerificationUrl(credential) !== null;
}
