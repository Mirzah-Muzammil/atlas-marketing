# Premium Original Transition Restoration Design

## Goal

Restore the section immediately after the `/premium` hero to the exact transition behavior shipped in commit `87ce35c`, while leaving the hero performance optimization and every other premium section unchanged.

## Approved experience

- Restore the desktop transition height to `160svh` and the small-screen height to `145svh`.
- Restore the frame to `clip-path: inset(18% 12% 18% 12% round 1.25rem)` and `scale(0.96)`.
- Restore the photograph to `object-fit: contain` with no independent image-scale tween.
- Scrub the frame to zero inset and `scale(1)` with `power2.inOut` easing.
- Reveal “The move starts now” during the expansion from `autoAlpha: 0.28`, `y: 72`, and `scale: 0.94`, beginning at timeline position `0.12`.
- Restore the small-screen frame inset to `20% 5% 20% 5% round 1rem`.
- Preserve the existing reduced-motion fallback from the original implementation.

## Implementation boundary

Change only the premium transition CSS, its GSAP transition timeline, and the related premium regression test. Do not alter the hero canvas optimization, service chapters, or journey section.

## Verification

- Regression test asserts the exact original CSS and GSAP values from commit `87ce35c`.
- Production build, TypeScript, and focused premium tests pass.
- Live browser verification confirms the contained framed image, simultaneous title reveal, and original scroll pacing are restored.
