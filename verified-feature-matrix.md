# Verified Feature Matrix (Phase 3)

**Generated:** 2026-02-02  
**Source:** Code Analysis (Phase 1) + UI Verification (Phase 2)  
**Status:** AWAITING APPROVAL FOR PHASE 4

---

## Executive Summary

| Category | Fully Verified | Partial | Not Found |
|----------|---------------|---------|-----------|
| Care Planning | 4 | 1 | 0 |
| Scheduling | 4 | 1 | 1 |
| Carer App | 4 | 1 | 0 |
| Compliance | 4 | 1 | 1 |
| Team Management | 6 | 0 | 0 |
| Finance | 6 | 0 | 0 |
| Family Portal | 3 | 2 | 0 |
| Analytics | 5 | 1 | 0 |
| Security | 4 | 1 | 1 |
| **TOTAL** | **40** | **8** | **3** |

---

## MARKETING CLAIMS - FINAL DECISIONS

### ✅ KEEP AS-IS (Fully Verified)

| Claim | Evidence |
|-------|----------|
| Visual drag-and-drop form builder | @dnd-kit implementation in TemplateBuilder |
| Pre-built care plan templates | care_plan_templates table, UI confirmed |
| Conditional logic and field rules | form_conditional_rules, evaluateCondition() |
| Field-level validations | validateRule() supports multiple types |
| Visual rota planning calendar | RotaTimeline.tsx, UI navigation confirmed |
| Real-time conflict alerts | ConflictManagement, travelTimeConflictService |
| Automatic travel time calculations | Google Distance Matrix API integration |
| GPS visit confirmation | EnhancedAttendanceTracker, 500m validation |
| EMAR with photo evidence | MedicationModal, camera integration |
| Rich text notes and attachments | RichTextEditor, attachment uploads |
| Incident and observation capture | IncidentReportForm with photo evidence |
| Secure team messaging | Organization-isolated messaging |
| CQC-ready domain reports | All 5 domains verified in UI (Safe, Effective, Caring, Responsive, Well-led) |
| Document version control | Version tracking on documents confirmed |
| Policy review cycles | review_frequency_days, expiry_date fields |
| Evidence trails for inspections | Comprehensive audit trigger system |
| Structured onboarding workflows | QuickStaffInviteModal, invitation workflow |
| Training and qualifications tracking | staff_training, staff_qualifications tables, UI tabs |
| Partial profile saves with status | ProfileCompletionWizard with status tracking |
| Availability and shift preferences | WeeklyAvailabilityEditor, check_staff_availability() |
| Performance insights dashboard | StaffPerformanceAnalytics component |
| Role-based access controls | CMS restricted to admin/manager (confirmed in _layout.tsx) |
| Automated timesheet generation | Database triggers, attendance integration |
| Configurable billable rules | is_billable field, payroll settings UI |
| Payroll-ready exports | CSV, Excel, PDF exports (UI confirmed) |
| Client invoicing with breakdowns | Invoice system with line items |
| Payment tracking | invoice_payments table |
| Financial reporting dashboard | FinancialReports component |
| Permissioned care note access | can_view_notes permission system |
| Care plan summaries | CarePlanSummaryRail component |
| Granular access controls | Per-relationship permissions (4 flags) |
| Pre-built KPI dashboards | OverviewDashboard, VisitAnalytics (UI confirmed) |
| Custom date range filtering | FilterBuilder with custom date support |
| CSV export for external analysis | Export functions for all reports |
| Visit and carer utilisation metrics | useVisitAnalytics(), useStaffMetrics() |
| Incident and compliance trends | ComplianceTrendChart (UI confirmed) |
| Row-level security segregation | Extensive organization_id RLS policies |
| Comprehensive audit logs | audit_logs table, comprehensive triggers |
| Encryption in transit | HTTPS via Vercel and Supabase |

---

### ⚠️ MODIFY WORDING (Partial Implementation)

| Current Claim | Issue | Recommended Wording |
|---------------|-------|---------------------|
| "Version history and audit trails" | Only version number exists, no full history | "Version tracking with audit trails" |
| "Offline-first task completion" | Attendance sync works, task completion does not | "Offline-capable attendance and notes" |
| "Audit checklists with reminders" | Dashboard exists, no structured checklists | "Audit dashboard and tracking" |
| "Visit schedules and notifications" | Viewing works, no push notifications | "Visit schedules visible in portal" |
| "Visit report downloads" | Reports viewable, no download button in family UI | "View visit reports in portal" |
| "Scheduled email reports" | UI complete, email delivery incomplete | "Schedule reports (email delivery coming soon)" OR remove |
| "Instant sync to carer app" | Notifications sync, data requires refresh | "Real-time notifications with periodic data sync" |
| "Encryption at rest" | Relies on Supabase defaults | "Encryption at rest via cloud infrastructure" |

---

### ❌ REMOVE (Not Implemented)

| Claim | Reason | Action |
|-------|--------|--------|
| "Shift swap requests and approvals" | Feature does not exist. Only absence requests are implemented. | **MUST REMOVE** |
| "Complaints management workflows" | No dedicated complaints system exists. | **MUST REMOVE** or add caveat "incident reporting includes complaint logging" |
| "UK/EU data residency" | Cannot verify from code - this is Supabase project configuration | KEEP but note it's infrastructure-level (verifiable in Supabase dashboard) |

---

## STATS REQUIRING VERIFICATION

The marketing website includes outcome statistics that need validation:

| Stat | Marketing Claim | Verification Status |
|------|-----------------|---------------------|
| "42% Reduction in late/missed visits" | Unverified | Needs customer data or case study |
| "3.5 hrs Admin time saved per manager/week" | Unverified | Needs customer data or case study |
| "98% Medication adherence rate" | Unverified | Could pull from demo data if real |
| "100% UK/EU data residency" | Infrastructure-level | Verifiable in Supabase dashboard |

**Recommendation:** Replace with verifiable stats from demo data OR remove/soften to "customers report..." or "designed to help reduce..."

---

## SCREENSHOTS REQUIRING VERIFICATION

Marketing website uses these demo images in `/public/demo-media/`:

| Image | Current Use | Verification |
|-------|-------------|--------------|
| demo-dashboard-overview.png | Dashboard feature | Check against live UI |
| demo-patient-management.png | Patient feature | Check against live UI |
| demo-patient-profile-care-planning.png | Care planning | Check against live UI |
| demo-schedule-rota-planning.png | Scheduling | Check against live UI |
| demo-emar-medication-management.png | EMAR | Check against live UI |
| demo-cqc-compliance-reports.png | Compliance | Check against live UI |
| demo-payroll-financial-management.png | Payroll | Check against live UI |
| demo-visit-creation-form.png | Visits | Check against live UI |

**Action:** Take fresh screenshots from live app if these are outdated placeholders.

---

## TESTIMONIALS

The marketing website includes testimonials in `content.ts`:

| Name | Organisation | Claim |
|------|--------------|-------|
| Sarah Mitchell | BrightCare Services | "transformed our rostering chaos into clarity" |
| James O'Connor | CompassCare Ltd | "CQC-ready reports at our fingertips" |
| Eleanor Davies | Heritage Home Support | "form builder alone was worth it" |

**Note:** These appear to be placeholder testimonials. If real, keep. If fictional, either:
1. Replace with real customer quotes
2. Remove testimonial section
3. Mark clearly as representative examples

---

## PHASE 3 COMPLETE

### Required Approvals Before Phase 4:

1. **Confirm removal of:**
   - Shift swap requests claim
   - Complaints management claim (or agree to soften)

2. **Confirm wording changes for:**
   - Version history → Version tracking
   - Offline-first → Offline-capable
   - Audit checklists → Audit dashboard
   - Family notifications → Visit schedules visible
   - Scheduled reports → Coming soon caveat

3. **Confirm approach for stats:**
   - Keep with "customers report" softening?
   - Replace with actual demo data?
   - Remove entirely?

4. **Confirm screenshot approach:**
   - Take fresh screenshots?
   - Keep existing if accurate?

---

## STOP - AWAITING APPROVAL

Per the plan: "STOP AND ASK FOR APPROVAL" before proceeding to Phase 4 (Website Correction).

Please confirm the above decisions before I make any edits to the marketing website.
