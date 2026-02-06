import React from 'react';
import { DemoHeader } from './DemoHeader';
import { FileText } from 'lucide-react';
import { DemoId } from './types';

const BLANK_TITLES: Record<string, string> = {
  'service-users': 'Service users',
  'visits': 'Visits',
  'medications': 'Medications',
  'custom-tasks': 'Custom Tasks',
  'monitoring-alerts': 'Monitoring Alerts',
  'alert-rules': 'Alert Rules',
  'absence-requests': 'Absence Requests',
  'family-portal': 'Family Portal',
  'staff': 'Staff',
  'teams': 'Teams',
  'shift-management': 'Shift Management',
  'attendance': 'Attendance',
  'audit-dashboard': 'Audit Dashboard',
  'compliance-reports': 'Compliance Reports',
  'incidents': 'Incidents',
  'training': 'Training',
  'visit-cost-types': 'Visit Cost Types',
  'documents': 'Documents',
  'policies': 'Policies',
  'reports': 'Reports',
  'ppe-stock': 'PPE Stock',
};

export const BlankDemo: React.FC<{ demoId: DemoId; onReset: () => void }> = ({ demoId, onReset }) => {
  const title = BLANK_TITLES[demoId] ?? 'Section';
  return (
    <div className="flex flex-col h-full w-full bg-[#F4F6F8] overflow-hidden">
      <DemoHeader title={title} subtitle="" onReset={onReset} />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">{title}</h3>
          <p className="text-sm text-slate-500">
            This section is not shown in the demo. In the full app you would manage {title.toLowerCase()} here.
          </p>
        </div>
      </div>
    </div>
  );
};
