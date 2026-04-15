import { Step } from 'react-joyride';
import { DemoId } from './types';

const target = (id: string) => `[data-tour="${id}"]`;

type StepMap = Partial<Record<DemoId, Step[]>>;

const baseStep = (overrides: Step): Step => ({
  disableBeacon: true,
  spotlightClicks: true,
  ...overrides,
});

const baseSteps: StepMap = {
  scheduling: [
    baseStep({
      target: target('scheduling-header'),
      title: 'Shift Management shell',
      content:
        'This preview mirrors the DomiClear CMS header and search. Use the tour on the toolbar below for roster controls — data here is sample only.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('scheduling-toolbar'),
      title: 'Roster controls',
      content:
        'Daily and weekly views, Teams and Regional grouping, conflicts, absence, refresh, Build Shift and New Visit — same layout as the live app (preview actions explain when you click).',
      placement: 'bottom',
    }),
    baseStep({
      target: target('scheduling-filters'),
      title: 'Focus and regions',
      content: 'Narrow the roster (e.g. unallocated only) or show the regional chip bar when Regional is on — matches how filters sit above the timeline in the app.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('scheduling-staff'),
      title: 'Staff rail',
      content:
        'Unallocated row, optional team headers, and carer rows with initials — same 140px rail width and row height as the live daily roster.',
      placement: 'right',
    }),
    baseStep({
      target: target('scheduling-timeline'),
      title: 'Timeline & gestures',
      content:
        'On Daily view: double-click an empty lane to add a 1-hour visit, hold Shift and drag to draw a ranged visit (15-minute snap), drag blocks to move, drag the edges to resize, then use Undo for the last change. All edits are local preview only — nothing saves to your account.',
      placement: 'top',
    }),
  ],
  'template-builder': [
    baseStep({
      target: target('template-builder-toolbar'),
      title: 'Template actions',
      content: 'Undo/redo, duplicate and preview the final form without leaving the builder.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('template-builder-toolbox'),
      title: 'Field toolbox',
      content: 'Drag professional-grade inputs, repeaters and layout rows into your assessment.',
      placement: 'right',
    }),
    baseStep({
      target: target('template-builder-canvas'),
      title: 'Canvas & sections',
      content: 'Edit headings inline, add multi-column rows and keep everything compliant.',
      placement: 'top',
    }),
    baseStep({
      target: target('template-builder-properties'),
      title: 'Dynamic properties',
      content: 'Configure placeholders, validation rules, options and metadata for each field.',
      placement: 'bottom',
    }),
  ],
  'care-plan': [
    baseStep({
      target: target('care-plan-header'),
      title: 'Patient context',
      content: 'See the current version, last update and quickly change the plan status.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('care-plan-sidebar'),
      title: 'Structured sections',
      content: 'Navigate scheduling rules, outcomes, risks and more without losing your place.',
      placement: 'right',
    }),
    baseStep({
      target: target('care-plan-content'),
      title: 'Rich care content',
      content: 'Each section surfaces actionable details, including frequencies and special notes.',
      placement: 'left',
    }),
  ],
  'patient-medications': [
    baseStep({
      target: target('patient-medications-header'),
      title: 'Patient overview',
      content: 'Keep patient context front-and-centre while planning visits and MAR updates.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('patient-medications-calendar'),
      title: 'Patient profile & tabs',
      content: 'Switch between Medications and MAR Chart — the tour jumps to each area automatically.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('patient-medications-sidebar'),
      title: 'MAR quick view',
      content: 'A compact MAR snapshot beside the medication list (demo counts; open MAR Chart for the full eMAR).',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-medications-table'),
      title: 'Medication catalogue',
      content: 'Inventory prescribed meds, frequency, route and indications with advanced filters.',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-mar-panel'),
      title: 'eMAR workspace',
      content: 'Full-width MAR shell matching the CMS: export/print (preview), MAR History, and patient banner.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('patient-mar-header'),
      title: 'MAR actions',
      content: 'Export PDF and Print are preview-only here — same placement as the live patient profile.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('patient-mar-toolbar'),
      title: 'Range & filters',
      content: 'Today / Week / Month, interval navigation, jump date, medication search, and caregiver/status chips.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('patient-mar-kpi'),
      title: 'MAR KPI strip',
      content: 'Due, administered, late, missed, refused, and PRN counts derived from demo schedules and administrations.',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-mar-grid'),
      title: 'Weekly matrix',
      content: 'Medication detail column with day columns; tap a cell for status, staff line, and administration detail.',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-mar-legend'),
      title: 'Status legend',
      content: 'Symbols mirror the live MAR (given, late, missed, refused, PRN, empty slot).',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-mar-sidebar'),
      title: 'Slot detail rail',
      content: 'Select a matrix cell for slot metadata, preview actions, and link to the administration modal.',
      placement: 'left',
    }),
    baseStep({
      target: target('patient-mar-history-toggle'),
      title: 'MAR History',
      content:
        'Open MAR History for presets, search, status/medication filters, compliance summary, and preview-only export. Targets for those controls appear after you toggle — all demo data, no backend writes.',
      placement: 'left',
    }),
  ],
  compliance: [
    baseStep({
      target: target('compliance-intel-header'),
      title: 'Compliance Intelligence',
      content:
        'Navy header matches the live audit dashboard: integrity score, CQC mode, refresh, export, and reports — all preview-only here.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('compliance-filters'),
      title: 'Date range and search',
      content: 'Filter the mock audit trail by window, search logs, and category chips (Medication, Patient, Staff, Critical).',
      placement: 'bottom',
    }),
    baseStep({
      target: target('compliance-metrics'),
      title: 'Snapshot metrics',
      content: 'Quick counts for logs in view, filtered rows, and checklist score — derived from sample data only.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('compliance-alerts'),
      title: 'Critical alerts',
      content: 'High-risk exports, deletions, and off-hours access surface first — dismiss or open a detail drawer in this preview.',
      placement: 'top',
    }),
    baseStep({
      target: target('compliance-signals'),
      title: 'Clinical signals',
      content: 'Priority signals explain why patterns matter (e.g. unusual read volume). Wording mirrors the app; data is demo.',
      placement: 'top',
    }),
    baseStep({
      target: target('compliance-charts'),
      title: 'Trends and anomalies',
      content: 'Action mix and daily activity bars summarise the current filter window — static SVG-style charts, no backend.',
      placement: 'top',
    }),
    baseStep({
      target: target('compliance-domains'),
      title: 'CQC domain performance',
      content: 'Domain rings summarise mock “Good” ratings — same mental model as compliance reporting in the app.',
      placement: 'top',
    }),
    baseStep({
      target: target('compliance-audit-log'),
      title: 'Audit log',
      content: 'Sortable table or timeline, pagination, and row detail — mirrors the audit log panel; nothing persists to your org.',
      placement: 'top',
    }),
  ],
  finance: [
    baseStep({
      target: target('finance-header'),
      title: 'Invoice management',
      content: 'Monitor total invoices, amounts, pending payments and overdue invoices.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('finance-filters'),
      title: 'Invoice filters',
      content: 'Filter by status (Draft, Sent, Paid, Overdue) and search invoices quickly.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('finance-table'),
      title: 'Invoice table',
      content: 'View all invoices with patient details, amounts, due dates and status. Click to view details or create new invoices.',
      placement: 'top',
    }),
  ],
  payroll: [
    baseStep({
      target: target('payroll-header'),
      title: 'Payroll summary',
      content: 'Monitor total staff, hours and gross pay for the selected period.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('payroll-filters'),
      title: 'Payroll controls',
      content: 'Change frequency (Weekly, Bi-weekly, Monthly), filter by staff, search and export payroll packs instantly.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('payroll-table'),
      title: 'Payroll ledger',
      content: 'View detailed payroll breakdowns including regular, night, weekend, bank holiday and overtime hours with gross pay calculations.',
      placement: 'top',
    }),
  ],
  emar: [
    baseStep({
      target: target('emar-header'),
      title: 'Medication management',
      content: 'Keep totals and high-risk counts visible at all times.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('emar-tabs'),
      title: 'Medications vs risk categories',
      content: 'Toggle the view you need while preserving current filters.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('emar-filters'),
      title: 'Targeted filters & search',
      content: 'Filter by risk type, schedule requirements and search across the register.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('emar-table'),
      title: 'Medication log',
      content: 'See witness requirements, high-risk warnings and quick actions.',
      placement: 'top',
    }),
  ],
  'templates-page': [
    baseStep({
      target: target('templates-library-header'),
      title: 'Template library',
      content: 'Browse reusable forms by category to standardise assessments.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('templates-library-grid'),
      title: 'Curated templates',
      content: 'Each tile shows category, usage stats and quick launching options.',
      placement: 'top',
    }),
    baseStep({
      target: target('templates-library-actions'),
      title: 'Next steps',
      content: 'Duplicate templates, open them in the builder or export as PDFs.',
      placement: 'left',
    }),
  ],
  'form-templates': [
    baseStep({
      target: target('form-templates-header'),
      title: 'Form template workspace',
      content: 'Toggle between build and preview to see exactly what staff will complete.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('form-templates-toolbox'),
      title: 'Component palette',
      content: 'Add new fields instantly with ready-made components for healthcare workflows.',
      placement: 'right',
    }),
    baseStep({
      target: target('form-templates-canvas'),
      title: 'Interactive canvas',
      content: 'Edit copy inline and remove or reorder fields during QA reviews.',
      placement: 'top',
    }),
  ],
};

baseSteps['care-plan-demo'] = baseSteps['care-plan'];

// care-planning now uses the same CarePlanDemo as care-plan
baseSteps['care-planning'] = baseSteps['care-plan'];

baseSteps['patient-medications-mar'] = baseSteps['patient-medications'];

export const tourSteps = baseSteps;

export const getTourSteps = (demoId: DemoId): Step[] => tourSteps[demoId] ?? [];

