import { act, render, screen, waitFor } from "@testing-library/react";
import { useRef } from "react";

import { RouteExperience } from "@/components/common/RouteExperience";
import { RouteTransitionLine } from "@/components/motion/RouteTransitionLine";
import { Reveal } from "@/components/motion/Reveal";
import { useGsapContext } from "@/hooks/useGsapContext";

vi.mock("@/components/motion/LenisProvider", () => ({
  LenisProvider: ({ children }: { children: React.ReactNode }) => children,
}));

beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
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

it("defaults to a fail-open non-occluding loader before client setup", () => {
  render(<RouteExperience route="horizon"><main>Fail-open content</main></RouteExperience>);

  const loader = screen.getByTestId("cinematic-loader");
  expect(loader).toHaveAttribute("data-loader-state", "hidden");
  expect(loader).toHaveClass("invisible");
  expect(screen.getByText("Fail-open content")).toBeVisible();
});

it("safely dismisses a cinematic timeline that does not complete", async () => {
  const nativeSetTimeout = globalThis.setTimeout;
  let safetyDismissal: TimerHandler | undefined;
  vi.spyOn(globalThis, "setTimeout").mockImplementation(((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
    if (timeout === 4_000) {
      safetyDismissal = handler;
      return 73;
    }
    return nativeSetTimeout(handler, timeout, ...args);
  }) as typeof setTimeout);

  render(<RouteExperience route="horizon"><main>Timeline content</main></RouteExperience>);

  await waitFor(() => expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-loader-state", "active"));
  expect(safetyDismissal).toBeTypeOf("function");

  act(() => {
    if (typeof safetyDismissal === "function") safetyDismissal();
  });

  expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-loader-state", "hidden");
  expect(screen.getByText("Timeline content")).toBeVisible();
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

function GsapHarness({ teardown }: { teardown: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  useGsapContext(root, () => teardown, []);
  return <div ref={root} />;
}

it("schedules ScrollTrigger refresh and cancels it during cleanup", async () => {
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  const refresh = vi.spyOn(ScrollTrigger, "refresh").mockImplementation(() => undefined);
  let nextFrame = 0;
  const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => {
    nextFrame += 1;
    return nextFrame;
  });
  const cancelFrame = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  const teardown = vi.fn();
  const view = render(<GsapHarness teardown={teardown} />);

  await waitFor(() => expect(requestFrame).toHaveBeenCalled());
  expect(refresh).not.toHaveBeenCalled();
  view.unmount();

  const cancelledFrame = cancelFrame.mock.calls[0]?.[0];
  expect(requestFrame.mock.results.map(({ value }) => value)).toContain(cancelledFrame);
  expect(teardown).toHaveBeenCalledOnce();
});
