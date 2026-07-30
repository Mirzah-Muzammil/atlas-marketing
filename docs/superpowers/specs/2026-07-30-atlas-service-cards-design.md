# Atlas Service Card Fidelity Rebuild

## Goal

Rebuild the Landing 3 “There’s a service for that.” catalogue so it follows the visual system of Raycast’s extension carousel while retaining Atlas content, navigation, and category behavior.

## Visual direction

- Keep the existing heading, subtitle, category tabs, horizontal rail, arrows, and Atlas service copy.
- Use consistently tall cards with Raycast-like proportions and spacing.
- Give each service its own saturated color environment rather than applying a generic flat treatment.
- Replace photographic card bodies with bespoke, code-native SVG scenes designed for each service.
- Layer the SVG scenes with a restrained radial glow, fine grain, internal border, and bottom fade so the cards feel dimensional without looking generated.
- Keep typography compact and aligned to the Raycast reference: service identity and action at the top, description beneath, artwork occupying the lower majority.

## Interaction

- Hovering a card lifts it slightly, brightens its color field, increases artwork contrast, and moves the arrow a few pixels.
- Keyboard focus receives the same visible emphasis without relying on hover.
- Category changes retain the existing animated card entrance and reset the horizontal rail.
- Previous and next controls keep their current behavior.
- Reduced-motion users receive the final visual state without movement.

## Component design

- `Landing3ServiceCatalogSection` remains the owner of category state and rail behavior.
- `ServiceCard` receives a visual key and renders one small SVG scene through a focused `ServiceArtwork` component.
- Artwork variants are deterministic React/SVG markup; no remote assets, generated raster imagery, or additional runtime dependency is required.
- Existing semantic roles, accessible card links, tabs, and navigation labels remain unchanged.

## Responsive behavior

- Desktop cards use a consistent Raycast-like width and height, allowing a partial next card at the viewport edge.
- Mobile cards remain horizontally scrollable, snap to the rail, and scale down without clipping artwork or copy.

## Verification

- Unit tests confirm five service cards, SVG artwork per card, consistent tall-card sizing, and preserved category behavior.
- Type checking and production build must pass.
- Desktop and mobile screenshots verify proportions, horizontal overflow, color depth, and hover/focus presentation.
