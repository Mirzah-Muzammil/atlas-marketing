# Landing 3 Review Messages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Landing 3 support testimonials into readable, expandable iMessage-style customer review bubbles.

**Architecture:** Keep testimonial data and rendering inside `Landing3SupportSection.tsx`. Use CSS hover and focus-visible states for expansion and stacking, plus a decorative child element for each left tail; avoid component state because the interaction is transient and CSS can serve pointer, keyboard, and reduced-motion users.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, Vitest, Testing Library, Playwright.

## Global Constraints

- The heading is exactly `Real stories. Real support.` across two visual lines.
- Every testimonial has one decorative left-facing tail matching its bubble gradient.
- Resting messages remain readable on desktop and mobile.
- Hover and keyboard focus expand and raise one message for approximately 300 milliseconds.
- Reduced-motion mode does not animate translation.
- Do not add dependencies or change testimonial copy.

---

### Task 1: Review bubble structure and interaction

**Files:**
- Modify: `components/landing-3/Landing3SupportSection.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Consumes: the existing `testimonials` data array and `[data-support-pill]` browser-test contract.
- Produces: `[data-support-tail]` for decorative tails and focusable testimonial `blockquote` elements.

- [ ] **Step 1: Write failing component tests**

Update the support-section test to expect the accessible heading `Real stories. Real support.`, five `[data-support-tail]` elements with `aria-hidden="true"`, and `tabIndex="0"` on every `[data-support-pill]`.

- [ ] **Step 2: Run the component test to verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

Expected: FAIL because the old heading is rendered and tails/focusability do not exist.

- [ ] **Step 3: Write failing browser interaction tests**

Update the Landing 3 support browser test to hover the first pill and assert that its bounding box grows while its computed `z-index` rises above the resting value. Add keyboard focus coverage using `pill.focus()` and assert the same expanded presentation.

- [ ] **Step 4: Run the focused browser test to verify RED**

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --grep "iMessage-style Atlas support testimonials"`

Expected: FAIL because the current hover effect only slightly scales the bubble and does not expose the required tail/focus contract.

- [ ] **Step 5: Implement the minimal visual behavior**

In `Landing3SupportSection.tsx`:

- Replace the heading spans with `Real stories.` and `Real support.`.
- Adjust the five responsive absolute positions to reduce resting overlap.
- Add `tabIndex={0}` to each testimonial.
- Add a decorative absolutely positioned tail inside each bubble using `data-support-tail`, `aria-hidden="true"`, and the testimonial gradient.
- Add `isolation-isolate`, overflow visibility, and hover/focus-within styles that increase width/scale, translate the card slightly toward the open panel area, strengthen the shadow/filter, and set `z-index` above all resting bubbles.
- Preserve a zero-translation reduced-motion state.

- [ ] **Step 6: Run scoped tests to verify GREEN**

Run: `npx vitest run tests/landing-3.test.tsx`

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge`

Expected: all scoped tests PASS.

- [ ] **Step 7: Verify build and visual layout**

Run: `npm run build`

Open `http://localhost:3000/landing-3`, inspect the support section at desktop and mobile widths, and confirm every resting review is readable and hovered/focused cards expand above their neighbors.

- [ ] **Step 8: Commit**

```bash
git add components/landing-3/Landing3SupportSection.tsx tests/landing-3.test.tsx e2e/landing-3.spec.ts docs/superpowers/specs/2026-07-27-landing-3-review-messages-design.md docs/superpowers/plans/2026-07-27-landing-3-review-messages.md
git commit -m "feat: refine landing 3 review messages"
```

