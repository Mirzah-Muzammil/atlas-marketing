import { render, screen, within } from "@testing-library/react";
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
    expect(within(stage).getByRole("heading", { name: title })).toBeVisible();
    expect(within(stage).getByText(description)).toBeVisible();
    expect(within(stage).getByText(promise)).toBeVisible();
  });
});

it("keeps all four product decisions and reassurances readable in one scene", () => {
  render(<HomePage />);

  const scene = screen.getByTestId("product-proof-scene");
  const states = scene.querySelectorAll("[data-product-state]");
  expect(states).toHaveLength(4);
  ["Shortlist", "Visa preparation", "Money plan", "Arrival plan"].forEach((label) => {
    expect(screen.getByRole("heading", { name: label })).toBeVisible();
  });
  states.forEach((state) => {
    expect(state.querySelector("[data-product-decision]")).toBeVisible();
    expect(state.querySelector("[data-product-reassurance]")).toBeVisible();
  });
  expect(scene.querySelector("[data-product-route-entry]")).toBeInTheDocument();
});

it("presents one contextual essential with four supporting route signals", () => {
  render(<HomePage />);

  const essentials = screen.getByTestId("contextual-essentials");
  expect(essentials.querySelectorAll("[data-essential-service]")).toHaveLength(5);
  expect(essentials.querySelectorAll("[data-essential-active]")).toHaveLength(1);
  ["Visa guidance", "Money planning", "Housing", "Travel", "University admin"].forEach((name) => {
    expect(screen.getByRole("heading", { name })).toBeVisible();
  });
});

it("keeps premium human guidance distinct from the free Atlas path", () => {
  render(<HomePage />);

  expect(screen.getByText(/submit the bank statement after the updated offer letter/i)).toBeVisible();
  expect(screen.getAllByRole("link", { name: /talk to concierge/i }).some((link) => link.getAttribute("href") === "#get-started")).toBe(true);
  const closingCta = screen.getByTestId("horizon-closing-cta");
  expect(screen.getAllByRole("link", { name: /get started free/i }).at(-1)).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
  expect(closingCta.querySelector("form")).toBeInTheDocument();
});

it("renders exactly three focusable resource tear sheets", () => {
  render(<HomePage />);

  const resources = screen.getByTestId("resource-tear-sheets");
  const links = resources.querySelectorAll("a[href]");
  expect(links).toHaveLength(3);
  links.forEach((link) => expect(link).toHaveAttribute("href", "#get-started"));
});
