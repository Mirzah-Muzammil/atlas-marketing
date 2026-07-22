# Premium Route and Service Artwork Redesign

## Goal

Refine `/premium` without changing its existing crowd hero, navbar, service vocabulary, or email conversion path. Replace the weak alternating journey timeline, generic service illustrations, and Avenir-based type treatment with one confident editorial system.

## Visual direction

The page becomes an editorial departure board: cream paper, navy ink, signal orange, tactile still-life imagery, compressed display type, and deliberate border-led composition. The work should feel authored and useful rather than decorative or component-library driven.

## Typography

- Load the existing local `wise-sans-heavy.woff2` as the premium display face.
- Load the existing local `inter-latin-variable.woff2` for navigation, labels, body copy, and controls.
- Apply Wise Sans only to major headings, service names, journey stage names, and oversized route numerals.
- Use Inter everywhere else for clearer reading and stronger contrast between display and utility text.
- Do not change the typography of routes outside `.premium-theme`.

## Service artwork

Create four new portrait assets for Visas, Banking, Housing, and SIM/eSIM. Each image is a tactile editorial still life rather than a character illustration.

Shared art direction:

- Warm cream studio surface with deep navy and signal-orange objects.
- A blend of practical travel objects, cut paper, matte clay, and subtle hard-flash shadows.
- Premium editorial photography/CGI finish with visible material texture.
- Strong asymmetric crop that remains legible in the existing portrait image stage.
- No people, words, logos, watermarks, UI screenshots, floating icon clouds, gradients, or generic corporate illustration.

Subjects:

- Visas: passport-like booklet without a mark, folded route map, document stack, orange approval seal, and a metal clip.
- Banking: unbranded card, phone-sized navy slab, coins, receipt paper without text, and an orange security token.
- Housing: architectural model, key, folded city grid, material samples, and an orange address marker.
- SIM/eSIM: phone-sized object, SIM chip, travel tag without text, cable, and an orange signal ring.

Save the selected files as new versioned assets under `public/images/premium/services/` and update only the four flagship image references. Preserve the existing files.

## Journey redesign

Replace the centered line and alternating copy blocks with a two-column editorial departure board.

### Header

- Kicker: `THE ROUTE, MADE VISIBLE`
- Heading: `Four moves. One landing.`
- Supporting sentence explains that Atlas keeps the sequence, deadlines, and essentials in one place.

### Desktop structure

- A sticky left rail occupies roughly 36% of the section.
- The rail contains an oversized `01—04`, a vertical orange route indicator, a short promise, and the final CTA.
- The right column contains four stacked stages: Match, Apply, Prepare, Arrive.
- Each stage is approximately 65–75vh tall, separated by a fine rule, and uses a large stage name, compact description, and outcome line.
- The active stage gains an orange index and a subtle cream-to-orange edge wash using CSS view-timeline progressive enhancement.
- The route indicator fills as the stage column passes through the viewport.

### Mobile structure

- Remove sticky positioning and render a compact single-column sequence.
- Keep the heading, stage number, description, and outcome together without large empty gaps.
- Place the CTA after the final stage.
- Do not hide or reorder semantic content.

## Motion and accessibility

- Use CSS transforms, opacity, and view timelines only as progressive enhancement.
- All content remains visible when view timelines are unsupported.
- `prefers-reduced-motion` removes stage reveals and route progress animation.
- Preserve semantic section headings, ordered stage meaning, keyboard focus treatment, and the existing email CTA destination.
- Maintain sufficient text and focus contrast on cream, navy, and orange surfaces.

## Component boundaries

- `PremiumJourney.tsx` owns the four-stage content and semantic structure.
- `app/premium/globals.css` owns route-scoped typography, the departure-board layout, responsive behavior, and progressive motion.
- `PremiumServices.tsx` keeps existing service data and switches the four flagship artwork paths to versioned replacements.
- No new runtime dependency or animation library is required.

## Test and verification contract

- Existing hero, navigation, service vocabulary, marquee, journey order, and CTA tests continue to pass.
- Add a journey structure contract for the sticky rail and four route stages.
- Add an asset-path contract proving all four flagship chapters use the new versioned images.
- Add a typography contract for the two route-scoped local font faces.
- Run the focused premium test suite, TypeScript, and scoped ESLint.
- Visually verify `/premium` at desktop and 390px mobile widths, including service crops, journey rhythm, reduced-motion fallback, and console output.

## Non-goals

- Do not modify the existing hero or navbar behavior.
- Do not add more services, steps, cards, carousels, modals, or external packages.
- Do not commit, stage, or push any changes.
