# Premium Transition Pacing Design

## Goal

Make the second `/premium` section’s small-frame expansion feel approximately twice as slow without changing its visual choreography.

## Selected approach

Increase the sticky transition section’s scroll distance. Set the desktop height from `175svh` to `250svh`, changing the animated distance from `75vh` to `150vh`. Set the small-screen height from `155svh` to `210svh`, changing the animated distance from `55vh` to `110vh`.

This produces a true 2× pacing change because the existing ScrollTrigger runs from `top top` to `bottom bottom`. Do not increase GSAP scrub lag or add an artificial hold phase.

## Preserved choreography

- Keep the desktop starting frame at `inset(31% 35% 31% 35% round 1.25rem)` and `scale(0.84)`.
- Keep the mobile starting frame at `inset(34% 16% 34% 16% round 1rem)`.
- Keep the title visible and stationary throughout.
- Keep the people clipped inside the frame until it reaches full bleed.
- Keep the `power2.inOut` frame easing and zero-inset destination.
- Do not change the hero, crowd canvas, typography work, service chapters, or journey section.

## Verification

- The focused premium regression requires `250svh` desktop and `210svh` mobile heights.
- Browser measurements confirm the transition’s effective scroll distance is `150vh` on desktop and `110vh` on mobile.
- The frame still starts small, reaches full bleed, and releases into the next section.
- Premium tests, typecheck, focused lint, and production build pass.
