# Normal Service Card Motion Design

## Goal

Make the “Every service you need, sorted.” card grid feel premium and interactive without replacing the section heading reveal or adding a JavaScript animation dependency.

## Interaction design

Each service card enters with its own staggered AOS reveal instead of sharing one reveal with its column. After entry, pointer hover gives the card a restrained three-dimensional lift, a deeper orange-tinted shadow, and an animated warm highlight that travels across the surface. The card image scales slightly while its service title and description move forward together.

The effect applies to all eight service cards, including the two horizontal cards in the bottom row. Existing copy, imagery, grid geometry, and heading animation remain unchanged.

## Implementation

Add focused class hooks to card containers, media wrappers, images, and copy blocks in `components/sections/industries.tsx`. Define the visual states and pseudo-element highlight in `app/normal/globals.css`. Keep the implementation CSS-only so it remains lightweight and does not require client-side pointer tracking.

Move AOS attributes from the three column wrappers to the six individual cards and calculate short delays from their column and row positions. Retain individual AOS attributes on the bottom two cards.

## Accessibility and responsive behavior

Hover transforms run only on devices that support hover and a fine pointer. Touch devices receive the staggered scroll reveal without sticky hover states. Under `prefers-reduced-motion`, service-card transitions and transforms are disabled while the content remains fully visible.

## Verification

Add a focused source test that covers all card hooks, individual stagger attributes, hover-capability scoping, image and copy motion, and reduced-motion fallback. Run the focused test, TypeScript check, and production build.
