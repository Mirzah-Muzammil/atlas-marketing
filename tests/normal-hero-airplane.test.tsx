import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import Hero from "@/components/sections/hero";

it("keeps abroad readable while exposing a decorative airplane flight", () => {
  const { container } = render(<Hero />);
  const trigger = screen.getByText("abroad.").closest("[data-airplane-flight]");

  expect(trigger).toHaveAttribute("tabindex", "0");
  expect(trigger).toHaveClass("atlas-plane-hover");
  expect(trigger?.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  expect(container.querySelector(".animate-pulse")).not.toBeInTheDocument();

  const css = readFileSync(
    resolve(process.cwd(), "app/normal/globals.css"),
    "utf8",
  );
  expect(css).toContain("@keyframes atlas-plane-flight");
  expect(css).toContain("prefers-reduced-motion: reduce");
});
