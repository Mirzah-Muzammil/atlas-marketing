import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import PremiumPage from "@/app/premium/page";

it("renders the Atlas premium hero with a student crowd", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);

  expect(container.querySelector(".premium-theme")).not.toBeNull();

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent(
    "Your operating system for studying and succeeding abroad.",
  );
  expect(heading).not.toHaveClass("sr-only");
  const titleLines = container.querySelectorAll(
    "[data-premium-hero-title-line]",
  );
  expect(titleLines).toHaveLength(3);
  expect([...titleLines].map((line) => line.textContent?.trim())).toEqual([
    "Your operating system for",
    "studying and succeeding",
    "abroad.",
  ]);
  expect(screen.getByText("abroad.").parentElement).toHaveClass(
    "premium-hero__title-line--accent",
  );
  expect(container.querySelector("canvas")).toHaveAttribute(
    "data-crowd-source",
    "/images/premium/student-peeps.png",
  );
  expect(container.querySelector("canvas")).toHaveAttribute(
    "data-crowd-size",
    "105",
  );
  expect(container.querySelector("canvas")).toHaveClass(
    "absolute",
    "bottom-0",
    "h-[90vh]",
    "w-full",
  );

  getContext.mockRestore();
});

it("keeps the original walk mechanics while introducing the student hero", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const skiper = readFileSync(
    resolve(process.cwd(), "components/ui/skiper-ui/skiper39.tsx"),
    "utf8",
  );

  expect(container.querySelector("[data-premium-hero-intro]")).not.toBeNull();
  expect(container.querySelectorAll("[data-premium-hero-title-line]")).toHaveLength(3);
  expect(container.querySelector("[data-premium-hero-crowd]")).not.toBeNull();
  expect(container.querySelector("canvas")).toHaveAttribute(
    "data-crowd-hidden-back-peeps",
    "30",
  );
  expect(skiper).toContain("const startX = -peep.width");
  expect(skiper).not.toContain("Math.random() > 0.5");
  expect(skiper).toContain("const xDuration = 24");
  expect(skiper).toContain("const yDuration = 0.7");
  expect(skiper).toContain("y: startY - 4");
  expect(skiper).toContain("tl.timeScale(randomRange(0.9, 1.1))");
  expect(skiper).not.toContain("ctx.scale(peep.scaleX, 1)");
  expect(skiper).toContain("100 - 170 * gsap.parseEase");
  expect(skiper).not.toContain("globalAlpha");
  expect(skiper).not.toContain("crowd.slice(hiddenBackPeeps)");
  expect(skiper).toContain("allPeeps.slice(hiddenBackPeeps)");
  expect(skiper).toContain(
    "Math.round(peep.x * renderPixelRatio) / renderPixelRatio",
  );

  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );
  const motion = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumCinematicMotion.tsx"),
    "utf8",
  );
  expect(css).toMatch(
    /\.premium-hero__title-line > span\s*\{[\s\S]*?white-space: nowrap/,
  );
  expect(css).toMatch(
    /\.premium-hero__crowd canvas\s*\{[\s\S]*?filter: none/,
  );
  expect(motion).not.toContain('clipPath: "inset(100% 0% 0% 0%)"');

  getContext.mockRestore();
});

it("suspends the premium crowd renderer offscreen and caps its pixel cost", () => {
  const skiper = readFileSync(
    resolve(process.cwd(), "components/ui/skiper-ui/skiper39.tsx"),
    "utf8",
  );

  expect(skiper).toContain(
    "const renderPixelRatio = Math.min(window.devicePixelRatio || 1, 1.25)",
  );
  expect(skiper).toContain("new IntersectionObserver");
  expect(skiper).toContain('document.addEventListener("visibilitychange"');
  expect(skiper).toContain("peep.walk?.pause()");
  expect(skiper).toContain("peep.walk?.resume()");
  expect(skiper).toContain('canvas.dataset.crowdActive = String(shouldRun)');
  expect(skiper).not.toContain("ctx.scale(devicePixelRatio, devicePixelRatio)");
});

it("uses a solid editorial navbar and choreographs the hero on load and scroll", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const motion = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumCinematicMotion.tsx"),
    "utf8",
  );
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  expect(container.querySelector("[data-premium-nav-shell]")).not.toBeNull();
  expect(screen.getByText("For students moving abroad")).toBeInTheDocument();
  expect(motion).toContain('"[data-premium-hero-title-line]"');
  expect(motion).toContain('"[data-premium-hero-crowd]"');
  expect(motion).toContain("premiumHeroScroll");
  expect(motion).not.toContain("{ y: 96, scale: 0.985 }");
  expect(motion).not.toContain("scale: 1.035");
  expect(css).toMatch(
    /\.premium-nav__inner\s*\{[\s\S]*?background: var\(--premium-white\)/,
  );
  expect(css).toMatch(
    /\.premium-nav__inner\s*\{[\s\S]*?width: min\(calc\(100% - 2rem\), 88rem\)/,
  );
  expect(css).toMatch(
    /\.premium-nav__inner\s*\{[\s\S]*?border-radius: 0[\s\S]*?box-shadow: none/,
  );

  getContext.mockRestore();
});

it("extends the premium hero with navigation, services, and the student journey", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);

  const navigation = container.querySelector("[data-premium-nav]");
  expect(navigation).not.toBeNull();
  expect(within(navigation as HTMLElement).getByRole("link", { name: "Services" }))
    .toHaveAttribute("href", "#premium-services");
  expect(within(navigation as HTMLElement).getByRole("link", { name: "How it works" }))
    .toHaveAttribute("href", "#premium-journey");

  const services = container.querySelector("[data-premium-services]");
  expect(services).toHaveAttribute("id", "premium-services");
  [
    "SIM & eSIM",
    "Banking",
    "Insurance",
    "Visas",
    "Housing",
    "Forex",
    "Tax filing",
    "Loans",
  ].forEach((service) => {
    expect(within(services as HTMLElement).getAllByText(service).length).toBeGreaterThan(0);
  });
  expect(container.querySelectorAll("[data-premium-service-chapter]")).toHaveLength(4);

  const journey = container.querySelector("[data-premium-journey]");
  expect(journey).toHaveAttribute("id", "premium-journey");
  expect(
    within(journey as HTMLElement)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent),
  ).toEqual(["Match", "Apply", "Prepare", "Arrive"]);
  expect(within(journey as HTMLElement).getByRole("link", { name: /start free/i }))
    .toHaveAttribute("href", expect.stringContaining("mailto:hello@atlas.study"));
  expect(screen.getAllByRole("link", { name: /start free/i })).toHaveLength(2);

  getContext.mockRestore();
});

it("lets visitors pause and resume the services marquee", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);

  const pauseButton = screen.getByRole("button", { name: "Pause services" });
  const marquee = container.querySelector("[data-premium-services-marquee]");
  expect(pauseButton).not.toHaveAttribute("aria-pressed");
  expect(marquee).toHaveAttribute("data-paused", "false");

  fireEvent.click(pauseButton);

  const playButton = screen.getByRole("button", { name: "Play services" });
  expect(playButton).not.toHaveAttribute("aria-pressed");
  expect(marquee).toHaveAttribute("data-paused", "true");

  fireEvent.click(playButton);

  expect(screen.getByRole("button", { name: "Pause services" }))
    .not.toHaveAttribute("aria-pressed");
  expect(marquee).toHaveAttribute("data-paused", "false");

  getContext.mockRestore();
});

it("uses the root layout skip link instead of rendering a premium duplicate", () => {
  const rootLayout = readFileSync(resolve(process.cwd(), "app/layout.tsx"), "utf8");
  const premiumPage = readFileSync(
    resolve(process.cwd(), "app/premium/page.tsx"),
    "utf8",
  );

  expect(rootLayout).toContain('className="skip-link"');
  expect(premiumPage).not.toContain('className="premium-skip-link"');
});

it("scopes synchronized Lenis smoothing to the premium route", () => {
  const premiumPage = readFileSync(
    resolve(process.cwd(), "app/premium/page.tsx"),
    "utf8",
  );

  expect(premiumPage).toContain("LenisProvider");
  expect(premiumPage).toContain("duration={1.25}");
  expect(premiumPage).toContain("wheelMultiplier={0.85}");
  expect(premiumPage).toContain("syncScrollTrigger");
});

it("uses a white cinematic system for every section after the hero", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );
  const page = readFileSync(
    resolve(process.cwd(), "app/premium/page.tsx"),
    "utf8",
  );
  const services = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumServices.tsx"),
    "utf8",
  );

  expect(css).toContain("--premium-white: #ffffff");
  expect(css).toMatch(
    /\.premium-services\s*\{[\s\S]*?background: var\(--premium-white\)/,
  );
  expect(css).toContain("font-family: \"Wise Sans\"");
  expect(css).toMatch(
    /\.premium-journey__finale\s*\{[\s\S]*?min-height: 100svh/,
  );
  expect(page).toContain("PremiumCinematicMotion");
  expect(services).toContain('/images/normal/visa.jpg');
  expect(services).toContain('/images/normal/banking.jpg');
  expect(services).toContain('/images/normal/housing.jpg');
  expect(services).toContain('/images/normal/esim.jpg');
  expect(services).toContain('/images/premium/student-departure-studio.jpg');
  expect(
    existsSync(
      resolve(
        process.cwd(),
        "public/images/premium/student-departure-studio.jpg",
      ),
    ),
  ).toBe(true);
  expect(
    existsSync(
      resolve(process.cwd(), "public/images/premium/student-peeps.png"),
    ),
  ).toBe(true);
});

it("pairs the display face with Instrument Sans across descriptive copy", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  expect(css).toContain('font-family: "Instrument Sans"');
  expect(css).toContain(
    'url("/fonts/instrument-sans-variable.woff2") format("woff2")',
  );
  expect(css).toMatch(
    /\.premium-services__lede p,\s*\.premium-service-chapter__note,\s*\.premium-service-chapter__visual figcaption,\s*\.premium-journey__lede,\s*\.premium-journey__frame-copy > div,\s*\.premium-journey__finale-action > p\s*\{[\s\S]*?font-family: "Instrument Sans", sans-serif[\s\S]*?font-weight: 470[\s\S]*?letter-spacing: 0\.015em/,
  );
  expect(css).toMatch(
    /\.premium-service-chapter__visual figcaption span\s*\{[\s\S]*?font-family: "Atlas Inter"/,
  );
  expect(
    existsSync(
      resolve(
        process.cwd(),
        "public/fonts/instrument-sans-variable.woff2",
      ),
    ),
  ).toBe(true);
});

it("marks the editorial frames and journey reel for scroll choreography", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);

  expect(container.querySelectorAll("[data-premium-reveal]").length).toBeGreaterThan(4);
  expect(container.querySelectorAll("[data-premium-image-frame]")).toHaveLength(4);
  expect(container.querySelector("[data-premium-horizontal-shell]")).not.toBeNull();
  expect(container.querySelector("[data-premium-horizontal-track]")).not.toBeNull();

  getContext.mockRestore();
});

it("cuts from the hero into a cinematic departure frame with wide tracking", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );
  const motion = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumCinematicMotion.tsx"),
    "utf8",
  );

  expect(screen.queryByText("Accepted is a moment. Arriving is a sequence."))
    .not.toBeInTheDocument();
  expect(container.querySelector("[data-premium-hero-transition]")).not.toBeNull();
  expect(container.querySelector("[data-premium-transition-frame]")).not.toBeNull();
  expect(screen.getByText("The move starts now.")).toBeInTheDocument();
  expect(css).toMatch(
    /\.premium-services,\s*\.premium-journey\s*\{[\s\S]*?letter-spacing: 0\.025em/,
  );
  expect(motion).toContain('"[data-premium-hero-transition]"');
  expect(motion).toContain('"[data-premium-transition-frame]"');
  expect(css).toMatch(
    /\.premium-services__transition\s*\{[\s\S]*?height: 250svh/,
  );
  expect(css).toContain(
    "clip-path: inset(31% 35% 31% 35% round 1.25rem)",
  );
  expect(css).toContain(
    "clip-path: inset(8% 4% 8% 4%) !important",
  );
  expect(css).toMatch(
    /\.premium-services__transition-frame img\s*\{[\s\S]*?object-fit: cover/,
  );
  expect(css).toMatch(
    /@media \(max-width: 720px\)[\s\S]*?\.premium-services__transition\s*\{ height: 210svh; \}/,
  );
  expect(css).toContain(
    "clip-path: inset(34% 16% 34% 16% round 1rem)",
  );
  expect(motion).toContain(
    'clipPath: "inset(31% 35% 31% 35% round 1.25rem)"',
  );
  expect(motion).toContain(
    'clipPath: "inset(0% 0% 0% 0% round 0rem)"',
  );
  expect(motion).toContain("scale: 0.84");
  expect(motion).not.toContain('transitionFrame?.querySelector("img")');
  expect(motion).not.toContain("transitionTitle");
  expect(css).toMatch(
    /\.premium-services__transition-frame img\s*\{[\s\S]*?filter: saturate\(0\.78\) contrast\(1\.05\)/,
  );
  expect(css).toMatch(
    /\.premium-services__transition-frame\s*\{[\s\S]*?background: var\(--premium-ink\)/,
  );
  expect(css).toMatch(
    /\.premium-services__transition-title\s*\{[\s\S]*?color: var\(--premium-white\)[\s\S]*?mix-blend-mode: difference/,
  );
  getContext.mockRestore();
});

it("keeps mobile navigation visible and uses accessible premium colors", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  expect(css).toContain("--color-accent: var(--premium-orange)");
  expect(css).toContain("--premium-orange-dark: #9a3412");
  expect(css).toMatch(
    /\.premium-theme :where\(a, button\):focus-visible[\s\S]*outline: 2px solid var\(--premium-paper\)[\s\S]*box-shadow: 0 0 0 5px var\(--premium-ink\)/,
  );
  expect(css).not.toMatch(
    /@media \(max-width: 720px\)[\s\S]*\.premium-nav__links[\s\S]*clip:/,
  );
  expect(css).toMatch(
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.premium-services__marquee-toggle[\s\S]*display: none/,
  );
});
