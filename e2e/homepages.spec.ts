import { expect, test } from "@playwright/test";

const routes = ["/", "/editorial", "/orbit"];

for (const route of routes) {
  test(`${route} renders its primary conversion without horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /get started free/i }).first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

test("Horizon form exposes the backend integration boundary", async ({ page }) => {
  await page.goto("/");
  await page.locator("#consultation-form").scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: /request a consultation/i })).toBeDisabled();
  await expect(page.getByText(/connects when the secure Atlas service is ready/i)).toBeVisible();
});

test("Orbit remains readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/orbit");
  await expect(page.getByText("Visa", { exact: true })).toBeVisible();
  await expect(page.getByText("Housing", { exact: true })).toBeVisible();
});

test("Dispatch keeps every chapter reachable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto("/editorial");
  const finalDispatch = page.getByText("Dispatch 05", { exact: true });
  await finalDispatch.scrollIntoViewIfNeeded();
  await expect(finalDispatch).toBeVisible();
  const sectionBounds = await page.locator("#dispatches").boundingBox();
  const trackBounds = await page.locator("[data-dispatch-track]").boundingBox();
  expect(sectionBounds).not.toBeNull();
  expect(trackBounds).not.toBeNull();
  expect(trackBounds!.y).toBeGreaterThanOrEqual(sectionBounds!.y);
  expect(trackBounds!.y + trackBounds!.height).toBeLessThanOrEqual(sectionBounds!.y + sectionBounds!.height + 1);
  await context.close();
});
