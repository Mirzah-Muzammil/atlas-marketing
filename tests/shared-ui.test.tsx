import { render, screen } from "@testing-library/react";

import { SiteFooter } from "@/components/footer/SiteFooter";
import { ButtonLink } from "@/components/ui/ButtonLink";

it("renders the primary conversion link", () => {
  render(<ButtonLink href="/get-started">Get started free</ButtonLink>);

  expect(screen.getByRole("link", { name: "Get started free" })).toHaveAttribute(
    "href",
    "/get-started",
  );
});

it("exposes product and concierge paths in the footer", () => {
  render(<SiteFooter tone="light" />);

  expect(screen.getByRole("link", { name: "How Atlas works" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Talk to Concierge" })).toBeInTheDocument();
});
