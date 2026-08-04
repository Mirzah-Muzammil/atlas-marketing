import { render, screen, within } from "@testing-library/react";

import HowItWorksPage from "@/app/how-it-works/page";

describe("How It Works page", () => {
  it("maps the complete student journey from deciding to life after graduation", () => {
    render(<HowItWorksPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What using Atlas actually looks like.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "From the day you decide to study abroad to the day you graduate. Then well beyond. This is the journey we’re built for, end to end.",
      ),
    ).toBeVisible();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "From decision to promotion. All in one place.",
      }),
    ).toBeVisible();

    expect(document.querySelector("[data-how-it-works-route]")).not.toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: "The three stages of an Atlas journey" }),
    ).toBeVisible();
    expect(document.querySelector("[data-how-it-works-hero-copy]")).toHaveClass(
      "lg:text-left",
    );
    expect(
      screen.getByRole("list", { name: "The three stages of an Atlas journey" }),
    ).toHaveClass("lg:justify-self-end");
    expect(screen.queryByText("The full picture")).not.toBeInTheDocument();
    expect(document.querySelector("[data-journey-map-intro]")).toHaveClass("text-center");

    const journeyMap = screen.getByRole("table", {
      name: "Atlas student journey map",
    });

    for (const stage of [
      "Still deciding",
      "Shortlisting universities",
      "Applying",
      "Pre-departure",
      "First year and beyond",
    ]) {
      expect(within(journeyMap).getByText(stage)).toBeVisible();
    }
  });

  it("explains the three Atlas phases with their real student tools", () => {
    render(<HowItWorksPage />);

    for (const heading of [
      "Pick a university. Get in. Without the kickbacks.",
      "Land. Get sorted. In a week, not a month.",
      "After you land. The bit nobody else builds.",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeVisible();
    }

    for (const tool of [
      "University Matcher",
      "Application tracker",
      "Pre-departure checklist",
      "The UK Settler's Handbook",
      "Career & jobs",
      "Community",
      "Events",
    ]) {
      expect(screen.getAllByText(tool).length).toBeGreaterThan(0);
    }

    expect(document.querySelectorAll("[data-journey-phase-scene]")).toHaveLength(3);
    expect(document.querySelectorAll("[data-journey-phase-layout='editorial']")).toHaveLength(3);
    expect(
      screen.queryByRole("list", {
        name: "Pick a university. Get in. Without the kickbacks. tools",
      }),
    ).not.toBeInTheDocument();
  });

  it("ends with the reference comparison, timing questions, and start CTA", () => {
    render(<HowItWorksPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Atlas vs the typical agent.",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Real timing questions." }),
    ).toBeVisible();
    expect(
      screen.getByText("How long does the whole journey actually take?"),
    ).toBeVisible();
    expect(screen.getByRole("heading", { level: 2, name: "Ready to start?" })).toBeVisible();
    const cta = document.querySelector("[data-concierge-final-cta]");
    expect(cta).not.toBeNull();
    expect(within(cta as HTMLElement).getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "/get-started",
    );
    expect(within(cta as HTMLElement).queryByText("Free to set up")).not.toBeInTheDocument();
  });
});
