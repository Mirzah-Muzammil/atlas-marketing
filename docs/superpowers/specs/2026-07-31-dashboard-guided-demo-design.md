# Atlas dashboard guided demo

## Goal

Turn the existing six-screen Atlas dashboard showcase into a guided product demo without reintroducing the removed marketing-caption slideshow. The interface itself should explain the product by moving through Dashboard, Journey, My type, Essentials, Career, and Jobs while calling attention to the most important content in each screen.

## Behavior

- Start on Dashboard when the showcase enters the page.
- Automatically demonstrate the six core views in their sidebar order.
- Loop from Jobs back to Dashboard.
- Keep all six sidebar buttons clickable.
- Pause automatic advancement while the user hovers over the demo or focuses/interacts with controls inside it.
- After manual interaction ends, resume the loop from the currently selected view with a fresh sequence.
- Close the Scholarship finder drawer when moving to another view. A manually opened drawer pauses automatic advancement; the automated walkthrough closes its demo drawer before continuing.
- If the user prefers reduced motion, do not autoplay or animate the emphasis treatment.

## Cursor walkthrough

The automatic demo uses one visible mouse pointer that behaves like a student using Atlas instead of switching screens without explanation. Each view follows the same four-phase rhythm:

1. Move the pointer to the next sidebar item.
2. Show a short press state and click ripple; switch to that view at the click.
3. Move the pointer to the view's most important action or content region.
4. Click that target, show a small meaningful response, then continue to the next sidebar item.

The pointer uses a familiar white arrow shape with a dark outline and orange click ripple. It moves with smooth transform animation and never obscures the target label. The whole view takes roughly six seconds: about 1.1 seconds to reach the sidebar, 0.35 seconds for the click, 1.2 seconds to reach the in-page target, 0.35 seconds for the click, and roughly three seconds to show the result.

The in-page clicks produce restrained, view-specific feedback:

- Dashboard: click Scholarships and briefly open the existing Scholarship finder drawer.
- Journey: click the Manchester offer and mark it visually as selected for comparison.
- My type: click the archetype profile and reveal its priorities emphasis.
- Essentials: click the recommended scholarship partner and mark it selected.
- Career: click the Graduate Route pathway and advance emphasis to its next step.
- Jobs: click Visa sponsor only and show the results as filtered.

These are demo-only visual states inside the showcase. They do not navigate away, submit data, or trigger email links.

## Guided emphasis

Each view exposes one meaningful target with a shared `data-dashboard-demo-highlight` marker and a stable `data-dashboard-demo-target` value for cursor positioning:

1. Dashboard: the Your tools area, showing that tools open inline and are pre-filled.
2. Journey: the current Offers stage and offer decision area.
3. My type: the student archetype profile that tunes the experience.
4. Essentials: the vetted, personalized partner results.
5. Career: the Graduate Route pathway.
6. Jobs: the visa-sponsor role filter and job results.

The active target receives a restrained orange border/glow and a soft background lift. The emphasis should be visible but must not obscure text or change layout. The active sidebar button remains the primary navigation indicator.

## Component design

Keep the current component structure. Replace the simple interval with a small phase-driven timeout sequence inside `Landing3DashboardShowcase`. Store the current view, cursor phase, and demo-only response state locally. Reuse the existing `navigate` function for manual transitions and reset the automatic sequence from the manually selected view.

Position the pointer relative to the demo surface by reading the bounding rectangles of stable sidebar and target elements at phase boundaries. Recalculate at each move so responsive layouts stay aligned. Add semantic data attributes for tests and styling rather than introducing a new animation dependency.

## Accessibility

- Preserve the existing buttons and `aria-current` state in the sidebar.
- Pause on focus within the demo so keyboard users are not interrupted.
- Mark the simulated pointer and click ripple `aria-hidden="true"`.
- Respect `prefers-reduced-motion: reduce` by disabling autoplay, cursor motion, and highlight animation.
- The highlight is supplemental; every screen remains understandable without color or motion.

## Tests

- With fake timers, verify each view progresses through sidebar-click and target-click phases before advancing, then loops to Dashboard.
- Verify the simulated cursor reports the correct sidebar and in-page target for every view.
- Verify each target click produces the intended demo-only response state.
- Verify manual navigation selects the requested view and restarts the interval from that view.
- Verify hover pauses advancement and leaving resumes it.
- Verify focus pauses advancement.
- Verify the active view exposes exactly one important highlighted target.
- Preserve the existing inline Scholarship finder behavior.

## Out of scope

- Recreating the old three marketing captions.
- Adding narration, videos, or new dashboard routes.
- Changing the content or layout of the six existing product views.
