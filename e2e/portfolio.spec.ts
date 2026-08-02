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
