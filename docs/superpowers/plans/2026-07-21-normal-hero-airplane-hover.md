# Normal Hero Airplane Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/normal` hero's moving `abroad.` text with an accessible inline airplane SVG that flies diagonally on hover or keyboard focus and resets afterward.

**Architecture:** Keep the literal heading text in the component, overlay one decorative inline SVG without changing layout, and drive the complete interaction through named CSS classes and keyframes. Add a focused source-and-DOM regression covering the semantic text, SVG, animation hook, and reduced-motion rule.

**Tech Stack:** Next.js 15, React 19, CSS keyframes, Vitest, Testing Library

---

### Task 1: Add the accessible airplane hover interaction

**Files:**
- Create: `tests/normal-hero-airplane.test.tsx`
- Modify: `components/sections/hero.tsx:35-37`
- Modify: `app/normal/globals.css`

- [ ] **Step 1: Write the failing regression**

Create `tests/normal-hero-airplane.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import Hero from "@/components/sections/hero";

it("keeps abroad readable while exposing a decorative airplane flight", () => {
  const { container } = render(<Hero />);
  const trigger = screen.getByText("abroad.").closest("[data-airplane-flight]");

  expect(trigger).toHaveAttribute("tabindex", "0");
  expect(trigger).toHaveClass("atlas-plane-hover");
  expect(trigger?.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  expect(container.querySelector(".animate-pulse")).not.toBeInTheDocument();

  const css = readFileSync(
    resolve(process.cwd(), "app/normal/globals.css"),
    "utf8",
  );
  expect(css).toContain("@keyframes atlas-plane-flight");
  expect(css).toContain("prefers-reduced-motion: reduce");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npm test -- --run tests/normal-hero-airplane.test.tsx
```

Expected: FAIL because `[data-airplane-flight]`, the decorative SVG, and the named keyframes do not exist.

- [ ] **Step 3: Replace the current paragraph with the text and inline SVG overlay**

Replace the current `abroad.` paragraph in `components/sections/hero.tsx` with:

```tsx
<span className="atlas-plane-hover" data-airplane-flight tabIndex={0}>
  <span className="atlas-plane-hover__text">abroad.</span>
  <svg
    aria-hidden="true"
    className="atlas-plane-hover__icon"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="M22 2 9.6 14.4M22 2l-7.8 20-4.6-7.6L2 9.8 22 2Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
</span>
```

- [ ] **Step 4: Add the flight animation and reduced-motion fallback**

Append to `app/normal/globals.css`:

```css
.atlas-plane-hover {
  position: relative;
  display: inline-block;
  min-width: 6ch;
  cursor: pointer;
  vertical-align: middle;
}

.atlas-plane-hover__text {
  display: inline-block;
  transition: opacity 180ms ease, transform 180ms ease;
}

.atlas-plane-hover__icon {
  position: absolute;
  top: 50%;
  left: 0;
  width: 1.15em;
  height: 1.15em;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(0, -50%, 0) rotate(-12deg) scale(0.85);
}

.atlas-plane-hover:hover .atlas-plane-hover__text,
.atlas-plane-hover:focus-visible .atlas-plane-hover__text {
  opacity: 0;
  transform: scale(0.96);
}

.atlas-plane-hover:hover .atlas-plane-hover__icon,
.atlas-plane-hover:focus-visible .atlas-plane-hover__icon {
  animation: atlas-plane-flight 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes atlas-plane-flight {
  0% {
    opacity: 0;
    transform: translate3d(0, -50%, 0) rotate(-12deg) scale(0.85);
  }
  12% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translate3d(min(55vw, 34rem), calc(-50% - 1.5rem), 0)
      rotate(6deg) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .atlas-plane-hover__text,
  .atlas-plane-hover__icon {
    transition: none;
  }

  .atlas-plane-hover:hover .atlas-plane-hover__icon,
  .atlas-plane-hover:focus-visible .atlas-plane-hover__icon {
    animation: none;
    opacity: 1;
    transform: translate3d(0, -50%, 0);
  }
}
```

- [ ] **Step 5: Run the focused test and verify GREEN**

```bash
npm test -- --run tests/normal-hero-airplane.test.tsx
```

Expected: 1 test passes.

- [ ] **Step 6: Run verification**

```bash
npx eslint components/sections/hero.tsx tests/normal-hero-airplane.test.tsx
npm run typecheck
npm run build
```

Expected: lint and type-checking exit successfully; the production build generates all static routes.

- [ ] **Step 7: Verify interaction in the browser**

Load `/normal`, hover and keyboard-focus `abroad.`, and confirm the word is replaced by the airplane, the airplane flies diagonally right once, and leaving hover or focus restores the word. Emulate reduced motion and confirm the icon swaps in place without translation.

- [ ] **Step 8: Commit the implementation**

```bash
git add components/sections/hero.tsx app/normal/globals.css tests/normal-hero-airplane.test.tsx
git commit -m "feat: animate airplane from normal hero"
```
