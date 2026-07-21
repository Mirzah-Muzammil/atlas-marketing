import { fireEvent, render, screen } from "@testing-library/react";

import Modules from "@/components/sections/modules";
import { normalModules } from "@/constants/normal-page-data";

it("presents every Atlas product in a white expand-on-hover gallery", () => {
  const { container } = render(<Modules modules={normalModules} />);

  expect(container.querySelector("#modules")).toHaveClass("bg-white");
  expect(container.querySelector("[data-product-expand-gallery]")).toBeInTheDocument();
  expect(container.querySelector("[data-product-track]")).toHaveClass(
    "sm:justify-center",
    "[scrollbar-width:none]",
  );
  expect(container.querySelectorAll("[data-product-panel]")).toHaveLength(
    normalModules.length,
  );

  normalModules.forEach((product) => {
    expect(screen.getByRole("heading", { name: product.name })).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });
});

it("expands the product a student points to or focuses", () => {
  const { container } = render(<Modules modules={normalModules} />);
  const panels = container.querySelectorAll<HTMLElement>("[data-product-panel]");

  expect(panels[0]).toHaveAttribute("data-active", "true");
  expect(panels[1]).toHaveAttribute("data-active", "false");

  fireEvent.focus(panels[1]);

  expect(panels[0]).toHaveAttribute("data-active", "false");
  expect(panels[1]).toHaveAttribute("data-active", "true");
});
