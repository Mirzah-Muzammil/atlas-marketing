import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/components/landing-3/ShaderAnimation", () => ({
  ShaderAnimation: () => <div data-testid="landing-3-shader" />,
}));

import Landing3Page from "@/app/landing-3/page";

it("animates only the seven primary Landing 3 section titles", () => {
  const { container } = render(<Landing3Page />);
  const animatedTitles = container.querySelectorAll(
    "[data-landing-3-title-reveal]",
  );

  expect(animatedTitles).toHaveLength(7);

  for (const { level, name } of [
    {
      level: 1,
      name: "Your operating system for studying and succeeding abroad.",
    },
    {
      level: 2,
      name: "From application to arrival. One Atlas, every next step.",
    },
    {
      level: 2,
      name: "It’s not just about getting in. It’s about being ready for everything after.",
    },
    {
      level: 2,
      name: "There’s a service for every stage.",
    },
    {
      level: 2,
      name: "All the essentials that matter in one place",
    },
    { level: 3, name: "Real stories. Real support." },
    { level: 2, name: "Frequently Asked Questions" },
  ]) {
    expect(screen.getByRole("heading", { level, name })).toHaveAttribute(
      "data-landing-3-title-reveal",
    );
  }
});

it("renders Atlas content in the Raycast-inspired hero hierarchy", () => {
  render(<Landing3Page />);

  expect(
    screen.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeVisible();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your operating system for studying and succeeding abroad.",
  );
  expect(screen.getByText(/Apply with clarity\. Land prepared\./)).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Get started — free" }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
  expect(
    screen.getByRole("link", { name: "Explore the platform" }),
  ).toHaveAttribute("href", "#platform");
  expect(screen.getByTestId("landing-3-shader")).toBeInTheDocument();
});

it("keeps desktop navigation links available and marks the visual decorative", () => {
  const { container } = render(<Landing3Page />);

  expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute(
    "href",
    "#journey",
  );
  expect(screen.getByRole("link", { name: "Essentials" })).toHaveAttribute(
    "href",
    "#essentials",
  );
  expect(
    container.querySelector('[aria-hidden="true"][data-landing-3-visual]'),
  ).not.toBeNull();
});

it("presents the Atlas dashboard inside a replaceable flat display frame", () => {
  const { container } = render(<Landing3Page />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "From application to arrival. One Atlas, every next step.",
    }),
  ).toBeVisible();
  const dashboardImage = screen.getByAltText(
    "Atlas dashboard showing a student’s application journey, next steps, and services.",
  );
  expect(decodeURIComponent(dashboardImage.getAttribute("src") ?? "")).toContain(
    "/images/crm.png",
  );
  expect(container.querySelector("[data-landing-3-showcase]")).not.toBeNull();
  expect(container.querySelector("[data-showcase-frame]")).not.toBeNull();
  expect(container.querySelector("[data-showcase-media]")).not.toBeNull();
  expect(container.querySelector("[data-macbook-base]")).toBeNull();
});

it("presents Atlas readiness in the Raycast feature-grid structure", () => {
  const { container } = render(<Landing3Page />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "It’s not just about getting in. It’s about being ready for everything after.",
    }),
  ).toBeVisible();
  expect(
    screen.getByRole("link", { name: "Start your Atlas" }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
  expect(container.querySelectorAll("[data-readiness-feature]")).toHaveLength(
    4,
  );
  const firstReadinessCard = container.querySelector(
    "[data-readiness-feature]",
  );
  expect(firstReadinessCard).toHaveClass("hover:-translate-y-1");
  expect(firstReadinessCard).toHaveClass(
    "motion-reduce:hover:translate-y-0",
  );
  expect(container.querySelector("[data-readiness-grid]")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

it("places all UK university marks in three alternating marquee rows after readiness", () => {
  const { container } = render(<Landing3Page />);
  const readiness = container.querySelector("[data-landing-3-readiness]");
  const marquee = container.querySelector(
    "[data-landing-3-university-marquee]",
  );
  const services = container.querySelector("[data-landing-3-services]");

  expect(readiness).not.toBeNull();
  expect(marquee).not.toBeNull();
  expect(services).not.toBeNull();
  expect(readiness?.nextElementSibling).toBe(marquee);
  expect(marquee?.nextElementSibling).toBe(services);

  const rows = marquee?.querySelectorAll("[data-university-marquee-row]");
  expect(rows).toHaveLength(3);
  expect(
    Array.from(rows ?? []).map((row) =>
      row.getAttribute("data-marquee-direction"),
    ),
  ).toEqual(["left", "right", "left"]);

  const primarySets = marquee?.querySelectorAll(
    '[data-marquee-set="primary"]',
  );
  const duplicateSets = marquee?.querySelectorAll(
    '[data-marquee-set="duplicate"]',
  );
  expect(primarySets).toHaveLength(3);
  expect(duplicateSets).toHaveLength(3);
  expect(
    Array.from(primarySets ?? []).reduce(
      (total, set) => total + set.querySelectorAll("[data-university-tile]").length,
      0,
    ),
  ).toBe(143);
  const universityTiles = marquee?.querySelectorAll("[data-university-tile]");
  const universityLogos = marquee?.querySelectorAll("[data-university-logo]");
  expect(universityLogos).toHaveLength(universityTiles?.length ?? 0);
  for (const tile of universityTiles ?? []) {
    expect(tile.textContent).toBe("");
    expect(tile.className).not.toMatch(/(?:^|\s)(?:bg-|border)/);
    const logo = tile.querySelector("[data-university-logo]");
    expect(logo).toHaveClass("brightness-0", "invert");
  }
  for (const duplicate of duplicateSets ?? []) {
    expect(duplicate).toHaveAttribute("aria-hidden", "true");
  }
});

it("maps Atlas services onto a four-stage student journey", () => {
  const { container } = render(<Landing3Page />);
  const servicesSection = container.querySelector("[data-landing-3-services]");

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "There’s a service for every stage.",
    }),
  ).toBeVisible();
  expect(
    screen.getByText(
      "Everything you need abroad, without opening ten different tabs.",
    ),
  ).toBeVisible();
  expect(servicesSection?.querySelector("[data-journey-path]")).not.toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-flight]"),
  ).not.toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-flight-shape]"),
  ).not.toBeNull();
  expect(servicesSection?.querySelector("linearGradient")).toBeNull();
  expect(
    servicesSection?.querySelector("[data-journey-path-progress]"),
  ).toHaveAttribute("stroke", "#45e38f");
  expect(
    servicesSection?.querySelector("[data-journey-path-pending]"),
  ).toHaveAttribute("stroke", "#34383f");
  expect(servicesSection?.querySelectorAll("[data-journey-stage]")).toHaveLength(4);
  expect(servicesSection?.querySelectorAll("[data-journey-node]")).toHaveLength(4);
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
    screen.getByRole("link", { name: "Explore every Atlas service" }),
  ).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20services",
  );
});

it("presents Atlas essentials in a Rainbow-inspired orbit", () => {
  const { container } = render(<Landing3Page />);

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

  expect(
    container.querySelector("[data-landing-3-essentials]"),
  ).not.toBeNull();
  expect(container.querySelector("[data-essentials-stage]")).not.toBeNull();
  expect(container.querySelector("[data-essentials-orbit]")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  expect(container.querySelector("[data-essentials-phone]")).not.toBeNull();
  expect(container.querySelectorAll("[data-essential-node]")).toHaveLength(
    40,
  );
});

it("presents student-controlled guidance with Atlas support", () => {
  const { container } = render(<Landing3Page />);

  expect(
    screen.getByRole("heading", {
      level: 3,
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
  expect(container.querySelector("[data-landing-3-support]")).not.toBeNull();
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

it("renders an interactive Atlas FAQ in the Rainbow layout", () => {
  const { container } = render(<Landing3Page />);
  const faq = container.querySelector("[data-landing-3-faq]");

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

it("renders a dedicated Landing 3 footer matching the normal-page structure", () => {
  const { container } = render(<Landing3Page />);
  const footer = container.querySelector("[data-landing-3-footer]");

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
  ).toHaveAttribute("href", "#journey");
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "APPLY" }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "SETTLE" }),
  ).toBeVisible();
  expect(
    within(footer as HTMLElement).getByRole("heading", { name: "THRIVE" }),
  ).toBeVisible();
});
