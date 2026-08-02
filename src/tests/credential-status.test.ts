import { describe, expect, it } from "vitest";

import {
  formatCredentialStatus,
  getCredentialStatusMeta,
  getCredentialVerificationUrl,
  isCredentialVerifiable,
  isPlaceholderValue,
} from "@/lib/credential-status";

describe("credential status formatting", () => {
  it.each([
    ["earned", "Earned", "positive", true],
    ["in progress", "Currently studying", "active", false],
    ["planned", "Planned", "muted", false],
  ] as const)("formats %s without relying on colour alone", (status, label, tone, canVerify) => {
    expect(formatCredentialStatus(status)).toBe(label);
    expect(getCredentialStatusMeta(status)).toMatchObject({
      label,
      tone,
      canVerify,
    });
    expect(getCredentialStatusMeta(status).description.length).toBeGreaterThan(0);
  });

  it("suppresses verification links for planned and in-progress credentials", () => {
    const url = "https://credentials.example/certificate/123";

    expect(getCredentialVerificationUrl({ status: "planned", credentialUrl: url })).toBeNull();
    expect(
      getCredentialVerificationUrl({
        status: "in progress",
        credentialUrl: url,
      }),
    ).toBeNull();
    expect(isCredentialVerifiable({ status: "planned", credentialUrl: url })).toBe(false);
  });

  it("only accepts usable HTTP verification URLs for earned credentials", () => {
    expect(
      getCredentialVerificationUrl({
        status: "earned",
        credentialUrl: "https://credentials.example/certificate/123",
      }),
    ).toBe("https://credentials.example/certificate/123");
    expect(
      getCredentialVerificationUrl({
        status: "earned",
        credentialUrl: "javascript:alert(1)",
      }),
    ).toBeNull();
    expect(
      getCredentialVerificationUrl({
        status: "earned",
        credentialUrl: "[CREDENTIAL_URL]",
      }),
    ).toBeNull();
    expect(isPlaceholderValue("[GITHUB_URL]")).toBe(true);
  });
});
