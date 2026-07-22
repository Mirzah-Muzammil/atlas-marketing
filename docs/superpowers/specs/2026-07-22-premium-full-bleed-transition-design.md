# Premium Small-Frame Transition Restoration Design

## Goal

Restore the first small-frame transition that existed before the later committed variant, while leaving the hero performance optimization and every other premium section unchanged.

## Approved experience

- Restore the desktop transition height to `175svh` and the small-screen height to `155svh`.
- Begin the desktop frame at `clip-path: inset(31% 35% 31% 35% round 1.25rem)` and `scale(0.84)` so it reads as a deliberately small centered box.
- Keep the photograph at `object-fit: cover` inside the clipped frame so the people never escape the box during expansion.
- Scrub the frame to zero inset and `scale(1)` with `power2.inOut` easing.
- Keep “The move starts now” visible and centered over the frame from the first moment through the full expansion; do not animate its opacity, position, or scale.
- Restore the small-screen frame inset to `34% 16% 34% 16% round 1rem`.
- Use the recovered dark frame treatment and difference-blended white typography so the title remains readable over the photograph.
- Preserve the existing reduced-motion fallback.

## Considered approaches

1. **Recovered small frame with persistent title — selected.** Restores the earliest box size and pacing while applying the clarified requirement that the title is always visible.
2. Exact recovered intermediate state. This would restore the same box but would incorrectly fade the title in from zero opacity.
3. Shrink only the current frame. This is the smallest edit but would retain the later timing, image fit, and visual treatment the user rejected.

## Implementation boundary

Change only the premium transition CSS, its GSAP transition timeline, and the related premium regression test. Do not alter the hero canvas optimization, service chapters, or journey section.

## Verification

- Regression test asserts the recovered small-frame CSS and GSAP values and rejects a title opacity tween.
- Production build, TypeScript, and focused premium tests pass.
- Live browser verification confirms the small initial box, continuously visible title, contained people, full-screen expansion, and sticky release.
