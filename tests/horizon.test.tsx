import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

it("presents Atlas as the complete study-abroad operating system", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/whole study.abroad journey/i);
  expect(screen.getAllByRole("link", { name: /get started free/i }).length).toBeGreaterThan(0);
  expect(screen.getByText("Apply")).toBeInTheDocument();
  expect(screen.getByText("Thrive")).toBeInTheDocument();
});
