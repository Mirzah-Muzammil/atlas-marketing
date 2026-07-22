# Premium Small-Frame Transition Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the earliest small-box post-hero transition while keeping its title visible throughout the expansion.

**Architecture:** Keep the existing premium markup and data hooks. Replace only the transition-specific CSS and GSAP frame tween, then lock the recovered values and persistent-title behavior with the existing focused premium source regression.

**Tech Stack:** Next.js 15, React, CSS, GSAP ScrollTrigger, Vitest

## Global Constraints

- Desktop starts at `inset(31% 35% 31% 35% round 1.25rem)` and `scale(0.84)` over `175svh`.
- Small screens start at `inset(34% 16% 34% 16% round 1rem)` over `155svh`.
- The people remain clipped inside an `object-fit: cover` image frame until the frame reaches full bleed.
- “The move starts now” is visible from the first frame and has no GSAP opacity, translation, or scale tween.
- Do not alter `components/ui/skiper-ui/skiper39.tsx`, service chapters, the journey section, or the image source.
- Leave implementation changes uncommitted.

---

### Task 1: Restore the small-frame transition

**Files:**
- Modify: `tests/premium.test.tsx`
- Modify: `app/premium/globals.css`
- Modify: `components/premium/PremiumCinematicMotion.tsx`

**Interfaces:**
- Consumes: Existing `data-premium-hero-transition`, `data-premium-transition-frame`, and `data-premium-transition-title` DOM hooks.
- Produces: A scroll-scrubbed frame expansion with a persistent title and unchanged downstream premium content.

- [ ] **Step 1: Write the failing regression assertions**

Replace the current transition assertions with checks for the recovered `175svh`/`155svh` heights, `31% 35%`/`34% 16%` insets, `scale(0.84)`, `object-fit: cover`, and the absence of a `transitionTitle` GSAP tween:

```ts
expect(css).toMatch(
  /\.premium-services__transition\s*\{[\s\S]*?height: 175svh/,
);
expect(css).toContain(
  "clip-path: inset(31% 35% 31% 35% round 1.25rem)",
);
expect(css).toMatch(
  /\.premium-services__transition-frame img\s*\{[\s\S]*?object-fit: cover/,
);
expect(css).toMatch(
  /@media \(max-width: 720px\)[\s\S]*?\.premium-services__transition\s*\{ height: 155svh; \}/,
);
expect(css).toContain(
  "clip-path: inset(34% 16% 34% 16% round 1rem)",
);
expect(motion).toContain(
  'clipPath: "inset(31% 35% 31% 35% round 1.25rem)"',
);
expect(motion).toContain("scale: 0.84");
expect(motion).not.toMatch(/\.fromTo\(\s*transitionTitle/);
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/premium.test.tsx`

Expected: FAIL because the current code still uses the later `160svh`, `18% 12%`, `scale(0.96)`, `object-fit: contain`, and title-reveal variant.

- [ ] **Step 3: Restore the recovered CSS**

Use the recovered transition values:

```css
.premium-services__transition { height: 175svh; }
.premium-services__transition-frame {
  background: var(--premium-ink);
  clip-path: inset(31% 35% 31% 35% round 1.25rem);
  transform: scale(0.84);
}
.premium-services__transition-frame img {
  object-fit: cover;
  filter: saturate(0.78) contrast(1.05);
}
.premium-services__transition-frame > span {
  display: block;
  background: linear-gradient(180deg, rgb(17 24 39 / 0.08), rgb(17 24 39 / 0.52));
}
.premium-services__transition-title {
  color: var(--premium-white);
  mix-blend-mode: difference;
}
```

Set the small-screen height to `155svh` and inset to `34% 16% 34% 16% round 1rem`. Keep the reduced-motion title fully visible.

- [ ] **Step 4: Restore only the recovered frame tween**

Keep the current ScrollTrigger configuration but use this frame timeline and remove the title `.fromTo` call:

```ts
.fromTo(
  transitionFrame,
  {
    clipPath: "inset(31% 35% 31% 35% round 1.25rem)",
    scale: 0.84,
  },
  {
    clipPath: "inset(0% 0% 0% 0% round 0rem)",
    scale: 1,
    ease: "power2.inOut",
  },
  0,
);
```

- [ ] **Step 5: Verify the implementation**

Run: `npm test -- tests/premium.test.tsx`

Expected: 11 tests pass.

Run: `npm run typecheck`

Expected: exit 0.

Run: `npm run build`

Expected: exit 0 apart from known non-blocking lint warnings in unrelated files.

Inspect `http://localhost:3000/premium` at desktop and mobile widths. Confirm the title is visible before scrolling, the people remain inside the small box during the expansion, the frame reaches full bleed, and the sticky stage releases into the next section.
