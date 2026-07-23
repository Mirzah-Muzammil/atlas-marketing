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
  expect(container.querySelector(".premium-hero__description")).toHaveTextContent(
    "Find the perfect course and university for you. Get everything you need. Settle in. Then build your new life abroad, from friends to events to jobs. All in one place. All free.",
  );
  expect(screen.getByText("everything").parentElement).toHaveClass(
    "premium-hero__description-emphasis",
  );
  expect(screen.getByRole("link", { name: "Find out more" })).toHaveAttribute(
    "href",
    "#premium-services",
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

it("keeps the existing journey design with the approved heading and exact three-stage copy", () => {
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
    within(journey as HTMLElement).getByRole("heading", {
      level: 2,
      name: "Meet Atlas, your OS for not just studying, but succeeding abroad.",
    }),
  ).toBeInTheDocument();
  expect(
    within(journey as HTMLElement)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent),
  ).toEqual(["Plan & Apply", "Arrive & Settle", "Build & Thrive"]);
  expect(within(journey as HTMLElement).getByText(
    "The basics, done well. Every other agent and platform does this part — we just do it without the kickbacks.",
  )).toBeInTheDocument();
  expect(within(journey as HTMLElement).getByText(
    "Banking, SIM, insurance, housing, forex, loans, tax, food. Pre-arrival to post-arrival. Real partners, transparent pricing, zero kickbacks. This is the spine of GGI Atlas — the bit you'll use every week.",
  )).toBeInTheDocument();
  expect(within(journey as HTMLElement).getByText(
    "Most platforms stop the day you arrive — that's when their commission cheque clears. GGI Atlas is built for what comes after: jobs, community, events, year-round services. Free, forever.",
  )).toBeInTheDocument();
  expect(journey?.querySelectorAll("[data-premium-stage-panel]")).toHaveLength(3);
  expect(journey?.querySelector("[data-premium-journey-photo]")).toBeNull();
  const stagePhotos = [
    ...(journey?.querySelectorAll("[data-premium-stage-photo]") ?? []),
  ];
  expect(stagePhotos).toHaveLength(3);
  expect(stagePhotos.map((photo) => photo.getAttribute("src"))).toEqual([
    expect.stringContaining("product-planning.jpg"),
    expect.stringContaining("housing.jpg"),
    expect.stringContaining("career.jpg"),
  ]);
  [...(journey?.querySelectorAll("[data-premium-stage-panel]") ?? [])]
    .forEach((panel) => {
      expect(panel.querySelectorAll("[data-premium-stage-photo]")).toHaveLength(1);
    });
  [
    "Matcher",
    "Visa tracker",
    "Loans & scholarships",
    "SOP / LOR / CV",
    "Banking",
    "SIM / eSIM",
    "Insurance",
    "Housing",
    "Forex",
    "Tax",
    "Land the job you came here for.",
    "14,000+ Indian students already here.",
    "Built around your week.",
    "We're with you for the whole stretch.",
  ].forEach((label) => {
    expect(within(journey as HTMLElement).getByText(label)).toBeInTheDocument();
  });
  expect(screen.getAllByRole("link", { name: /start free/i })[1])
    .toHaveAttribute("href", expect.stringContaining("mailto:hello@atlas.study"));
  expect(screen.getAllByRole("link", { name: /start free/i })).toHaveLength(2);

  getContext.mockRestore();
});

it("presents the real product as a three-step tutorial with interface callouts", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  const showcase = container.querySelector("[data-premium-product-showcase]");
  expect(showcase).toHaveAttribute("id", "premium-product");
  expect(
    within(showcase as HTMLElement).getByRole("heading", {
      name: "One Atlas. Every part of the move.",
    }),
  ).toBeInTheDocument();
  expect(showcase?.querySelectorAll("[data-premium-tutorial-step]")).toHaveLength(3);
  expect(showcase?.querySelector("[data-premium-tutorial-deck]")).not.toBeNull();
  expect(showcase?.querySelectorAll("[data-premium-tutorial-card]")).toHaveLength(3);
  expect(showcase?.querySelector("[data-premium-tutorial-copy-rail]"))
    .toHaveAttribute("data-premium-tutorial-copy-position", "top");
  expect(showcase?.querySelectorAll("[data-premium-tutorial-copy]")).toHaveLength(3);
  const tutorialCards = [
    ...(showcase?.querySelectorAll("[data-premium-tutorial-card]") ?? []),
  ];
  tutorialCards.forEach((card) => {
    expect(card.querySelector("h3")).toBeNull();
    expect(card.querySelector("figcaption")).toBeNull();
    expect(card.querySelector("[data-premium-tutorial-copy]")).toBeNull();
  });
  const tutorialCopy = [
    ...(showcase?.querySelectorAll("[data-premium-tutorial-copy]") ?? []),
  ];
  tutorialCopy.forEach((copy) => {
    expect(copy.closest("[data-premium-tutorial-card]")).toBeNull();
  });
  expect(
    within(showcase as HTMLElement)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent),
  ).toEqual([
    "Build your move.",
    "Sort the landing.",
    "Keep building.",
  ]);
  expect(showcase?.querySelectorAll("[data-premium-tutorial-callout]").length)
    .toBeGreaterThanOrEqual(6);
  const tutorialImages = [...(showcase?.querySelectorAll("img") ?? [])]
    .map((image) => image.getAttribute("src") ?? "")
    .join(" ");
  expect(tutorialImages).toContain("crm.png");
  expect(tutorialImages).toContain("feature-1.png");
  expect(tutorialImages).toContain("hand.png");
  expect(tutorialImages).toContain("feature-2.png");
  expect(css).toMatch(
    /\.premium-tutorial__step\s*\{[\s\S]*?border-radius:\s*0/,
  );
  expect(css).toMatch(
    /\.premium-tutorial__screen img\s*\{[\s\S]*?object-fit:\s*contain/,
  );
  expect(css).toMatch(
    /\.premium-tutorial__screen--mobile\s*\{[\s\S]*?border-radius:\s*0/,
  );

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
  expect(css).toMatch(
    /\.premium-hero__copy\s*\{[\s\S]*?border: 0[\s\S]*?background: transparent[\s\S]*?box-shadow: none/,
  );
  expect(css).toMatch(
    /\.premium-hero__description\s*\{[\s\S]*?font-family: "Instrument Sans", sans-serif/,
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
  expect(container.querySelectorAll("[data-premium-tutorial-step]")).toHaveLength(3);
  expect(container.querySelector("[data-premium-tutorial-deck]")).not.toBeNull();
  expect(container.querySelectorAll("[data-premium-tutorial-card]")).toHaveLength(3);
  expect(container.querySelectorAll("[data-premium-stage-panel]")).toHaveLength(3);

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
  expect(motion).toContain('"[data-premium-tutorial-deck]"');
  expect(motion).toContain('"[data-premium-tutorial-card]"');
  expect(motion).toContain('"[data-premium-tutorial-copy]"');
  expect(motion).toContain("position + 0.12");
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

it("centres the hero stack on TV widths and splits it across laptop widths", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  expect(container.querySelector("[data-premium-hero-content]")).not.toBeNull();
  expect(css).toMatch(
    /@media \(min-width: 900px\) and \(max-width: 1599px\)[\s\S]*?\.premium-hero__content\s*\{[\s\S]*?display: grid[\s\S]*?grid-template-columns:[\s\S]*?\}[\s\S]*?\.premium-hero__title\s*\{[\s\S]*?text-align: left[\s\S]*?\}[\s\S]*?\.premium-hero__copy\s*\{[\s\S]*?align-items: flex-start/,
  );
  expect(css).toMatch(
    /@media \(min-width: 1600px\)[\s\S]*?\.premium-hero__content\s*\{[\s\S]*?display: flex[\s\S]*?flex-direction: column[\s\S]*?align-items: center[\s\S]*?justify-content: center/,
  );

  getContext.mockRestore();
});

it("uses white screenshot controls", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  expect(css).toMatch(
    /\.premium-tutorial__callout\s*\{[^}]*background: var\(--premium-white\)/,
  );
});

it("uses the Skiper17 sticky card deck for Knowledge and tools", () => {
  const skiper17Path = resolve(
    process.cwd(),
    "components/ui/skiper-ui/skiper17.tsx",
  );
  const lowerChapters = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumLowerChapters.tsx"),
    "utf8",
  );

  expect(existsSync(skiper17Path)).toBe(true);
  if (!existsSync(skiper17Path)) return;

  const skiper17 = readFileSync(skiper17Path, "utf8");
  expect(skiper17).toContain("StickyCard002");
  expect(skiper17).toContain("ScrollTrigger");
  expect(skiper17).toContain("pin: true");
  expect(skiper17).toContain("scrub: 0.5");
  expect(skiper17).toContain("document.fonts?.ready.then(refreshScrollTrigger)");
  expect(skiper17).toContain(
    "start: () => trigger.getBoundingClientRect().top + window.scrollY",
  );
  expect(lowerChapters).toContain("PremiumKnowledgeAccordion");
});

it("opens full-width Skiper17 cards on a white Knowledge section", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const knowledge = container.querySelector("[data-premium-knowledge]");
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );
  const motion = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumCinematicMotion.tsx"),
    "utf8",
  );
  const accordion = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumKnowledgeAccordion.tsx"),
    "utf8",
  );

  expect(knowledge?.querySelector("[data-premium-knowledge-track]"))
    .not.toBeNull();
  expect(knowledge?.querySelectorAll("[data-premium-knowledge-card]"))
    .toHaveLength(5);
  expect(css).toMatch(
    /\.premium-knowledge\s*\{[\s\S]*?background: var\(--premium-white\)/,
  );
  expect(accordion).toContain("StickyCard002");
  expect(accordion).toContain("premium-knowledge__skiper17");
  expect(css).toContain("width: min(calc(100% - 2rem), 86rem)");
  expect(css).toContain("min-height: 70svh");
  expect(motion).not.toContain('"[data-premium-knowledge-panel]"');

  getContext.mockRestore();
});

it("continues from the three stages through Concierge, tools, and FAQ", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);
  const mainSections = [
    ...(container.querySelector("main")?.querySelectorAll(":scope > section") ?? []),
  ];
  const journey = container.querySelector("[data-premium-journey]");
  const concierge = container.querySelector("[data-premium-concierge]");
  const knowledge = container.querySelector("[data-premium-knowledge]");
  const faq = container.querySelector("[data-premium-faq]");

  expect(journey).not.toBeNull();
  expect(concierge).not.toBeNull();
  expect(knowledge).not.toBeNull();
  expect(faq).not.toBeNull();
  expect(mainSections.indexOf(journey as HTMLElement)).toBeLessThan(
    mainSections.indexOf(concierge as HTMLElement),
  );
  expect(mainSections.indexOf(concierge as HTMLElement)).toBeLessThan(
    mainSections.indexOf(knowledge as HTMLElement),
  );
  expect(mainSections.indexOf(knowledge as HTMLElement)).toBeLessThan(
    mainSections.indexOf(faq as HTMLElement),
  );
  expect(
    within(concierge as HTMLElement).getByRole("heading", {
      name: "A real specialist for your whole journey.",
    }),
  ).toBeInTheDocument();
  expect(
    within(concierge as HTMLElement).getByRole("link", {
      name: "Meet Concierge",
    }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20Concierge",
  );
  expect(concierge?.querySelector(".premium-concierge__header")).toBeNull();
  expect(concierge?.querySelector(".premium-concierge__letter")).toBeNull();
  expect(concierge?.querySelector(".premium-concierge__dossier")).toBeNull();
  expect(concierge?.querySelector("[data-premium-concierge-sticky]")).not.toBeNull();
  expect(concierge?.querySelectorAll("[data-premium-concierge-phone]")).toHaveLength(2);
  expect(concierge?.querySelector(".premium-concierge__phone--specialist"))
    .not.toBeNull();
  expect(concierge?.querySelector(".premium-concierge__phone--journey"))
    .not.toBeNull();
  expect(concierge?.querySelectorAll("[data-premium-concierge-word]"))
    .toHaveLength(7);
  expect(concierge?.querySelectorAll("[data-premium-concierge-cta-word]"))
    .toHaveLength(2);
  expect(concierge?.querySelector("[data-premium-concierge-screenshot]"))
    .toBeNull();
  expect(within(concierge as HTMLElement).getByRole("link", {
    name: "Meet Concierge",
  })).toBeInTheDocument();
  expect(concierge?.querySelector(".premium-concierge__eyebrow")).toBeNull();
  expect(concierge?.querySelector(".premium-concierge__description")).toBeNull();
  expect(concierge?.querySelector(".premium-concierge__facts")).toBeNull();
  expect(within(concierge as HTMLElement).queryByText("£1,500")).not.toBeInTheDocument();
  expect(within(concierge as HTMLElement).queryByText("8 modules")).not.toBeInTheDocument();
  expect(within(concierge as HTMLElement).queryByText("~9 months")).not.toBeInTheDocument();
  expect(
    within(knowledge as HTMLElement).getByRole("heading", {
      name: "Knowledge & tools.",
    }),
  ).toBeInTheDocument();
  expect(within(knowledge as HTMLElement).getByText(
    "Read up before you sign up. Calculate your budget, check your visa odds, compare scholarships — no account, no email gate.",
  )).toBeInTheDocument();
  expect(
    knowledge?.querySelectorAll("[data-premium-knowledge-card]"),
  ).toHaveLength(5);
  expect(within(knowledge as HTMLElement).getByText(
    "The complete UK guide for the 2026 intake.",
  )).toBeInTheDocument();
  expect(
    within(faq as HTMLElement).getByRole("heading", {
      name: "The honest answers.",
    }),
  ).toBeInTheDocument();
  expect(within(faq as HTMLElement).getByText(
    "Most platforms hide behind \"for support, contact us.\" Here's what people actually want to know, answered straight.",
  )).toBeInTheDocument();
  expect(faq?.querySelectorAll("details")).toHaveLength(5);

  getContext.mockRestore();
});

it("animates the Concierge words and two restored phones through the scroll", () => {
  const motion = readFileSync(
    resolve(process.cwd(), "components/premium/PremiumCinematicMotion.tsx"),
    "utf8",
  );
  const css = readFileSync(
    resolve(process.cwd(), "app/premium/globals.css"),
    "utf8",
  );

  expect(motion).toContain('"[data-premium-concierge-word]"');
  expect(motion).toContain('"[data-premium-concierge-phone]"');
  expect(motion).toContain('"[data-premium-concierge-cta-word]"');
  expect(motion).toContain("conciergeScroll");
  expect(motion).toContain("scrub: 1");
  expect(motion).toContain("autoAlpha: 0,");
  expect(motion).toContain('start: "top 75%"');
  expect(motion).toContain('end: "top 5%"');
  expect(css).toMatch(
    /\.premium-concierge\s*\{[\s\S]*?background: var\(--premium-white\)/,
  );
  expect(css).toMatch(
    /\.premium-concierge\s*\{[\s\S]*?height: 135svh[\s\S]*?margin-inline: clamp\(0\.75rem, 1\.8vw, 1\.75rem\)/,
  );
  expect(css).toMatch(
    /\.premium-concierge__sticky\s*\{[\s\S]*?top: 2rem[\s\S]*?height: calc\(100svh - 4rem\)[\s\S]*?grid-template-columns: minmax\(10rem, 0\.78fr\) minmax\(20rem, 1\.2fr\) minmax\(10rem, 0\.78fr\)[\s\S]*?border-radius: 2rem[\s\S]*?box-shadow:/,
  );
  expect(css).toMatch(
    /\.premium-concierge__copy h2\s*\{[\s\S]*?font-size: clamp\(2\.25rem, 3\.7vw, 4\.1rem\)/,
  );
  expect(css).toMatch(
    /\.premium-concierge__cta\s*\{[\s\S]*?background: var\(--premium-orange\)/,
  );
});
