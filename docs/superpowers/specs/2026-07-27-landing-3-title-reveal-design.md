# Landing 3 Title Reveal Design

## Goal

Give every primary Landing 3 section title the same one-time blur-and-opacity reveal used by the `/normal` page while keeping the two page implementations independent.

## Scope

Create a Landing 3-specific copy of the Normal page's `AnimatedTitle` component and apply it to exactly seven primary headings:

1. Hero
2. Dashboard showcase
3. Readiness
4. Services
5. Essentials orbit
6. Support reviews
7. FAQ

Do not animate service-card headings, testimonial names, FAQ questions, navigation labels, or footer column headings.

## Component behavior

`Landing3AnimatedTitle` accepts the same `as`, `className`, and native heading attributes as the Normal component. It renders the requested semantic tag, starts with `data-landing-3-title-reveal="pending"`, and switches once to `visible` when at least 15% of the title intersects the viewport. If `IntersectionObserver` is unavailable, the title becomes visible immediately.

The copied CSS starts titles at 22% opacity with a 12px blur, then transitions both properties over 1.3 seconds with `cubic-bezier(0.22, 1, 0.36, 1)`. Reduced-motion users see titles immediately with no transition.

## Integration

Replace only each section's primary `h1`, `h2`, or `h3` element with `Landing3AnimatedTitle`, preserving the original semantic level, accessible name, children, data attributes, and visual classes. Existing section-level GSAP animation remains responsible for layout and media motion; the copied component adds only the title blur/opacity reveal.

## Verification

Component tests verify pending-to-visible behavior, observer cleanup, fallback behavior, and semantic tag preservation. Landing 3 integration tests verify exactly seven animated titles and the expected accessible heading names. Desktop and mobile browser tests verify that titles settle visible and reduced-motion mode disables the reveal transition.

