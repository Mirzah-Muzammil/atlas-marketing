import { fireEvent, render, screen } from "@testing-library/react";

import { LandingExperience } from "@/components/landing/LandingExperience";

const motionPreference = vi.hoisted(() => ({ reduced: false }));

vi.mock("@/hooks/useGsapContext", () => ({ useGsapContext: vi.fn() }));
vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => motionPreference.reduced,
}));

describe("Atlas Field Guide landing page", () => {
  it("renders the complete Atlas journey and primary conversion", () => {
    render(<LandingExperience />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /your operating system for studying and succeeding abroad/i,
      }),
    ).toBeVisible();
    expect(screen.getAllByRole("link", { name: /get started/i })[0]).toHaveAttribute(
      "href",
      "mailto:hello@atlas.study?subject=Atlas%20early%20access",
    );
    expect(screen.getByRole("heading", { name: /plan & apply/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /arrive & settle/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /build & thrive/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /a real product/i })).toBeVisible();
    expect(
      screen.getByRole("heading", { name: /one person\. every moving part\./i }),
    ).toBeVisible();
    expect(screen.getByText(/14,000\+ students and alumni/i)).toBeVisible();
    expect(screen.getByText("£1,500", { exact: true })).toBeVisible();
    expect(screen.getByText(/one-time · end to end/i)).toBeVisible();
  });

  it("uses native disclosures for the honest answers", () => {
    const { container } = render(<LandingExperience />);

    expect(container.querySelectorAll("details")).toHaveLength(5);
    expect(screen.getByText("Is it really free?", { exact: true })).toBeVisible();
    expect(screen.getByText("What's the catch?", { exact: true })).toBeVisible();
  });

  it("renders Concierge as personal correspondence rather than a product panel", () => {
    const { container } = render(<LandingExperience />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /one person\. every moving part\./i,
      }),
    ).toBeVisible();
    expect(screen.getByText(/dear komal/i)).toBeVisible();
    expect(screen.getByText(/i keep the whole move in view/i)).toBeVisible();
    expect(screen.getByText("Anika Mehta", { exact: true })).toBeVisible();
    expect(container.querySelectorAll(".land-concierge__dossier li")).toHaveLength(4);
    expect(screen.getByRole("link", { name: /meet concierge/i })).toHaveAttribute(
      "href",
      "mailto:hello@atlas.study?subject=Atlas%20Concierge",
    );
    expect(container.querySelector(".land-concierge__panel")).not.toBeInTheDocument();
  });

  it("updates the Essentials detail from an accessible selector", () => {
    render(<LandingExperience />);

    fireEvent.click(screen.getByRole("button", { name: /explore housing/i }));

    expect(screen.getByRole("heading", { name: "Housing", level: 3 })).toBeVisible();
    expect(screen.getByText(/avoid the scams/i)).toBeVisible();
  });

  it("keeps touch stable and locks mouse previews after deliberate selection", () => {
    render(<LandingExperience />);
    const housing = screen.getByRole("button", { name: /explore housing/i });
    const forex = screen.getByRole("button", { name: /explore forex/i });

    fireEvent.pointerEnter(housing, { pointerType: "touch" });
    expect(screen.getByRole("heading", { name: "SIM & eSIM", level: 3 })).toBeVisible();

    fireEvent.pointerEnter(housing, { pointerType: "mouse" });
    expect(screen.getByRole("heading", { name: "Housing", level: 3 })).toBeVisible();

    fireEvent.focus(housing);
    fireEvent.pointerEnter(forex, { pointerType: "mouse" });
    expect(screen.getByRole("heading", { name: "Housing", level: 3 })).toBeVisible();
  });

  it("reveals the constellation after typing ATLAS outside a form control", () => {
    render(<LandingExperience />);

    for (const key of "ATLAS") fireEvent.keyDown(window, { key });

    expect(screen.getByRole("status")).toHaveTextContent("You found the long way home.");
  });

  it("adds and removes a departure stamp", () => {
    render(<LandingExperience />);

    fireEvent.click(screen.getByRole("button", { name: /coordinates/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Cleared for departure");

    fireEvent.click(screen.getByRole("button", { name: /dismiss departure stamp/i }));
    expect(screen.queryByText(/cleared for departure/i)).not.toBeInTheDocument();
  });

  it("marks the experience as static when reduced motion is requested", () => {
    motionPreference.reduced = true;

    const { container } = render(<LandingExperience />);

    expect(container.querySelector("[data-motion='reduced']")).toBeInTheDocument();
    motionPreference.reduced = false;
  });
});
