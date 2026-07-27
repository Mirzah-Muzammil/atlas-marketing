import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const threeMocks = vi.hoisted(() => ({
  add: vi.fn(),
  cancelFrame: vi.fn(),
  geometryDispose: vi.fn(),
  materialDispose: vi.fn(),
  render: vi.fn(),
  rendererDispose: vi.fn(),
  requestFrame: vi.fn(() => 17),
  setPixelRatio: vi.fn(),
  setSize: vi.fn(),
}));

vi.mock("three", () => ({
  Camera: class Camera {
    position = { z: 0 };
  },
  Scene: class Scene {
    add = threeMocks.add;
  },
  PlaneGeometry: class PlaneGeometry {
    dispose = threeMocks.geometryDispose;
  },
  Vector2: class Vector2 {
    x = 0;
    y = 0;
  },
  ShaderMaterial: class ShaderMaterial {
    dispose = threeMocks.materialDispose;
  },
  Mesh: class Mesh {},
  WebGLRenderer: class WebGLRenderer {
    domElement = document.createElement("canvas");
    dispose = threeMocks.rendererDispose;
    render = threeMocks.render;
    setPixelRatio = threeMocks.setPixelRatio;
    setSize = threeMocks.setSize;
  },
}));

import { ShaderAnimation } from "@/components/landing-3/ShaderAnimation";

describe("ShaderAnimation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 3,
    });
    vi.stubGlobal("requestAnimationFrame", threeMocks.requestFrame);
    vi.stubGlobal("cancelAnimationFrame", threeMocks.cancelFrame);
  });

  it("caps pixel density, animates, and releases WebGL resources", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    const { container, unmount } = render(<ShaderAnimation />);

    expect(container.querySelector("canvas")).not.toBeNull();
    expect(threeMocks.setPixelRatio).toHaveBeenCalledWith(2);
    expect(threeMocks.setSize).toHaveBeenCalled();
    expect(threeMocks.requestFrame).toHaveBeenCalledTimes(1);

    unmount();
    expect(threeMocks.cancelFrame).toHaveBeenCalledWith(17);
    expect(threeMocks.rendererDispose).toHaveBeenCalledOnce();
    expect(threeMocks.geometryDispose).toHaveBeenCalledOnce();
    expect(threeMocks.materialDispose).toHaveBeenCalledOnce();
  });

  it("renders one static frame when reduced motion is requested", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    render(<ShaderAnimation />);

    expect(threeMocks.render).toHaveBeenCalledOnce();
    expect(threeMocks.requestFrame).not.toHaveBeenCalled();
  });
});
