# Atlas Footer Logo and CTA Artwork Design

## Scope

Replace two raster assets on the `/normal` page without restructuring their
sections:

1. Replace the large footer artwork with a transparent ATLAS lettermark.
2. Replace the CTA artwork with a transparent, front-facing phone-in-hand image
   whose screen shows a subscription-selection interface.

## Footer lettermark

- Text: `ATLAS` only.
- Treatment: bold, wide, uppercase geometric lettering.
- Color: predominantly white for strong contrast against the black footer, with
  a restrained Atlas-orange cut detail in the first `A`.
- Content: letters only; no icon, container, slogan, or background.
- Output: transparent PNG with enough horizontal padding to avoid clipping.
- Integration: retain the footer's existing full-width image slot and responsive
  sizing.

## CTA artwork

- Subject: one photorealistic hand holding a modern smartphone with the screen
  facing the viewer.
- Composition: portrait cutout designed for the existing right side of the CTA;
  the hand and phone must remain readable without covering CTA copy.
- Screen: a polished Atlas-style subscription selector headed `Choose your plan`,
  containing `Free`, `Monthly`, and `Annual` options with one option clearly
  selected.
- UI styling: light screen, dark text, rounded cards, and Atlas-orange selection
  accents.
- Content: no external brand marks, watermark, extra objects, or scene background.
- Output: transparent PNG with clean edges around the opaque hand and phone.
- Integration: retain the existing CTA artwork container and responsive sizing.

## Asset workflow

Generate each asset on a flat chroma-key background with the built-in image
generation workflow, convert that background to alpha locally, validate the
edges and transparency, and save the final assets under `public/images/normal/`.
Use new filenames so the previous artwork remains recoverable.

## Verification

- Confirm both files have real alpha channels and transparent corners.
- Inspect each final asset directly for clipped letters, malformed hands, screen
  legibility, and color fringe.
- Load `/normal` in a browser at desktop and mobile widths.
- Confirm the footer wordmark is legible, the CTA image does not overlap its copy,
  and both images load with non-zero natural dimensions.
- Add or update focused image-reference regression coverage and run targeted
  tests and lint for touched files.
