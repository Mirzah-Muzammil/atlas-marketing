# Premium Knowledge Scroll Accordion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Match the original centered, rounded Skiper53 accordion on a white Knowledge section and restore the centered two-phone Concierge composition while preserving the simplified Concierge copy.

**Architecture:** Keep the installed Skiper53 primitive controlled by the existing scroll wrapper, but restore its original 24rem open height, 2.5rem closed height, centered width, image visibility, and rounded geometry. Replace the black Knowledge background with white editorial framing. Restore the earlier Concierge phone shells on both sides of the centered headline and CTA without bringing back the removed pricing or description blocks.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, GSAP ScrollTrigger, Skiper UI/Shadcn registry, Vitest, Testing Library.

## Global Constraints

- Preserve all five existing Knowledge & Tools entries and their current copy.
- Use `pnpm dlx shadcn add @skiper-ui/skiper53` for the registry installation.
- The Knowledge section must use a white background and the original centered, rounded Skiper53 card proportions.
- Use one newly sourced real campus/student photograph stored locally under `public/images/premium/`.
- Show the newly sourced real photograph inside the Skiper53 cards with an active-card readability gradient.
- Scroll is the canonical active-panel controller; hover is only a desktop enhancement.
- Narrow screens must remain readable and use scroll control without requiring hover.
- Reduced-motion users receive a static readable list without sticky pinning.
- Restore the original two-phone Concierge composition while keeping its current simplified headline and CTA copy.
- Do not change FAQ, hero, journey, or product showcase sections.

---

### Task 1: Install and control the Skiper53 primitive

**Files:**
- Create: `components/ui/skiper-ui/skiper53.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Test: `tests/premium.test.tsx`

**Interfaces:**
- Produces: `HoverExpand_002({ images, className, activeIndex, onActiveIndexChange, renderPanel })`
- `activeIndex?: number` controls the expanded panel when supplied.
- `onActiveIndexChange?: (index: number) => void` supports hover preview.
- `renderPanel?: (image: HoverExpandImage, index: number, active: boolean) => ReactNode` renders Atlas copy over each panel.

- [ ] **Step 1: Add a failing registry-integration test**

Add assertions that `components/ui/skiper-ui/skiper53.tsx` exists, exports `HoverExpand_002`, accepts `activeIndex`, and that the premium Knowledge section imports it.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/premium.test.tsx`

Expected: FAIL because `skiper53.tsx` and the Knowledge-section import do not exist.

- [ ] **Step 3: Install the requested registry component**

Run: `pnpm dlx shadcn add @skiper-ui/skiper53`

Expected: Shadcn creates `components/ui/skiper-ui/skiper53.tsx` and installs any missing dependency.

- [ ] **Step 4: Add controlled-state support without removing default hover behavior**

Keep the registry component's visual expansion model, add the optional props above, derive `resolvedIndex = activeIndex ?? hoveredIndex`, and call `renderPanel?.(image, index, resolvedIndex === index)` inside each animated panel.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- tests/premium.test.tsx`

Expected: registry assertions pass; later Knowledge-section assertions may remain RED until Task 2.

---

### Task 2: Build the scroll-controlled Knowledge section

**Files:**
- Create: `components/premium/PremiumKnowledgeAccordion.tsx`
- Modify: `components/premium/PremiumLowerChapters.tsx`
- Modify: `components/premium/PremiumCinematicMotion.tsx`
- Modify: `app/premium/globals.css`
- Test: `tests/premium.test.tsx`

**Interfaces:**
- Consumes: `HoverExpand_002` from Task 1.
- Produces: `PremiumKnowledgeAccordion({ items })` where every item contains `type`, `title`, optional `copy`, and `meta`.
- Produces DOM hooks: `data-premium-knowledge-track`, `data-premium-knowledge-panel`, `data-premium-knowledge-active`.

- [ ] **Step 1: Add failing layout and interaction tests**

Assert that:

```ts
expect(knowledge?.querySelectorAll("[data-premium-knowledge-panel]")).toHaveLength(5);
expect(knowledge?.querySelector("[data-premium-knowledge-track]")).not.toBeNull();
expect(css).toMatch(/\.premium-knowledge\s*\{[^}]*width: 100%/);
expect(css).toMatch(/\.premium-knowledge\s*\{[^}]*border-radius: 0/);
expect(css).toContain("premium-knowledge-students.jpg");
expect(css).toMatch(/\.premium-knowledge::after\s*\{[^}]*background: rgb\(0 0 0 \/ 0\.78\)/);
expect(motion).toContain('"[data-premium-knowledge-panel]"');
expect(motion).toContain("knowledgeActiveIndex");
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/premium.test.tsx`

Expected: FAIL because the old two-column article grid has no scroll track or controlled panels.

- [ ] **Step 3: Add the premium wrapper**

Create a client component that stores `activeIndex`, renders `HoverExpand_002`, supplies the five content entries, and applies `data-premium-knowledge-panel` to each panel. Expose a hidden semantic heading/description only when required for accessibility; visible copy must remain inside the panels.

- [ ] **Step 4: Map scroll progress to panel state**

In `PremiumCinematicMotion.tsx`, create one ScrollTrigger for `[data-premium-knowledge-track]` with `start: "top top"`, `end: "bottom bottom"`, and `scrub: 1`. Convert progress to `Math.min(panelCount - 1, Math.floor(progress * panelCount))`, then set `data-premium-knowledge-active` and dispatch a `premium-knowledge-change` custom event carrying the index.

- [ ] **Step 5: Replace the old grid markup**

Keep `knowledgeTools` as the single content source and render `<PremiumKnowledgeAccordion items={knowledgeTools} />` inside `PremiumKnowledgeTools`.

- [ ] **Step 6: Replace the old grid CSS**

Make `.premium-knowledge` white, center the original-width Skiper53 gallery, preserve its rounded 24rem/2.5rem expansion geometry, and ensure active copy fades into the image gradient. Restore the two Concierge phone shells around the centered copy. Add a reduced-motion media query that removes sticky positioning and shows all panel copy.

- [ ] **Step 7: Run focused tests and typecheck**

Run: `npm test -- tests/premium.test.tsx && npm run typecheck`

Expected: all focused tests pass and TypeScript exits successfully.

---

### Task 3: Add the real-photo asset and verify the finished section

**Files:**
- Create: `public/images/premium/premium-knowledge-students.jpg`
- Verify: `components/premium/PremiumKnowledgeAccordion.tsx`
- Verify: `app/premium/globals.css`

**Interfaces:**
- Consumes the CSS path `/images/premium/premium-knowledge-students.jpg`.

- [ ] **Step 1: Download the new real photograph**

Download the real student photograph from `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=85` to `public/images/premium/premium-knowledge-students.jpg`.

- [ ] **Step 2: Verify the asset**

Run: `file public/images/premium/premium-knowledge-students.jpg`

Expected: JPEG image data with sufficient dimensions for a full-width background.

- [ ] **Step 3: Verify desktop and mobile behavior in the local browser**

At desktop width, confirm the white section contains the centered rounded Skiper53 gallery and one panel opens per scroll segment. Confirm Concierge has one phone on each side of the centered title. At mobile width, confirm the gallery scales inside the viewport and no horizontal overflow occurs.

- [ ] **Step 4: Run final automated verification**

Run: `git diff --check && npm test -- tests/premium.test.tsx && npm run typecheck && npm run build`

Expected: diff check, 18+ focused tests, typecheck, and production build all exit successfully.

- [ ] **Step 5: Run changed-file lint**

Run: `npx eslint components/ui/skiper-ui/skiper53.tsx components/premium/PremiumKnowledgeAccordion.tsx components/premium/PremiumLowerChapters.tsx components/premium/PremiumCinematicMotion.tsx tests/premium.test.tsx`

Expected: exit code 0.
