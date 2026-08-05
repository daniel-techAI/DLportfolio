import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

async function currentGraphPath(page: Page): Promise<string> {
  return page.evaluate(() => new URL(window.location.href).searchParams.get("path") ?? "");
}

async function expectGraphPath(page: Page, expected: string): Promise<void> {
  await expect.poll(() => currentGraphPath(page)).toBe(expected);
}

async function graphNode(page: Page, id: string, accessibleName: RegExp): Promise<Locator> {
  const stableNode = page.getByTestId(`node-${id}`);

  if ((await stableNode.count()) > 0) {
    return stableNode.first();
  }

  return page.getByRole("button", { name: accessibleName }).first();
}

async function openGraphNode(
  page: Page,
  id: string,
  accessibleName: RegExp,
  expectedPath: string,
): Promise<void> {
  const node = await graphNode(page, id, accessibleName);
  await expect(node).toBeVisible();
  await node.click();
  await expectGraphPath(page, expectedPath);
}

async function expectRootGraph(page: Page): Promise<void> {
  await expect(page.getByText("Daniel Laky", { exact: true }).first()).toBeVisible();
  await expectGraphPath(page, "");
  await expect(await graphNode(page, "root-projects", /projects/i)).toBeVisible();
}

async function findCvControl(page: Page): Promise<Locator> {
  const candidates = [
    page.getByTestId("cv-download"),
    page.getByRole("link", { name: /(?:download\s+)?cv/i }),
    page.getByRole("button", { name: /(?:download\s+)?cv/i }),
  ];

  for (const candidate of candidates) {
    if ((await candidate.count()) > 0 && (await candidate.first().isVisible())) {
      return candidate.first();
    }
  }

  return page.getByTestId("cv-download");
}

test("navigates the portfolio hierarchy with history, Escape, and the CV action", async ({
  page,
}) => {
  await page.goto("./");
  await expectRootGraph(page);

  const linkedinBadge = page.getByTestId("linkedin-profile-badge");
  await expect(linkedinBadge).toBeVisible();
  await expect(linkedinBadge).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/daniel-laky-141a9b350/",
  );
  await expect(linkedinBadge).toHaveAttribute("target", "_blank");
  await expect(linkedinBadge).toHaveAttribute("rel", /noopener/);
  await linkedinBadge.focus();
  await expect(linkedinBadge).toBeFocused();

  await openGraphNode(page, "root-projects", /projects/i, "projects");
  await expect(page.getByText("Selected Projects", { exact: true }).first()).toBeVisible();

  await openGraphNode(page, "projects-growthstack", /growthstack/i, "projects/growthstack");
  await expect(page.getByText("Growthstack", { exact: true }).first()).toBeVisible();

  await page.goBack();
  await expectGraphPath(page, "projects");
  await expect(await graphNode(page, "projects-growthstack", /growthstack/i)).toBeVisible();

  await page.goForward();
  await expectGraphPath(page, "projects/growthstack");
  await expect(page.getByText("Growthstack", { exact: true }).first()).toBeVisible();

  await page.goBack();
  await expectGraphPath(page, "projects");

  await page.keyboard.press("Escape");
  await expectRootGraph(page);

  await openGraphNode(page, "root-contact", /contact/i, "contact");
  const cvControl = await findCvControl(page);
  await expect(cvControl).toBeVisible();
  await expect(cvControl).toHaveAccessibleName(/cv/i);
  await expect(cvControl).toHaveAttribute("download", "Daniel_Laky_Remote_Roles_CV.pdf");
  await expect(cvControl).toHaveAttribute("href", /documents\/Daniel_Laky_Remote_Roles_CV\.pdf$/);
  const slovakCvControl = page.getByTestId("cv-download-slovak");
  await expect(slovakCvControl).toBeVisible();
  await expect(slovakCvControl).toHaveAccessibleName(/Stiahnuť CV.*Slovensky/i);
  await expect(slovakCvControl).toHaveAttribute("download", "Daniel_Laky_CV_Slovak.pdf");
  await expect(slovakCvControl).toHaveAttribute("href", /documents\/Daniel_Laky_CV_Slovak\.pdf$/);

  const emailNode = await graphNode(page, "contact-email", /email/i);
  await emailNode.click();
  const emailDialog = page.getByRole("dialog", { name: /email daniel/i });
  await expect(emailDialog).toBeVisible();
  await expect(emailDialog.getByRole("link", { name: /job opportunity/i })).toHaveAttribute(
    "href",
    "mailto:daniellaky.uni@gmail.com?subject=Remote%20opportunity%20for%20Daniel%20Laky",
  );
  await expect(
    emailDialog.getByRole("link", { name: /freelance work or a project enquiry/i }),
  ).toHaveAttribute(
    "href",
    "mailto:r.creation.st@gmail.com?subject=Project%20enquiry%20for%20Daniel%20Laky",
  );
  await page.keyboard.press("Escape");

  const contactCenter = await graphNode(page, "contact-center", /contact daniel/i);
  await contactCenter.click();
  const contactDialog = page.getByRole("dialog", { name: /contact daniel/i });
  await expect(contactDialog.getByRole("link", { name: /call daniel/i })).toHaveAttribute(
    "href",
    "tel:+421949093583",
  );

  const cvResponse = await page.request.get("./documents/Daniel_Laky_Remote_Roles_CV.pdf");
  expect(cvResponse.status()).toBe(200);
  expect((await cvResponse.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const slovakCvResponse = await page.request.get("./documents/Daniel_Laky_CV_Slovak.pdf");
  expect(slovakCvResponse.status()).toBe(200);
  expect((await slovakCvResponse.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("keeps unfinished credentials inert and disables all manual map zoom", async ({ page }) => {
  await page.goto("./?path=certifications/openai");
  await expectGraphPath(page, "certifications/openai");

  const plannedCredential = page.getByTestId("node-credential-openai-ai-foundations");
  await expect(plannedCredential).toBeVisible();
  await expect(plannedCredential).toBeDisabled();
  await expect(plannedCredential).toHaveAttribute("data-interactive", "false");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.locator('[data-testid="list-view-toggle"]:visible').click();
  const staticCredential = page.getByTestId("list-node-credential-openai-ai-foundations");
  await expect(staticCredential).toBeVisible();
  await expect(staticCredential.locator("summary, button, a")).toHaveCount(0);

  await page.locator('[data-testid="list-view-toggle"]:visible').click();
  await expect(page.getByRole("button", { name: /zoom in|zoom out/i })).toHaveCount(0);

  const viewport = page.locator(".react-flow__viewport");
  const transformBefore = await viewport.getAttribute("style");
  await page.locator(".portfolio-flow").hover();
  await page.mouse.wheel(0, -600);
  await page.keyboard.press("+");
  await page.keyboard.press("=");
  await page.keyboard.press("-");
  await page.locator(".portfolio-flow").dblclick({ position: { x: 40, y: 40 } });
  await expect(viewport).toHaveAttribute("style", transformBefore ?? "");
});

test("supports keyboard entry, direct URLs, invalid-path recovery, and critical a11y", async ({
  page,
}) => {
  await page.goto("./");
  await expectRootGraph(page);

  let projectsFocused = false;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await page.keyboard.press("Tab");
    projectsFocused = await page.evaluate(
      () => document.activeElement?.getAttribute("data-testid") === "node-root-projects",
    );

    if (projectsFocused) break;
  }

  expect(projectsFocused, "Projects should be reachable through sequential Tab navigation").toBe(
    true,
  );
  await page.keyboard.press("Enter");
  await expectGraphPath(page, "projects");

  await page.goto("./?path=projects/growthstack");
  await expectGraphPath(page, "projects/growthstack");
  await expect(page.getByText("Growthstack", { exact: true }).first()).toBeVisible();

  await page.keyboard.press("Escape");
  await expectGraphPath(page, "projects");

  await page.goto("./?path=projects/not-a-real-project");
  await expectRootGraph(page);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const seriousViolations = accessibilityScanResults.violations
    .filter(({ impact }) => impact === "critical" || impact === "serious")
    .map(({ help, id, impact, nodes }) => ({ help, id, impact, nodes: nodes.length }));

  expect(seriousViolations).toEqual([]);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.locator('[data-testid="list-view-toggle"]:visible').click();
  const accessibleList = page.locator("#portfolio-list");
  await expect(accessibleList).toBeVisible();
  await expect(page.getByTestId("linkedin-profile-badge-list")).toBeVisible();
  const projectsCard = accessibleList.locator("details").filter({ hasText: "Projects" }).first();
  await projectsCard.locator("summary").click();
  await projectsCard.getByRole("button", { name: "Open map" }).click();
  await expectGraphPath(page, "projects");
  await expect(
    page.getByRole("button", { name: "Go back one portfolio level" }).filter({ visible: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
});
