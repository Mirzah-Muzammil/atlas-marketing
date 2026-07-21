# Normal Cinematic Line-Art Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the centered `/normal` hero with a left-aligned editorial message layered over a responsive, animated line-art student journey.

**Architecture:** Keep `Hero` responsible for semantic content and actions, extract the decorative code-native SVG into `StudentJourneyArtwork`, and keep responsive motion in `/normal` CSS. The animation remains CSS-only so the static SVG is the no-JavaScript and reduced-motion fallback.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, CSS keyframes, Vitest, Testing Library

---

### Task 1: Define the new hero contract with a failing test

**Files:**
- Modify: `tests/normal-hero-airplane.test.tsx`

- [ ] **Step 1: Replace the airplane regression with the new hero expectations**

```tsx
import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import Hero from "@/components/sections/hero";

it("presents the student operating system over a decorative journey scene", () => {
  const { container } = render(<Hero />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /your operating system for studying and succeeding abroad/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("The student operating system")).toBeInTheDocument();
  expect(screen.getByText("Get started — free")).toHaveAttribute(
    "for",
    "demo-modal-toggle",
  );
  expect(screen.getByRole("link", { name: /explore the platform/i })).toHaveAttribute(
    "href",
    "#features",
  );
  expect(screen.getByText(/£0 forever/i)).toBeInTheDocument();

  const artwork = container.querySelector("[data-student-journey-artwork]");
  expect(artwork).toHaveAttribute("aria-hidden", "true");
  expect(artwork?.querySelector("[data-journey-route]")).toBeInTheDocument();
  expect(artwork?.querySelectorAll("[data-journey-stop]")).toHaveLength(7);
  expect(container.querySelector("[data-airplane-flight]")).not.toBeInTheDocument();
});

it("defines responsive, reduced-motion-safe journey animation", () => {
  const css = readFileSync(
    resolve(process.cwd(), "app/normal/globals.css"),
    "utf8",
  );

  expect(css).toContain("@keyframes atlas-journey-draw");
  expect(css).toContain("@keyframes atlas-journey-pulse");
  expect(css).toContain("@keyframes atlas-student-drift");
  expect(css).toContain("[data-student-journey-artwork]");
  expect(css).toContain("@media (max-width: 767px)");
  expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  expect(css).not.toContain("@keyframes atlas-airliner-orbit");
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/normal-hero-airplane.test.tsx`

Expected: FAIL because the eyebrow, journey artwork, new CTA label, and journey keyframes do not exist yet.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/normal-hero-airplane.test.tsx
git commit -m "test: define cinematic normal hero"
```

### Task 2: Build the static hero composition and artwork

**Files:**
- Create: `components/sections/StudentJourneyArtwork.tsx`
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Create the decorative SVG component**

Create `StudentJourneyArtwork` as an `aria-hidden` SVG with `viewBox="0 0 960 760"`. It must include:

```tsx
import type { CSSProperties } from "react";

export default function StudentJourneyArtwork() {
  const stops = [
    { x: 126, y: 168, label: "MATCH" },
    { x: 326, y: 102, label: "VISA" },
    { x: 512, y: 174, label: "HOME" },
    { x: 716, y: 112, label: "BANK" },
    { x: 826, y: 306, label: "SIM" },
    { x: 696, y: 520, label: "PEOPLE" },
    { x: 430, y: 622, label: "CAREER" },
  ];

  return (
    <svg
      aria-hidden="true"
      className="atlas-journey-artwork"
      data-student-journey-artwork
      focusable="false"
      viewBox="0 0 960 760"
    >
      <path
        className="atlas-journey-route"
        d="M126 168C214 52 386 63 512 174c118 105 230-96 314 132 44 120-26 238-130 214-142-34-118 102-266 102"
        data-journey-route
        pathLength="1"
      />
      {stops.map((stop, index) => (
        <g
          className="atlas-journey-stop"
          data-journey-stop
          key={stop.label}
          style={{ "--stop-index": index } as CSSProperties}
          transform={`translate(${stop.x} ${stop.y})`}
        >
          <circle r="12" />
          <circle className="atlas-journey-stop__core" r="3.5" />
          <text x="0" y="32">{stop.label}</text>
        </g>
      ))}
      <g className="atlas-sketch atlas-campus-sketch">
        <path d="M48 278h252M74 278v-92h198v92M58 186h230L173 116 58 186Z" />
        <path d="M108 278v-62m43 62v-62m43 62v-62m43 62v-62M91 202h164" />
        <path className="atlas-sketch__accent" d="M173 116v-38m0 0 42 18-42 18" />
      </g>
      <g className="atlas-sketch atlas-city-sketch">
        <path d="M560 604V430h118v174m0-126h92v126m-183-132h24m-24 42h24m-24 42h24m42-50h50m-50 42h50M540 604h258" />
        <path className="atlas-sketch__accent" d="M704 604v-58h38v58" />
      </g>
      <g className="atlas-sketch atlas-service-symbols">
        <g transform="translate(300 134)">
          <rect height="64" rx="8" width="48" x="-24" y="-32" />
          <circle cx="0" cy="-8" r="8" />
          <path d="M-12 14c7-10 17-10 24 0" />
        </g>
        <g transform="translate(506 202)">
          <path d="M-34 4 0-24 34 4v30h-68V4Z" />
          <path d="M-8 34V10H8v24" />
        </g>
        <g transform="translate(716 148)">
          <path d="M-38-8 0-28 38-8M-32-2h64M-25 4v32m17-32v32M8 4v32m17-32v32M-38 42h76" />
        </g>
        <g transform="translate(824 342)">
          <rect height="76" rx="12" width="42" x="-21" y="-38" />
          <path d="M-7 28H7" />
          <path className="atlas-sketch__accent" d="M-9-12c5-5 13-5 18 0m-12 8c2-2 4-2 6 0" />
        </g>
        <g transform="translate(706 534)">
          <circle cx="-18" cy="-12" r="10" />
          <circle cx="18" cy="-12" r="10" />
          <path d="M-38 22c5-18 34-18 40 0m-4 0c6-18 35-18 40 0" />
        </g>
        <g transform="translate(426 620)">
          <rect height="48" rx="6" width="72" x="-36" y="-20" />
          <path d="M-13-20v-12h26v12m-49 20c25 12 47 12 72 0" />
        </g>
      </g>
      <g className="atlas-sketch atlas-student-sketch">
        <path d="M650 318c0-37 22-62 54-62s54 25 54 62" />
        <circle cx="704" cy="222" r="42" />
        <path className="atlas-sketch__ink" d="M668 218c4-44 62-56 78-13 4 10 2 25-4 35-1-29-19-41-51-40-3 13-10 22-23 28Z" />
        <path d="M683 269v24m42-25v25m-63 20c21-27 64-27 85 0l30 116h-146l31-116Z" />
        <path d="m654 328-56 62 65 31m77-92 49 58-58 34" />
        <path d="M662 429 630 548m115-119 42 119M602 548h52m109 0h53" />
        <path className="atlas-sketch__accent" d="M677 316h54l-7 75h-40l-7-75Z" />
        <path d="M632 411h146" />
      </g>
      <path className="atlas-journey-caption-line" d="M92 698h266" />
      <text className="atlas-journey-caption" x="92" y="727">APPLY · ARRIVE · SETTLE · THRIVE</text>
    </svg>
  );
}
```

- [ ] **Step 2: Replace the centered hero with the asymmetric foreground layout**

Update `Hero` to import `ArrowDownRight`, `Check`, and `StudentJourneyArtwork`; render the artwork as an absolute background; use a left-aligned `max-w-[46rem]` content column; retain the existing heading sentence; use the approved eyebrow, supporting copy, primary modal label, secondary `#features` link, and proof row.

Required semantic structure:

```tsx
<section className="atlas-hero relative isolate min-h-[100svh] overflow-hidden bg-white text-[#171717]">
  <div className="atlas-hero__art" aria-hidden="true">
    <StudentJourneyArtwork />
  </div>
  <div className="atlas-hero__content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-center px-5 pb-14 pt-28 sm:px-8 lg:px-12 xl:px-16">
    <div className="max-w-[46rem]">
      <p className="atlas-hero__eyebrow">The student operating system</p>
      <AnimatedTitle as="h1" className="atlas-hero__title">
        Your operating system <span>for studying and succeeding abroad.</span>
      </AnimatedTitle>
      <AnimatedTitle as="p" className="atlas-hero__copy">
        Apply with clarity. Land prepared. Build your life abroad—with every essential service and the right people in one place.
      </AnimatedTitle>
      <div className="atlas-hero__actions">
        <label htmlFor="demo-modal-toggle">Get started — free</label>
        <Link href="#features">Explore the platform <ArrowDownRight /></Link>
      </div>
      <div className="atlas-hero__proof"><Check /> £0 forever <span /> 3-minute setup <span /> No card</div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Run the markup test and confirm only CSS expectations remain RED**

Run: `npm test -- tests/normal-hero-airplane.test.tsx`

Expected: the semantic hero test passes; the CSS animation test still fails because journey styles are not present.

- [ ] **Step 4: Commit the semantic hero and static artwork**

```bash
git add components/sections/hero.tsx components/sections/StudentJourneyArtwork.tsx tests/normal-hero-airplane.test.tsx
git commit -m "feat: build cinematic normal hero composition"
```

### Task 3: Animate and responsively compose the line-art background

**Files:**
- Modify: `app/normal/globals.css`
- Modify: `tests/normal.test.tsx`

- [ ] **Step 1: Add hero and journey styles**

Remove the old `.atlas-plane-hover*`, `atlas-airliner-orbit`, and `atlas-abroad-return` rules. Add scoped `.atlas-hero*` rules that:

- keep desktop text within 48% of the canvas;
- position the artwork from the right edge at approximately 66vw by 76vh;
- use white edge masks for quiet negative space;
- style the headline with fluid `clamp()` sizing and tight editorial leading;
- style the orange primary action and understated secondary link;
- use `atlas-journey-draw` for the route, `atlas-journey-pulse` for seven offset stops, and `atlas-student-drift` for the student group;
- reposition and simplify the artwork below the content at `max-width: 767px`;
- stop every new animation inside `prefers-reduced-motion: reduce`.

Use these exact animation names and timing behavior:

```css
@keyframes atlas-journey-draw {
  0%, 12% { stroke-dashoffset: 1; opacity: 0.2; }
  42%, 82% { stroke-dashoffset: 0; opacity: 0.72; }
  100% { stroke-dashoffset: -1; opacity: 0.2; }
}

@keyframes atlas-journey-pulse {
  0%, 68%, 100% { opacity: 0.28; transform: scale(0.82); }
  76%, 86% { opacity: 1; transform: scale(1); }
}

@keyframes atlas-student-drift {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -8px, 0); }
}
```

- [ ] **Step 2: Update the retained-design digest after the intentional hero change**

Run the normal test once to capture the new digest:

`npm test -- tests/normal.test.tsx`

Expected: only `keeps every retained design class expression unchanged` fails and prints the new received SHA-256 hash. Replace the old expected digest in `tests/normal.test.tsx` with that received hash.

- [ ] **Step 3: Run focused tests and verify GREEN**

Run: `npm test -- tests/normal-hero-airplane.test.tsx tests/normal-mobile-experience.test.ts tests/normal.test.tsx`

Expected: all focused tests pass.

- [ ] **Step 4: Commit motion and responsive behavior**

```bash
git add app/normal/globals.css tests/normal.test.tsx
git commit -m "style: animate normal student journey hero"
```

### Task 4: Verify production readiness

**Files:**
- Modify only if verification exposes a regression in the scoped hero files.

- [ ] **Step 1: Run TypeScript validation**

Run: `npm run typecheck`

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 2: Run the complete unit suite**

Run: `npm test`

Expected: all Vitest suites pass.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: Next.js completes the production build successfully.

- [ ] **Step 4: Visually inspect desktop and mobile**

Start the local app with `npm run dev`, open `/normal`, and confirm at desktop and mobile widths that the title remains in the illustration's white space, the line art does not obstruct controls, CTAs work, and the lower artwork is not clipped unexpectedly.

- [ ] **Step 5: Commit any scoped verification fixes**

If verification required a change, stage only the touched hero file, its style, and its regression test, then commit with a message describing the verified correction.
