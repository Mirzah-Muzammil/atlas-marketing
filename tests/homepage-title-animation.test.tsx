import { act, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("reveals a semantic Atlas homepage title once it intersects", () => {
  let onIntersect: IntersectionObserverCallback = () => undefined;
  const disconnect = vi.fn();

  class IntersectionObserverMock implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0.15];

    constructor(callback: IntersectionObserverCallback) {
      onIntersect = callback;
    }

    disconnect = disconnect;
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

  render(
    <HomepageAnimatedTitle as="h3" className="review-title">
      Real stories. Real support.
    </HomepageAnimatedTitle>,
  );

  const title = screen.getByRole("heading", {
    level: 3,
    name: "Real stories. Real support.",
  });

  expect(title).toHaveClass("atlas-homepage-title-reveal", "review-title");
  expect(title).toHaveAttribute("data-atlas-homepage-title-reveal", "pending");

  act(() => {
    onIntersect(
      [
        {
          isIntersecting: true,
          target: title,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
  });

  expect(title).toHaveAttribute("data-atlas-homepage-title-reveal", "visible");
  expect(disconnect).toHaveBeenCalledOnce();
});

it("shows the title immediately when IntersectionObserver is unavailable", () => {
  vi.stubGlobal("IntersectionObserver", undefined);

  render(
    <HomepageAnimatedTitle as="h1">Atlas without chaos.</HomepageAnimatedTitle>,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "Atlas without chaos." }),
  ).toHaveAttribute("data-atlas-homepage-title-reveal", "visible");
});

it("copies the Normal reveal timing and reduced-motion fallback", () => {
  const css = readFileSync(resolve(process.cwd(), "styles/globals.css"), "utf8");

  expect(css).toContain(".atlas-homepage-title-reveal");
  expect(css).toContain("filter: blur(12px)");
  expect(css).toContain("1.3s cubic-bezier(0.22, 1, 0.36, 1)");
  expect(css).toContain("prefers-reduced-motion: reduce");
});
