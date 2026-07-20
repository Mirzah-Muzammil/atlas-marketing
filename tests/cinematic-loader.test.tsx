import { act, render, screen } from "@testing-library/react";

import { CinematicLoader } from "@/components/motion/CinematicLoader";

const loaderMocks = vi.hoisted(() => ({
  complete: null as null | (() => void),
  failSetup: false,
  kill: vi.fn(),
  targets: [] as unknown[],
}));

vi.mock("@/hooks/useFirstRouteVisit", () => ({
  useFirstRouteVisit: () => "full",
}));

vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => false,
}));

vi.mock("@/hooks/useGsapContext", async () => {
  const { useLayoutEffect, useRef } = await import("react");

  return {
    useGsapContext: (
      _scope: unknown,
      setup: (tools: { gsap: { timeline: (options: { onComplete: () => void }) => unknown }; ScrollTrigger: object }) => void | (() => void),
    ) => {
      const setupRef = useRef(setup);
      setupRef.current = setup;
      useLayoutEffect(() => {
        if (loaderMocks.failSetup) return;

        const timeline = {
          fromTo(target: unknown) {
            loaderMocks.targets.push(target);
            return timeline;
          },
          kill: loaderMocks.kill,
          set() {
            return timeline;
          },
          to() {
            return timeline;
          },
        };
        const teardown = setupRef.current({
          gsap: {
            timeline: ({ onComplete }) => {
              loaderMocks.complete = onComplete;
              return timeline;
            },
          },
          ScrollTrigger: {},
        });

        return teardown;
      }, []);
    },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  loaderMocks.complete = null;
  loaderMocks.failSetup = false;
  loaderMocks.targets = [];
});

it("dismisses the loader when its timeline completes normally", () => {
  render(<CinematicLoader route="horizon" />);
  expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-loader-state", "active");

  act(() => loaderMocks.complete?.());

  expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-loader-state", "hidden");
});

it("stays fail open when animation setup is unavailable", () => {
  loaderMocks.failSetup = true;
  render(<CinematicLoader route="horizon" />);

  expect(screen.getByTestId("cinematic-loader")).toHaveAttribute("data-loader-state", "hidden");
  expect(screen.getByTestId("cinematic-loader")).toHaveClass("invisible");
});

it("kills the cinematic timeline during cleanup", () => {
  const view = render(<CinematicLoader route="horizon" />);

  view.unmount();

  expect(loaderMocks.kill).toHaveBeenCalledOnce();
});

it("animates every Horizon transition line and safely skips an empty Orbit target", () => {
  const horizon = render(<CinematicLoader route="horizon" />);
  const horizonLines = loaderMocks.targets[1];

  expect(horizonLines).toHaveLength(2);

  horizon.unmount();
  loaderMocks.targets = [];
  render(<CinematicLoader route="orbit" />);

  expect(loaderMocks.targets).toHaveLength(1);
});
