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
