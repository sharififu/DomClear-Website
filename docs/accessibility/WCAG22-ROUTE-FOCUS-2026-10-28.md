# DomiClear marketing website — SPA route-focus and keyboard checks

**28 October 2026 — draft PR. No merge, production deployment or WCAG conformance claim.**

## Finding and remedy

src/App.tsx intercepts same-origin anchors and changes pages without moving focus to newly rendered main content. This leaves keyboard and screen-reader users on the previous navigation item even after the page title changes.

- After client-side pathname changes or back/forward history, programmatically focus the newly rendered main landmark, or the selected fragment when available.
- Make the main landmark focusable by script only, with visible focus styling.
- For same-page hash/skip links, focus the destination as well as scrolling.
- Preserve ordinary browser conventions for modified clicks, downloads, different tabs and non-left mouse buttons.
- Clean up document click handlers and the history wrapper on route effect changes, avoiding accumulating stale listeners.
- Leave page SEO metadata, canonical URL logic, route destinations and visual content unchanged.

## Required verification

Playwright tests cover keyboard activation of Pricing, back/forward and document title, skip-link focus, platform-section focus, and an external new-tab trial CTA. Existing browser regression and axe discovery checks must still pass.

This is a browser-only subset of WCAG 2.2 AA work. Screen-reader focus announcements, deep-link/history edge cases, focus not obscured, reflow, videos and PDFs need separate checks. This branch is independent of draft PRs #6 and #7, so main-branch TypeScript CI errors may still appear on it.
## Measured browser results — 28 October 2026

[GitHub Actions run 40704810875](https://github.com/sharififu/DomClear-Website/actions/runs/40704810875), code commit `9e3f503669e7ec90da9de2fac9a2198bb8696243`:

- **49/49 Playwright Chromium tests passed**: all prior 45 regression/browser tests plus the four new route-focus/history/skip-link/external-popup tests.
- **Vite build passed.** The SPA navigation, back/forward, same-page hash focusing and original CTA new-tab semantics passed the new browser checks.
- **Overall workflow failed** because this branch is independently based on `main`, where the pre-existing TypeScript errors remain. They have been corrected and typecheck passed on *separate draft PR #7*, but those changes are not yet integrated on `main`.
- Automated initial-state checks do not establish WCAG 2.2 AA. Actual screen-reader announcements, viewport/zoom, focus obscuration, media and PDF accessibility remain unassessed.
