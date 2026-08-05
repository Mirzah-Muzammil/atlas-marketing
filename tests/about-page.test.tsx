import { render, screen } from "@testing-library/react";

import AboutPage from "@/app/about/page";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutWhyReveal } from "@/components/about/AboutWhyReveal";

describe("About page", () => {
  it("centres the source-informed Why copy and reveals it at a slower scroll pace", () => {
    render(<AboutWhyReveal />);

    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "The industry treats this as a sales opportunity. We don't.",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByText(/For most international students, studying abroad/),
    ).toHaveLength(2);
    expect(document.querySelector("[data-about-why-reveal]")).toBeInTheDocument();
    expect(document.querySelector("[data-about-why-reveal]")).toHaveAttribute(
      "data-about-reveal-pace",
      "slow",
    );
    expect(document.querySelector("[data-about-why-copy]")).toHaveClass("text-center");
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
    expect(document.querySelectorAll("[data-about-proof-artwork]")).toHaveLength(3);
    expect(document.querySelector("[data-about-editorial-hero] dl")).not.toBeInTheDocument();
    expect(screen.getByAltText("Six years in the field artwork")).toBeVisible();
    expect(screen.getByAltText("London base artwork")).toBeVisible();
    expect(screen.getByAltText("Free Atlas operating system artwork")).toBeVisible();
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
