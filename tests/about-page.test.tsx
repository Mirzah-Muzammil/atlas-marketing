import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import AboutPage from "@/app/about/page";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutWhyReveal } from "@/components/about/AboutWhyReveal";

const scrollIntoViewMock = vi.fn();
const scrollToMock = vi.fn();

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  configurable: true,
  value: scrollIntoViewMock,
});

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: scrollToMock,
});

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
    ).toHaveLength(1);
    expect(document.querySelector("[data-about-why-reveal]")).toBeInTheDocument();
    expect(document.querySelector("[data-about-why-reveal]")).toHaveAttribute(
      "data-about-reveal-pace",
      "slow",
    );
    expect(document.querySelector("[data-about-why-copy]")).toHaveClass("text-center");
    expect(document.querySelectorAll("[data-about-why-word]").length).toBeGreaterThan(20);
    expect(document.querySelector("[data-about-why-word]")).toHaveStyle({ opacity: "0" });
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
    expect(document.querySelectorAll("[data-about-hero-image-reveal]")).toHaveLength(3);
    expect(document.querySelector("[data-about-editorial-hero] dl")).not.toBeInTheDocument();
    expect(document.querySelector("[data-about-hero-images]")).toHaveClass("max-w-[500px]");
    expect(screen.getByAltText("Students studying together in a library")).toBeVisible();
    expect(screen.getByAltText("Students working quietly in a library")).toBeVisible();
    expect(screen.getByAltText("Student studying independently with a laptop")).toBeVisible();
    expect(screen.queryByAltText("Six years in the field artwork")).not.toBeInTheDocument();
    expect(document.querySelector("[data-about-principles-grid]")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-about-principle]")).toHaveLength(6);
    expect(document.querySelector("[data-about-principles-photo]")).toBeInTheDocument();
    expect(screen.getByAltText("Students collaborating around a laptop")).toBeVisible();
    expect(screen.queryByText("Our principles")).not.toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
    expect(screen.queryByText("About Atlas")).not.toBeInTheDocument();
    expect(screen.queryByText("The team")).not.toBeInTheDocument();
    expect(screen.queryByText("By the numbers")).not.toBeInTheDocument();
    expect(screen.queryByText("Where we're going")).not.toBeInTheDocument();
    expect(screen.getByText("The free OS is the product, not the trap.")).toBeVisible();
    expect(screen.getByText("Family-business standards.")).toBeVisible();
  });

  it("covers the team, transparent numbers, vision, founder note, and CTA", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "A small team in London." }),
    ).toBeVisible();
    expect(screen.getByRole("tablist", { name: "Atlas team" })).toBeVisible();
    expect(screen.getAllByRole("tab")).toHaveLength(5);
    expect(document.querySelector("[data-about-team-gallery]")).toBeInTheDocument();
    expect(document.querySelector("[data-about-team-carousel-tail]")).toBeInTheDocument();
    expect(document.querySelector("[data-about-team-member-active]")).toHaveTextContent("Harman Hora");
    scrollIntoViewMock.mockClear();
    scrollToMock.mockClear();
    fireEvent.click(screen.getByRole("tab", { name: "Priya Anand" }));
    expect(document.querySelector("[data-about-team-member-active]")).toHaveTextContent("Priya Anand");
    expect(scrollIntoViewMock).not.toHaveBeenCalled();
    expect(scrollToMock).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
    expect(screen.queryByText("Concrete things, honestly counted.")).not.toBeInTheDocument();
    expect(document.querySelector("[data-about-proof-ledger]")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-about-number-stat]")).toHaveLength(5);
    expect(document.querySelector("[data-about-number-stat]")).toHaveStyle({ color: "#d8df3d" });
    expect(screen.getByText("14,000+")).toHaveAttribute("data-about-number-size", "compact");
    const numberCells = document.querySelectorAll("[data-about-proof-item]");
    expect(numberCells).toHaveLength(5);
    expect(document.querySelector("[data-about-proof-ledger] dl")).toHaveClass("lg:grid-cols-5");
    expect(numberCells[0]).toHaveClass("text-center");
    expect(numberCells[0]).not.toHaveClass("border");
    expect(screen.queryByText("Updated August 2026")).not.toBeInTheDocument();
    expect(screen.getByText("The default OS for going abroad.")).toBeVisible();
    expect(document.querySelector("[data-about-horizons-editorial]")).toHaveClass("lg:h-[calc(100svh-5rem)]");
    expect(document.querySelectorAll("[data-about-horizon-editorial]")).toHaveLength(3);
    expect(document.querySelectorAll("[data-about-horizon-image]")).toHaveLength(3);
    expect(document.querySelectorAll("[data-about-horizon-editorial]")[2]).not.toHaveClass("border-b");
    expect(document.querySelector("[data-about-horizon-timing]")).toHaveClass("text-white");
    expect(document.querySelector("[data-about-founder-reveal]")).toBeInTheDocument();
    expect(document.querySelector("[data-about-founder-reveal-trigger]")).toHaveAttribute(
      "data-about-founder-reveal-trigger",
      "viewport-center",
    );
    expect(document.querySelectorAll("[data-about-founder-letter]")).toHaveLength(
      "I started Atlas after watching someone close to me pay too much, get matched to the wrong course, and lose support the moment she landed. The problem was not one bad agent. The whole model rewards the wrong behaviour.”"
        .length,
    );
    expect(document.querySelector("[data-about-founder-avatar]")).toHaveClass("rounded-full");
    expect(
      document.querySelector("[data-about-founder-avatar] img"),
    ).toHaveAttribute("alt", "Placeholder portrait for Harman Hora");
    expect(
      screen.getByRole("heading", { level: 2, name: "Read enough? Try the OS." }),
    ).toBeVisible();
  });
});
