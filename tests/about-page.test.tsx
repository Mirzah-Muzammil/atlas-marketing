import { render, screen } from "@testing-library/react";

import { AboutWhyReveal } from "@/components/about/AboutWhyReveal";

describe("About page", () => {
  it("renders source-informed Why copy as word-level scroll text", () => {
    render(<AboutWhyReveal />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "The industry treats this as a sales opportunity. We don't.",
      }),
    ).toBeVisible();
    expect(
      screen.getAllByText(/For most international students, studying abroad/),
    ).toHaveLength(2);
    expect(document.querySelector("[data-about-why-reveal]")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-about-why-word]").length).toBeGreaterThan(20);
  });
});
