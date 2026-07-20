import { fireEvent, render, screen } from "@testing-library/react";

import { HorizonHero } from "@/components/home/horizon/HorizonHero";
import { JourneyStory } from "@/components/home/horizon/JourneyStory";

type MotionTools = { gsap: Record<string, unknown>; ScrollTrigger: Record<string, unknown> };
type MotionSetup = (tools: MotionTools) => void | (() => void);

let capturedSetup: MotionSetup | undefined;

vi.mock("@/hooks/useGsapContext", () => ({
  useGsapContext: (_scope: unknown, setup: MotionSetup) => {
    capturedSetup = setup;
  },
}));

vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => false,
}));

function timelineStub() {
  const timeline = {
    labels: {} as Record<string, number>,
    addLabel: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
    tweenTo: vi.fn((target?: unknown, vars?: Record<string, unknown>) => {
      void target;
      void vars;
      return { kill: vi.fn() };
    }),
    time: vi.fn(),
    kill: vi.fn(),
  };
  timeline.addLabel.mockImplementation((label: string) => {
    timeline.labels[label] = label === "handoff-end" ? 2 : 1;
    return timeline;
  });
  timeline.fromTo.mockImplementation(() => timeline);
  timeline.to.mockImplementation(() => timeline);
  return timeline;
}

function applySet(targets: unknown, vars: Record<string, unknown>) {
  const elements = targets instanceof Element ? [targets] : Array.from(targets as ArrayLike<Element>);
  elements.forEach((element) => {
    if (typeof vars.autoAlpha === "number") {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = String(vars.autoAlpha);
      htmlElement.style.visibility = vars.autoAlpha === 0 ? "hidden" : "inherit";
    }
  });
}

beforeEach(() => {
  capturedSetup = undefined;
  vi.restoreAllMocks();
});

it("shows only the first semantic journey article when desktop motion initializes", () => {
  render(<JourneyStory />);
  const timeline = timelineStub();
  const media = { add: vi.fn((_query: string, setup: () => void) => setup()), revert: vi.fn() };
  const stage = screen.getByTestId("journey-stage");

  capturedSetup?.({
    gsap: {
      matchMedia: () => media,
      set: applySet,
      timeline: () => timeline,
      utils: { toArray: (selector: string, scope: Element) => Array.from(scope.querySelectorAll(selector)) },
    },
    ScrollTrigger: {},
  });

  const articles = Array.from(stage.querySelectorAll<HTMLElement>("[data-journey-article]"));
  expect(articles[0]).toHaveStyle({ opacity: "1" });
  expect(articles[0]).not.toHaveStyle({ visibility: "hidden" });
  articles.slice(1).forEach((article) => expect(article).toHaveStyle({ opacity: "0", visibility: "hidden" }));
});

it("does not create a hero timeline when the GSAP media guard rejects motion", () => {
  render(<HorizonHero />);
  const timeline = vi.fn(() => timelineStub());
  const media = { add: vi.fn(), revert: vi.fn() };

  const cleanup = capturedSetup?.({
    gsap: { matchMedia: () => media, timeline },
    ScrollTrigger: { create: vi.fn() },
  });

  expect(media.add).toHaveBeenCalledWith("(prefers-reduced-motion: no-preference)", expect.any(Function));
  expect(timeline).not.toHaveBeenCalled();
  expect(cleanup).toBeTypeOf("function");
  if (typeof cleanup === "function") cleanup();
  expect(media.revert).toHaveBeenCalledOnce();
});

it("smooths hero handoff progress with a replaceable master playhead tween", () => {
  render(<HorizonHero />);
  const master = timelineStub();
  const entranceTween = { kill: vi.fn() };
  const firstSmoothingTween = { kill: vi.fn() };
  const secondSmoothingTween = { kill: vi.fn() };
  const smoothingTweens = [firstSmoothingTween, secondSmoothingTween];
  let entranceComplete: (() => void) | undefined;
  let mediaCleanup: void | (() => void);
  master.tweenTo.mockImplementation((target?: unknown, vars?: Record<string, unknown>) => {
    if (target === "entrance-end") {
      entranceComplete = vars?.onComplete as (() => void) | undefined;
      return entranceTween;
    }
    return smoothingTweens.shift() ?? { kill: vi.fn() };
  });
  const create = vi.fn((config?: unknown) => {
    void config;
    return { kill: vi.fn() };
  });
  const media = {
    add: vi.fn((_query: string, setup: () => void | (() => void)) => {
      mediaCleanup = setup();
    }),
    revert: vi.fn(() => mediaCleanup?.()),
  };

  const cleanup = capturedSetup?.({
    gsap: { matchMedia: () => media, timeline: () => master },
    ScrollTrigger: { create },
  });
  entranceComplete?.();
  const trigger = create.mock.calls[0]?.[0] as unknown as { scrub?: number; onUpdate: (state: { progress: number }) => void };
  expect(trigger.scrub).toBeUndefined();

  trigger.onUpdate({ progress: 0.5 });
  trigger.onUpdate({ progress: 0.75 });
  expect(master.tweenTo).toHaveBeenCalledWith(1.5, { duration: 0.18, ease: "power1.out" });
  expect(firstSmoothingTween.kill).toHaveBeenCalledOnce();

  if (typeof cleanup === "function") cleanup();
  expect(entranceTween.kill).toHaveBeenCalledOnce();
  expect(secondSmoothingTween.kill).toHaveBeenCalledOnce();
});

it("scopes pointer tracking to the hero and cancels its pending animation frame", () => {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }));
  const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 37);
  const cancelFrame = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  const view = render(<HorizonHero />);
  const hero = screen.getByTestId("horizon-hero-depth");

  fireEvent.pointerMove(window, { clientX: 100, clientY: 100 });
  expect(requestFrame).not.toHaveBeenCalled();
  fireEvent.pointerMove(hero, { clientX: 200, clientY: 200 });
  fireEvent.pointerMove(hero, { clientX: 300, clientY: 300 });
  expect(requestFrame).toHaveBeenCalledOnce();

  view.unmount();
  expect(cancelFrame).toHaveBeenCalledWith(37);
});
