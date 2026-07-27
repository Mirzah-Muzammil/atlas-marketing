# Landing 3 Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive Raycast-inspired Atlas navigation and hero at `/landing-3` using the supplied Three.js shader.

**Architecture:** A server route supplies metadata and renders a focused hero component. The hero owns semantic content and Tailwind styling, while a separate client component owns the WebGL lifecycle so the rest of the route remains server-rendered and usable when WebGL is unavailable.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, Three.js 0.180, Vitest, Testing Library, Playwright

## Global Constraints

- Create only the route shell, navigation, and hero section for `/landing-3`.
- Preserve all existing Atlas routes and the user's unrelated working-tree changes.
- Use Atlas content with Raycast-inspired layout, color, typography, controls, and spacing.
- Use the supplied GLSL shader as the primary hero artwork.
- Add no dependencies and no new abstraction beyond the three focused production files.
- The hero must retain readable content when WebGL fails and respect reduced-motion preferences.

---

### Task 1: Route and Semantic Hero

**Files:**
- Create: `tests/landing-3.test.tsx`
- Create: `components/landing-3/Landing3Hero.tsx`
- Create: `app/landing-3/page.tsx`

**Interfaces:**
- Consumes: `AtlasLogo({ className?, href?, markOnly? })` from `components/ui/AtlasLogo.tsx` and `primaryNavigation: NavItem[]` from `constants/navigation.ts`.
- Produces: `Landing3Hero(): JSX.Element` and the default `/landing-3` page component.

- [ ] **Step 1: Write the failing route test**

```tsx
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/components/landing-3/ShaderAnimation", () => ({
  ShaderAnimation: () => <div data-testid="landing-3-shader" />,
}));

import Landing3Page from "@/app/landing-3/page";

it("renders Atlas content in the Raycast-inspired hero hierarchy", () => {
  render(<Landing3Page />);

  expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your operating system for studying and succeeding abroad.",
  );
  expect(screen.getByText(/Apply with clarity\. Land prepared\./)).toBeVisible();
  expect(screen.getByRole("link", { name: "Get started — free" })).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20early%20access",
  );
  expect(screen.getByRole("link", { name: "Explore the platform" })).toHaveAttribute(
    "href",
    "#platform",
  );
  expect(screen.getByTestId("landing-3-shader")).toBeInTheDocument();
});

it("keeps desktop navigation links available and marks the visual decorative", () => {
  const { container } = render(<Landing3Page />);

  expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute("href", "#journey");
  expect(screen.getByRole("link", { name: "Essentials" })).toHaveAttribute("href", "#essentials");
  expect(container.querySelector('[aria-hidden="true"][data-landing-3-visual]')).not.toBeNull();
});
```

- [ ] **Step 2: Run the route test and verify it fails**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: FAIL because `app/landing-3/page.tsx` and its components do not exist.

- [ ] **Step 3: Implement the route and hero markup**

Create `app/landing-3/page.tsx` with route metadata and `<Landing3Hero />`. Create `Landing3Hero.tsx` with:

```tsx
import type { Metadata } from "next";

import { Landing3Hero } from "@/components/landing-3/Landing3Hero";

export const metadata: Metadata = {
  title: "Atlas — Your operating system for studying abroad",
  description:
    "Apply with clarity, land prepared, and build your life abroad with Atlas.",
};

export default function Landing3Page() {
  return <Landing3Hero />;
}
```

Create `components/landing-3/Landing3Hero.tsx` with:

```tsx
import { ArrowRight, ChevronDown } from "lucide-react";
import { primaryNavigation } from "@/constants/navigation";
import { AtlasLogo } from "@/components/ui/AtlasLogo";
import { ShaderAnimation } from "./ShaderAnimation";

const getStartedHref = "mailto:hello@atlas.study?subject=Atlas%20early%20access";

export function Landing3Hero() {
  return (
    <main id="main-content" className="min-h-screen bg-[#050506] text-white">
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#050506]">
        <div aria-hidden="true" data-landing-3-visual className="absolute inset-0">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.58)_0%,rgba(5,5,6,.16)_48%,rgba(5,5,6,.76)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,5,6,.12)_48%,rgba(5,5,6,.9)_100%)]" />
        </div>

        <header className="relative z-20 mx-auto w-full max-w-[1180px] px-5 pt-5 sm:px-8">
          <nav aria-label="Primary navigation" className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 backdrop-blur-xl sm:px-4">
            <AtlasLogo className="text-white" href="/landing-3" />
            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNavigation.map((item) => (
                <li key={item.label}><a className="rounded-lg px-3 py-2 text-sm text-white/64 transition hover:bg-white/6 hover:text-white" href={item.href}>{item.label}</a></li>
              ))}
            </ul>
            <a className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/12 bg-white px-3.5 text-sm font-medium text-black transition hover:bg-white/88" href={getStartedHref}>Get started <ArrowRight className="size-3.5" /></a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1180px] flex-col items-center justify-center px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[.22em] text-white/52">Study abroad, without the chaos</p>
          <h1 className="max-w-5xl text-balance text-[clamp(3.25rem,7.4vw,7.25rem)] font-semibold leading-[.91] tracking-[-.07em]">Your operating system for studying and succeeding abroad.</h1>
          <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-white/62 sm:text-lg">Apply with clarity. Land prepared. Build your life abroad—with every essential service and the right people in one place.</p>
          <div className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:bg-white/88" href={getStartedHref}>Get started — free <ArrowRight className="size-4" /></a>
            <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/6 px-5 text-sm font-medium text-white transition hover:bg-white/10" href="#platform">Explore the platform <ChevronDown className="size-4" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the route test and verify it passes**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: PASS for both semantic hero tests.

- [ ] **Step 5: Commit the semantic hero**

```bash
git add app/landing-3/page.tsx components/landing-3/Landing3Hero.tsx tests/landing-3.test.tsx
git commit -m "feat: add landing 3 hero structure"
```

---

### Task 2: Shader Lifecycle and Reduced Motion

**Files:**
- Create: `tests/landing-3-shader.test.tsx`
- Create: `components/landing-3/ShaderAnimation.tsx`

**Interfaces:**
- Consumes: no props; reads its container dimensions and `window.devicePixelRatio`.
- Produces: `ShaderAnimation(): JSX.Element`, rendering a fallback-backed decorative container with a Three.js canvas after mount.

- [ ] **Step 1: Add a failing shader lifecycle test**

Create `tests/landing-3-shader.test.tsx`:

```tsx
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
  Camera: class Camera { position = { z: 0 }; },
  Scene: class Scene { add = threeMocks.add; },
  PlaneGeometry: class PlaneGeometry { dispose = threeMocks.geometryDispose; },
  Vector2: class Vector2 { x = 0; y = 0; },
  ShaderMaterial: class ShaderMaterial { dispose = threeMocks.materialDispose; },
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
    Object.defineProperty(window, "devicePixelRatio", { configurable: true, value: 3 });
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
```

- [ ] **Step 2: Run the shader test and verify it fails**

Run: `npm test -- tests/landing-3-shader.test.tsx`

Expected: FAIL because `ShaderAnimation.tsx` does not exist.

- [ ] **Step 3: Implement the supplied shader with guarded cleanup**

Create `components/landing-3/ShaderAnimation.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `;

    let frameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;

    try {
      const camera = new THREE.Camera();
      camera.position.z = 1;
      const scene = new THREE.Scene();
      geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        time: { value: 1 },
        resolution: { value: new THREE.Vector2() },
      };
      material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
      scene.add(new THREE.Mesh(geometry, material));
      renderer = new THREE.WebGLRenderer({ antialias: true });
      const activeRenderer = renderer;
      const activeGeometry = geometry;
      const activeMaterial = material;
      activeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      activeRenderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(activeRenderer.domElement);

      const resize = () => {
        activeRenderer.setSize(container.clientWidth, container.clientHeight);
        uniforms.resolution.value.x = activeRenderer.domElement.width;
        uniforms.resolution.value.y = activeRenderer.domElement.height;
      };
      resize();
      window.addEventListener("resize", resize);

      const renderFrame = () => activeRenderer.render(scene, camera);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        renderFrame();
      } else {
        const animate = () => {
          uniforms.time.value += 0.05;
          renderFrame();
          frameId = requestAnimationFrame(animate);
        };
        animate();
      }

      return () => {
        window.removeEventListener("resize", resize);
        if (frameId) cancelAnimationFrame(frameId);
        if (activeRenderer.domElement.parentNode === container) container.removeChild(activeRenderer.domElement);
        activeRenderer.dispose();
        activeGeometry.dispose();
        activeMaterial.dispose();
      };
    } catch {
      renderer?.dispose();
      geometry?.dispose();
      material?.dispose();
      return;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="landing-3-shader"
      className="h-full w-full bg-[radial-gradient(circle_at_50%_45%,#3f1a73_0%,#12091e_46%,#050506_76%)]"
    />
  );
}
```

- [ ] **Step 4: Run tests and type checking**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx && npm run typecheck`

Expected: all landing-3 tests PASS and TypeScript exits with code 0.

- [ ] **Step 5: Commit the shader**

```bash
git add components/landing-3/ShaderAnimation.tsx tests/landing-3-shader.test.tsx
git commit -m "feat: add landing 3 shader animation"
```

---

### Task 3: Route-Level Verification and Visual Polish

**Files:**
- Create: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: the completed `/landing-3` route.
- Produces: automated desktop/mobile overflow and visibility coverage.

- [ ] **Step 1: Write the failing browser test**

```ts
import { expect, test } from "@playwright/test";

test.describe("landing 3 hero", () => {
  test("fills the desktop viewport and keeps primary content visible", async ({ page }) => {
    await page.goto("/landing-3");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get started — free" })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(1);
    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflows).toBe(false);
  });

  test("stacks actions and avoids horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/landing-3");
    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflows).toBe(false);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore the platform" })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the browser test**

Run: `npx playwright test e2e/landing-3.spec.ts`

Expected: PASS with one shader canvas, visible hero actions, and no horizontal overflow.

- [ ] **Step 3: Inspect desktop and mobile screenshots**

Run the local app and capture `/landing-3` at `1440x900` and `390x844`. Confirm Raycast-like hierarchy, near-black palette, centered headline, legible shader contrast, clean navigation, no clipping, and stacked mobile actions. If an objective defect appears, add a focused assertion to `e2e/landing-3.spec.ts`, observe it fail, apply the smallest Tailwind-class correction in `Landing3Hero.tsx`, and rerun the browser test.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx && npm run typecheck && npm run lint && npm run build && npx playwright test e2e/landing-3.spec.ts`

Expected: every command exits with code 0.

- [ ] **Step 5: Commit verification coverage and final polish**

```bash
git add e2e/landing-3.spec.ts
git commit -m "test: verify landing 3 hero"
```
