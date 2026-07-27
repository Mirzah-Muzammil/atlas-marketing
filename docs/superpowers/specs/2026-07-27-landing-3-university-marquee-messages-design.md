# Landing 3 University Marquee and Message Bubbles Design

## Goal

Make the support testimonials visually match the supplied iMessage reference and add a complete UK university logo marquee immediately after the Landing 3 readiness section.

## iMessage testimonials

Keep the five existing reviewer names, avatars, and review copy. Each testimonial becomes a compact identity row followed by a separate charcoal-gray message bubble. The message bubble uses a wide pill radius, light text, and a curved lower-left tail formed from overlapping rounded shapes, matching the supplied dark iMessage reference rather than the current colorful gradient cards.

The resting composition remains staggered but uses minimal rotation and enough vertical separation to keep every review readable. Hovering or keyboard-focusing a testimonial expands the entire item, raises it above its neighbors, and strengthens its shadow. Reduced-motion mode applies the final expanded styling without animated translation.

## University marquee

Insert `Landing3UniversityMarquee` between `Landing3ReadinessSection` and `Landing3ServicesSection`. The content set is the current Universities UK membership list. Each university is represented by a locally stored official mark or official-site icon and its institution name.

Split the universities deterministically across three rows. Rows move continuously in alternating directions—left, right, left—with slightly different durations. Duplicate each row's content once inside the track to create a seamless loop.

The section uses the existing Landing 3 dark theme. Tiles are muted at rest. Hovering or keyboard-focusing a university pauses its row, lifts and enlarges the tile, restores full color, and adds a restrained glow. Each tile links to the university's official website and exposes the full institution name to assistive technology.

Reduced-motion mode stops the marquee and makes each row horizontally scrollable. The duplicated loop copy is hidden from assistive technology.

## Assets and sourcing

Use the Universities UK member page as the authoritative membership source. Use Google search and Google's official-site icon service to locate or retrieve marks associated with official university domains. Prefer official SVG or PNG assets when readily available. Store every used asset beneath `public/images/landing-3/universities/` and keep a TypeScript manifest containing the institution name, official domain, website URL, and local asset path.

## Verification

Unit tests cover the five reference-style message structures, curved tails, identity rows, complete university dataset, three alternating marquee directions, accessible duplicate handling, and section order. Browser tests cover seamless movement, opposite directions, hover pause/lift, reduced-motion settling, no horizontal page overflow, and desktop/mobile readability.

