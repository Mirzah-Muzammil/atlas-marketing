import { render, screen } from "@testing-library/react";

import OrbitPage from "@/app/orbit/page";

it("keeps the spatial journey understandable without WebGL", () => {
  render(<OrbitPage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/map the whole journey/i);
  expect(screen.getByText("Visa")).toBeInTheDocument();
  expect(screen.getByText("Housing")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /get started free/i })).toBeInTheDocument();
});
