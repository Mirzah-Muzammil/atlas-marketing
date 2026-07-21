import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const readSource = (file: string) =>
  readFileSync(resolve(process.cwd(), file), "utf8");

it("renders normal-page content without reveal motion on mobile", () => {
  const providers = readSource("components/providers.tsx");
  const css = readSource("app/normal/globals.css");
  const aosTypes = readSource("types/aos.d.ts");

  expect(providers).toContain("disable: () => window.innerWidth < 768");
  expect(aosTypes).toContain(
    'disable?: boolean | "phone" | "tablet" | "mobile" | (() => boolean)',
  );

  const mobileStart = css.indexOf("@media (max-width: 767px)");
  const reducedMotionStart = css.indexOf(
    "@media (prefers-reduced-motion: reduce)",
  );

  expect(mobileStart).toBeGreaterThanOrEqual(0);
  expect(reducedMotionStart).toBeGreaterThan(mobileStart);

  const mobileCss = css.slice(mobileStart, reducedMotionStart);

  expect(mobileCss).toContain(".atlas-title-reveal");
  expect(mobileCss).toContain("[data-aos]");
  expect(mobileCss).toContain("opacity: 1");
  expect(mobileCss).toContain("filter: none");
  expect(mobileCss).toContain("transform: none");
  expect(mobileCss).toContain("transition: none");
  expect(mobileCss).toContain("will-change: auto");
});

it("keeps the normal-page CTA fluid and contains its artwork on mobile", () => {
  const cta = readSource("components/sections/cta-banner.tsx");

  expect(cta).toContain("relative mx-auto mt-24 w-full max-w-7xl");
  expect(cta).not.toContain("min-w-7xl");
  expect(cta).toContain("relative grid overflow-hidden");
  expect(cta).toContain(
    "relative h-72 overflow-hidden bg-[#FFE9DC] md:h-[26rem]",
  );
  expect(cta).toContain("lg:mt-36");
  expect(cta).not.toContain("subscription-phone-hand.png");
});
