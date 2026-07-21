# Normal Page Google Sans Flex Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Host Grotesk with Google Sans Flex throughout `/normal` while leaving every other route unchanged.

**Architecture:** The route-specific normal stylesheet will load Google Sans Flex from the official Google Fonts CSS API and expose it through the existing Tailwind sans token. The normal layout will stop loading Host Grotesk through `next/font/google`.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, Google Fonts CSS API, Vitest

---

### Task 1: Change the normal-page typeface

**Files:**
- Create: `tests/normal-font.test.ts`
- Modify: `app/normal/globals.css`
- Modify: `app/normal/layout.tsx`

- [ ] **Step 1: Write the failing typography test**

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

it("uses Google Sans Flex throughout only the normal route", () => {
  const css = readFileSync(resolve(process.cwd(), "app/normal/globals.css"), "utf8");
  const layout = readFileSync(resolve(process.cwd(), "app/normal/layout.tsx"), "utf8");

  expect(css).toContain("family=Google+Sans+Flex:opsz,wght@6..144,1..1000");
  expect(css).toContain('--font-sans: "Google Sans Flex", sans-serif;');
  expect(css).toContain('font-family: "Google Sans Flex", sans-serif;');
  expect(layout).not.toContain("Host_Grotesk");
  expect(layout).not.toContain("hostGrotesk.variable");
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/normal-font.test.ts`

Expected: FAIL because the normal route still imports and uses Host Grotesk.

- [ ] **Step 3: Load and apply Google Sans Flex**

At the top of `app/normal/globals.css`, add:

```css
@import url("https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap");
```

Change the theme token and body declaration to:

```css
--font-sans: "Google Sans Flex", sans-serif;
font-family: "Google Sans Flex", sans-serif;
```

Remove the `Host_Grotesk` import, initializer, and layout class variable from `app/normal/layout.tsx`.

- [ ] **Step 4: Run verification**

Run: `npm test -- tests/normal-font.test.ts tests/normal-title-animation.test.tsx`

Expected: both files pass.

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0 with only the repository's known lint warnings.

- [ ] **Step 5: Review the diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors and no changes outside the requested normal typography files, test, and planning document.
