import { expect, test } from "@playwright/test";

test.describe("landing 3 hero", () => {
  test("fills the desktop viewport and keeps primary content visible", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Get started — free" }),
    ).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(1);

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("stacks actions and avoids horizontal overflow on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/landing-3");

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Explore the platform" }),
    ).toBeVisible();
  });

  test("places the dashboard showcase after the hero without overflow", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const showcase = page.locator("[data-landing-3-showcase]");
    const hero = page.locator("main > section").first();
    await expect(showcase).toBeVisible();
    await expect(showcase.getByRole("heading", { level: 2 })).toHaveText(
      "From application to arrival.One Atlas, every next step.",
    );
    await expect(showcase.getByRole("img")).toBeVisible();
    await expect(showcase.locator("[data-macbook-base]")).toHaveCount(0);

    if ((page.viewportSize()?.width ?? 0) >= 1280) {
      const primaryLine = showcase.locator(
        '[data-showcase-line="primary"]',
      );
      const secondaryLine = showcase.locator(
        '[data-showcase-line="secondary"]',
      );
      const [primaryLineBox, secondaryLineBox] = await Promise.all([
        primaryLine.boundingBox(),
        secondaryLine.boundingBox(),
      ]);
      expect(primaryLineBox).not.toBeNull();
      expect(secondaryLineBox).not.toBeNull();
      expect(Math.abs(primaryLineBox!.height - secondaryLineBox!.height)).toBeLessThan(
        2,
      );

      const frameBox = await showcase
        .locator("[data-showcase-frame]")
        .boundingBox();
      const viewportWidth = page.viewportSize()!.width;
      expect(frameBox).not.toBeNull();
      expect(frameBox!.width / viewportWidth).toBeGreaterThan(0.75);
      expect(frameBox!.width / viewportWidth).toBeLessThan(0.9);

      const headingFontSize = await showcase
        .getByRole("heading", { level: 2 })
        .evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize));
      expect(headingFontSize).toBeGreaterThanOrEqual(20);
      expect(headingFontSize).toBeLessThanOrEqual(26);
    }

    const [heroBox, showcaseBox] = await Promise.all([
      hero.boundingBox(),
      showcase.boundingBox(),
    ]);
    expect(heroBox).not.toBeNull();
    expect(showcaseBox).not.toBeNull();
    expect(showcaseBox!.y).toBeGreaterThanOrEqual(
      heroBox!.y + heroBox!.height - 1,
    );

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });
});
