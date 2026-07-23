# Premium Knowledge & Tools Scroll Accordion

## Goal

Replace the current bordered Knowledge & Tools grid on `/premium` with a full-width, square-edged adaptation of Skiper UI's `skiper53` vertical expanding gallery. Preserve the existing five content entries and make the panels open sequentially as the user scrolls.

## Visual Design

- The section spans the full viewport width with no rounded corners or outer side margins.
- A new real photograph of international students studying on campus fills the section background. It must not reuse an existing project image.
- A black overlay keeps the photograph deliberately low-opacity and ensures white editorial copy remains readable.
- The existing section heading, supporting copy, category labels, titles, descriptions, and metadata remain present.
- The five knowledge entries appear as vertical accordion panels separated by thin translucent rules.
- The active panel expands and exposes its full title, description when available, and action metadata. Inactive panels remain compressed but retain their index and category so the content structure stays legible.
- Atlas orange is used only for active-state accents and small metadata; the dominant treatment is black, white, and the muted background photograph.

## Interaction

- The section becomes sticky for a controlled scroll sequence.
- Scroll progress maps across the five entries. Each entry expands in order, one at a time, while the previous entry contracts.
- The transition uses spring-like sizing and opacity interpolation inspired by `skiper53`, adapted from hover control to scroll control.
- Desktop hover may preview a panel while the pointer is over the gallery, but scroll remains the canonical state.
- On touch and narrow screens, the panels form a vertical stack and open sequentially through the same scroll progress; no hover behavior is required.
- Reduced-motion users receive a static, fully readable list without sticky pinning or animated compression.

## Component Boundaries

- Install `@skiper-ui/skiper53` through the requested Shadcn registry command.
- Keep the installed registry component as the reference implementation.
- Add a small premium-specific wrapper that supplies the existing Atlas content and derives the active item from scroll progress.
- Keep content data in `PremiumLowerChapters.tsx`; do not duplicate or rewrite it inside the registry component.
- Extend the existing premium motion layer only where needed to connect section scroll progress to the active panel.

## Asset

- Add one newly sourced real campus/student photograph under `public/images/premium/`.
- Store it locally so the page does not rely on a third-party image host at runtime.
- Provide meaningful alternative text when the photograph conveys content; mark it decorative if it only establishes atmosphere.

## Verification

- Component tests confirm all five current entries and their current copy remain present.
- Tests confirm the installed Skiper53 component is used by the Knowledge section.
- Tests confirm the section exposes five scroll-controlled panels and the motion layer targets them.
- CSS checks confirm full-width square geometry, the black overlay, and the low-opacity real-photo background.
- Browser checks cover desktop and mobile layouts, initial and progressed scroll states, overflow, and text contrast.
- Production build, typecheck, focused tests, and changed-file lint must pass.

## Scope

Only the Knowledge & Tools section and the minimal shared component/asset support required for it are changed. Concierge, FAQ, hero, stage, and product-tutorial sections remain untouched.
