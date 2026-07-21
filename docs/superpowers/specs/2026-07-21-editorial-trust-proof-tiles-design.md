# Editorial Trust Proof Tiles

## Scope

Change only the three proof points at the bottom of the editorial “Why this exists” section. The heading, body copy, marquee, section spacing, and existing scroll animation remain unchanged.

## Design

Replace the plain ruled columns with three square-edged editorial tiles that use the existing Dispatch palette:

- Ink tile: “To use, ever” / “£0”
- Mint tile: “To set up” / “3 min”
- Sage tile: “Required” / “No card”

Each tile includes a small `01`–`03` index, an uppercase label, a thin accent rule, and an oversized value. On desktop the middle tile is offset slightly upward to create an editorial rhythm. On fine-pointer hover, a tile lifts subtly and its accent rule expands. Mobile uses a simple vertical stack.

## Motion and Accessibility

Keep the existing `data-trust-proof` hooks so the current staggered GSAP reveal continues to work. Hover is decorative and must not hide content. Reduced-motion preferences disable the new hover transitions and transforms.

## Verification

Add a focused component test that confirms all three proof tiles, indices, labels, values, and motion hooks are present. Run that test, TypeScript checking, and the production build.
