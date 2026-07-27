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

  test("places the Atlas readiness grid after the dashboard showcase", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const showcase = page.locator("[data-landing-3-showcase]");
    const readiness = page.locator("[data-landing-3-readiness]");
    await expect(readiness).toBeVisible();
    await expect(readiness.getByRole("heading", { level: 2 })).toHaveText(
      "It’s not just about getting in.It’s about being ready for everything after.",
    );
    await expect(readiness.locator("[data-readiness-feature]")).toHaveCount(4);

    const [showcaseBox, readinessBox] = await Promise.all([
      showcase.boundingBox(),
      readiness.boundingBox(),
    ]);
    expect(showcaseBox).not.toBeNull();
    expect(readinessBox).not.toBeNull();
    expect(readinessBox!.y).toBeGreaterThanOrEqual(
      showcaseBox!.y + showcaseBox!.height - 1,
    );

    const copyBox = await readiness.locator("[data-readiness-copy]").boundingBox();
    const visualBox = await readiness
      .locator("[data-readiness-visual]")
      .boundingBox();
    expect(copyBox).not.toBeNull();
    expect(visualBox).not.toBeNull();

    if ((page.viewportSize()?.width ?? 0) >= 1280) {
      expect(copyBox!.x).toBeLessThan(visualBox!.x);
      const viewportWidth = page.viewportSize()!.width;
      expect(visualBox!.x / viewportWidth).toBeGreaterThan(0.43);
      expect(visualBox!.x / viewportWidth).toBeLessThan(0.48);
      const gridBox = await readiness.locator("[data-readiness-grid]").boundingBox();
      expect(gridBox).not.toBeNull();
      expect(gridBox!.y).toBeGreaterThanOrEqual(visualBox!.y - 1);
      const headingFontSize = await readiness
        .getByRole("heading", { level: 2 })
        .evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize));
      expect(headingFontSize).toBeGreaterThanOrEqual(18);
      expect(headingFontSize).toBeLessThanOrEqual(22);
    } else {
      expect(visualBox!.y).toBeGreaterThan(copyBox!.y);
    }

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("presents the Raycast-sized Atlas services carousel after readiness", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const readiness = page.locator("[data-landing-3-readiness]");
    const services = page.locator("[data-landing-3-services]");
    await expect(services).toBeVisible();
    await expect(services.getByRole("heading", { level: 2 })).toHaveText(
      "There’s a service for that.Everything you need abroad, without opening ten different tabs.",
    );

    const [readinessBox, servicesBox] = await Promise.all([
      readiness.boundingBox(),
      services.boundingBox(),
    ]);
    expect(readinessBox).not.toBeNull();
    expect(servicesBox).not.toBeNull();
    expect(servicesBox!.y).toBeGreaterThanOrEqual(
      readinessBox!.y + readinessBox!.height - 1,
    );

    const prepareTab = services.getByRole("tab", { name: "Prepare" });
    const arriveTab = services.getByRole("tab", { name: "Arrive" });
    const activeBackdrop = services.locator(
      "[data-services-active-backdrop]",
    );
    await expect(prepareTab).toHaveAttribute("aria-selected", "true");
    await expect(activeBackdrop).toBeVisible();
    await expect(services.getByText("University Shortlist")).toBeVisible();

    const firstCard = services.locator("[data-atlas-service-card]").first();
    const firstCardBox = await firstCard.boundingBox();
    expect(firstCardBox).not.toBeNull();

    if ((page.viewportSize()?.width ?? 0) >= 1280) {
      const viewportWidth = page.viewportSize()!.width;
      const expectedRailStart = Math.max(32, (viewportWidth - 1170) / 2);
      const headingBox = await services
        .getByRole("heading", { level: 2 })
        .boundingBox();
      expect(headingBox).not.toBeNull();
      expect(Math.abs(firstCardBox!.x - expectedRailStart)).toBeLessThan(3);
      expect(Math.abs(headingBox!.x - firstCardBox!.x)).toBeLessThan(3);
      expect(firstCardBox!.width).toBeGreaterThanOrEqual(300);
      expect(firstCardBox!.width).toBeLessThanOrEqual(390);
      expect(firstCardBox!.height).toBeGreaterThanOrEqual(270);
      expect(firstCardBox!.height).toBeLessThanOrEqual(330);
    }

    const initialBackdropTransform = await activeBackdrop.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await arriveTab.click();
    await expect(arriveTab).toHaveAttribute("aria-selected", "true");
    await expect(services.getByText("Airport Pickup")).toBeVisible();

    const backdropTiming = await activeBackdrop.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        duration: style.transitionDuration,
        property: style.transitionProperty,
      };
    });
    expect(backdropTiming.duration).toBe("0.3s");
    expect(backdropTiming.property).toContain("transform");
    await expect
      .poll(() =>
        activeBackdrop.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(initialBackdropTransform);

    const animationContract = await services
      .locator("[data-atlas-service-card]")
      .evaluateAll((cards) =>
        cards.slice(0, 2).map((card) => {
          const animation = card.getAnimations()[0];
          const effect = animation?.effect as KeyframeEffect | null;
          const timing = effect?.getTiming();
          const keyframes = effect?.getKeyframes();
          return {
            delay: timing?.delay,
            duration: timing?.duration,
            easing: timing?.easing,
            fromOpacity: keyframes?.[0]?.opacity,
            fromTransform: keyframes?.[0]?.transform,
          };
        }),
      );
    expect(animationContract).toEqual([
      {
        delay: 100,
        duration: 700,
        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        fromOpacity: "0",
        fromTransform: "translate(10px, 50px) scale(0.98)",
      },
      {
        delay: 180,
        duration: 700,
        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        fromOpacity: "0",
        fromTransform: "translate(10px, 50px) scale(0.98)",
      },
    ]);

    const rail = services.locator("[data-services-rail]");
    const initialScrollLeft = await rail.evaluate((element) => element.scrollLeft);
    await services.getByRole("button", { name: "Next services" }).click();
    await expect
      .poll(() => rail.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(initialScrollLeft);

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("scrubs the Atlas essentials orbit after services", async ({ page }) => {
    await page.goto("/landing-3");

    const services = page.locator("[data-landing-3-services]");
    const essentials = page.locator("[data-landing-3-essentials]");
    const stage = essentials.locator("[data-essentials-stage]");
    const orbit = essentials.locator("[data-essentials-orbit]");

    await expect(essentials).toBeVisible();
    await expect(
      essentials.getByRole("heading", {
        level: 2,
        name: "All the essentials that matter in one place",
      }),
    ).toBeVisible();

    const [servicesBox, essentialsBox] = await Promise.all([
      services.boundingBox(),
      essentials.boundingBox(),
    ]);
    expect(servicesBox).not.toBeNull();
    expect(essentialsBox).not.toBeNull();
    expect(essentialsBox!.y).toBeGreaterThanOrEqual(
      servicesBox!.y + servicesBox!.height - 1,
    );
    expect(await stage.evaluate((element) => getComputedStyle(element).position)).toBe(
      "sticky",
    );

    await page.evaluate(
      (scrollY) => window.scrollTo(0, scrollY),
      essentialsBox!.y,
    );
    await expect
      .poll(() =>
        essentials
          .locator("[data-essential-tile]")
          .first()
          .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity)),
      )
      .toBeGreaterThan(0.9);

    const before = await orbit.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await page.evaluate(
      (scrollY) => window.scrollTo(0, scrollY),
      essentialsBox!.y + essentialsBox!.height * 0.6,
    );
    await expect
      .poll(() =>
        orbit.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(before);

    if ((page.viewportSize()?.width ?? 0) >= 810) {
      const fieldBox = await essentials
        .locator("[data-essentials-field]")
        .boundingBox();
      expect(fieldBox).not.toBeNull();
      expect(fieldBox!.width).toBeGreaterThanOrEqual(820);
      expect(fieldBox!.width).toBeLessThanOrEqual(855);
    }

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });
});
