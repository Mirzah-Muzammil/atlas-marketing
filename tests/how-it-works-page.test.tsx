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

  it("shows each Atlas phase as an alternating editorial image and copy layout", () => {
    render(<HowItWorksPage />);

    for (const heading of [
      "Pick a university. Get in. Without the kickbacks.",
      "Land. Get sorted. In a week, not a month.",
      "After you land. The bit nobody else builds.",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeVisible();
    }

    expect(document.querySelectorAll("[data-journey-phase-layout='split']")).toHaveLength(3);
    expect(document.querySelectorAll("[data-journey-phase-visual]")).toHaveLength(3);
    expect(document.querySelectorAll("[data-journey-phase-copy]")).toHaveLength(3);
    expect(
      screen.getByAltText("Student preparing an Atlas university application"),
    ).toBeVisible();
    expect(
      screen.getByAltText("Passport and documents for an Atlas arrival plan"),
    ).toBeVisible();
    expect(
      screen.getByAltText("Students building community after arriving in the UK"),
    ).toBeVisible();

    for (const detail of [
      "Admit probability, projected ROI, visa success, and real costs are compared against your actual profile.",
      "Banking, SIM, insurance, housing, forex, flights, and packing are ready before you board the plane.",
      "Sponsorship-friendly roles, graduate schemes, internships, CV reviews, and alumni mentors stay close after you land.",
    ]) {
      expect(screen.getByText(detail)).toBeVisible();
    }
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
      screen.getByText(
        "Most students choose between using Atlas free or paying an agent to do their applications.",
      ),
    ).toHaveClass("text-base");
    expect(
      screen.getByRole("heading", { level: 2, name: "Real timing questions." }),
    ).toBeVisible();
    expect(
      screen.getByText("How long does the whole journey actually take?"),
    ).toBeVisible();
    expect(document.querySelector("[data-concierge-faq]")).toBeInTheDocument();
    expect(document.querySelector("[data-atlas-homepage-faq]")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Ready to start?" })).toBeVisible();
    const cta = document.querySelector("[data-concierge-final-cta]");
    expect(cta).not.toBeNull();
    expect(within(cta as HTMLElement).getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "/get-started",
    );
    expect(within(cta as HTMLElement).queryByText("Free to set up")).not.toBeInTheDocument();
    expect(within(cta as HTMLElement).queryByText("The whole journey, sorted.")).not.toBeInTheDocument();
    expect(within(cta as HTMLElement).getByTestId("three-minute-visual")).toBeVisible();
    expect(
      within(cta as HTMLElement).getAllByTestId("three-minute-visual-scene"),
    ).toHaveLength(3);
  });

  it("reveals the hero stage card titles and descriptions with the page animation", () => {
    render(<HowItWorksPage />);

    expect(document.querySelectorAll("[data-how-it-works-stage-copy]")).toHaveLength(6);
    expect(
      document.querySelectorAll(
        "[data-how-it-works-stage-copy][data-atlas-homepage-title-reveal]",
      ),
    ).toHaveLength(6);
  });
});
