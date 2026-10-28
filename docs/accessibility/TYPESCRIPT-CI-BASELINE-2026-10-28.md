# DomiClear marketing website — TypeScript baseline remediation

**Date:** 28 October 2026
**Branch:** `fix/website-typescript-baseline-20261028`
**Scope:** marketing website repository `sharififu/DomClear-Website`, *not* the clinical application.

## Starting evidence

The full `npm run typecheck` failed in the [accessibility CI run 40703061681](https://github.com/sharififu/DomClear-Website/actions/runs/40703061681), despite 56/56 passing browser tests on the separate contrast PR #6. The same pre-existing errors were recorded on main since at least Batch 01. The issues include unused imports/arguments, mismatched HeroUI Button prop types, a phantom demo ID, Joyride callback union typing, a staff dropdown state incorrectly typed boolean, missing optional KPI colour property in an inferred array, and two implicit-any IDs in a JSON-cloned schema.

This PR addresses **the compiler defects on `main`** in a separate branch and should be validated independently. It deliberately does not include draft PR #6's new contrast changes.

## Corrective approach

- Remove unused imports/parameters; no visible behavior changes.
- Define the Button adapter's explicit event types without suppressing TypeScript checks or converting to `any`.
- Stop identifying the nonexistent invoices ID as a valid demo tab, without changing the Finance component or its existing `finance` active-state handling.
- Use a direct Joyride status discriminant comparison instead of an overly narrow array-includes argument.
- Type the staff dropdown's intended index-or-closed state as `number | false`, and make same-index click close correctly, including index zero.
- Preserve the KPI demo's values and rendering by explicitly supplying `valueColor: undefined` for ordinary rows.
- Give JSON-cloned template IDs a specific `{ id: string }` callback annotation.

## Acceptance criteria and limits

**Do not claim success until a CI run confirms `npm run typecheck` PASS and the existing Vite build + Playwright browser suite PASS.** Additional TypeScript errors may be revealed and need measured follow-up. Test the scheduling demo's multi-staff dropdown and menu keyboard behaviour before merging; this is a nonclinical marketing demo but it is still a user interaction.

The PR is draft and unmerged, no production release was requested by creating it. It does not assert WCAG 2.2 AA conformance and does not bypass or downgrade any compiler checks.

## Verified CI — 28 October 2026

[GitHub Actions run 40703780846](https://github.com/sharififu/DomClear-Website/actions/runs/40703780846), commit `db545beb25745a979526115ff3631bfdeff85089`, finished with **overall SUCCESS**:

- `npm run typecheck`: **PASS** with strict checks still enabled.
- `npm run build`: **PASS**.
- Playwright browser test suite: **45/45 PASS** (main branch includes accessibility Batches 01–03, not draft PR #6's seven-route blue/teal refinements).
- Important limitation: staff-dropdown row-index behaviour was typed and corrected but not independently exercised by a dedicated interactive browser test. Do not claim that complete manual journey has passed.
- Draft PR #7 remains unmerged; successful CI on this branch is not proof main or the separate PR #6 will be green until both are integrated and retested. WCAG 2.2 AA assessment remains incomplete.
