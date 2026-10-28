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