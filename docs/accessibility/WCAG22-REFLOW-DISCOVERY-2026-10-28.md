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