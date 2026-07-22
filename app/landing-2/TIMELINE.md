# Cinematic timeline

The scroll section derives progress from its own top and travel; global document progress is never used.

| Progress | Beat |
| --- | --- |
| `0.00–0.04` | Complete aircraft-window establishing hold. |
| `0.04–0.18` | Opening title and lead leave with a small upward drift. |
| `0.04–0.27` | The aircraft window expands into open sky as the aerial campus resolves beneath it. |
| `0.22–0.35` | Narrative A holds over the descending campus view. |
| `0.35–0.44` | Narrative A leaves; the roof and central skylight take over the frame. |
| `0.28–0.72` | The camera descends continuously toward the glazed roof window while the classroom video opens through it. |
| `0.48–0.68` | Narrative B enters and holds inside the portal negative space. |
| `0.68–0.74` | Narrative B leaves and the scroll-scrubbed classroom becomes the focused world. |
| `0.79–0.93` | Catalog enters over the same classroom scene. |
| `0.86–0.92` | Catalog controls appear as the interactive state settles. |

Navigation markers live in `scene-data.ts`: Start `0`, Journey `0.27`, Essentials `0.90`.

QA checkpoints are `0.00`, `0.18`, `0.27`, `0.44`, `0.58`, `0.74`, `0.90`, and `1.00`.

To retime the experience, edit only the normalized ranges in `getSceneState()` and the three values in `sceneMarkers`. Do not add scroll-specific CSS keyframes: CSS consumes the numeric custom properties written by the timeline hook.
