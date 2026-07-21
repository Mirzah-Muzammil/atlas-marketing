import { render, screen } from "@testing-library/react";

import CtaBanner from "@/components/sections/cta-banner";

it("uses a compact journey-focused CTA instead of the oversized plan phone", () => {
  const { container } = render(<CtaBanner />);

  expect(container.querySelector("[data-normal-cta]"))
    .toHaveAttribute("data-normal-cta", "departure");
  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Built to help you get out, and stay out.",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Free to start. Three minutes to set up. No card. No tier upgrades. Just the OS.",
    ),
  ).toBeInTheDocument();

  expect(screen.getByText("Get started")).toHaveAttribute(
    "for",
    "demo-modal-toggle",
  );
  expect(
    screen.getByRole("img", {
      name: "International student ready to depart for university abroad",
    }),
  ).toHaveAttribute("src", expect.stringContaining("cta-student-cutout-v3.png"));

  expect(container.querySelector("[data-cta-artwork]"))
    .toHaveClass("md:h-[26rem]");
  expect(container.querySelector("[data-cta-cutout]"))
    .toBeInTheDocument();
  expect(container.innerHTML).not.toContain("cta-departure-v2.jpg");
  expect(container.innerHTML).not.toContain("subscription-phone-hand.png");
});
