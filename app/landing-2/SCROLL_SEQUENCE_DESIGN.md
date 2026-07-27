# Landing 2 Scroll Frame Sequence Design

## Goal

Replace the existing layered-image world on `/landing-2` with a scroll-controlled canvas sequence derived from the supplied 31.59-second video. Preserve the route's semantic narrative copy, navigation, and final interactive service rail while adding a black readability layer between the footage and text.

## Source and Output

- Source: `/Users/mirzah/Downloads/Initial_Scene_-_2026-07-27_202607271802.mp4`
- Source geometry: 1280×720, 24 fps, 31.59 seconds.
- Extracted sequence: approximately 379 WebP frames at 12 fps.
- Output location: `/public/images/landing-2/sequence/frame-0001.webp` through the final numbered frame.
- A generated manifest will contain the frame count, width, height, and naming pattern so animation code does not depend on duplicated magic numbers.
- Frames will use a web-quality setting tuned against representative aircraft, cloud, campus, corridor, and classroom frames.

## Architecture

The existing sticky cinematic section remains the scroll container. Its world layer becomes one full-viewport `<canvas>` with a stable 16:9 drawing surface. Local scroll progress maps deterministically to an integer frame index from zero to the last frame. Drawing uses cover-style cropping so the canvas always fills the viewport without stretching or exposing an edge.

The initial frame is loaded eagerly. After it renders, the route becomes visible and nearby frames are decoded first. Remaining frames load progressively in batches. A requested frame is drawn immediately when available; if it has not decoded yet, the canvas retains the latest successfully drawn frame rather than flashing blank. Scroll, resize, and asset readiness only request animation frames; heavy work is not performed directly inside event listeners.

## Timeline and Text

The current `/landing-2` copy, three timeline navigation links, two narrative beats, and final service rail remain semantic HTML. Existing progress ranges continue to control intro exit, panel A, panel B, and catalog entry. Image-specific flight, campus, and classroom transforms are removed because the supplied footage now owns the camera movement.

The route gets one full-stage black layer at z-index 10–19, between the canvas and text. Its opacity is timeline-controlled:

- Opening hero: restrained black at approximately 20–28% for white headline contrast.
- Pure visual transitions: reduced toward approximately 10–16% so the footage remains visible.
- Narrative panels: approximately 34–42% while their text is active.
- Final catalog: approximately 42–50% so card controls remain legible.

Opacity changes use smooth interpolation with no abrupt steps. The existing atmosphere/grain may remain only if it does not obscure the footage.

## Loading and Performance

- Extract at 12 fps rather than shipping all 757 source frames.
- Preload the first frame and a small opening batch; avoid requesting all frames before first paint.
- Use `Image.decode()` when available and limit concurrent frame requests.
- Cache decoded frame objects for deterministic reverse scrolling.
- Stop drawing when the sticky scene is offscreen and stop requesting frames after scroll progress converges.
- Reserve canvas dimensions to prevent layout shift.
- Do not add a third-party animation dependency.

## Responsive Behavior

The same frame sequence is used on desktop and mobile. Canvas cover-cropping preserves the footage's center focal point, with a route-local responsive horizontal focal offset only if portrait QA shows important subjects being clipped. The scroll distance remains shorter on small screens. Pointer parallax is removed from the footage because camera motion already exists in the source.

## Accessibility and Reduced Motion

The canvas is decorative and hidden from assistive technology. All copy and controls remain real HTML. Keyboard behavior and focus states for the final service rail remain unchanged.

With `prefers-reduced-motion: reduce`, scroll scrubbing and inertial interpolation are disabled. The first representative frame becomes a static hero, and the intro, both narrative panels, and the service catalog appear in normal document flow. No information or interaction is removed.

## Failure Handling

If an individual frame fails to load, retain the last successfully drawn frame and allow later frames to continue loading. If the opening frame cannot load, dismiss the loader after the existing safety timeout and show the route's black background with all semantic content available. Console errors from expected individual-frame failures are avoided.

## Testing and Verification

Unit tests will define the frame manifest contract, progress-to-frame mapping, single-canvas world, black overlay, and removal of legacy image/video layers before production code changes. Browser tests will verify frame advancement and reversal, stable canvas sizing, responsive crops, navigation markers, keyboard rail behavior, reduced motion, no horizontal overflow, and a clean console.

Visual checkpoints will be inspected at approximately 0.00, 0.18, 0.27, 0.44, 0.58, 0.74, 0.90, and 1.00 on desktop and mobile. Each checkpoint must show a valid frame, readable text, no blank canvas, and no visible image swap.

## Scope

Changes are limited to `/landing-2` route code, its route-specific components, tests, documentation, and generated assets under `/public/images/landing-2/sequence`. Other routes and shared components are not modified. No commit is created.
