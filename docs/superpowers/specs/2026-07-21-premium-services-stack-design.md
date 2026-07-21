# Premium Services Stack Design

## Goal

Add a services section immediately after the `/premium` hero using the Skiper17 pinned card-stack interaction. Reuse the existing service copy and present it with illustrated artwork that matches the hero's navy, orange, off-white, and hand-drawn visual language.

## Design

- Keep `PremiumHero` unchanged and compose a separate `PremiumServices` section after it.
- Install the official `@skiper-ui/skiper17` registry component, then adapt its card model to accept a title, description, image, and image alt text.
- Source service titles and descriptions from `normalServices` rather than duplicating marketing copy.
- Place each title at the card's top-left and each description at the bottom-right, with contrast scrims that preserve artwork visibility.
- Use one illustrated service scene per card. Artwork contains no text and uses the premium hero's limited navy/orange/off-white palette.
- Keep the GSAP pinned stack on larger screens. On mobile and reduced-motion environments, render the same cards as a normal vertical sequence.

## Accessibility and verification

- The section has a labelled heading and readable semantic text independent of animation.
- Images have useful alt text; overlays retain sufficient contrast.
- Reduced motion removes pinned/rotating transitions without hiding content.
- Component tests cover placement, content reuse, card ordering, and reduced-motion hooks; the page is also verified in the running browser.
