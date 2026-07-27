# Landing 3 Supported by Atlas — Design

## Goal

Add an Atlas-content support section directly after the Landing 3 essentials orbit. Reproduce the layout, scale, layering, and scroll response of Rainbow's “Controlled by you / Supported by us” panel while preserving Landing 3's current near-black background and visual language.

## Reference observations

- The reference is a single wide, softly rounded panel following a two-column feature row.
- Desktop content is split asymmetrically: compact copy occupies the left third while overlapping testimonial pills fill the right two-thirds.
- The heading is two stacked heavy lines. Its first line has a warm highlight behind the text.
- Five testimonial pills use orange, pink, violet, blue, and red gradients. They overlap, use slightly different rotations, and extend near the panel edges.
- Scrolling introduces the pills with staggered horizontal translation, small rotation changes, and different vertical travel, producing layered parallax rather than a generic fade-in.
- The settled section is approximately one viewport tall on desktop and becomes a vertically stacked composition on narrow screens.

## Atlas content

- Heading: “Controlled by you. Supported by Atlas.”
- Body: “Your decisions stay yours. Atlas gives you the guidance, tools, and people to move forward with confidence.”
- Support line: “Real support, whenever you need it.”
- Testimonials:
  - “Atlas helped me turn a confusing application into a clear plan.”
  - “I always knew what to do next.”
  - “Real answers, exactly when I needed them.”
  - “The fastest, most thoughtful support throughout my move.”
  - “It felt like having someone in my corner from day one.”

## Component design

Create `Landing3SupportSection`, a client component rendered immediately after `Landing3EssentialsOrbit` in `Landing3Hero`.

The outer section keeps `#050506`. A centered panel uses a subtly lighter charcoal surface, large rounded corners, low-contrast border, clipped overflow, and restrained violet/cyan ambient gradients. The left copy block contains a small support icon, the two-line heading, descriptive copy, and the support promise. The right visual contains five absolutely positioned testimonial pills with individual gradient, rotation, width, and scroll offsets.

On mobile, the panel becomes a single column. Copy remains first and the testimonial composition uses a shorter fixed visual stage below it. Pills retain their layered angles but use narrower widths and smaller typography to avoid horizontal page overflow.

## Motion

The section reads its viewport progress on scroll using one passive listener and one `requestAnimationFrame` update, following the existing essentials-orbit pattern. Each pill maps the same progress through a small per-pill delay, then interpolates from its own horizontal/vertical offset and entry rotation to its settled transform. Opacity changes only enough to avoid hard clipping at first entry; the primary effect is motion and parallax.

With `prefers-reduced-motion: reduce`, all pills render in their final settled positions and no scroll listener is installed.

## Testing

- Component test asserts Atlas heading, body, support line, and all testimonials.
- Browser test asserts the section follows the essentials orbit, has reference-scale desktop geometry, changes pill transforms as it scrolls into view, honors reduced motion, and never creates horizontal page overflow on desktop or mobile.
- Run focused Vitest, Landing 3 Edge desktop/mobile tests, TypeScript, scoped ESLint, and a production build.

## Scope

No Rainbow copy, imagery, or source assets are reused. No unrelated Landing 2 or Premium files are changed. The implementation stays local to Landing 3 and uses the project's existing Tailwind, React, and Lucide dependencies.
