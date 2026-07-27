import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/components/landing-3/ShaderAnimation", () => ({
  ShaderAnimation: () => <div data-testid="landing-3-shader" />,
}));

import Landing3Page from "@/app/landing-3/page";

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
  expect(container.querySelector("[data-readiness-grid]")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

it("lets students browse Atlas services by journey stage", () => {
  const { container } = render(<Landing3Page />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "There’s a service for that. Everything you need abroad, without opening ten different tabs.",
    }),
  ).toBeVisible();

  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(4);
  expect(
    container.querySelector("[data-services-active-backdrop]"),
  ).not.toBeNull();
  expect(screen.getByRole("tab", { name: "Prepare" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByText("University Shortlist")).toBeVisible();

  fireEvent.click(screen.getByRole("tab", { name: "Arrive" }));

  expect(screen.getByRole("tab", { name: "Arrive" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByText("Airport Pickup")).toBeVisible();
  expect(container.querySelectorAll("[data-atlas-service-card]")).toHaveLength(
    5,
  );
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
      name: "Controlled by you. Supported by Atlas.",
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
    "Atlas helped me turn a confusing application into a clear plan.",
    "I always knew what to do next.",
    "Real answers, exactly when I needed them.",
    "The fastest, most thoughtful support throughout my move.",
    "It felt like having someone in my corner from day one.",
  ]) {
    expect(screen.getByText(testimonial)).toBeVisible();
  }

  expect(container.querySelector("[data-landing-3-support]")).not.toBeNull();
  expect(container.querySelectorAll("[data-support-pill]")).toHaveLength(5);
});
