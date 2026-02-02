# QA Checklist - Marketing Website Accuracy

**Date:** 2026-02-02  
**Reviewer:** [Name]  
**Status:** Ready for Review

---

## Pre-Launch Checklist

### Content Verification

- [ ] **Homepage Hero** - Claims match app capabilities
- [ ] **Feature Highlights** - All 8 cards verified accurate
- [ ] **Outcome Stats** - Asterisks and "up to" qualifiers present
- [ ] **Testimonials** - Marked as examples OR replaced with real quotes

### Platform Page Verification

- [ ] **Care Planning** - No "full version history" claim
- [ ] **Scheduling** - No "shift swap" mentions
- [ ] **Carer App** - Says "offline-capable" not "offline-first"
- [ ] **Compliance** - No "complaints" mention, "audit dashboard" not "checklists"
- [ ] **Team Management** - All claims verified
- [ ] **Finance** - All claims verified
- [ ] **Family Portal** - No "notifications" or "download" claims
- [ ] **Analytics** - "Report scheduling" not "scheduled email reports"
- [ ] **Security** - "UK/EU cloud infrastructure" wording

### Solutions Page Verification

- [ ] **For Care Managers** - Claims accurate
- [ ] **For Agency Owners** - Claims accurate
- [ ] **For Families** - No notification/download claims

### Pricing Page Verification

- [ ] **Starter Tier** - Features accurate
- [ ] **Professional Tier** - "Audit dashboard" not "checklists"
- [ ] **Enterprise Tier** - Features accurate

### FAQ Verification

- [ ] Offline question - Says "offline capability" not "offline-first"
- [ ] CQC compliance question - Accurate
- [ ] Data storage question - Accurate
- [ ] Carer CMS access question - Accurate (verified in code)

---

## Screenshot Verification

Compare each marketing screenshot against live app:

| Screenshot | Page/Section | Matches App? | Notes |
|------------|--------------|--------------|-------|
| demo-dashboard-overview.png | Dashboard | [ ] | |
| demo-patient-management.png | Service Users | [ ] | |
| demo-patient-profile-care-planning.png | Care Plan | [ ] | |
| demo-schedule-rota-planning.png | Shift Management | [ ] | |
| demo-emar-medication-management.png | Medications | [ ] | |
| demo-cqc-compliance-reports.png | Compliance Reports | [ ] | |
| demo-payroll-financial-management.png | Payroll | [ ] | |
| demo-visit-creation-form.png | Visit Form | [ ] | |

---

## Feature-by-Feature Verification

### Care Planning & Form Builder
- [ ] Drag-and-drop builder exists at /form-templates
- [ ] Templates can be created and edited
- [ ] Conditional logic works in form renderer
- [ ] Field validations work
- [ ] Version number displays on templates

### Scheduling & Rotas
- [ ] Rota calendar visible at /shift-management
- [ ] Conflict detection alerts work
- [ ] Travel time shown between visits
- [ ] GPS coordinates captured on visit
- [ ] Absence requests system works

### Carer Mobile App (requires mobile/responsive testing)
- [ ] Attendance can be tracked
- [ ] EMAR logging with photos works
- [ ] Notes can be added with attachments
- [ ] Incidents can be reported
- [ ] GPS captured on clock-in/out
- [ ] Messaging works

### Quality & Compliance
- [ ] CQC report shows all 5 domains at /compliance-reports
- [ ] Audit dashboard accessible
- [ ] Incident reporting works
- [ ] Document version control works
- [ ] Policy review cycles tracked

### Team Management
- [ ] Staff list at /staff
- [ ] Onboarding/invitation flow works
- [ ] Training tracking visible
- [ ] Profile completion status shows
- [ ] Availability editing works
- [ ] Performance metrics visible

### Finance
- [ ] Payroll page shows hours breakdown
- [ ] Export buttons work (CSV, Excel, PDF)
- [ ] Invoices page accessible
- [ ] Payment tracking visible

### Family Portal
- [ ] Visit schedules visible to family users
- [ ] Care notes accessible (with permissions)
- [ ] Messaging works
- [ ] Care plan summaries visible
- [ ] Visit reports viewable (not downloadable)

### Analytics & Reporting
- [ ] Reports page loads with dashboards
- [ ] Date filtering works
- [ ] CSV export works
- [ ] Report scheduling UI accessible

### Security
- [ ] Non-admin users cannot access CMS
- [ ] Data properly segregated between orgs
- [ ] Audit logs capture actions

---

## Removed Claims Verification

Ensure these claims are NOT present anywhere on the site:

- [ ] "Shift swap requests" - MUST NOT APPEAR
- [ ] "Complaints management" - MUST NOT APPEAR
- [ ] "Download visit reports" (for families) - MUST NOT APPEAR
- [ ] "Notifications when carers check in" (for families) - MUST NOT APPEAR
- [ ] "Scheduled email reports" - MUST NOT APPEAR
- [ ] "Audit checklists with reminders" - MUST NOT APPEAR
- [ ] "Offline-first" (exact phrase) - Should be "offline-capable"

---

## Legal/Compliance Checks

- [ ] Stats disclaimer present (asterisks explained)
- [ ] "Results may vary" type disclaimer for outcome stats
- [ ] Testimonials either real OR marked as examples
- [ ] UK GDPR compliance statement accurate
- [ ] Data residency claims accurate (UK/EU infrastructure)

---

## Cross-Browser/Device Testing

- [ ] Desktop Chrome - all pages load correctly
- [ ] Desktop Firefox - all pages load correctly
- [ ] Desktop Safari - all pages load correctly
- [ ] Mobile responsive - all pages render properly
- [ ] Links work correctly
- [ ] Navigation functions properly

---

## Final Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Reviewer | | | |
| Content Owner | | | |
| Product Owner | | | |

---

## Notes

_Add any issues or observations here:_

---

**QA Checklist Version:** 1.0  
**Generated by:** Marketing Website Audit Process
