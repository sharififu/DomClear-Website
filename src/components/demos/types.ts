export type DemoId = 'dashboard' | 'scheduling' | 'care-planning' | 'care-plan' | 'finance' | 'payroll' | 'compliance' | 'emar' | 'patient-medications' | 'template-builder' | 'form-templates' | 'templates-page' | 'care-plan-demo';

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

