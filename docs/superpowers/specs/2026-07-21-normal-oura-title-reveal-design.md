# Normal Page Oura-Style Title Reveal Design

## Goal

Give every title on `/normal` the same soft-focus reveal observed on Oura's homepage while preserving the current AOS animations on sections, cards, images, descriptions, and controls.

## Observed reference behavior

On Oura, an entering title begins faint and visibly blurred, then resolves to full opacity and sharp focus over roughly 1.2–1.4 seconds. The reveal begins as soon as the title enters the viewport, without a visible waiting period or slide motion. The title is animated as one typographic unit rather than word by word.

## Scope

- Apply the new reveal to the `/normal` hero title and all rendered `h2`, `h3`, and footer `h4` title labels.
- Preserve existing AOS attributes on parent components and card wrappers.
- Do not apply artificial delays to titles.
- Keep non-title content on its existing AOS behavior.
- Honor `prefers-reduced-motion` by showing titles immediately without blur animation.

## Design

Create a small client-side `AnimatedTitle` component with a polymorphic `as` prop for `h1` through `h4`. It renders semantic heading markup, observes itself with `IntersectionObserver`, and adds a revealed state the first time it enters the viewport. The CSS starts the title at low-but-visible opacity with a moderate blur and resolves both properties using a smooth 1.3-second easing curve.

The component will be used directly at each content-heading site. Existing AOS remains on surrounding wrappers, so cards and sections retain their current movement while the heading itself gets the independent focus reveal. The hero's current visual title container will become a semantic `h1`, with its internal block elements adjusted to valid inline heading content.

## Verification

- A focused component test will verify semantic tag selection, observer-triggered reveal, and reduced-motion-safe markup.
- A `/normal` coverage test will verify that the hero, section, card, empty-state, and footer title sites use `AnimatedTitle`, while existing card/component AOS attributes remain present.
- Run the focused tests, TypeScript check, and production build.
