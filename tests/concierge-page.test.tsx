import { render, screen, within } from "@testing-library/react";

import ConciergePage from "@/app/concierge/page";

describe("Concierge page", () => {
  it("pairs the Concierge promise with an animated three-step route", () => {
    const { container } = render(<ConciergePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Your move, in expert hands.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Hand any step to a dedicated Atlas specialist: visa, application, or arrival. A fixed fee, agreed before any work begins.",
      ),
    ).toBeVisible();
    expect(screen.queryByRole("link", { name: /services & pricing/i })).toBeNull();

    const route = container.querySelector("[data-concierge-route]");
    expect(route).toBeVisible();
    expect(route?.querySelector("[data-concierge-car]")).not.toBeNull();
    expect(route?.querySelector("[data-concierge-walker]")).toBeNull();

    for (const step of [
      "Choose a task",
      "Agree your fixed quote",
      "Review and approve",
    ]) {
      expect(screen.getByText(step)).toBeVisible();
    }
  });

  it("presents Concierge tasks in the three-card fixed-quote pricing layout", () => {
    const { container } = render(<ConciergePage />);

    const pricing = container.querySelector("[data-concierge-pricing]");
    expect(pricing).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "One task. One price. Done." }),
    ).toBeVisible();
    expect(pricing?.querySelectorAll("[data-concierge-pricing-card]")).toHaveLength(3);
    expect(pricing?.querySelectorAll("[data-concierge-pricing-glare]")).toHaveLength(0);
    expect(
      screen.getByRole("heading", { level: 2, name: "One task. One price. Done." }),
    ).toHaveClass("atlas-homepage-title-3d");

    for (const service of [
      "Visa application",
      "Application review",
      "Arrival setup",
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: service })).toBeVisible();
    }

    expect(
      within(pricing as HTMLElement).getAllByRole("link", { name: "Get my quote" }),
    ).toHaveLength(3);
    expect(
      [...(pricing?.querySelectorAll("p") ?? [])].filter(
        (element) => element.textContent === "Fixed quote",
      ),
    ).toHaveLength(3);
  });

  it("pairs Concierge support assurances with a live student support conversation", () => {
    const { container } = render(<ConciergePage />);

    const specialists = container.querySelector("[data-concierge-specialists]");
    expect(specialists).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Who handles your case." }),
    ).toBeVisible();

    for (const assurance of [
      "Dedicated specialist",
      "UK expertise",
      "Secure documents inside Atlas",
    ]) {
      expect(screen.getByText(assurance)).toBeVisible();
    }

    expect(
      specialists?.querySelector("[data-concierge-chat-demo]"),
    ).not.toBeNull();
    expect(screen.getByText("My CAS arrived and I fly in six weeks.")).toBeVisible();
  });

  it("compares Atlas Concierge with a traditional agent using the homepage slider", () => {
    const { container } = render(<ConciergePage />);

    const comparison = container.querySelector(
      "[data-concierge-agent-comparison]",
    );
    expect(comparison).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Not another agent." }),
    ).toBeVisible();
    expect(comparison).toHaveTextContent(
      "Agents work on commission from universities. Concierge works for you. That difference shows up everywhere.",
    );
    expect(
      comparison?.querySelectorAll("[data-atlas-homepage-title-reveal]"),
    ).toHaveLength(2);
    expect(
      within(comparison as HTMLElement).queryByText(
        "Drag to compare Concierge with the traditional route.",
      ),
    ).toBeNull();
    const comparisonContent = within(comparison as HTMLElement);
    expect(comparisonContent.getByText("Atlas Concierge")).toBeVisible();
    expect(comparisonContent.getByText("Traditional agent")).toBeVisible();
    expect(comparisonContent.getByText("Fixed fee, agreed upfront.")).toBeVisible();
    expect(comparisonContent.getByText("Commissions you never see.")).toBeVisible();
  });

  it("ends with the Concierge question rail and a single quote CTA", () => {
    const { container } = render(<ConciergePage />);

    const faq = container.querySelector("[data-concierge-faq]");
    expect(faq).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Frequently Asked Questions" }),
    ).toBeVisible();
    expect(within(faq as HTMLElement).getByText("What does it cost?")).toBeVisible();
    expect(
      faq?.querySelectorAll(".concierge-faq-card-active"),
    ).toHaveLength(1);
    expect(
      faq?.querySelectorAll(".concierge-faq-card-inactive"),
    ).toHaveLength(5);
    expect(faq?.querySelector("[data-concierge-faq-rail]")).toBeVisible();

    const cta = container.querySelector("[data-concierge-final-cta]");
    expect(cta).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Start with your hardest step." }),
    ).toBeVisible();
    expect(within(cta as HTMLElement).getByRole("link", { name: "Get my quote" })).toBeVisible();
    expect(within(cta as HTMLElement).queryByRole("link", { name: /demo/i })).toBeNull();
  expect(
    within(cta as HTMLElement).getByText(
      /The fastest, most thoughtful support throughout my move\./,
    ),
  ).toBeVisible();
    expect(within(cta as HTMLElement).getByText("Sofia Chen")).toBeVisible();
    expect(cta?.querySelectorAll("[data-concierge-review-star]")).toHaveLength(5);
    expect(within(cta as HTMLElement).queryByText("Before work begins")).toBeNull();
  });
});
