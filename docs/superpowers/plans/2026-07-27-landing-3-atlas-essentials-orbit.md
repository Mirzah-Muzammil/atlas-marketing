# Landing 3 Atlas Essentials Orbit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dark Atlas adaptation of Rainbow's scroll-driven circular “all the chains” section after the Landing 3 services carousel.

**Architecture:** A focused client component owns the sticky stage and computes normalized section scroll progress inside a requestAnimationFrame loop. It writes progress-derived transforms directly to the orbit and tile elements, while the existing Landing 3 page only imports and renders the component.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide icons, Vitest/Testing Library, Playwright.

## Global Constraints

- The outer section is `240svh` on desktop and `190svh` below 810px.
- The sticky stage is `100svh`.
- Desktop uses an 854px visual field and a 520px rotating group.
- Scroll rotates the orbit from 90 degrees to 0 degrees and scales it from 0.78 to 1.
- Below 810px, use a 700px-tall full-width field, a 360px orbit group, 68px tiles, and a left-aligned headline.
- Use Atlas content only: University, Visa, Funding, Housing, Banking, Travel, Insurance, and Community.
- Keep the existing `#050506` dark theme and do not add dependencies.
- Respect `prefers-reduced-motion` by rendering the completed state without scroll listeners.
- Preserve all unrelated Landing 2 and Premium workspace changes.

---

### Task 1: Define the Atlas essentials section contract

**Files:**
- Modify: `tests/landing-3.test.tsx`
- Test: `tests/landing-3.test.tsx`

**Interfaces:**
- Consumes: `Landing3Page` from `app/landing-3/page.tsx`
- Produces: observable heading, eight essential labels, `[data-landing-3-essentials]`, `[data-essentials-stage]`, and `[data-essentials-orbit]`

- [ ] **Step 1: Write the failing component test**

```tsx
it("presents Atlas essentials in a Rainbow-inspired orbit", () => {
  const { container } = render(<Landing3Page />);
  expect(screen.getByRole("heading", {
    level: 2,
    name: "All the essentials that matter in one place",
  })).toBeVisible();
  for (const label of ["University", "Visa", "Funding", "Housing", "Banking", "Travel", "Insurance", "Community"]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
  expect(container.querySelector("[data-landing-3-essentials]")).not.toBeNull();
  expect(container.querySelector("[data-essentials-stage]")).not.toBeNull();
  expect(container.querySelector("[data-essentials-orbit]")).toHaveAttribute("aria-hidden", "true");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: FAIL because the heading and section do not exist.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/landing-3.test.tsx
git commit -m "test: define landing 3 essentials orbit"
```

---

### Task 2: Implement the scroll-driven orbit

**Files:**
- Create: `components/landing-3/Landing3EssentialsOrbit.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`
- Test: `tests/landing-3.test.tsx`

**Interfaces:**
- Consumes: React `useEffect`, `useRef`; Lucide icon components
- Produces: `export function Landing3EssentialsOrbit(): JSX.Element`

- [ ] **Step 1: Create the component data and semantic structure**

```tsx
const essentials = [
  { label: "University", Icon: GraduationCap, tone: "#8b7cff" },
  { label: "Visa", Icon: Stamp, tone: "#58c7ff" },
  { label: "Funding", Icon: BadgeDollarSign, tone: "#75e0a7" },
  { label: "Housing", Icon: House, tone: "#ffb86b" },
  { label: "Banking", Icon: Landmark, tone: "#f488ff" },
  { label: "Travel", Icon: Plane, tone: "#70d7e8" },
  { label: "Insurance", Icon: ShieldCheck, tone: "#ff7d91" },
  { label: "Community", Icon: Users, tone: "#f4d35e" },
];
```

Render a `240svh` section, a `100svh` sticky stage, the semantic heading, a screen-reader-only list, and a decorative 854px field containing two orbit rings and eight absolutely positioned tiles.

- [ ] **Step 2: Add scroll-progress behavior**

```tsx
const update = () => {
  const rect = section.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / travel));
  const eased = 1 - Math.pow(1 - progress, 3);
  orbit.style.transform = `translate(-50%, -50%) rotate(${90 * (1 - eased)}deg) scale(${0.78 + 0.22 * eased})`;
};
```

Schedule updates with one requestAnimationFrame per scroll/resize event. For reduced motion, apply the completed transform immediately and return without binding listeners. Counter-rotate each tile using the same CSS custom property so labels remain upright.

- [ ] **Step 3: Render the component after services**

```tsx
import { Landing3EssentialsOrbit } from "@/components/landing-3/Landing3EssentialsOrbit";

// after <Landing3ServicesSection />
<Landing3EssentialsOrbit />
```

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `npm test -- tests/landing-3.test.tsx`

Expected: all Landing 3 component tests PASS.

- [ ] **Step 5: Commit the implementation**

```bash
git add components/landing-3/Landing3EssentialsOrbit.tsx components/landing-3/Landing3Hero.tsx
git commit -m "feat: add landing 3 essentials orbit"
```

---

### Task 3: Protect responsive layout and scroll motion

**Files:**
- Modify: `e2e/landing-3.spec.ts`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: data attributes from `Landing3EssentialsOrbit`
- Produces: runtime checks for section order, geometry, transform response, mobile sizing, and overflow

- [ ] **Step 1: Write the failing browser contract before adjusting implementation**

```ts
test("scrubs the Atlas essentials orbit after services", async ({ page }) => {
  await page.goto("/landing-3");
  const services = page.locator("[data-landing-3-services]");
  const essentials = page.locator("[data-landing-3-essentials]");
  const stage = essentials.locator("[data-essentials-stage]");
  const orbit = essentials.locator("[data-essentials-orbit]");
  const [servicesBox, essentialsBox] = await Promise.all([services.boundingBox(), essentials.boundingBox()]);
  expect(essentialsBox!.y).toBeGreaterThanOrEqual(servicesBox!.y + servicesBox!.height - 1);
  expect(await stage.evaluate(el => getComputedStyle(el).position)).toBe("sticky");
  const before = await orbit.evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(y => window.scrollTo(0, y), essentialsBox!.y + essentialsBox!.height * 0.6);
  await expect.poll(() => orbit.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
});
```

- [ ] **Step 2: Run the focused Edge test and verify failures identify any motion/layout gap**

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --grep "scrubs the Atlas essentials orbit"`

Expected: FAIL if the runtime motion or geometry does not yet satisfy the contract.

- [ ] **Step 3: Make the minimum component adjustments required by the browser contract**

Adjust only orbit sizing, sticky offsets, and progress mapping in `Landing3EssentialsOrbit.tsx`; do not modify existing sections.

- [ ] **Step 4: Run full focused verification**

Run:

```bash
npm test -- tests/landing-3.test.tsx tests/landing-3-shader.test.tsx
npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge
npm run typecheck
npx eslint components/landing-3/Landing3EssentialsOrbit.tsx components/landing-3/Landing3Hero.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts
git diff --check
```

Expected: all focused checks PASS with no horizontal overflow.

- [ ] **Step 5: Commit browser coverage and final adjustments**

```bash
git add e2e/landing-3.spec.ts components/landing-3/Landing3EssentialsOrbit.tsx
git commit -m "test: verify landing 3 essentials scroll motion"
```
