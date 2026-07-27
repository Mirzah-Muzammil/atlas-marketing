# Landing 3 Services Section Design

## Goal

Add the next `/landing-3` section using Raycast's live extensions carousel as the visual and motion reference, while replacing all product content with Atlas services.

## Approved content

- Heading: “There’s a service for that.”
- Supporting line: “Everything you need abroad, without opening ten different tabs.”
- Categories: Prepare, Arrive, Settle, Thrive
- Service cards cover university selection, applications, visas, finance, arrival, settling in, and life abroad.
- Closing link: “Explore every Atlas service”

## Layout and appearance

- Continue the page's `#050506` near-black background with no visible section seam.
- Use a centered 1170px content width for the heading and segmented category control.
- On desktop, place the compact two-line heading on the left and the four-part glass control on the right at the same vertical position.
- Place a full-width horizontal card rail below the heading row. Cards are approximately 350px wide and 300px tall, with partial cards visible at both viewport edges.
- Each card uses an individual dark color glow, a bordered icon tile, title, concise description, arrow affordance, faint divider, and decorative data-grid footer.
- On mobile, stack the heading and category control, retain horizontal touch scrolling, and size cards so one card plus part of the next remains visible.

## Interaction and motion

- Category buttons change the visible set of Atlas services while preserving the rail structure.
- Previous/next controls move the rail one card at a time and disable when an edge is reached.
- On first viewport entry, reveal heading, control, cards, CTA, and arrows with Raycast-like staggered opacity/vertical motion.
- Category changes crossfade and slightly translate the cards.
- Cards lift subtly on hover and their arrow shifts right.
- Respect `prefers-reduced-motion` by rendering the final state immediately.
- Do not hide meaningful content from assistive technology during animation.

## Accessibility

- The category control uses an accessible tablist with selected state.
- The card rail is a labelled region and service cards remain semantic articles.
- Iconography and visual grids are decorative; card text and navigation controls have accessible names.
- Keyboard users can operate tabs, card links, and rail arrows with visible focus indicators.

## Scope

- Create one focused Landing 3 services component.
- Compose it immediately after the readiness section.
- Add focused component and browser coverage for content, tab behavior, rail navigation, ordering, geometry, responsiveness, and overflow.
- Do not modify shared navigation, other landing pages, or existing Premium work.
