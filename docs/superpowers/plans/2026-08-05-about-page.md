# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, editorial Atlas About page that explains why Atlas exists, the principles that govern it, the team, proof points, vision, and founder perspective.

**Architecture:** Add a server route at `/about` which composes focused section components. The shared root layout already supplies navigation and the footer. Use the existing title reveal for headings and one client component for the scroll-driven Why paragraph.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Next Image, Vitest, Testing Library.

## Global Constraints

- Reuse the shared layout header and footer. Do not duplicate either in the route.
- Use the dark Atlas palette with `#f35a02` as the accent.
- Use existing local images only. Do not add generated imagery, generic icons, or external image dependencies.
- Do not use em dashes in shipped copy.
- Reduced-motion users receive a fully readable Why paragraph without scroll dependency.
- Preserve currently uncommitted How It Works changes and do not fold them into About commits.

---

### Task 1: Scroll-revealed Why paragraph

**Files:**

- Create: `components/about/AboutWhyReveal.tsx`
- Test: `tests/about-page.test.tsx`

**Interfaces:**

- Produces: `AboutWhyReveal`, a client component with no required props.
- Consumes: `HomepageAnimatedTitle`.

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { AboutWhyReveal } from "@/components/about/AboutWhyReveal";

it("renders source-informed Why copy as word-level scroll text", () => {
  render(<AboutWhyReveal />);
  expect(screen.getByText("The industry treats this as a sales opportunity. We don't.")).toBeVisible();
  expect(screen.getByText(/For most international students, studying abroad/)).toBeVisible();
  expect(document.querySelector("[data-about-why-reveal]")).toBeInTheDocument();
  expect(document.querySelectorAll("[data-about-why-word]").length).toBeGreaterThan(20);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/about-page.test.tsx`

Expected: FAIL because `AboutWhyReveal` does not exist.

- [ ] **Step 3: Write the implementation**

Create a `"use client"` component with the approved paragraph stored in `whyCopy`. Keep a section ref and a numeric scroll progress state updated in a passive `scroll` listener. The section is 180svh tall with a sticky, vertically centred inner block. Render a muted, non-interactive ghost copy behind word spans. Split `whyCopy` into spans with `data-about-why-word`; interpolate each span from `text-white/22` to `text-white` as scroll progress reaches that word index. Include one visually hidden full paragraph for assistive technology and remove the ghost and word progression under `prefers-reduced-motion`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/about-page.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/about/AboutWhyReveal.tsx tests/about-page.test.tsx
git commit -m "Add About page Why text reveal"
```

### Task 2: About hero and six-principles layout

**Files:**

- Create: `components/about/AboutHero.tsx`
- Create: `components/about/AboutPrinciples.tsx`
- Modify: `tests/about-page.test.tsx`

**Interfaces:**

- Produces: `AboutHero` and `AboutPrinciples`, stateless section components.
- Consumes: `HomepageAnimatedTitle`, Next `Image`, and local images `/images/homepage/atlas-departure.jpg`, `/images/homepage/product-planning.jpg`, and `/images/homepage/student-crowd.png`.

- [ ] **Step 1: Extend the failing test**

```tsx
it("shows the proof points and six governing principles", () => {
  render(<AboutPage />);
  for (const proof of ["Six", "Years in the field", "London", "Where we're based", "Free", "The OS, forever"]) {
    expect(screen.getByText(proof)).toBeVisible();
  }
  expect(document.querySelector("[data-about-editorial-hero]")).toBeInTheDocument();
  expect(document.querySelector("[data-about-principles-grid]")).toBeInTheDocument();
  expect(document.querySelectorAll("[data-about-principle]")).toHaveLength(6);
  expect(screen.getByText("The free OS is the product, not the trap.")).toBeVisible();
  expect(screen.getByText("Family-business standards.")).toBeVisible();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/about-page.test.tsx`

Expected: FAIL because the route and components do not exist.

- [ ] **Step 3: Write the implementation**

Implement `AboutHero` using the same desktop split and title scale as `app/concierge/page.tsx`. Put the About title, source-based introduction, and a vertical definition list of Six Years in the field, London Where we are based, and Free The OS, forever on the left. Build a three-image editorial collage on the right from the named assets, using crop contrast, thin borders, captions, and a subtle orange glow rather than generic visual cards.

Implement `AboutPrinciples` as the approved asymmetric layout. The left column contains “Six rules that decide everything.”, a short introduction, and a local editorial image. The right column uses a 2 by 3 grid with fine dividers and six text-led cells. Use the reference principle titles and adapted descriptions: free OS, labelled partners, specialists not hidden agents, post-arrival support, honest limitations, and family-business standards. Do not use decorative icons, card shadows, or beige styles.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/about-page.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/about/AboutHero.tsx components/about/AboutPrinciples.tsx tests/about-page.test.tsx
git commit -m "Build About hero and principles"
```

### Task 3: Supporting sections and route composition

**Files:**

- Create: `components/about/AboutStory.tsx`
- Create: `app/about/page.tsx`
- Modify: `tests/about-page.test.tsx`

**Interfaces:**

- Produces: the `/about` route and route metadata.
- Consumes: `AboutHero`, `AboutWhyReveal`, `AboutPrinciples`, `HomepageAnimatedTitle`, and `ConciergeFinalCta`.

- [ ] **Step 1: Extend the failing test**

```tsx
it("covers the team, transparent numbers, vision, founder note, and CTA", () => {
  render(<AboutPage />);
  expect(screen.getByRole("heading", { level: 2, name: "A small team in London." })).toBeVisible();
  expect(screen.getByText("Concrete things, honestly counted.")).toBeVisible();
  expect(screen.getByText("The default OS for going abroad.")).toBeVisible();
  expect(screen.getByText("Harman Hora")).toBeVisible();
  expect(screen.getByRole("heading", { level: 2, name: "Read enough? Try the OS." })).toBeVisible();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/about-page.test.tsx`

Expected: FAIL because the About route does not exist.

- [ ] **Step 3: Write the implementation**

Create `AboutStory` with four semantic subsections. Include a small London team introduction, an honest metrics band using supported facts only, a three-horizon vision marked Now, Next 12 months, and 2 to 5 years, and a founder note attributed to Harman Hora. Use source framing but do not claim unsupported student or revenue numbers. Compose all About components in `app/about/page.tsx`, set canonical metadata, apply the existing dark global-grid background, and end with `ConciergeFinalCta` customised to “Read enough? Try the OS.” and a Get started link to `/get-started`.

- [ ] **Step 4: Run focused and full verification**

Run: `npm test -- tests/about-page.test.tsx && npm run lint && npm run typecheck && npm test && npm run build && git diff --check`

Expected: all commands exit with code 0 and `/about` appears in the static route list.

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx components/about/AboutStory.tsx tests/about-page.test.tsx
git commit -m "Add Atlas About page"
```

## Plan self-review

- Spec coverage: Task 1 is the approved scroll-driven Why treatment. Task 2 covers the editorial hero, proof points, and split six-principles design. Task 3 adds the team, numbers, vision, founder note, CTA, metadata, and verification.
- Placeholder scan: no implementation step defers required work or leaves copy unspecified.
- Type consistency: `AboutHero`, `AboutWhyReveal`, `AboutPrinciples`, and `AboutStory` are named exports consumed by the About route.
