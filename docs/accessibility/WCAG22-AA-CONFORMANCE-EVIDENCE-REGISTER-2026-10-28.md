# DomiClear marketing site — WCAG 2.2 Level AA conformance evidence register

**Assessment record initiated:** 28 October 2026
**Scope:** `https://www.domi-clear.com` marketing pages and routes reachable there; repo `sharififu/DomClear-Website` at merged `main` SHA `a500a072a14bf4e406f0772386576456438c03b5` (production build/alias requires separate confirmation). The clinical application and external identity/payment systems are **not assumed to be within the same scope**; complete linked processes must be considered before any claim.
**Outcome:** **NOT VERIFIED / NOT APPROVED** — do not display an AA badge or issue a WCAG 2.2 AA conformance statement.

## What we actually have

- [GitHub Actions 40735071145](https://github.com/sharififu/DomClear-Website/actions/runs/40735071145): reviewed PR #11 head; `95/95` Chromium tests passed, strict TypeScript passed, Vite build passed; `26` axe discovery route snapshots with zero detected violations, with `incomplete` checks; `34` narrow viewport measurements at 320/640 CSS px with zero page-level horizontal overflow.
- PRs #5–#8 and #11 were merged to main. [Issue #10](https://github.com/sharififu/DomClear-Website/issues/10) holds the manual evaluation checklist.
- **Owner-reported result:** on 28 October 2026 the site owner stated “all the checks passed” after receiving instructions to test keyboard, screen reader, zoom, forms and media/PDFs. **No route-by-route notes, tester/device/tool versions, video caption inventory, PDF structure report or screenshot files were received.** Treat this as **self-reported high-level feedback, not a criterion-level PASS**, and do not infer they used a particular screen reader or tested every document.
- Latest merge commit has a successful Vercel status. This does **not** prove independently that the public domain serves that exact deployment or that all interactive routes behave as tested.

## Conformance rules and evidence semantics

WCAG 2.2 AA requires **every applicable Level A and AA Success Criterion** (55 below) across **full pages, responsive variants, complete processes** and accessibility-supported technology, plus non-interference. It does **not** require third-party certification, but a defensible conformance claim needs sufficient, reviewable proof. Source: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/#conformance). **WCAG 2.2 does not include obsolete SC 4.1.1 Parsing.**

**Status key:** `AUTOMATED SUPPORT — UNVERIFIED` = specific regression or code evidence exists, but complete SC is not proven. `NOT VERIFIED` = no adequate per-SC test evidence recorded. `CONDITIONAL — UNVERIFIED` = applicability needs evaluation; do not mark N/A merely because a test was not run. `PASS` requires a recorded route, environment, actual result, evidence and reviewer sign-off. No criterion below is currently marked PASS or N/A.

**Criteria inventory:** 55 total (31 Level A, 24 Level AA).

## Complete A and AA criterion inventory

| SC | Requirement (W3C title) | Level | Recorded state | Existing evidence / next verification |
| --- | --- | :---: | --- | --- |
| 1.1.1 | Non-text Content | A | NOT VERIFIED | Assess full-page states and applicability for text alternatives. |
| 1.2.1 | Audio-only and Video-only (Prerecorded) | A | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for time-based media. |
| 1.2.2 | Captions (Prerecorded) | A | AUTOMATED SUPPORT — UNVERIFIED | Four YouTube tutorials: caption accuracy and availability not verified. |
| 1.2.3 | Audio Description or Media Alternative (Prerecorded) | A | AUTOMATED SUPPORT — UNVERIFIED | Four YouTube tutorials plus decorative silent loops: audible/visual meaning not assessed. |
| 1.2.4 | Captions (Live) | AA | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for time-based media. |
| 1.2.5 | Audio Description (Prerecorded) | AA | AUTOMATED SUPPORT — UNVERIFIED | Audio description or adequate narration of meaningful visuals not verified. |
| 1.3.1 | Info and Relationships | A | NOT VERIFIED | Assess full-page states and applicability for adaptable. |
| 1.3.2 | Meaningful Sequence | A | NOT VERIFIED | Assess full-page states and applicability for adaptable. |
| 1.3.3 | Sensory Characteristics | A | NOT VERIFIED | Assess full-page states and applicability for adaptable. |
| 1.3.4 | Orientation | AA | NOT VERIFIED | Assess full-page states and applicability for adaptable. |
| 1.3.5 | Identify Input Purpose | AA | NOT VERIFIED | Assess full-page states and applicability for adaptable. |
| 1.4.1 | Use of Color | A | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 1.4.2 | Audio Control | A | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 1.4.3 | Contrast (Minimum) | AA | AUTOMATED SUPPORT — UNVERIFIED | Automated contrast checks: 26-route axe discovery; CTA/teal/legal regression tests (limited page states). |
| 1.4.4 | Resize Text | AA | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 1.4.5 | Images of Text | AA | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 1.4.10 | Reflow | AA | AUTOMATED SUPPORT — UNVERIFIED | 34 measurements at 320/640 CSS px: no page-level overflow after Platform fix; not actual browser zoom. |
| 1.4.11 | Non-text Contrast | AA | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 1.4.12 | Text Spacing | AA | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 1.4.13 | Content on Hover or Focus | AA | NOT VERIFIED | Assess full-page states and applicability for distinguishable. |
| 2.1.1 | Keyboard | A | AUTOMATED SUPPORT — UNVERIFIED | Playwright desktop/mobile menu keyboard, route-change and skip-link checks; not full journeys. |
| 2.1.2 | No Keyboard Trap | A | NOT VERIFIED | Assess full-page states and applicability for keyboard accessible. |
| 2.1.4 | Character Key Shortcuts | A | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for keyboard accessible. |
| 2.2.1 | Timing Adjustable | A | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for enough time. |
| 2.2.2 | Pause, Stop, Hide | A | AUTOMATED SUPPORT — UNVERIFIED | Platform has 3 autoplay looping muted videos; pause/stop requirement and 5-second/essential exceptions need assessment. |
| 2.3.1 | Three Flashes or Below Threshold | A | NOT VERIFIED | Assess full-page states and applicability for seizures and physical reactions. |
| 2.4.1 | Bypass Blocks | A | AUTOMATED SUPPORT — UNVERIFIED | Playwright skip-link focus regression. |
| 2.4.2 | Page Titled | A | AUTOMATED SUPPORT — UNVERIFIED | Playwright route page-title checks. |
| 2.4.3 | Focus Order | A | AUTOMATED SUPPORT — UNVERIFIED | Playwright route focus and browser history checks; limited states. |
| 2.4.4 | Link Purpose (In Context) | A | NOT VERIFIED | Assess full-page states and applicability for navigable. |
| 2.4.5 | Multiple Ways | AA | NOT VERIFIED | Assess full-page states and applicability for navigable. |
| 2.4.6 | Headings and Labels | AA | NOT VERIFIED | Assess full-page states and applicability for navigable. |
| 2.4.7 | Focus Visible | AA | AUTOMATED SUPPORT — UNVERIFIED | Navigation focus regression and CSS focus styles; not all controls. |
| 2.4.11 | Focus Not Obscured (Minimum) | AA | AUTOMATED SUPPORT — UNVERIFIED | Route focus and skip-link tests; focus-obscured visual assessment still missing. |
| 2.5.1 | Pointer Gestures | A | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for input modalities. |
| 2.5.2 | Pointer Cancellation | A | NOT VERIFIED | Assess full-page states and applicability for input modalities. |
| 2.5.3 | Label in Name | A | NOT VERIFIED | Assess full-page states and applicability for input modalities. |
| 2.5.4 | Motion Actuation | A | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for input modalities. |
| 2.5.7 | Dragging Movements | AA | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for input modalities. |
| 2.5.8 | Target Size (Minimum) | AA | NOT VERIFIED | Assess full-page states and applicability for input modalities. |
| 3.1.1 | Language of Page | A | NOT VERIFIED | Assess full-page states and applicability for readable. |
| 3.1.2 | Language of Parts | AA | NOT VERIFIED | Assess full-page states and applicability for readable. |
| 3.2.1 | On Focus | A | NOT VERIFIED | Assess full-page states and applicability for predictable. |
| 3.2.2 | On Input | A | NOT VERIFIED | Assess full-page states and applicability for predictable. |
| 3.2.3 | Consistent Navigation | AA | NOT VERIFIED | Assess full-page states and applicability for predictable. |
| 3.2.4 | Consistent Identification | AA | NOT VERIFIED | Assess full-page states and applicability for predictable. |
| 3.2.6 | Consistent Help | A | NOT VERIFIED | Assess full-page states and applicability for predictable. |
| 3.3.1 | Error Identification | A | NOT VERIFIED | Assess full-page states and applicability for input assistance. |
| 3.3.2 | Labels or Instructions | A | AUTOMATED SUPPORT — UNVERIFIED | Forms have static labels; full field-by-field audit still required. |
| 3.3.3 | Error Suggestion | AA | NOT VERIFIED | Assess full-page states and applicability for input assistance. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for input assistance. |
| 3.3.7 | Redundant Entry | A | CONDITIONAL — UNVERIFIED | Assess full-page states and applicability for input assistance. |
| 3.3.8 | Accessible Authentication (Minimum) | AA | AUTOMATED SUPPORT — UNVERIFIED | External login/signup linked from marketing; applicability boundary and password flows must be defined. |
| 4.1.2 | Name, Role, Value | A | AUTOMATED SUPPORT — UNVERIFIED | Axe discovery and Playwright named-control checks; full AT verification missing. |
| 4.1.3 | Status Messages | AA | AUTOMATED SUPPORT — UNVERIFIED | Some status roles in source; dynamic announcements unverified. |

## Actual page and media inventory

- 26 routes are listed in `tests/accessibility/axe-baseline.spec.ts`; this is **automated initial-state coverage**, not a complete site/process inventory.
- 17 representative pages × 2 responsive widths (320px / 640px) were measured in `tests/accessibility/reflow-discovery.spec.ts`; **actual 200%/400% browser zoom and text spacing need manual results**.
- Tutorials in `src/pages/TutorialsPage.tsx`: four YouTube embeds: `Vqp9kEvjPwg` (visit scheduling), `jJHYBeMx54A` (medication library), `c3HPYNEt8DM` (PRN medication/MAR), `Gt4dtcCTSN4` (medication schedule). **Captions, transcript correctness, meaningful visual demonstrations, audio description and keyboard operation are not yet evidenced**. YouTube embed configuration alone is not proof of caption availability.
- The Platform page has three autoplay, looping, muted MP4 demonstrations: `demo-care-planning.mp4`, `demo-shift-management.mp4`, `demo-audit-dashboard.mp4`; their content significance and pause/stop requirements need human classification. `muted` is not proof of a media exemption.
- GitHub source tree includes `public/legal/cookies.pdf`, `acceptable-use.pdf` and `service-level.pdf`, alongside accessible HTML candidates. **Tagged-PDF structure, selectable text, document language, headings, reading order, link names and production download responses remain unverified**. The externally crawled `/legal` link did not establish a PDF file response; do not assert broken or working until HTTP/browser PDF validation.
- Login/signup links and any external account creation flow may constitute **a complete process**. Confirm the boundary and which third-party steps are relied upon before issuing a statement.

## Manual test record template (one row per criterion × route × state)

| Date/time (UTC) | Page and state | SC | OS / browser / screen reader / zoom | Procedure | Expected | Observed | Result (Pass / Fail / N/A with reason / Not tested) | Screenshot/video/report link | Tester | Reviewer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-10-28 | Website, unspecified routes | multiple | Not supplied | Owner self-reported general checks | All applicable cases meet criterion | Owner: “all the checks passed” | **Not verified** | [issue #10](https://github.com/sharififu/DomClear-Website/issues/10) | Site owner | Pending |

## Priority evidence and release gates

1. **Media:** for each of four YouTube tutorials, record actual caption toggle availability, captions synchronisation/accuracy, transcript and whether visually shown actions are verbally described; record exceptions and remediate where required. Classify the three muted decorative loops and provide pause/stop/alternative where applicable.
2. **Legal PDFs:** open/download the three actual production PDF links; confirm bytes/content-type, tags, reading order, title/language, selectable text and keyboard/screen-reader operation, or make an independently verified conforming HTML alternative available and document reliance.
3. **Assistive technology:** record NVDA (Windows/Chrome or Firefox) and VoiceOver (Safari) routes, device/versions, keyboard menu/skip/form/error/route focus and mobile behaviour. Owner's generic result is not a substitute for a test log.
4. **Responsive & interaction:** document actual 200–400% browser zoom, text spacing, 24px target-size exceptions, pointer gestures, focus not obscured, hover/focus dismissibility, reduced motion and all complete form states (without submitting sensitive data to production).
5. **Conformance review:** define exact URLs and date, complete the criterion×page×state coverage table, review every PASS/N/A and any exceptions, confirm complete processes and noninterference, then approve a **scoped** conformance claim only if justified. Do not describe this as W3C certification; W3C does not certify sites.

### Latest decision

**In progress — independent full-page, manual and document evidence incomplete. Public WCAG 2.2 AA claim: NOT AUTHORISED.**
