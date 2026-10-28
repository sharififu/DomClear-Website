# Integrated DomiClear website WCAG remediation validation

**28 October 2026. Integration candidate only. No production merge or AA conformance claim.**

Source heads (snapshotted, unchanged):
- Contrast and 26-route baseline: draft PR #6 at `1cb80118a5a20f2b5b8222a715b31102ece87917`.
- TypeScript CI and demo typing: draft PR #7 at `f15b43cbb4fae3165a761e877958439704bef6a6`.
- Keyboard route focus, browser history and skip links: draft PR #8 at `8e7526489d473a0f5400eb08167ac09647723f08`.

All source paths are disjoint in Git; this tree combines their exact blob SHAs on `main` (`8cea66f38b10cfa221e96467fe1c100b65fa9abe`) with no algorithmic or hand-merged code changes.

**Required integrated evidence:** npm ci, Vite build, strict TypeScript, complete Chromium Playwright regression including all new route and contrast tests, and 26-route axe initial-state discovery. Test interaction-dependent cases, including staff-dropdown zero-index selection, with an additional dedicated test if accessible through the app.

**Outstanding manual accessibility assessment:** keyboard-only end-to-end flows, NVDA/VoiceOver, accessible-name checks, 200–400% reflow and viewport zoom, focus appearance/obscuration, media captions/transcripts, legal PDF reading order and validation, plus full WCAG 2.2 AA criteria matrix. A zero-violation automated snapshot is not a WCAG AA conformance determination.

**Release restriction:** review and integrate source PRs individually only after this integrated result is green and any behaviour concerns are assessed. This integration branch is a draft PR, not approved for deployment. No change was made to live Supabase or the clinical app.