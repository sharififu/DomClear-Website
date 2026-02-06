import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';
import { 
  FileText, 
  Target, 
  ShieldAlert, 
  ListChecks, 
  Clock, 
  User, 
  Edit, 
  Save, 
  Lock,
  Unlock,
  Plus,
  Trash2,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Calendar,
  Bell,
  Heart,
  Shield,
  ClipboardList,
  Settings,
  Activity,
  X
} from 'lucide-react';

interface SchedulingRule {
  id: string;
  name: string;
  description: string;
  time: string;
  duration: number;
}

interface RiskAssessment {
  id: string;
  title: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  lastAssessed: string;
  nextReview: string;
}

interface CarePlanSection {
  id: string;
  title: string;
  icon: any;
}

const carePlanSections: CarePlanSection[] = [
  { id: 'scheduling-rules', title: 'Scheduling Rules', icon: Calendar },
  { id: 'health-summary', title: 'Health Summary', icon: Activity },
  { id: 'outcomes', title: 'Person-Centred Outcomes', icon: Target },
  { id: 'needs', title: 'Assessed Needs', icon: FileText },
  { id: 'risks', title: 'Risk Assessments', icon: ShieldAlert },
  { id: 'goals', title: 'Goals', icon: Target },
  { id: 'tasks', title: 'Care Tasks', icon: ListChecks },
  { id: 'risk-actions', title: 'Risk Actions', icon: ShieldAlert },
  { id: 'service-reviews', title: 'Service Reviews', icon: ClipboardList },
  { id: 'waterlow', title: 'Waterlow Assessment', icon: Shield },
  { id: 'must-assessment', title: 'MUST Assessment', icon: AlertTriangle },
  { id: 'positioning-handling', title: 'Positioning & Handling', icon: Settings },
  { id: 'personal-care', title: 'Personal Care Plan', icon: User },
  { id: 'stool-scheduling', title: 'Stool Scheduling', icon: Clock },
  { id: 'vital-checks', title: 'Vital Checks', icon: Activity },
  { id: 'muac-weight', title: 'MUAC & Weight', icon: Activity },
  { id: 'custom-care-tasks', title: 'Custom Care Tasks', icon: ListChecks },
  { id: 'consent-signatures', title: 'Consent Signatures', icon: FileText },
  { id: 'clinical-flags', title: 'Clinical Flags', icon: AlertTriangle },
  { id: 'monitoring-alerts', title: 'Monitoring Alerts', icon: Bell },
  { id: 'funeral-arrangements', title: 'Funeral Arrangements', icon: Heart },
  { id: 'review-history', title: 'Review History', icon: Clock },
];

const INITIAL_SCHEDULING_RULES: SchedulingRule[] = [
  {
    id: 'rule-1',
    name: 'Morning Visit',
    description: 'Personal care and medication',
    time: '08:00',
    duration: 60
  },
  {
    id: 'rule-2',
    name: 'Evening Visit',
    description: 'Medication and bedtime routine',
    time: '20:00',
    duration: 45
  }
];

const INITIAL_RISK_ASSESSMENTS: RiskAssessment[] = [
  {
    id: 'risk-1',
    title: 'Falls Risk',
    category: 'Falls',
    severity: 'high',
    description: 'Patient has history of falls and requires mobility aids. Uses walking frame. Requires 2-person assist for transfers.',
    lastAssessed: '15/01/2024',
    nextReview: '15/02/2024'
  },
  {
    id: 'risk-2',
    title: 'Medication Risk',
    category: 'Medication',
    severity: 'medium',
    description: 'Multiple medications requiring careful monitoring. Witness required for high-risk drugs (Warfarin).',
    lastAssessed: '10/01/2024',
    nextReview: '10/02/2024'
  },
  {
    id: 'risk-3',
    title: 'Choking Risk',
    category: 'Nutrition',
    severity: 'low',
    description: 'Modified diet texture. Supervised during meals.',
    lastAssessed: '20/01/2024',
    nextReview: '20/04/2024'
  }
];

export const CarePlanDemo: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [activeSection, setActiveSection] = useState('scheduling-rules');
  const [isEditing, setIsEditing] = useState(false);
  const [carePlanStatus, setCarePlanStatus] = useState<'draft' | 'approved' | 'locked' | 'revising'>('draft');
  const tour = useDemoTour('care-plan');
  
  // Editable data
  const [schedulingRules, setSchedulingRules] = useState<SchedulingRule[]>(INITIAL_SCHEDULING_RULES);
  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>(INITIAL_RISK_ASSESSMENTS);
  
  // Modals
  const [showSchedulingModal, setShowSchedulingModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [editingRule, setEditingRule] = useState<SchedulingRule | null>(null);
  const [editingRisk, setEditingRisk] = useState<RiskAssessment | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700';
      case 'approved': return 'bg-blue-100 text-blue-700';
      case 'locked': return 'bg-green-100 text-green-700';
      case 'revising': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'scheduling-rules':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Visit Frequency & Timing</h3>
                {isEditing && (
                  <button 
                    onClick={() => {
                      setEditingRule(null);
                      setShowSchedulingModal(true);
                    }}
                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Visit</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {schedulingRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 group hover:border-blue-200 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-1">{rule.name}</div>
                      <div className="text-sm text-slate-600">{rule.description}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-900">Daily at {rule.time}</div>
                        <div className="text-xs text-slate-500">{rule.duration} minutes</div>
                      </div>
                      {isEditing && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setEditingRule(rule);
                              setShowSchedulingModal(true);
                            }}
                            className="p-1.5 hover:bg-blue-100 rounded-sm"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => {
                              setSchedulingRules(schedulingRules.filter(r => r.id !== rule.id));
                            }}
                            className="p-1.5 hover:bg-red-100 rounded-sm"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Special Requirements</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-700 p-2 bg-green-50 rounded-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Two-person assist required for transfers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 p-2 bg-green-50 rounded-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Witness required for Warfarin administration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 p-2 bg-amber-50 rounded-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Requires hoist for mobility</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'health-summary':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Health Measurements</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Height</div>
                  <div className="text-2xl font-bold text-slate-900">172 cm</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Weight</div>
                  <div className="text-2xl font-bold text-slate-900">68 kg</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">BMI</div>
                  <div className="text-2xl font-bold text-slate-900">23.0</div>
                  <div className="text-xs text-green-600 mt-1">Normal</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Clinical Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Oxygen Therapy</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-sm text-xs font-medium">No</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Catheter</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-sm text-xs font-medium">No</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'outcomes':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Person-Centred Outcomes</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Outcome</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-blue-900 mb-1">Maintain independence in daily living</div>
                      <div className="text-sm text-blue-700">Support patient to continue managing personal care tasks independently where possible</div>
                    </div>
                    {isEditing && (
                      <button className="p-1.5 hover:bg-blue-100 rounded-sm">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-blue-900 mb-1">Improve social engagement</div>
                      <div className="text-sm text-blue-700">Encourage participation in community activities and maintain social connections</div>
                    </div>
                    {isEditing && (
                      <button className="p-1.5 hover:bg-blue-100 rounded-sm">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'needs':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Assessed Needs</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Need</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-sm text-xs font-medium mb-2">
                        Personal Care
                      </div>
                      <div className="text-sm text-slate-700 mb-2">
                        Requires assistance with personal hygiene, dressing, and meal preparation due to reduced mobility
                      </div>
                      <div className="text-xs text-slate-500">Related: Maintain independence outcome</div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 rounded-sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-sm text-xs font-medium mb-2">
                        Medication Management
                      </div>
                      <div className="text-sm text-slate-700 mb-2">
                        Requires support with medication administration and monitoring for multiple chronic conditions
                      </div>
                      <div className="text-xs text-slate-500">Related: Daily medication compliance</div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 rounded-sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'risks':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Risk Assessments</h3>
                {isEditing && (
                  <button 
                    onClick={() => {
                      setEditingRisk(null);
                      setShowRiskModal(true);
                    }}
                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Risk</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {riskAssessments.map((risk) => {
                  const severityConfig = {
                    critical: { border: 'border-red-600', bg: 'bg-red-50', text: 'text-red-900', iconColor: 'text-red-600', badge: 'bg-red-200 text-red-900', label: 'CRITICAL' },
                    high: { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-900', iconColor: 'text-red-600', badge: 'bg-red-200 text-red-900', label: 'HIGH' },
                    medium: { border: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-900', iconColor: 'text-amber-600', badge: 'bg-amber-200 text-amber-900', label: 'MEDIUM' },
                    low: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-900', iconColor: 'text-blue-600', badge: 'bg-blue-200 text-blue-900', label: 'LOW' }
                  };
                  const config = severityConfig[risk.severity];
                  
                  return (
                    <div key={risk.id} className={`p-5 border-l-4 ${config.border} ${config.bg} rounded-lg group hover:shadow-xs transition-shadow`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <ShieldAlert className={`w-5 h-5 ${config.iconColor}`} />
                          <span className={`font-semibold ${config.text}`}>{risk.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 ${config.badge} rounded-full text-xs font-bold`}>{config.label}</span>
                          {isEditing && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => {
                                  setEditingRisk(risk);
                                  setShowRiskModal(true);
                                }}
                                className="p-1.5 hover:bg-white/50 rounded-sm"
                              >
                                <Edit className="w-4 h-4 text-slate-700" />
                              </button>
                              <button 
                                onClick={() => {
                                  setRiskAssessments(riskAssessments.filter(r => r.id !== risk.id));
                                }}
                                className="p-1.5 hover:bg-white/50 rounded-sm"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`text-sm ${config.text.replace('900', '800')} mb-3`}>
                        {risk.description}
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${config.text.replace('900', '700')}`}>
                        <Clock className="w-3 h-3" />
                        <span>Last assessed: {risk.lastAssessed} • Next review: {risk.nextReview}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Care Goals</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Goal</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1">Increase mobility and independence</div>
                      <div className="text-sm text-slate-600 mb-2">
                        Work with physiotherapist to improve walking distance and reduce reliance on mobility aids
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>Target: 30/06/2024</span>
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 mb-1">Maintain medication compliance</div>
                      <div className="text-sm text-slate-600 mb-2">
                        Ensure all prescribed medications are taken correctly and on time
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>Target: Ongoing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Care Tasks</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-sm text-xs font-medium mb-2">
                        Morning Routine
                      </div>
                      <div className="font-medium text-slate-900 mb-1">Personal hygiene assistance</div>
                      <div className="text-sm text-slate-600 mb-2">
                        Assist with washing, dressing, and grooming. Patient prefers shower to bath.
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Morning (08:00)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Daily</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-sm text-xs font-medium mb-2">
                        Medication
                      </div>
                      <div className="font-medium text-slate-900 mb-1">Medication administration</div>
                      <div className="text-sm text-slate-600 mb-2">
                        Administer prescribed medications. Witness required for Warfarin.
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Morning & Evening</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Twice daily</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-sm text-xs font-medium mb-2">
                        Meal Support
                      </div>
                      <div className="font-medium text-slate-900 mb-1">Meal preparation and assistance</div>
                      <div className="text-sm text-slate-600 mb-2">
                        Prepare meals, ensure adequate fluid intake. Modified texture diet.
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-100 rounded-sm">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Lunch (12:00)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Daily</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'risk-actions':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Risk Mitigation Actions</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Action</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-900">Falls Prevention Protocol</span>
                      </div>
                      <div className="text-sm text-red-800 mb-2">
                        Two-person assist for all transfers. Walking frame within reach. Clear pathways maintained. Fall alarm pendant worn at all times.
                      </div>
                      <div className="text-xs text-red-700">Related to: Falls Risk (High)</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold text-amber-900">Medication Safety Measures</span>
                      </div>
                      <div className="text-sm text-amber-800 mb-2">
                        Witness present for high-risk medication administration. MAR chart completed immediately. Blood tests monitored monthly for Warfarin.
                      </div>
                      <div className="text-xs text-amber-700">Related to: Medication Risk (Medium)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'service-reviews':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Service Reviews</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Review</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-5 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">6-Month Review</span>
                    </div>
                    <span className="text-xs text-green-700">15/01/2024</span>
                  </div>
                  <div className="space-y-2 text-sm text-green-800">
                    <div><strong>Overall Satisfaction:</strong> Excellent</div>
                    <div><strong>Care Quality:</strong> Service user very happy with care provided</div>
                    <div><strong>Family Feedback:</strong> Daughter reports visible improvement in mobility and confidence</div>
                    <div className="pt-2 border-t border-green-200">
                      <strong>Actions:</strong> Continue current care plan. Next review in 6 months.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'positioning-handling':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Positioning & Manual Handling</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-semibold text-blue-900 mb-2">Equipment Required</div>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div>• Standing hoist (Molift Smart 150)</div>
                    <div>• Walking frame with wheels</div>
                    <div>• Slide sheet for bed repositioning</div>
                    <div>• Pressure-relieving cushion</div>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-sm font-semibold text-amber-900 mb-2">Transfer Protocol</div>
                  <div className="space-y-1 text-sm text-amber-800">
                    <div><strong>Risk Level:</strong> High - Two carers required</div>
                    <div><strong>Method:</strong> Use standing hoist for all transfers</div>
                    <div><strong>Weight Limit:</strong> Patient weight 68kg (within safe limits)</div>
                    <div><strong>Communication:</strong> Explain each step, ensure patient consent</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-sm font-semibold text-slate-900 mb-2">Bed Positioning</div>
                  <div className="text-sm text-slate-700">
                    Reposition every 2-4 hours to prevent pressure sores. Use slide sheet. Preferred positions: Left side, right side, semi-recumbent (45°). Document all repositioning in care notes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'stool-scheduling':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Bowel Management</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-sm font-medium text-slate-700 mb-2">Current Pattern</div>
                  <div className="text-sm text-slate-600">Regular bowel movements every 2-3 days. No continence issues. Requires prompting and privacy.</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-semibold text-blue-900 mb-2">Monitoring Schedule</div>
                  <div className="text-sm text-blue-800 mb-3">
                    Record frequency, consistency (Bristol Stool Chart), and any difficulties during each visit.
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <AlertCircle className="w-3 h-3" />
                    <span>Alert if no bowel movement recorded for 4 days</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-sm font-medium text-slate-700 mb-2">Interventions</div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div>• Increase fluid intake to 1.5-2L daily</div>
                    <div>• High-fiber diet encouraged</div>
                    <div>• Gentle exercise (walking) as tolerated</div>
                    <div>• Prune juice available if needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'muac-weight':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">MUAC & Weight Monitoring</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Current Weight</div>
                  <div className="text-2xl font-bold text-slate-900">68.0 kg</div>
                  <div className="text-xs text-green-600 mt-1">Stable (±0.2kg from baseline)</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">MUAC</div>
                  <div className="text-2xl font-bold text-slate-900">26.5 cm</div>
                  <div className="text-xs text-green-600 mt-1">Normal range</div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">Monitoring Schedule</span>
                </div>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>• <strong>Weight:</strong> Weekly on Mondays</div>
                  <div>• <strong>MUAC:</strong> Monthly (first Monday)</div>
                  <div>• <strong>Alert threshold:</strong> ±5% weight change or MUAC &lt;23.5cm</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'custom-care-tasks':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Custom Care Tasks</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Task</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-purple-900 mb-1">Garden time and fresh air</div>
                      <div className="text-sm text-purple-800">
                        Patient enjoys spending time in garden, weather permitting. Assist to outdoor seating area.
                      </div>
                    </div>
                    {isEditing && (
                      <button className="p-1.5 hover:bg-purple-100 rounded-sm">
                        <Edit className="w-4 h-4 text-purple-600" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-purple-700 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Afternoon (if fine weather)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>As appropriate</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-teal-200 bg-teal-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-teal-900 mb-1">Phone call to daughter</div>
                      <div className="text-sm text-teal-800">
                        Facilitate weekly video call with daughter Sarah. Patient enjoys staying connected with family.
                      </div>
                    </div>
                    {isEditing && (
                      <button className="p-1.5 hover:bg-teal-100 rounded-sm">
                        <Edit className="w-4 h-4 text-teal-600" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-teal-700 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Sunday afternoon</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Weekly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'consent-signatures':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Consent & Signatures</h3>
              <div className="space-y-3">
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Care Plan Consent</span>
                    </div>
                    <span className="px-2 py-1 bg-green-200 text-green-900 rounded-sm text-xs font-bold">SIGNED</span>
                  </div>
                  <div className="text-sm text-green-800 space-y-1">
                    <div><strong>Signed by:</strong> John Smith (Service User)</div>
                    <div><strong>Date:</strong> 01/01/2024</div>
                    <div><strong>Witness:</strong> Sarah Johnson, Manager</div>
                  </div>
                </div>
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Medication Administration Consent</span>
                    </div>
                    <span className="px-2 py-1 bg-green-200 text-green-900 rounded-sm text-xs font-bold">SIGNED</span>
                  </div>
                  <div className="text-sm text-green-800 space-y-1">
                    <div><strong>Signed by:</strong> John Smith (Service User)</div>
                    <div><strong>Date:</strong> 01/01/2024</div>
                    <div><strong>Witness:</strong> Emma Wilson, Senior Carer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'clinical-flags':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Clinical Flags</h3>
                {isEditing && (
                  <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Flag</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-900">High Falls Risk</div>
                      <div className="text-xs text-red-700">Two-person assist mandatory</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-200 text-red-900 rounded-sm text-xs font-bold">CRITICAL</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="font-medium text-amber-900">Anticoagulation Therapy</div>
                      <div className="text-xs text-amber-700">Warfarin - witness required</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-900 rounded-sm text-xs font-bold">HIGH</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Modified Diet</div>
                      <div className="text-xs text-blue-700">Soft texture foods only</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-sm text-xs font-bold">MEDIUM</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'monitoring-alerts':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Monitoring Alerts Configuration</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-900">Blood Pressure - Critical</span>
                    </div>
                    <span className="px-2 py-1 bg-red-200 text-red-900 rounded-sm text-xs font-bold">ACTIVE</span>
                  </div>
                  <div className="text-sm text-red-800 space-y-1">
                    <div><strong>Trigger:</strong> Systolic &gt;160 or &lt;90, Diastolic &gt;100 or &lt;60</div>
                    <div><strong>Action:</strong> Contact GP immediately, do not wait</div>
                  </div>
                </div>
                <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-600" />
                      <span className="font-medium text-amber-900">Weight Change</span>
                    </div>
                    <span className="px-2 py-1 bg-amber-200 text-amber-900 rounded-sm text-xs font-bold">ACTIVE</span>
                  </div>
                  <div className="text-sm text-amber-800 space-y-1">
                    <div><strong>Trigger:</strong> ±3kg change in one week or ±5% in one month</div>
                    <div><strong>Action:</strong> Notify manager and schedule dietitian review</div>
                  </div>
                </div>
                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Temperature</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-200 text-blue-900 rounded-sm text-xs font-bold">ACTIVE</span>
                  </div>
                  <div className="text-sm text-blue-800 space-y-1">
                    <div><strong>Trigger:</strong> &gt;38°C or &lt;36°C</div>
                    <div><strong>Action:</strong> Recheck in 30 mins, contact duty manager if persists</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'funeral-arrangements':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">End of Life Planning</h3>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-900">Funeral Arrangements Recorded</span>
                </div>
                <div className="space-y-2 text-sm text-purple-800">
                  <div><strong>Funeral Director:</strong> Smith & Sons Funeral Services</div>
                  <div><strong>Contact:</strong> 01332 555 1234</div>
                  <div><strong>Plan Type:</strong> Pre-paid funeral plan</div>
                  <div><strong>Wishes:</strong> Cremation preferred, family to arrange ceremony</div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-sm font-medium text-slate-700 mb-2">Additional Wishes</div>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>• Favorite music: Classical, particularly Beethoven</div>
                  <div>• Flowers: Simple white arrangement</div>
                  <div>• Donations: Cancer Research UK in lieu of flowers</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'vital-checks':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Vital Signs Monitoring</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Blood Pressure</div>
                  <div className="text-lg font-bold text-slate-900">120/80 mmHg</div>
                  <div className="text-xs text-green-600 mt-1">Normal</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Oxygen Saturation</div>
                  <div className="text-lg font-bold text-slate-900">98%</div>
                  <div className="text-xs text-green-600 mt-1">Normal</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Temperature</div>
                  <div className="text-lg font-bold text-slate-900">36.8°C</div>
                  <div className="text-xs text-green-600 mt-1">Normal</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Heart Rate</div>
                  <div className="text-lg font-bold text-slate-900">72 bpm</div>
                  <div className="text-xs text-green-600 mt-1">Normal</div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Monitoring Schedule</span>
                </div>
                <div className="text-sm text-blue-700">
                  Blood pressure and temperature to be checked twice daily during morning and evening visits
                </div>
              </div>
            </div>
          </div>
        );
      case 'waterlow':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Waterlow Pressure Ulcer Risk Assessment</h3>
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-amber-900">Overall Score</span>
                  <span className="px-4 py-2 bg-amber-200 text-amber-900 rounded-lg text-lg font-bold">12</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">High Risk - Immediate preventative measures required</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-sm">
                  <span className="text-slate-700">Build/Weight for Height</span>
                  <span className="font-medium text-slate-900">Average (1 point)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-sm">
                  <span className="text-slate-700">Continence</span>
                  <span className="font-medium text-slate-900">Occasionally incontinent (1 point)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-sm">
                  <span className="text-slate-700">Mobility</span>
                  <span className="font-medium text-slate-900">Restless/Fidgety (3 points)</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'must-assessment':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">MUST (Malnutrition Universal Screening Tool)</h3>
              <div className="p-5 bg-green-50 border border-green-200 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-semibold text-green-900">Overall Risk</span>
                  <span className="px-4 py-2 bg-green-200 text-green-900 rounded-lg text-lg font-bold">Low (0)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">No malnutrition risk identified</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-sm">
                  <span className="text-slate-700">BMI Score</span>
                  <span className="font-medium text-slate-900">0 (BMI 23.0)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-sm">
                  <span className="text-slate-700">Weight Loss Score</span>
                  <span className="font-medium text-slate-900">0 (No unplanned weight loss)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-sm">
                  <span className="text-slate-700">Acute Disease Effect</span>
                  <span className="font-medium text-slate-900">0 (No acute illness)</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'personal-care':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Care Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Washing & Bathing</div>
                  <div className="p-3 bg-slate-50 rounded-sm text-sm text-slate-700">
                    Prefers shower to bath. Requires assistance with back washing. Temperature check essential to prevent scalding.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Dressing</div>
                  <div className="p-3 bg-slate-50 rounded-sm text-sm text-slate-700">
                    Can select own clothes. Needs help with buttons and zips due to arthritis in hands.
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Continence</div>
                  <div className="p-3 bg-slate-50 rounded-sm text-sm text-slate-700">
                    Continent, uses commode at night. Requires prompting to use facilities.
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'review-history':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Review History</h3>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-slate-900">15 January 2024</div>
                    <div className="text-xs text-slate-500">by Sarah Johnson, Manager</div>
                  </div>
                  <div className="text-sm text-slate-700 mb-2">
                    Comprehensive review completed. Falls risk increased to High. Updated personal care requirements.
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>• Status changed to Approved</div>
                    <div>• Falls risk assessment updated</div>
                    <div>• Two-person assist added</div>
                  </div>
                </div>
                <div className="p-4 border-l-4 border-slate-300 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-slate-900">01 January 2024</div>
                    <div className="text-xs text-slate-500">by John Miller, Care Coordinator</div>
                  </div>
                  <div className="text-sm text-slate-700 mb-2">
                    Initial care plan created. All baseline assessments completed.
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>• Care plan created from template</div>
                    <div>• Initial assessments completed</div>
                    <div>• Scheduling rules defined</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">{carePlanSections.find(s => s.id === activeSection)?.title}</h3>
            <p className="text-sm text-slate-500">This section contains additional care plan information</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F4F6F8] overflow-hidden">
      <DemoHeader 
        title="Care Plan" 
        subtitle="Patients"
        onReset={onReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="care-plan-header"
      />
      <DemoTour
        demoId="care-plan"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />
      
      {/* Patient Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-slate-900">John Smith</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(carePlanStatus)}`}>
                {carePlanStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-500">Care Plan • Version 1.2 • Last updated 15/01/2024</p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                  disabled={carePlanStatus === 'locked'}
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
                {carePlanStatus === 'draft' && (
                  <button
                    onClick={() => setCarePlanStatus('approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                )}
                {carePlanStatus === 'approved' && (
                  <button
                    onClick={() => setCarePlanStatus('locked')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Lock</span>
                  </button>
                )}
                {carePlanStatus === 'locked' && (
                  <button
                    onClick={() => setCarePlanStatus('revising')}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors flex items-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    <span>Revise</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    if (carePlanStatus === 'draft') setCarePlanStatus('approved');
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-72 bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0" data-tour="care-plan-sidebar">
          <div className="p-4 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Care Plan Sections</div>
            <div className="text-xs text-slate-400">Select a section to view or edit</div>
          </div>
          <div className="p-2">
              {carePlanSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                      isActive
                      ? 'bg-blue-50 text-blue-700 shadow-xs'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="flex-1 text-left">{section.title}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  )}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6" data-tour="care-plan-content">
          {renderSectionContent()}
        </div>

        {/* Right Summary Rail */}
        <div className="w-80 bg-slate-50 border-l border-slate-200 overflow-y-auto flex-shrink-0 p-4">
          <div className="space-y-4">
            {/* Assessment Summary */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Assessment Summary</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="text-xs font-semibold text-amber-900">MUST</div>
                      <div className="text-xs text-amber-700">Score: 2</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-amber-200 text-amber-900 text-xs font-bold rounded-sm">MEDIUM</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-600" />
                    <div>
                      <div className="text-xs font-semibold text-red-900">Waterlow</div>
                      <div className="text-xs text-red-700">Score: 12</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-200 text-red-900 text-xs font-bold rounded-sm">HIGH</span>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Quick Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Next Review</span>
                  <span className="font-medium text-slate-900">15/02/2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Care Start Date</span>
                  <span className="font-medium text-slate-900">01/01/2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Preferred Days</span>
                  <span className="font-medium text-slate-900">Mon, Wed, Fri</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-lg border border-red-200 p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-red-600" />
                <h4 className="text-sm font-bold text-red-900">Active Alerts</h4>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-red-50 rounded-sm text-xs text-red-800">
                  ⚠️ Waterlow assessment overdue
                </div>
                <div className="p-2 bg-amber-50 rounded-sm text-xs text-amber-800">
                  ⚠️ Falls risk - high precautions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduling Rule Modal */}
      {showSchedulingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSchedulingModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingRule ? 'Edit Visit Schedule' : 'Add Visit Schedule'}
              </h3>
              <button onClick={() => setShowSchedulingModal(false)} className="p-1 hover:bg-slate-100 rounded-sm">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Visit Name</label>
                <input
                  type="text"
                  defaultValue={editingRule?.name || ''}
                  placeholder="e.g., Morning Visit"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="rule-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  defaultValue={editingRule?.description || ''}
                  placeholder="e.g., Personal care and medication"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="rule-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    defaultValue={editingRule?.time || '08:00'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="rule-time"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    defaultValue={editingRule?.duration || 60}
                    placeholder="60"
                    min="15"
                    step="15"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="rule-duration"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setShowSchedulingModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = (document.getElementById('rule-name') as HTMLInputElement).value;
                  const description = (document.getElementById('rule-description') as HTMLInputElement).value;
                  const time = (document.getElementById('rule-time') as HTMLInputElement).value;
                  const duration = parseInt((document.getElementById('rule-duration') as HTMLInputElement).value);

                  if (name && description && time && duration) {
                    if (editingRule) {
                      setSchedulingRules(schedulingRules.map(r => 
                        r.id === editingRule.id 
                          ? { ...r, name, description, time, duration }
                          : r
                      ));
                    } else {
                      setSchedulingRules([...schedulingRules, {
                        id: `rule-${Date.now()}`,
                        name,
                        description,
                        time,
                        duration
                      }]);
                    }
                    setShowSchedulingModal(false);
                    setEditingRule(null);
                  }
                }}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >
                {editingRule ? 'Update' : 'Add'} Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Risk Assessment Modal */}
      {showRiskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowRiskModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingRisk ? 'Edit Risk Assessment' : 'Add Risk Assessment'}
              </h3>
              <button onClick={() => setShowRiskModal(false)} className="p-1 hover:bg-slate-100 rounded-sm">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Risk Title</label>
                <input
                  type="text"
                  defaultValue={editingRisk?.title || ''}
                  placeholder="e.g., Falls Risk"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="risk-title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    defaultValue={editingRisk?.category || 'Falls'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="risk-category"
                  >
                    <option value="Falls">Falls</option>
                    <option value="Medication">Medication</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Skin Integrity">Skin Integrity</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                  <select
                    defaultValue={editingRisk?.severity || 'low'}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="risk-severity"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  defaultValue={editingRisk?.description || ''}
                  placeholder="Describe the risk, contributing factors, and any relevant history..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  id="risk-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Assessed</label>
                  <input
                    type="text"
                    defaultValue={editingRisk?.lastAssessed || new Date().toLocaleDateString('en-GB')}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="risk-last-assessed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Next Review</label>
                  <input
                    type="text"
                    defaultValue={editingRisk?.nextReview || ''}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="risk-next-review"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setShowRiskModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = (document.getElementById('risk-title') as HTMLInputElement).value;
                  const category = (document.getElementById('risk-category') as HTMLSelectElement).value;
                  const severity = (document.getElementById('risk-severity') as HTMLSelectElement).value as 'low' | 'medium' | 'high' | 'critical';
                  const description = (document.getElementById('risk-description') as HTMLTextAreaElement).value;
                  const lastAssessed = (document.getElementById('risk-last-assessed') as HTMLInputElement).value;
                  const nextReview = (document.getElementById('risk-next-review') as HTMLInputElement).value;

                  if (title && category && description && lastAssessed && nextReview) {
                    if (editingRisk) {
                      setRiskAssessments(riskAssessments.map(r => 
                        r.id === editingRisk.id 
                          ? { ...r, title, category, severity, description, lastAssessed, nextReview }
                          : r
                      ));
                    } else {
                      setRiskAssessments([...riskAssessments, {
                        id: `risk-${Date.now()}`,
                        title,
                        category,
                        severity,
                        description,
                        lastAssessed,
                        nextReview
                      }]);
                    }
                    setShowRiskModal(false);
                    setEditingRisk(null);
                  }
                }}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
              >
                {editingRisk ? 'Update' : 'Add'} Risk Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
