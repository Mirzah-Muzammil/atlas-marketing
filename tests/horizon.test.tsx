import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import HomePage from "@/app/page";
import { journeyStages } from "@/constants/content";

it("uses one master GSAP timeline for the Horizon hero choreography", () => {
  const source = readFileSync(resolve(process.cwd(), "components/home/horizon/HorizonHeroMotion.tsx"), "utf8");
  expect(source.match(/gsap\.timeline\(/g)).toHaveLength(1);
});

it("presents Atlas as the complete study-abroad operating system", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/whole study.abroad journey/i);
  expect(screen.getAllByRole("link", { name: /get started free/i }).length).toBeGreaterThan(0);
  expect(screen.getByText("Apply")).toBeInTheDocument();
  expect(screen.getByText("Thrive")).toBeInTheDocument();
});

it("marks the Horizon hero as a layered depth scene with a journey handoff", () => {
  render(<HomePage />);

  const hero = screen.getByTestId("horizon-hero-depth");
  expect(hero.querySelectorAll("[data-depth]")).toHaveLength(3);
  expect(hero.querySelector('[data-depth="back"]')).toBeInTheDocument();
  expect(hero.querySelector('[data-depth="mid"]')).toBeInTheDocument();
  expect(hero.querySelector('[data-depth="front"]')).toBeInTheDocument();
  expect(hero.querySelector("[data-route-line-handoff]")).toBeInTheDocument();
});

it("keeps every journey stage semantic and readable before animation initializes", () => {
  render(<HomePage />);

  const stage = screen.getByTestId("journey-stage");
  const articles = stage.querySelectorAll("article[data-journey-article]");
  expect(articles).toHaveLength(journeyStages.length);
  expect(Array.from(articles, (article) => article.getAttribute("data-progress-range"))).toEqual(["1", "2", "3", "4", "5"]);

  journeyStages.forEach(({ title, description, promise }) => {
    expect(screen.getByRole("heading", { name: title })).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByText(promise)).toBeVisible();
  });
});
