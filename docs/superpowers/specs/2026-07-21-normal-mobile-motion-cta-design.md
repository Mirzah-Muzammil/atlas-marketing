# Normal Mobile Motion and CTA Fix

## Scope

Change only `/normal` behavior below the 768px breakpoint and the responsive layout of its CTA banner. Preserve the current desktop title reveals, desktop AOS animations, copy, CTA artwork, and modal behavior.

## Mobile Motion

Disable AOS when the viewport is narrower than 768px so component and card entrances are removed on phones. Add a matching mobile CSS rule that renders every `AnimatedTitle` immediately with full opacity, no blur, no transition, and no `will-change`. Desktop keeps the current effects.

## CTA Layout

Replace the CTA section’s forced `min-w-7xl` with a fluid `w-full max-w-7xl` container. Reduce its mobile top margin, keep the existing desktop spacing, and contain the transparent phone-in-hand image below the copy at a capped mobile width. From the medium breakpoint onward, retain the artwork’s absolute right-side composition and protect the text column from overlap.

## Accessibility and Verification

Static mobile rendering must not hide content while JavaScript initializes. The CTA must remain inside the viewport at 390px and must not create horizontal overflow. Add source-level regression tests for the mobile AOS disable option, the mobile title override, and the CTA’s fluid/capped classes. Verify in a real mobile viewport, then run focused tests, TypeScript checking, and the production build.
