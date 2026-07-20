# Normal Static Atlas Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/normal` a source-backed static Atlas page with no landing-data APIs while preserving its approved visual design.

**Architecture:** Store the dynamic arrays in one typed constants module and import them directly into the server page. Keep retained section markup/classes intact, update only visible content, and add source-derived assets at the existing paths.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Vitest, React Testing Library, Playwright with Microsoft Edge.

---

### Task 1: Freeze the approved design and data behavior

**Files:**
- Create: `tests/normal.test.tsx`

- [ ] Add a failing test that renders `NormalPage`, rejects `getLandingPageData`/initial `fetch` usage, and asserts the approved component order without Pricing or Testimonials.
- [ ] Add a failing class-name digest assertion for the retained `/normal` components.
- [ ] Add failing assertions for non-empty static modules/services/FAQs and absence of Dooyt/ERP copy.
- [ ] Run `npm test -- tests/normal.test.tsx` and confirm the failures describe the missing static implementation.

### Task 2: Replace API-fed arrays with source-backed constants

**Files:**
- Create: `constants/normal-page-data.ts`
- Modify: `app/normal/page.tsx`

- [ ] Define typed module, service, and FAQ arrays using only verified source strings.
- [ ] Import the arrays directly into `/normal`, remove `getLandingPageData`, `force-dynamic`, Pricing, and Testimonials.
- [ ] Preserve the root/main/Providers wrappers and the order of every retained section.
- [ ] Run `npm test -- tests/normal.test.tsx` and confirm the data/API contract passes.

### Task 3: Replace visible Dooyt content without changing design classes

**Files:**
- Modify: `app/normal/layout.tsx`
- Modify: `components/layout/navbar.tsx`
- Modify: `components/sections/hero.tsx`
- Modify: `components/sections/modules.tsx`
- Modify: `components/sections/features.tsx`
- Modify: `components/sections/industries.tsx`
- Modify: `components/sections/cta-banner.tsx`
- Modify: `components/sections/faqs.tsx`
- Modify: `components/sections/footer.tsx`

- [ ] Replace only text, labels, destinations, metadata, and alternative text with verified Atlas source content.
- [ ] Keep all class names, layout wrappers, AOS attributes, and responsive utilities unchanged.
- [ ] Run the focused test and confirm no source/design contract fails.

### Task 4: Supply source-derived image data

**Files:**
- Create: the existing `/normal` image paths under `public/images/`

- [ ] Capture relevant UI/service visuals from the supplied reference site in Microsoft Edge.
- [ ] Store them at the paths already referenced by the unchanged components.
- [ ] Verify every `/normal` image request returns HTTP 200.

### Task 5: Verify the complete result

**Files:**
- Modify: `e2e/homepages.spec.ts` only if a focused `/normal` browser contract is needed.

- [ ] Run focused unit tests, TypeScript, ESLint, and `git diff --check`.
- [ ] Run the production build after the parallel backend dependency work is stable.
- [ ] Run Edge QA at desktop and mobile widths; check section order, search/tabs/FAQ interactions, image responses, overflow, console errors, and absence of landing-data API requests.
- [ ] Run the full test suite and report unrelated baseline failures separately.
