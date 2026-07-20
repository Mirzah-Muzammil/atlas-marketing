# Normal Hero Airplane Hover Design

## Scope

Replace the existing pulsing, horizontally translated `abroad.` hover treatment
in the `/normal` hero with an inline airplane SVG flight animation. Keep the
surrounding heading structure and copy unchanged.

## Interaction

- At rest, the line displays `abroad.` exactly as it does now.
- On pointer hover or keyboard focus, the visible text fades out and an
  Atlas-orange airplane SVG appears from the same position.
- The airplane tilts slightly and flies diagonally upward toward the right over
  1.2 seconds, then holds at its endpoint while the interaction remains active.
- When hover or focus ends, the airplane resets and `abroad.` becomes visible
  again, allowing the animation to replay.
- The animation does not change layout or move surrounding heading content.

## Accessibility

- Keep the literal `abroad.` text in the document and accessibility tree.
- Mark the airplane SVG as decorative with `aria-hidden="true"`.
- Support keyboard focus using a focusable wrapper and the same visual state as
  hover.
- Under `prefers-reduced-motion: reduce`, swap text for the airplane without
  translating or rotating it.

## Implementation

- Replace the current paragraph utility classes with a small named interaction
  class in `components/sections/hero.tsx`.
- Add the flight keyframes and hover, focus, and reduced-motion rules to
  `app/normal/globals.css`.
- Use an inline SVG so its stroke inherits the existing orange heading color and
  no additional image asset is required.

## Verification

- Add a focused regression that checks for the accessible text, decorative SVG,
  and named flight class.
- Run the regression before and after implementation to confirm the red-green
  cycle.
- Run lint, type-checking, and the production build.
- Verify hover reset and the no-motion fallback in a browser.
