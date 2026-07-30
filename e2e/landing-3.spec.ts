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
    const demo = showcase.locator("[data-atlas-dashboard-demo]");
    const cursor = demo.locator("[data-demo-cursor]");
    const initialStep = await demo.getAttribute("data-demo-step");
    const initialCursorPosition = await cursor.getAttribute("style");
    await expect(demo).toBeVisible();
    await expect(cursor).toBeVisible();
    await expect(demo.locator("[data-demo-hotspot]")).toHaveCount(4);
    await expect(showcase.getByRole("button", { name: "Replay demo" })).toBeVisible();
    await expect
      .poll(() => demo.getAttribute("data-demo-step"), { timeout: 5_000 })
      .not.toBe(initialStep);
    await expect
      .poll(() => cursor.getAttribute("style"), { timeout: 5_000 })
      .not.toBe(initialCursorPosition);
    await showcase.getByRole("button", { name: "Replay demo" }).click();
    await expect(demo).toHaveAttribute("data-demo-step", "matcher");

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

  test("reveals only the eight primary section titles as they enter view", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const titles = page.locator("[data-landing-3-title-reveal]");
    await expect(titles).toHaveCount(8);

    for (const title of await titles.all()) {
      await title.scrollIntoViewIfNeeded();
      await expect(title).toHaveAttribute(
        "data-landing-3-title-reveal",
        "visible",
      );
    }
  });

  test("places an interactive Atlas macOS preview after the dashboard showcase", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const showcase = page.locator("[data-landing-3-showcase]");
    const readiness = page.locator("[data-landing-3-readiness]");
    const previewWindow = readiness.locator("[data-atlas-preview-window]");
    await expect(readiness).toBeVisible();
    await readiness.scrollIntoViewIfNeeded();
    await expect(readiness.getByRole("heading", { level: 2 })).toHaveText(
      "Studying in the UK? See your Atlas.",
    );
    await expect(previewWindow).toBeVisible();
    await expect(readiness.locator("[data-macos-control]")).toHaveCount(3);
    await expect(readiness.locator("[data-readiness-feature]")).toHaveCount(4);
    await expect(
      readiness.locator("[data-readiness-cinematic-depth]"),
    ).toBeVisible();
    await expect(readiness.locator("[data-readiness-depth-grid]")).toBeVisible();
    await expect(readiness.locator("[data-readiness-depth-glow]")).toBeVisible();
    await expect(readiness.locator("[data-readiness-depth-grain]")).toBeVisible();
    await expect(readiness.locator("[data-readiness-key]")).toHaveCount(0);
    await expect(readiness.getByLabel("Level")).toHaveValue("Master's");
    await expect(readiness.getByLabel("Field")).toHaveValue("Computer Science");

    if ((page.viewportSize()?.width ?? 0) >= 1280) {
      const [windowBox, clearBox, connectedBox, personalBox, transparentBox] =
        await Promise.all([
          previewWindow.boundingBox(),
          readiness.locator('[data-readiness-slot="clear"]').boundingBox(),
          readiness.locator('[data-readiness-slot="connected"]').boundingBox(),
          readiness.locator('[data-readiness-slot="personal"]').boundingBox(),
          readiness.locator('[data-readiness-slot="transparent"]').boundingBox(),
        ]);
      expect(windowBox).not.toBeNull();
      expect(clearBox).not.toBeNull();
      expect(connectedBox).not.toBeNull();
      expect(personalBox).not.toBeNull();
      expect(transparentBox).not.toBeNull();
      expect(
        Math.abs(
          windowBox!.x + windowBox!.width / 2 - page.viewportSize()!.width / 2,
        ),
      ).toBeLessThanOrEqual(12);
      expect(clearBox!.x + clearBox!.width).toBeLessThan(windowBox!.x);
      expect(connectedBox!.x + connectedBox!.width).toBeLessThan(windowBox!.x);
      expect(personalBox!.x).toBeGreaterThan(
        windowBox!.x + windowBox!.width,
      );
      expect(transparentBox!.x).toBeGreaterThan(
        windowBox!.x + windowBox!.width,
      );
    }

    const [showcaseBox, readinessBox] = await Promise.all([
      showcase.boundingBox(),
      readiness.boundingBox(),
    ]);
    expect(showcaseBox).not.toBeNull();
    expect(readinessBox).not.toBeNull();
    expect(readinessBox!.y).toBeGreaterThanOrEqual(
      showcaseBox!.y + showcaseBox!.height - 1,
    );

    await readiness.getByLabel("Level").selectOption("Undergraduate");
    await readiness.getByLabel("Field").selectOption("Business");
    await readiness.getByRole("button", { name: "Show my Atlas" }).click();
    const result = readiness.locator("[data-atlas-preview-result]");
    await expect(result).toContainText("Your Undergraduate Business Atlas");
    await expect(result.locator("li")).toHaveCount(3);

    const windowBox = await previewWindow.boundingBox();
    expect(windowBox).not.toBeNull();
    expect(windowBox!.x).toBeGreaterThanOrEqual(0);
    expect(windowBox!.x + windowBox!.width).toBeLessThanOrEqual(
      page.viewportSize()!.width,
    );

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("moves two authentic university rows in alternating directions with hover feedback", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const readiness = page.locator("[data-landing-3-readiness]");
    const marquee = page.locator("[data-landing-3-university-marquee]");
    const serviceCatalog = page.locator("[data-landing-3-service-catalog]");
    const rows = marquee.locator("[data-university-marquee-row]");
    const tracks = marquee.locator("[data-university-marquee-track]");

    await expect(marquee).toBeVisible();
    await expect(rows).toHaveCount(2);
    await expect(
      marquee.locator('[data-marquee-set="primary"] [data-university-tile]'),
    ).toHaveCount(20);
    await expect(marquee.locator('[data-marquee-set="duplicate"]')).toHaveCount(
      2,
    );

    const [readinessBox, marqueeBox, serviceCatalogBox] = await Promise.all([
      readiness.boundingBox(),
      marquee.boundingBox(),
      serviceCatalog.boundingBox(),
    ]);
    expect(marqueeBox!.y).toBeGreaterThanOrEqual(
      serviceCatalogBox!.y + serviceCatalogBox!.height - 1,
    );
    expect(readinessBox!.y).toBeGreaterThanOrEqual(
      marqueeBox!.y + marqueeBox!.height - 1,
    );

    expect(
      await rows.evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("data-marquee-direction")),
      ),
    ).toEqual(["left", "right"]);
    expect(
      await tracks.evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).animationName),
      ),
    ).toEqual([
      "landing-3-universities-left",
      "landing-3-universities-right",
    ]);

    const firstTile = marquee
      .locator('[data-marquee-set="primary"] [data-university-tile]')
      .first();
    const firstTrack = tracks.first();
    await rows.first().hover();
    await expect
      .poll(() =>
        firstTrack.evaluate(
          (element) => getComputedStyle(element).animationPlayState,
        ),
      )
      .toBe("paused");
    await firstTile.hover();
    await expect
      .poll(() =>
        firstTrack.evaluate(
          (element) => getComputedStyle(element).animationPlayState,
        ),
      )
      .toBe("paused");
    await expect
      .poll(() =>
        firstTile.evaluate((element) => ({
          filter: getComputedStyle(element).filter,
          transform: getComputedStyle(element).transform,
        })),
      )
      .toEqual(expect.objectContaining({ filter: "none" }));
    expect(
      await firstTile.evaluate((element) => getComputedStyle(element).transform),
    ).not.toBe("none");
  });

  test("draws an interactive four-stage Atlas service journey", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const readiness = page.locator("[data-landing-3-readiness]");
    const services = page.locator("[data-landing-3-services]");
    await expect(services).toBeVisible();
    await expect(services.getByRole("heading", { level: 2 })).toHaveText(
      "How Atlas Works",
    );
    await expect(
      services.getByText("Your journey, stage by stage."),
    ).toBeVisible();
    await expect(services).toHaveAttribute("data-journey-scroll-steps", "4");
    await expect(services).toHaveAttribute(
      "data-journey-scroll-mode",
      "continuous",
    );

    const [readinessBox, servicesBox] = await Promise.all([
      readiness.boundingBox(),
      services.boundingBox(),
    ]);
    expect(readinessBox).not.toBeNull();
    expect(servicesBox).not.toBeNull();
    expect(readinessBox!.y).toBeGreaterThanOrEqual(
      servicesBox!.y + servicesBox!.height - 1,
    );

    const stages = services.locator("[data-journey-stage]");
    const nodes = services.locator("[data-journey-node]");
    const path = services.locator("[data-journey-path]");
    const progressPath = services.locator("[data-journey-path-progress]");
    const progressMask = services.locator("[data-journey-progress-mask]");
    const pendingPath = services.locator("[data-journey-path-pending]");
    const flight = services.locator("[data-journey-flight]");
    const flightShape = services.locator("[data-journey-flight-shape]");
    const panel = services.locator("[data-active-journey-panel]");
    const stickyJourney = services.locator("[data-journey-sticky]");
    await expect(stages).toHaveCount(4);
    await expect(nodes).toHaveCount(4);
    await expect(flight).toHaveCount(1);
    await expect(services.locator("linearGradient")).toHaveCount(0);
    await expect(progressPath).toHaveAttribute("stroke", "#f35a02");
    await expect(pendingPath).toHaveAttribute("stroke", "#34383f");
    await expect(pendingPath).toHaveAttribute(
      "d",
      "M125 72C220 72 280 30 375 30S530 100 625 100S780 52 875 52",
    );
    await expect(pendingPath).toHaveAttribute("stroke-dasharray", "1 13");
    await expect(progressPath).toHaveAttribute("stroke-dasharray", "1 13");
    await expect(path).toHaveCount(1);
    const desktopJourney = (page.viewportSize()?.width ?? 0) >= 1024;
    if (desktopJourney) {
      await expect(path).toBeVisible();
      const stickyBox = await stickyJourney.boundingBox();
      const servicesBox = await services.boundingBox();
      expect(stickyBox).not.toBeNull();
      expect(servicesBox).not.toBeNull();
      expect(stickyBox!.height).toBeLessThanOrEqual(
        page.viewportSize()!.height + 1,
      );
      expect(servicesBox!.height - stickyBox!.height).toBeGreaterThanOrEqual(
        page.viewportSize()!.height * 1.15,
      );
      expect(servicesBox!.height - stickyBox!.height).toBeLessThanOrEqual(
        page.viewportSize()!.height * 1.21,
      );
      const flightBox = await flight.boundingBox();
      expect(flightBox).not.toBeNull();
      expect(flightBox!.width).toBeGreaterThanOrEqual(28);
    } else {
      await expect(path).toBeHidden();
    }
    await expect(services.locator("[data-lucide]")).toHaveCount(0);

    const prepareStage = services.getByRole("button", {
      name: "Explore Prepare",
    });
    const arriveStage = services.getByRole("button", {
      name: "Explore Arrive",
    });
    await prepareStage.click();
    await expect(panel).toHaveAttribute("data-active-stage", "prepare");
    expect(
      await services
        .getByText("What you do", { exact: true })
        .evaluate((element) => getComputedStyle(element).color),
    ).toBe("rgb(255, 255, 255)");
    expect(
      await services
        .getByText("Tell Atlas your grades, budget and the course you want.", {
          exact: true,
        })
        .evaluate((element) => getComputedStyle(element).color),
    ).toContain("/ 0.9");
    expect(
      await panel
        .locator("li")
        .first()
        .evaluate((element) => getComputedStyle(element).color),
    ).toContain("/ 0.9");
    await expect
      .poll(() =>
        stages
          .nth(1)
          .evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("1");

    await expect(prepareStage).toHaveAttribute("aria-pressed", "true");
    await expect(panel).toHaveAttribute("data-active-stage", "prepare");
    await expect(services.getByText("University shortlist")).toBeVisible();

    const initialDashOffset = desktopJourney
      ? await progressMask.evaluate(
          (element) => getComputedStyle(element).strokeDashoffset,
        )
      : null;
    const initialFlightTransform = desktopJourney
      ? await flight.getAttribute("transform")
      : null;
    await arriveStage.click();
    await expect(arriveStage).toHaveAttribute("aria-pressed", "true");
    await expect(panel).toHaveAttribute("data-active-stage", "arrive");
    await expect(services.getByText("Visa guidance")).toBeVisible();
    if (desktopJourney) {
      await expect
        .poll(() =>
          progressMask.evaluate(
            (element) => getComputedStyle(element).strokeDashoffset,
          ),
        )
        .not.toBe(initialDashOffset);
      await expect
        .poll(() => flight.getAttribute("transform"))
        .not.toBe(initialFlightTransform);
    }
    await expect(stages.nth(0)).toHaveAttribute("data-stage-state", "complete");
    await expect(stages.nth(1)).toHaveAttribute("data-stage-state", "active");
    await expect
      .poll(() =>
        nodes
          .nth(0)
          .evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .toBe("rgb(243, 90, 2)");
    await expect
      .poll(() =>
        nodes
          .nth(1)
          .evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .toBe("rgb(243, 90, 2)");
    await expect
      .poll(() =>
        stages
          .nth(0)
          .evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("1");
    expect(
      await flightShape.evaluate(
        (element) => getComputedStyle(element).animationName,
      ),
    ).toBe("landing-3-journey-flight-glow");

    if (desktopJourney) {
      await services.evaluate((section) => {
        const sticky = section.querySelector<HTMLElement>(
          "[data-journey-sticky]",
        );
        if (!sticky) return;
        const top = window.scrollY + section.getBoundingClientRect().top;
        window.scrollTo(0, top + section.clientHeight - sticky.clientHeight);
      });
      await expect(stages.nth(3)).toHaveAttribute(
        "data-stage-state",
        "complete",
      );
      await expect
        .poll(() =>
          nodes
            .nth(3)
            .evaluate((element) => getComputedStyle(element).backgroundColor),
        )
        .toBe("rgb(243, 90, 2)");
    }

    const panelAnimation = await panel.evaluate((element) => {
      const animation = getComputedStyle(element);
      return {
        duration: animation.animationDuration,
        name: animation.animationName,
      };
    });
    expect(panelAnimation).toEqual({
      duration: "0.32s",
      name: "landing-3-journey-panel-in",
    });
    await expect(panel).toHaveAttribute("data-journey-detail-rail", "true");
    await expect
      .poll(() =>
        panel.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            background: style.backgroundColor,
            radius: style.borderRadius,
            shadow: style.boxShadow,
          };
        }),
      )
      .toEqual({
        background: "rgba(0, 0, 0, 0)",
        radius: "0px",
        shadow: "none",
      });

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("keeps the Atlas essentials orbit flowing with global scroll", async ({ page }) => {
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
      "relative",
    );
    expect(essentialsBox!.height).toBeLessThanOrEqual(
      page.viewportSize()!.height * 1.3,
    );

    await expect
      .poll(() =>
        essentials
          .locator("[data-essential-node]")
          .first()
          .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity)),
      )
      .toBeGreaterThan(0.9);

    const before = await orbit.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await page.evaluate(() => window.scrollTo(0, 420));
    await expect
      .poll(() =>
        orbit.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(before);

    if ((page.viewportSize()?.width ?? 0) >= 810) {
      await page.setViewportSize({ width: 1440, height: 900 });
      const headingBox = await essentials
        .getByRole("heading", {
          level: 2,
          name: "All the essentials that matter in one place",
        })
        .boundingBox();
      const stageBox = await stage.boundingBox();
      const fieldBox = await essentials
        .locator("[data-essentials-field]")
        .boundingBox();
      const phoneBox = await essentials
        .locator("[data-essentials-phone]")
        .boundingBox();
      const firstNodeY = await essentials
        .locator("[data-essential-node]")
        .evaluateAll((nodes) =>
          Math.min(...nodes.map((node) => node.getBoundingClientRect().top)),
        );
      const lastNodeBottom = await essentials
        .locator("[data-essential-node]")
        .evaluateAll((nodes) =>
          Math.max(...nodes.map((node) => node.getBoundingClientRect().bottom)),
        );
      expect(headingBox).not.toBeNull();
      expect(stageBox).not.toBeNull();
      expect(fieldBox).not.toBeNull();
      expect(phoneBox).not.toBeNull();
      expect(firstNodeY).toBeGreaterThanOrEqual(
        headingBox!.y + headingBox!.height + 24,
      );
      expect(lastNodeBottom).toBeLessThanOrEqual(
        stageBox!.y + stageBox!.height,
      );
      expect(fieldBox!.width).toBeGreaterThanOrEqual(1100);
      expect(phoneBox!.width).toBeGreaterThanOrEqual(300);
      expect(phoneBox!.width).toBeLessThanOrEqual(395);
      expect(phoneBox!.height).toBeGreaterThanOrEqual(520);
    }
    await expect(essentials.locator("[data-essential-node]")).toHaveCount(40);

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("renders iMessage-style Atlas support testimonials with hover motion", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const essentials = page.locator("[data-landing-3-essentials]");
    const support = page.locator("[data-landing-3-support]");
    const panel = support.locator("[data-support-panel]");
    const firstPill = support.locator("[data-support-pill]").first();
    const pills = support.locator("[data-support-pill]");

    await expect(support).toBeVisible();
    await expect(
      support.getByRole("heading", {
        level: 3,
        name: "Real stories. Real support.",
      }),
    ).toBeVisible();

    const [essentialsBox, supportBox, panelBox] = await Promise.all([
      essentials.boundingBox(),
      support.boundingBox(),
      panel.boundingBox(),
    ]);
    expect(essentialsBox).not.toBeNull();
    expect(supportBox).not.toBeNull();
    expect(panelBox).not.toBeNull();
    expect(supportBox!.y).toBeGreaterThanOrEqual(
      essentialsBox!.y + essentialsBox!.height - 1,
    );
    await expect(pills).toHaveCount(5);
    await expect(support.locator("[data-support-message]")).toHaveCount(5);
    await expect(support.locator("[data-support-tail]")).toHaveCount(5);
    await expect(support.locator("[data-support-avatar]")).toHaveCount(5);
    for (const student of [
      "Maya Patel",
      "Arjun Nair",
      "Sofia Chen",
      "Daniel Okafor",
      "Lina Hassan",
    ]) {
      await expect(support.getByText(student)).toBeVisible();
      await expect(
        support.getByRole("img", { name: `${student} avatar` }),
      ).toBeVisible();
    }
    for (const pill of await pills.all()) {
      await expect
        .poll(() =>
          pill.evaluate((element) => getComputedStyle(element).opacity),
        )
        .toBe("1");
    }
    const messageColors = await support
      .locator("[data-support-message]")
      .evaluateAll((messages) =>
        messages.map((message) => getComputedStyle(message).backgroundColor),
      );
    expect(new Set(messageColors).size).toBe(5);
    expect(messageColors).not.toContain("rgb(255, 255, 255)");

    const tailColors = await support
      .locator("[data-support-tail-piece]")
      .evaluateAll((tails) =>
        tails.map((tail) => getComputedStyle(tail).fill),
      );
    expect(tailColors).toEqual(messageColors);

    if ((page.viewportSize()?.width ?? 0) >= 810) {
      await support.scrollIntoViewIfNeeded();
      expect(panelBox!.width).toBeGreaterThanOrEqual(
        page.viewportSize()!.width - 48,
      );
      expect(panelBox!.height).toBeGreaterThanOrEqual(720);
      expect(
        await panel.evaluate((element) => ({
          backgroundColor: getComputedStyle(element).backgroundColor,
          borderRadius: Number.parseFloat(
            getComputedStyle(element).borderTopLeftRadius,
          ),
        })),
      ).toEqual({
        backgroundColor: "rgb(244, 245, 252)",
        borderRadius: 64,
      });
      expect(
        await support
          .getByRole("heading", {
            level: 3,
            name: "Real stories. Real support.",
          })
          .evaluate((element) => getComputedStyle(element).color),
      ).toBe("rgb(13, 13, 15)");
      const messageFontSizes = await pills.locator("p").evaluateAll((elements) =>
        elements.map((element) =>
          Number.parseFloat(getComputedStyle(element).fontSize),
        ),
      );
      expect(Math.min(...messageFontSizes)).toBeGreaterThanOrEqual(18);
      const unobscuredMessages = await pills.locator("p").evaluateAll((messages) =>
        messages.map((message) => {
          const box = message.getBoundingClientRect();
          const topmost = document.elementFromPoint(
            box.left + box.width / 2,
            box.top + box.height / 2,
          );
          return topmost?.closest("[data-support-pill]") === message.closest("[data-support-pill]");
        }),
      );
      expect(unobscuredMessages).toEqual([true, true, true, true, true]);
    }

    await page.evaluate(
      ({ sectionY, viewportHeight }) =>
        window.scrollTo(0, sectionY - viewportHeight),
      {
        sectionY: supportBox!.y,
        viewportHeight: page.viewportSize()!.height,
      },
    );
    const before = await firstPill.evaluate((element) => ({
      opacity: getComputedStyle(element).opacity,
      rotate: getComputedStyle(element).rotate,
      transform: getComputedStyle(element).transform,
    }));

    await page.evaluate(
      ({ sectionY, viewportHeight }) =>
        window.scrollTo(0, sectionY - viewportHeight * 0.4),
      {
        sectionY: supportBox!.y,
        viewportHeight: page.viewportSize()!.height,
      },
    );
    await expect
      .poll(() =>
        firstPill.evaluate((element) => ({
          opacity: getComputedStyle(element).opacity,
          rotate: getComputedStyle(element).rotate,
          transform: getComputedStyle(element).transform,
        })),
      )
      .toEqual(before);

    if ((page.viewportSize()?.width ?? 0) >= 810) {
      const restingBox = await firstPill.boundingBox();
      const restingZIndex = await firstPill.evaluate(
        (element) => getComputedStyle(element).zIndex,
      );
      await firstPill.hover();
      await expect.poll(async () => (await firstPill.boundingBox())!.width).toBeGreaterThan(
        restingBox!.width * 1.05,
      );
      await expect
        .poll(() => firstPill.evaluate((element) => getComputedStyle(element).zIndex))
        .not.toBe(restingZIndex);

      await page.mouse.move(0, 0);
      await firstPill.focus();
      await expect.poll(async () => (await firstPill.boundingBox())!.width).toBeGreaterThan(
        restingBox!.width * 1.05,
      );
      await expect(firstPill).toBeFocused();
    }

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("compares the old agent model with Atlas directly below Essentials", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const essentials = page.locator("[data-landing-3-essentials]");
    const comparison = page.locator("[data-landing-3-agent-comparison]");
    const support = page.locator("[data-landing-3-support]");

    await expect(comparison).toBeVisible();
    await expect(
      comparison.getByRole("heading", {
        level: 2,
        name: "Why students switch",
      }),
    ).toBeVisible();
    await expect(comparison.locator("[data-comparison-agent-item]")).toHaveCount(4);
    await expect(comparison.locator("[data-comparison-atlas-item]")).toHaveCount(4);
    const slider = comparison.locator(
      'input[aria-label="Compare Atlas with a traditional agent"]',
    );
    await expect(slider).toHaveValue("52");

    if ((page.viewportSize()?.width ?? 0) >= 1280) {
      const stageBox = await comparison
        .locator("[data-comparison-slider-stage]")
        .boundingBox();
      expect(stageBox).not.toBeNull();
      expect(stageBox!.width).toBeLessThanOrEqual(982);
      expect(stageBox!.height).toBeLessThanOrEqual(550);
    }

    const [essentialsBox, comparisonBox, supportBox] = await Promise.all([
      essentials.boundingBox(),
      comparison.boundingBox(),
      support.boundingBox(),
    ]);
    expect(essentialsBox).not.toBeNull();
    expect(comparisonBox).not.toBeNull();
    expect(supportBox).not.toBeNull();
    expect(comparisonBox!.y).toBeGreaterThanOrEqual(
      essentialsBox!.y + essentialsBox!.height - 1,
    );
    expect(supportBox!.y).toBeGreaterThanOrEqual(
      comparisonBox!.y + comparisonBox!.height - 1,
    );

    if ((page.viewportSize()?.width ?? 0) >= 1280) {
      const divider = comparison.locator("[data-comparison-divider]");
      const leftBefore = await divider.evaluate(
        (element) => getComputedStyle(element).left,
      );
      await slider.fill("64");
      await expect
        .poll(() => divider.evaluate((element) => getComputedStyle(element).left))
        .not.toBe(leftBefore);
    }

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("settles Atlas support testimonials when reduced motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/landing-3");

    const pills = page.locator(
      "[data-landing-3-support] [data-support-pill]",
    );
    await expect(pills).toHaveCount(5);

    for (const pill of await pills.all()) {
      await expect
        .poll(() =>
          pill.evaluate((element) => ({
            opacity: getComputedStyle(element).opacity,
            rotate: getComputedStyle(element).rotate,
          })),
        )
        .toEqual(expect.objectContaining({ opacity: "1" }));
      expect(
        await pill.evaluate((element) => getComputedStyle(element).rotate),
      ).not.toBe("none");
    }

    const titles = page.locator("[data-landing-3-title-reveal]");
    await expect(titles).toHaveCount(8);
    for (const title of await titles.all()) {
      await expect
        .poll(() =>
          title.evaluate((element) => ({
            opacity: getComputedStyle(element).opacity,
            transitionDuration: getComputedStyle(element).transitionDuration,
          })),
        )
        .toEqual({ opacity: "1", transitionDuration: "0s" });
    }

    const marqueeTracks = page.locator(
      "[data-landing-3-university-marquee] [data-university-marquee-track]",
    );
    await expect(marqueeTracks).toHaveCount(2);
    for (const track of await marqueeTracks.all()) {
      await expect
        .poll(() =>
          track.evaluate((element) => getComputedStyle(element).animationName),
        )
        .toBe("none");
    }
  });

  test("places the Atlas FAQ after support and expands answers", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const support = page.locator("[data-landing-3-support]");
    const faq = page.locator("[data-landing-3-faq]");
    await expect(
      faq.getByRole("heading", {
        level: 2,
        name: "Frequently Asked Questions",
      }),
    ).toBeVisible();
    await expect(faq.getByRole("button")).toHaveCount(3);

    const freeQuestion = faq.getByRole("button", {
      name: "Is Atlas really free?",
    });
    await expect(freeQuestion).toHaveAttribute("aria-expanded", "false");
    await freeQuestion.click();
    await expect(freeQuestion).toHaveAttribute("aria-expanded", "true");
    await expect(faq.getByText(/The core Atlas platform is free/)).toBeVisible();

    const [supportBox, faqBox] = await Promise.all([
      support.boundingBox(),
      faq.boundingBox(),
    ]);
    expect(supportBox).not.toBeNull();
    expect(faqBox).not.toBeNull();
    expect(faqBox!.y).toBeGreaterThanOrEqual(
      supportBox!.y + supportBox!.height - 1,
    );

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });

  test("renders the dedicated Landing 3 footer after the FAQ", async ({
    page,
  }) => {
    await page.goto("/landing-3");

    const faq = page.locator("[data-landing-3-faq]");
    const footer = page.locator("[data-landing-3-footer]");
    await expect(footer).toBeVisible();
    await expect(footer.getByText("© 2026 GGI Atlas · Built in London")).toBeVisible();
    await expect(footer.getByAltText("ATLAS")).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Match universities" }),
    ).toHaveAttribute("href", "#journey");

    const [faqBox, footerBox] = await Promise.all([
      faq.boundingBox(),
      footer.boundingBox(),
    ]);
    expect(faqBox).not.toBeNull();
    expect(footerBox).not.toBeNull();
    expect(footerBox!.y).toBeGreaterThanOrEqual(
      faqBox!.y + faqBox!.height - 1,
    );
    expect(footerBox!.width).toBeGreaterThanOrEqual(
      page.viewportSize()!.width - 1,
    );

    const overflows = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflows).toBe(false);
  });
});
