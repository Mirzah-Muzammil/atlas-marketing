# Cinematic timeline

The scroll section derives progress from its own top and travel; global document progress is never used.

| Progress | Beat |
| --- | --- |
| `0.00–0.04` | Aircraft-window establishing hold; the black readability layer supports the opening copy. |
| `0.04–0.18` | Opening title and lead leave while the frame sequence moves into open cloud. |
| `0.22–0.35` | Narrative A enters and holds over the cloud-to-campus approach. |
| `0.35–0.44` | Narrative A leaves as the aerial campus becomes the unobstructed world. |
| `0.48–0.68` | Narrative B enters and holds while the camera descends through the campus gate. |
| `0.68–0.74` | Narrative B leaves and the student-eye campus walk returns to full focus. |
| `0.79–0.93` | Catalog enters while the sequence crosses the interior corridor. |
| `0.86–0.92` | Catalog controls appear as the interactive state settles. |
| `0.93–1.00` | The final catalog holds over the active classroom frame sequence. |

## Text choreography

- Intro begins fully resolved and reverses out during `0.04–0.18`.
- Panel A words cascade in during `0.22–0.27`, hold fully legible, and reverse out during `0.35–0.44`.
- Panel B words cascade in during `0.48–0.58`, hold fully legible, and reverse out during `0.68–0.72`.
- Catalog heading words resolve during `0.79–0.93`; controls follow during `0.86–0.92`.
- Kicker, headline, body, facts, and CTA use ordered sub-bands. Every word finishes resolving before its readable hold.
- Lenis owns wheel interpolation. The frame timeline follows actual scroll position directly, preventing double smoothing while keeping reverse mapping deterministic.

Navigation markers live in `scene-data.ts`: Start `0`, Journey `0.27`, Essentials `0.90`.

QA checkpoints are `0.00`, `0.18`, `0.27`, `0.44`, `0.58`, `0.74`, `0.90`, and `1.00`.

Frame mapping is linear and reversible: `round(clamp(progress) × 378)`. To retime the semantic beats, edit only the normalized ranges in `getSceneState()` and the three values in `sceneMarkers`. Do not add scroll-specific CSS keyframes: CSS consumes the numeric custom properties written by the timeline hook.
