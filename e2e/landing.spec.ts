import { expect, test } from "@playwright/test";

test("landing renders the complete conversion path without overflow", async ({ page }, testInfo) => {
  await page.goto("/landing");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /your operating system for studying and succeeding abroad/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /get started/i }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /build & thrive/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /one person\. every moving part\./i }),
  ).toBeVisible();

  const primaryCtas = page.getByRole("link", { name: /get started/i });
  await expect(primaryCtas).toHaveCount(3);
  for (const cta of await primaryCtas.all()) {
    await expect(cta).toHaveAttribute(
      "href",
      "mailto:hello@atlas.study?subject=Atlas%20early%20access",
    );
  }

  if (testInfo.project.name === "desktop-edge") {
    const landing = page.locator(".landing-page");
    const hero = page.locator(".land-hero");
    await expect(landing).toHaveAttribute("data-ribbon-cursor", "ready");
    const heroBounds = await hero.boundingBox();
    expect(heroBounds).not.toBeNull();
    await page.mouse.move(heroBounds!.x + heroBounds!.width * 0.4, heroBounds!.y + 240);
    await expect(page.locator(".land-ribbon-cursor")).toHaveAttribute("data-active", "true");

    const scrollHeadline = page.locator("[data-land-scroll-text]").first();
    await scrollHeadline.scrollIntoViewIfNeeded();
    await expect
      .poll(async () =>
        Number.parseFloat(
          await scrollHeadline.evaluate((element) =>
            getComputedStyle(element).getPropertyValue("--land-text-reveal"),
          ),
        ),
      )
      .toBeGreaterThan(0);

    await page.locator(".land-concierge").scrollIntoViewIfNeeded();
    await page.mouse.move(720, 500);
    await expect(page.locator(".land-ribbon-cursor")).toHaveAttribute("data-active", "true");
    expect(
      await page.locator(".land-hero__line").evaluateAll((lines) =>
        lines.every((line) => line.scrollWidth <= line.clientWidth + 1),
      ),
    ).toBe(true);
  }

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    ),
  ).toBe(false);
});

test("landing Essentials selector and departure stamp respond", async ({ page }) => {
  await page.goto("/landing");

  await page.getByRole("button", { name: /explore housing/i }).click();
  await expect(page.getByRole("heading", { level: 3, name: "Housing" })).toBeVisible();
  await page.getByRole("button", { name: /coordinates/i }).click();
  await expect(page.getByRole("status")).toContainText("Cleared for departure");

  const dismissStamp = page.getByRole("button", { name: /dismiss departure stamp/i });
  expect(await dismissStamp.evaluate((button) => button.getBoundingClientRect().width)).toBeGreaterThanOrEqual(44);
  expect(await dismissStamp.evaluate((button) => button.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);

  const openTask = page.getByRole("button", { name: /open task/i });
  expect(await openTask.evaluate((button) => button.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
});

test("landing uses sticky narrative frames on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-edge", "Desktop scroll-story only");
  test.slow();
  await page.goto("/landing");

  await expect(page.locator(".land-chapter").first()).toHaveCSS("position", "sticky");
  await expect(page.locator(".land-dashboard-frame")).toHaveCSS("position", "sticky");

  const product = page.locator(".land-product");
  await expect(product).toHaveAttribute("data-product-stage", "journey");
  await product.evaluate((section) => {
    const element = section as HTMLElement;
    window.scrollTo({ top: element.offsetTop + element.offsetHeight * 0.72, behavior: "instant" });
  });
  await expect(product).toHaveAttribute("data-product-stage", "motion");
});

test("landing mobile menu meets the minimum touch target", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-edge", "Mobile control only");
  await page.goto("/landing");

  const menu = page.getByRole("button", { name: /open navigation/i });
  expect(await menu.evaluate((button) => button.getBoundingClientRect().width)).toBeGreaterThanOrEqual(44);
  expect(await menu.evaluate((button) => button.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);

  const concierge = page.getByRole("link", { name: /meet concierge/i });
  expect(await concierge.evaluate((link) => link.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  await expect(page.locator(".landing-page")).not.toHaveAttribute("data-ribbon-cursor", "ready");
});

test("landing remains readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/landing");

  await expect(page.locator("[data-motion='reduced']")).toBeVisible();
  await expect(page.locator(".landing-page")).not.toHaveAttribute("data-ribbon-cursor", "ready");
  await expect(
    page.getByRole("heading", { name: /one person\. every moving part\./i }),
  ).toBeVisible();
});

test("landing remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("/landing", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /one person\. every moving part\./i }),
  ).toBeVisible();
  await expect(page.locator(".land-concierge__letter")).toBeVisible();
  await expect(page.locator(".land-concierge__dossier")).toBeVisible();
  await expect(page.getByRole("link", { name: /meet concierge/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /the honest answers/i })).toBeVisible();
  await expect(page.locator("details")).toHaveCount(5);
  await context.close();
});
