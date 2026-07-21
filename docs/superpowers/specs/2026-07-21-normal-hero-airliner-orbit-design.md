# Normal Hero Airliner Orbit

## Scope

Change only the `/normal` hero interaction attached to “abroad.” Preserve the headline layout, copy, typography, mobile static-motion policy, and all other sections.

## Interaction

The headline remains stationary. On fine-pointer hover or keyboard focus of “abroad.”, the word fades, a top-view airliner launches from its position, completes one smooth orbit around the outside of the full headline, returns to the launch point, fades out, and restores the word. The sequence lasts about 2.6 seconds and does not loop until the user exits and re-enters the trigger.

## Aircraft

Replace the current outlined icon with a bespoke filled airliner silhouette: tapered fuselage, swept wings, compact tail plane, dark graphite body, and a restrained orange highlight. A small drop shadow provides separation without making the aircraft cartoon-like.

## Responsive and Accessible Behavior

Use the headline itself as the positioning context and animate percentage-based `left` and `top` coordinates so the orbit scales with the responsive title. Keep `abroad.` present in the DOM and keyboard focusable. For reduced motion, show only the unchanged word. Do not run the hover orbit on coarse-pointer mobile devices.

## Verification

Extend the existing airplane regression test to confirm the hero exposes a headline orbit context, uses the new filled silhouette and accent, and defines the orbit and word-return keyframes. Verify the trajectory visually in a desktop browser, then run the focused test, TypeScript check, and production build.
