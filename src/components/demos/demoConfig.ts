import type { DemoId } from './types';

/** Demo IDs that show the placeholder (no real demo content). */
export const BLANK_DEMO_IDS: DemoId[] = [
  'service-users',
  'custom-tasks',
  'monitoring-alerts',
  'alert-rules',
  'absence-requests',
  'family-portal',
  'staff',
  'teams',
  'shift-management',
  'attendance',
  'compliance-reports',
  'incidents',
  'training',
  'visit-cost-types',
  'documents',
  'policies',
  'reports',
  'ppe-stock',
];

/** All demo IDs (for hash routing). */
export const ALL_DEMO_IDS: DemoId[] = [
  'dashboard',
  'scheduling',
  'care-planning',
  'care-plan',
  'care-plan-demo',
  'finance',
  'payroll',
  'compliance',
  'emar',
  'patient-medications',
  'template-builder',
  'form-templates',
  'templates-page',
  ...BLANK_DEMO_IDS,
];

/** Demos with content: id + label for quick navigation. */
export const QUICK_NAV_DEMOS: { id: DemoId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'scheduling', label: 'Visits' },
  { id: 'care-planning', label: 'Care planning' },
  { id: 'finance', label: 'Finance' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'emar', label: 'eMAR' },
  { id: 'patient-medications', label: 'Medications' },
  { id: 'template-builder', label: 'Template builder' },
  { id: 'form-templates', label: 'Form templates' },
  { id: 'templates-page', label: 'Templates' },
];

export function isDemoEmpty(id: DemoId): boolean {
  return BLANK_DEMO_IDS.includes(id);
}
