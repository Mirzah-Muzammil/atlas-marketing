# Landing 3 Dashboard Showcase Design

## Goal

Add the second section to `/landing-3`: a Raycast-inspired product showcase that introduces the Atlas dashboard inside a MacBook presentation frame.

## Scope

This iteration adds only the dashboard showcase directly below the existing hero. Later Landing 3 sections remain out of scope. The current hero, shader, navigation, and unrelated routes must not change except for composing the new section after the hero.

## Content

- Primary line: “Take shortcuts, not detours.”
- Secondary line: “One interface, everything you need.”
- Temporary media: `/images/crm.png`
- Accessible media description: “Atlas dashboard showing a student’s application journey, next steps, and services.”

## Visual Design

The section continues the hero’s near-black canvas with a subtle charcoal transition. Its centered heading uses the same high-contrast white type, tight tracking, and large responsive scale established by the hero. The first line is slightly muted and the second line carries the strongest emphasis.

Below the heading, the dashboard appears inside a CSS-built MacBook frame. The device includes a thin dark aluminum bezel, rounded display corners, a centered camera notch, a shallow lower base, and a restrained floor reflection. A soft blue-purple glow sits behind the device, while a slight desktop perspective gives it depth without compromising screenshot legibility.

The laptop fills most of the available desktop width. On narrow screens, it scales proportionally within the viewport with no horizontal scrolling. The dashboard remains framed rather than cropped, and the device base is simplified enough to stay readable at mobile sizes.

## Architecture

- `components/landing-3/Landing3DashboardShowcase.tsx` owns the section markup, heading, MacBook frame, and media slot.
- `components/landing-3/Landing3Hero.tsx` renders the showcase immediately after the hero section.
- The existing `/images/crm.png` asset is rendered with `next/image` using its intrinsic 1144 by 575 dimensions.
- Tailwind utilities provide layout, gradients, borders, perspective, and responsive scaling. No new dependency or global style is required.

The screen contains one replaceable media slot. A later video implementation can replace the image inside that slot without altering the device frame or surrounding section.

## Motion and Accessibility

The heading and laptop may enter with a small opacity and vertical transition driven by CSS. The section remains fully visible when reduced motion is preferred, and decorative device details are hidden from assistive technology. The screenshot retains meaningful alternative text.

## Verification

- Component tests confirm both heading lines, the dashboard image, its alternative text, and the MacBook frame markers.
- Existing Landing 3 hero and shader tests continue to pass.
- Type checking, linting, and a production build pass for the completed route.
- Microsoft Edge browser tests confirm the section appears after the hero and produces no horizontal overflow at desktop and mobile widths.
- Desktop and mobile screenshots confirm device proportions, media legibility, heading hierarchy, and continuity with the hero.

## Non-Goals

- Adding or generating a dashboard video.
- Building an interactive dashboard.
- Adding keyboard, trackpad, or detailed hardware controls to the MacBook frame.
- Recreating later Raycast sections.
- Changing the current Atlas dashboard screenshot.
