# `/landing-2`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/landing-2`.

Production checks:

```bash
npm test -- tests/landing-2-timeline.test.ts tests/landing-2.test.tsx
npx eslint app/landing-2 components/landing-2 tests/landing-2-timeline.test.ts tests/landing-2.test.tsx e2e/landing-2.spec.ts
npm run typecheck
npm run build
npx playwright test e2e/landing-2.spec.ts
```

## Structure

- `page.tsx` and `layout.tsx`: route entry, metadata, and isolated styling.
- `landing-2.css`: design tokens, layer composition, responsive rules, and reduced-motion normal flow.
- `components/landing-2/scene-data.ts`: copy, services, assets, and timeline markers.
- `components/landing-2/timeline.ts`: pure deterministic interpolation.
- `components/landing-2/useCinematicTimeline.ts`: local scroll measurement, frame invalidation, smoothing, visibility pausing, and CSS variables.
- `components/landing-2/CinematicLanding.tsx`: semantic stage and narrative markup.
- `components/landing-2/ServiceRail.tsx`: bounded buttons, keyboard navigation, pointer drag, touch swipe, and live announcements.
- `ASSET_MANIFEST.md`: audited source imagery and layer contract.
- `TIMELINE.md`: checkpoint map and retiming guide.

## Interaction

The Start, Journey, and Essentials links jump to real local timeline markers. The final catalog supports previous/next buttons, horizontal touch scrolling, pointer drag, `ArrowLeft`, `ArrowRight`, `Home`, and `End`. Service actions open a pre-addressed Atlas email.

## Verification results

| Check | Result |
| --- | --- |
| Timeline and component tests | Pass: 24 assertions. |
| Scoped ESLint | Pass: zero `/landing-2` errors or warnings. |
| TypeScript | Pass: `tsc --noEmit`. |
| Production build | Pass: statically rendered route, 6.14 kB route JS and 114 kB first-load JS including shared framework code. |
| 1440×900 desktop | Pass: all eight checkpoints inspected, no holes, collisions, stretching, or overflow. |
| 1280×720 laptop | Pass: no horizontal overflow. |
| 1024×768 landscape tablet | Pass: no horizontal overflow. |
| 768×1024 portrait tablet | Pass: hero and final frames inspected after focal-point correction. |
| 390×844 mobile | Pass: hero and final frames inspected, swipe-sized card and controls reachable. |
| Reverse scrolling | Pass: `0.74 → 0.44 → 0.18 → 0.00` converges to the same deterministic variables. |
| Keyboard catalog | Pass: arrows, Home, End, bounded controls, and live status. |
| Reduced motion | Pass: normal-flow hero, both narrative panels, and interactive catalog. |
| Console and page errors | Pass: none on the route. |
| Playwright | Pass: all 20 checks across desktop and mobile Edge projects, run as two deterministic 10-test project passes. |

The full repository baseline remains 49 passing and 18 failing tests in unrelated existing `/normal`, `/dispatch`, `/hybrid`, and loader code. Those files were not changed. The production build reports only pre-existing lint warnings outside `/landing-2`.

The active cinematic WebP plates total approximately 364 kB before Next Image generates responsive candidates. The 14.88-second classroom video is metadata-preloaded, scrubbed by scroll, and plays only in the settled final state. The frame loop pauses offscreen and stops after values converge.

## Production asset notes

No placeholder layer remains. The generated flight window and aerial campus plate live under `/public/images/landing-2`; the existing Atlas classroom video supplies the moving destination. Their aperture, skylight, and classroom subject share one centered camera path.
