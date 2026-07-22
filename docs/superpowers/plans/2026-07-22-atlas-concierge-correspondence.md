# Atlas Concierge Correspondence Desk Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Concierge dashboard split with a tactile correspondence-desk scene containing a personal letter, journey dossier, four-stage itinerary, and attached price CTA.

**Architecture:** Keep the redesign inside the existing landing experience and route-scoped stylesheet. Static semantic markup provides the full experience before enhancement; the existing GSAP context adds entrance motion for the letter, dossier, and connecting thread.

**Tech Stack:** React 19, TypeScript, route-scoped CSS, GSAP/ScrollTrigger, Vitest/Testing Library, Playwright.

## Global Constraints

- Modify only the Concierge chapter and its direct tests.
- Add no dependency, global style, state, image asset, form, or runtime request.
- Preserve `mailto:hello@atlas.study?subject=Atlas%20Concierge`.
- Preserve the £1,500 one-time price, assigned specialist, and four-stage scope.
- Static, reduced-motion, mobile, and no-JavaScript experiences must remain readable.

---

### Task 1: Concierge correspondence semantics

**Files:**
- Modify: `tests/landing.test.tsx`
- Modify: `components/landing/LandingExperience.tsx`

**Interfaces:**
- Consumes: existing `conciergeHref` mail URL and landing page heading hierarchy.
- Produces: `.land-concierge__letter`, `.land-concierge__dossier`, `.land-concierge__thread`, and `.land-concierge__ticket` elements for styling and motion.

- [ ] **Step 1: Write the failing Concierge semantics test**

Add a focused test:

```tsx
it("renders Concierge as personal correspondence rather than a product panel", () => {
  const { container } = render(<LandingExperience />);

  expect(
    screen.getByRole("heading", { level: 2, name: /one person\. every moving part\./i }),
  ).toBeVisible();
  expect(screen.getByText(/dear komal/i)).toBeVisible();
  expect(screen.getByText(/i keep the whole move in view/i)).toBeVisible();
  expect(screen.getByText("Anika Mehta", { exact: true })).toBeVisible();
  expect(container.querySelectorAll(".land-concierge__dossier li")).toHaveLength(4);
  expect(screen.getByRole("link", { name: /meet concierge/i })).toHaveAttribute(
    "href",
    "mailto:hello@atlas.study?subject=Atlas%20Concierge",
  );
  expect(container.querySelector(".land-concierge__panel")).not.toBeInTheDocument();
});
```

Update the complete-journey assertion from `/a real specialist/i` to `/one person\. every moving part\./i`.

- [ ] **Step 2: Run the test and verify red**

Run: `npm test -- tests/landing.test.tsx`

Expected: FAIL because the new heading and correspondence markup do not exist.

- [ ] **Step 3: Replace the Concierge markup**

Replace the current `.land-concierge__grid` contents with this structure:

```tsx
<div className="landing-shell land-concierge__scene">
  <header className="land-concierge__heading" data-land-reveal>
    <p className="land-kicker land-kicker--light">Concierge · The human layer</p>
    <h2>One person.<br /><em>Every moving part.</em></h2>
    <p>Applications, visa, accommodation, and arrival — held together by a specialist who knows what comes next.</p>
  </header>
  <div aria-hidden="true" className="land-concierge__thread" data-land-concierge-thread />
  <article className="land-concierge__letter" data-land-concierge-letter>
    <div className="land-concierge__letter-meta"><span>Private correspondence · 014</span><span>London · 14 November</span></div>
    <p className="land-concierge__salutation">Dear Komal,</p>
    <blockquote>I keep the whole move in view — the application you are editing today, the visa evidence you will need next, and the room you will arrive to.</blockquote>
    <footer><span className="land-avatar land-avatar--specialist">AM</span><div><strong>Anika Mehta</strong><span>Your Atlas specialist</span></div><em>Anika</em></footer>
  </article>
  <aside className="land-concierge__dossier" data-land-concierge-dossier>
    <div className="land-concierge__dossier-head"><span>Journey dossier</span><strong>DEL → LHR</strong><span>SEP · 2026</span></div>
    <ol>
      <li className="is-complete"><span>01</span><div><strong>University shortlist</strong><small>Signed off together</small></div><Check size={14} /></li>
      <li className="is-active"><span>02</span><div><strong>Applications</strong><small>Personal statement in review</small></div><MessageCircle size={14} /></li>
      <li><span>03</span><div><strong>Visa & documents</strong><small>Prepared before your offer</small></div><FileCheck2 size={14} /></li>
      <li><span>04</span><div><strong>Arrival & accommodation</strong><small>Built around your move date</small></div><Plane size={14} /></li>
    </ol>
    <div className="land-concierge__ticket">
      <div><strong>£1,500</strong><span>one-time · end to end</span></div>
      <a className="land-button land-button--signal" href={conciergeHref}>Meet Concierge <ArrowUpRight size={16} /></a>
    </div>
  </aside>
</div>
```

Remove `.land-concierge__folio-edge`, the online badge, simulated notification panel, and chat message.

- [ ] **Step 4: Run the unit test and verify green**

Run: `npm test -- tests/landing.test.tsx`

Expected: 8 tests pass.

- [ ] **Step 5: Commit the semantic redesign**

```bash
git add tests/landing.test.tsx components/landing/LandingExperience.tsx
git commit -m "feat: rebuild Concierge as personal correspondence"
```

### Task 2: Tactile scene, responsive layout, and reveal motion

**Files:**
- Modify: `app/landing/landing.css`
- Modify: `components/landing/LandingExperience.tsx`
- Modify: `e2e/landing.spec.ts`

**Interfaces:**
- Consumes: the four Concierge data attributes from Task 1 and existing `useGsapContext` callback.
- Produces: responsive artifact composition, reduced-motion final state, and tested 44-pixel Concierge CTA.

- [ ] **Step 1: Add the failing browser assertions**

In the conversion-path test, assert the new Concierge heading. In the mobile project, assert the CTA target size and no overflow:

```ts
await expect(page.getByRole("heading", { name: /one person\. every moving part\./i })).toBeVisible();

if (testInfo.project.name === "mobile-edge") {
  const conciergeCta = page.getByRole("link", { name: /meet concierge/i });
  expect(await conciergeCta.evaluate((link) => link.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
}
```

Update the reduced-motion heading assertion to the new heading.

- [ ] **Step 2: Run the browser test and verify red where styling is absent**

Run: `npx playwright test e2e/landing.spec.ts --workers=1`

Expected: FAIL on the mobile CTA target or missing new heading before Task 1 is applied; after Task 1, the semantic assertion passes while the target-size assertion remains the styling gate.

- [ ] **Step 3: Replace the Concierge CSS**

Delete the old `.land-concierge__grid`, `__copy`, `__panel`, `__specialist`, `__message`, and `.land-online` rules. Add route-scoped rules with these responsibilities:

```css
.land-concierge { position: relative; min-height: 66rem; overflow: hidden; padding: clamp(6rem, 10vw, 9rem) 0; background: #080d15; color: white; }
.land-concierge__scene { position: relative; min-height: 52rem; }
.land-concierge__heading { position: relative; z-index: 3; max-width: 58rem; }
.land-concierge__thread { position: absolute; inset: 20rem 8% auto 19%; height: 1px; background: var(--land-signal); transform-origin: left; }
.land-concierge__letter { position: absolute; z-index: 2; top: 21rem; left: 1%; width: min(56%, 47rem); min-height: 29rem; padding: clamp(2rem, 4vw, 4rem); background: var(--land-paper); color: var(--land-ink); transform: rotate(-2.4deg); box-shadow: 0 3rem 6rem -2rem #000; }
.land-concierge__dossier { position: absolute; z-index: 1; top: 17rem; right: 0; width: min(48%, 39rem); min-height: 36rem; border: 1px solid rgb(255 255 255 / 0.2); padding: 1.2rem; background: #dce6f5; color: var(--land-ink); transform: rotate(1.8deg); box-shadow: 0 3rem 6rem -2rem #000; }
.land-concierge__ticket { display: flex; min-height: 7rem; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1rem; padding: 1rem; background: var(--land-signal); }
```

Complete typography, dossier rows, paper perforations, registration marks, hover/focus lift, and the mobile stack. At `max-width: 900px`, make both artifacts static, full-width, and unrotated.

- [ ] **Step 4: Add GSAP correspondence reveals**

Inside the existing non-reduced-motion callback, add:

```ts
gsap.from("[data-land-concierge-letter]", {
  y: 100,
  x: -40,
  rotate: -7,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".land-concierge", start: "top 62%", once: true },
});
gsap.from("[data-land-concierge-dossier]", {
  y: 120,
  x: 50,
  rotate: 7,
  opacity: 0,
  duration: 1.05,
  delay: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".land-concierge", start: "top 62%", once: true },
});
gsap.from("[data-land-concierge-thread]", {
  scaleX: 0,
  duration: 1.2,
  ease: "power2.inOut",
  transformOrigin: "left center",
  scrollTrigger: { trigger: ".land-concierge", start: "top 62%", once: true },
});
```

Extend the reduced-motion selector list so all three data targets resolve with `opacity: 1` and `transform: none`.

- [ ] **Step 5: Run all focused verification**

Run:

```bash
npm test -- tests/landing.test.tsx
npm run typecheck
npm run build
npx playwright test e2e/landing.spec.ts --workers=1
```

Expected: unit tests pass, typecheck exits 0, production build includes static `/landing`, and Playwright reports 10 applicable tests passed with 2 intentional project skips.

- [ ] **Step 6: Perform production visual QA**

Inspect `/landing#concierge` at 1440×1000 and 390×844. Confirm artifact overlap, headline hierarchy, CTA target, no clipping, no horizontal overflow, readable reduced-motion fallback, and an empty browser console.

- [ ] **Step 7: Commit the completed visual redesign**

```bash
git add app/landing/landing.css components/landing/LandingExperience.tsx e2e/landing.spec.ts
git commit -m "feat: add Concierge correspondence scene"
```
