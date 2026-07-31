# Landing 3 Editorial Resources Section

## Goal

Replace the current autoplaying laptop demo in “Resources for the decisions ahead.” with an editorial resource library based on the supplied `atlas-resources-section.html`. The new section must feel native to Landing 3, avoid generic SaaS cards, and communicate that Atlas publishes useful guides and provides practical student tools.

## Content

Retain the existing section heading:

> Resources for the decisions ahead.

Remove the orange eyebrow and supporting subtitle. Use the supplied HTML content hierarchy:

- One flagship UK guide for the 2026 intake
- Four current articles covering visas, scholarships, settlement, and careers
- Three account-based tools: budget calculator, visa readiness check, and downloadable checklists
- Two closing actions: browse resources and unlock the tools

## Layout

The section uses one centered content shell aligned with the other Landing 3 sections.

1. The animated section title sits above the content at the same scale, weight, line-height, and reveal behavior as adjacent Landing 3 titles.
2. The primary area is an asymmetric editorial spread:
   - The left side is a large flagship publication surface with layered paper edges, chapter metadata, title, description, and reading action.
   - The right side is a vertically ruled article index. Each article is a row rather than a contained card.
3. A horizontal tool strip sits below the spread. The three tools use restrained glass surfaces with small interface fragments, not boxed icons.
4. The final actions sit together beneath the tools.

On small screens, the spread becomes a single column: flagship publication, article index, tools, and actions.

## Visual Treatment

- Background: Landing 3 black with a subtle grid and low orange depth matching the rest of the page.
- Title: existing `Landing3AnimatedTitle` treatment.
- Publication: layered dark paper surfaces, fine white rules, editorial typography, and a controlled orange edge.
- Article index: transparent rows separated by hairline rules; no rounded outer cards.
- Tools: low-opacity glass with crisp borders and a small functional UI sample inside each surface.
- Accent: `#f35a02`, used selectively for metadata, progress details, focus states, and primary action.
- No orange eyebrow, subtitle, large icon tiles, decorative icon boxes, or autoplaying demo window.

## Motion and Interaction

Motion is limited to entrance and hover/focus feedback:

- The content group enters with a short opacity and vertical-offset reveal when it becomes visible.
- The flagship publication layers separate slightly on hover or keyboard focus.
- Article arrows translate a few pixels and the active row gains contrast.
- Tool surfaces lift slightly and their internal UI detail becomes clearer.
- Buttons use the existing Landing 3 hover language.
- No timed cycling, cursor simulation, looping progress bars, or continuous animation.
- `prefers-reduced-motion` removes transforms and transition-driven movement.

## Component and State Changes

Keep `Landing3ResourcesSection` as the public component. Remove its autoplay state, timers, resource demo scenes, and laptop-frame markup. Resource and tool content remains local static data rendered as semantic links.

The implementation should remain in the current component unless a small CSS module materially improves animation clarity. No new site-wide abstraction is required.

## Accessibility

- The heading remains a semantic `h2`.
- Every guide, article, tool, and action is a keyboard-focusable link with a descriptive accessible name.
- Decorative publication layers and grid textures are hidden from assistive technology.
- Focus states remain visible against the dark background.
- Reduced-motion users receive the full static layout without movement.

## Verification

- Update Landing 3 tests to assert the new editorial hierarchy and absence of autoplay/demo controls.
- Confirm the eyebrow and subtitle are absent.
- Confirm one flagship guide, four article links, three tool links, and two closing actions render.
- Confirm no interval-driven demo state or laptop frame remains.
- Run the focused Landing 3 tests, TypeScript checking, touched-file lint, production build, and a live `/landing-3` health check.
