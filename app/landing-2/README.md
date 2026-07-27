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
- `components/landing-2/frame-sequence.ts`: frame manifest, URL generation, progress mapping, and canvas cover geometry.
- `components/landing-2/timeline.ts`: pure deterministic interpolation.
- `components/landing-2/useCinematicTimeline.ts`: local scroll measurement, direct playhead updates, frame invalidation, visibility pausing, and CSS variables.
- `components/landing-2/useFrameSequenceCanvas.ts`: bounded frame loading, decoded-frame cache, and responsive canvas drawing.
- `components/landing-2/WordReveal.tsx`: accessible word masks and stagger timing bands.
- `components/landing-2/CinematicLanding.tsx`: semantic stage and narrative markup.
- `components/landing-2/ServiceRail.tsx`: bounded buttons, keyboard navigation, pointer drag, touch swipe, and live announcements.
- `ASSET_MANIFEST.md`: audited source imagery and layer contract.
- `TIMELINE.md`: checkpoint map and retiming guide.
- `SCROLL_SEQUENCE_DESIGN.md` and `SCROLL_SEQUENCE_PLAN.md`: approved design and implementation record.
- `TEXT_MOTION_DESIGN.md` and `TEXT_MOTION_PLAN.md`: approved word-reveal and smooth-scroll record.

## Interaction

The Start, Journey, and Essentials links jump to real local timeline markers. Narrative copy reveals word by word through clipped masks, short vertical motion, opacity, and restrained blur. `/landing-2` uses the existing Lenis provider for wheel smoothing; touch stays native and reduced motion bypasses Lenis. The final catalog supports previous/next buttons, horizontal touch scrolling, pointer drag, `ArrowLeft`, `ArrowRight`, `Home`, and `End`. Service actions open a pre-addressed Atlas email.

## Verification results

| Check | Result |
| --- | --- |
| Timeline and component tests | Pass: 31 assertions. |
| Scoped ESLint | Pass: zero `/landing-2` errors or warnings. |
| TypeScript | Pass: `tsc --noEmit`. |
| Production build | Pass: statically rendered route, 6.92 kB route JS and 115 kB first-load JS including shared framework code. |
| 1440×900 desktop | Pass: all eight checkpoints inspected, no holes, collisions, stretching, or overflow. |
| 1280×720 laptop | Pass: no horizontal overflow. |
| 1024×768 landscape tablet | Pass: no horizontal overflow. |
| 768×1024 portrait tablet | Pass: hero and final frames inspected after focal-point correction. |
| 390×844 mobile | Pass: hero and final frames inspected, swipe-sized card and controls reachable. |
| Reverse scrolling | Pass: `0.74 → 0.44 → 0.18 → 0.00` converges to the same deterministic variables. |
| Keyboard catalog | Pass: arrows, Home, End, bounded controls, and live status. |
| Reduced motion | Pass: no Lenis or word motion; normal-flow hero, both narrative panels, and interactive catalog remain available. |
| Console and page errors | Pass: none on the route. |
| Playwright | Pass: all 20 checks across desktop and mobile Edge projects, run as two deterministic 10-test project passes. |

The production build reports only pre-existing lint warnings outside `/landing-2`; those files were not changed. The full repository Vitest run currently reports 119 passing and 18 failing tests in unrelated existing normal, dispatch, hybrid, horizon, and shared motion coverage.

The active world is a 379-frame, 1280×720 WebP sequence extracted from the supplied 31.59-second video at 12 fps. The full sequence is 15.69 MiB, while the canvas loader fetches only the requested frame and a bounded nearby window. The scroll loop pauses offscreen and stops after values converge.

## Production asset notes

No placeholder layer remains. The sequence lives under `/public/images/landing-2/sequence` and follows one continuous aircraft-window, clouds, campus, gate, corridor, and classroom camera path. A timeline-controlled pure-black layer sits between the canvas and semantic text for readability.
