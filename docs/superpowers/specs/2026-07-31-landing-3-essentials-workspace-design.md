# Landing 3 Essentials Workspace Design

## Goal

Replace the decorative orbiting-phone section with a product-led workspace that explains how Atlas connects the practical services a student needs after choosing a university.

## Layout

The section keeps the existing `#essentials-orbit` anchor so navigation and footer links continue to work. It uses the existing dark visual language and spans the content width rather than presenting another device mockup.

The heading becomes **“Everything you need, connected.”** Beneath it, one restrained workspace is divided into two areas:

- A student context panel showing destination, intake, readiness, and the most important next priority.
- An essentials list containing University, Visa, Funding, Housing, Banking, Travel, Insurance, and Community.

Each essential is a compact row with a plain-language status and a specific next action. The rows are product UI, not marketing cards: consistent spacing, thin separators, minimal decoration, and no floating icons or orbit animation.

## Visual Direction

- Background: existing near-black page background with a faint grid and a restrained orange focus glow.
- Workspace: one subtle bordered surface with limited glass treatment, matching the surrounding Atlas dashboard visuals.
- Active priority: orange status marker and route accent.
- Completed state: quiet green status treatment.
- Upcoming state: neutral white/gray treatment.
- Hover: a small background and text-contrast lift only; no scaling or autoplay.

The orange route visually connects the current priority to the relevant essentials without becoming a decorative animation.

## Responsive Behavior

Desktop uses a two-column workspace. Mobile stacks the student context above the essentials list. All status information remains visible without horizontal scrolling, and links retain comfortable touch targets.

## Accessibility

- The essentials remain a named semantic list.
- Every row exposes its service, status, and next action as text.
- Decorative grid, glow, and route elements are hidden from assistive technology.
- Hover styling is paired with focus-visible styling.
- The design does not depend on motion and respects the page's reduced-motion behavior by avoiding essential animation.

## Testing

Update the Landing 3 component test to verify:

- the new section heading;
- removal of the orbit and iPhone presentation;
- the student context and readiness summary;
- all eight essentials;
- a status and next action for each essential;
- preservation of the `#essentials-orbit` navigation target.

## Scope

Only the existing Landing 3 essentials section and its focused tests change. Page order, navigation anchors, other sections, and unrelated files remain untouched.
