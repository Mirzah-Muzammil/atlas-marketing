# Premium Typography Refresh Design

## Goal

Give `/premium` a more distinctive and cohesive typographic system by improving the hero title composition and replacing the generic body-copy treatment across every long-form description.

## Selected direction

Use Instrument Sans as the description face and retain Wise Sans as the display face. This creates a clean editorial contrast without introducing a serif or changing the established cinematic character.

## Hero title

Preserve the exact wording: “Your operating system for studying and succeeding abroad.” Recompose it as three animated lines:

1. `Your operating system for`
2. `studying and succeeding`
3. `abroad.`

The first line is smaller and dark, the second is the dominant dark display line, and the final `abroad.` line is orange. The complete title remains centered, uses balanced responsive sizing, and fits above the student crowd without clipping or adding hero height.

Keep the existing `data-premium-hero-title-line` hook on every line so the load and scroll choreography continues to work. Do not change the crowd canvas, hero height, navbar, or post-hero transition.

## Description typography

Add a locally served variable Instrument Sans font and apply it only to long-form descriptive copy:

- services introduction paragraph;
- each service chapter note;
- service-image captions;
- journey introduction paragraph;
- journey frame descriptions;
- final CTA description.

Do not change navigation, eyebrows, kickers, metadata, disclosures, buttons, indices, or headings. These remain in the existing Atlas Inter and Wise Sans faces.

Descriptions use a medium-light variable weight, slightly open tracking, and relaxed line height. Maintain current colors and content widths so this is a typography refinement rather than a layout rewrite.

## Responsive behavior

Desktop uses the three-line title with a strong scale difference between the first and final two lines. Mobile preserves all three lines but reduces the contrast in scale and allows natural wrapping only within each declared line. No title text may clip horizontally or overlap the navbar.

## Accessibility and performance

- Serve Instrument Sans from `public/fonts` with `font-display: swap`.
- Preserve semantic `h1` markup and exact visible wording.
- Do not hide descriptive text before font loading.
- Existing reduced-motion behavior remains unchanged.
- No new runtime animation loop or JavaScript dependency is introduced.

## Verification

- A focused source/DOM regression verifies the three semantic title lines, exact wording, Instrument Sans font face, and complete description selector scope.
- Desktop and mobile browser checks confirm the title remains clear of the navbar and crowd.
- Typecheck, focused lint, premium tests, and production build pass.
