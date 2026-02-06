import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Type, CheckSquare, Calendar, Eye, LayoutTemplate, ChevronLeft, Save } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { Button } from '../Button';
import { FORM_TEMPLATES } from './mockData';
import { FormField, FormTemplate } from './types';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

export const CarePlanningDemo: React.FC = () => {
  const [templates] = useState<FormTemplate[]>(FORM_TEMPLATES);
  const [activeTemplateId, setActiveTemplateId] = useState<string>(FORM_TEMPLATES[0].id);
  const [activeFields, setActiveFields] = useState<FormField[]>(FORM_TEMPLATES[0].fields);
  const [viewMode, setViewMode] = useState<'build' | 'preview'>('build');
  const tour = useDemoTour('care-planning');

  const handleReset = () => {
    setActiveTemplateId(FORM_TEMPLATES[0].id);
    setActiveFields(FORM_TEMPLATES[0].fields);
    setViewMode('build');
  };

  const handleTemplateChange = (id: string) => {
    setActiveTemplateId(id);
    const template = templates.find(t => t.id === id);
    if (template) {
      setActiveFields(template.fields);
    }
  };

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `f${Date.now()}`,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      required: false,
      placeholder: 'Enter value...',
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined
    };
    setActiveFields([...activeFields, newField]);
  };

  const removeField = (id: string) => {
    setActiveFields(activeFields.filter(f => f.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader 
        title="Care Planning" 
        subtitle="Form Builder"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="care-planning-header"
      />
      <DemoTour
        demoId="care-planning"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div className="p-6 space-y-6 flex-1 flex flex-col min-h-0">
        {/* Toolbar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {templates.find(t => t.id === activeTemplateId)?.name}
              </h2>
              <p className="text-xs text-slate-500">Last edited just now</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 rounded-sm p-1">
              <button 
                onClick={() => setViewMode('build')}
                className={`px-4 py-1.5 rounded-sm text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'build' ? 'bg-white text-[#4370B7] shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutTemplate className="w-4 h-4" /> Build
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={`px-4 py-1.5 rounded-sm text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-white text-[#4370B7] shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
            </div>
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            <button className="px-4 py-2 bg-[#4370B7] text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-600 shadow-xs">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Sidebar / Toolbox */}
          {viewMode === 'build' && (
            <div className="w-64 flex-shrink-0 space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4" data-tour="care-planning-template-picker">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Templates
                </h3>
                <select 
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                  value={activeTemplateId}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4" data-tour="care-planning-components">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Form Components
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => addField('text')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group bg-slate-50"
                  >
                    <div className="bg-white p-1.5 rounded-sm border border-slate-200 group-hover:border-blue-200 text-slate-500 group-hover:text-blue-500">
                      <Type className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Text Input</span>
                    <Plus className="w-3 h-3 ml-auto text-slate-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100" />
                  </button>

                  <button 
                    onClick={() => addField('select')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group bg-slate-50"
                  >
                    <div className="bg-white p-1.5 rounded-sm border border-slate-200 group-hover:border-blue-200 text-slate-500 group-hover:text-blue-500">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Dropdown / Check</span>
                    <Plus className="w-3 h-3 ml-auto text-slate-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100" />
                  </button>

                  <button 
                    onClick={() => addField('date')}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group bg-slate-50"
                  >
                    <div className="bg-white p-1.5 rounded-sm border border-slate-200 group-hover:border-blue-200 text-slate-500 group-hover:text-blue-500">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">Date Picker</span>
                    <Plus className="w-3 h-3 ml-auto text-slate-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 bg-white rounded-lg border border-slate-200 shadow-xs overflow-y-auto" data-tour="care-planning-canvas">
            <div className="max-w-3xl mx-auto p-8 min-h-[600px]">
              <div className="mb-8 pb-6 border-b border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                  {templates.find(t => t.id === activeTemplateId)?.name}
                </h1>
                <p className="text-slate-500">
                  Please complete all sections below. Fields marked with <span className="text-red-500">*</span> are mandatory.
                </p>
              </div>

              <div className="space-y-6">
                {activeFields.map((field, index) => (
                  <div 
                    key={field.id} 
                    className={`
                      relative group p-6 rounded-xl transition-all
                      ${viewMode === 'build' ? 'hover:bg-slate-50 border-2 border-transparent hover:border-blue-100' : ''}
                    `}
                  >
                    {viewMode === 'build' && (
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity z-10">
                        <button 
                          onClick={() => removeField(field.id)}
                          className="p-2 text-red-500 bg-white border border-red-100 hover:bg-red-50 rounded-lg shadow-xs"
                          title="Remove field"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="cursor-move p-2 text-slate-400 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-xs">
                          <GripVertical className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    <label className="block text-sm font-semibold text-slate-700 mb-2.5">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === 'text' && (
                      <input 
                        type="text" 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                        placeholder={field.placeholder}
                        disabled={viewMode === 'build'}
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all min-h-[120px] resize-y"
                        placeholder={field.placeholder}
                        disabled={viewMode === 'build'}
                      />
                    )}

                    {field.type === 'select' && (
                      <select 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                        disabled={viewMode === 'build'}
                      >
                        <option value="">Select an option...</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {field.type === 'date' && (
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full p-3 pl-10 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                          disabled={viewMode === 'build'}
                        />
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    )}
                    
                    {(field.type === 'radio' || field.type === 'checkbox') && (
                      <div className="space-y-3">
                        {field.options?.map(opt => (
                          <label key={opt} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                            <input 
                              type={field.type} 
                              name={field.id} 
                              disabled={viewMode === 'build'}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                            />
                            <span className="text-sm text-slate-700 font-medium">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {activeFields.length === 0 && viewMode === 'build' && (
                  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LayoutTemplate className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">Start Building Your Form</h3>
                    <p className="text-slate-500">Add fields from the sidebar to get started.</p>
                  </div>
                )}

                {viewMode === 'preview' && activeFields.length > 0 && (
                  <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                      Submit Assessment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
