# WCAG 2.2 AA — responsive reflow discovery

**28 October 2026. Discovery, not an accessibility pass.**

## Source and scope

From merged `main` commit `d4db8592b317159353a1098b2f6a8100b4b10883` after PRs #5–#8. Existing integrated CI passed 60 Playwright tests, strict typecheck, and the Vite build; the 26-route initial-state axe scan reported zero detected violations but incomplete checks persist.

New Playwright `reflow-discovery.spec.ts` collects measured horizontal overflow at 320 and 640 CSS pixels for 17 representative marketing routes, with any candidate offscreen elements recorded as JSON attachments. The discovery does not assert zero overflow: results need classification against WCAG 1.4.10, including permitted two-dimensional content exceptions.

**Important**: reducing viewport width is not the same as verifying actual browser zoom, 200% text resizing, text spacing or screen-reader use. Those must be tested manually, see [the WCAG manual assessment issue](https://github.com/sharififu/DomClear-Website/issues/10).

## Acceptance and triage

- Inspect Actions console logs for `[reflow discovery; NOT conformance]` and attachments for routes with positive overflow.
- Verify whether the scrolling is page-level horizontal clipping versus intentionally scrollable two-dimensional regions.
- For confirmed nonconforming clipping, open specific fix PRs and add *gating* regression checks for the affected components.
- Do not make a public WCAG AA claim from a successful discovery run.

**No production code changes in this PR.**
## Verified baseline and remediation — 28 October 2026

- [Discovery run 40733481990](https://github.com/sharififu/DomClear-Website/actions/runs/40733481990): **94/94 Playwright passed**, strict TypeScript and Vite build passed. Across 17 representative routes at 320 and 640 CSS px (**34 snapshots**) only **`/platform` at 320px** had page-level horizontal overflow: **12px**. The discovery run intentionally did not fail on overflow.
- [Extended diagnostic run 40734158309](https://github.com/sharififu/DomClear-Website/actions/runs/40734158309): the `/platform` h1 was **316px scrollWidth inside a 288px content column**, resulting in `document.documentElement.scrollWidth = 332px` vs `clientWidth = 320px`. The skip link had a larger internal scrollWidth but was intentionally clipped/offscreen before focus and was **not** the page overflow source.
- Root cause: `PlatformPage.tsx` used a **48px (`text-5xl`) h1 down to 320px**, making an unbreakable word too wide.
- Small fix: `text-4xl sm:text-5xl md:text-6xl` sets **36px** heading at 320px while retaining existing >=640px heading sizes.
- Added a **gating** Playwright check that fails if either the Platform heading or document horizontally overflows at 320px. Keep the non-gating wider discovery sweep to detect additional responsive defects.

**Post-fix CI status:** Check the Actions run for the latest code commit `af26b05aefae6d7406908f56b0e59e3c8e7fb8bb`; do not mark the issue closed until all checks pass and the 320px overflow measurement is zero. Simulated narrow viewport is not a substitute for actual browser zoom or screen-reader checks. Manual audit remains [open](https://github.com/sharififu/DomClear-Website/issues/10).

## Post-fix verified results — 28 October 2026

[GitHub Actions run 40734602405](https://github.com/sharififu/DomClear-Website/actions/runs/40734602405), tested code commit `af26b05aefae6d7406908f56b0e59e3c8e7fb8bb`, finished **SUCCESS**.

- **95/95 Playwright tests passed**, including all existing 60 integrated tests, 34 reflow discovery measurements, and the new *gating* 320px Platform heading regression test.
- **34/34 measured route-and-viewport combinations reported 0px page-level horizontal overflow** at 320 and 640 CSS px. The original `/platform` 320px 12px overflow was resolved by the responsive heading size.
- Strict `npm run typecheck` and Vite build **PASS**. The 26 initial-state axe scans still reported **zero detected violations**, with incomplete/manual checks remaining.
- The repo code and tests are committed only to **draft PR #11**. The fix is **not merged or deployed**. Production alias still needs separate verification after any approved merge.
- This is not actual 400% browser zoom, 200% text resizing, screen-reader testing, text spacing or an AA conformance result. [Manual assessment issue #10](https://github.com/sharififu/DomClear-Website/issues/10) stays open.
