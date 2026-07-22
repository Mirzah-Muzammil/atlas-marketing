# Atlas Concierge Correspondence Desk Design

**Date:** 2026-07-22
**Route:** `/landing#concierge`
**Status:** Approved for implementation

## Goal

Replace the current conventional copy-and-dashboard Concierge section with a completely different, human-first editorial scene. The new chapter should feel like opening a private correspondence folio: premium, personal, and tactile, while retaining the existing Concierge facts and conversion destination.

## Considered directions

1. **Correspondence desk — selected.** A dark tabletop contains a personal letter, a journey dossier, a stitched itinerary, and a detachable price ticket. This creates the strongest human contrast with the product dashboard above and uses the reference video's editorial folio language without imitating it literally.
2. **Full-bleed specialist portrait.** Emotionally immediate, but dependent on a suitable portrait asset and more likely to resemble a generic agency testimonial.
3. **Live itinerary interface.** Clear and functional, but too close to the current app panel and therefore not a complete visual rework.

## Visual concept

The chapter becomes a full-width midnight tabletop with subtle green-black falloff, paper grain, registration marks, and a thin Atlas-blue thread moving through the composition.

The top of the section carries a restrained label and the new headline:

> One person. Every moving part.

Below it, two physical artifacts overlap:

- A warm-paper letter from Anika, set in large serif text, with a handwritten-style signature, date, and a small specialist identity seal.
- A pale-blue journey dossier containing four numbered stages: shortlist, applications, visa and documents, and arrival. The active stage is marked with a coral tab rather than an app-style selected row.

A lime price ticket is attached to the dossier edge. It contains `£1,500`, `one-time · end to end`, and the `Meet Concierge` mail link. The ticket is visually and semantically part of the conversion path, not decorative metadata.

## Content

The section retains these product truths:

- An assigned specialist named Anika Mehta.
- Applications, visa, accommodation, and arrival support.
- One-time price of £1,500.
- Four visible journey stages.
- A direct Concierge email CTA.

The supporting message changes to a personal note:

> I keep the whole move in view — the application you are editing today, the visa evidence you will need next, and the room you will arrive to.

The former simulated notification list, online badge, and chat bubble are removed.

## Motion

Motion reinforces the act of opening correspondence:

- The letter enters from the lower left with a slight counter-clockwise rotation.
- The dossier enters from the lower right with a smaller clockwise rotation.
- The connecting thread draws across the scene as the section reaches the viewport.
- The price ticket lifts by a few pixels on hover or keyboard focus.

All elements are visible before enhancement. Reduced-motion mode removes transforms, drawing animation, and staged timing.

## Responsive behavior

Desktop uses an overlapping two-artifact composition with the letter slightly in front. Mobile stacks the headline, letter, dossier, and ticket in document order with no rotation. Text remains readable without horizontal scrolling, and the CTA keeps a minimum 44-pixel target.

## Architecture

The change remains inside the existing landing route:

- Update the Concierge markup in `components/landing/LandingExperience.tsx`.
- Replace only the `.land-concierge*` rules in `app/landing/landing.css`.
- Extend the existing GSAP context with three Concierge reveal targets.
- Update `tests/landing.test.tsx` and `e2e/landing.spec.ts` to verify the new content and responsive conversion target.

No new component, state, dependency, image asset, or global style is required.

## Accessibility and resilience

- Preserve the section `h2`, mail link, ordered journey stages, and readable static DOM order.
- Treat seals, thread, paper clips, registration marks, and ticket perforations as decorative.
- Maintain focus-visible styling and minimum touch target sizes.
- With JavaScript disabled, the letter and dossier remain fully visible.
- With reduced motion enabled, all transforms resolve to their final state.

## Verification

Completion requires:

- The former dashboard panel, online badge, and chat bubble are absent.
- The new headline, Anika letter, four journey stages, price, and CTA render semantically.
- The Concierge CTA still points to `mailto:hello@atlas.study?subject=Atlas%20Concierge`.
- Desktop shows a composed correspondence desk without clipping.
- Mobile stacks cleanly without horizontal overflow.
- Reduced-motion and no-JavaScript modes keep the section readable.
- Focused unit tests, typecheck, production build, and landing Playwright checks pass.
