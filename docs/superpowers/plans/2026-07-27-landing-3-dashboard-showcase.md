# Landing 3 Dashboard Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive Raycast-inspired dashboard showcase below the `/landing-3` hero, presenting `/images/crm.png` inside a CSS-built MacBook frame.

**Architecture:** A new server component owns the showcase heading, replaceable media slot, and decorative device frame. The existing Landing 3 component composes it after the hero, preserving the shader component and route metadata unchanged.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, `next/image`, Vitest, Testing Library, Playwright with Microsoft Edge

## Global Constraints

- Add only the dashboard showcase directly below the existing Landing 3 hero.
- Use the exact lines “Take shortcuts, not detours.” and “One interface, everything you need.”
- Use `/images/crm.png` with intrinsic dimensions `1144` by `575` and meaningful alternative text.
- Keep the media slot replaceable by a future video without changing the MacBook frame.
- Add no dependencies, global styles, interactive dashboard behavior, or later Raycast sections.
- Preserve existing premium-page working-tree changes and all current Landing 3 behavior.

---

### Task 1: Tested Dashboard Showcase Component

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Create: `components/landing-3/Landing3DashboardShowcase.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`

**Interfaces:**
- Consumes: static `/images/crm.png` and `next/image`.
- Produces: `Landing3DashboardShowcase(): JSX.Element` with `id="platform"`, `data-landing-3-showcase`, `data-macbook-frame`, `data-macbook-screen`, and `data-macbook-base` markers.

- [ ] **Step 1: Add the failing component test**

Append to `tests/landing-3.test.tsx`:

```tsx
it("presents the Atlas dashboard inside a replaceable MacBook media frame", () => {
  const { container } = render(<Landing3Page />);

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Take shortcuts, not detours. One interface, everything you need.",
    }),
  ).toBeVisible();
  expect(
    screen.getByAltText(
      "Atlas dashboard showing a student’s application journey, next steps, and services.",
    ),
  ).toHaveAttribute("src", expect.stringContaining("/images/crm.png"));
  expect(container.querySelector("[data-landing-3-showcase]")).not.toBeNull();
  expect(container.querySelector("[data-macbook-frame]")).not.toBeNull();
  expect(container.querySelector("[data-macbook-screen]")).not.toBeNull();
  expect(container.querySelector("[data-macbook-base]")).not.toBeNull();
});
```

- [ ] **Step 2: Run the test and verify the red state**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: FAIL because the level-two showcase heading and MacBook frame do not exist.

- [ ] **Step 3: Create the minimal showcase component**

Create `components/landing-3/Landing3DashboardShowcase.tsx`:

```tsx
import Image from "next/image";

const dashboardAlt =
  "Atlas dashboard showing a student’s application journey, next steps, and services.";

export function Landing3DashboardShowcase() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] px-5 pb-28 pt-24 text-white sm:px-8 sm:pb-40 sm:pt-32 lg:pb-52 lg:pt-40"
      data-landing-3-showcase
      id="platform"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] top-[32%] h-[45%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(78,73,255,.24),rgba(117,47,180,.08)_44%,transparent_72%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1240px]">
        <h2 className="mx-auto max-w-6xl text-balance text-center text-[clamp(2.8rem,6.8vw,6.7rem)] font-semibold leading-[.93] tracking-[-.065em]">
          <span className="block text-white/48">Take shortcuts, not detours.</span>
          <span className="block text-white">One interface, everything you need.</span>
        </h2>

        <div className="relative mx-auto mt-16 max-w-[1160px] [perspective:1800px] sm:mt-24">
          <div
            className="relative origin-bottom [transform:rotateX(1.5deg)]"
            data-macbook-frame
          >
            <div
              className="relative rounded-[1.15rem] border border-white/16 bg-[linear-gradient(145deg,#383b42,#0b0c10_18%,#111319_82%,#3c3f46)] p-[clamp(.28rem,.65vw,.62rem)] shadow-[0_70px_140px_-50px_rgba(0,0,0,.95),0_0_80px_rgba(93,72,255,.12)] sm:rounded-[1.7rem]"
              data-macbook-screen
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-10 h-2.5 w-16 -translate-x-1/2 rounded-b-xl bg-[#08090c] sm:h-4 sm:w-28"
              />
              <div className="overflow-hidden rounded-[.72rem] bg-[#0b0c10] sm:rounded-[1.15rem]">
                <Image
                  alt={dashboardAlt}
                  className="block h-auto w-full"
                  height={575}
                  priority
                  sizes="(max-width: 1280px) calc(100vw - 40px), 1160px"
                  src="/images/crm.png"
                  width={1144}
                />
              </div>
            </div>

            <div aria-hidden="true" className="relative mx-auto" data-macbook-base>
              <div className="mx-auto h-[clamp(.65rem,1.35vw,1.15rem)] w-[106%] -translate-x-[2.8%] rounded-b-[45%] border-t border-white/20 bg-[linear-gradient(180deg,#9da0a6_0%,#555960_18%,#22252a_58%,#0b0c0e_100%)] shadow-[0_18px_30px_-18px_rgba(0,0,0,.9)] [clip-path:polygon(1.6%_0,98.4%_0,100%_100%,0_100%)]" />
              <div className="mx-auto h-1.5 w-[14%] -translate-y-full rounded-b-full bg-black/45" />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mx-auto mt-7 h-20 w-[82%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(80,69,145,.2),rgba(0,0,0,.3)_48%,transparent_72%)] blur-xl"
          />
        </div>
      </div>
    </section>
  );
}
```

Modify `components/landing-3/Landing3Hero.tsx` to import `Landing3DashboardShowcase` and render `<Landing3DashboardShowcase />` immediately after the closing tag of the existing hero `<section>` and before the closing `</main>`.

- [ ] **Step 4: Run component tests and type checking**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx`

Expected: PASS with `5` Landing 3 tests.

Run: `npm run typecheck`

Expected: exit code `0`.

- [ ] **Step 5: Commit the showcase component**

```bash
git add components/landing-3/Landing3DashboardShowcase.tsx components/landing-3/Landing3Hero.tsx tests/landing-3.test.tsx docs/superpowers/plans/2026-07-27-landing-3-dashboard-showcase.md
git commit -m "feat: add landing 3 dashboard showcase"
```

---

### Task 2: Edge Browser Coverage and Visual Verification

**Files:**
- Modify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: the completed `/landing-3` route.
- Produces: desktop and mobile assertions for showcase order, visibility, media, and overflow.

- [ ] **Step 1: Add route-level showcase assertions**

Append inside the existing `test.describe` block in `e2e/landing-3.spec.ts`:

```ts
test("places the dashboard showcase after the hero without overflow", async ({ page }) => {
  await page.goto("/landing-3");

  const showcase = page.locator("[data-landing-3-showcase]");
  const hero = page.locator("main > section").first();
  await expect(showcase).toBeVisible();
  await expect(showcase.getByRole("heading", { level: 2 })).toHaveText(
    "Take shortcuts, not detours.One interface, everything you need.",
  );
  await expect(showcase.getByRole("img")).toBeVisible();

  const [heroBox, showcaseBox] = await Promise.all([
    hero.boundingBox(),
    showcase.boundingBox(),
  ]);
  expect(heroBox).not.toBeNull();
  expect(showcaseBox).not.toBeNull();
  expect(showcaseBox!.y).toBeGreaterThanOrEqual(heroBox!.y + heroBox!.height - 1);

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflows).toBe(false);
});
```

- [ ] **Step 2: Build and run the Edge tests**

Run: `npm run build`

Expected: the `/landing-3` static route builds successfully.

Run: `npx playwright test e2e/landing-3.spec.ts`

Expected: `6` tests pass across the desktop and mobile Edge projects.

- [ ] **Step 3: Capture desktop and mobile screenshots**

Start the local production server on port `3210`, then run:

```bash
npx playwright screenshot --channel msedge --viewport-size "1440,1000" --full-page --wait-for-timeout 1200 http://127.0.0.1:3210/landing-3 /tmp/atlas-landing-3-showcase-desktop.png
npx playwright screenshot --channel msedge --viewport-size "390,844" --full-page --wait-for-timeout 1200 http://127.0.0.1:3210/landing-3 /tmp/atlas-landing-3-showcase-mobile.png
```

Inspect both images for the approved two-line hierarchy, centered MacBook proportions, uncropped dashboard, restrained glow, clean device base, and no horizontal clipping.

- [ ] **Step 4: Run final focused verification**

Run: `npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx`

Run: `npm run typecheck`

Run: `npm run lint`

Run: `npm run build`

Run: `npx playwright test e2e/landing-3.spec.ts`

Expected: all commands exit with code `0`; known unrelated full-suite failures remain outside this focused verification.

- [ ] **Step 5: Commit browser coverage**

```bash
git add e2e/landing-3.spec.ts
git commit -m "test: verify landing 3 dashboard showcase"
```
