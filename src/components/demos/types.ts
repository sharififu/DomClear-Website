export type DemoId =
  | 'dashboard'
  | 'scheduling'
  | 'care-planning'
  | 'care-plan'
  | 'care-plan-demo'
  | 'finance'
  | 'payroll'
  | 'compliance'
  | 'emar'
  | 'patient-medications'
  | 'patient-medications-mar'
  | 'template-builder'
  | 'form-templates'
  | 'templates-page'
  // Management
  | 'service-users'
  | 'visits'
  | 'medications'
  | 'custom-tasks'
  | 'monitoring-alerts'
  | 'alert-rules'
  | 'absence-requests'
  | 'family-portal'
  // Workforce
  | 'staff'
  | 'teams'
  | 'shift-management'
  | 'attendance'
  // Compliance & Safety
  | 'audit-dashboard'
  | 'compliance-reports'
  | 'incidents'
  | 'training'
  // Finance
  | 'visit-cost-types'
  // Resources
  | 'documents'
  | 'policies'
  | 'reports'
  | 'ppe-stock';

export interface DemoTab {
  id: DemoId;
  label: string;
  icon: any; // Using any for Lucide icon components
  description: string;
}

// Scheduling Types
export interface Visit {
  id: string;
  clientId: string;
  carerId: string;
  date: string;
  startTime: string;
  duration: number; // in minutes
  type: 'personal-care' | 'domestic' | 'medication' | 'companionship';
  status: 'scheduled' | 'completed' | 'missed';
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  needs: string[];
}

// Care Planning Types
export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date';
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface FormTemplate {
  id: string;
  name: string;
  category: string;
  fields: FormField[];
}

// Finance Types
export interface TimesheetEntry {
  id: string;
  staffId: string;
  date: string;
  hours: number;
  rate: number;
  status: 'pending' | 'approved' | 'paid';
}

export interface Invoice {
  id: string;
  clientId: string;
  date: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid';
  items: { description: string; amount: number }[];
}

// Compliance Types
export interface AuditChecklist {
  id: string;
  title: string;
  category: 'safety' | 'medication' | 'training' | 'documentation';
  status: 'compliant' | 'non-compliant' | 'pending';
  lastChecked: string;
  score: number;
}

export interface IncidentReport {
  id: string;
  date: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  description: string;
}

/** Marketing demo audit log row — mirrors CMS `audit_logs` shape used on audit dashboard. */
export type DemoAuditAction = 'create' | 'read' | 'update' | 'delete' | 'export' | 'login' | 'logout';

export interface DemoAuditLog {
  id: string;
  user_id: string;
  user_name: string;
  user_role?: string;
  action: DemoAuditAction;
  table_name: string;
  timestamp: string;
  ip_address: string;
  session_id?: string;
  details?: string;
}

/** Demo MAR schedule row — mirrors CMS `medication_schedules` + medication join. */
export interface DemoMARScheduleRow {
  id: string;
  medication_id: string;
  medication_name: string;
  indication?: string | null;
  start_date: string;
  end_date?: string | null;
  frequency: string;
  scheduled_times: string[];
  route: string;
  dose: string;
}

/** Demo administration — mirrors CMS `medication_administrations`. */
export interface DemoMARAdminRow {
  id: string;
  medication_id: string;
  administered_at: string;
  scheduled_time: string | null;
  status: string;
  staff_display_name?: string | null;
  notes?: string | null;
}

