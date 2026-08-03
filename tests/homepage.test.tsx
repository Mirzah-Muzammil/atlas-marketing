import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

import HomePage from "@/app/page";
import { DashboardShowcase } from "@/components/homepage/DashboardShowcase";
import { EssentialsOrbit } from "@/components/homepage/EssentialsOrbit";
import { Footer } from "@/components/homepage/Footer";
import { ResourcesSection } from "@/components/homepage/ResourcesSection";
import { WhatAtlasIs } from "@/components/homepage/WhatAtlasIs";

it("uses an Atlas-colored aurora behind the hero", () => {
  render(<HomePage />);

  const aurora = screen.getByTestId("aurora-background");

  expect(aurora).toHaveStyle({ "--aurora-duration": "8s" });
  expect(aurora).toHaveStyle({
    "--aurora-color-1": "var(--aurora-color1, rgba(243,90,2,0.34))",
  });
  expect(aurora).toHaveStyle({
    "--aurora-color-2": "var(--aurora-color2, rgba(255,177,94,0.25))",
  });
  expect(screen.getAllByTestId("aurora-star")).toHaveLength(80);
});

it("uses one continuous grid behind the landing-page sections", () => {
  const { container } = render(<HomePage />);
  const main = container.querySelector("#main-content");

  expect(main).toHaveAttribute("data-atlas-homepage-global-grid");
  expect(main).toHaveClass("[background-size:72px_72px]");

  for (const section of [
    "[data-atlas-homepage-what-atlas-is]",
    "[data-atlas-homepage-showcase]",
    "[data-atlas-homepage-services]",
    "[data-atlas-homepage-service-catalog]",
    "[data-atlas-homepage-free-product]",
    "[data-atlas-homepage-agent-comparison]",
    "[data-atlas-homepage-readiness]",
    "[data-atlas-homepage-concierge]",
    "[data-atlas-homepage-resources]",
    "[data-atlas-homepage-support]",
    "[data-atlas-homepage-faq]",
  ]) {
    expect(container.querySelector(section)).toHaveClass("bg-transparent");
  }

  expect(container.querySelector("[data-readiness-depth-grid]")).toBeNull();
});

it("animates the primary Atlas homepage section titles", () => {
  const { container } = render(<HomePage />);
  const animatedTitles = container.querySelectorAll(
    "[data-atlas-homepage-title-reveal]",
  );

  expect(animatedTitles).toHaveLength(11);

  for (const { level, name } of [
    {
      level: 1,
      name: "Your operating system for studying and succeeding abroad",
    },
    {
      level: 2,
      name: "What is Atlas?",
    },
    {
      level: 2,
      name: "From application to arrival. One Atlas, every next step.",
    },
    {
      level: 2,
      name: "Studying in the UK? See your Atlas.",
    },
    {
      level: 2,
      name: "How Atlas Works",
    },
    {
      level: 2,
      name: "Why students switch",
    },
    { level: 2, name: "Free with Atlas. Built for everything after the offer." },
    { level: 2, name: "Real stories. Real support." },
    { level: 2, name: "The hardest steps, handled." },
    { level: 2, name: "Resources for the decisions ahead." },
    { level: 2, name: "Frequently Asked Questions" },
  ]) {
    expect(screen.getByRole("heading", { level, name })).toHaveAttribute(
      "data-atlas-homepage-title-reveal",
    );
  }
});

it("compares the traditional agent model with Atlas after the free product section", () => {
  const { container } = render(<HomePage />);
  const comparison = container.querySelector(
    "[data-atlas-homepage-agent-comparison]",
  );
  const freeProduct = container.querySelector("[data-atlas-homepage-free-product]");
  const readiness = container.querySelector("[data-atlas-homepage-readiness]");
  const support = container.querySelector("[data-atlas-homepage-support]");
  const concierge = container.querySelector("[data-atlas-homepage-concierge]");
  const resources = container.querySelector("[data-atlas-homepage-resources]");
  const faq = container.querySelector("[data-atlas-homepage-faq]");

  expect(comparison).not.toBeNull();
  expect(freeProduct?.nextElementSibling).toBe(comparison);
  expect(comparison?.nextElementSibling).toBe(readiness);
  expect(readiness?.nextElementSibling).toBe(concierge);
  expect(concierge?.nextElementSibling).toBe(resources);
  expect(resources?.nextElementSibling).toBe(support);
  expect(support?.nextElementSibling).toBe(faq);
  expect(faq?.nextElementSibling).toBeNull();
  const comparisonTitle = screen.getByRole("heading", {
    level: 2,
    name: "Why students switch",
  });
  expect(comparisonTitle).toBeVisible();
  expect(comparisonTitle).toHaveClass(
    "font-semibold",
    "text-[46px]",
    "min-[1200px]:text-[56px]",
  );
  expect(comparisonTitle).not.toHaveClass("uppercase");
  expect(
    comparison?.querySelector("[data-comparison-slider-stage]"),
  ).toHaveClass("max-w-[980px]", "bg-[#0b0c0f]");
  expect(
    comparison?.querySelectorAll("[data-comparison-atlas-item]"),
  ).toHaveLength(4);
  expect(
    comparison?.querySelectorAll("[data-comparison-agent-item]"),
  ).toHaveLength(4);
  expect(
    within(comparison as HTMLElement).getByText("Recommends their partner universities"),
  ).toBeVisible();
  for (const copy of [
    "Because its free & totally transparent",
    "Shortlist what fits you",
    "With you long after the offer",
    "A platform, plus real people",
  ]) {
    expect(within(comparison as HTMLElement).getByText(copy)).toBeVisible();
  }
  expect(
    within(comparison as HTMLElement).getByRole("slider", {
      name: "Compare Atlas with a traditional agent",
    }),
  ).toBeVisible();
  expect(comparison).not.toHaveTextContent("-");
  expect(
    within(comparison as HTMLElement).getByRole("link", { name: "Start free" }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
});

it("renders Atlas content in the Raycast-inspired hero hierarchy", () => {
  const { container } = render(<HomePage />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your operating system for studying and succeeding abroad",
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
    "max-w-[72rem]",
    "leading-[1.04]",
    "tracking-[-.055em]",
  );
  expect(screen.getByText("Your whole UK move. One Atlas.")).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Get started - free" }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
  expect(
    screen.getByRole("link", { name: "Explore the platform" }),
  ).toHaveAttribute("href", "#platform");
  expect(screen.getByTestId("aurora-background")).toBeInTheDocument();
  expect(container.querySelector("[data-hero-abroad-accent]")).toHaveClass(
    "text-[#f35a02]",
  );
});

it("types the hero abroad accent through Indian language translations", () => {
  const { container } = render(<HomePage />);
  const word = container.querySelector("[data-hero-language-word]");

  expect(word).toHaveTextContent("abroad");
  expect(container.querySelector("[data-hero-language-cursor]")).toBeVisible();
  expect(container.querySelector("[data-hero-language-word]")).toHaveAttribute(
    "data-language-count",
    "7",
  );
});

it("keeps navigation targets available and marks the visual decorative", () => {
  const { container } = render(<HomePage />);

  expect(container.querySelector("#how-it-works")).not.toBeNull();
  expect(container.querySelector("#service-catalog")).not.toBeNull();
  expect(container.querySelector("#essentials-orbit")).toBeNull();
  expect(container.querySelector("#atlas-support")).not.toBeNull();
  expect(container.querySelector("#faq")).not.toBeNull();
  expect(
    container.querySelector('[aria-hidden="true"][data-atlas-homepage-visual]'),
  ).not.toBeNull();
});

it("renders the real Atlas product UI instead of a dashboard screenshot", () => {
  const { container } = render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "From application to arrival. One Atlas, every next step.",
    }),
  ).toBeVisible();
  const showcase = container.querySelector("[data-atlas-homepage-showcase]");
  expect(showcase).not.toBeNull();
  expect(container.querySelector("[data-showcase-frame]")).not.toBeNull();
  expect(container.querySelector("[data-showcase-media]")).not.toBeNull();
  expect(container.querySelector("[data-atlas-dashboard-demo]")).not.toBeNull();
  expect(showcase?.querySelector("img[src*='/images/crm.png']")).toBeNull();
  expect(showcase?.querySelector("[data-dashboard-sidebar]")).not.toBeNull();
  expect(showcase?.querySelector("[data-dashboard-overview]")).not.toBeNull();
  expect(
    within(showcase as HTMLElement).getAllByRole("button", {
      name: /^(Dashboard|Journey|My type|Essentials|Career|Jobs)$/,
    }),
  ).toHaveLength(6);
  expect(showcase?.querySelectorAll("[data-dashboard-demo-caption]")).toHaveLength(0);
  expect(showcase?.querySelectorAll("[data-dashboard-progress-segment]")).toHaveLength(0);
  expect(within(showcase as HTMLElement).getByText("Welcome back, Aarav")).toBeVisible();
  expect(within(showcase as HTMLElement).getByText("Ambitious Achiever")).toBeVisible();
  expect(showcase).not.toHaveTextContent("Your route, tasks, and tools are tuned to the student you are.");
  expect(showcase).not.toHaveTextContent("Open the actual tool inline, already connected to your plan.");
  expect(showcase).not.toHaveTextContent("Keep the same workspace from offers through visa and arrival.");
  expect(container.querySelector("[data-macbook-base]")).toBeNull();
});

it("builds a personalized Atlas inside a macOS-style window", () => {
  const { container } = render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Studying in the UK? See your Atlas.",
    }),
  ).toBeVisible();
  expect(container.querySelector("[data-atlas-preview-window]")).not.toBeNull();
  expect(container.querySelectorAll("[data-macos-control]")).toHaveLength(3);
  expect(container.querySelectorAll("[data-readiness-feature]")).toHaveLength(
    4,
  );
  expect(container.querySelector("[data-readiness-center-stage]")).not.toBeNull();
  expect(
    container.querySelector("[data-readiness-cinematic-depth]"),
  ).not.toBeNull();
  expect(container.querySelector("[data-readiness-depth-grid]")).toBeNull();
  expect(container.querySelector("[data-readiness-depth-glow]")).not.toBeNull();
  expect(container.querySelector("[data-readiness-depth-grain]")).not.toBeNull();
  expect(container.querySelectorAll("[data-readiness-key]")).toHaveLength(0);
  expect(
    container.querySelectorAll('[data-readiness-side="left"]'),
  ).toHaveLength(2);
  expect(
    container.querySelectorAll('[data-readiness-side="right"]'),
  ).toHaveLength(2);
  for (const slot of ["clear", "personal", "connected", "transparent"]) {
    expect(
      container.querySelector(`[data-readiness-slot="${slot}"]`),
    ).toHaveClass("border-white/15", "text-white");
  }
  expect(
    container
      .querySelector("[data-atlas-preview-window]")
      ?.contains(container.querySelector("[data-atlas-preview-form]")),
  ).toBe(true);
  expect(
    container
      .querySelector("[data-atlas-preview-window]")
      ?.contains(container.querySelector("[data-readiness-visual]")),
  ).toBe(false);
  for (const value of [
    "Clear. Every next step.",
    "Personal. Built around you.",
    "Connected. Application to arrival.",
    "Transparent. No hidden commissions.",
  ]) {
    expect(screen.getByText(value)).toBeVisible();
  }
  expect(container.querySelector("[data-atlas-preview-result]")).toBeNull();

  fireEvent.change(screen.getByLabelText("Level"), {
    target: { value: "Undergraduate" },
  });
  fireEvent.change(screen.getByLabelText("Field"), {
    target: { value: "Business" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Show my Atlas" }));

  expect(container.querySelector("[data-atlas-preview-result]")).toHaveTextContent(
    "Your Undergraduate Business Atlas",
  );
  expect(container.querySelector("[data-atlas-preview-result]")).toHaveAttribute(
    "aria-live",
    "polite",
  );
});

it("hides the UK university marquee for launch", () => {
  const { container } = render(<HomePage />);
  expect(
    container.querySelector("[data-atlas-homepage-university-marquee]"),
  ).toBeNull();
});

it("explains Atlas before the student-controlled dashboard demo", () => {
  const { container } = render(<HomePage />);
  const explainer = container.querySelector("[data-atlas-homepage-what-atlas-is]");
  const showcase = container.querySelector("[data-atlas-homepage-showcase]");

  expect(explainer).not.toBeNull();
  expect(explainer?.nextElementSibling).toBe(showcase);
  expect(
    within(explainer as HTMLElement).getByText(
      /One system for your whole UK move/i,
    ),
  ).toBeVisible();
  expect(
    within(explainer as HTMLElement).getAllByRole("button"),
  ).toHaveLength(3);

  const demo = container.querySelector("[data-atlas-dashboard-demo]");
  expect(screen.queryByRole("button", { name: "Replay demo" })).toBeNull();
  fireEvent.click(
    within(showcase as HTMLElement).getByRole("button", {
      name: "Journey",
    }),
  );
  expect(demo).toHaveAttribute("data-dashboard-demo-state", "journey");
  expect(within(showcase as HTMLElement).getByRole("heading", { name: "Your Journey" })).toBeVisible();
});

it("demonstrates each Atlas area as a cursor-driven user flow", () => {
  vi.useFakeTimers();
  const { container } = render(<DashboardShowcase />);
  const demo = container.querySelector("[data-atlas-dashboard-demo]");
  const product = within(demo as HTMLElement);
  const cursor = container.querySelector("[data-dashboard-demo-cursor]");
  const advance = (milliseconds: number) =>
    act(() => vi.advanceTimersByTime(milliseconds));

  expect(demo).toHaveAttribute("data-dashboard-demo-state", "dashboard");
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar");
  expect(cursor).toHaveAttribute(
    "data-dashboard-cursor-target",
    "nav-dashboard",
  );
  expect(
    demo?.querySelectorAll("[data-dashboard-demo-highlight]"),
  ).toHaveLength(1);

  advance(600);
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar-click");
  expect(cursor).toHaveAttribute("data-dashboard-cursor-clicking", "true");

  advance(200);
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "target");
  expect(cursor).toHaveAttribute("data-dashboard-cursor-target", "dashboard");

  advance(750);
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "target-click");
  advance(200);
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "hold");
  expect(screen.getByText("Scholarship finder")).toBeVisible();

  advance(1300);
  expect(cursor).toHaveAttribute(
    "data-dashboard-cursor-target",
    "nav-journey",
  );

  for (const [state, heading, response, nextTarget] of [
    ["journey", "Your Journey", "Selected for comparison", "nav-my-type"],
    ["my-type", "Your student type", "Priorities surfaced", "nav-essentials"],
    ["essentials", "Essentials", "Selected for you", "nav-career"],
    ["career", "Build your UK career from day one", "Next step highlighted", "nav-jobs"],
    ["jobs", "Jobs", "Visa sponsors only", "nav-dashboard"],
  ]) {
    advance(600);
    expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar-click");
    advance(200);
    expect(demo).toHaveAttribute("data-dashboard-demo-state", state);
    expect(demo).toHaveAttribute("data-dashboard-demo-phase", "target");
    expect(cursor).toHaveAttribute("data-dashboard-cursor-target", state);
    expect(product.getByRole("heading", { name: heading })).toBeVisible();
    advance(750);
    expect(demo).toHaveAttribute("data-dashboard-demo-phase", "target-click");
    advance(200);
    expect(product.getByText(response)).toBeVisible();
    advance(1300);
    expect(cursor).toHaveAttribute("data-dashboard-cursor-target", nextTarget);
  }

  fireEvent.click(product.getByRole("button", { name: "Career" }));
  expect(demo).toHaveAttribute("data-dashboard-demo-state", "career");
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar");
  expect(cursor).toHaveAttribute("data-dashboard-cursor-target", "nav-career");

  fireEvent.click(product.getByRole("button", { name: "Dashboard" }));
  fireEvent.click(product.getByRole("button", { name: "Open Scholarships" }));
  expect(container.querySelector("[data-dashboard-tool-drawer]")).not.toBeNull();
  expect(screen.getByText("Scholarship finder")).toBeVisible();

  advance(12000);
  expect(demo).toHaveAttribute("data-dashboard-demo-state", "dashboard");

  vi.useRealTimers();
});

it("pauses the guided dashboard demo while the student explores it", () => {
  vi.useFakeTimers();
  const { container } = render(<DashboardShowcase />);
  const demo = container.querySelector(
    "[data-atlas-dashboard-demo]",
  ) as HTMLElement;

  fireEvent.mouseEnter(demo);
  act(() => vi.advanceTimersByTime(9000));
  expect(demo).toHaveAttribute("data-dashboard-demo-state", "dashboard");
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar");

  fireEvent.mouseLeave(demo);
  act(() => vi.advanceTimersByTime(600));
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar-click");

  const journeyButton = within(demo).getByRole("button", { name: "Journey" });
  fireEvent.focus(journeyButton);
  act(() => vi.advanceTimersByTime(9000));
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "sidebar-click");

  fireEvent.blur(journeyButton, { relatedTarget: null });
  act(() => vi.advanceTimersByTime(200));
  expect(demo).toHaveAttribute("data-dashboard-demo-phase", "target");

  vi.useRealTimers();
});

it("cycles through the complete Atlas journey from admission to employment", () => {
  vi.useFakeTimers();
  const { container } = render(<WhatAtlasIs />);
  const section = container.querySelector("[data-atlas-homepage-what-atlas-is]");
  const copyColumn = container.querySelector("[data-atlas-definition-copy]");

  expect(section).toHaveClass("lg:h-[90svh]");
  expect(copyColumn).toHaveClass("lg:justify-center");
  expect(section).toHaveTextContent(
    "One system for your whole UK move - university, visa, housing, and the job after.",
  );
  expect(section).toHaveTextContent(
    "Most platforms stop at your offer letter. Atlas is built for what comes next.",
  );

  const getIn = screen.getByRole("button", { name: "Get in." });
  const getThere = screen.getByRole("button", { name: "Get there." });
  const getHired = screen.getByRole("button", { name: "Get hired." });

  expect(getIn).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("University of Leeds")).toBeVisible();
  expect(screen.getByText("MSc Computer Science · Sep 2026")).toBeVisible();
  expect(screen.getByText("Offer received")).toBeVisible();

  act(() => vi.advanceTimersByTime(3600));

  expect(getThere).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Visa · housing · arrival")).toBeVisible();
  expect(screen.getByText("64% ready - next: final transcripts")).toBeVisible();
  expect(screen.getByText("On track")).toBeVisible();

  fireEvent.click(getHired);

  expect(getHired).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByText("Graduate Software Engineer")).toBeVisible();
  expect(screen.getByText("London · £38–45k · via Atlas Jobs")).toBeVisible();
  expect(screen.getByText("Sponsors visa")).toBeVisible();

  vi.useRealTimers();
});

it("adds the free product, Concierge, and Resources stories", () => {
  const { container } = render(<HomePage />);
  const free = container.querySelector("[data-atlas-homepage-free-product]");
  const support = container.querySelector("[data-atlas-homepage-support]");
  const concierge = container.querySelector("[data-atlas-homepage-concierge]");
  const resources = container.querySelector("[data-atlas-homepage-resources]");

  expect(free).not.toBeNull();
  expect(support).not.toBeNull();
  expect(concierge).not.toBeNull();
  expect(container.querySelector("[data-atlas-homepage-knowledge-tools]")).toBeNull();
  expect(resources).not.toBeNull();
  expect(concierge?.nextElementSibling).toBe(resources);
  expect(free).toHaveAttribute("data-orange-origin", "right");
  expect(within(free as HTMLElement).queryByText(/Included for every student/i))
    .toBeNull();
  expect(
    within(free as HTMLElement).queryByText(
      /Careers, events, and community are not paid add-ons/i,
    ),
  ).toBeNull();
  expect(
    free?.querySelectorAll("[data-free-product-card]"),
  ).toHaveLength(3);
  expect(free?.querySelectorAll("[data-free-product-preview]")).toHaveLength(3);
  expect(free?.querySelectorAll("[data-free-product-motion]")).toHaveLength(3);
  expect(free?.querySelectorAll("svg[data-free-product-artwork]")).toHaveLength(0);
  expect(within(free as HTMLElement).queryByText("Free forever")).toBeNull();
  expect(
    within(free as HTMLElement).queryAllByRole("button"),
  ).toHaveLength(0);
  for (const [heading, subheading] of [
    ["Careers & jobs", "Roles that actually sponsor."],
    ["Events", "What’s happening around you"],
    ["Community", "Ask someone who’s already there."],
  ]) {
    const itemHeading = within(free as HTMLElement).getByRole("heading", {
      level: 3,
      name: heading,
    });
    expect(itemHeading).toBeVisible();
    expect(itemHeading).toHaveAttribute("data-free-product-heading");
    expect(itemHeading).toHaveClass(
      "text-[clamp(2.5rem,4vw,4rem)]",
      "leading-[.95]",
    );
    const itemSubheading = within(free as HTMLElement).getByText(subheading);
    expect(itemSubheading).toHaveAttribute("data-free-product-subheading");
    expect(itemSubheading).toHaveClass(
      "text-[clamp(1.2rem,1.7vw,1.55rem)]",
    );
  }
  expect(
    within(free as HTMLElement).getByRole("img", {
      name: /Atlas jobs board showing roles with visa sponsorship/i,
    }),
  ).toBeVisible();
  expect(
    within(free as HTMLElement).getByRole("img", {
      name: /upcoming Atlas events/i,
    }),
  ).toBeVisible();
  expect(
    within(free as HTMLElement).getByRole("img", {
      name: /Atlas community conversation/i,
    }),
  ).toBeVisible();

  expect(
    within(concierge as HTMLElement).getByRole("link", {
      name: "Explore Atlas Concierge",
    }),
  ).toHaveAttribute("href", "/concierge");
  const conciergeCta = concierge?.querySelector("[data-concierge-cta]");
  expect(conciergeCta).not.toBeNull();
  expect(conciergeCta).toHaveClass(
    "overflow-hidden",
    "bg-transparent",
    "active:scale-[.97]",
    "duration-200",
  );
  expect(
    conciergeCta?.querySelector("[data-concierge-cta-fill]"),
  ).toHaveClass(
    "origin-left",
    "scale-x-0",
    "group-hover:scale-x-100",
    "group-focus-visible:scale-x-100",
  );

  expect(
    resources?.querySelectorAll("[data-resource-article]"),
  ).toHaveLength(4);
  expect(
    resources?.querySelectorAll("[data-resource-tool]"),
  ).toHaveLength(3);
  expect(resources?.querySelector("[data-atlas-homepage-faq]")).toBeNull();
});

it("presents resources as an editorial guide library without autoplay", () => {
  const { container } = render(<ResourcesSection />);
  const section = container.querySelector("[data-atlas-homepage-resources]");

  expect(
    within(section as HTMLElement).getByRole("heading", {
      level: 2,
      name: "Resources for the decisions ahead.",
    }),
  ).toBeVisible();
  expect(section?.querySelectorAll("[data-resource-flagship]")).toHaveLength(1);
  expect(
    section?.querySelectorAll("[data-resource-article]"),
  ).toHaveLength(4);
  expect(
    section?.querySelectorAll("[data-resource-tool]"),
  ).toHaveLength(3);
  for (const card of Array.from(
    section?.querySelectorAll("[data-resource-tool]") ?? [],
  )) {
    expect(card.querySelector("[data-resource-tool-meta]")).toHaveClass(
      "text-white/58",
    );
    expect(card.querySelector("[data-resource-tool-badge]")).toHaveClass(
      "text-white/68",
    );
    expect(card.querySelector("[data-resource-tool-title]")).toHaveClass(
      "text-white/95",
    );
    expect(card.querySelector("[data-resource-tool-copy]")).toHaveClass(
      "text-white/70",
    );
    expect(card.querySelector("[data-resource-tool-preview]")).toHaveClass(
      "text-white/65",
    );
  }
  expect(section?.querySelectorAll("[data-resource-actions] a")).toHaveLength(2);
  expect(section?.querySelector("[data-resource-laptop]")).toBeNull();
  expect(section).not.toHaveAttribute("data-resource-demo-state");
  expect(section).not.toHaveTextContent("Guides & tools");
  expect(section).not.toHaveTextContent(
    "Clear guides and practical tools for the moments students actually face.",
  );
});

it("links every resource and tool directly without demo controls", () => {
  const { container } = render(<ResourcesSection />);
  const section = container.querySelector("[data-atlas-homepage-resources]");

  expect(section?.querySelector("[data-resource-flagship]")).toHaveAttribute(
    "href",
    "/resources/uk-2026",
  );
  expect(
    Array.from(section?.querySelectorAll("[data-resource-article]") ?? []).map(
      (link) => link.getAttribute("href"),
    ),
  ).toEqual([
    "/resources/visa-documents",
    "/resources/scholarships",
    "/resources/first-7-days",
    "/resources/graduate-route",
  ]);
  expect(
    Array.from(section?.querySelectorAll("[data-resource-tool]") ?? []).map(
      (link) => link.getAttribute("href"),
    ),
  ).toEqual([
    "/signup?next=budget-calculator",
    "/signup?next=visa-checker",
    "/signup?next=checklists",
  ]);
  expect(section?.querySelector("[data-resource-demo-cursor]")).toBeNull();
  expect(section?.querySelector("[data-resource-progress-segment]")).toBeNull();
});

it("keeps the original service catalogue alongside the student journey", () => {
  const { container } = render(<HomePage />);
  const journey = container.querySelector("[data-atlas-homepage-services]");
  const catalog = container.querySelector("[data-atlas-homepage-service-catalog]");

  expect(journey).not.toBeNull();
  expect(catalog).not.toBeNull();
  expect(journey).not.toBe(catalog);
  const catalogHeading = screen.getByRole("heading", {
    level: 2,
    name: "There’s a service for that. Everything you need abroad, without opening ten different tabs.",
  });
  expect(catalogHeading).toBeVisible();
  expect(
    catalog?.querySelector("[data-service-catalog-title-primary]"),
  ).toHaveClass("text-[clamp(2.35rem,3.8vw,3.75rem)]");
  expect(
    catalog?.querySelector("[data-service-catalog-title-secondary]"),
  ).toHaveClass("text-[clamp(1.3rem,1.7vw,1.65rem)]");
  const categoryTabs = within(catalog as HTMLElement).getAllByRole("tab");
  expect(categoryTabs).toHaveLength(4);
  categoryTabs.forEach((tab) => {
    expect(tab).toHaveClass("text-base", "sm:text-lg");
  });
  const serviceCards = Array.from(
    catalog?.querySelectorAll<HTMLElement>("[data-atlas-service-card]") ?? [],
  );
  expect(serviceCards).toHaveLength(5);
  serviceCards.forEach((card) => {
    expect(card).toHaveAttribute("data-service-card-style", "illustrated");
    expect(card.querySelector("svg[data-service-artwork]")).not.toBeNull();
  });
  expect(
    new Set(
      serviceCards.map((card) => card.dataset.serviceVisualKey),
    ).size,
  ).toBe(5);
});

it("maps Atlas services onto a four-stage student journey", () => {
  const { container } = render(<HomePage />);
  const servicesSection = container.querySelector("[data-atlas-homepage-services]");

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "How Atlas Works",
    }),
  ).toBeVisible();
  expect(
    within(servicesSection as HTMLElement).getByText(
      "Your journey, stage by stage.",
    ),
  ).toBeVisible();
  expect(
    within(servicesSection as HTMLElement).queryByText(
      "Everything you need abroad, without opening ten different tabs.",
    ),
  ).toBeNull();
  expect(servicesSection).toHaveAttribute("data-journey-scroll-steps", "4");
  expect(servicesSection).toHaveAttribute(
    "data-journey-scroll-mode",
    "continuous",
  );
  expect(servicesSection?.querySelector("[data-journey-path]")).not.toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-flight]"),
  ).not.toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-flight-shape]"),
  ).not.toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-flight-halo]"),
  ).toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-flight-original]"),
  ).toHaveAttribute(
    "d",
    "M7 19.5c7.4-3.6 18.7-5.3 31.6-4.5 8.3.5 13.4 3.4 16.1 7.5-2.2 5.4-7.4 8.1-15.6 8.6l-25.5.3c-6.1-.1-9.5-2.4-10.7-5.8 0-2.2 1.4-4.3 4.1-6.1Z",
  );
  expect(servicesSection?.querySelector("linearGradient")).toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-path-progress]"),
  ).toHaveAttribute("stroke", "#f35a02");
  expect(
    servicesSection?.querySelector("[data-journey-path-pending]"),
  ).toHaveAttribute("stroke", "#34383f");
  expect(servicesSection?.querySelectorAll("[data-journey-stage]")).toHaveLength(4);
  expect(servicesSection?.querySelectorAll("[data-journey-node]")).toHaveLength(4);
  for (const node of Array.from(
    servicesSection?.querySelectorAll<HTMLElement>("[data-journey-node]") ?? [],
  )) {
    expect(node).toHaveClass("rounded-full");
    expect(node).not.toHaveClass("bg-[var(--stage-color)]", "p-[3px]");
    expect(node.querySelector("[data-journey-image]")).not.toBeNull();
  }
  expect(
    Array.from(
      servicesSection?.querySelectorAll("[data-journey-image]") ?? [],
    ).map((image) => image.getAttribute("data-journey-image")),
  ).toEqual(["application", "passport", "home", "community"]);
  for (const image of Array.from(
    servicesSection?.querySelectorAll<HTMLImageElement>("[data-journey-image]") ?? [],
  )) {
    expect(decodeURIComponent(image.src)).toContain(
      "/images/homepage/journey-photos/",
    );
    expect(image).toHaveClass("object-cover");
    expect(image).toHaveClass("rounded-full");
  }
  expect(
    servicesSection?.querySelector("[data-journey-path-pending]"),
  ).toHaveAttribute(
    "d",
    "M125 72C220 72 280 30 375 30S530 100 625 100S780 52 875 52",
  );
  expect(
    servicesSection?.querySelector("[data-journey-path-pending]"),
  ).toHaveAttribute("stroke-dasharray", "1 13");
  expect(
    servicesSection?.querySelector("[data-journey-path-progress]"),
  ).toHaveAttribute("stroke-dasharray", "1 13");
  expect(servicesSection?.querySelectorAll("[data-lucide]")).toHaveLength(0);
  expect(servicesSection?.querySelector("[data-journey-sticky]")).not.toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-detail-rail]"),
  ).not.toBeNull();
  expect(servicesSection?.querySelector("[data-journey-detail-card]"))
    .toBeNull();

  for (const [stage, timing] of [
    ["Prepare", "13 months out"],
    ["Arrive", "6 months out"],
    ["Settle", "3 months out"],
    ["Thrive", "Day one onward"],
  ]) {
    expect(screen.getByRole("button", { name: `Explore ${stage}` })).toBeVisible();
    expect(screen.getByText(timing)).toBeVisible();
  }

  expect(screen.getByRole("button", { name: "Explore Prepare" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByText("University shortlist")).toBeVisible();

  fireEvent.click(screen.getByRole("button", { name: "Explore Arrive" }));

  expect(screen.getByRole("button", { name: "Explore Arrive" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByText("Visa guidance")).toBeVisible();
  expect(
    container.querySelector("[data-journey-detail-rail]"),
  ).toHaveAttribute("data-active-stage", "arrive");

  fireEvent.click(screen.getByRole("button", { name: "Explore Thrive" }));

  expect(
    screen
      .getByRole("button", { name: "Explore Thrive" })
      .closest("[data-journey-stage]"),
  ).toHaveAttribute("data-stage-state", "complete");
  expect(
    within(servicesSection as HTMLElement).getByRole("link", {
      name: "Explore every Atlas service",
    }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20services",
  );
});

it("keeps the restored essentials orbit available but hidden from the homepage", () => {
  const { container } = render(<HomePage />);

  expect(container.querySelector("[data-atlas-homepage-essentials]")).toBeNull();
  expect(
    screen.queryByRole("heading", {
      level: 2,
      name: "Everything you need, connected.",
    }),
  ).not.toBeInTheDocument();
  const restored = render(<EssentialsOrbit />);
  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "All the essentials that matter in one place",
    }),
  ).toBeVisible();

  const essentialsList = screen.getByRole("list", {
    name: "Atlas essentials",
  });

  for (const label of [
    "University",
    "Visa",
    "Funding",
    "Housing",
    "Banking",
    "Travel",
    "Insurance",
    "Community",
  ]) {
    expect(within(essentialsList).getByText(label)).toBeInTheDocument();
  }

  expect(restored.container.querySelector("[data-essentials-orbit]")).not.toBeNull();
  expect(restored.container.querySelector("[data-essentials-phone]")).not.toBeNull();
  expect(restored.container.querySelector("[data-essentials-workspace]")).toBeNull();
});

it("presents student-controlled guidance with Atlas support", () => {
  const { container } = render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Real stories. Real support.",
    }),
  ).toBeVisible();
  expect(
    screen.getByText(
      "Your decisions stay yours. Atlas gives you the guidance, tools, and people to move forward with confidence.",
    ),
  ).toBeVisible();
  expect(
    screen.getByText("Real support, whenever you need it."),
  ).toBeVisible();

  for (const testimonial of [
    "“Atlas helped me turn a confusing application into a clear plan.”",
    "“I always knew what to do next.”",
    "“Real answers, exactly when I needed them.”",
    "“The fastest, most thoughtful support throughout my move.”",
    "“It felt like having someone in my corner from day one.”",
  ]) {
    expect(screen.getByText(testimonial)).toBeVisible();
  }

  for (const student of [
    "Maya Patel",
    "Arjun Nair",
    "Sofia Chen",
    "Daniel Okafor",
    "Lina Hassan",
  ]) {
    expect(screen.getByText(student)).toBeVisible();
    expect(
      screen.getByRole("img", { name: `${student} avatar` }),
    ).toBeVisible();
  }
  expect(container.querySelector("[data-atlas-homepage-support]")).not.toBeNull();
  expect(
    within(
      container.querySelector("[data-atlas-homepage-support]") as HTMLElement,
    ).queryByRole("link", { name: "Explore Atlas Concierge" }),
  ).toBeNull();
  const reviewBubbles = container.querySelectorAll("[data-support-pill]");
  expect(reviewBubbles).toHaveLength(5);
  expect(container.querySelectorAll("[data-support-identity]")).toHaveLength(5);
  expect(container.querySelectorAll("[data-support-message]")).toHaveLength(5);
  expect(container.querySelectorAll("[data-support-tail]")).toHaveLength(5);
  expect(
    new Set(
      Array.from(container.querySelectorAll("[data-support-message]")).map(
        (message) => message.getAttribute("data-support-color"),
      ),
    ).size,
  ).toBe(5);
  for (const bubble of reviewBubbles) {
    expect(bubble).toHaveAttribute("tabindex", "0");
    const message = bubble.querySelector("[data-support-message]");
    const tail = bubble.querySelector("[data-support-tail]");
    expect(message).toHaveAttribute("data-support-color");
    expect(tail).toHaveAttribute("aria-hidden", "true");
    expect(tail?.tagName).toBe("svg");
    expect(tail?.querySelectorAll("[data-support-tail-piece]")).toHaveLength(1);
    expect(tail?.querySelector("[data-support-tail-piece]")).toHaveAttribute(
      "fill",
      "currentColor",
    );
    const tailPath = tail
      ?.querySelector("[data-support-tail-piece]")
      ?.getAttribute("d");
    expect(tailPath).toMatch(/C.+c/);
    expect(tailPath).not.toMatch(/[HhVvLl]/);
  }
});

it("introduces Atlas Concierge before resources and testimonials", () => {
  const { container } = render(<HomePage />);
  const testimonials = container.querySelector("[data-atlas-homepage-support]");
  const concierge = container.querySelector("[data-atlas-homepage-concierge]");
  const resources = container.querySelector("[data-atlas-homepage-resources]");

  expect(testimonials).toHaveAttribute("id", "student-stories");
  expect(concierge).toHaveAttribute("id", "atlas-support");
  expect(concierge?.nextElementSibling).toBe(resources);
  expect(resources?.nextElementSibling).toBe(testimonials);
  expect(
    within(concierge as HTMLElement).getByRole("heading", {
      level: 2,
      name: "The hardest steps, handled.",
    }),
  ).toBeVisible();
  expect(concierge).toHaveTextContent(
    "Hand any step of your move to a specialist who has done it hundreds of times - working inside your Atlas, on your case.",
  );
  expect(
    within(concierge as HTMLElement).queryByText("Atlas Concierge", {
      selector: "p",
    }),
  ).not.toBeInTheDocument();
  expect(concierge?.querySelectorAll("svg")).toHaveLength(0);
  for (const point of [
    "One dedicated expert - the same specialist from first message to final document.",
    "No starting over - they already have your documents, deadlines, and timeline.",
    "A fixed fee, agreed upfront - before any work begins.",
  ]) {
    expect(concierge).toHaveTextContent(point);
  }
  const chatComputer = concierge?.querySelector("[data-concierge-computer]");
  expect(chatComputer).not.toBeNull();
  expect(chatComputer).toHaveClass("rounded-[20px]", "overflow-hidden");
  expect(
    chatComputer?.querySelectorAll("[data-concierge-window-control]"),
  ).toHaveLength(3);
  expect(chatComputer?.querySelector("[data-concierge-sidebar]")).not.toBeNull();
  expect(chatComputer?.querySelector("[data-concierge-thread]")).not.toBeNull();
  expect(chatComputer?.querySelector("[data-concierge-composer]")).not.toBeNull();
  expect(concierge).toHaveTextContent(
    "My CAS arrived and I fly in six weeks. Can a specialist take over my visa application?",
  );
  expect(concierge).toHaveTextContent(
    "Consider it done. Your file is complete except the TB certificate - the full application will be ready for your sign-off tomorrow.",
  );
  expect(concierge).toHaveTextContent(
    "Visa application - in expert hands. Fixed fee, agreed upfront.",
  );
  expect(
    within(concierge as HTMLElement).getByRole("link", {
      name: "Explore Atlas Concierge",
    }),
  ).toHaveAttribute("href", "/concierge");
  expect(
    within(concierge as HTMLElement).getByRole("link", {
      name: "See what it costs",
    }),
  ).toHaveAttribute("href", "/concierge#pricing");
});

it("renders an interactive Atlas FAQ in the Rainbow layout", () => {
  const { container } = render(<HomePage />);
  const faq = container.querySelector("[data-atlas-homepage-faq]");

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Frequently Asked Questions",
    }),
  ).toBeVisible();
  expect(faq).not.toBeNull();
  expect(within(faq as HTMLElement).getAllByRole("button")).toHaveLength(3);

  const freeQuestion = within(faq as HTMLElement).getByRole("button", {
    name: "Is Atlas really free?",
  });
  expect(freeQuestion).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(freeQuestion);

  expect(freeQuestion).toHaveAttribute("aria-expanded", "true");
  expect(
    within(faq as HTMLElement).getByText(/The core Atlas platform is free/),
  ).toBeVisible();
  expect(
    within(faq as HTMLElement).getByRole("link", { name: /See more FAQs/ }),
  ).toHaveAttribute("href", "mailto:hello@atlas.study?subject=Atlas%20FAQs");
});

it("renders a dedicated Atlas homepage footer matching the normal-page structure", () => {
  const { container } = render(<Footer />);
  const footer = container.querySelector("[data-atlas-site-footer]");

  expect(footer).not.toBeNull();
  expect(
    within(footer as HTMLElement).getByText(
      "© 2026 GGI Atlas · Built in London",
    ),
  ).toBeVisible();
  expect(within(footer as HTMLElement).getByAltText("ATLAS")).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("link", {
      name: "Match universities",
    }),
  ).toHaveAttribute("href", "/#journey");
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "APPLY" }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "SETTLE" }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "THRIVE" }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "SUPPORT" }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("heading", {
      name: "CONTACT US",
    }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("link", {
      name: "hello@atlas.study",
    }),
  ).toHaveAttribute("href", "mailto:hello@atlas.study");
  const socialLinks = within(footer as HTMLElement)
    .getByLabelText("Follow Atlas on social media")
    .querySelectorAll("a[data-footer-social]");
  expect(socialLinks).toHaveLength(4);
});
