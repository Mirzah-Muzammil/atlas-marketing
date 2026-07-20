# Atlas Marketing Homepages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three production-ready, responsive Atlas Marketing homepage routes with distinct visual identities and motion systems while sharing a typed brand foundation.

**Architecture:** App Router pages remain Server Components that compose route-specific sections. Shared content, tokens, UI primitives, forms, and motion infrastructure live outside `app`; GSAP/Lenis and R3F are isolated in small client islands and loaded only where needed.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, GSAP, Lenis, Framer Motion, React Hook Form, Zod, Three.js, React Three Fiber, Drei, Vitest, Testing Library, Playwright, clsx, tailwind-merge.

---

## File map

```text
app/
  layout.tsx                         Global metadata and providers
  page.tsx                           Horizon composition only
  editorial/page.tsx                 Dispatch composition only
  orbit/page.tsx                     Atlas Orbit composition only
components/
  common/RouteExperience.tsx         Route-level smooth-scroll boundary
  navigation/HorizonNav.tsx          Transparent-to-solid navigation
  navigation/DispatchNav.tsx         Editorial navigation
  navigation/OrbitNav.tsx            Compact spatial navigation
  footer/SiteFooter.tsx               Shared semantic footer
  forms/ConsultationForm.tsx          Accessible consultation form
  home/horizon/*                      Horizon sections
  home/dispatch/*                     Dispatch sections
  home/orbit/*                        Orbit sections
  motion/LenisProvider.tsx            Lenis lifecycle
  motion/Reveal.tsx                   Accessible GSAP reveal primitive
  motion/MagneticLink.tsx             Fine-pointer CTA response
  ui/AtlasLogo.tsx                    Brand mark
  ui/ButtonLink.tsx                   Semantic CTA variants
  ui/SectionIntro.tsx                 Shared heading primitive
hooks/usePrefersReducedMotion.ts      Motion preference observer
hooks/useGsapContext.ts               Scoped GSAP cleanup helper
constants/content.ts                  Typed shared product copy
constants/navigation.ts               Shared link definitions
types/content.ts                      Content contracts
utils/cn.ts                           Class merge utility
utils/consultationSchema.ts           Zod form schema
styles/globals.css                    Tailwind tokens and base utilities
public/images/*                       Optimized local imagery
tests/*                               Unit and component tests
e2e/homepages.spec.ts                 Route and responsive smoke tests
```

### Task 1: Scaffold the tested Next.js foundation

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `app/layout.tsx`
- Create: `styles/globals.css`
- Test: `tests/foundation.test.tsx`

- [ ] **Step 1: Create the package and test configuration**

Define scripts `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:watch`, and `e2e`. Install only the dependencies listed in the plan header plus `lucide-react`, `eslint`, `eslint-config-next`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@playwright/test`.

- [ ] **Step 2: Write the failing foundation test**

```tsx
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

it('exposes the Atlas brand and main content landmark', () => {
  render(<RootLayout><main>Atlas test content</main></RootLayout>);
  expect(screen.getByText('Atlas test content')).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm test -- tests/foundation.test.tsx`
Expected: FAIL because `app/layout.tsx` does not exist.

- [ ] **Step 4: Implement the root layout and token foundation**

Create an English root layout with Atlas metadata, local CSS imports, skip link, and semantic body. Define Tailwind theme variables for background, foreground, primary, secondary, accent, success, muted, glass, border, and route-specific surfaces.

- [ ] **Step 5: Verify GREEN**

Run: `npm test -- tests/foundation.test.tsx && npm run typecheck`
Expected: PASS with zero TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs vitest.config.ts tests/setup.ts tests/foundation.test.tsx app/layout.tsx styles/globals.css
git commit -m "chore: scaffold Atlas marketing frontend"
```

### Task 2: Build shared content and UI primitives

**Files:**
- Create: `types/content.ts`
- Create: `constants/content.ts`
- Create: `constants/navigation.ts`
- Create: `utils/cn.ts`
- Create: `components/ui/AtlasLogo.tsx`
- Create: `components/ui/ButtonLink.tsx`
- Create: `components/ui/SectionIntro.tsx`
- Create: `components/footer/SiteFooter.tsx`
- Test: `tests/shared-ui.test.tsx`

- [ ] **Step 1: Write failing shared UI tests**

```tsx
import { render, screen } from '@testing-library/react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SiteFooter } from '@/components/footer/SiteFooter';

it('renders an orange primary conversion link', () => {
  render(<ButtonLink href="/get-started">Get started free</ButtonLink>);
  expect(screen.getByRole('link', { name: 'Get started free' })).toHaveAttribute('href', '/get-started');
});

it('exposes product and concierge paths in the footer', () => {
  render(<SiteFooter tone="light" />);
  expect(screen.getByRole('link', { name: 'How Atlas works' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Talk to Concierge' })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/shared-ui.test.tsx`
Expected: FAIL because shared components are missing.

- [ ] **Step 3: Implement typed content and primitives**

Define `JourneyStage`, `EssentialCategory`, `ResourceSummary`, and `NavItem` contracts. Add honest Atlas copy for Apply, Visa, Finance, Arrive, and Thrive without fabricated metrics. Implement the button, logo, section intro, and footer as Server Components.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- tests/shared-ui.test.tsx && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add types constants utils components/ui components/footer tests/shared-ui.test.tsx
git commit -m "feat: add Atlas brand primitives"
```

### Task 3: Add accessible motion infrastructure

**Files:**
- Create: `hooks/usePrefersReducedMotion.ts`
- Create: `hooks/useGsapContext.ts`
- Create: `components/motion/LenisProvider.tsx`
- Create: `components/motion/Reveal.tsx`
- Create: `components/motion/MagneticLink.tsx`
- Create: `components/common/RouteExperience.tsx`
- Test: `tests/motion.test.tsx`

- [ ] **Step 1: Write the failing motion preference test**

```tsx
import { render, screen } from '@testing-library/react';
import { Reveal } from '@/components/motion/Reveal';

it('keeps reveal content present before animation initializes', () => {
  render(<Reveal><p>Always readable</p></Reveal>);
  expect(screen.getByText('Always readable')).toBeVisible();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/motion.test.tsx`
Expected: FAIL because `Reveal` is missing.

- [ ] **Step 3: Implement scoped client motion primitives**

Use `gsap.context` cleanup, `ScrollTrigger`, `matchMedia`, and a reduced-motion hook. Lenis must stop and destroy on unmount. `Reveal` must render visible content without JavaScript and animate only after hydration. Magnetic behavior must run only for fine pointers.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- tests/motion.test.tsx && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add hooks components/motion components/common tests/motion.test.tsx
git commit -m "feat: add accessible motion foundation"
```

### Task 4: Implement Homepage 1 — Horizon

**Files:**
- Create: `components/navigation/HorizonNav.tsx`
- Create: `components/home/horizon/HorizonHero.tsx`
- Create: `components/home/horizon/HorizonHeroMotion.tsx`
- Create: `components/home/horizon/TrustStrip.tsx`
- Create: `components/home/horizon/JourneyStory.tsx`
- Create: `components/home/horizon/JourneyStoryMotion.tsx`
- Create: `components/home/horizon/ProductProof.tsx`
- Create: `components/home/horizon/EssentialsSection.tsx`
- Create: `components/home/horizon/ConciergeSection.tsx`
- Create: `components/home/horizon/ResourcesSection.tsx`
- Create: `components/home/horizon/HorizonCTA.tsx`
- Create: `app/page.tsx`
- Test: `tests/horizon.test.tsx`

- [ ] **Step 1: Write the failing Horizon composition test**

```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

it('presents Atlas as the complete study-abroad operating system', () => {
  render(<HomePage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/whole study abroad journey/i);
  expect(screen.getAllByRole('link', { name: /get started free/i }).length).toBeGreaterThan(0);
  expect(screen.getByText('Apply')).toBeInTheDocument();
  expect(screen.getByText('Thrive')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/horizon.test.tsx`
Expected: FAIL because the route and sections are missing.

- [ ] **Step 3: Implement the Server Component composition**

Create the ten Horizon sections in the approved order. Use a bright sky-to-off-white palette, human departure imagery, an orange primary CTA, a layered product/travel hero, and concise honest copy.

- [ ] **Step 4: Implement Horizon motion islands**

Add the hero entrance, pointer parallax, sticky five-stage Journey story, product-state crossfades, and CTA response. Desktop pinning must become normal vertical flow below the desktop breakpoint and when reduced motion is enabled.

- [ ] **Step 5: Verify GREEN**

Run: `npm test -- tests/horizon.test.tsx && npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx components/navigation/HorizonNav.tsx components/home/horizon tests/horizon.test.tsx
git commit -m "feat: build Horizon homepage"
```

### Task 5: Implement Homepage 2 — Dispatch

**Files:**
- Create: `components/navigation/DispatchNav.tsx`
- Create: `components/home/dispatch/DispatchHero.tsx`
- Create: `components/home/dispatch/FragmentedJourney.tsx`
- Create: `components/home/dispatch/DispatchChapters.tsx`
- Create: `components/home/dispatch/DispatchChaptersMotion.tsx`
- Create: `components/home/dispatch/ConciergeInterlude.tsx`
- Create: `components/home/dispatch/FieldGuide.tsx`
- Create: `components/home/dispatch/EssentialsDirectory.tsx`
- Create: `components/home/dispatch/OperatingPrinciples.tsx`
- Create: `components/home/dispatch/DispatchCTA.tsx`
- Create: `app/editorial/page.tsx`
- Test: `tests/dispatch.test.tsx`

- [ ] **Step 1: Write the failing Dispatch composition test**

```tsx
import { render, screen } from '@testing-library/react';
import EditorialPage from '@/app/editorial/page';

it('uses numbered editorial dispatches to explain the journey', () => {
  render(<EditorialPage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/one journey/i);
  expect(screen.getByText('Dispatch 01')).toBeInTheDocument();
  expect(screen.getByText('Dispatch 05')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /talk to concierge/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/dispatch.test.tsx`
Expected: FAIL because the editorial route is missing.

- [ ] **Step 3: Implement the editorial Server Component sections**

Use warm paper surfaces, deep-blue rules, orange annotations, a display serif, asymmetry, editorial photography, and the approved section order. Do not reuse Horizon cards or hero composition.

- [ ] **Step 4: Implement the Dispatch motion grammar**

Create masked heading/image reveals, a desktop horizontal chapter sequence, scroll-linked rules, and direction-aware card hover. Mobile must use a vertical chapter list with no scroll hijacking.

- [ ] **Step 5: Verify GREEN**

Run: `npm test -- tests/dispatch.test.tsx && npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/editorial components/navigation/DispatchNav.tsx components/home/dispatch tests/dispatch.test.tsx
git commit -m "feat: build Dispatch homepage"
```

### Task 6: Implement Homepage 3 — Atlas Orbit

**Files:**
- Create: `components/navigation/OrbitNav.tsx`
- Create: `components/home/orbit/OrbitHero.tsx`
- Create: `components/home/orbit/OrbitCanvas.tsx`
- Create: `components/home/orbit/OrbitScene.tsx`
- Create: `components/home/orbit/RouteNodes.tsx`
- Create: `components/home/orbit/ProductConstellation.tsx`
- Create: `components/home/orbit/EcosystemSection.tsx`
- Create: `components/home/orbit/StudentRoute.tsx`
- Create: `components/home/orbit/OrbitConcierge.tsx`
- Create: `components/home/orbit/OrbitCTA.tsx`
- Create: `app/orbit/page.tsx`
- Test: `tests/orbit.test.tsx`

- [ ] **Step 1: Write the failing Orbit composition test**

```tsx
import { render, screen } from '@testing-library/react';
import OrbitPage from '@/app/orbit/page';

it('keeps the spatial journey understandable without WebGL', () => {
  render(<OrbitPage />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/map the whole journey/i);
  expect(screen.getByText('Visa')).toBeInTheDocument();
  expect(screen.getByText('Housing')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /get started free/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/orbit.test.tsx`
Expected: FAIL because the Orbit route is missing.

- [ ] **Step 3: Implement the linear semantic fallback first**

Build all approved content as Server Component HTML with a deep-blue environment, visible route nodes, product panels, ecosystem, student route, Concierge handoff, and white conversion surface.

- [ ] **Step 4: Add the dynamically imported R3F enhancement**

Create an original low-poly route scene using geometry, line paths, lights, and CSS-labelled nodes. Mark the canvas decorative, cap device pixel ratio, pause when offscreen, and skip it under reduced motion or unavailable WebGL.

- [ ] **Step 5: Verify GREEN**

Run: `npm test -- tests/orbit.test.tsx && npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/orbit components/navigation/OrbitNav.tsx components/home/orbit tests/orbit.test.tsx
git commit -m "feat: build Atlas Orbit homepage"
```

### Task 7: Build and validate the consultation form

**Files:**
- Create: `utils/consultationSchema.ts`
- Create: `components/forms/ConsultationForm.tsx`
- Test: `tests/consultation-form.test.tsx`

- [ ] **Step 1: Write failing validation tests**

```tsx
import { consultationSchema } from '@/utils/consultationSchema';

it('rejects an invalid consultation request', () => {
  const result = consultationSchema.safeParse({ name: '', email: 'bad', destination: '' });
  expect(result.success).toBe(false);
});

it('accepts a complete consultation request', () => {
  const result = consultationSchema.safeParse({ name: 'Asha', email: 'asha@example.com', destination: 'United Kingdom' });
  expect(result.success).toBe(true);
});
```

- [ ] **Step 2: Run and verify RED**

Run: `npm test -- tests/consultation-form.test.tsx`
Expected: FAIL because the schema is missing.

- [ ] **Step 3: Implement schema and accessible form**

Use React Hook Form with `zodResolver`, labelled inputs, `aria-describedby`, inline error text, keyboard-safe submit behavior, and a local success state. Do not add a fake network request; expose a typed submit callback for the backend integration.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- tests/consultation-form.test.tsx && npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add utils/consultationSchema.ts components/forms/ConsultationForm.tsx tests/consultation-form.test.tsx
git commit -m "feat: add consultation form"
```

### Task 8: Add route, responsive, and accessibility smoke coverage

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/homepages.spec.ts`

- [ ] **Step 1: Write route smoke tests**

```ts
import { test, expect } from '@playwright/test';

for (const route of ['/', '/editorial', '/orbit']) {
  test(`${route} renders its primary conversion`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /get started free/i }).first()).toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
  });
}
```

- [ ] **Step 2: Run and verify initial failure**

Run: `npm run e2e`
Expected: FAIL until Playwright browser support and the production server configuration are installed.

- [ ] **Step 3: Configure Playwright and responsive projects**

Configure desktop Edge-compatible Chromium and a 390px mobile Chromium project. Add checks for landmarks, keyboard focus, horizontal overflow, and reduced-motion rendering.

- [ ] **Step 4: Verify GREEN**

Run: `npm run build && npm run e2e`
Expected: PASS for all three routes on desktop and mobile projects.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts e2e/homepages.spec.ts package.json package-lock.json
git commit -m "test: cover Atlas homepage routes"
```

### Task 9: Final production and Edge verification

**Files:**
- Modify only files implicated by verification failures.

- [ ] **Step 1: Run the full automated suite**

Run: `npm run lint && npm run typecheck && npm test && npm run build && npm run e2e`
Expected: all commands succeed with no warnings treated as errors.

- [ ] **Step 2: Run the production server**

Run: `npm start`
Expected: Next.js serves all routes without runtime errors.

- [ ] **Step 3: Verify in Microsoft Edge**

Inspect `/`, `/editorial`, and `/orbit` at desktop and responsive mobile widths. Confirm navigation, CTA focus, scrolling, reduced motion, canvas fallback, form errors, and absence of console errors.

- [ ] **Step 4: Compare recommendation criteria**

Record which homepage best balances first-viewport comprehension, emotional desire, trust, CTA clarity, motion discipline, mobile usability, accessibility, and performance.

- [ ] **Step 5: Commit verification fixes**

```bash
git add app components hooks constants types utils styles public tests e2e
git commit -m "fix: polish Atlas homepage experiences"
```

