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

test("Horizon form exposes keyboard-visible validation", async ({ page }) => {
  await page.goto("/");
  await page.locator("#consultation-form").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /request a consultation/i }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Tell us your name.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
});

test("Orbit remains readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/orbit");
  await expect(page.getByText("Visa", { exact: true })).toBeVisible();
  await expect(page.getByText("Housing", { exact: true })).toBeVisible();
});
