# Landing 3 Dashboard Showcase Design

## Goal

Add the second section to `/landing-3`: a close visual adaptation of Raycast's current product showcase, using Atlas copy and the Atlas dashboard.

## Scope

This iteration adds only the dashboard showcase directly below the existing hero. Later Landing 3 sections remain out of scope. The current hero, shader, navigation, and unrelated routes must not change except for composing the new section after the hero.

## Content

- Primary line: “From application to arrival.”
- Secondary line: “One Atlas, every next step.”
- Temporary media: `/images/crm.png`
- Accessible media description: “Atlas dashboard showing a student’s application journey, next steps, and services.”

## Visual Design

The section continues the hero's near-black canvas. Its centered heading follows the reference's compact scale rather than the hero's display scale: approximately 22–24px on desktop, two clearly separated lines, medium weight, restrained tracking, and solid white. Mobile type scales down modestly while retaining the same hierarchy.

Below the heading, the dashboard appears inside a large flat display frame modeled on the Raycast reference. It is not a literal physical MacBook: there is no keyboard base, camera notch, metallic wedge, floor reflection, or perspective tilt. The frame uses a thin double border, dark glass surround, 18–22px corners, and a width of roughly 84% of the desktop viewport. The dashboard itself sits inside the frame without cropping.

A sparse star field and restrained blue glow emerge behind the frame, echoing the Raycast section without copying its product artwork. On narrow screens, the display scales proportionally within the viewport with no horizontal scrolling.

## Architecture

- `components/landing-3/Landing3DashboardShowcase.tsx` owns the section markup, heading, display frame, decorative glow, and media slot.
- `components/landing-3/Landing3Hero.tsx` renders the showcase immediately after the hero section.
- The existing `/images/crm.png` asset is rendered with `next/image` using its intrinsic 1144 by 575 dimensions.
- Tailwind utilities provide layout, gradients, borders, and responsive scaling. A small client-side motion wrapper may use the project's existing GSAP dependency for scroll entrance and the screenshot's restrained loop. No new dependency is required.

The screen contains one replaceable media slot. A later video implementation can replace the image inside that slot without altering the device frame or surrounding section.

## Motion and Accessibility

The heading fades upward first as the section enters the viewport. The display follows by moving upward and scaling from roughly 96% to 100%. Inside the frame, the screenshot uses a very slow drift/zoom and a soft highlight sweep so the placeholder feels alive without impersonating a working interface. Motion is disabled when `prefers-reduced-motion` is enabled, leaving the final state fully visible. Decorative details are hidden from assistive technology, and the screenshot retains meaningful alternative text.

## Verification

- Component tests confirm both Atlas heading lines, the dashboard image, its alternative text, and the flat display-frame markers.
- Existing Landing 3 hero and shader tests continue to pass.
- Type checking, linting, and a production build pass for the completed route.
- Microsoft Edge browser tests confirm the section appears after the hero and produces no horizontal overflow at desktop and mobile widths.
- Desktop and mobile screenshots confirm compact typography, reference-like frame proportions, media legibility, motion-ready markup, and continuity with the hero.

## Non-Goals

- Adding or generating a dashboard video.
- Building an interactive dashboard.
- Adding physical laptop hardware such as a keyboard, trackpad, notch, or base.
- Recreating later Raycast sections.
- Changing the current Atlas dashboard screenshot.
