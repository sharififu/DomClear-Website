import { Visit, Staff, Client, FormTemplate, TimesheetEntry, AuditChecklist, IncidentReport } from './types';

export const STAFF_MEMBERS: Staff[] = [
  { id: 's1', name: 'Sarah J.', role: 'Senior Carer', avatar: 'SJ', color: '#1a86f0' },
  { id: 's2', name: 'Mike T.', role: 'Carer', avatar: 'MT', color: '#10b981' },
  { id: 's3', name: 'Emma W.', role: 'Carer', avatar: 'EW', color: '#f59e0b' },
  { id: 's4', name: 'James L.', role: 'Carer', avatar: 'JL', color: '#8b5cf6' },
];

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Mrs. Thompson', address: '12 Oak Lane', needs: ['Mobility', 'Medication'] },
  { id: 'c2', name: 'Mr. Williams', address: '5 Maple Drive', needs: ['Personal Care'] },
  { id: 'c3', name: 'Ms. Davis', address: '8 Pine Court', needs: ['Companionship'] },
];

export const INITIAL_VISITS: Visit[] = [
  { id: 'v1', clientId: 'c1', carerId: 's1', date: '2023-10-23', startTime: '09:00', duration: 60, type: 'personal-care', status: 'scheduled' },
  { id: 'v2', clientId: 'c2', carerId: 's2', date: '2023-10-23', startTime: '10:00', duration: 45, type: 'medication', status: 'scheduled' },
  { id: 'v3', clientId: 'c1', carerId: 's1', date: '2023-10-23', startTime: '13:00', duration: 30, type: 'medication', status: 'scheduled' },
  { id: 'v4', clientId: 'c3', carerId: 's3', date: '2023-10-23', startTime: '14:00', duration: 120, type: 'companionship', status: 'scheduled' },
];

export const FORM_TEMPLATES: FormTemplate[] = [
  {
    id: 't1',
    name: 'Initial Assessment',
    category: 'Admission',
    fields: [
      { id: 'f1', type: 'text', label: 'Client Full Name', required: true, placeholder: 'Enter full name' },
      { id: 'f2', type: 'date', label: 'Date of Assessment', required: true },
      { id: 'f3', type: 'select', label: 'Mobility Level', required: true, options: ['Independent', 'Needs Assistance', 'Wheelchair Bound', 'Bedbound'] },
      { id: 'f4', type: 'textarea', label: 'Medical History Summary', required: false, placeholder: 'Brief summary of relevant conditions' },
    ]
  },
  {
    id: 't2',
    name: 'Medication Risk Assessment',
    category: 'Risk',
    fields: [
      { id: 'm1', type: 'radio', label: 'Can client self-administer?', required: true, options: ['Yes', 'No', 'With Assistance'] },
      { id: 'm2', type: 'checkbox', label: 'High Risk Medications', required: false, options: ['Warfarin', 'Insulin', 'Controlled Drugs'] },
    ]
  }
];

export const TIMESHEET_ENTRIES: TimesheetEntry[] = [
  { id: 'ts1', staffId: 's1', date: '2023-10-23', hours: 7.5, rate: 12.50, status: 'approved' },
  { id: 'ts2', staffId: 's2', date: '2023-10-23', hours: 6.0, rate: 11.50, status: 'pending' },
  { id: 'ts3', staffId: 's3', date: '2023-10-23', hours: 8.0, rate: 11.50, status: 'approved' },
];

export const COMPLIANCE_AUDITS: AuditChecklist[] = [
  { id: 'a1', title: 'Medication Records Audit', category: 'medication', status: 'compliant', lastChecked: '2023-10-20', score: 98 },
  { id: 'a2', title: 'Staff Training Matrix', category: 'training', status: 'non-compliant', lastChecked: '2023-10-18', score: 85 },
  { id: 'a3', title: 'Health & Safety Inspection', category: 'safety', status: 'compliant', lastChecked: '2023-10-15', score: 100 },
];

export const INCIDENT_REPORTS: IncidentReport[] = [
  { id: 'ir1', date: '2023-10-21', type: 'Missed Visit', severity: 'medium', status: 'investigating', description: 'Carer unable to gain access to property.' },
  { id: 'ir2', date: '2023-10-15', type: 'Medication Error', severity: 'high', status: 'resolved', description: 'Missed signature on MAR chart.' },
];

