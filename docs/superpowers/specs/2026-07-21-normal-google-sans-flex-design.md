# Normal Page Google Sans Flex Design

## Goal

Use Google Sans Flex as the primary typeface throughout `/normal` without changing typography on the other site routes.

## Approach

Load Google Sans Flex through the official Google Fonts CSS API from `app/normal/globals.css`. The installed Next.js version does not expose a `Google_Sans_Flex` helper through `next/font/google`, so the CSS API is the smallest supported integration and avoids upgrading framework dependencies.

Remove the unused Host Grotesk loader from `app/normal/layout.tsx`. Define the normal theme's sans token and body font family as `"Google Sans Flex", sans-serif`, allowing every existing `font-sans` utility and inherited text style on `/normal` to use the new family.

## Scope and safeguards

- Apply the font only through the `/normal` layout and stylesheet.
- Keep all existing font sizes, weights, spacing, animation, and component structure unchanged.
- Request the variable optical-size and weight ranges needed by the current design.
- Retain `sans-serif` as the system fallback if the remote font cannot load.

## Verification

- Add a focused source test for the official font import, exact font-family stack, and removal of Host Grotesk from the normal layout.
- Run the focused normal typography test, TypeScript check, and production build.
