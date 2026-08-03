import { render, screen } from "@testing-library/react";

import AuroraBackground from "@/components/ui/aurora-background";

describe("AuroraBackground", () => {
  it("renders an Atlas-colored aurora and a deterministic star field", () => {
    render(
      <AuroraBackground
        className="hero-aurora"
        gradientColors={["rgba(243,90,2,0.20)", "rgba(255,163,75,0.16)"]}
        pulseDuration={8}
        starCount={6}
      >
        <p>Atlas hero content</p>
      </AuroraBackground>,
    );

    const aurora = screen.getByTestId("aurora-background");

    expect(aurora).toHaveClass("hero-aurora");
    expect(aurora).toHaveStyle({ "--aurora-duration": "8s" });
    expect(aurora).toHaveStyle({ "--aurora-color-1": "rgba(243,90,2,0.20)" });
    expect(aurora).toHaveStyle({ "--aurora-color-2": "rgba(255,163,75,0.16)" });
    const stars = screen.getAllByTestId("aurora-star");

    expect(stars).toHaveLength(6);
    expect(stars.some((star) => star.dataset.auroraStarTier === "bright")).toBe(
      true,
    );
    expect(stars.some((star) => star.dataset.auroraStarTier === "ambient")).toBe(
      true,
    );
    expect(screen.getByText("Atlas hero content")).toBeVisible();
  });
});
