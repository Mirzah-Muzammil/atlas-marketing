import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

it("scrubs major landing headlines from ghost text to ink while scrolling", () => {
  const component = read("components/landing/LandingExperience.tsx");
  const css = read("app/landing/landing.css");

  expect(component.match(/data-land-scroll-text/g)?.length ?? 0).toBeGreaterThanOrEqual(8);
  expect(component).toContain('"--land-text-reveal"');
  expect(css).toContain("[data-land-scroll-text]");
  expect(css).toContain("linear-gradient(180deg");
});

it("uses the Wise green palette without legacy green, blue, or coral accents", () => {
  const styles = `${read("app/landing/landing.css")}\n${read(
    "components/landing/HeroRibbonCursor.tsx",
  )}`;

  expect(styles).toContain("--land-blue: #163300");
  expect(styles).toContain("--land-signal: #9fe870");
  expect(styles).toContain("--land-coral: #9fe870");
  expect(styles).toContain('context.fillStyle = "#9fe870"');
  expect(styles).not.toMatch(
    /#(?:4f7f11|b7ff3c|2a704d|3da36a|10213d|1745a0|2f6ef3|081b3f|e9725b|c9d8ed|dce6f5|d9e4fc|e8edf4)\b/i,
  );
});

it("inverts scroll-reveal ink on dark sections", () => {
  const css = read("app/landing/landing.css");

  expect(css).toContain(".land-product [data-land-scroll-text]");
  expect(css).toContain(".land-after [data-land-scroll-text]");
  expect(css).toContain(".land-final__card [data-land-scroll-text]");
  expect(css).toContain("rgb(255 255 255 / 0.96)");
  expect(css).toContain("rgb(255 255 255 / 0.26)");
});

it("uses an editorial font for marketing descriptions while preserving the UI sans", () => {
  const css = read("app/landing/landing.css");

  expect(css).toContain('--land-copy: Iowan Old Style, Baskerville, Georgia, "Times New Roman", serif');
  expect(css).toContain("font-family: var(--land-copy)");
  expect(css).toContain('--land-sans: "Atlas Inter"');
});
