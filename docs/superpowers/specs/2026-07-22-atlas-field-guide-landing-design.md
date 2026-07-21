# Atlas Field Guide Landing Page Design

**Date:** 2026-07-22  
**Route:** `/landing`  
**Status:** Approved direction

## Goal

Create a premium, editorial landing page for GGI Atlas that explains the full study-abroad journey while reaching the visual and motion quality of the supplied Fable reference. The page must feel authored, tactile, and memorable without hiding the product behind spectacle.

The experience should immediately communicate that Atlas is a free operating system for international students, covering applications, arrival, settling in, community, career, and an optional paid Concierge service.

## Audience and outcome

The primary audience is an international student, especially an Indian student planning to study in the UK. The page should make that student feel that Atlas understands the entire journey and will remain useful after arrival.

The primary action is **Get started - free**. A secondary action lets the visitor explore how the product works. The page should also establish trust through transparent pricing, business-model disclosure, and concrete product demonstrations.

## Creative direction: Atlas Field Guide

The page uses a warm editorial art direction inspired by travel journals, field guides, passports, and cartography. It combines:

- Warm paper and parchment surfaces with deep ink text.
- Atlas blue as the core brand color and signal green as a rare interactive accent.
- Oversized serif display typography paired with compact sans-serif and mono labels.
- Thin cartographic lines, coordinates, stamps, index marks, and subtle paper grain.
- Realistic product UI fragments presented as evidence, not generic mockup decoration.
- Motion tied to scrolling and interaction, with static content remaining legible at every point.

The visual reference is interpreted rather than copied. The Fable reference contributes its editorial pacing, confident typography, framed scenes, and cinematic transitions. Atlas supplies its own journey metaphor, content, product interface, and brand language.

## Page structure

### 1. Hero: The whole journey, on one map

The opening viewport presents the headline:

> Your operating system for studying and succeeding abroad.

The word “succeeding” receives the primary expressive treatment. Supporting copy explains that Atlas connects university matching, services, settling in, and life after arrival. Primary and secondary calls to action remain visible without waiting for animation.

A large framed journey card sits behind or beside the copy. It contains a route from India to the UK, a compact personal status panel for “Komal,” and live-looking journey labels. Pointer movement adds restrained depth. As the visitor begins to scroll, the hero frame recedes and the route line becomes the page’s continuous narrative spine.

### 2. Journey spine: Plan, settle, thrive

Three narrative chapters follow the actual Atlas hierarchy:

1. **Plan & apply** - matcher, applications, visa, scholarships, and document checklists.
2. **Arrive & settle** - banking, SIM, housing, insurance, forex, loans, and tax.
3. **Build & thrive** - jobs, community, events, career tools, and the Graduate Route.

The chapter container pins on larger screens while the foreground content advances. A route marker moves between stages, progress labels update, and the palette shifts from paper to blue and back. Mobile uses a normal vertical sequence with lightweight reveal motion.

### 3. Product proof: A real product, not a brochure

A cinematic dashboard scene demonstrates how Atlas feels after onboarding. It shows a personalised Imperial College journey, profile completion, active tasks, applications, Essentials, and Concierge.

The interface is built with HTML and CSS so it remains sharp, responsive, and accessible. Scroll changes the selected stage and highlights the next task. The scene must remain understandable with JavaScript disabled or reduced motion enabled.

### 4. Essentials desk

Eight core services appear as a tactile field-guide index. Hovering or focusing a service updates a central detail card; tapping selects it on touch devices. Each entry contains concrete, honest copy and a disclosure that Atlas receives a referral fee when applicable.

This section demonstrates utility instead of presenting a generic feature grid.

### 5. Life after landing

The emotional high point explains the part other platforms omit: community, career, events, and year-round support. Large editorial statements are paired with concise proof points:

- 14,000+ students and alumni.
- Sponsorship-friendly jobs and career tools.
- Graduate Route guidance.
- Continued access through study and early career.

The scroll rhythm opens up here, with larger images or color fields and less interface chrome.

### 6. Concierge

A dark, premium chapter introduces the paid human service without confusing it with the free Student OS. It explains the one-time £1,500 price, assigned specialist, roadmap, tasks, messages, meetings, secure document exchange, and arrival support.

The transition should feel like opening a separate, premium folio inside the same Atlas system.

### 7. Honest model and FAQ

An editorial manifesto explains why Atlas is free, how partner referrals work, why university kickbacks are rejected, and what Concierge pays for. The FAQ uses native disclosure elements for accessibility and covers the existing five questions.

### 8. Final departure card

The final call to action reads:

> Built to help you get out, and stay out.

It reiterates that setup takes three minutes, requires no card, and has no tier upgrades. The route line resolves into the Atlas mark or a departure stamp.

## Interaction and motion system

Motion must clarify progression and reinforce cause and effect.

- Hero type enters in clipped lines, followed by the route drawing itself.
- The global route line advances according to scroll progress.
- Pinned scenes use short transforms, masks, and opacity changes instead of continuous decorative loops.
- Product cards respond to hover, focus, and touch with small depth and state changes.
- Navigation compresses after the hero and shows section progress.
- Buttons use magnetic movement only on fine pointers; touch and keyboard behavior remain conventional.
- All major effects have a reduced-motion path that removes pinning, smooth scrolling, parallax, and staged delays.

GSAP and ScrollTrigger manage the narrative sequence because they already exist in the project. CSS handles hover, focus, and ambient effects. The existing Lenis provider supplies smooth scrolling, while native scrolling remains the reduced-motion fallback.

## Easter eggs

Two discoverable but nonessential details are included:

1. Entering `ATLAS` on the keyboard reveals a temporary constellation overlay and the message “You found the long way home.” It does not intercept typing inside form controls.
2. Clicking the small coordinate label in the footer stamps the page with a randomized “Cleared for departure” mark. The stamp can be dismissed and is announced to assistive technology.

Neither easter egg is required to understand or navigate the page.

## Architecture

The new route lives under `app/landing`. It receives its own layout metadata and scoped stylesheet so existing routes are unaffected.

The implementation is intentionally small:

- `app/landing/page.tsx` composes the page and owns static content.
- `app/landing/layout.tsx` provides route metadata.
- `app/landing/landing.css` contains the route-scoped visual system and responsive styles.
- `components/landing/LandingExperience.tsx` owns client-side navigation, scroll motion, interactive Essentials, and easter eggs.
- `tests/landing.test.tsx` verifies content, semantics, and reduced-motion-safe behavior.
- `e2e/landing.spec.ts` verifies the real route, primary interactions, and responsive rendering.

The page will reuse existing hooks and motion providers where doing so is direct. No new animation or UI dependency is required.

## Data flow and resilience

All marketing content is static and rendered on the server. Client JavaScript progressively enhances the rendered page. The page does not make external requests or depend on authentication.

If motion setup fails, the page remains fully visible in document order. Interactive service details default to the first service, and native links and FAQ disclosures continue to work.

## Accessibility and performance

- One descriptive `h1` and sequential heading levels.
- Keyboard-accessible navigation, service selector, FAQ, and easter eggs.
- Visible focus states and sufficiently large touch targets.
- Semantic buttons for state changes and links for navigation.
- Decorative artwork hidden from assistive technology.
- Contrast suitable for WCAG AA across paper, blue, and dark sections.
- Full `prefers-reduced-motion` handling.
- No autoplaying video or heavy WebGL scene.
- CSS shapes, existing local imagery, and compressed raster assets only where they materially improve the story.
- No layout shifts from motion or late-loading media.

## Verification

Completion requires evidence for all of the following:

- `/landing` renders without affecting existing routes.
- The source-site product story and the MVP PDF’s newer Profile, Scholarship, Essentials tracking, Career, and Concierge content are represented accurately.
- Desktop and mobile layouts retain hierarchy and readable content.
- Navigation, service selection, FAQ, keyboard easter egg, and footer stamp work.
- Reduced-motion mode removes scroll pinning and nonessential movement.
- The production build, typecheck, relevant unit tests, and landing-page browser checks pass.
- Visual browser review confirms there is no clipping, overlap, illegible text, or broken motion at representative desktop and mobile sizes.

## Out of scope

- Building or connecting the actual Atlas product.
- Authentication, forms, analytics, or partner referral tracking.
- Replacing existing routes or global design systems.
- Reproducing the Fable site or video frame for frame.
- Adding speculative platform features not present in the source site or MVP specification.
