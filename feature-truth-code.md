# Feature Truth - Code Verification (Phase 1)

**Generated:** 2026-02-02  
**Verified Against:** HomeCareMana App Codebase  
**Marketing Website:** DomiClear (C:\Users\Sharif\OneDrive - Working Solutions\Documents\cw\project)

---

## Summary

| Category | Verified | Partial | Not Found |
|----------|----------|---------|-----------|
| Care Planning & Form Builder | 4 | 1 | 0 |
| Scheduling & Rotas | 4 | 1 | 1 |
| Carer Mobile App | 4 | 1 | 0 |
| Quality & Compliance | 4 | 1 | 1 |
| Team Management | 6 | 0 | 0 |
| Finance | 6 | 0 | 0 |
| Family Portal | 3 | 2 | 0 |
| Analytics & Reporting | 5 | 1 | 0 |
| Security & Privacy | 4 | 1 | 1 |
| **TOTAL** | **40** | **8** | **3** |

---

## CARE PLANNING & FORM BUILDER

### Marketing Claims (from content.ts)
- Visual drag-and-drop form builder
- Pre-built care plan templates
- Conditional logic and field rules
- Field-level validations
- Version history and audit trails
- Custom workflows per service type

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| Visual drag-and-drop builder | ✅ VERIFIED | `components/builder/TemplateBuilder/index.tsx`, uses @dnd-kit/core |
| Pre-built templates | ✅ VERIFIED | `contexts/CarePlanContext.tsx`, `care_plan_templates` table |
| Conditional logic | ✅ VERIFIED | `components/cms/FormRenderer.tsx` (lines 374-430), `form_conditional_rules` table |
| Field validations | ✅ VERIFIED | `components/cms/FormRenderer.tsx` (lines 279-372), `validateRule()` supports multiple types |
| Version history | ⚠️ PARTIAL | Basic `version` integer field only - no full history/audit trail |
| Custom workflows | ✅ VERIFIED | Template types: 'standard', 'specialized', 'custom' |

### Issues to Address
- **Version history**: Marketing claims "version history" but only a version number exists. No change tracking, rollback, or diff capability.

---

## SCHEDULING & ROTAS

### Marketing Claims
- Visual rota planning calendar
- Real-time conflict alerts
- Shift swap requests and approvals
- Automatic travel time calculations
- GPS visit confirmation
- Instant sync to carer app

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| Visual rota calendar | ✅ VERIFIED | `components/cms/RotaTimeline.tsx`, `ShiftManagementCalendar.tsx` |
| Conflict detection | ✅ VERIFIED | `components/cms/ConflictManagement.tsx`, `travelTimeConflictService.ts` |
| Shift swap requests | ❌ NOT_FOUND | Only absence requests exist - no shift exchange feature |
| Travel time calculations | ✅ VERIFIED | `services/googleDistanceService.ts`, Google Distance Matrix API |
| GPS visit confirmation | ✅ VERIFIED | `components/visits/EnhancedAttendanceTracker.tsx`, location validation |
| Instant sync to app | ⚠️ PARTIAL | Notifications sync real-time; visit/shift data requires manual refresh |

### Issues to Address
- **Shift swap requests**: Marketing claims this feature but it does NOT exist. MUST REMOVE from website.
- **Instant sync**: Should clarify "notifications sync instantly" not all data.

---

## CARER MOBILE APP

### Marketing Claims
- Offline-first task completion
- EMAR with photo evidence
- Rich text notes and attachments
- Incident and observation capture
- GPS visit verification
- Secure team messaging

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| Offline-first | ⚠️ PARTIAL | Attendance sync has offline queue; task completion does not |
| EMAR with photos | ✅ VERIFIED | `components/visits/MedicationModal.tsx`, camera integration |
| Rich notes/attachments | ✅ VERIFIED | `RichTextEditor`, markdown support, attachment uploads |
| Incident capture | ✅ VERIFIED | `components/visits/IncidentReportForm.tsx` with photo evidence |
| GPS verification | ✅ VERIFIED | Location validation, 500m radius check |
| Secure messaging | ✅ VERIFIED | Organization-isolated messaging system |

### Issues to Address
- **Offline-first**: Should clarify "attendance and notes work offline" - task completion is not fully offline-capable.

---

## QUALITY & COMPLIANCE

### Marketing Claims
- CQC-ready domain reports
- Audit checklists with reminders
- Incident and complaints workflows
- Document version control
- Policy review cycles
- Evidence trails for inspections

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| CQC domain reports | ✅ VERIFIED | `app/(cms)/compliance-reports/index.tsx`, all 5 domains |
| Audit checklists | ⚠️ PARTIAL | Dashboard exists but no structured checklist UI or reminders |
| Incident workflows | ✅ VERIFIED | Full incident management with investigation |
| Complaints workflows | ❌ NOT_FOUND | No dedicated complaints system |
| Document version control | ✅ VERIFIED | Version tracking, `consent_document_versions` table |
| Policy review cycles | ✅ VERIFIED | `review_frequency_days`, expiry tracking |
| Evidence trails | ✅ VERIFIED | Comprehensive audit trigger system |

### Issues to Address
- **Complaints workflows**: Marketing mentions "complaints management" but no dedicated system exists. MUST REMOVE or clarify.
- **Audit checklists with reminders**: Should clarify this is an audit dashboard, not structured checklists with automated reminders.

---

## TEAM MANAGEMENT

### Marketing Claims
- Structured onboarding workflows
- Training and qualifications tracking
- Partial profile saves with status
- Availability and shift preferences
- Performance insights dashboard
- Role-based access controls

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| Onboarding workflows | ✅ VERIFIED | `QuickStaffInviteModal`, invitation workflow |
| Training tracking | ✅ VERIFIED | `staff_training`, `staff_qualifications` tables |
| Partial profile saves | ✅ VERIFIED | `ProfileCompletionWizard`, status tracking |
| Availability calendars | ✅ VERIFIED | `WeeklyAvailabilityEditor`, `check_staff_availability()` |
| Performance dashboard | ✅ VERIFIED | `StaffPerformanceAnalytics.tsx` |
| Role-based access | ✅ VERIFIED | `useRolePermissions` hook, RLS policies |

### Issues to Address
- None - all features verified.

---

## FINANCE

### Marketing Claims
- Automated timesheet generation
- Configurable billable rules
- Payroll-ready exports
- Client invoicing with breakdowns
- Payment tracking
- Financial reporting dashboard

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| Automated timesheets | ✅ VERIFIED | Database triggers generate from visits |
| Billable rules | ✅ VERIFIED | `is_billable` field, payroll settings UI |
| Payroll exports | ✅ VERIFIED | CSV, Excel, PDF export functions |
| Client invoicing | ✅ VERIFIED | Invoice system with line items |
| Payment tracking | ✅ VERIFIED | `invoice_payments` table |
| Financial dashboard | ✅ VERIFIED | `FinancialReports.tsx` component |

### Issues to Address
- None - all features verified.

---

## FAMILY PORTAL

### Marketing Claims
- Visit schedules and notifications
- Permissioned care note access
- Secure family messaging
- Care plan summaries
- Visit report downloads
- Granular access controls

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| Visit schedules | ⚠️ PARTIAL | Viewing works; family-specific notifications not implemented |
| Care note access | ✅ VERIFIED | Permission-based via `can_view_notes` |
| Secure messaging | ✅ VERIFIED | Organization-isolated messaging |
| Care plan summaries | ✅ VERIFIED | `CarePlanSummaryRail` component |
| Report downloads | ⚠️ PARTIAL | Reports viewable but no download button in family UI |
| Granular access | ✅ VERIFIED | Per-relationship permissions (4 granular flags) |

### Issues to Address
- **Notifications**: Marketing claims "notifications" for families but no family-specific notification system exists.
- **Report downloads**: Viewing works but no explicit download feature in family portal.

---

## ANALYTICS & REPORTING

### Marketing Claims
- Pre-built KPI dashboards
- Custom date range filtering
- CSV export for external analysis
- Scheduled email reports
- Visit and carer utilisation metrics
- Incident and compliance trends

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| KPI dashboards | ✅ VERIFIED | `OverviewDashboard`, `VisitAnalytics` components |
| Date range filtering | ✅ VERIFIED | Custom date range support in FilterBuilder |
| CSV export | ✅ VERIFIED | Export functions for all report types |
| Scheduled reports | ⚠️ PARTIAL | UI complete; email delivery backend incomplete |
| Utilisation metrics | ✅ VERIFIED | Visit and staff utilisation metrics |
| Compliance trends | ✅ VERIFIED | `ComplianceTrendChart` component |

### Issues to Address
- **Scheduled email reports**: UI allows scheduling but email delivery is not fully implemented.

---

## SECURITY & PRIVACY

### Marketing Claims
- UK/EU data residency
- Row-level security (RLS) segregation
- Comprehensive audit logs
- Role-based access (no carer CMS access)
- Encryption in transit and at rest
- Regular security audits

### Code Verification

| Feature | Status | Evidence Files |
|---------|--------|----------------|
| UK/EU data residency | ❌ NOT_FOUND | Configured in Supabase dashboard, not verifiable in code |
| RLS segregation | ✅ VERIFIED | Extensive `organization_id` policies across all tables |
| Audit logs | ✅ VERIFIED | `audit_logs` table, comprehensive triggers |
| Role-based access | ✅ VERIFIED | CMS explicitly restricted to admin/manager only |
| Encryption in transit | ✅ VERIFIED | HTTPS via Vercel and Supabase |
| Encryption at rest | ⚠️ PARTIAL | Relies on Supabase defaults, not explicitly configured |

### Issues to Address
- **UK/EU data residency**: Cannot verify from code. Should note this is configured at infrastructure level.

---

## MARKETING CLAIMS REQUIRING ACTION

### MUST REMOVE (Feature Does Not Exist)
1. **Shift swap requests and approvals** - Only absence requests exist
2. **Complaints management workflows** - No dedicated complaints system

### MUST SOFTEN/CLARIFY
1. **Version history** → "Version tracking" (no full history/rollback)
2. **Offline-first** → "Offline-capable for attendance and notes"
3. **Instant sync** → "Real-time notifications, periodic data sync"
4. **Audit checklists with reminders** → "Audit dashboard and tracking"
5. **Family notifications** → "Visit schedules visible in portal"
6. **Report downloads** (family) → "View reports in portal"
7. **Scheduled email reports** → "Schedule reports (email delivery coming soon)"
8. **UK/EU data residency** → Keep but note it's infrastructure-level

### STATS REQUIRING VERIFICATION (Phase 2)
The following outcome stats need live data verification:
- "42% Reduction in late/missed visits"
- "3.5 hrs Admin time saved per manager/week"
- "98% Medication adherence rate"
- "100% UK/EU data residency"

---

## PHASE 1 COMPLETE

Ready for Phase 2: Live UI Verification with Chrome DevTools MCP
