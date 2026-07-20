# Normal Static Atlas Data Design

## Goal

Keep the existing `/normal` visual design unchanged while replacing its Dooyt/API-fed content with static content taken only from `https://genuine-cat-a1b78a.netlify.app/` and its linked first-party pages.

## Approved scope

- Preserve the remaining page structure, Tailwind classes, spacing, typography, motion attributes, card geometry, and responsive behavior.
- Remove the Pricing and Testimonials sections because the supplied source has no three-plan monthly/annual dataset and no rated customer testimonials.
- Replace the six landing-page GET requests with local typed constants for modules, services, and FAQs.
- Keep the existing demo-request POST behavior out of this data migration; it is an interaction, not a content feed.
- Replace visible Dooyt/ERP copy, metadata, navigation labels, links, and alternative text with exact source-backed Atlas content.
- Supply the currently missing image files using captures of UI/content from the supplied source while keeping every existing image path and image wrapper unchanged.
- Do not delete API, Prisma, or generated files owned by the parallel backend work. `/normal` simply stops importing the landing-page API client.

## Data mapping

- Modules use the source product areas: Command Center, University Matcher, Service Bazaar, Community, Events, Career & Jobs, Profile, and Inbox.
- The eight fixed industry slots become the source's eight settlement services in source order: SIM & eSIM, Banking, Insurance, Visas, Housing, Forex, Tax filing, and Loans. Internal slot IDs remain unchanged because they are layout keys only.
- FAQs use the five exact questions and answers from the source homepage.
- Hardcoded page copy comes from the source homepage, How It Works, About, and Concierge pages.
- Pricing and Testimonials are not synthesized or replaced with invented content.

## Verification

- A unit contract test proves `/normal` does not call the landing data API and renders the approved section order.
- A design-freeze assertion protects the class-name sequence in all retained `/normal` components.
- Tests reject remaining Dooyt/ERP copy and verify representative source-backed strings.
- Browser QA checks desktop and mobile layout, interactions, missing images, console errors, and browser-side data API requests.

