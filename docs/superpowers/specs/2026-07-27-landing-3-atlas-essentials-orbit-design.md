# Landing 3 Atlas Essentials Orbit Design

## Goal

Add a new section after the services carousel on `/landing-3`, adapting Rainbow's “All the chains that matter in one place” composition and scroll behavior to Atlas content. The background must continue Landing 3's existing dark theme.

## Reference behavior

The reference uses a centered headline above a large square visual field. A circular group of many compact image tiles starts rotated 90 degrees and transforms as the section moves through the viewport. The motion is controlled by page scroll, not an autoplay loop. Desktop uses an 854px visual field with a 520px rotating group; smaller breakpoints use a full-width field with reduced tile dimensions.

## Atlas content

- Heading: “All the essentials that matter in one place”
- Tiles: University, Visa, Funding, Housing, Banking, Travel, Insurance, and Community
- The tile artwork will be code-native: concise labels and recognizable line icons, with restrained Atlas accent colors.

## Approaches considered

1. **Native scroll progress with a sticky viewport — selected.** A single client component reads the section's position in `requestAnimationFrame`, maps it to a normalized progress value, and applies transforms through CSS variables. This matches the reference's direct scroll response and keeps the dependency surface small.
2. **GSAP ScrollTrigger.** This could express pinning and scrubbing declaratively, but ScrollTrigger is not currently used by Landing 3 and would add registration and lifecycle complexity for one section.
3. **CSS scroll-driven animations.** This is the smallest implementation, but browser support and test control are less consistent than the existing browser targets require.

## Layout and motion

- The outer section is `240svh` on desktop and `190svh` below 810px.
- A `100svh` sticky stage centers the headline and an orbit field beneath it.
- Eight Atlas tiles are distributed around a circular track with two understated orbital rings.
- Scroll progress drives the orbit from a 90-degree entry rotation to its settled orientation, while the tile field scales from 0.78 to 1 and fades from 0 to 1.
- Each tile counter-rotates against the orbit so its icon and label remain upright.
- A 72px vertical translation and staggered opacity across the tiles create the layered arrival without introducing autoplay motion.
- The dark background remains `#050506`, with low-contrast white rings and dark graphite tiles so the section connects seamlessly with the existing page.
- Below 810px, the visual field is 700px tall and full width, the orbit group is 360px, tiles are 68px, and the headline is left-aligned to match the reference breakpoint.
- With reduced motion, the section renders at its completed state and does not bind scroll updates.

## Component boundary

Create `Landing3EssentialsOrbit.tsx` and render it after `Landing3ServicesSection` in `Landing3Hero`. The component owns only its content, scroll calculation, and visual presentation. No existing Landing 3 section will be refactored.

## Accessibility

- The heading is semantic and readable.
- The orbit artwork is decorative and hidden from assistive technology.
- The eight Atlas essentials are also exposed as a concise screen-reader-only list.
- Motion respects `prefers-reduced-motion`.

## Testing

- Component test: heading, eight Atlas labels, section marker, and decorative visual contract.
- Browser test: section order, desktop proportions, sticky stage, absence of horizontal overflow, and transform changes when the page scrolls through the section.
- Mobile browser test: no horizontal overflow and reduced orbit dimensions.
- Existing Landing 3 tests, TypeScript, and scoped lint must continue to pass.
