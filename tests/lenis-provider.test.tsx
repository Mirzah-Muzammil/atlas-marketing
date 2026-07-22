import { act, render, screen, waitFor } from "@testing-library/react";

import { LenisProvider } from "@/components/motion/LenisProvider";

const mocks = vi.hoisted(() => ({
  cancelAnimationFrame: vi.fn(),
  construct: vi.fn(),
  destroy: vi.fn(),
  off: vi.fn(),
  on: vi.fn(),
  raf: vi.fn(),
  refresh: vi.fn(),
  registerPlugin: vi.fn(),
  requestAnimationFrame: vi.fn(),
  reducedMotion: false,
  update: vi.fn(),
}));

vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => mocks.reducedMotion,
}));

vi.mock("lenis", () => ({
  default: class LenisMock {
    constructor(options: unknown) {
      mocks.construct(options);
    }

    destroy = mocks.destroy;
    off = mocks.off;
    on = mocks.on;
    raf = mocks.raf;
  },
}));

vi.mock("gsap", () => ({
  gsap: { registerPlugin: mocks.registerPlugin },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    refresh: mocks.refresh,
    update: mocks.update,
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.reducedMotion = false;
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    mocks.requestAnimationFrame(callback);
    return 41;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation((frame) => {
    mocks.cancelAnimationFrame(frame);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("synchronizes configured Lenis scrolling with ScrollTrigger and cleans up", async () => {
  const view = render(
    <LenisProvider
      duration={1.25}
      wheelMultiplier={0.85}
      syncScrollTrigger
    >
      <main>Premium content</main>
    </LenisProvider>,
  );

  expect(screen.getByText("Premium content")).toBeVisible();
  await waitFor(() => {
    expect(mocks.construct).toHaveBeenCalledWith({
      duration: 1.25,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
    });
  });
  expect(mocks.registerPlugin).toHaveBeenCalledOnce();
  expect(mocks.on).toHaveBeenCalledWith("scroll", mocks.update);
  expect(mocks.refresh).toHaveBeenCalledOnce();
  expect(mocks.requestAnimationFrame).toHaveBeenCalled();

  view.unmount();

  expect(mocks.off).toHaveBeenCalledWith("scroll", mocks.update);
  expect(mocks.cancelAnimationFrame).toHaveBeenCalledWith(41);
  expect(mocks.destroy).toHaveBeenCalledOnce();
});

it("does not initialize Lenis when reduced motion is preferred", async () => {
  mocks.reducedMotion = true;

  render(
    <LenisProvider syncScrollTrigger>
      <main>Reduced motion content</main>
    </LenisProvider>,
  );

  await act(async () => Promise.resolve());

  expect(screen.getByText("Reduced motion content")).toBeVisible();
  expect(mocks.construct).not.toHaveBeenCalled();
  expect(mocks.requestAnimationFrame).not.toHaveBeenCalled();
});
