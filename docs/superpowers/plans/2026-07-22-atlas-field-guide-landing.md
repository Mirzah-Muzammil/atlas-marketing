# Atlas Field Guide Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, responsive `/landing` route that explains the complete Atlas journey with editorial scrollytelling, purposeful motion, product interactions, and accessible easter eggs.

**Architecture:** Add an isolated route layout and stylesheet under `app/landing`, with a single focused client experience component that server-renders the page and progressively enhances navigation, service selection, GSAP scroll scenes, and easter eggs. Reuse the existing Lenis provider, reduced-motion hook, GSAP context helper, local imagery, and test infrastructure; add no dependencies.

**Tech Stack:** Next.js 15, React 19, TypeScript, route-scoped CSS, GSAP/ScrollTrigger, Lenis, Lucide React, Vitest/Testing Library, Playwright.

## Global Constraints

- The route is exactly `/landing`; existing routes and global styles must remain unaffected.
- Use the approved Atlas Field Guide palette: warm paper, deep ink, Atlas blue, and restrained signal green.
- Preserve the source-site product story and the MVP PDF’s Profile, Scholarship, Essentials tracking, Career, and Concierge content.
- Motion must clarify progression; static content must remain legible before enhancement and with JavaScript disabled.
- `prefers-reduced-motion: reduce` removes smooth scrolling, pinning, parallax, ambient loops, and staged delays.
- Do not add dependencies, WebGL, autoplaying video, authentication, forms, analytics, or external runtime requests.
- Existing unrelated premium-page work in the dirty worktree must not be modified, staged, or committed.

---

## File structure

- Create `app/landing/layout.tsx`: route metadata and route-local wrapper.
- Create `app/landing/page.tsx`: the `/landing` server entry point.
- Create `app/landing/landing.css`: the complete scoped visual, responsive, focus, and reduced-motion system.
- Create `components/landing/LandingExperience.tsx`: semantic page markup, static content, service state, easter eggs, and GSAP enhancement.
- Create `tests/landing.test.tsx`: unit-level content, semantics, selection, and easter-egg behavior.
- Create `e2e/landing.spec.ts`: desktop/mobile rendering, interaction, overflow, reduced-motion, and no-JavaScript checks.
- Modify `hooks/useFirstRouteVisit.ts`: add `landing` to the existing route identity union.

### Task 1: Semantic route and complete Atlas story

**Files:**
- Create: `tests/landing.test.tsx`
- Create: `app/landing/layout.tsx`
- Create: `app/landing/page.tsx`
- Create: `components/landing/LandingExperience.tsx`
- Create: `app/landing/landing.css`
- Modify: `hooks/useFirstRouteVisit.ts`

**Interfaces:**
- Consumes: `RouteExperience`, local images under `/public/images/normal`, and local fonts already defined in the project.
- Produces: default export `LandingExperience(): JSX.Element` and route-level `LandingPage(): JSX.Element`.

- [ ] **Step 1: Write the failing semantic-content tests**

Create `tests/landing.test.tsx` with the exact initial assertions:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { LandingExperience } from "@/components/landing/LandingExperience";

const motionPreference = vi.hoisted(() => ({ reduced: false }));

vi.mock("@/hooks/useGsapContext", () => ({ useGsapContext: vi.fn() }));
vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => motionPreference.reduced,
}));

describe("Atlas Field Guide landing page", () => {
  it("renders the complete Atlas journey and primary conversion", () => {
    render(<LandingExperience />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /your operating system for studying and succeeding abroad/i,
      }),
    ).toBeVisible();
    expect(screen.getAllByRole("link", { name: /get started/i })[0]).toHaveAttribute(
      "href",
      "/get-started",
    );
    expect(screen.getByRole("heading", { name: /plan & apply/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /arrive & settle/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /build & thrive/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /a real product/i })).toBeVisible();
    expect(screen.getByRole("heading", { name: /a real specialist/i })).toBeVisible();
    expect(screen.getByText(/14,000\+ students and alumni/i)).toBeVisible();
    expect(screen.getByText(/£1,500.*one-time/i)).toBeVisible();
  });

  it("uses native disclosures for the honest answers", () => {
    const { container } = render(<LandingExperience />);
    expect(container.querySelectorAll("details")).toHaveLength(5);
    expect(screen.getByText("Is it really free?", { exact: true })).toBeVisible();
    expect(screen.getByText("What's the catch?", { exact: true })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the tests and confirm the route does not exist yet**

Run: `npm test -- --run tests/landing.test.tsx`

Expected: FAIL because `@/components/landing/LandingExperience` does not exist.

- [ ] **Step 3: Add route metadata and entry point**

Create `app/landing/layout.tsx`:

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./landing.css";

export const metadata: Metadata = {
  title: "GGI Atlas - Your operating system for studying abroad",
  description:
    "Match universities, sort your services, settle in, and build a life abroad with one free student operating system.",
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return <div className="landing-route">{children}</div>;
}
```

Create `app/landing/page.tsx`:

```tsx
import { RouteExperience } from "@/components/common/RouteExperience";
import { LandingExperience } from "@/components/landing/LandingExperience";

export default function LandingPage() {
  return (
    <RouteExperience route="landing">
      <LandingExperience />
    </RouteExperience>
  );
}
```

Update the route union in `hooks/useFirstRouteVisit.ts`:

```ts
export type AtlasRoute = "horizon" | "dispatch" | "orbit" | "landing";
```

- [ ] **Step 4: Implement the semantic page skeleton and full copy**

Create `components/landing/LandingExperience.tsx` as a client component. Define these content arrays in the same file to avoid a speculative data layer:

```tsx
const chapters = [
  {
    id: "plan",
    number: "01",
    title: "Plan & apply",
    copy: "Match universities, track applications, secure your visa, and keep scholarships and documents in one place.",
    items: ["University Matcher", "Applications", "Visa checklist", "Scholarships"],
  },
  {
    id: "settle",
    number: "02",
    title: "Arrive & settle",
    copy: "Banking, SIM, insurance, housing, forex, loans, and tax - sorted in the order you need them.",
    items: ["Banking", "Housing", "SIM & eSIM", "Insurance"],
  },
  {
    id: "thrive",
    number: "03",
    title: "Build & thrive",
    copy: "Jobs, community, events, career tools, and Graduate Route guidance stay with you after arrival.",
    items: ["Career hub", "Community", "Events", "Graduate Route"],
  },
] as const;

const services = [
  ["sim", "SIM & eSIM", "A pre-activated UK eSIM that works the moment you land."],
  ["banking", "Banking", "Open a student-ready account without waiting for move-in week."],
  ["housing", "Housing", "Find vetted accommodation and avoid the scams students are warned about too late."],
  ["insurance", "Insurance", "Health and travel cover explained in plain English."],
  ["forex", "Forex", "Move tuition and living money with transparent rates and fees."],
  ["loans", "Loans", "Compare funding for your course and know when a loan is poor value."],
  ["tax", "Tax filing", "Understand your first UK tax year and what changes after graduation."],
  ["visa", "Visas", "Keep the documents, funds, and deadlines that make the sequence real."],
] as const;
```

Render, in order:

1. A fixed `<header>` with text logo, anchors to `#journey`, `#product`, `#essentials`, `#concierge`, and `/get-started`.
2. A `<main id="main-content">` with hero, three-chapter journey, product proof, Essentials, life-after-landing, Concierge, manifesto, FAQ, and final CTA sections.
3. A `<footer>` with the coordinate button and required legal copy.

Use a single `h1`, sequential `h2`/`h3` headings, native links for navigation, native `<details>` for each FAQ, and `aria-hidden="true"` on decorative route lines and stamps.

- [ ] **Step 5: Add the route’s static foundation styles**

Start `app/landing/landing.css` with route-scoped tokens and stable, readable fallbacks:

```css
.landing-route {
  --land-paper: #f3efe5;
  --land-paper-deep: #ded6c4;
  --land-ink: #12233f;
  --land-blue: #163f96;
  --land-blue-deep: #0b1d43;
  --land-signal: #b7ff3c;
  --land-coral: #ef765f;
  --land-line: rgb(18 35 63 / 0.18);
  --land-serif: Iowan Old Style, Baskerville, "Times New Roman", serif;
  min-height: 100svh;
  overflow: clip;
  background: var(--land-paper);
  color: var(--land-ink);
}

.landing-route :where(a, button, summary):focus-visible {
  outline: 3px solid var(--land-coral);
  outline-offset: 4px;
}

.landing-shell {
  width: min(100% - 2rem, 86rem);
  margin-inline: auto;
}
```

Complete the base layout so every section is visible and readable before motion is added. Use `clamp()` for headline and section spacing, `minmax(0, 1fr)` for grids, and `overflow-wrap: anywhere` for oversized copy.

- [ ] **Step 6: Run the focused tests**

Run: `npm test -- --run tests/landing.test.tsx`

Expected: PASS with 2 tests.

- [ ] **Step 7: Commit the semantic route**

```bash
git add app/landing components/landing/LandingExperience.tsx tests/landing.test.tsx hooks/useFirstRouteVisit.ts
git commit -m "feat: add Atlas field guide landing route"
```

### Task 2: Product interactions and easter eggs

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/LandingExperience.tsx`
- Modify: `app/landing/landing.css`

**Interfaces:**
- Consumes: `services` tuple list and semantic elements from Task 1.
- Produces: active service state, mobile navigation state, `ATLAS` keyboard sequence, and coordinate-stamp state.

- [ ] **Step 1: Add failing interaction tests**

Append these tests:

```tsx
it("updates the Essentials detail from an accessible selector", () => {
  render(<LandingExperience />);
  fireEvent.click(screen.getByRole("button", { name: /explore housing/i }));
  expect(screen.getByRole("heading", { name: "Housing", level: 3 })).toBeVisible();
  expect(screen.getByText(/avoid the scams/i)).toBeVisible();
});

it("reveals the constellation after typing ATLAS outside a form control", () => {
  render(<LandingExperience />);
  for (const key of "ATLAS") fireEvent.keyDown(window, { key });
  expect(screen.getByRole("status")).toHaveTextContent("You found the long way home.");
});

it("adds and removes a departure stamp", () => {
  render(<LandingExperience />);
  fireEvent.click(screen.getByRole("button", { name: /coordinates/i }));
  expect(screen.getByRole("status")).toHaveTextContent("Cleared for departure");
  fireEvent.click(screen.getByRole("button", { name: /dismiss departure stamp/i }));
  expect(screen.queryByText(/cleared for departure/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests and confirm missing behavior**

Run: `npm test -- --run tests/landing.test.tsx`

Expected: FAIL on the housing selector and both status messages.

- [ ] **Step 3: Implement deterministic React state**

Add the following state and keyboard logic inside `LandingExperience`:

```tsx
const [activeService, setActiveService] = useState<(typeof services)[number][0]>("sim");
const [menuOpen, setMenuOpen] = useState(false);
const [constellationOpen, setConstellationOpen] = useState(false);
const [stampOpen, setStampOpen] = useState(false);

useEffect(() => {
  let sequence = "";
  const onKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
    sequence = `${sequence}${event.key.toUpperCase()}`.slice(-5);
    if (sequence === "ATLAS") setConstellationOpen(true);
  };
  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, []);
```

Render service selector buttons with `aria-pressed`, labels in the format `Explore Housing`, and one central live detail panel. Render each easter egg as an absolutely positioned overlay with `role="status"`, a visible close button, and no navigation side effect.

- [ ] **Step 4: Style interactive states and touch behavior**

Add explicit selectors for `[aria-pressed="true"]`, mobile nav `[data-open="true"]`, `.landing-constellation`, and `.landing-stamp`. Buttons must have at least a 44px hit area. Disable magnetic transforms under `@media (hover: none)`.

- [ ] **Step 5: Run interaction tests**

Run: `npm test -- --run tests/landing.test.tsx`

Expected: PASS with 5 tests.

- [ ] **Step 6: Commit interactions**

```bash
git add components/landing/LandingExperience.tsx app/landing/landing.css tests/landing.test.tsx
git commit -m "feat: add Atlas landing interactions"
```

### Task 3: Scroll narrative and reduced-motion behavior

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/LandingExperience.tsx`
- Modify: `app/landing/landing.css`

**Interfaces:**
- Consumes: `useGsapContext(scope, setup, dependencies)` and `usePrefersReducedMotion()`.
- Produces: scoped GSAP timelines targeting `data-land-*` attributes; no global selectors or leaked ScrollTriggers.

- [ ] **Step 1: Add the failing reduced-motion contract test**

Use the hoisted `motionPreference` object created in Task 1 and append:

```tsx
it("marks the experience as static when reduced motion is requested", () => {
  motionPreference.reduced = true;
  const { container } = render(<LandingExperience />);
  expect(container.querySelector("[data-motion='reduced']")).toBeInTheDocument();
  motionPreference.reduced = false;
});
```

- [ ] **Step 2: Run the focused test and confirm the missing marker**

Run: `npm test -- --run tests/landing.test.tsx -t "marks the experience as static"`

Expected: FAIL because the root has no `data-motion="reduced"` attribute.

- [ ] **Step 3: Add scoped GSAP enhancement**

Create `const scope = useRef<HTMLDivElement>(null)` and apply it to the page root. Read `prefersReducedMotion` once. Call `useGsapContext` unconditionally, returning immediately inside setup when reduced motion is true.

The setup must create these exact effects:

```tsx
useGsapContext(
  scope,
  ({ gsap, ScrollTrigger }) => {
    if (prefersReducedMotion) return;

    gsap.from("[data-land-hero-line]", {
      yPercent: 110,
      rotate: 1.5,
      duration: 1,
      stagger: 0.08,
      ease: "power4.out",
    });
    gsap.from("[data-land-hero-card]", {
      y: 80,
      scale: 0.92,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    gsap.to("[data-land-route-progress]", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-land-story]",
        start: "top 65%",
        end: "bottom 35%",
        scrub: 0.5,
      },
    });
    gsap.utils.toArray<HTMLElement>("[data-land-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 48,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 84%", once: true },
      });
    });
    ScrollTrigger.create({
      trigger: "[data-land-story]",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) =>
        scope.current?.style.setProperty("--land-story-progress", String(self.progress)),
    });
  },
  [prefersReducedMotion],
);
```

Set `data-motion={prefersReducedMotion ? "reduced" : "full"}` on the route root. Use CSS sticky positioning for the product and journey frames; do not rely on JS pinning for the base layout.

- [ ] **Step 4: Complete the cinematic visual pass**

Add the approved visual treatments to `landing.css`:

- Clipped hero lines and a framed 3D paper card with a light pointer-only tilt.
- A thin fixed narrative progress rail and moving marker.
- Chapter palette changes using section backgrounds, not JS theme mutation.
- Sticky product frame with masked panels and status chips.
- Essentials index/detail composition with tactile pressed states.
- Large life-after-landing typography over the existing student cutout/photo assets.
- Dark Concierge folio with restrained signal-green accents.
- Paper-grain effect using CSS gradients at opacity below `0.06`.
- Mobile layout at `max-width: 800px` with no horizontal scroll, no sticky scene height, and normal document order.
- `@media (prefers-reduced-motion: reduce)` that sets `animation-duration: 0.001ms`, disables transitions and smooth scrolling, removes sticky positioning, and makes all reveal targets fully visible.

- [ ] **Step 5: Run the landing tests and full typecheck**

Run: `npm test -- --run tests/landing.test.tsx && npm run typecheck`

Expected: all landing tests PASS and TypeScript exits 0.

- [ ] **Step 6: Commit motion and visual system**

```bash
git add components/landing/LandingExperience.tsx app/landing/landing.css tests/landing.test.tsx
git commit -m "feat: add Atlas landing scroll narrative"
```

### Task 4: Browser contracts and production verification

**Files:**
- Create: `e2e/landing.spec.ts`
- Modify: route-local files from Tasks 1-3 only when a failing check identifies a concrete defect.

**Interfaces:**
- Consumes: built `/landing` route and existing Playwright desktop/mobile projects.
- Produces: automated evidence for rendering, overflow, interactions, reduced motion, and no-JavaScript resilience.

- [ ] **Step 1: Add end-to-end coverage**

Create `e2e/landing.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("landing renders the complete conversion path without overflow", async ({ page }) => {
  await page.goto("/landing");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /your operating system for studying and succeeding abroad/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /get started/i }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /build & thrive/i })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    ),
  ).toBe(false);
});

test("landing Essentials selector and departure stamp respond", async ({ page }) => {
  await page.goto("/landing");
  await page.getByRole("button", { name: /explore housing/i }).click();
  await expect(page.getByRole("heading", { level: 3, name: "Housing" })).toBeVisible();
  await page.getByRole("button", { name: /coordinates/i }).click();
  await expect(page.getByRole("status")).toContainText("Cleared for departure");
});

test("landing remains readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/landing");
  await expect(page.locator("[data-motion='reduced']")).toBeVisible();
  await expect(page.getByRole("heading", { name: /a real specialist/i })).toBeVisible();
});

test("landing remains useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("/landing");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: /the honest answers/i })).toBeVisible();
  await expect(page.locator("details")).toHaveCount(5);
  await context.close();
});
```

- [ ] **Step 2: Build the production app**

Run: `npm run build`

Expected: Next.js build exits 0 and lists `/landing` as a generated route.

- [ ] **Step 3: Run all automated checks**

Run: `npm test -- --run tests/landing.test.tsx && npm run typecheck && npx playwright test e2e/landing.spec.ts`

Expected: all commands exit 0 in both Playwright projects.

- [ ] **Step 4: Perform explicit browser visual review**

Start the existing development server with `npm run dev`, open `/landing`, and inspect these representative states:

- Desktop at 1440x1000: hero, journey scroll, sticky product proof, Essentials selection, Concierge, FAQ, and final CTA.
- Mobile at 390x844: menu, hero wrapping, normal-flow journey, service selection, FAQ, and final CTA.
- Reduced motion: no pinned or hidden content.

For each state, verify no clipping, overlap, horizontal overflow, illegible contrast, broken image, or motion that leaves content between states. Fix route-local defects and rerun the build plus the relevant test.

- [ ] **Step 5: Final diff and scope audit**

Run:

```bash
git diff --check HEAD~3..HEAD
git status --short
git diff --stat HEAD~3..HEAD
```

Confirm that only the new landing files, the `AtlasRoute` union, and landing tests changed. Confirm unrelated premium work remains unstaged and unmodified by this implementation.

- [ ] **Step 6: Commit verification coverage**

```bash
git add e2e/landing.spec.ts
git commit -m "test: verify Atlas landing experience"
```

## Completion evidence

The work is complete only when the production build, typecheck, focused unit tests, desktop and mobile Playwright checks, no-JavaScript check, reduced-motion check, and manual browser review all pass against the current worktree.
