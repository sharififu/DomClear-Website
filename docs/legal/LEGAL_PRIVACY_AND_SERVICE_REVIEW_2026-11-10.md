# DomiClear — legal, privacy and service-statement consistency review

**Review date:** 10 November 2026  
**Status:** Editorial consistency review; **not** legal advice, a new DPO sign-off, a security certification or a finding of UK GDPR compliance  
**Public scope:** `public/legal/privacy.html`, `terms.html`, `cookies.html`, `service-level.html`, `index.html`. Compared with DomiClear's public marketing claims and the application legal source `sharififu/DomiCare/content/legal.ts`.

## Evidence reviewed
- Approved application DPIA `sharififu/DomiCare/docs/compliance/mods/DC-DPIA-001_CARE_RECORD_PROCESSING.md` v1.1, dated 9 November 2026. Primary care records at Supabase London; private care buckets with signed URLs; app offline cache, Vercel, email and push processors; DPO and residual risks.
- `sharififu/DomiCare/docs/compliance/DC-RM-001_RECORDS_RETENTION_SCHEDULE.md` v0.3 approved 9 November 2026; **operational adoption still in progress**; customer is care-record controller, DomiClear processor; daily database backup ~7 days excluding file-storage objects.
- `sharififu/DomiCare/docs/compliance/policies/DC-POL-001_DATA_PROTECTION_POLICY.md`: records controller/processor duties and outstanding consent and supplier control work.
- `sharififu/DomiCare/app/_layout.tsx`: Google Analytics 4 / Google Ads scripts loaded on web if configured, with no consent gate found in reviewed source.
- `sharififu/DomiCare/docs/compliance/DATA_SHARING_CONSENT_REVIEW.md`: 2026 analysis of consent evidence gaps; do not infer current compliance.
- Current marketing source `src/App.tsx` uses Vercel Analytics.
- ICO guidance on cookies, privacy information and international transfers (see links below).

## Corrected in website PR
| Finding | Prior public text | Evidence-based correction |
| --- | --- | --- |
| DPO identification | No formally appointed DPO | Director acts as DPO and can be contacted via company privacy mailbox, as documented in the approved DPIA |
| Records retention | Detailed retention schedule still being formalised | Approved 9 Nov; operational adoption still in progress; provider determines care record retention and processor follows instructions; no invented eight-year processor period |
| Backups | No concrete backup scope | Database daily and approximately seven-day retention; uploaded files/photos are outside that database backup; no blanket restore guarantee |
| Private files | Anyone not signed in cannot open a file | Authenticated, permissioned request for time-limited signed URL; a bearer of a still-valid URL may be able to access it without an active sign-in |
| Analytics notice | Web app Google tags without distinction from marketing site | Distinguishes the app's configured Google Analytics/Ads tags from marketing-site Vercel Analytics; makes consent-control limitation explicit |
| Legal hub | All documents presented as governing contractual terms | Separates contractual policies from informational notices and service statement |

## Open decisions and controls — do not present as completed

1. **P0 — Non-essential tracking consent (app).** The web app loads GA4/Google Ads tags where configured; no preceding consent gate was found in `app/_layout.tsx`. Publishing a privacy notice does **not** establish a lawful consent mechanism. Engineering must gate non-essential tags by appropriate opt-in, permit refusal/withdrawal and test before and after consent. Record actual deployed tag configuration, marketing-site analytics requirements and consent/PECR assessment. Review with DPO.
2. **P1 — Cookie Policy completeness and PDFs.** Public cookie policy mentions essential and optional diagnostics but not the app's known GA4/Ads use or marketing analytics. Update HTML **and its linked downloadable PDF**, plus app legal copy, together; do not leave contradictory published versions. Confirm consent implementation first rather than implying it already works.
3. **P1 — Processor agreements and suppliers.** Terms refer to "our Data Processing terms". This review did not verify executed Article 28 agreements or customer-usable current DPA text. Confirm terms, subprocessor approvals, updated supplier record and operational instruction/return/deletion mechanisms before making additional promises.
4. **P1 — International transfer safeguards.** The Privacy Notice describes potential UK adequacy, IDTA/Addendum and supplier safeguards. The supplier-by-supplier legal mechanisms and contractual evidence were not verified in this review. DPO/IG to confirm each affected processor and onward transfer.
5. **P1 — Application legal notice synchronisation.** The application source `sharififu/DomiCare/content/legal.ts` duplicates the August Privacy Notice. Prepare a matching update under the application release process; do not describe the whole customer journey as aligned until app copy is deployed.
6. **P1 — Support administrator access.** Approved DPIA records one cross-organisation super-admin and **support reads not individually logged**; update access-control risk treatment and decide what additional information, if any, the public privacy notice must say. Do not imply comprehensive read-level audit trails.
7. **P2 — Terms and cancellation/refunds.** The August Terms say trials can end at any time, cancellations follow billing rules, refunds follow a policy at purchase, and describe a liability cap/indemnity. These are **contractual decisions**, not editorial fixes. Director and qualified UK legal reviewer should reconcile with the live checkout and signed customer terms before rewriting or republishing them. No contractual conditions were changed here.
8. **P2 — Service Availability statement.** Public statement says availability is best-efforts with **no specific uptime guarantee**. That is consistent with removing the marketing 99.9% uptime claim. It makes no promise of a response time. No SLA was added or changed.
9. **P2 — Notice dating and publication.** Public Privacy Notice is updated to 10 November 2026 with grounded factual changes. Coordinate app copy and controlled version history; do not falsely assert DPO approval of this PR or that a solicitor reviewed it.

## Legal reference (external)
- ICO cookies and technologies: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/
- ICO privacy transparency requirements: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/
- ICO international transfers: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-guide-to-international-transfers/

**Boundary:** This review proposes no changes to existing Terms' liability, payment, refund, termination clauses, or the Service Availability statement, and does not close underlying consent or processor-contract risks.
