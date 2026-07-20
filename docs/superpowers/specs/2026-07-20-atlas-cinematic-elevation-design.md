# Atlas Cinematic Homepage Elevation — Design Specification

## Objective

Elevate the three existing Atlas homepages without replacing their routes, content strategy, or strongest sections. The redesign must turn each route into a connected, premium narrative while preserving product clarity, conversion paths, accessibility, and performance.

The creative hierarchy is intentional:

1. **Orbit** is the flagship award-oriented experience.
2. **Horizon** is the cinematic, conversion-led experience.
3. **Dispatch** is the experimental editorial experience.

The three routes must not become equally loud or share a common section template. They share Atlas branding and quality standards, but each has its own motion grammar and purpose.

## Audit findings

The rendered routes and existing motion implementation show the same structural problem: motion is currently isolated rather than connective.

- Horizon has a strong hero and an excellent “One Connected Journey” sequence, but later sections fall back to familiar product previews, card rows, resource links, and a conventional form CTA.
- Dispatch has the strongest typography and art direction, but its pinned horizontal chapter rail is the only sustained cinematic device. Later sections become mostly static editorial lists.
- Orbit creates the best first impression and has a strong “Ready for Liftoff” ending, but its middle becomes a sequence of familiar cards, grids, and timelines. The spatial metaphor stops evolving after the hero.
- Existing shared reveals are short blur-and-fade entrances. They do not create scene transitions or carry visual material between sections.
- Existing pointer and Three.js motion is global and decorative rather than tied to specific narrative beats.

The redesign must therefore establish a persistent visual motif on each route and transform it as the user moves through the page.

## Reference synthesis

The references were reviewed for principles rather than components or layouts.

- Visa Center demonstrates how a loader can introduce the visual language, how one image shape can survive between scenes, and how large typography can coexist with useful detail.
- Steven demonstrates the impact of a focused introduction, a single memorable graphic gesture, and deliberately sparse pacing.
- MindMarket demonstrates youthful confidence through distinctive illustration, large type, and a hero asset that continues into the next scene.
- Squarespace demonstrates clear hierarchy, cinematic media, and controlled movement from aspiration into product explanation.
- ReactBits and Aceternity demonstrate useful primitives—animated fields, spotlights, masks, magnetic response, beams, perspective, and text reveals—but Atlas must compose original systems rather than reproduce showcase components.

Premium quality comes from continuity, pacing, and hierarchy—not from maximizing the number of effects.

## Shared cinematic system

### Loading behavior

Each route receives a distinct loader that visually produces the first hero frame.

- The full loader runs only on the first route entry in a session.
- Subsequent route visits use a short transition rather than replaying the complete introduction.
- The loader never waits for an artificial percentage. It completes when critical hero assets and animation setup are ready.
- Reduced-motion mode replaces kinetic sequences with a short opacity transition.
- Content remains server-rendered and accessible underneath the presentation layer.

### Scroll choreography

- GSAP and ScrollTrigger control major entrance timelines, pinned scenes, scrubbed movement, masks, and section handoffs.
- Lenis remains the scrolling foundation and synchronizes with ScrollTrigger.
- Every pinned scene has a clear narrative purpose and a non-pinned mobile alternative.
- Scene transitions carry an object, line, image frame, color field, or typographic element into the next section.
- Scroll distances are proportional to narrative complexity; static informational sections remain concise.
- Animations use intentional acceleration and settling instead of uniform easing everywhere.

### Depth and parallax

Every route uses foreground, middle, and background layers, but with a distinct implementation.

- Background movement is slow and atmospheric.
- Primary content moves at the reading pace.
- Foreground accents move faster and may briefly cross scene boundaries.
- Pointer response is supplementary, limited to fine pointers, and bounded so text and controls never drift.
- Touch devices receive scroll-driven depth without hover dependencies.

### Interaction principles

- Primary CTAs use restrained magnetic response and tactile press states.
- Cards only tilt or spotlight when the interaction reveals hierarchy or connectedness.
- Decorative pointer followers are avoided unless they become meaningful route indicators.
- Focus, keyboard, and touch states receive the same level of polish as hover states.
- No interaction delays navigation or makes reading dependent on precise cursor movement.

## Orbit — flagship spatial experience

### Preserve

- The current hero direction and its deep-blue spatial atmosphere.
- The route language and core Atlas nodes.
- The Human Signal concept.
- The “Ready for Liftoff” closing section.

### Loader and hero

The Atlas mark begins as separated points in depth. A route line draws between them, the points converge into the mark, and the camera moves through it. The mark then separates again to become the hero constellation, making the loader-to-hero transition continuous.

The hero adds three controlled depth planes:

1. distant atmospheric stars and gradients;
2. route lines, secondary nodes, and slow-moving labels;
3. primary 3D nodes and typographic foreground details.

The heading enters through spatial masking rather than a standard stagger. Scroll begins a camera move through the hero route while “Move one step” separates from the main headline and becomes the persistent progress instruction.

### Constellation transformation

The product constellation becomes a pinned spatial sequence. The hero’s route nodes do not disappear at the section boundary. They reorganize into Journey, Documents, Money, and Concierge while the camera changes perspective.

Each product node briefly becomes primary, revealing one useful product behavior. Supporting nodes recede rather than becoming four equal cards. On mobile, the nodes become a vertical guided sequence with a persistent route line.

### Ecosystem transformation

The active product nodes travel into the ecosystem scene and become service signals. Visa, money, housing, travel, and university administration appear at the moment they attach to the route. This replaces the static service grid.

Connections pulse only when a relationship is being explained. A moving spotlight follows the current connection, while inactive services remain subdued.

### Route sequence

“A route, not a funnel” becomes a scroll-driven flight path. Milestones pass through foreground and background at different speeds. The path bends and changes depth to communicate that real journeys loop and overlap.

Copy remains anchored and readable while the spatial route changes around it. The sequence ends by converting the route signal into the Human Signal pulse.

### Human signal and liftoff

The Human Signal scene replaces mechanical orbital motion with a softer audio-like pulse. The pulse expands into a protective field around the conversation content, creating an emotional shift from system intelligence to human reassurance.

The signal then accelerates vertically, washing the dark environment into the existing white “Ready for Liftoff” surface. The transition must feel like arrival, not a hard background-color switch.

### Orbit restraint

- Do not add unrelated floating glass dashboards.
- Do not cover every section with particles or beams.
- Do not run continuous high-cost animation when scenes are out of view.
- Preserve strong typographic contrast and a direct CTA path throughout the spectacle.

## Horizon — cinematic conversion experience

### Preserve

- The current hero’s student departure direction.
- “One Connected Journey” as the quality benchmark.
- The clear free-product and Concierge conversion hierarchy.

### Loader and hero

The loader begins with scattered deadlines, files, payments, and messages. A single route line organizes them, then travels into the Atlas mark and becomes a line within the hero composition.

The hero uses layered image masks instead of a single static photograph. The airport scene moves with a very slow camera push, while foreground interface fragments and background architecture move at different speeds. Floating product information remains minimal and reacts gently to pointer depth.

The primary CTA is magnetic on fine pointers. The secondary CTA previews the journey transition rather than behaving like an unrelated button.

### Hero-to-journey transition

As the user scrolls, the hero image expands and loses its rounded frame. The organizing route line moves across the image, the palette deepens, and the image becomes the entry surface for “One Connected Journey.” This removes the abrupt jump from a pale hero to a dark independent section.

### Connected journey

The journey becomes one pinned stage rather than a tall sequence of repeated rows. Apply, Visa, Finance, Arrive, and Thrive replace one another through a shared scene:

- the active step uses dominant typography;
- a product state demonstrates the next meaningful action;
- the route line progresses and changes shape;
- the previous step recedes but remains spatially connected;
- the next step appears as a subtle preview.

The content and sequence remain unchanged. On mobile, the scene becomes a vertical sticky narrative with shorter transitions and no scroll trapping.

### Product proof

The current Atlas preview becomes a scroll-operated product demonstration. The interface changes from shortlist to visa preparation, money planning, and arrival as the user advances. Each state shows one decision and one reassurance rather than exposing a dense dashboard.

The route line from the journey enters the product frame, establishing that this is the same system rather than a new section.

### Contextual essentials

The five equal service cards are removed. Essentials appear contextually around the active journey state. Housing, travel, finance, visa guidance, and university administration slide into view when their trigger moment occurs.

The composition is asymmetric and layered, with one active service and supporting signals. Hover or focus reveals how the service connects to the student’s route.

### Concierge, resources, and conversion

The product interface opens into a human conversation, transitioning from system guidance to Concierge without a separate generic dark card. The dialogue should feel like a reassuring intervention at the right moment.

Resources become a compact sequence of practical cards with masked image or typographic previews and meaningful hover movement. They must not resemble a generic blog grid.

The final CTA uses the same route line to close the story. The form remains accessible and conversion-focused, but the large conventional form card is reduced so it does not overpower the emotional ending.

### Horizon restraint

- Keep the product proposition understandable within the first viewport.
- Avoid turning the conversion route into a prolonged experimental demo.
- Do not use repeated five-column card rows, excessive pills, or disconnected whitespace.
- Limit pinned storytelling to the journey and product-proof sequences.

## Dispatch — living editorial experience

### Preserve

- The current editorial typography, grid, and color system.
- The asymmetric hero.
- The horizontal five-chapter dispatch sequence.
- The publication and field-guide framing.

### Loader and hero

The loader assembles issue metadata, grid rules, an Atlas stamp, and headline fragments like a publication being composed. The final rule lines become the live hero grid. Headline words reveal through independently timed masks, while the student image enters as an editorial plate beneath the type.

The hero image and selected headline fragments move at different speeds. Motion remains crisp and graphic rather than atmospheric or 3D.

### Fragmentation sequence

“The journey was fragmented” becomes a controlled deconstruction of the page grid. Columns separate, text blocks drift, and rules extend beyond the viewport. As the Atlas edit is introduced, one continuous thread pulls the fragments into alignment.

That thread continues directly into the chapter rail, avoiding another independent section entrance.

### Dispatch chapters

The existing horizontal scroll remains, but each chapter becomes a designed editorial beat:

- the continuous thread measures progress;
- background image crops or graphic textures change by chapter;
- chapter numbers scale and pass behind foreground type;
- headlines shift typographic weight and position;
- the incoming chapter previews before taking focus;
- the outgoing chapter leaves a small trace in the publication margin.

The section should feel like reading across a designed spread, not sliding a row of equal cards. Mobile uses vertical page turns and maintains the same chapter progression.

### Human note and field guide

The Concierge interruption becomes an oversized handwritten or annotation-style margin note crossing the editorial grid. It introduces human help as an editor’s intervention, then clears to reveal the field guide.

Field-guide items behave like tear sheets. Hover, focus, or touch selection shifts their alignment, exposes a masked preview, and reveals useful metadata without introducing a standard blog-card layout.

### Principles and closing cover

Operating principles become three full-width typographic beats. Grid rules and spacing change with each beat so the section has cadence rather than appearing as a static list.

The final CTA closes like a publication cover. The editorial grid contracts, the main line resolves into the closing statement, and the conversion actions are revealed beneath the cover motion.

### Dispatch restraint

- Do not import Orbit’s WebGL or atmospheric particle language.
- Do not turn annotations into illegible decoration.
- Preserve generous reading time between highly animated sequences.
- Maintain keyboard and vertical-scroll access to all horizontal content.

## Design patterns to remove or avoid

- Equal-width card rows used as the default solution for service breadth.
- Repeated rounded rectangles with an icon, number, heading, and paragraph.
- Unrelated spotlights, beams, blobs, and particles added only to increase visual activity.
- Identical reveal animations across all three routes.
- Hard background transitions with no shared visual handoff.
- Large empty gaps that do not create deliberate pacing.
- Loader percentages that simulate work or delay access.
- Scroll pins that trap users or require excessive wheel movement.
- Desktop scenes merely scaled down for mobile.
- Permanent animation loops that continue offscreen.
- Motion that obscures the free-product CTA or makes Atlas harder to understand.

## Responsive and reduced-motion behavior

- Desktop receives the full route-specific motion system.
- Tablet shortens pins, reduces depth separation, and limits simultaneous layers.
- Mobile receives separately choreographed vertical sequences with shorter travel distances and fewer overlapping elements.
- Fine-pointer effects are disabled on touch devices.
- Reduced-motion mode removes scrubbed camera movement, parallax, magnetic response, and nonessential loaders while preserving every content state and action.
- Resizing or changing orientation must refresh ScrollTrigger measurements without leaving elements hidden.

## Accessibility requirements

- Content remains in logical DOM and heading order regardless of visual reordering.
- Pinned and horizontal sequences remain keyboard reachable and understandable without animation.
- Focus states are visible on every dark, light, and editorial surface.
- Decorative canvases, particles, and route lines are hidden from assistive technology.
- Text contrast remains WCAG AA during every animated state, including overlaps and transitions.
- No critical meaning relies only on position, color, pointer movement, or audio-style visuals.

## Performance boundaries

- Orbit’s 3D system is route-specific, dynamically imported, and paused outside active scenes.
- Prefer transform and opacity animations; animate filters only for short, bounded transitions.
- Avoid stacking large backdrop blurs and animated gradients across the full viewport.
- Hero-critical imagery is optimized with responsive `next/image` sizes and explicit priority only where necessary.
- The loader cannot mask slow loading indefinitely.
- ScrollTrigger instances are scoped and cleaned up on unmount.
- Mouse tracking uses one shared request-animation-frame loop per route, not per component.
- Route motion bundles remain isolated so Horizon and Dispatch do not download Orbit’s Three.js code.

## Implementation boundaries

- Existing App Router pages remain Server Components that only compose section components.
- Existing routes and content contracts remain stable.
- Interactive motion lives in focused Client Components inside the existing component architecture.
- Shared primitives are limited to genuinely shared concerns such as loader state, magnetic response, text masking, motion preferences, and GSAP lifecycle handling.
- Route-specific composition and timelines remain route-specific; they must not be forced into a universal scene abstraction.
- Tailwind remains the component styling system. Global CSS is reserved for tokens, base rules, and truly shared utilities.

## Verification and acceptance criteria

### Creative acceptance

- The first five seconds of each route clearly express its distinct creative identity.
- Each route has a loader that transitions directly into its hero.
- Each route carries a visual motif through at least three consecutive scenes.
- Orbit retains spatial continuity from hero through Liftoff.
- Horizon preserves product clarity and improves the connection between journey, interface, essentials, and Concierge.
- Dispatch feels like a living publication rather than a static editorial template.
- No redesigned section falls back to a generic equal-card grid without a specific content reason.

### Functional acceptance

- All navigation, CTAs, forms, and route links remain operational.
- Desktop, tablet, and mobile layouts contain no unintended overflow.
- Reduced-motion mode exposes all content without pinned or hidden states.
- Keyboard users can traverse every interactive element in logical order.
- Loaders do not replay fully during the same session.
- Runtime produces no hydration errors, GSAP cleanup warnings, or WebGL failures.

### Engineering acceptance

- Type checking, linting, tests, and production build pass.
- Browser smoke tests cover all three routes and major breakpoints.
- Microsoft Edge review covers loader behavior, scroll sequences, pointer interactions, mobile-responsive layouts, reduced motion, and console errors.
- Performance review confirms that offscreen continuous animation is paused and route-specific heavy code is isolated.

## Final recommendation framework

Orbit is intentionally designed as the flagship creative statement. Final route evaluation should confirm that this hierarchy holds without making Orbit less usable or making Horizon and Dispatch feel secondary in craft quality.

The final review scores:

1. first-impression memorability;
2. continuity of scroll storytelling;
3. product comprehension;
4. emotional trust and desire;
5. CTA clarity;
6. mobile and reduced-motion quality;
7. runtime performance.
