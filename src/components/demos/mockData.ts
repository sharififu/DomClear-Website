import {
  format,
  subDays,
  setHours,
  setMinutes,
  addDays,
  eachDayOfInterval,
  startOfWeek,
  startOfDay,
  endOfDay,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import {
  Visit,
  Staff,
  Client,
  FormTemplate,
  TimesheetEntry,
  AuditChecklist,
  IncidentReport,
  DemoAuditLog,
  DemoAuditAction,
  DemoMARScheduleRow,
  DemoMARAdminRow,
} from './types';

export const STAFF_MEMBERS: Staff[] = [
  { id: 's1', name: 'Sarah J.', role: 'Senior Carer', avatar: 'SJ', color: '#4370B7' },
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

const DEMO_USERS: { id: string; name: string; role: string }[] = [
  { id: 'u1', name: 'Sarah Johnson', role: 'Registered Manager' },
  { id: 'u2', name: 'Emma Wilson', role: 'Senior Carer' },
  { id: 'u3', name: 'James Taylor', role: 'Carer' },
  { id: 'u4', name: 'Dave Smith', role: 'Carer' },
  { id: 'u5', name: 'Admin Bot', role: 'System' },
];

const DEMO_TABLES = [
  'patients',
  'medication_administrations',
  'staff_profiles',
  'visits',
  'care_plans',
  'audit_logs',
  'incidents',
] as const;

function atDaysAgo(dayOffset: number, hour: number, minute: number): string {
  const d = setMinutes(setHours(subDays(new Date(), dayOffset), hour), minute);
  return d.toISOString();
}

/** Rich static-ish audit trail for Compliance Intelligence demo (local preview only). */
export const DEMO_AUDIT_LOGS: DemoAuditLog[] = (() => {
  const rows: DemoAuditLog[] = [];
  let id = 0;
  const push = (
    dayOffset: number,
    hour: number,
    minute: number,
    userIdx: number,
    action: DemoAuditAction,
    table: string,
    ip: string,
    details?: string,
  ) => {
    const u = DEMO_USERS[userIdx % DEMO_USERS.length];
    rows.push({
      id: `alog-${++id}`,
      user_id: u.id,
      user_name: u.name,
      user_role: u.role,
      action,
      table_name: table,
      timestamp: atDaysAgo(dayOffset, hour, minute),
      ip_address: ip,
      session_id: `sess-${1000 + id}`,
      details,
    });
  };

  push(0, 9, 12, 0, 'read', 'patients', '10.0.1.22');
  push(0, 9, 45, 1, 'update', 'medication_administrations', '10.0.1.44', 'MAR correction');
  push(0, 10, 2, 2, 'read', 'care_plans', '10.0.1.44');
  push(0, 11, 20, 3, 'create', 'visits', '10.0.1.88');
  push(0, 14, 5, 0, 'export', 'patients', '10.0.1.22', 'Scheduled export');
  push(0, 18, 30, 4, 'login', 'audit_logs', '10.0.2.1');
  push(0, 22, 15, 1, 'update', 'medication_administrations', '10.0.1.44'); // off-hours med
  push(1, 8, 0, 2, 'read', 'patients', '192.168.0.12');
  push(1, 6, 10, 3, 'read', 'staff_profiles', '192.168.0.55'); // off-hours access
  push(1, 12, 30, 0, 'delete', 'incidents', '10.0.1.22', 'Test record purge');
  push(1, 15, 0, 1, 'read', 'patients', '10.0.1.44');
  push(1, 15, 5, 1, 'read', 'patients', '10.0.1.44');
  push(1, 15, 8, 1, 'read', 'patients', '10.0.1.44');
  push(1, 15, 12, 1, 'read', 'patients', '10.0.1.44');
  push(1, 15, 20, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 0, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 2, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 4, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 6, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 8, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 10, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 12, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 14, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 16, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 18, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 20, 1, 'read', 'patients', '10.0.1.44');
  push(1, 16, 22, 1, 'read', 'patients', '10.0.1.44');
  push(2, 10, 0, 2, 'update', 'visits', '10.0.1.88');
  push(2, 13, 40, 0, 'read', 'medication_administrations', '10.0.1.22');
  push(3, 9, 30, 3, 'logout', 'audit_logs', '10.0.1.88');
  push(3, 11, 0, 4, 'export', 'care_plans', '10.0.2.5');
  push(4, 7, 45, 2, 'read', 'patients', '10.0.1.88');
  push(5, 14, 10, 0, 'create', 'care_plans', '10.0.1.22');
  push(6, 9, 0, 1, 'update', 'staff_profiles', '10.0.1.44');
  push(7, 12, 0, 3, 'read', 'visits', '192.168.0.12');

  for (let i = 0; i < DEMO_TABLES.length; i++) {
    push((i % 5) + 1, 10 + i, 15 + i, i % DEMO_USERS.length, 'read', DEMO_TABLES[i], `10.0.1.${50 + i}`);
  }

  return rows;
})();

// --- Patient MAR / eMAR demo (PatientMedicationsDemo) ---

export const DEMO_MAR_PATIENT_META = {
  name: 'yannick yaba',
  dob: '15 Jan 1985',
  allergies: 'No known allergies',
} as const;

export const DEMO_MAR_SCHEDULES: DemoMARScheduleRow[] = [
  {
    id: 'sch-1',
    medication_id: '1',
    medication_name: 'Lithium',
    indication: 'Bipolar maintenance',
    start_date: '2020-01-01',
    end_date: null,
    frequency: 'Twice daily',
    scheduled_times: ['09:00', '21:00'],
    route: 'Oral',
    dose: 'As prescribed',
  },
  {
    id: 'sch-2',
    medication_id: '2',
    medication_name: 'Paracetamol',
    indication: 'PRN mild pain',
    start_date: '2020-01-01',
    end_date: null,
    frequency: 'PRN',
    scheduled_times: ['--'],
    route: 'Oral',
    dose: '500mg',
  },
];

function buildMarHistoryPool(): DemoMARAdminRow[] {
  const out: DemoMARAdminRow[] = [];
  const mondayThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const staff = ['Emma Wilson', 'James Taylor', 'Dave Smith', 'Sarah Johnson'];
  const s09Cycle = ['taken', 'taken', 'refused', 'missed', 'late', 'taken', 'taken'];

  for (let w = 0; w < 12; w++) {
    const ws = subDays(mondayThisWeek, w * 7);
    const days = eachDayOfInterval({ start: ws, end: addDays(ws, 6) });
    days.forEach((day, di) => {
      const d = format(day, 'yyyy-MM-dd');
      const s09 = s09Cycle[di % s09Cycle.length];
      out.push({
        id: `mar-w${w}-d${di}-09`,
        medication_id: '1',
        administered_at: `${d}T09:05:00`,
        scheduled_time: '09:00',
        status: s09,
        staff_display_name: s09 === 'missed' || s09 === 'refused' ? null : staff[di % 4],
        notes: s09 === 'refused' ? 'Patient declined' : s09 === 'late' ? 'Delayed round' : null,
      });
      const s21 = di === 3 ? 'missed' : 'taken';
      out.push({
        id: `mar-w${w}-d${di}-21`,
        medication_id: '1',
        administered_at: s21 === 'missed' ? `${d}T23:59:00` : `${d}T21:10:00`,
        scheduled_time: '21:00',
        status: s21,
        staff_display_name: s21 === 'missed' ? null : staff[(di + 2) % 4],
        notes: null,
      });
      if (di === 2) {
        out.push({
          id: `mar-w${w}-d${di}-prn`,
          medication_id: '2',
          administered_at: `${d}T14:20:00`,
          scheduled_time: null,
          status: 'taken',
          staff_display_name: staff[0],
          notes: 'PRN post-exercise',
        });
      }
    });
  }
  return out;
}

/** All demo administrations (12 weeks) for chart intervals + history mode. */
export const MAR_HISTORY_POOL: DemoMARAdminRow[] = buildMarHistoryPool();

export function filterMarAdminsInRange(start: Date, end: Date, pool: DemoMARAdminRow[]): DemoMARAdminRow[] {
  return pool.filter((a) => {
    try {
      const t = parseISO(a.administered_at);
      return isWithinInterval(t, { start: startOfDay(start), end: endOfDay(end) });
    } catch {
      return false;
    }
  });
}

