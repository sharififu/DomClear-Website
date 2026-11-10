# DomiClear — eMAR marketing video production brief

**Status:** Planned / not produced
**Prepared:** 10 November 2026
**Owner:** DomiClear marketing and product
**Destination:** DomiClear marketing homepage eMAR feature section, /emar-software and short social clips
**Scope:** Concept and production plan only; no footage or marketing assets are approved by this document.

## Objective

Show the real medication workflow in DomiClear — not a generic montage. Visitors should understand how an agency sets up medicines, how a carer records an administration during an assigned visit, and how a manager examines the MAR afterwards. Complement the existing clip at \`public/demo-media/demo-emar-medication-management.mp4\`; do not replace it until the new cuts are reviewed.

## Creative direction

- Use a **real, current DomiClear test build** and a clearly marked **synthetic demo organisation**. No real service users, staff identities, medicine instructions, authentication secrets or production data.
- Crisp 16:9 screen captures for desktop, and separately framed 9:16 mobile exports where helpful. Use subtle zooms around the active control; don't invent app UI overlays that look functional.
- Light cursor and click highlights; readable interface typography; gentle transitions. Avoid distracting fake gestures, false statuses, fabricated response times or fictional improvement percentages.
- Optional narration, UK English captions, keyboard-accessible player controls, and a clear opening identifying it as a product demonstration.
- No claim that DomiClear prescribes, recommends dosage, independently determines clinical correctness, or ensures CQC/NHS compliance. Never demonstrate an unsafe administration process.

## Priority 1 — Medication library to personal schedule (25–35 sec)

**Audience:** Registered managers, coordinators and senior staff

| Shot | Approx. duration | Action and key message |
| --- | --- | --- |
| 1 | 3–4 sec | CMS medication library screen. “Start with your organisation's medication library.” |
| 2 | 5–7 sec | Select an existing medicine for a synthetic person. Show the distinction between a shared medication definition and a person-specific schedule. |
| 3 | 7–10 sec | Set a schedule with suitable *test-only* dose, route, times and instructions; show the saved record. Do not imply these values are suggested by DomiClear. |
| 4 | 5–7 sec | Show the patient's prescribed-versus-PRN organisation and relevant current schedule information. |
| 5 | 3–5 sec | End card: “Organised medication records, in context.” |

**Gate:** A product owner checks the live screen names and actual create/select workflow, permissions, schedule status and current medicine-library behaviour. Capture only in a synthetic environment with no real patient or prescription data.

## Priority 2 — Carer recording a visit dose / PRN (30–45 sec)

**Audience:** Carers and care-team managers

| Shot | Approx. duration | Action and key message |
| --- | --- | --- |
| 1 | 4–5 sec | Open a synthetic assigned visit on the carer app. Show the relevant medicine and schedule. |
| 2 | 7–10 sec | Show recording a regular administration: schedule context, actual outcome, performer and time, as implemented. |
| 3 | 8–12 sec | Show a separate **as-needed (PRN)** item; enter the actual dose and **required reason for giving** it. Use no clinically meaningful real-world dosage advice. |
| 4 | 6–10 sec | Show the confirmed saved MAR entry and available details. If the current flow requires signing or witness action, show it accurately after testing, otherwise omit. |
| 5 | 3–5 sec | End card: “The visit and the medication record, connected.” |

**Critical gate:** Administration recording is **online-only** in the current app; do not depict offline dose saving or background synchronization. Verify visit assignment, performer attribution, PRN reason capture and whether witness functionality is suitable for filming. Do not make administration appear successful before the server confirms it.

## Priority 3 — Manager MAR review and follow-up (25–35 sec)

**Audience:** Managers and quality leads

| Shot | Approx. duration | Action and key message |
| --- | --- | --- |
| 1 | 4–6 sec | Open the manager MAR overview on a synthetic service. |
| 2 | 6–8 sec | Filter or open records by medication/person/outcome using **controls that exist on the current screen**. |
| 3 | 7–9 sec | Review a synthetic refused or missed outcome, with performer, recorded time and any supported explanation. Avoid suggesting that a refusal is an administration error. |
| 4 | 5–7 sec | Show the available MAR export or details workflow; use a generated synthetic export only. |
| 5 | 3–5 sec | End card: “Review what was recorded. Follow up where needed.” |

**Gate:** Verify status interpretation and report totals against the underlying records. Do not label simulated MAR scores as customer success metrics. Do not imply that the product automates clinical decisions or independently signs off medicine changes.

## Future optional combined edit

After all three have been verified, cut a **50–65 second** three-chapter overview (library → visit recording → manager review) for the dedicated eMAR page. Keep the homepage video short and avoid looping three long videos at once. Offer the more detailed videos only in a deliberate “Watch the workflow” area if the experience remains fast on mobile.

## Production readiness checklist

- [ ] Confirm app version, relevant commits, demo account permissions and synthetic test fixtures.
- [ ] Review current medication library / schedule screens; verify both scheduled and PRN saving through the real database.
- [ ] Check live web and native/device flows; record limitations, especially online-only MAR and witness signing.
- [ ] Check the medicine-stop workflow and known residual medication-history/safety findings before any footage suggests complete lifecycle protection.
- [ ] Get product, clinical-safety and privacy review of the scripts, example medication content and demo record handling.
- [ ] Capture clean horizontal desktop and portrait mobile footage at usable resolution, with click focus and captions.
- [ ] Verify timing, narration, subtitles, accessibility, no identifying data and correct CTA URLs.
- [ ] Run mobile page-performance checks before replacing or adding looping homepage video assets.
- [ ] Obtain explicit publication approval and retain the reviewed storyboard and build references.

## Code and evidence references

- \`sharififu/DomiCare/app/(cms)/medications/index.tsx\` — medication library
- \`components/cms/medications/MedicationsTable.tsx\` — prescribed / PRN schedules
- \`components/visits/EnhancedMedicationItem.tsx\` and \`utils/medication/scheduledDose.ts\` — online recording, regular and PRN entry
- \`tests/prn-dose-mar.test.ts\` — tested PRN dose and reason fields
- \`app/(cms)/medications/mar/index.tsx\` — manager MAR review / export
- \`supabase/migrations/20261011171415_medication_administration_visit_scope.sql\` — assigned-visit guard
- \`supabase/migrations/20261109110726_mar_performer_guard_and_retire_prn_administrations.sql\` — performer / time checks
- \`docs/compliance/mods/MODS_MEDICATION_HISTORY_HAZARD.md\` — stop/history work and residual clinical review needs

**This brief is not evidence of clinical sign-off, complete production validation, or completed videos.**
