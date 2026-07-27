# Landing 2 Text Motion and Smooth Scroll Design

## Goal

Make the semantic copy feel choreographed with the footage instead of fading as one flat block. Add smooth wheel scrolling for `/landing-2` while preserving native touch behavior, deterministic reverse scrubbing, accessibility, and reduced-motion behavior.

## Text Reveal

Headlines use a word-by-word reveal. Each word remains real HTML, clips inside a small vertical mask, rises approximately `0.65em`, fades in, and resolves from a restrained blur. The reveal is staggered across each line of copy but completes early enough to leave a readable hold.

The kicker, headline, body, facts, and CTA use separate timing bands so the hierarchy reads in that order. Scrolling upward reverses the same calculated state. Parent panels retain only a light opacity envelope; the visible motion comes from the words rather than a large block translation.

Assistive technology receives the original sentence once through an `aria-label`; visual word wrappers are hidden from the accessibility tree. Reduced motion removes clipping, blur, stagger, and translation so all words remain immediately visible.

## Smooth Scrolling

The existing `LenisProvider` is mounted by `/landing-2/page.tsx` with route-specific duration and wheel multiplier values. No shared provider code is changed. Lenis smooths wheel input and leaves touch input native because `syncTouch` is already disabled. Its existing reduced-motion guard prevents initialization when motion reduction is requested.

The cinematic timeline stops applying its own inertial easing and follows actual scroll position directly. This avoids double smoothing: Lenis owns wheel interpolation, while the frame sequence remains a deterministic projection of the current scroll position. Native touch and reduced-motion scrolling remain immediate and reversible.

## Scope

Changes are limited to `app/landing-2`, `components/landing-2`, and landing-2-focused tests and documentation. No shared component, other route, dependency, or generated frame is modified. No commit is created.

