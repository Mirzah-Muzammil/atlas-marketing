import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import PremiumPage from "@/app/premium/page";

it("renders the Atlas premium hero with a student crowd", () => {
  const getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(null);
  const { container } = render(<PremiumPage />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent(
    "Your operating system for studying and succeeding abroad.",
  );
  expect(heading).not.toHaveClass("sr-only");
  expect(
    screen.getByText("studying and succeeding abroad."),
  ).toHaveClass("text-[#f97316]");
  expect(container.querySelector("canvas")).toHaveAttribute(
    "data-crowd-source",
    "/images/premium/student-peeps.png",
  );
  expect(container.querySelector("canvas")).toHaveAttribute(
    "data-crowd-size",
    "105",
  );
  expect(container.querySelector("canvas")).toHaveClass(
    "absolute",
    "bottom-0",
    "h-[90vh]",
    "w-full",
  );

  getContext.mockRestore();
});
