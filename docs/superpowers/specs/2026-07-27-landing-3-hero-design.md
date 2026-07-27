# Landing 3 Hero Design

## Goal

Create the first section of a new Atlas landing page at `/landing-3`. The hero should closely follow Raycast's current homepage visual language and composition while using Atlas content and the supplied Three.js shader as its primary artwork.

## Scope

This iteration includes only the route shell, navigation, and hero section. Later sections will be designed and implemented separately. Existing Atlas routes and shared components must remain unchanged unless a small reusable import is already appropriate.

## Content

- Brand: Atlas
- Headline: “Your operating system for studying and succeeding abroad.”
- Supporting copy: “Apply with clarity. Land prepared. Build your life abroad—with every essential service and the right people in one place.”
- Primary action: “Get started — free”
- Secondary action: “Explore the platform”
- Navigation labels use Atlas's existing primary navigation content.

## Visual Design

The hero uses Raycast's dark, high-contrast visual system: a near-black canvas, restrained translucent borders, white foreground type, muted secondary copy, soft colored bloom, pill-shaped controls, and generous centered spacing. The headline is the dominant element and uses a large responsive sans-serif treatment with tight tracking.

The supplied shader fills the main visual field behind the content. Gradient masks and a subtle dark overlay keep text readable without obscuring the animated line pattern. The shader is decorative and does not receive pointer input.

Desktop uses a full-viewport composition with navigation at the top, centered copy in the upper-middle, and the shader occupying the background. Mobile keeps the same hierarchy, collapses nonessential navigation links, stacks the actions, and scales the headline without horizontal overflow.

## Architecture

- `app/landing-3/page.tsx` defines route metadata and renders the landing hero.
- `components/landing-3/Landing3Hero.tsx` owns semantic navigation and hero markup.
- `components/landing-3/ShaderAnimation.tsx` contains the supplied client-side Three.js scene.
- Tailwind utility classes provide layout, color, typography, borders, and responsive behavior. Route-specific CSS is added only if a shader mask or animation cannot be expressed clearly with utilities.

The shader component creates one scene, plane, material, and renderer after mount. It responds to its container size, caps pixel density to avoid unnecessary GPU cost, pauses or simplifies animation when reduced motion is requested, and disposes the animation frame, renderer, geometry, material, and canvas on unmount.

## Accessibility and Failure Behavior

Navigation and actions remain keyboard accessible and use semantic links. The shader canvas is hidden from assistive technology. Text contrast remains sufficient over every animation frame. If WebGL initialization fails, the hero retains its dark gradient background and all content remains usable.

## Verification

- Component tests confirm Atlas copy, actions, navigation, and shader container render at `/landing-3`.
- Type checking and linting must pass for changed files.
- A production build verifies the new Next.js route.
- Desktop and mobile screenshots confirm composition, overflow, contrast, and responsive navigation.
- Runtime inspection confirms the shader canvas mounts and cleanup does not produce console errors.

## Non-Goals

- Recreating sections below the Raycast hero.
- Changing existing Atlas landing pages.
- Adding a new animation framework or design-system abstraction.
- Copying Raycast product content, logos, or proprietary imagery.
