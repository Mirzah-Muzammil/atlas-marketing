# Premium Knowledge Accordion and Concierge Restoration

## Goal

Replace the current Knowledge & Tools treatment on `/premium` with a close visual match to Skiper UI's original `skiper53` vertical expanding gallery. Preserve the existing five content entries and make the panels open sequentially as the user scrolls. Restore the Concierge CTA to its earlier centered-title composition with one phone on each side.

## Visual Design

- The Knowledge section uses a clean white background.
- The gallery is centered and intentionally narrower than the viewport, matching Skiper53's original proportions.
- Each knowledge entry is a rounded horizontal image strip when closed and expands vertically into a large rounded image card when active.
- The newly sourced real international-student photograph appears inside the cards instead of behind the whole section.
- A restrained dark gradient inside each active image card keeps its copy readable while leaving the surrounding section white.
- The existing section heading, supporting copy, category labels, titles, descriptions, and metadata remain present.
- The five knowledge entries use the original Skiper53 stacked vertical accordion layout.
- The active panel expands and exposes its full title, description when available, and action metadata. Inactive panels remain short image strips with their index and category visible.
- Atlas orange is used for small active-state accents; the section title and supporting copy use the existing black editorial typography.
- Concierge returns to a three-column layout: phone, centered headline and CTA, phone.
- The Concierge title remains `A real specialist for your whole journey.` and the CTA remains `Meet Concierge`.
- The previously removed eyebrow, description, pricing, module, and timeline-fact blocks stay removed.

## Interaction

- The section becomes sticky for a controlled scroll sequence.
- Scroll progress maps across the five entries. Each entry expands in order, one at a time, while the previous entry contracts.
- The transition uses Skiper53's original closed and open heights, rounded geometry, and opacity interpolation, adapted from hover control to scroll control.
- Desktop hover may preview a panel while the pointer is over the gallery, but scroll remains the canonical state.
- On touch and narrow screens, the centered accordion scales to the viewport and opens sequentially through the same scroll progress; no hover behavior is required.
- Reduced-motion users receive a static, fully readable list without sticky pinning or animated compression.

## Component Boundaries

- Install `@skiper-ui/skiper53` through the requested Shadcn registry command.
- Keep the installed registry component as the reference implementation.
- Keep the premium-specific wrapper that supplies the existing Atlas content and derives the active item from scroll progress.
- Keep content data in `PremiumLowerChapters.tsx`; do not duplicate or rewrite it inside the registry component.
- Extend the existing premium motion layer only where needed to connect section scroll progress to the active panel.

## Asset

- Keep the newly sourced real campus/student photograph under `public/images/premium/`.
- Store it locally so the page does not rely on a third-party image host at runtime.
- Treat the photograph as decorative because the complete guide content is rendered as text over the active card.

## Verification

- Component tests confirm all five current entries and their current copy remain present.
- Tests confirm the installed Skiper53 component is used by the Knowledge section.
- Tests confirm the section exposes five scroll-controlled panels and the motion layer targets them.
- CSS checks confirm the white section background, centered Skiper53 width, rounded closed/open cards, and active image gradient.
- Component tests confirm Concierge renders exactly two phone shells around the centered title and CTA, without the removed pricing/detail blocks.
- Browser checks cover desktop and mobile layouts, initial and progressed scroll states, overflow, and text contrast.
- Production build, typecheck, focused tests, and changed-file lint must pass.

## Scope

Only the Knowledge & Tools section, the Concierge CTA composition, and their minimal shared component/asset support are changed. FAQ, hero, stage, and product-tutorial sections remain untouched.
