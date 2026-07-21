# Normal Cinematic Line-Art Hero

## Goal

Replace the centered, text-only `/normal` hero with a professional full-screen composition that feels cinematic and distinctive while keeping the page fast, readable, and aligned with the existing Atlas visual system.

## Scope

Change only the `/normal` hero and the styles and tests directly required by it. Preserve the navigation, all sections below the hero, the existing modal trigger, and the current page content outside the hero.

## Composition

The hero is a white, full-viewport canvas with an animated line-art student journey running as a background layer. The illustration is concentrated on the right and lower edges so the left side retains deliberate negative space for the message.

The foreground content is left-aligned and includes:

- A compact “The student operating system” eyebrow.
- The existing core promise, reformatted into a more editorial headline.
- A shorter supporting paragraph describing the apply, settle, and thrive journey.
- A dominant orange “Get started — free” modal trigger.
- A restrained “Explore the platform” link to the feature content.
- Compact proof copy: “£0 forever · 3-minute setup · No card”.

The content width and illustration composition must be coordinated so no critical line art passes behind the headline or controls at desktop sizes.

## Illustration and Motion

Implement the artwork as a code-native SVG rather than a raster video. It should read as a refined moving architectural sketch:

- A student is the principal figure on the right side.
- A single journey line connects representative moments for university matching, visa, housing, banking, SIM, community, and career support.
- Charcoal strokes provide the structure; Atlas orange is reserved for a few focal details and active waypoints.
- Motion is subtle and continuous: route drawing, small waypoint pulses, gentle object drift, and restrained changes in emphasis.
- Avoid floating dashboard cards, cartoon styling, gradients, heavy glow, stock imagery, or decorative motion that competes with the message.

The animation is decorative and must be hidden from assistive technology. It must not require JavaScript to remain visually coherent.

## Responsive Behavior

Desktop uses an asymmetric composition with copy occupying roughly the left 45% and the illustration occupying the remaining canvas. The hero uses a stable viewport-aware minimum height rather than relying on `h-screen` alone.

On smaller screens, the foreground copy remains at the top and the illustration is simplified and repositioned into the lower portion of the hero. The text must never overlap a high-contrast part of the artwork. CTAs stack when horizontal space is insufficient.

For `prefers-reduced-motion`, all illustration animation stops and the artwork remains as a polished static frame. Existing mobile safeguards that prevent hidden AOS content remain intact.

## Component Boundaries

Keep the implementation small:

- `Hero` owns the semantic section, content, and actions.
- A focused `StudentJourneyArtwork` component owns only the decorative SVG scene.
- `/normal` global styles own the animation keyframes, responsive composition, and reduced-motion overrides.

No new runtime dependency, animation library, media request, or reusable abstraction is required.

## Accessibility and Failure Behavior

- The hero retains one semantic `h1` and visible supporting copy.
- The primary CTA remains a keyboard-operable label for the existing modal toggle.
- The secondary CTA remains a real anchor to an existing page section.
- The SVG is decorative (`aria-hidden="true"`) and never contains essential information.
- If CSS animation is unavailable, the SVG renders as a complete static illustration.
- Visible focus states and adequate contrast are required for both actions.

## Verification

- Update focused hero tests to assert the new semantic structure, CTA destinations, decorative artwork, and removal of the previous airplane-orbit interaction.
- Add static assertions for the new animation and reduced-motion rules.
- Run the focused hero test, the `/normal` page regression tests, TypeScript validation, and the production build.
- Verify desktop and mobile layouts visually, checking title/artwork separation, CTA usability, viewport height behavior, and the reduced-motion static state.

