import { expect, test } from "@playwright/test";

const routes = ["/", "/editorial", "/orbit"];

for (const route of routes) {
  test(`${route} renders its primary conversion without horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /get started(?: free)?/i }).first()).toBeVisible();
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

test("Editorial keeps the complete half-homepage readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto("/editorial");

  await expect(page.getByRole("heading", { level: 1, name: /your operating system for studying and succeeding abroad/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /^get started$/i }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /studying abroad is a huge decision.*the industry treating it like a commission opportunity is the problem/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /a real product.*not a brochure/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /pick a university.*without the kickbacks/i })).toBeVisible();
  await expect(page.locator("main > section")).toHaveCount(3);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);
  await context.close();
});
