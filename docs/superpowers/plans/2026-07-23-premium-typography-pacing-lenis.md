# Premium Typography, Pacing, and Lenis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh `/premium` typography, double the second-section animation distance, and add route-scoped Lenis smoothing synchronized with ScrollTrigger.

**Architecture:** Keep the premium markup and motion system intact while changing only the hero title line structure, description font selectors, transition heights, and the existing Lenis provider’s optional configuration. The page opts into premium Lenis settings; other routes keep existing defaults.

**Tech Stack:** Next.js 15, React 19, CSS, GSAP ScrollTrigger, Lenis 1.3, Vitest, Testing Library

## Global Constraints

- Preserve the exact hero wording: `Your operating system for studying and succeeding abroad.`
- Keep Wise Sans for headings and add local Instrument Sans only for long-form descriptions.
- Set the transition to `250svh` desktop and `210svh` mobile without changing its frame tween.
- Smooth wheel and trackpad input while keeping touch native with `syncTouch: false`.
- Disable Lenis for reduced motion and synchronize it with ScrollTrigger only on `/premium`.
- Do not change the crowd canvas, navbar, service content, image sources, or post-hero frame geometry.
- Leave implementation changes uncommitted.

---

### Task 1: Refresh premium typography

**Files:**
- Create: `public/fonts/instrument-sans-variable.woff2`
- Modify: `components/premium/PremiumHero.tsx`
- Modify: `app/premium/globals.css`
- Test: `tests/premium.test.tsx`

**Interfaces:**
- Consumes: Existing `data-premium-hero-title-line` GSAP hook and premium description class names.
- Produces: Three animated hero lines and the `Instrument Sans` description font face.

- [ ] **Step 1: Write failing typography assertions**

Require three hero title hooks with exact line text, a local Instrument Sans font face, and one selector group containing every long-form description class:

```ts
expect(container.querySelectorAll("[data-premium-hero-title-line]")).toHaveLength(3);
expect([...container.querySelectorAll("[data-premium-hero-title-line]")].map((line) => line.textContent?.trim()))
  .toEqual(["Your operating system for", "studying and succeeding", "abroad."]);
expect(css).toContain('font-family: "Instrument Sans"');
expect(css).toContain('url("/fonts/instrument-sans-variable.woff2")');
[
  ".premium-services__lede p",
  ".premium-service-chapter__note",
  ".premium-service-chapter__visual figcaption",
  ".premium-journey__lede",
  ".premium-journey__frame-copy > div",
  ".premium-journey__finale-action > p",
].forEach((selector) => expect(css).toContain(selector));
expect(existsSync(resolve(process.cwd(), "public/fonts/instrument-sans-variable.woff2"))).toBe(true);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/premium.test.tsx`

Expected: FAIL because the title has two lines and Instrument Sans is absent.

- [ ] **Step 3: Add the local Instrument Sans asset**

Download the official Google Fonts Latin variable WOFF2 asset:

```bash
curl -L --max-time 25 -sS "https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1Q.woff2" -o public/fonts/instrument-sans-variable.woff2
file public/fonts/instrument-sans-variable.woff2
```

Expected: `Web Open Font Format (Version 2)`.

- [ ] **Step 4: Recompose the hero title**

Render three `data-premium-hero-title-line` spans with modifier classes:

```tsx
<span className="premium-hero__title-line premium-hero__title-line--intro" data-premium-hero-title-line>
  <span>Your operating system for</span>
</span>
<span className="premium-hero__title-line premium-hero__title-line--main" data-premium-hero-title-line>
  <span>studying and succeeding</span>
</span>
<span className="premium-hero__title-line premium-hero__title-line--accent" data-premium-hero-title-line>
  <span>abroad.</span>
</span>
```

- [ ] **Step 5: Add the typography CSS**

Add the font face and responsive line hierarchy:

```css
@font-face {
  font-family: "Instrument Sans";
  src: url("/fonts/instrument-sans-variable.woff2") format("woff2");
  font-display: swap;
  font-style: normal;
  font-weight: 400 700;
}

.premium-hero__title-line--intro { font-size: 0.56em; line-height: 1; }
.premium-hero__title-line--main { font-size: 1em; }
.premium-hero__title-line--accent { color: var(--premium-orange); font-size: 1.08em; }
```

Group the six approved description selectors and apply `font-family: "Instrument Sans", sans-serif`, `font-weight: 470`, and `letter-spacing: 0.015em`. Preserve their existing colors, sizes, widths, and margins.
Explicitly keep `.premium-service-chapter__visual figcaption span` in `"Atlas Inter"` so the field-note metadata label does not inherit the description face.

- [ ] **Step 6: Run the focused test and verify GREEN**

Run: `npm test -- tests/premium.test.tsx`

Expected: typography assertions pass.

### Task 2: Double the transition distance

**Files:**
- Modify: `app/premium/globals.css`
- Test: `tests/premium.test.tsx`

**Interfaces:**
- Consumes: Existing `.premium-services__transition` sticky stage and unchanged GSAP `top top` to `bottom bottom` trigger.
- Produces: `150vh` desktop and `110vh` mobile effective animation distances.

- [ ] **Step 1: Change the test to require the slower heights**

```ts
expect(css).toMatch(/\.premium-services__transition\s*\{[\s\S]*?height: 250svh/);
expect(css).toMatch(/@media \(max-width: 720px\)[\s\S]*?\.premium-services__transition\s*\{ height: 210svh; \}/);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/premium.test.tsx`

Expected: FAIL on the current `175svh` and `155svh` values.

- [ ] **Step 3: Apply the exact pacing values**

Change only the desktop height to `250svh` and the mobile height to `210svh`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/premium.test.tsx`

Expected: 11 premium tests pass with the unchanged frame assertions.

### Task 3: Add premium-scoped Lenis synchronization

**Files:**
- Modify: `components/motion/LenisProvider.tsx`
- Modify: `app/premium/page.tsx`
- Create: `tests/lenis-provider.test.tsx`
- Test: `tests/premium.test.tsx`

**Interfaces:**
- Consumes: `LenisProvider` children and the installed `lenis`, `gsap`, and `gsap/ScrollTrigger` modules.
- Produces: Optional `duration`, `wheelMultiplier`, and `syncScrollTrigger` props with unchanged defaults for existing callers.

- [ ] **Step 1: Write the failing provider regression**

Mock Lenis, GSAP, ScrollTrigger, and reduced-motion state. Render:

```tsx
<LenisProvider duration={1.25} wheelMultiplier={0.85} syncScrollTrigger>
  <main>Premium</main>
</LenisProvider>
```

Assert Lenis receives `{ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.85, syncTouch: false }`, subscribes `ScrollTrigger.update`, registers the plugin, refreshes once, and on unmount unsubscribes, cancels its RAF, and destroys Lenis. Add a reduced-motion case asserting the Lenis constructor is not called.

- [ ] **Step 2: Add failing premium route assertions**

Read `app/premium/page.tsx` and require:

```ts
expect(page).toContain("LenisProvider");
expect(page).toContain("duration={1.25}");
expect(page).toContain("wheelMultiplier={0.85}");
expect(page).toContain("syncScrollTrigger");
```

- [ ] **Step 3: Run the provider and premium tests and verify RED**

Run: `npm test -- tests/lenis-provider.test.tsx tests/premium.test.tsx`

Expected: FAIL because the provider props and premium wrapper do not exist.

- [ ] **Step 4: Extend `LenisProvider` minimally**

Add optional props with existing defaults:

```ts
type LenisProviderProps = {
  children: ReactNode;
  duration?: number;
  wheelMultiplier?: number;
  syncScrollTrigger?: boolean;
};
```

Instantiate Lenis with `syncTouch: false`. When `syncScrollTrigger` is true, dynamically import GSAP and ScrollTrigger, register the plugin, subscribe `ScrollTrigger.update`, and refresh after initialization. Store the callback for cleanup and remove it before destroying Lenis.

- [ ] **Step 5: Wrap only the premium page**

```tsx
<LenisProvider duration={1.25} wheelMultiplier={0.85} syncScrollTrigger>
  <div className="premium-theme">...</div>
</LenisProvider>
```

- [ ] **Step 6: Run focused tests and verify GREEN**

Run: `npm test -- tests/lenis-provider.test.tsx tests/premium.test.tsx`

Expected: all provider and premium tests pass.

### Task 4: Verify the combined experience

**Files:**
- Verify: all files above

**Interfaces:**
- Consumes: Completed typography, transition, and Lenis tasks.
- Produces: A verified `/premium` experience ready for user review.

- [ ] **Step 1: Run static verification**

Run `npm run typecheck`, focused ESLint on changed TypeScript/test files, `git diff --check`, and `npm run build`.

- [ ] **Step 2: Run test verification**

Run `npm test -- tests/premium.test.tsx tests/lenis-provider.test.tsx`, then `npm test` to record already-known unrelated failures accurately.

- [ ] **Step 3: Verify in the browser**

At `1280×720`, confirm three hero title lines, clear crowd separation, Instrument Sans descriptions, a `150vh` transition range, synchronized Lenis wheel motion, full-bleed completion, and sticky release. At a mobile viewport, confirm the title fits, the transition range is `110vh`, and Lenis reports `syncTouch: false`.
