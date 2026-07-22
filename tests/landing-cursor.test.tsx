import { fireEvent, render } from "@testing-library/react";

import { LandingExperience } from "@/components/landing/LandingExperience";

vi.mock("@/hooks/useGsapContext", () => ({ useGsapContext: vi.fn() }));
vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => false,
}));

afterEach(() => {
  vi.restoreAllMocks();
});

it("runs the elastic ribbon cursor across the fine-pointer landing page", () => {
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
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
  } as unknown as CanvasRenderingContext2D);
  const frames = new Map<number, FrameRequestCallback>();
  let frameId = 72;
  const requestFrame = vi
    .spyOn(window, "requestAnimationFrame")
    .mockImplementation((callback) => {
      frameId += 1;
      frames.set(frameId, callback);
      return frameId;
    });
  const cancelFrame = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

  const view = render(<LandingExperience />);
  const landing = view.container.querySelector<HTMLElement>(".landing-page");
  const hero = view.container.querySelector<HTMLElement>(".land-hero");
  const concierge = view.container.querySelector<HTMLElement>(".land-concierge");
  const canvas = view.container.querySelector<HTMLCanvasElement>(".land-ribbon-cursor");

  expect(landing).toHaveAttribute("data-ribbon-cursor", "ready");
  expect(hero).not.toHaveAttribute("data-ribbon-cursor");
  fireEvent.pointerMove(landing!, { clientX: 180, clientY: 120, pointerType: "touch" });
  expect(canvas).not.toHaveAttribute("data-active");
  expect(requestFrame).not.toHaveBeenCalled();

  fireEvent.pointerMove(landing!, { clientX: 240, clientY: 180, pointerType: "mouse" });
  expect(canvas).toHaveAttribute("data-active", "true");
  expect(requestFrame).toHaveBeenCalledTimes(1);

  const initialFrame = frames.get(73);
  expect(initialFrame).toBeDefined();
  frames.delete(73);
  initialFrame!(0);
  expect(requestFrame).toHaveBeenCalledTimes(1);

  fireEvent.pointerMove(concierge!, { clientX: 320, clientY: 220, pointerType: "mouse" });
  expect(requestFrame).toHaveBeenCalledTimes(2);

  view.unmount();
  expect(cancelFrame).toHaveBeenCalledWith(74);
  expect(landing).not.toHaveAttribute("data-ribbon-cursor");
});
