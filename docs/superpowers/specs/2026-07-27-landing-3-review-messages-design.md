# Landing 3 Review Messages Design

## Goal

Make the Atlas support testimonials read unmistakably as customer reviews and behave like approachable iMessage bubbles without hiding their content.

## Copy

Replace the support heading with two stacked lines:

- `Real stories.`
- `Real support.`

Keep the existing Atlas support description and testimonial copy.

## Message composition

Each testimonial remains a colorful rounded message bubble with its avatar, reviewer name, and quoted review. Add one left-facing iMessage tail to every bubble. The tail uses the same background as its parent bubble and follows the bubble's existing rotation.

Reduce the amount of overlap between bubbles on desktop and mobile so each reviewer identity and message remains readable in the resting state. Preserve the lively staggered arrangement rather than converting it into a uniform list.

## Interaction

Hovering or keyboard-focusing a testimonial expands it into a larger card-like message, raises it above the other messages, and strengthens its shadow. The transition lasts approximately 300 milliseconds. Moving focus or the pointer away restores the original composition.

The entire bubble is keyboard focusable. Touch devices retain the readable resting layout; native tap focus can show the same expanded state. Reduced-motion users receive the size and stacking change without animated movement.

## Accessibility and verification

The testimonials remain semantic `blockquote` elements. The new title is exposed as the section heading. The tail is decorative and hidden from assistive technology. Tests cover the title, tail presence, keyboard focusability, expanded hover/focus presentation, and unobscured resting messages at desktop and mobile sizes.

