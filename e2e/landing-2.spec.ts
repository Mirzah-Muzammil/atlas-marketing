import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`landing-2 has no horizontal overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/landing-2");
    await expect(page.locator("[data-scene-ready]")).toHaveAttribute(
      "data-scene-ready",
      "true",
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("landing-2 reaches every checkpoint and reverses deterministically", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/landing-2");
  const scene = page.locator("[data-cinematic-scroll]");
  await expect(scene).toHaveAttribute("data-scene-ready", "true");

  const checkpoints = [0, 0.18, 0.27, 0.44, 0.58, 0.74, 0.9, 1];
  for (const progress of checkpoints) {
    await page.evaluate((nextProgress) => {
      const section = document.querySelector<HTMLElement>("[data-cinematic-scroll]")!;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const travel = section.offsetHeight - window.innerHeight;
      window.scrollTo(0, top + travel * nextProgress);
    }, progress);
    await expect.poll(async () => {
      const value = await scene.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).getPropertyValue("--scene-progress")),
      );
      return Math.abs(value - progress);
    }, { timeout: 4000 }).toBeLessThan(0.025);

    const valuesAreFinite = await scene.evaluate((element) => {
      const style = getComputedStyle(element);
      return [
        "--scene-progress",
        "--world-scale",
        "--world-brightness",
        "--world-saturation",
        "--flight-opacity",
        "--university-opacity",
        "--classroom-opacity",
        "--intro-opacity",
        "--panel-a-opacity",
        "--panel-b-opacity",
        "--catalog-opacity",
      ].every((property) => Number.isFinite(Number.parseFloat(style.getPropertyValue(property))));
    });
    expect(valuesAreFinite).toBe(true);
    await page.screenshot({
      animations: "disabled",
      path: `/tmp/landing-2-${Math.round(progress * 100).toString().padStart(3, "0")}.png`,
    });
  }

  for (const progress of [0.74, 0.44, 0.18, 0]) {
    await page.evaluate((nextProgress) => {
      const section = document.querySelector<HTMLElement>("[data-cinematic-scroll]")!;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const travel = section.offsetHeight - window.innerHeight;
      window.scrollTo(0, top + travel * nextProgress);
    }, progress);
    await expect.poll(async () => {
      const value = await scene.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).getPropertyValue("--scene-progress")),
      );
      return Math.abs(value - progress);
    }, { timeout: 4000 }).toBeLessThan(0.025);
  }
});

test("landing-2 final rail supports keyboard navigation", async ({ page }) => {
  await page.goto("/landing-2");
  const catalog = page.locator(".cine-catalog");
  await expect(catalog).toHaveAttribute("inert", "");
  await page.getByRole("link", { name: "Essentials" }).click();
  await expect(catalog).not.toHaveAttribute("inert", "");
  await expect(page.locator(".cine-intro")).toHaveAttribute("inert", "");
  const rail = page.getByRole("region", { name: "Atlas essentials catalog" });
  await rail.focus();
  await rail.press("ArrowRight");
  await expect(page.getByRole("status")).toHaveText("Banking, 2 of 8");
  await rail.press("End");
  await expect(page.getByRole("status")).toHaveText("Visas, 8 of 8");
  const nextButton = page.getByRole("button", { name: "Next service" });
  await expect(nextButton).toBeDisabled();

  await nextButton.focus();
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>("[data-cinematic-scroll]")!;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo(0, top + travel * 0.74);
  });
  await expect(page.locator('[data-timeline-nav="essentials"]')).toBeFocused();
});

test("landing-2 presents all content in normal flow with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/landing-2");
  const scene = page.locator("[data-cinematic-scroll]");
  await expect(scene).toHaveAttribute("data-reduced-motion", "true");
  await expect(page.getByRole("heading", { name: /the route changes/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /everything you need/i })).toBeVisible();
  await page.getByRole("link", { name: "Essentials" }).click();
  await expect(page.getByRole("region", { name: "Atlas essentials catalog" })).toBeVisible();
  expect(await page.locator("[data-cinematic-stage]").evaluate(
    (element) => getComputedStyle(element).position,
  )).toBe("relative");
});

test("landing-2 keeps the console free of route errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/landing-2");
  await expect(page.locator("[data-scene-ready]")).toHaveAttribute(
    "data-scene-ready",
    "true",
  );
  await page.getByRole("link", { name: "Essentials" }).click();
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});

test("landing-2 portrait hero and final state remain composed", async ({ page }) => {
  for (const viewport of [
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/landing-2");
    await expect(page.locator("[data-scene-ready]")).toHaveAttribute(
      "data-scene-ready",
      "true",
    );
    if (viewport.name === "mobile") {
      expect(await page.locator('[data-layer-role="00-flight-window"]').evaluate(
        (element) => getComputedStyle(element).objectPosition,
      )).toBe("50% 50%");
    }
    await page.waitForTimeout(550);
    await page.screenshot({ path: `/tmp/landing-2-${viewport.name}-hero.png` });
    await page.getByRole("link", { name: "Essentials" }).click();
    await expect.poll(async () => {
      return page.locator("[data-cinematic-scroll]").evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).getPropertyValue("--scene-progress")),
      );
    }, { timeout: 4000 }).toBeGreaterThan(0.87);
    await page.screenshot({ path: `/tmp/landing-2-${viewport.name}-final.png` });
  }
});
