import { render, screen, waitFor } from "@testing-library/react";

import { RouteExperience } from "@/components/common/RouteExperience";
import { RouteTransitionLine } from "@/components/motion/RouteTransitionLine";
import { Reveal } from "@/components/motion/Reveal";

beforeEach(() => {
  sessionStorage.clear();
});

it("keeps reveal content present before animation initializes", () => {
  render(<Reveal><p>Always readable</p></Reveal>);
  expect(screen.getByText("Always readable")).toBeVisible();
});

it("keeps route content readable beneath the cinematic loader", () => {
  render(<RouteExperience route="horizon"><main>Route content</main></RouteExperience>);

  expect(screen.getByText("Route content")).toBeVisible();
  expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("aria-hidden", "true");
});

it("uses a full introduction once per route and a short one afterward", async () => {
  const firstVisit = render(<RouteExperience route="orbit"><main>First visit</main></RouteExperience>);

  await waitFor(() => expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-intro-mode", "full"));
  expect(sessionStorage.getItem("atlas:intro:orbit")).toBe("seen");

  firstVisit.unmount();
  render(<RouteExperience route="orbit"><main>Return visit</main></RouteExperience>);

  await waitFor(() => expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-intro-mode", "short"));
});

it("exits immediately without hiding content when reduced motion is preferred", async () => {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }));

  render(<RouteExperience route="dispatch"><main>Reduced motion content</main></RouteExperience>);

  expect(screen.getByText("Reduced motion content")).toBeVisible();
  await waitFor(() => expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-loader-state", "hidden"));
});

it("renders the route transition line as decorative markup", () => {
  const { container } = render(<RouteTransitionLine className="test-line" />);

  expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  expect(container.firstChild).toHaveClass("test-line");
});
