# Atlas macOS Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Landing 3 readiness grid with an interactive Atlas course preview presented inside a macOS-style window.

**Architecture:** Keep the existing `Landing3ReadinessSection` boundary and section ID, but replace its internals with a self-contained client-side form. Local React state owns the selected level, selected field, and submitted preview; existing title-reveal and IntersectionObserver conventions remain in use.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, Vitest, Testing Library

## Global Constraints

- Use Atlas content only.
- Use `#f35a02` as the accent.
- Preserve `data-landing-3-readiness` and `id="journey"` so page structure and existing links remain stable.
- Use native form controls and an accessible submit action.
- Do not add dependencies.

---

### Task 1: Define the interactive section contract

**Files:**
- Modify: `tests/landing-3.test.tsx`

**Interfaces:**
- Consumes: `Landing3Page`
- Produces: assertions for `[data-atlas-preview-window]`, `Level`, `Field`, and the generated `[data-atlas-preview-result]`

- [x] **Step 1: Write the failing test**

```tsx
it("builds a personalized Atlas inside a macOS-style window", async () => {
  const user = userEvent.setup();
  const { container } = render(<Landing3Page />);
  expect(container.querySelector("[data-atlas-preview-window]")).not.toBeNull();
  await user.selectOptions(screen.getByLabelText("Level"), "Undergraduate");
  await user.selectOptions(screen.getByLabelText("Field"), "Business");
  await user.click(screen.getByRole("button", { name: "Show my Atlas" }));
  expect(container.querySelector("[data-atlas-preview-result]")).toHaveTextContent(
    "Undergraduate Business",
  );
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/landing-3.test.tsx`

Expected: FAIL because the macOS preview window and controls do not exist.

### Task 2: Replace the readiness grid with the macOS preview

**Files:**
- Modify: `components/landing-3/Landing3ReadinessSection.tsx`
- Test: `tests/landing-3.test.tsx`

**Interfaces:**
- Consumes: native `select` change events and form submission
- Produces: `Landing3ReadinessSection` with preserved section identifiers and a generated preview result

- [x] **Step 1: Implement the minimal component**

Create a macOS title bar with red, yellow, and green window controls; add the Atlas badge, heading, description, two native selects, and a full-width orange submit button. On submit, store the selected values and reveal a concise three-stage Atlas route inside the same window.

- [x] **Step 2: Verify component tests**

Run: `npm test -- --run tests/landing-3.test.tsx`

Expected: 12 tests pass.

- [x] **Step 3: Verify production output**

Run: `npm run build`

Expected: build exits successfully.

- [x] **Step 4: Verify desktop and mobile layouts**

Open `/landing-3`, capture `[data-landing-3-readiness]` at 1440×1000 and 390×844, and confirm the controls remain visible without horizontal clipping.
