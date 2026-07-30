# Landing 3 Cinematic Readiness Depth

## Goal

Give the “Studying in the UK? See your Atlas.” section more visual depth without changing its centered product-preview composition or adding decorative iconography.

## Approved direction

- Remove the keyboard-key background from the rendered section.
- Keep the macOS-style Atlas preview window centered.
- Keep the four supporting value cards positioned around the window.
- Add a cinematic orange illumination layer inspired by the supplied reference: a strong directional bloom, a secondary low glow, and dark falloff at the edges.
- Add a subtle square grid behind the content to create spatial depth.
- Add fine monochrome grain over the background so the glow feels tactile rather than like a flat CSS gradient.
- Preserve the section’s existing content, form controls, responsiveness, accessibility, and hover behavior.

## Visual behavior

The glow and grid are decorative and must remain behind the Atlas window and value cards. The central window stays the highest-contrast element. On smaller screens, the glow may crop naturally while the window and cards remain readable. Reduced-motion behavior is unchanged because these layers are static.

## Implementation boundaries

The change is contained in `Landing3ReadinessSection`. No new image asset, animation library, or shared abstraction is required. The grain can be rendered with a small inline SVG noise texture in CSS, while the grid and illumination use layered CSS backgrounds.

## Verification

- Component test confirms the keyboard backdrop is absent and the cinematic depth layers are present.
- Existing Landing 3 tests remain green.
- Production build succeeds.
- Desktop and mobile browser checks confirm the central window and value cards remain legible and correctly layered.
