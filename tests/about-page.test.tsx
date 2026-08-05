import { render, screen } from "@testing-library/react";

import AboutPage from "@/app/about/page";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutWhyReveal } from "@/components/about/AboutWhyReveal";

describe("About page", () => {
  it("renders source-informed Why copy as word-level scroll text", () => {
    render(<AboutWhyReveal />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "The industry treats this as a sales opportunity. We don't.",
      }),
    ).toBeVisible();
    expect(
      screen.getAllByText(/For most international students, studying abroad/),
    ).toHaveLength(2);
    expect(document.querySelector("[data-about-why-reveal]")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-about-why-word]").length).toBeGreaterThan(20);
  });

  it("shows the proof points and six governing principles", () => {
    render(
      <>
        <AboutHero />
        <AboutPrinciples />
      </>,
    );

    for (const proof of [
      "Six",
      "Years in the field",
      "London",
      "Where we're based",
      "Free",
      "The OS, forever",
    ]) {
      expect(screen.getByText(proof)).toBeVisible();
    }

    expect(document.querySelector("[data-about-editorial-hero]")).toBeInTheDocument();
    expect(document.querySelector("[data-about-principles-grid]")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-about-principle]")).toHaveLength(6);
    expect(screen.getByText("The free OS is the product, not the trap.")).toBeVisible();
    expect(screen.getByText("Family-business standards.")).toBeVisible();
  });

  it("covers the team, transparent numbers, vision, founder note, and CTA", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "A small team in London." }),
    ).toBeVisible();
    expect(screen.getByText("Concrete things, honestly counted.")).toBeVisible();
    expect(screen.getByText("The default OS for going abroad.")).toBeVisible();
    expect(screen.getAllByText("Harman Hora")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { level: 2, name: "Read enough? Try the OS." }),
    ).toBeVisible();
  });
});
