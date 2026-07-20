import { render } from "@testing-library/react";

import Providers from "@/components/providers";

vi.mock("aos", () => ({
  default: { init: vi.fn() },
}));

it("starts the normal page at the top instead of restoring skipped scroll", () => {
  Object.defineProperty(window.history, "scrollRestoration", {
    configurable: true,
    value: "auto",
    writable: true,
  });
  const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

  const { unmount } = render(
    <Providers>
      <div>Normal page</div>
    </Providers>,
  );

  expect(window.history.scrollRestoration).toBe("manual");
  expect(scrollTo).toHaveBeenCalledWith({ behavior: "instant", left: 0, top: 0 });

  unmount();
  expect(window.history.scrollRestoration).toBe("auto");
});
