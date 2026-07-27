# Landing 3 Readiness Section Design

## Goal

Add the next `/landing-3` section as a close UI and motion adaptation of Raycast's “It’s not about saving time” section while using only Atlas-specific content.

## Placement and Scope

The section appears immediately after `Landing3DashboardShowcase`. This iteration adds only the readiness section and does not recreate later Raycast sections. Existing hero, shader, dashboard showcase, and unrelated routes remain unchanged except for composing the new section.

## Content

- Primary line: “It’s not just about getting in.”
- Secondary line: “It’s about being ready for everything after.”
- CTA: “Start your Atlas”
- CTA destination: `mailto:hello@atlas.study?subject=Atlas%20early%20access`
- Feature tile 1: “Clear. Every next step.”
- Feature tile 2: “Personal. Built around you.”
- Feature tile 3: “Connected. Application to arrival.”
- Feature tile 4: “Reliable. Guidance you can trust.”
- Background key labels use Atlas journey concepts such as Apply, Visa, Bank, Home, and Jobs.

## Desktop Visual Design

The section continues the near-black Landing 3 canvas and is approximately 700px tall at desktop sizes. A centered container approximately 1170px wide uses a 40/60 two-column split.

The left column sits vertically centered. Its heading is approximately 20px, medium-to-semibold weight, and tightly spaced. The primary line is bright white. The secondary line is muted charcoal-gray and wraps naturally within a narrow measure. A compact white CTA sits below the heading with the same rounded, restrained treatment as the Raycast reference.

The right column contains a large keyboard-like grid that extends beyond the visible composition and is masked at every edge. Keys use very dark surfaces, thin borders, rounded corners, and low-contrast Atlas journey labels. Four raised feature tiles sit above the grid in the same staggered arrangement as the reference: two across the upper middle and two across the lower middle. Active tiles have slightly brighter borders and text, while surrounding keys remain subdued. A restrained blue-black radial glow provides depth without introducing a new color system.

## Responsive Design

Below the desktop breakpoint, the section becomes a single column. The heading and CTA remain left-aligned, followed by a proportionally scaled visual. The grid keeps its masked atmosphere, and the four feature tiles remain readable in a two-column layout. At the narrowest mobile width, tile copy may wrap while the section must not cause horizontal scrolling.

## Architecture

- Create `components/landing-3/Landing3ReadinessSection.tsx` as a client component owning the section, motion, keyboard grid, feature tiles, and CTA.
- Modify `components/landing-3/Landing3Hero.tsx` only to render `Landing3ReadinessSection` after `Landing3DashboardShowcase`.
- Use `lucide-react` icons already installed in the project.
- Use the existing GSAP dependency with `IntersectionObserver` for a one-time staged entrance.
- Use Tailwind utilities for structure and visual styling. No new dependency or global stylesheet is required.

## Motion and Accessibility

When the section first intersects the viewport, the copy fades upward, the background grid fades and scales from roughly 97%, and the four raised tiles enter upward with a short stagger. The motion is one-time and restrained; it does not continuously loop. When `prefers-reduced-motion: reduce` matches, every element renders directly in its final visible state.

The heading remains a semantic `h2`, the CTA is keyboard accessible, and the four tiles form an accessible list. The keyboard grid is decorative and hidden from assistive technology. Opacity animation must not use `visibility:hidden`, so semantic content remains in the accessibility tree before intersection.

## Verification

- Component tests verify exact Atlas copy, CTA destination, four feature tiles, and the decorative grid marker.
- Existing Landing 3 hero, shader, and dashboard showcase tests continue to pass.
- Edge browser tests verify placement after the dashboard showcase, desktop proportions, responsive stacking, and no horizontal overflow.
- Type checking, focused linting, and a production build pass.
- Desktop and mobile screenshots are compared against the live Raycast reference for column proportions, heading size, tile placement, masking, contrast, and final animation state.

## Non-Goals

- Copying Raycast product claims or download messaging.
- Building an interactive keyboard.
- Adding continuous carousel or looping tile animations.
- Modifying the global Landing 3 navigation behavior.
- Recreating the next Raycast section.
