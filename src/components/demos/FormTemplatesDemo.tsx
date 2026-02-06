import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  FileText,
  AlertTriangle,
  Shield,
  Target,
  MessageSquare,
  UserCheck,
  X
} from 'lucide-react';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  form_type: string;
  version: number;
  is_active: boolean;
  is_editable: boolean;
  updated_at: string;
  is_global: boolean;
}

const mockTemplates: FormTemplate[] = [
  {
    id: '1',
    name: 'Falls Risk Assessment',
    description: 'Comprehensive assessment for identifying fall risks in elderly patients',
    form_type: 'risk_assessment',
    version: 2,
    is_active: true,
    is_editable: true,
    updated_at: '2024-01-15',
    is_global: false
  },
  {
    id: '2',
    name: 'Medication Review Form',
    description: 'Quarterly medication review and reconciliation',
    form_type: 'medical_risk',
    version: 1,
    is_active: true,
    is_editable: true,
    updated_at: '2024-01-10',
    is_global: true
  },
  {
    id: '3',
    name: 'Service User Feedback',
    description: 'Collect feedback from service users about care quality',
    form_type: 'feedback',
    version: 3,
    is_active: true,
    is_editable: true,
    updated_at: '2024-01-08',
    is_global: false
  },
  {
    id: '4',
    name: 'Staff Supervision Record',
    description: 'Document supervision sessions with care staff',
    form_type: 'staff_supervision',
    version: 1,
    is_active: true,
    is_editable: true,
    updated_at: '2024-01-05',
    is_global: false
  },
  {
    id: '5',
    name: 'Incident Report Form',
    description: 'Standard incident reporting and investigation template',
    form_type: 'incident_report',
    version: 2,
    is_active: true,
    is_editable: true,
    updated_at: '2024-01-03',
    is_global: true
  }
];

export const FormTemplatesDemo: React.FC<{ onReset: () => void; onOpenTemplateBuilder?: () => void; enableTour?: boolean }> = ({ onReset, onOpenTemplateBuilder, enableTour = true }) => {
  const [templates, setTemplates] = useState<FormTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'risk_assessment' | 'medical_risk' | 'service_review' | 'feedback' | 'staff_supervision' | 'incident_report' | 'care_plan' | 'custom'>('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<FormTemplate | null>(null);
  const tour = enableTour ? useDemoTour('form-templates') : null;

  const getFormTypeIcon = (formType: string) => {
    switch (formType) {
      case 'risk_assessment':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case 'medical_risk':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'service_review':
        return <Target className="w-5 h-5 text-blue-500" />;
      case 'feedback':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'staff_supervision':
        return <UserCheck className="w-5 h-5 text-blue-500" />;
      case 'incident_report':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'care_plan':
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  const getFormTypeLabel = (formType: string) => {
    switch (formType) {
      case 'risk_assessment':
        return 'Risk Assessment';
      case 'medical_risk':
        return 'Medical Risk';
      case 'service_review':
        return 'Service Review';
      case 'feedback':
        return 'Feedback';
      case 'staff_supervision':
        return 'Staff Supervision';
      case 'incident_report':
        return 'Incident Report';
      case 'care_plan':
        return 'Care Plan';
      case 'custom':
        return 'Custom';
      default:
        return formType;
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || template.form_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteTemplate = (template: FormTemplate) => {
    setTemplateToDelete(template);
    setShowDeleteModal(true);
  };

  const confirmDeleteTemplate = () => {
    if (!templateToDelete) return;
    setTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
    setShowDeleteModal(false);
    setTemplateToDelete(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F4F6F8] overflow-hidden">
      <DemoHeader 
        title="Custom Form Templates" 
        subtitle="Templates"
        onReset={onReset}
        extraActions={
          tour ? (
            <TourButton
              onStart={tour.startTour}
              hasCompleted={tour.hasCompleted}
            />
          ) : undefined
        }
        tourAnchorId={tour ? 'form-templates-header' : undefined}
      />
      {tour && (
        <DemoTour
          demoId="form-templates"
          run={tour.run}
          stepIndex={tour.stepIndex}
          onStepChange={tour.setStepIndex}
          onComplete={tour.markCompleted}
        />
      )}
      
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Custom Form Templates
            </h1>
            <p className="text-base text-slate-600">
              Create and manage reusable form templates for assessments, reviews, and feedback
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenTemplateBuilder ?? undefined}
            className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
            data-tour="templates-library-actions"
          >
            <Plus className="w-5 h-5" />
            <span>Create Template</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4" data-tour="form-templates-toolbox">
          <div className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-lg">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-base text-slate-900 outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Types
            </button>
            {['risk_assessment', 'medical_risk', 'service_review', 'feedback', 'staff_supervision', 'incident_report', 'care_plan', 'custom'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {getFormTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20" data-tour="form-templates-canvas">
            <FileText className="w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              No templates found
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {searchQuery || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first form template to get started'
              }
            </p>
            {!searchQuery && filterType === 'all' && (
              <button
                type="button"
                onClick={onOpenTemplateBuilder ?? undefined}
                className="flex items-center gap-2 px-5 py-3 bg-blue-500 text-white rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Template</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4" data-tour="form-templates-canvas">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      {getFormTypeIcon(template.form_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-slate-900 mb-1 truncate">
                        {template.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2">
                        {getFormTypeLabel(template.form_type)}
                      </p>
                      {template.description && (
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {template.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Eye className="w-4 h-4 text-slate-500" />
                    </button>
                    <button className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Edit className="w-4 h-4 text-slate-500" />
                    </button>
                    <button className="w-8 h-8 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                      <Copy className="w-4 h-4 text-slate-500" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTemplate(template)}
                      className="w-8 h-8 rounded-md bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      v{template.version}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {template.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.is_global
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {template.is_global ? 'Global' : 'Organization'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Updated {new Date(template.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && templateToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Trash2 className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Delete Template
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-red-700 mb-1">
                    Are you sure you want to delete this template?
                  </h4>
                  <p className="text-sm text-red-600 mb-2">
                    This action cannot be undone. The template "{templateToDelete.name}" will be permanently removed from the system.
                  </p>
                  <p className="text-xs text-red-600 italic">
                    Note: If this template is currently in use by forms, the deletion may fail.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-200">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium text-sm hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Template</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

