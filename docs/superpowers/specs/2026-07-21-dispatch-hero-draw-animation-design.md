# Dispatch Hero Draw Animation Design

## Goal

Make the Dispatch hero feel as though it is assembling on initial load: the surrounding SVG artwork draws first, then the journey panel appears after a deliberate one-second pause while its line icons draw. Reloading must not briefly show the panel before restarting the entrance.

## Scope

- Animate the four connector and coil paths in `DispatchConnectorArtwork` as drawn strokes.
- Animate the stroke-based Lucide icons rendered inside `DispatchJourneyPanel`.
- Keep `DispatchJourneyPanel` hidden from the first browser paint, then reveal it after one second with a short fade, rise, scale, and blur transition.
- Preserve the existing heading, navigation, tab, scroll, and pointer interactions.
- Do not add a new animation dependency or alter journey content.

## Architecture

CSS owns the initial-load sequence because it is available on the first paint and does not wait for the asynchronous GSAP import. Static data attributes identify the panel entrance, connector paths, connector nodes, and panel icons. Keyframes animate those hooks in a coordinated sequence.

`DispatchHeroMotion` continues to own the GSAP-powered heading entrance, scroll-driven stage changes, tabs, and pointer response. Its entrance timeline no longer animates the panel, connector strokes, or panel ornaments, preventing two animation systems from competing over the same properties.

## Motion Sequence

1. At first paint, the journey panel wrapper is transparent and slightly lowered, scaled down, and blurred.
2. The large connector and coil paths draw immediately with a small stagger. Connector nodes fade in near the end of that draw.
3. At one second, the panel wrapper begins an approximately 800ms reveal to its resting state.
4. As the panel reveals, visible Lucide icon strokes draw in. The effect applies to the active journey state and remains harmless for inactive states.
5. After the entrance, existing scrolling and tab behavior proceeds unchanged.

## Accessibility and Failure Behavior

Inside `prefers-reduced-motion: reduce`, the panel and SVGs render immediately in their final states with no delay. The document structure, tab semantics, focus behavior, and accessible state handling remain unchanged.

The entrance uses CSS rather than JavaScript initialization, eliminating the hydration/import flash that currently reveals the panel before GSAP applies its starting values.

## Testing

Component tests will assert the stable animation hooks on the panel wrapper, connector paths and nodes, and Lucide SVGs. The focused test will be run once before implementation to confirm it fails for the missing hooks, then again after implementation. The full test, typecheck, and lint commands will verify that the animation changes do not regress the page.
