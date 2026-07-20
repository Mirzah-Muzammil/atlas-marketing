# Atlas Footer Logo and CTA Artwork Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/normal` footer artwork with a transparent ATLAS lettermark and replace the CTA artwork with a transparent front-facing phone-in-hand image showing an Atlas subscription selector.

**Architecture:** Generate both raster assets with the built-in image workflow on flat chroma-key backgrounds, convert those backgrounds to alpha with the installed helper, and store the final PNGs in `public/images/normal/`. Keep the existing component layouts intact and update only image references, intrinsic dimensions, alt text, and focused regression expectations.

**Tech Stack:** Next.js 15, React 19, `next/image`, Vitest, built-in image generation, Pillow-based chroma-key removal

---

### Task 1: Lock the new asset references with a failing regression

**Files:**
- Modify: `tests/normal-images.test.ts`

- [ ] **Step 1: Update the expected component asset paths**

Replace the footer and CTA expectations with:

```ts
const componentImages = [
  ["components/sections/modules.tsx", "/images/normal/product-planning.jpg"],
  ["components/sections/features.tsx", "/images/normal/service-planning.jpg"],
  ["components/sections/features.tsx", "/images/normal/career.jpg"],
  ["components/sections/cta-banner.tsx", "/images/normal/subscription-phone-hand.png"],
  ["components/sections/footer.tsx", "/images/normal/atlas-wordmark.png"],
] as const;
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
npm test -- --run tests/normal-images.test.ts
```

Expected: FAIL because the CTA and footer components still reference the previous image files and the two new PNG assets do not yet exist.

- [ ] **Step 3: Commit the regression expectation**

```bash
git add tests/normal-images.test.ts
git commit -m "test: cover Atlas footer and CTA artwork"
```

### Task 2: Generate and validate the transparent assets

**Files:**
- Create: `public/images/normal/atlas-wordmark.png`
- Create: `public/images/normal/subscription-phone-hand.png`

- [ ] **Step 1: Generate the ATLAS chroma-key source**

Use the built-in image generation tool with this prompt:

```text
Use case: logo-brand
Asset type: oversized footer wordmark
Primary request: create a clean letter-only logo that reads exactly "ATLAS"
Style/medium: bold wide uppercase geometric wordmark, vector-friendly, precise typography
Composition/framing: one horizontal line, centered, generous padding, no cropped letters
Color palette: solid white letters with one restrained Atlas-orange diagonal cut detail inside the first A
Scene/backdrop: perfectly flat solid #00FF00 chroma-key background
Text (verbatim): "ATLAS"
Constraints: letters only; exact spelling; no icon; no container; no slogan; no shadow; no texture; background must be uniform with no gradient
Avoid: extra characters, 3D effects, mockup scene, watermark, green inside the lettering
```

- [ ] **Step 2: Convert the wordmark background to alpha**

Run `/Users/mirzah/.codex/skills/.system/imagegen/scripts/remove_chroma_key.py`
with `python3`. Pass the exact PNG path reported by the built-in generation
result's `output_hint` as `--input`, pass
`public/images/normal/atlas-wordmark.png` as `--out`, and include
`--auto-key border --soft-matte --transparent-threshold 12
--opaque-threshold 220 --despill`.

- [ ] **Step 3: Generate the subscription-phone chroma-key source**

Use the built-in image generation tool with this prompt:

```text
Use case: ads-marketing
Asset type: transparent CTA cutout
Primary request: one photorealistic hand holding a modern black smartphone with the front screen facing the viewer
Subject: anatomically correct hand and forearm; complete phone; crisp opaque edges
Composition/framing: portrait orientation, slight natural angle, screen large and readable, subject centered with generous padding
Screen UI: polished light subscription selector headed exactly "Choose your plan" with three options labeled exactly "Free", "Monthly", and "Annual"; Annual is selected with Atlas-orange border and checkmark; simple rounded cards and dark readable text
Scene/backdrop: perfectly flat solid #FF00FF chroma-key background with no floor, shadow, gradient, texture, reflection, or lighting variation
Constraints: only one hand and one phone; screen faces viewer; no external brand marks; no watermark; no extra objects; do not use magenta in the subject or screen
Avoid: phone back facing viewer, malformed fingers, unreadable text, cropped phone, scene background
```

- [ ] **Step 4: Convert the CTA background to alpha**

Run the same installed helper with `python3`. Pass the exact phone-source PNG
path reported by that generation result's `output_hint` as `--input`, pass
`public/images/normal/subscription-phone-hand.png` as `--out`, and include
`--auto-key border --soft-matte --transparent-threshold 12
--opaque-threshold 220 --despill`.

- [ ] **Step 5: Validate both PNGs**

Run:

```bash
file public/images/normal/atlas-wordmark.png public/images/normal/subscription-phone-hand.png
sips -g pixelWidth -g pixelHeight -g hasAlpha public/images/normal/atlas-wordmark.png public/images/normal/subscription-phone-hand.png
```

Expected: both files report PNG RGBA data, non-zero dimensions, and `hasAlpha: yes`. Inspect both files directly and regenerate once with a single targeted prompt correction if the spelling, phone orientation, hand anatomy, subscription labels, or edges are wrong.

- [ ] **Step 6: Commit the final assets**

```bash
git add public/images/normal/atlas-wordmark.png public/images/normal/subscription-phone-hand.png
git commit -m "feat: add Atlas footer and subscription CTA artwork"
```

### Task 3: Integrate the assets and verify the page

**Files:**
- Modify: `components/sections/footer.tsx`
- Modify: `components/sections/cta-banner.tsx`
- Test: `tests/normal-images.test.ts`

- [ ] **Step 1: Replace the footer image reference**

In the existing footer `Image`, set `src` to
`/images/normal/atlas-wordmark.png`, set `alt` to `ATLAS`, and set its numeric
`width` and `height` props to the exact pixel dimensions reported by `sips`.
Retain the existing class name unchanged.

- [ ] **Step 2: Replace the CTA image reference**

In the existing CTA `Image`, set `src` to
`/images/normal/subscription-phone-hand.png`, set `alt` to `Hand holding a phone
displaying Atlas subscription plans`, and set its numeric `width` and `height`
props to the exact pixel dimensions reported by `sips`. Retain the existing
class name and `priority` prop unchanged.

- [ ] **Step 3: Run the focused regression tests**

```bash
npm test -- --run tests/normal-images.test.ts tests/normal-scroll.test.tsx
```

Expected: both test files pass.

- [ ] **Step 4: Run lint on touched source and test files**

```bash
npx eslint components/sections/footer.tsx components/sections/cta-banner.tsx tests/normal-images.test.ts
```

Expected: no lint errors.

- [ ] **Step 5: Verify the desktop and mobile layouts in a browser**

Run `npm run dev`, load `/normal`, scroll to the CTA and footer, and verify at desktop and mobile widths:

- Both images load with non-zero `naturalWidth` and `naturalHeight`.
- The CTA screen faces the viewer and shows the three required plans.
- The CTA image does not overlap the heading, paragraph, or button.
- The ATLAS spelling is exact and the lettermark is readable on black.
- Neither asset shows a background rectangle or chroma fringe.

- [ ] **Step 6: Commit the integration**

```bash
git add components/sections/footer.tsx components/sections/cta-banner.tsx tests/normal-images.test.ts
git commit -m "feat: update Atlas footer and CTA imagery"
```
