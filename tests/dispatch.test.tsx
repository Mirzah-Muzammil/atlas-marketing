import { render, screen } from "@testing-library/react";

import EditorialPage from "@/app/editorial/page";

it("uses numbered editorial dispatches to explain the journey", () => {
  render(<EditorialPage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/one journey/i);
  expect(screen.getByText("Dispatch 01")).toBeInTheDocument();
  expect(screen.getByText("Dispatch 05")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /talk to concierge/i })).toBeInTheDocument();
});
