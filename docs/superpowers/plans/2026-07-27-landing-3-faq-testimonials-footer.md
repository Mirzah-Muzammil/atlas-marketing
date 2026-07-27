# Landing 3 FAQ, Testimonials, and Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish `/landing-3` with a Rainbow-inspired Atlas FAQ, subtle readiness hover feedback, iMessage-style testimonials, and a dedicated `/normal`-matching footer.

**Architecture:** Add two focused presentational components, modify the two existing section components in place, and compose everything in `Landing3Hero`. Keep all content local and use semantic HTML plus Tailwind classes; no new dependencies or shared abstractions.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide React, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve Landing 3's dark theme except for the existing light support panel.
- Use Atlas content only; Rainbow supplies layout inspiration, not copy.
- Do not import or reuse `components/sections/footer.tsx` from `/normal`.
- Do not add new dependencies.
- Keep all layouts responsive without horizontal overflow.

---

### Task 1: Rainbow-inspired Atlas FAQ

**Files:**
- Create: `components/landing-3/Landing3FaqSection.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Produces: `Landing3FaqSection(): JSX.Element`, rendered after `Landing3SupportSection` with `data-landing-3-faq` and `id="faq"`.
- Consumes: no props; FAQ content remains local to the component.

- [ ] **Step 1: Write the failing FAQ unit test**

```tsx
it("renders an interactive Atlas FAQ in the Rainbow layout", () => {
  const { container } = render(<Landing3Page />);
  expect(screen.getByRole("heading", { level: 2, name: "Frequently Asked Questions" })).toBeVisible();
  expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(3);
  fireEvent.click(screen.getByRole("button", { name: "Is Atlas really free?" }));
  expect(screen.getByText(/The core Atlas platform is free/)).toBeVisible();
  expect(container.querySelector("[data-landing-3-faq]")).not.toBeNull();
});
```

- [ ] **Step 2: Run the FAQ unit test and verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

Expected: FAIL because the FAQ heading and disclosure buttons do not exist.

- [ ] **Step 3: Implement the FAQ component and composition**

Create a client component with three local FAQ objects, one open-row state, `aria-expanded`, `aria-controls`, plus-to-close icon rotation, divided rows, and the two-column Rainbow layout. Import and render it after `Landing3SupportSection` in `Landing3Hero`.

- [ ] **Step 4: Add the FAQ browser contract**

```ts
test("places the Atlas FAQ after support and expands answers", async ({ page }) => {
  await page.goto("/landing-3");
  const support = page.locator("[data-landing-3-support]");
  const faq = page.locator("[data-landing-3-faq]");
  await expect(faq.getByRole("heading", { level: 2 })).toHaveText("Frequently Asked Questions");
  await faq.getByRole("button", { name: "Is Atlas really free?" }).click();
  await expect(faq.getByText(/The core Atlas platform is free/)).toBeVisible();
  expect((await faq.boundingBox())!.y).toBeGreaterThanOrEqual((await support.boundingBox())!.y + (await support.boundingBox())!.height - 1);
});
```

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `npx vitest run tests/landing-3.test.tsx && npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge --grep "Atlas FAQ"`

Expected: all focused tests pass.

### Task 2: Readiness hover feedback

**Files:**
- Modify: `components/landing-3/Landing3ReadinessSection.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Preserves: `[data-readiness-feature]` list items and existing GSAP entrance behavior.
- Adds: hover/focus-within transform, border, background, icon brightness, and reduced-motion-safe transform behavior.

- [ ] **Step 1: Write the failing hover contract tests**

```tsx
const readinessCard = container.querySelector("[data-readiness-feature]");
expect(readinessCard).toHaveClass("hover:-translate-y-1");
expect(readinessCard).toHaveClass("motion-reduce:hover:translate-y-0");
```

Add a browser assertion that the first card's transform changes after hover on desktop.

- [ ] **Step 2: Run the readiness tests and verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

Expected: FAIL because the hover and reduced-motion classes are absent.

- [ ] **Step 3: Add the minimal hover treatment**

Add `group`, transition, `hover:-translate-y-1`, brighter border/background, matching `focus-within` classes, and `motion-reduce:hover:translate-y-0` to each card. Add transition/color classes to its icon only.

- [ ] **Step 4: Run readiness unit and browser tests**

Run: `npx vitest run tests/landing-3.test.tsx && npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --grep "readiness grid"`

Expected: all focused tests pass.

### Task 3: iMessage-style support testimonials

**Files:**
- Modify: `components/landing-3/Landing3SupportSection.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Preserves: `Landing3SupportSection`, `[data-support-panel]`, `[data-support-visual]`, and five `[data-support-pill]` nodes.
- Adds: `name`, `avatar`, and quoted `copy` per testimonial with semantic `blockquote`, `footer`, and image alternative text.

- [ ] **Step 1: Write the failing identity/content test**

```tsx
expect(screen.getByText("Maya Patel")).toBeVisible();
expect(screen.getByAltText("Maya Patel")).toBeVisible();
expect(screen.getByText(/“Atlas helped me turn/)).toBeVisible();
expect(container.querySelectorAll("[data-support-pill]")).toHaveLength(5);
```

- [ ] **Step 2: Run the support unit test and verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

Expected: FAIL because testimonial identities and avatars are absent.

- [ ] **Step 3: Implement iMessage testimonial bubbles**

Extend each testimonial with a student name and avatar URL. Render a compact identity row with circular avatar and name, followed by a quoted message. Retain the five gradients, rotations, static scroll behavior, and subtle hover lift while reducing copy size to fit the new message layout.

- [ ] **Step 4: Update and run support browser tests**

Update the existing support test to assert five avatars, five names, quoted messages, static scroll geometry, and hover transform. Remove the obsolete minimum 25px plain-pill font assertion.

Run: `npx vitest run tests/landing-3.test.tsx && npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge --grep "support"`

Expected: all focused support tests pass.

### Task 4: Dedicated Landing 3 footer

**Files:**
- Create: `components/landing-3/Landing3Footer.tsx`
- Modify: `components/landing-3/Landing3Hero.tsx`
- Test: `tests/landing-3.test.tsx`
- Test: `e2e/landing-3.spec.ts`

**Interfaces:**
- Produces: `Landing3Footer(): JSX.Element` with `data-landing-3-footer`.
- Consumes: `/images/normal/atlas-wordmark.png`, Lucide icons, `next/link`, `next/image`, and `AnimatedTitle` directly.

- [ ] **Step 1: Write the failing footer unit test**

```tsx
expect(container.querySelector("[data-landing-3-footer]")).not.toBeNull();
expect(screen.getByText("© 2026 GGI Atlas · Built in London")).toBeVisible();
expect(screen.getByAltText("ATLAS")).toBeVisible();
expect(screen.getByRole("link", { name: "Match universities" })).toHaveAttribute("href", "#journey");
```

- [ ] **Step 2: Run the footer unit test and verify RED**

Run: `npx vitest run tests/landing-3.test.tsx`

Expected: FAIL because the dedicated footer is absent.

- [ ] **Step 3: Create and compose `Landing3Footer`**

Copy the `/normal` footer markup and Tailwind styling into the new component without importing that component. Preserve the three columns, company badges, copyright row, social-stage icon links, and Atlas wordmark. Remap links to `#journey`, `#platform`, `#essentials-orbit`, `#atlas-support`, and `#faq`. Render it after `Landing3FaqSection`.

- [ ] **Step 4: Add and run footer browser checks**

Assert the footer follows the FAQ, is full width, contains the Atlas wordmark, and does not cause horizontal overflow.

Run: `npx vitest run tests/landing-3.test.tsx && npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge --grep "footer"`

Expected: all focused footer tests pass.

### Task 5: Integration verification

**Files:**
- Verify: `components/landing-3/*.tsx`
- Verify: `tests/landing-3.test.tsx`
- Verify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Produces: a complete `/landing-3` page ordered as support → FAQ → footer.

- [ ] **Step 1: Run focused unit tests**

Run: `npx vitest run tests/landing-3-shader.test.tsx tests/landing-3.test.tsx`

Expected: all tests pass.

- [ ] **Step 2: Run desktop/mobile Landing 3 browser tests**

Run: `npx playwright test e2e/landing-3.spec.ts --project=desktop-edge --project=mobile-edge`

Expected: all tests pass with no horizontal overflow.

- [ ] **Step 3: Run production verification**

Run: `npm run build && git diff --check`

Expected: build exits 0 and diff check produces no output.

- [ ] **Step 4: Restart and health-check port 3000**

Run the production server with `npm start -- -p 3000`, then request `http://localhost:3000/landing-3`.

Expected: HTTP 200.

