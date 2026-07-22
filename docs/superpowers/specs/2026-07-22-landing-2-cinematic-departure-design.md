# Atlas `/landing-2` Cinematic Departure Design

## Purpose

Build a new, self-contained `/landing-2` route that reuses only the written content and service information from `/landing`. The route must not reuse `/landing` colors, typography, components, layouts, or animation ideas.

The page is one reversible, scroll-driven 2.5D airport scene. It begins as an editorial departure portrait, moves through two narrative beats without leaving the world, and settles into an interactive services catalog.

## Creative Direction

The world is a quiet airport departure hall viewed through gate-like foreground panels. Existing airport photography supplies the master plate. The isolated phone and hand becomes the nearest hero object: it initially helps frame the traveler, then moves past the viewer to reveal the first narrative panel. Two CSS-rendered gate panels provide the missing left and right foreground occluders. They are intentionally documented as replaceable production layers rather than disguised as supplied photography.

The independent visual system uses smoked charcoal, chalk, muted sky blue, and wine accents. Display typography uses a high-contrast system serif stack; interface text uses a neutral system grotesk stack. Large type, controlled line lengths, fine rules, and sparse controls create an editorial rather than product-dashboard character.

## Scene Architecture

The route uses:

- `app/landing-2/page.tsx` for metadata and server entry.
- `app/landing-2/layout.tsx` and `app/landing-2/landing-2.css` for route-scoped styling.
- `components/landing-2/CinematicLanding.tsx` for semantic scene markup and interaction wiring.
- `components/landing-2/scene-data.ts` for editable copy, service data, timeline markers, and asset metadata.
- `components/landing-2/timeline.ts` for deterministic pure timing helpers.

The document contains one long cinematic section with a sticky viewport-height stage. Its z-index bands are fixed: world layers `0–9`, shade and framing `10–19`, narrative UI `20–29`, navigation and controls `30–39`, and modal-class overlays `40+` if later required.

The stage contains one shared world group, the background plate, atmosphere, foreground portal panels, phone/hand hero, persistent navigation, intro copy, narrative panels A and B, and final services catalog. All transforms are driven by a small set of CSS custom properties.

## Timeline

The desktop cinematic section has approximately 4,600 CSS pixels of virtual travel, reduced on portrait tablets and phones.

| Progress | State |
| --- | --- |
| `0.00–0.03` | Complete hero hold. |
| `0.03–0.18` | Intro title and lead leave with a restrained fade and vertical shift. |
| `0.15–0.27` | Camera pushes into the airport plate; gate panels split; phone/hand moves toward and past the viewer. |
| `0.25–0.35` | Narrative A, “The route changes. Your Atlas stays.”, holds in the new negative space. |
| `0.35–0.44` | Narrative A and remaining foreground exit. |
| `0.44–0.48` | Clean airport panorama hold. |
| `0.48–0.58` | Narrative B, “Everything you need. Already in order.”, enters as a restrained tint and focus shift support legibility. |
| `0.58–0.69` | Narrative B hold. |
| `0.69–0.74` | Narrative B exits and the airport returns to focus. |
| `0.75–0.96` | Eight-service essentials rail enters horizontally over the same world. |
| `0.91–1.00` | Rail controls appear and the final interactive state settles. |

Navigation links map to the hero, journey, and essentials timeline markers by converting normalized progress into a local section scroll position.

## Scroll Engine

The client derives progress from the cinematic section’s cached top position and scrollable travel, clamps it to `0–1`, and smooths a visual playhead toward the target only when reduced motion is not requested. Pointer input has its own damped values and is disabled for coarse pointers.

Pure helpers include `clamp`, `lerp`, `smoothstep`, `rangeProgress`, and `segmentInOut`. Scroll, resize, pointer, visibility, and image readiness events only invalidate a frame. The frame loop reads no layout during normal rendering, writes CSS properties once, and stops after the playhead and pointer have converged. Geometry is recomputed on resize and after critical images decode. An intersection observer pauses animation work while the stage is offscreen.

## Content Mapping

Only `/landing` copy is reused:

- Hero: “Your operating system for studying and succeeding abroad.” and its existing lead.
- Narrative A: “The route changes. Your Atlas stays.” with the existing full-journey explanation.
- Narrative B: “Everything you need. Already in order.” with the existing Essentials disclosure copy.
- Final catalog: the eight existing `/landing` services and their notes.
- Primary action: the existing Atlas early-access email link.

No copy is baked into imagery.

## Catalog Interaction

The catalog uses a semantic list of service articles and real email links for service enquiries. Previous and next buttons update a bounded active index. Pointer drag and touch swipe update the rail without hijacking vertical scrolling. Arrow keys move between cards when the rail is focused. A polite live region announces the active service and position only after deliberate user interaction. Focus rings remain visible.

The final catalog stays interactive after scroll reaches `1.0`; scroll position and catalog index remain independent.

## Loading and Asset Treatment

The airport plate and hero phone/hand are the only critical visual preloads. Intrinsic dimensions reserve space, and the stage reveals after both critical images decode or after a short safety timeout. Catalog imagery loads lazily. The existing video is reference media only and is not shipped as the scroll timeline.

The supplied assets do not form a fully aligned layered composite. The implementation therefore uses the airport photograph as the single opaque plate, the transparent phone/hand as the nearest photographic layer, and CSS gate panels as explicitly named placeholder foreground layers. This avoids mixing the unrelated illustrated service art into the photographic world before the final catalog.

## Responsive Behavior

Desktop and landscape tablet preserve the wide airport composition. Portrait tablet and mobile shift the airport plate’s focal point to retain the traveler, reduce pointer movement to zero, shorten virtual travel, narrow narrative copy, and use a nearly full-width swipeable card. Safe-area padding protects navigation and controls. The document never scrolls horizontally.

At 200% zoom, the sticky scene remains operable; copy uses fluid sizing and bounded widths. Navigation collapses to three compact timeline links rather than a menu overlay.

## Reduced Motion

Reduced motion turns the cinematic section into normal-flow content: a static hero followed by narrative A, narrative B, and the service rail. It removes playhead smoothing, pointer parallax, blur, large scaling, and lateral world travel. All copy and catalog interactions remain available, and timeline links target real content blocks.

## Failure Handling

If a critical image fails, the loader releases and a deliberate solid-color scene remains behind semantic content. Missing service imagery never removes a service card. Resize and visibility transitions invalidate geometry without resetting catalog state. The implementation does not trap scroll or depend on JavaScript for basic content visibility.

## Verification

Automated tests cover timing helpers, semantic headings and links, timeline markers, catalog controls, keyboard movement, and reduced-motion structure. Browser verification covers `1440×900`, `1280×720`, `1024×768`, `768×1024`, and `390×844`; progress checkpoints `0.00`, `0.18`, `0.27`, `0.44`, `0.58`, `0.74`, `0.90`, and `1.00`; reverse scrolling; horizontal overflow; console errors; focus visibility; keyboard controls; and reduced motion.

## Production Asset Notes

Two production assets remain desirable but do not block the implemented experience:

1. A retouched airport master with 10–20% additional bleed around all edges for stronger desktop parallax.
2. Matching transparent left and right gate or architectural foreground plates photographed under the airport plate’s light direction.

Until those are supplied, the CSS gate panels are the documented replacement layers and use the same anchors and timeline variables intended for future image swaps.
