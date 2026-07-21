# Editorial Trust Proof Tiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain three-column proof block in the editorial “Why this exists” section with three expressive editorial tiles.

**Architecture:** Keep the work inside the existing `DispatchTrustSection` component. Render the three fixed facts from a local data array so the tile structure stays consistent, preserve `data-trust-proof` for the current GSAP reveal, and use Tailwind utilities for palette, layout, hover, and reduced-motion behavior.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library

---

### Task 1: Replace the proof block

**Files:**
- Modify: `components/home/dispatch/DispatchTrustSection.tsx:1-125`
- Modify: `tests/dispatch.test.tsx`

- [ ] **Step 1: Write the failing component test**

Add a test that renders `EditorialPage`, selects `[data-trust-proof-tile]`, expects exactly three tiles, and verifies the ordered text content `01 / To use, ever / £0`, `02 / To set up / 3 min`, and `03 / Required / No card`. It must also assert that every tile retains `data-trust-proof`.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: FAIL because no elements have the new `data-trust-proof-tile` marker.

- [ ] **Step 3: Implement the approved tiles**

Add a local `trustProofs` array containing the three indices, labels, values, and palette classes. Replace the repeated articles with a responsive grid mapped from the array. Each article must:

- retain `data-trust-proof`;
- add `data-trust-proof-tile`;
- use square editorial surfaces in ink, mint, and sage;
- present a small index and uppercase label at the top;
- present an expanding accent rule and oversized value below;
- offset the middle tile upward on desktop;
- use fine, restrained hover lift and rule expansion;
- disable transitions and transforms under reduced-motion preferences.

- [ ] **Step 4: Preserve unrelated editorial test state**

The existing editorial suite already has unrelated hero-copy and fingerprint mismatches. Do not change those expectations as part of this isolated section redesign.

- [ ] **Step 5: Verify GREEN**

Run: `npm test -- tests/dispatch.test.tsx -t "presents the trust proofs as three numbered editorial tiles"`

Expected: the focused trust-proof tile test passes.

- [ ] **Step 6: Verify production readiness**

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0, aside from any already-known non-failing lint warnings.
