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
  dashboard: [
    baseStep({
      target: target('dashboard-header'),
      title: 'Welcome to your command centre',
      content: 'This dashboard gives you a real-time snapshot of carers, visits and alerts across your agency.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('dashboard-metrics'),
      title: 'Key metrics',
      content: 'Staff on duty, active visits and completion status update live so you can act quickly.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('dashboard-staff'),
      title: 'Staff activity feed',
      content: 'Drill into who is currently working, their rota slots and check-in times.',
      placement: 'left',
    }),
    baseStep({
      target: target('dashboard-map'),
      title: 'Live map tracking',
      content: 'Plot every scheduled visit on the map and click markers for detailed shift context.',
      placement: 'top',
    }),
  ],
  scheduling: [
    baseStep({
      target: target('scheduling-header'),
      title: 'Daily roster overview',
      content: 'Control views (daily, weekly, teams) and keep the rota aligned with staffing levels.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('scheduling-filters'),
      title: 'Smart filters',
      content: 'Filter by teams, availability or shift type to focus on the staff who matter right now.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('scheduling-staff'),
      title: 'Staff list',
      content: 'Every carer has an avatar with quick-glance status and upcoming visits.',
      placement: 'right',
    }),
    baseStep({
      target: target('scheduling-timeline'),
      title: 'Drag-and-drop timeline',
      content: 'Allocate visits, resolve clashes and see every 15-minute block for the whole team.',
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
      title: 'Visit calendar',
      content: 'Visualise scheduled visits per day and drill into staffing requirements.',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-medications-sidebar'),
      title: 'Daily visit summary',
      content: 'See who is due today, timings and add more visits with one click.',
      placement: 'top',
    }),
    baseStep({
      target: target('patient-medications-table'),
      title: 'Medication catalogue',
      content: 'Inventory prescribed meds, frequency, route and indications with advanced filters.',
      placement: 'top',
    }),
  ],
  compliance: [
    baseStep({
      target: target('compliance-tabs'),
      title: 'Compliance modes',
      content: 'Switch between overview dashboards, detailed audits and incident tracking.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('compliance-metrics'),
      title: 'Key risk indicators',
      content: 'Overall score, incidents and audit cadence surface issues before inspections.',
      placement: 'bottom',
    }),
    baseStep({
      target: target('compliance-domains'),
      title: 'CQC domain performance',
      content: 'Monitor each domain (Safe, Caring, etc.) with trend-aware visualisations.',
      placement: 'top',
    }),
    baseStep({
      target: target('compliance-table'),
      title: 'Audit workbench',
      content: 'Drill into every audit, track scores and download remediation reports.',
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

export const tourSteps = baseSteps;

export const getTourSteps = (demoId: DemoId): Step[] => tourSteps[demoId] ?? [];

