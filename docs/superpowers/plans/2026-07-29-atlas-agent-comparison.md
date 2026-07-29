# Atlas Agent Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Atlas-versus-agent comparison section immediately below Landing 3 Essentials using the supplied copy and the current site’s visual language.

**Architecture:** Create one focused client component containing the comparison data and entrance motion, then mount it between Essentials and Support. Render each comparison as a semantic paired row with desktop and mobile layouts handled entirely through Tailwind.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, GSAP, Vitest, Playwright

## Global Constraints

- Preserve the supplied comparison copy unchanged.
- Use the Landing 3 dark theme and `#f35a02` accent.
- Do not copy the supplied HTML card UI.
- Place the section directly after `Landing3EssentialsOrbit`.
- Do not add dependencies.

---

### Task 1: Add the comparison contract

**Files:**
- Modify: `tests/landing-3.test.tsx`

**Interfaces:**
- Consumes: `Landing3Page`
- Produces: assertions for section order, four paired rows, title, and CTA

- [x] **Step 1: Write a failing test for the comparison section.**
- [x] **Step 2: Run `npm test -- --run tests/landing-3.test.tsx` and confirm failure because the section is absent.**

### Task 2: Build and mount the editorial comparison rail

**Files:**
- Create: `components/landing-3/Landing3AgentComparison.tsx`
- Modify: `app/landing-3/page.tsx`
- Modify: `e2e/landing-3.spec.ts`

**Interfaces:**
- Produces: `Landing3AgentComparison`, `[data-landing-3-agent-comparison]`, and four `[data-agent-comparison-row]` elements

- [x] **Step 1: Implement the semantic paired-row component with title reveal, staggered entrance, hover response, and CTA.**
- [x] **Step 2: Mount it directly after `Landing3EssentialsOrbit`.**
- [x] **Step 3: Update browser coverage for desktop and mobile layout.**
- [x] **Step 4: Run the Landing 3 tests and production build.**
- [x] **Step 5: Visually verify desktop and mobile screenshots.**
