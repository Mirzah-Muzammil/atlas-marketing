# Premium Skiper39 Hero Design

## Scope

Create a new `/premium` route containing only the first production slice: the header and hero based on Skiper UI's free `skiper39` Canvas Crowd component.

## Design contract

- Preserve the installed Skiper39 composition, canvas crowd behavior, GSAP timing, responsive sizing, density, spacing, colors, and interaction model.
- Replace the generic crowd sprite with a sprite sheet of students while retaining the original sheet geometry and animation-frame alignment.
- Student figures remain in the same hand-drawn Open Peeps visual language and read as students through backpacks, books, laptops, headphones, hoodies, and campus clothing.
- Replace demo branding and copy only with Atlas content already supplied by the Atlas reference site.
- Do not alter `/`, `/normal`, `/editorial`, or `/orbit`.

## Architecture

- `app/premium/page.tsx` remains a Server Component and only composes the page section.
- `components/premium/PremiumHero.tsx` owns Atlas-specific content and supplies the student sprite path.
- The registry-provided Skiper39 client component remains isolated in its generated component file.
- `public/images/premium/student-peeps.png` is the project-owned animated crowd sprite.

## Content

- Brand: `Atlas`
- Eyebrow: `Free, end to end`
- Heading: `Your operating system for studying and succeeding abroad.`
- Supporting copy: `Match universities. Sort your services. Settle in. Then build a life. All in one place — from your first application to long after you've landed.`
- Primary action: `Get started — free`
- Secondary action: `See how it works`

## Quality gates

- Route responds successfully at desktop and mobile widths.
- The student sprite is used instead of the generic people asset.
- Canvas animation remains active when motion is allowed and remains readable with reduced motion.
- No horizontal overflow, page errors, or console errors from the premium route.
- Existing routes and shared design files remain unchanged.
