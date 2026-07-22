# Premium Full-Bleed Transition Design

## Goal

Turn the section immediately after the `/premium` hero into a full-viewport cinematic pause. The departure photo must fill the viewport edge to edge, remain in place while the visitor scrolls through the transition, and release into the services introduction only after the transition completes.

## Approved experience

- Use the existing departure photograph with `object-fit: cover`; slight edge cropping is acceptable.
- Keep the transition stage sticky instead of adding another GSAP pin. This preserves the current document flow and avoids extra scroll overhead.
- Give the transition approximately one viewport of scroll travel beyond its visible viewport. During that travel, scrub a restrained image scale and title reveal.
- The services introduction remains after the transition container, so it cannot enter until the sticky sequence releases.
- Preserve the existing metadata, title, and scroll cue, with enough contrast to remain readable over the full-bleed image.
- On small screens, retain the same full-bleed behavior with a slightly shorter scroll distance.
- With reduced motion enabled, keep the full-bleed static composition and normal document flow without scrubbed transforms.

## Implementation boundary

Change only the premium transition CSS, its GSAP transition timeline, and the related premium regression test. Do not redesign the hero, service chapters, or journey section.

## Verification

- Regression test asserts full-bleed image treatment and the extended sticky scroll distance.
- Production build, TypeScript, and focused premium tests pass.
- Live browser verification confirms the image fills the viewport, remains sticky through the scroll phase, and releases before the services introduction.
