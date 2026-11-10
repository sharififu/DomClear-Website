# DomiClear — incident follow-up and quality oversight video brief

**Status:** Future production only — no new video recorded
**Prepared:** 10 November 2026
**Destination:** Homepage quality section and \`/platform#compliance\`

## Before commissioning
The existing website contains \`public/demo-media/demo-audit-dashboard.mp4\`. Review it first. It demonstrates an audit dashboard, not necessarily an incident report or an official CQC assessment. Don't relabel it or duplicate it without inspecting the footage.

## Proposed video — From incident to follow-up (35–50 seconds)

| Scene | Approx. duration | Demonstration |
| --- | --- | --- |
| 1. Record an incident | 6–8 s | Open the actual DomiClear incident form in a synthetic demo organisation. Enter non-identifiable fictional incident details, type and severity. |
| 2. Find follow-up work | 7–10 s | Show **relevant actions actually raised by that incident** in Follow-Up Actions; do not invent a suggestion or imply every event always creates all action types. |
| 3. Review | 7–10 s | Show manager investigation notes and action states, using the exact current interface. |
| 4. Resolve | 7–10 s | Where the workflow permits it, show manager review, completion/sign-off and the resulting evidence. Do not bypass required rules or close an incident with outstanding actions. |
| 5. Audit and internal oversight | 5–7 s | Show the audit history or an internal self-assessment view clearly labelled as indicative, **not a CQC rating**. |
| 6. Call to action | 3–5 s | "Keep incidents, actions and decisions connected." Link to \`/platform#compliance\` or \`/book-demo\`. |

## Capture and approval requirements
- Real, current, tested DomiClear UI only; no fake AI assistants, fabricated dashboard measurements or unsupported automation.
- Synthetic organisation, staff and service-user records only. No identifiable patient data, production session secrets, real incident images or real signatures.
- Show role-appropriate permissions and the actual incident-to-action rules, investigation requirements, sign-off and audit-log results; verify these on the deployed demo build before filming.
- Use clear on-screen cursor/click highlights, precise zooms, readable UK-English captions and accessible presentation.
- Confirm CQC-aligned calculations and the exact saved-report workflow; do not imply official CQC inspection ratings or a guarantee of compliance.
- Product, clinical/quality and privacy reviewers approve storyboards, demo data and recorded footage before publication.
- Check homepage performance and mobile presentation before adding any more autoplay video.

## App evidence to check at filming time
- \`sharififu/DomiCare/services/incidentService.ts\`
- \`components/cms/FollowUpActionsWorkspace.tsx\`
- \`app/(cms)/incidents.tsx\`
- \`app/(cms)/compliance-reports/index.tsx\`
- \`services/complianceScoring.ts\`
- \`docs/DomiCare – Compliance Reports QA Test Scenarios.md\`
- \`docs/DomiCare – Audit Dashboard QA Test Scenarios.md\`

**Not completed footage, clinical approval or a CQC compliance certificate.**
