# Landing 3 FAQ, Testimonials, and Footer Design

## Goal

Extend `/landing-3` with a Rainbow-inspired Atlas FAQ, subtle readiness-card hover feedback, iMessage-style student testimonials, and a dedicated footer that visually matches `/normal` without importing its footer component.

## FAQ section

- Add a dedicated `Landing3FaqSection` after the support section and before the footer.
- Match Rainbow's two-column desktop composition: a large stacked “Frequently Asked Questions” heading on the left and three divided FAQ rows on the right.
- Adapt only the palette to Landing 3's dark theme.
- Each row is an accessible disclosure button with a plus icon that becomes a close icon while expanded.
- Use Atlas content for these questions:
  1. “Is Atlas really free?”
  2. “What happens after I land?”
  3. “How does Atlas choose its service partners?”
- Include a “See more FAQs →” mail link for additional questions.
- On mobile, stack the heading above the FAQ list without horizontal overflow.

## Readiness hover response

- Keep the existing entrance animation and content.
- Add a subtle card hover response only: a small upward translation, a slightly brighter border/background, and a brighter icon.
- Preserve keyboard accessibility with the same visual response on `focus-within`.
- Disable the transform when reduced motion is requested.

## Support testimonials

- Keep the existing “Controlled by you. Supported by Atlas.” panel and layered composition.
- Replace plain text pills with iMessage-inspired testimonial bubbles.
- Every bubble contains a circular avatar, a student name, and a quoted review.
- Use five concise Atlas student testimonials with varied bubble colors and existing layered rotations.
- Keep the bubbles static during scroll and retain the existing subtle hover lift.
- Provide meaningful avatar alt text and semantic `blockquote` markup.

## Dedicated footer

- Create `Landing3Footer` as a new component.
- Duplicate the `/normal` footer's markup, layout, typography, icons, wordmark image, and responsive behavior without importing `components/sections/footer.tsx`.
- Update internal links to Landing 3 section IDs while preserving the Apply, Settle, and Thrive column structure.
- Render it after the FAQ section.

## Testing and acceptance

- Add unit coverage for Atlas FAQ content and disclosure behavior.
- Assert that readiness cards expose the new hover styling contract.
- Assert that each testimonial includes an avatar, name, and quoted review.
- Assert that Landing 3 renders its own footer with the `/normal` footer's core content and wordmark.
- Add browser checks for section order, desktop/mobile FAQ layout, disclosure behavior, hover feedback, and horizontal overflow.
- Run focused Landing 3 unit tests, desktop/mobile browser tests, type/build verification, and a port 3000 health check.

