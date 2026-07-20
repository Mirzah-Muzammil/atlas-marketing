# Atlas Marketing Homepage Variations — Design Specification

## Objective

Build three production-ready, visually distinct Atlas Marketing homepages in a Next.js App Router frontend. Each homepage must make students planning to study abroad understand Atlas quickly, trust it, and want to create a free account. Atlas is an all-in-one operating system for applications, visas, finance, housing, arrival, and life after landing. Concierge is a separate paid path for students who want a specialist to run the journey with them.

The backend and infrastructure are outside this project. The frontend will consume API contracts supplied by the backend developer when those contracts are available.

## Primary conversion hierarchy

1. Primary: **Get started free**.
2. Secondary: **Explore how Atlas works**.
3. Premium secondary path: **Talk to Concierge**.

The marketing site must not present Concierge as the default Atlas experience or obscure that the Student OS is free.

## Reference synthesis

The implementation may borrow principles, never layouts or components:

- Squarespace: one dominant proposition, controlled disclosure of breadth, and strong proof hierarchy.
- Steven: one memorable spatial object, a purposeful loading transition, and cinematic restraint.
- MindMarket: youthful confidence, an unmistakable identity, friendly geometry, and high-chroma moments.
- Visa Center: numbered service storytelling, editorial pacing, and asymmetric composition.
- ReactBits and Aceternity UI: interaction primitives such as parallax, sticky reveals, spotlight response, text reveals, and perspective cards. Atlas implementations must be original and used selectively.
- Linear and Stripe: information hierarchy, spacing discipline, and polished product presentation.
- Monzo, Cash App, Wise, and Revolut: plain language, approachable financial trust, and direct calls to action.
- On and Oura: aspirational imagery, art direction, and confident negative space.

## Shared brand system

All three homepages share Atlas content, semantic colour roles, accessibility rules, and core UI primitives while using different compositions and motion languages.

### Colour roles

- Trust blue: navigation, headings, anchors, and important surfaces.
- Orange: only conversion actions such as Get started, Contact, and Book consultation.
- Green: only success, progress, completion, and verified states.
- Off-white and white: primary reading surfaces and premium negative space.
- Deep navy: high-contrast sections and the spatial Homepage 3 environment.

Colours are exposed through Tailwind theme variables. Components must not repeat raw colour values.

### Typography

- One shared sans-serif family provides product and interface consistency.
- Homepage 2 adds an editorial display face for headings.
- Homepage 3 uses a geometric display treatment derived from the shared sans family.
- Text must remain readable at 200% zoom and on narrow mobile screens.

### Content rules

- Use honest, verifiable product claims.
- Do not invent university matches, admission odds, salaries, partner savings, user counts, rankings, or testimonials.
- Product demonstrations may use clearly illustrative status labels, but not fabricated real-world outcomes.
- Prefer plain language over consultancy jargon.
- Use “Essentials,” never the old “Bazaar” label.

## Homepage 1 — Horizon

**Route:** `/`

**Purpose:** The recommended conversion-led direction, balancing emotional aspiration with immediate product clarity.

### Structure

1. Transparent-to-solid navigation with Get started free.
2. Cinematic departure hero: the promise, primary CTA, secondary product CTA, and a layered travel/product composition.
3. Compact trust statement explaining free access, setup time, and what Atlas does without unverified statistics.
4. Pinned journey story: Apply → Visa → Finance → Arrive → Thrive. The product surface changes with each stage.
5. Product proof section showing Today, Journey, tasks, and saved Essentials without presenting a dense dashboard screenshot.
6. Essentials ecosystem introduced only after the journey context is established.
7. Human Concierge section with a named-specialist concept and clear separation from the free product.
8. Resources and practical guidance.
9. Closing “ready for what is next” CTA.
10. Shared footer.

### Motion language

- Short logo/loading reveal that never creates an artificial delay longer than the transition requires.
- GSAP hero entrance timeline.
- Layered pointer and scroll parallax.
- One pinned ScrollTrigger journey sequence.
- Product states crossfade and translate as stages change.
- Magnetic CTA response and restrained perspective tilt.
- No permanent custom cursor or continuous decorative particle field.

## Homepage 2 — Dispatch

**Route:** `/editorial`

**Purpose:** A culturally aware editorial experience that feels youthful and premium without resembling a SaaS template.

### Structure

1. Asymmetric editorial navigation.
2. Manifesto hero built from typography, a student departure image, and a concise Atlas promise.
3. “The journey is fragmented” problem statement.
4. Horizontal sequence of numbered dispatches covering applications, visa, money, arrival, and career.
5. Concierge introduced as an editorial sidebar/interruption rather than a SaaS pricing card.
6. Interactive field guide of practical tools and resources.
7. Essentials presented as a curated directory.
8. Trust and operating principles.
9. Editorial closing CTA.
10. Shared footer adapted to the editorial composition.

### Motion language

- Masked typography and image reveals.
- A GSAP horizontal-scroll chapter on desktop with a vertical mobile fallback.
- Moving annotations and scroll-linked rules/grid lines.
- Direction-aware editorial cards.
- Cursor-responsive captions only on fine pointers.
- No WebGL hero, floating glass dashboard, or Homepage 1 journey composition.

## Homepage 3 — Atlas Orbit

**Route:** `/orbit`

**Purpose:** The most experimental direction, using original spatial storytelling while protecting accessibility and performance.

### Structure

1. Compact spatial navigation.
2. Deep-blue hero containing an original Three.js/R3F route system.
3. Scroll-driven movement through Apply, Visa, Finance, Housing, Arrival, and Thrive nodes.
4. Dimensional product panels attached to the route.
5. Ecosystem section showing how Atlas keeps connected tasks and decisions in one system.
6. Student story expressed as a chronological route, not a testimonial carousel.
7. Concierge as a human handoff point in the system.
8. Conversion section returning from spatial spectacle to a clear white surface and direct CTA.
9. Shared footer adapted to the dark environment.

### Motion language

- Dynamically imported R3F canvas.
- Scroll-mapped camera and route progress.
- Lightweight beam/path effects and perspective panels.
- Animated gradients and depth transitions.
- Static CSS fallback when WebGL is unavailable.
- Reduced-motion mode removes camera movement and presents the same content linearly.
- No externally hosted Spline scene without an owned Atlas scene asset.

## Shared frontend architecture

The active workspace is the project root.

```text
app/
  page.tsx
  editorial/page.tsx
  orbit/page.tsx
components/
  common/
  navigation/
  footer/
  home/horizon/
  home/dispatch/
  home/orbit/
  motion/
  forms/
  ui/
hooks/
lib/
constants/
types/
utils/
styles/
public/
tests/
```

- App Router pages remain Server Components and only compose imported sections.
- Interactive behavior lives in small Client Components.
- Reusable components are never declared inside section components.
- Shared content is typed and stored outside components.
- GSAP handles timelines and scroll choreography.
- Lenis supplies smooth scrolling and is disabled when reduced motion is requested.
- Framer Motion is limited to small state/layout transitions where GSAP adds unnecessary complexity.
- React Hook Form and Zod power the consultation form.
- Three.js/R3F/Drei are limited to Homepage 3 and dynamically loaded.
- Tailwind is the only component styling mechanism; global CSS contains theme tokens, base rules, and reusable Tailwind utilities only.

## Responsive behavior

- Desktop experiences retain their distinct motion systems.
- Tablet layouts reduce depth and shorten pinned sequences.
- Mobile replaces horizontal/pinned sequences with clear vertical storytelling.
- Pointer-only interactions have touch equivalents or remain supplementary.
- Navigation, CTAs, and forms remain usable at 320px width.

## Accessibility

- Semantic landmarks and heading order.
- Keyboard-visible focus treatment.
- Full navigation and form operation without a pointer.
- `prefers-reduced-motion` support across GSAP, Lenis, Framer Motion, and Three.js.
- Decorative canvases and effects are hidden from assistive technology.
- WCAG AA contrast for text and interactive controls.
- Meaning is never conveyed by colour or motion alone.

## Performance boundaries

- Server Components by default.
- Images use `next/image`, responsive sizes, and lazy loading below the fold.
- WebGL and heavy motion code are route-specific dynamic imports.
- No artificial loading wait; the loader exits as soon as the initial experience is ready.
- No unused Spline runtime or remote scene dependency.
- Avoid simultaneous blur, backdrop-filter, and large animated gradients across multiple full-screen layers.
- Pause continuous animation when its section is out of view.
- Verify production build, responsive behavior, keyboard navigation, reduced motion, and runtime console output.

## Explicit prototype patterns to avoid

- Black-and-neon “AI SaaS” styling as the universal brand language.
- Oversized headings that hide the product proposition.
- Monospace metadata applied throughout the interface.
- Dense dashboard screenshots in the hero.
- Fake data presented as product proof.
- Marketplace or partner offers before the student journey is understood.
- Repeated bento grids, interchangeable glass cards, and component-library compositions.
- Random blobs, gradients, beams, and particles in every section.
- Motion that delays reading, makes navigation unpredictable, or causes scroll fatigue.
- Long service catalogues without narrative prioritisation.

## Testing and acceptance criteria

- All three routes render independently and share no duplicated section layout.
- Each route has a distinct hero, section order, navigation treatment, card system, CTA composition, and motion grammar.
- Pages remain Server Components; interactive islands are explicitly client-only.
- Primary and premium conversion paths are present and understandable on every route.
- Consultation form validates accessible error states.
- Reduced-motion mode preserves every message and action.
- Mobile layouts contain no horizontal overflow or inaccessible pinned content.
- Production build, lint, type checking, unit/component tests, and browser smoke tests pass.
- Edge verification covers desktop and mobile-responsive layouts, keyboard access, motion behavior, and console errors.

## Recommendation criteria after implementation

Recommend the strongest homepage only after all three are verified. Score each on:

1. Product comprehension within the first viewport.
2. Student trust and emotional desire.
3. CTA clarity and conversion path.
4. Motion serving the story rather than competing with it.
5. Mobile usability and accessibility.
6. Runtime and loading performance.
