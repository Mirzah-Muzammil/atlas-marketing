# Premium Lenis Smooth Scroll Design

## Goal

Add smooth wheel and trackpad scrolling to `/premium` while preserving native touch behavior and keeping every GSAP ScrollTrigger synchronized.

## Selected approach

Reuse the existing `LenisProvider` through a small optional configuration surface rather than creating a second route-specific Lenis implementation. Add options for premium pacing and ScrollTrigger synchronization; existing consumers retain their current defaults.

Wrap only the `/premium` page content with the configured provider. Use a restrained duration and wheel multiplier so scrolling feels fluid rather than delayed.

## GSAP synchronization

When ScrollTrigger synchronization is enabled:

- dynamically load GSAP and ScrollTrigger with Lenis;
- register ScrollTrigger;
- subscribe `ScrollTrigger.update` to Lenis scroll events;
- refresh ScrollTrigger after Lenis initializes;
- unsubscribe, cancel the animation frame, and destroy Lenis during cleanup.

Keep the existing requestAnimationFrame driver. Do not create a second ticker or animation loop.

## Input and accessibility behavior

- Smooth mouse-wheel and trackpad input on `/premium`.
- Keep touch scrolling native by leaving Lenis touch synchronization disabled.
- Skip Lenis completely when `prefers-reduced-motion: reduce` is active.
- Preserve keyboard, anchor, and skip-link behavior.
- Do not apply Lenis to other routes through the root layout.

## Integration constraints

- The 2× slower transition remains controlled by its `250svh` desktop and `210svh` mobile scroll distances.
- Lenis must not alter the small-frame start, persistent title, frame easing, or sticky release.
- The premium typography refresh remains independent of the scrolling provider.

## Verification

- A provider regression verifies premium-only configuration, ScrollTrigger synchronization, reduced-motion bypass, and cleanup.
- Browser checks confirm smooth wheel scrolling, native mobile touch configuration, and synchronized hero/transition animations.
- Premium tests, motion tests, typecheck, focused lint, and production build pass, apart from already-known unrelated repository failures.
