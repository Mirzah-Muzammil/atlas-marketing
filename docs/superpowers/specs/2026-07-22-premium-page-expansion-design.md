# Premium Page Expansion Design

## Goal

Extend `/premium` without changing its existing animated crowd hero. Add a navbar, a cinematic services section, and a procedure section that feel like one authored visual system rather than assembled component-library blocks.

## Design read

Atlas Premium should feel like an illustrated international field guide: off-white paper, near-black navy ink, signal orange, oversized editorial typography, hard crops, and purposeful travel motion. The work should preserve the hero's monochrome people and orange headline rather than introducing a second visual identity.

## Principles

- Use `#f97316` as the only saturated accent.
- Use off-white `#fffaf2` and navy `#111827` as the primary surfaces.
- Avoid glassmorphism, gradient text, floating pill clusters, generic bento grids, and repetitive rounded cards.
- Motion must explain hierarchy or progress. Animate transforms, opacity, and clip paths only.
- Provide reduced-motion fallbacks and keep all primary navigation and CTAs keyboard accessible.
- Reuse existing premium service illustrations and add no package.

## Navbar

An absolute navigation layer sits above the hero. It uses the Atlas wordmark and three restrained links (`Services`, `How it works`, `Start free`). On small screens, the two section links remain visible in a compact second row. It has no enclosing pill or heavy shadow. A fine navy rule and orange CTA establish the visual language before the crowd enters.

## Services section

The section shifts to navy and begins with a velocity-style marquee listing all eight essential services, with a persistent pause/play control. Below it, four flagship services form a scroll-led editorial sequence: Visa, Banking, Housing, and SIM/eSIM. Each chapter fills the viewport with one large cream illustration, an oversized orange index, short copy, and a disclosure line. On desktop, the image stage remains sticky while copy chapters advance. On mobile, chapters become a simple vertical sequence. The remaining services still appear in the marquee so the scope is complete without making the page eight screens longer.

## Procedure section

The page returns to off-white. Four journey steps—Match, Apply, Prepare, Arrive—sit along a single orange route line. The line progresses vertically through the section and each step alternates sides on desktop. Oversized numbers, direct verbs, and compact outcome copy replace card containers. The final step resolves into an orange CTA linked to the existing early-access email address.

## Components

- `PremiumNav`: responsive, accessible anchor navigation.
- `PremiumServices`: server-rendered service content with CSS sticky behavior and a focused client-side marquee control.
- `PremiumServiceMarquee`: pause/play state for the continuous service strip.
- `PremiumJourney`: the four-step route and final conversion CTA.
- `app/premium/globals.css`: route-scoped visual system and reduced-motion behavior.

## Testing

The premium page test must verify the navbar anchors, full service vocabulary, marquee control state, flagship chapters, four ordered journey steps, route-scoped theme, and live CTA destinations. The existing crowd hero assertions must continue to pass. TypeScript, focused Vitest, and browser checks at desktop and mobile widths are required.
