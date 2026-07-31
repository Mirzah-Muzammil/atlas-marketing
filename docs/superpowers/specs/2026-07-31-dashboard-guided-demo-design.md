# Atlas dashboard guided demo

## Goal

Turn the existing six-screen Atlas dashboard showcase into a guided product demo without reintroducing the removed marketing-caption slideshow. The interface itself should explain the product by moving through Dashboard, Journey, My type, Essentials, Career, and Jobs while calling attention to the most important content in each screen.

## Behavior

- Start on Dashboard when the showcase enters the page.
- Automatically advance through the six core views in their sidebar order every 4.5 seconds.
- Loop from Jobs back to Dashboard.
- Keep all six sidebar buttons clickable.
- Pause automatic advancement while the user hovers over the demo or focuses/interacts with controls inside it.
- After manual interaction ends, resume the loop from the currently selected view after a fresh 4.5-second interval.
- Close the Scholarship finder drawer when moving to another view. While the drawer is open, pause automatic advancement.
- If the user prefers reduced motion, do not autoplay or animate the emphasis treatment.

## Guided emphasis

Each view exposes one meaningful target with a shared `data-dashboard-demo-highlight` marker:

1. Dashboard: the Your tools area, showing that tools open inline and are pre-filled.
2. Journey: the current Offers stage and offer decision area.
3. My type: the student archetype profile that tunes the experience.
4. Essentials: the vetted, personalized partner results.
5. Career: the Graduate Route pathway.
6. Jobs: the visa-sponsor role filter and job results.

The active target receives a restrained orange border/glow and a soft background lift. The emphasis should be visible but must not obscure text or change layout. The active sidebar button remains the primary navigation indicator.

## Component design

Keep the current component structure. Add a small ordered view list and a single timer effect inside `Landing3DashboardShowcase`. Store pause state locally and reset the interval whenever the selected view or interaction state changes. Reuse the existing `navigate` function for both automatic and manual transitions so drawers close consistently.

Add semantic data attributes for tests and styling rather than introducing new component layers. No new dependency is required.

## Accessibility

- Preserve the existing buttons and `aria-current` state in the sidebar.
- Pause on focus within the demo so keyboard users are not interrupted.
- Respect `prefers-reduced-motion: reduce` by disabling autoplay and highlight animation.
- The highlight is supplemental; every screen remains understandable without color or motion.

## Tests

- With fake timers, verify the demo advances through all six views and loops to Dashboard.
- Verify manual navigation selects the requested view and restarts the interval from that view.
- Verify hover pauses advancement and leaving resumes it.
- Verify focus pauses advancement.
- Verify the active view exposes exactly one important highlighted target.
- Preserve the existing inline Scholarship finder behavior.

## Out of scope

- Recreating the old three marketing captions.
- Adding narration, cursor simulation, videos, or new dashboard routes.
- Changing the content or layout of the six existing product views.
