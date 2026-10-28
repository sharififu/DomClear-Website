# DomiClear marketing website — WCAG 2.2 Level AA working assessment

**Assessment opened:** 28 October 2026  
**Scope:** https://www.domi-clear.com, repository `sharififu/DomClear-Website`  
**Branch:** `audit/wcag22-aa-batch-01`  
**Status:** IN PROGRESS — **no WCAG conformance claim or badge is authorised**.  
**Approval:** Draft PR review only. No production merge or deliberate deployment.

## What has actually been assessed

Source review of `main`: `src/App.tsx`, `src/components/Navbar.tsx`,
`src/components/FAQAccordion.tsx`, `src/components/Modal.tsx`,
`src/components/Button.tsx`, `src/index.css`,
`src/pages/ContactPage.tsx`, `src/pages/BookDemoPage.tsx`,
`src/pages/LoginPage.tsx`, `src/pages/TutorialsPage.tsx`,
`src/pages/LegalPage.tsx`, and the source tree including legal HTML/PDF assets.

The externally accessible website was retrieved, but the extraction surfaced only
a limited amount of HTML, so it is **not** a complete browser audit. No
axe-core, Playwright, keyboard or screen-reader test result had been executed or
verified at the time this baseline document was created. The added workflow is
intended to produce the *first* reproducible browser baseline after the PR opens.

## Route and interaction inventory

Client-rendered page routes: `/`, `/platform`, `/solutions`,
`/pricing`, `/tutorials`, `/book-demo`, `/contact`, `/about`,
`/credentials`, `/company-information`,
`/home-care-scheduling-software`, `/emar-software`,
`/care-planning-software`, `/care-management-app`,
`/birdie-alternative`, `/login`, `/signup`,
`/legal`, and `/legal/{terms,privacy,cookies,acceptable-use,service-level}`.
Aliases `/demo`, `/demos`, `/demo-fullscreen`, `/home-care-app`
also require verification. Direct legal HTML and linked PDF files are included.

Primary journeys: header and mobile navigation; skip link; pricing and
sign-up CTAs; contact form; demo request form; tutorial search/filter/player;
FAQ disclosure; legal document selection/download; modal dialogs; interactive
marketing demos (including guided tour); external login/sign-up links.

## Finding register — code review, not instrumented test results

| ID | Severity / confidence | Shared root cause and relevant WCAG criteria | Evidence / next action |
|---|---|---|---|
| A11Y-001 | High / confirmed in pre-fix source | Desktop navigation submenu relied on pointer hover to reveal its children. 2.1.1 Keyboard, 4.1.2 Name Role Value, 2.4.3 Focus Order | `src/components/Navbar.tsx`; Batch 01: dedicated button, expanded state, focus handling, Escape, native submenu links |
| A11Y-002 | High / confirmed navigation architecture, user impact not yet tested | `src/App.tsx` intercepts same-origin anchor clicks, replaces route content and scrolls, but does not put focus on the new heading/main landmark or announce route changes. 2.4.3 Focus Order, 2.4.7 Focus Visible, 4.1.3 Status Messages (as applicable) | Batch 02: design and test route focus restoration, back/forward and hash anchors without SEO regressions |
| A11Y-003 | Medium / confirmed in pre-fix source | Mobile hamburger did not expose `aria-expanded`, `aria-controls` or a state-specific accessible name; Escape path was absent. 4.1.2, 2.1.1 | `src/components/Navbar.tsx`; Batch 01 |
| A11Y-004 | Review required / no measured contrast data | Interactive links, light text, icon controls, focus indication and non-text boundaries need computed contrast checks. 1.4.3, 1.4.11, 2.4.7, 2.4.11 | The pre-scroll transparent header also used white nav text over light backgrounds on Contact/Login/Signup/Legal; Batch 01 addresses that specific state. Other gradient-hero contrast and focus checks remain pending. |
| A11Y-005 | Review required / code observation | FAQ uses shared index-based IDs, potentially repeated across component instances, and visually collapses content with `max-h-0`. 1.3.1, 4.1.2 | Verify unique IDs, keyboard disclosure, accessible hiding and motion in Batch 02 |
| A11Y-006 | Review required / some correct semantics already exist | Contact and demo forms have labels, required fields and `role="alert"` on submission error. Full error, success, autocomplete, reflow and assistive-technology experience not yet verified. 1.3.5, 3.3.1–3.3.3, 4.1.3 | Automated checks and manual form journeys with mocked endpoints, **never send real requests from tests** |
| A11Y-007 | Review required / source inventory | `LoginPage` includes login, signup, a plan picker and an apparent payment information section whose labels lack explicit input association. 1.3.1, 3.3.2, 4.1.2 | Check whether these elements remain live/reachable; remove misleading mock payment UI only with separate approval |
| A11Y-008 | Review required / source inventory | Tutorial videos, embedded iframe, interactive demos, modal dialogs, legal iframes and PDFs have accessibility paths not covered by a single axe scan. 1.2.x, 2.1.x, 2.4.x, 4.1.2 | Manual keyboard/screen-reader tests, transcript/captions review, PDF accessibility review |

**Severity is provisional prioritisation.** A source-level implementation defect
is not automatically a fully verified WCAG failure in every rendered state.

## Batch 01 — navigation only

- Desktop top-level links remain real links; submenu links remain native anchors.
- Dedicated submenu toggle button supports Enter/Space through native button behaviour.
- Toggle reports `aria-expanded`, references existing submenu with `aria-controls`.
- Pointer hover remains available; focus can move from toggle into submenu links.
- Escape collapses submenu and returns focus to its toggle.
- Removes application-menu semantics (`role="menu"` and `role="menuitem"`) from a normal navigation list that has no full ARIA menu-keyboard implementation.
- Mobile toggle exposes its state, controls the menu panel, and provides an Escape return path.
- Light-background Contact, Login, Signup and Legal pages use the existing white/dark header state before scroll; gradient hero pages keep their established appearance.
- No intentional changes to visual brand palette, route targets, SEO metadata, form submission, application data or server-side services.

### Regression evidence required before acceptance

1. `npm ci`, `npm run typecheck`, `npm run build`.
2. Playwright Chromium: desktop keyboard/hover submenu, mobile expanded-state/keyboard, form field-name smoke test.
3. Axe-core tagged WCAG discovery scans across all listed routes; attach per-route JSON and log counts, including `incomplete` results.
4. Manual visual comparison desktop/mobile; check header at top and after scrolling, keyboard focus order, zoom/reflow and colour contrast.
5. Manual screen reader test (NVDA + Chrome/Firefox; VoiceOver + Safari where available); test all contact/demo journeys without submitting production data.
6. Check changed pages with navigation/history and external links; do not accept if behaviour or SEO degrades.

## How to run locally (free tools)

```sh
npm ci
node scripts/setup-a11y-tools.mjs
node node_modules/.domiclear-a11y-tools/node_modules/playwright/cli.js install chromium
npm run typecheck
npm run build
node node_modules/.domiclear-a11y-tools/node_modules/playwright/cli.js test
```

The workflow also performs these checks on the draft PR without an explicit deploy command. The accessibility tools install inside an ignored subdirectory of node_modules so npm does not re-resolve the existing locked HeroUI beta dependencies. A connected external deployment service may separately create automatic preview deployments upon a GitHub push; this workflow does not initiate them.
Baseline axe tests intentionally **collect** findings; they do not fail on every
pre-existing violation. A green workflow therefore means *only* that the build,
smoke tests and collection completed. Review `playwright-report/` and the
`wcag22-accessibility-baseline` artifact before assigning confirmed statuses.

## Manual assessment still necessary

Record a criterion-by-criterion WCAG 2.2 A/AA verdict (Pass / Fail / Not
Applicable / Not Tested) with URLs, viewport, browser, AT, date, steps, outcome
and evidence. Include keyboard-only, screen reader, browser zoom (200%/400%),
reflow at 320 CSS px, text-spacing overrides, colour contrast, target size 24 px
or documented exception, focus not obscured, reduced motion, validation, media
captions/transcripts, interactive demonstrations and legal documents.

Any future accessibility statement must accurately disclose remaining
exceptions and dates. **Do not use an AA badge, certification language or
“Standards Met” claim based on automated checks or this PR alone.**


## First Chromium axe / Playwright evidence — 28 October 2026

**Evidence source:** [GitHub Actions run 40683625053](https://github.com/sharififu/DomClear-Website/actions/runs/40683625053), commit `27fb87d463bd6d7f005787da9615d69626305797`, artifact `wcag22-accessibility-baseline`. This is a **built local preview tested by Chromium**, **not a production-site manual assessment**.

- `npm ci`: pass; isolated Playwright/axe tool install: pass; Chromium install: pass; `npm run build`: pass.
- Playwright: **31 tests passed**, including 26 per-route axe *discovery* scans and five navigation/form-field regression checks.
- `npm run typecheck`: **failed** due to existing codebase errors in `src/components/Button.tsx`, multiple `src/components/demos/*` files, and an unused `event` parameter in Navbar. The run's overall GitHub Actions status is therefore **failure** even though its browser step passed. Treat the compilation errors as a separate technical-debt track; do not label CI fully green.
- Of 26 route snapshots, **22** had one or more automated violations; **4** showed none in that initial snapshot. A route with zero detected violations is **not** evidence of WCAG AA conformance.
- **82 affected node instances** were logged, **not 82 unique root causes**. Of these, **81 are `color-contrast`**, and **1 is `link-in-text-block`**. Legal iframe and direct-HTML scans intentionally produce duplicate instance counts. Affected instances are provisional until each is verified in rendered context.

### Grouped evidence by root cause

| Priority | Shared root cause | Axe evidence | Suggested next small batch |
|---|---|---|---|
| High — serious | Light legal-document links: `#3B82F6` on white, roughly **3.67:1** | **50 affected instances**, with duplication across iframe and direct document scans | Improve legal HTML link palette globally and check link distinctions/hover/focus, preserving document content |
| High — serious | White lettering on teal `#0EA08A`, roughly **3.27:1** | **13 affected instances** across CTA/button variants | Update shared teal foreground/background contrast, preserve the branded teal identity |
| High — serious | Blue `#1A86F0` on white, roughly **3.67:1** | **11 affected instances** | Use a darker accessible blue for text on white while keeping hero gradient branding |
| High — serious | Other blue/teal and muted grey colour combinations below 4.5:1 | **7 affected instances** (various routes/backgrounds) | Target shared tokens or isolated classes based on exact element snapshots |
| High — serious | Contact Privacy Policy inline link distinguished from surrounding copy primarily by colour, with 1.63:1 link-to-text contrast | **1 affected instance** (`link-in-text-block`) | Add persistent underline or equivalent non-colour styling, verify keyboard focus |

Axe also produced **incomplete/manual-review** results, including contrast, captions, autoplay audio and possible ARIA cases. These do not establish a pass or a fail and **must** be checked manually. All counts are scoped to the initial page states, not every interaction, every viewport or every complete user journey.

### Suggested Batch 02 (not yet implemented)

Fix the **shared legal HTML link colour** and **link non-colour affordance** as a tightly bounded change, accompanied by axe assertions and manual contrast calculation. Follow with branded CTA palettes and the remaining affected contexts. Do **not** sweep all colours automatically. Separately test SPA route focus, dialog/accordion interaction, form validation and legal PDF accessibility.

**No WCAG 2.2 AA certification, full conformance statement, or accessibility badge is justified by this evidence.** A manual screen-reader and keyboard assessment, route-level history/focus journey verification, zoom/reflow, media captions/transcripts and accessible PDFs remain outstanding.

## Batch 02 — legal-link contrast and Contact form link (28 October 2026)

**Status:** Code updated in draft PR #5. The definitive after-change test results must be taken from a GitHub Actions run on the *latest Batch 02 commit*; manual screen-reader and broader WCAG checks remain outstanding.

**Root causes:** A11Y-004 / WCAG 2.2 **1.4.3 Contrast (Minimum)** and **1.4.1 Use of Color**. The baseline's repeated legal link contrast findings are a shared stylesheet-pattern problem, not dozens of different defects.

- Updated six standalone legal HTML documents (`index`, `terms`, `privacy`, `cookies`, `acceptable-use`, `service-level`) from `#3B82F6` to `#1D4ED8` for text links. Calculated contrast against white: **3.68:1 before; 6.70:1 after**. Body copy, headings, filenames, legal content, print layout and linked PDFs are unchanged.
- Kept links persistently underlined and added clear keyboard focus outlines. The hub index no longer removes its link underline on hover.
- Darkened only legal-document print-button *hover* backgrounds to `#1D4ED8` so white text remains readable; normal dark buttons unchanged.
- Added a permanent underline and focus style to the Privacy Policy link within the Contact form; kept its existing brand blue `#1F6FEB` (computed against white approximately **4.63:1**).
- Added `tests/accessibility/legal-contrast.spec.ts` with computed contrast measurements, an axe `color-contrast` gate for each standalone legal HTML page and embedded Privacy Notice, a `link-in-text-block` axe gate for Contact, and keyboard/hover checks.

**Important limits:** The new assertions apply to these specific pages/components and browser states; they do not constitute WCAG AA approval for all marketing routes, PDFs, media, forms, focus-management, contrast over backgrounds or assistive-technology journeys. Pre-existing TypeScript failures must remain visible in CI, separate from accessibility-browser results.

### Batch 02 measured regression outcome — 28 October 2026

**Evidence:** [GitHub Actions run 40694245726](https://github.com/sharififu/DomClear-Website/actions/runs/40694245726) on commit `5f0b05d6c484f7b5d657c62ee05e159b180d0ee9` (code unchanged by this evidence-note update).

- `npm ci`, isolated browser-test dependencies, Chromium setup and `npm run build`: **pass**.
- Playwright + axe tests: **40 passed / 40 total**, including six standalone HTML contrast checks, an HTML print-button hover/focus check, Contact inline-link style + axe check, and a pretty-path legal route check. Existing navigation tests also passed.
- In the same 26-page discovery sweep, detected affected *instances* fell from **82 to 31** (**51 fewer / approximately 62% reduction**) with the legal and Contact route snapshots each reporting **zero axe violations** in their tested state. Repeated instances across pretty and direct legal URLs are **not** unique defect counts.
- **Overall workflow remains failed:** `npm run typecheck` still reports existing errors in the Button abstraction, marketing demos and one unused Navbar event argument. Do not mislabel the CI as fully green.
- The pretty URL `/legal/privacy` was served without the expected React iframe in the preview browser; an overly specific iframe-presence test initially failed. This was corrected to explicitly check a visible Privacy Notice in either a direct HTML or iframe presentation, and the corrected test passed. Route resolution should still receive a separate production/preview comparison.
- These are **automated preview-build results**, not manually verified production WCAG 2.2 conformance. Manual screen-reader, keyboard journeys, zoom/reflow, captions/transcripts and linked PDF checks remain unassessed.

**Next small remediation candidate:** shared white-on-teal CTA text contrast (baseline: 13 affected instances). Treat SPA route-focus restoration as a separate interactive-behaviour batch. Do not change the primary marketing colour gradient or entire palette without targeted evidence and visual regression review.

## Batch 03 — teal accent CTA and pricing badge contrast (28 October 2026)

**State:** Proposed fix committed on the existing draft PR, pending latest-run regression and manual verification. **No production merge/deploy, no WCAG conformance claim.**

Source of targeted findings: the 26-route Chromium axe discovery artifact from [Batch 02 run 40694245726](https://github.com/sharififu/DomClear-Website/actions/runs/40694245726). Of the **31** remaining affected instances, **13** share `color-contrast` rule, foreground `#ffffff` and background `#0ea08a` (approx. **3.27:1**): one home Hero CTA, two About accent CTAs, five pricing badges on `/pricing`, and five on `/signup`. These are *instances*, not 13 different underlying defects.

**Code root causes and changes:**
- `src/components/Button.tsx`: `accent` class changed from `bg-[#0ea08a] hover:bg-[#0c8a75]` to `bg-[#0F766E] hover:bg-[#115E59]` while retaining white text, existing event handling, semantics, links, labels and layout.
- `src/components/PricingCard.tsx`: trial badge background changed from `#0ea08a` to `#0F766E`; kept white text and size/placement.
- Computed WCAG contrast ratios for normal text on background: **3.27:1 before; 5.47:1 after** (new hover shade **7.58:1**). The actual browser-computed value and axe scan will be checked by regression; no claim for background gradients or other teal combinations.
- `tests/accessibility/teal-contrast.spec.ts` tests rendered accent controls on Home and About, all five visible trial badges each on Pricing and Signup, white-on-teal computed contrast, scoped axe `color-contrast`, and CTA hover contrast/destination. The full route-discovery tests remain non-gating for unrelated findings.

**Expected improvement:** Remove 13 repeated white-on-`#0ea08a` failures on the same baseline route states; other blue-on-white and muted grey/teal contrast findings remain outside Batch 03.

**Acceptance:** Confirm browser tests and build pass on the final Batch 03 commit. The complete pipeline still has independent pre-existing TypeScript errors, and passing these specific tests is not a conformance assessment. Screen-reader, zoom/reflow, focus management, media, forms and PDF checks are still outstanding.

### Batch 03 measured regression result — 28 October 2026

**GitHub Actions evidence:** [run 40695545635](https://github.com/sharififu/DomClear-Website/actions/runs/40695545635), code commit `8cadd79c41722d6a4e2e74daad39b998cc042912` (followed by documentation-only commits).

- `npm ci`, isolated accessibility tools, Chromium install and `npm run build`: **PASS**.
- Playwright: **45/45 passed** (26 axe discovery snapshots and 19 targeted/behavioural tests, including five new teal checks). Checked Home/About accent CTAs, Pricing/Signup trial badges, actual computed contrast, scoped axe rule and CTA hover styling.
- Axe discovery across the same 26 route snapshots: **18 affected instances**, down from **31** after Batch 02 (**13 fewer, approx 42%**), and down from **82** initially (**64 fewer, approx 78%**). The 13 targeted `#ffffff` on `#0ea08a` instances were no longer present. Other contrast issues remain.
- **Overall Actions status: FAIL** from existing full-project `npm run typecheck` errors (Button typing, demo code, unused Navbar handler parameter). Keep this separate from browser accessibility regressions; do not claim a green pipeline.
- **Manual completion pending:** keyboard and screen-reader journeys, zoom/reflow, hover/focus states beyond tested cases, captions/transcripts, legal PDFs, and complete WCAG 2.2 A/AA criteria matrix. No AA claim or badge.

**Next bounded contrast candidate:** blue `#1A86F0` text on white CTAs (11 remaining baseline instances; measured approx 3.67:1), distinct from the brand hero background gradient; avoid broad palette changes.
