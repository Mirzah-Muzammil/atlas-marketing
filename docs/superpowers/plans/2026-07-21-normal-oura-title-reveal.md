# Normal Page Oura-Style Title Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Oura-inspired blur-to-focus reveals to every title rendered on `/normal` without replacing existing AOS animations on cards and component wrappers.

**Architecture:** A focused client component owns heading semantics and one-time viewport detection. Shared CSS owns the visual transition and reduced-motion fallback; section files opt in by replacing raw heading elements with the component while leaving their AOS containers unchanged.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS, Intersection Observer, Vitest, Testing Library

---

## File structure

- Create `components/common/AnimatedTitle.tsx`: semantic heading wrapper and one-time viewport reveal state.
- Modify `app/normal/globals.css`: Oura-style blur/fade transition and reduced-motion behavior.
- Modify `components/sections/hero.tsx`: semantic animated hero `h1`.
- Modify `components/sections/modules.tsx`: animated section and module titles.
- Modify `components/sections/features.tsx`: animated section and card titles.
- Modify `components/sections/industries.tsx`: animated section, service, and empty-state titles.
- Modify `components/sections/cta-banner.tsx`: animated CTA title.
- Modify `components/sections/faqs.tsx`: animated FAQ section and empty-state titles.
- Modify `components/sections/footer.tsx`: animated footer title labels.
- Create `tests/normal-title-animation.test.tsx`: component behavior and page-title coverage.

### Task 1: Specify the title animation contract

**Files:**
- Create: `tests/normal-title-animation.test.tsx`

- [ ] **Step 1: Write the failing component test**

```tsx
import { act, render, screen } from "@testing-library/react";
import AnimatedTitle from "@/components/common/AnimatedTitle";

it("reveals a semantic title when it enters the viewport", () => {
  let callback: IntersectionObserverCallback = () => undefined;
  class Observer {
    constructor(next: IntersectionObserverCallback) { callback = next; }
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() { return []; }
    root = null;
    rootMargin = "0px";
    thresholds = [0];
  }
  vi.stubGlobal("IntersectionObserver", Observer);
  render(<AnimatedTitle as="h3">A card title</AnimatedTitle>);
  const title = screen.getByRole("heading", { level: 3 });
  expect(title).toHaveAttribute("data-title-reveal", "pending");
  act(() => callback([{ isIntersecting: true, target: title } as IntersectionObserverEntry], {} as IntersectionObserver));
  expect(title).toHaveAttribute("data-title-reveal", "visible");
});
```

- [ ] **Step 2: Add source-coverage assertions**

Read the seven rendered section files and assert that each imports and renders `AnimatedTitle`; assert the files still contain their existing `data-aos` attributes where applicable. Read `app/normal/globals.css` and assert it contains the reveal selector, `filter: blur`, the 1.3-second transition, and the reduced-motion media query.

- [ ] **Step 3: Run the focused test and verify RED**

Run: `npm test -- tests/normal-title-animation.test.tsx`

Expected: FAIL because `components/common/AnimatedTitle.tsx` does not exist.

### Task 2: Build the reusable reveal primitive

**Files:**
- Create: `components/common/AnimatedTitle.tsx`
- Modify: `app/normal/globals.css`

- [ ] **Step 1: Implement the semantic observer component**

```tsx
"use client";

import { type ComponentPropsWithoutRef, type ElementType, useEffect, useRef, useState } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4";
type AnimatedTitleProps<T extends HeadingTag> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export default function AnimatedTitle<T extends HeadingTag = "h2">({
  as,
  className = "",
  ...props
}: AnimatedTitleProps<T>) {
  const Tag = (as ?? "h2") as ElementType;
  const titleRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return <Tag ref={titleRef} className={`atlas-title-reveal ${className}`} data-title-reveal={visible ? "visible" : "pending"} {...props} />;
}
```

- [ ] **Step 2: Add the Oura-style CSS**

```css
.atlas-title-reveal {
  opacity: 0.22;
  filter: blur(12px);
  transform: translateZ(0);
  transition: opacity 1.3s cubic-bezier(0.22, 1, 0.36, 1),
    filter 1.3s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, filter;
}

.atlas-title-reveal[data-title-reveal="visible"] {
  opacity: 1;
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .atlas-title-reveal {
    opacity: 1;
    filter: none;
    transition: none;
  }
}
```

- [ ] **Step 3: Run the focused test**

Run: `npm test -- tests/normal-title-animation.test.tsx`

Expected: the component behavior passes; source-coverage assertions still fail until title sites are migrated.

### Task 3: Migrate every `/normal` title

**Files:**
- Modify: `components/sections/hero.tsx`
- Modify: `components/sections/modules.tsx`
- Modify: `components/sections/features.tsx`
- Modify: `components/sections/industries.tsx`
- Modify: `components/sections/cta-banner.tsx`
- Modify: `components/sections/faqs.tsx`
- Modify: `components/sections/footer.tsx`

- [ ] **Step 1: Import the title component in every section**

Add:

```tsx
import AnimatedTitle from "@/components/common/AnimatedTitle";
```

- [ ] **Step 2: Replace content headings without changing their classes or parent AOS attributes**

Replace every raw `h2`, `h3`, and footer `h4` in the listed files with `AnimatedTitle as="h2"`, `AnimatedTitle as="h3"`, or `AnimatedTitle as="h4"`. Convert the hero title container to `AnimatedTitle as="h1"` and replace its nested paragraph blocks with block-level spans so the heading markup remains valid.

- [ ] **Step 3: Run the focused tests and verify GREEN**

Run: `npm test -- tests/normal-title-animation.test.tsx tests/normal-hero-airplane.test.tsx`

Expected: both test files pass.

- [ ] **Step 4: Run static and production verification**

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0; pre-existing lint warnings may still be reported.

- [ ] **Step 5: Review the final diff**

Run: `git diff --check && git diff --stat && git status --short`

Expected: no whitespace errors; only the planned title-animation files and tests are changed.
