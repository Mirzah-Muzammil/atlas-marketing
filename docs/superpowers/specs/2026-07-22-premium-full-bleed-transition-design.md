# Premium Full-Bleed Transition Design

## Goal

Turn the section immediately after the `/premium` hero into a cinematic framed-to-full-screen sequence. The departure photo begins as a centered rounded box, expands to fill the viewport as the visitor scrolls, holds full-screen, reveals the title, and releases into the services introduction only after the sequence completes.

## Approved experience

- Use the existing departure photograph with `object-fit: cover`; slight edge cropping is acceptable.
- Keep the transition stage sticky instead of adding another GSAP pin. This preserves the current document flow and avoids extra scroll overhead.
- Begin with the frame at approximately 68% of the viewport width and 60% of its height, with rounded corners.
- During the first 65% of progress, animate the frame inset and corner radius to zero so it becomes edge-to-edge.
- Hold the completed full-screen photograph briefly, then reveal “The move starts now.” The title must not appear during the framed expansion.
- Use `220svh` on desktop and `200svh` on small screens so expansion, hold, and title reveal have distinct scroll phases.
- The services introduction remains after the transition container, so it cannot enter until the sticky sequence releases.
- Preserve the existing metadata, title, and scroll cue, with enough contrast to remain readable over the full-bleed image.
- On small screens, start from a less aggressive inset so the photograph remains legible before expansion.
- With reduced motion enabled, show the full-bleed static composition and visible title without scrubbed transforms.

## Implementation boundary

Change only the premium transition CSS, its GSAP transition timeline, and the related premium regression test. Do not redesign the hero, service chapters, or journey section.

## Verification

- Regression test asserts the initial framed state, zero-inset destination, delayed title reveal, and extended sticky scroll distance.
- Production build, TypeScript, and focused premium tests pass.
- Live browser verification confirms the image starts as a centered box, expands to fill the viewport, holds while the title appears, and releases before the services introduction.
