# Atlas Editorial Mosey-Inspired Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/editorial` as a focused half-homepage with a premium pinned hero and two supporting sections, using Mosey's composition, palette, and motion rhythm with original Atlas content and interface artwork.

**Architecture:** Keep the route page as a Server Component that only composes focused section components. The hero remains server-rendered; one client motion controller owns its entrance, pinned scroll timeline, state changes, pointer depth, and reduced-motion fallback. Supporting sections are server-rendered, with a single small client controller for scroll reveals and marquee motion.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Lenis, Vitest, Testing Library.

---

### Task 1: Lock the route contract with a failing test

**Files:**
- Modify: `tests/dispatch.test.tsx`

- [ ] **Step 1: Replace the legacy dispatch test with the desired half-homepage contract**

```tsx
it("presents the Atlas journey as one focused three-stage experience", () => {
  render(<EditorialPage />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /study abroad the easy way/i,
  );
  expect(screen.getByRole("tab", { name: /apply/i })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /prepare/i })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: /arrive/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /one calm plan/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /everything you need/i })).toBeInTheDocument();
  expect(screen.queryByText("Dispatch 05")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and verify it fails for the missing new experience**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: FAIL because the legacy heading and sections do not match the new route contract.

### Task 2: Build the hero structure and original Atlas interface artwork

**Files:**
- Modify: `app/editorial/page.tsx`
- Modify: `components/navigation/DispatchNav.tsx`
- Modify: `components/home/dispatch/DispatchHero.tsx`
- Create: `components/home/dispatch/DispatchJourneyPanel.tsx`
- Create: `components/home/dispatch/DispatchConnectorArtwork.tsx`

- [ ] **Step 1: Reduce the route to the nav, hero, and two new supporting sections**

```tsx
export default function EditorialPage() {
  return (
    <RouteExperience route="dispatch">
      <DispatchNav />
      <main id="main-content">
        <DispatchHero />
        <DispatchTrustSection />
        <DispatchSystemSection />
      </main>
    </RouteExperience>
  );
}
```

- [ ] **Step 2: Rebuild the nav and hero with semantic controls and three Atlas states**

The hero must expose:

```tsx
<h1>Study abroad the easy way.</h1>
<div aria-label="Atlas journey stages" role="tablist">
  <button role="tab">Apply</button>
  <button role="tab">Prepare</button>
  <button role="tab">Arrive</button>
</div>
```

Its central panel must render all three original Atlas UI states in one server-rendered stack so animation never causes layout shifts.

- [ ] **Step 3: Add original inline SVG connector artwork**

Use SVG paths with `data-dispatch-connector` attributes so the motion controller can animate `strokeDashoffset`. No reference-site assets are imported.

### Task 3: Implement the cinematic hero timeline

**Files:**
- Modify: `components/home/dispatch/DispatchHeroMotion.tsx`
- Modify: `styles/globals.css`

- [ ] **Step 1: Add a single desktop ScrollTrigger timeline**

The timeline pins the hero stage for roughly three viewport heights, draws connectors, raises and scales the product panel, moves the headline/copy at different depths, and changes state at one-third intervals:

```ts
gsap.timeline({
  scrollTrigger: {
    trigger: hero,
    start: "top top",
    end: "+=260%",
    pin: stage,
    scrub: 0.75,
    anticipatePin: 1,
  },
});
```

- [ ] **Step 2: Synchronize state visibility and tab progress**

Set `data-active` and `aria-selected` for the active tab. Crossfade the corresponding UI state while translating its inner layers by small opposing amounts to create depth.

- [ ] **Step 3: Add entrance and pointer-depth timelines**

Reveal the announcement, nav, clipped heading lines, body copy, connector paths, and panel in one choreographed entrance. Pointer movement may affect decorative layers by no more than 12px and must be disabled for touch and reduced-motion users.

- [ ] **Step 4: Add scoped responsive and reduced-motion styling**

Desktop uses the pinned animation. Mobile presents the same content in normal flow with the first state visible and a horizontally scrollable tab row. Reduced motion disables pinning, transforms, and automatic state changes.

### Task 4: Build the two supporting sections

**Files:**
- Create: `components/home/dispatch/DispatchTrustSection.tsx`
- Create: `components/home/dispatch/DispatchSystemSection.tsx`
- Create: `components/home/dispatch/DispatchSupportingMotion.tsx`

- [ ] **Step 1: Build the trust bridge**

Render a short statement headed “One calm plan” and a two-row moving strip of Atlas journey capabilities. It must visually continue the hero connector lines rather than appear as a detached card grid.

- [ ] **Step 2: Build the system section**

Render an “Everything you need” heading and three connected product moments for applications, departure readiness, and arrival. Use strong typographic hierarchy and original product UI fragments instead of generic feature cards.

- [ ] **Step 3: Add restrained supporting motion**

Use ScrollTrigger for masked heading reveals, opposing marquee motion, staggered product fragments, and a single line-drawing transition. Keep the section in normal document flow.

### Task 5: Verify and visually refine

**Files:**
- Verify all modified and created files.

- [ ] **Step 1: Run the focused test**

Run: `npm test -- tests/dispatch.test.tsx`

Expected: PASS.

- [ ] **Step 2: Run static checks**

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 3: Run the full test suite and production build**

Run: `npm test`

Expected: all tests pass.

Run: `npm run build`

Expected: exit code 0 and `/editorial` generated successfully.

- [ ] **Step 4: Review the live route in Edge**

Launch the dev server and inspect `/editorial` at desktop and mobile widths. Scroll through all pinned stages, interact with tabs and CTAs, verify focus visibility and reduced-motion behavior, and confirm there are no browser console errors.

- [ ] **Step 5: Refine and rerun every affected verification**

Any visual or behavioral change made during browser QA is followed by the focused test, typecheck, lint, and a fresh browser pass.
