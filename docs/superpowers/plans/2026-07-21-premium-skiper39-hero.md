# Premium Skiper39 Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/premium` Atlas hero using Skiper39's exact crowd-canvas design with a student-specific sprite sheet.

**Architecture:** A Server Component route imports one Atlas-specific hero component. The registry component owns client-side canvas and GSAP behavior; Atlas copy and the sprite source stay outside its animation internals wherever the registry API permits.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, GSAP, Shadcn registry, Vitest, Testing Library, Playwright with Microsoft Edge.

---

### Task 1: Define the premium route contract

**Files:**
- Create: `tests/premium.test.tsx`
- Create: `app/premium/page.tsx`
- Create: `components/premium/PremiumHero.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import PremiumPage from "@/app/premium/page";

it("renders the Atlas premium hero with a student crowd", () => {
  const { container } = render(<PremiumPage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your operating system for studying and succeeding abroad.",
  );
  expect(container.querySelector("canvas")).toHaveAttribute(
    "data-crowd-source",
    "/images/premium/student-peeps.png",
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/premium.test.tsx`

Expected: FAIL because `app/premium/page.tsx` does not exist.

- [ ] **Step 3: Install the registry component**

Run: `pnpm dlx shadcn add @skiper-ui/skiper39`

Expected: the trusted registry adds the Skiper39 component and declared dependencies without editing existing routes.

- [ ] **Step 4: Add the minimal route composition**

```tsx
// app/premium/page.tsx
import { PremiumHero } from "@/components/premium/PremiumHero";

export default function PremiumPage() {
  return <PremiumHero />;
}
```

`PremiumHero` renders the registry component with the exact Atlas content defined in the design spec and the sprite path `/images/premium/student-peeps.png`.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- tests/premium.test.tsx`

Expected: PASS.

### Task 2: Replace the generic crowd with students

**Files:**
- Create: `public/images/premium/student-peeps.png`
- Modify: registry-generated Skiper39 component only if a `src` prop is not already exposed

- [ ] **Step 1: Inspect the installed sprite dimensions and frame grid**

Run an image metadata check and verify the registry's expected `rows={15}` and `cols={7}` geometry.

- [ ] **Step 2: Generate or edit the sprite asset**

Use the installed sprite as an edit target. Preserve its canvas size, 15-by-7 frame placement, transparent/background treatment, line weight, scale, and frame-to-frame pose progression. Change only character details so the crowd reads as students.

- [ ] **Step 3: Validate the asset**

Confirm the final PNG has the same pixel dimensions as the source, is readable by the canvas, and contains visible student markers such as bags, books, and laptops.

- [ ] **Step 4: Re-run the focused test**

Run: `npm test -- tests/premium.test.tsx`

Expected: PASS.

### Task 3: Browser verification

**Files:**
- Modify: `e2e/homepages.spec.ts` only if a premium-route regression assertion is needed

- [ ] **Step 1: Run targeted static checks**

Run: `npx eslint app/premium/page.tsx components/premium components/v1/skiper39.tsx tests/premium.test.tsx`

Expected: zero lint errors.

- [ ] **Step 2: Launch the development server**

Run: `npm run dev -- --port 3003`

Expected: `/premium` returns HTTP 200.

- [ ] **Step 3: Verify in Microsoft Edge**

Check 1440×1000 and 390×844 viewports. Assert the H1 and CTAs are visible, the canvas exists, the student sprite is loaded, the canvas animates, there is no horizontal overflow, and no page or console errors occur.

- [ ] **Step 4: Run the final focused test**

Run: `npm test -- tests/premium.test.tsx`

Expected: PASS with zero failures.
