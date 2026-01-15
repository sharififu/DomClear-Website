import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { 
  FileText, 
  Shield, 
  ListChecks, 
  Brain, 
  Users, 
  Settings, 
  Calendar 
} from 'lucide-react';
import { FormTemplatesDemo } from './FormTemplatesDemo';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

type TemplateType = 'form_templates' | 'outcome' | 'risk' | 'service' | 'mental_capacity' | 'staff_supervision' | 'visit_templates';

export const TemplatesPageDemo: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [activeTab, setActiveTab] = useState<TemplateType>('form_templates');
  const tour = useDemoTour('templates-page');

  const tabs = [
    { id: 'form_templates' as TemplateType, label: 'Form Templates', icon: Settings },
    { id: 'outcome' as TemplateType, label: 'Outcome', icon: FileText },
    { id: 'risk' as TemplateType, label: 'Risk Assessment', icon: Shield },
    { id: 'service' as TemplateType, label: 'Service Review', icon: ListChecks },
    { id: 'mental_capacity' as TemplateType, label: 'Mental Capacity', icon: Brain },
    { id: 'staff_supervision' as TemplateType, label: 'Staff Supervisions', icon: Users },
    { id: 'visit_templates' as TemplateType, label: 'Visit Templates', icon: Calendar },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'form_templates':
        return <FormTemplatesDemo onReset={onReset} enableTour={false} />;
      case 'outcome':
        return (
          <div className="flex flex-col h-full bg-[#F4F6F8]">
            <DemoHeader title="Outcome Templates" subtitle="Templates" onReset={onReset} />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Outcome Templates</h3>
                <p className="text-sm text-slate-500">Outcome template management interface</p>
              </div>
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="flex flex-col h-full bg-[#F4F6F8]">
            <DemoHeader title="Risk Assessment Templates" subtitle="Templates" onReset={onReset} />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Risk Assessment Templates</h3>
                <p className="text-sm text-slate-500">Risk assessment template management interface</p>
              </div>
            </div>
          </div>
        );
      case 'service':
        return (
          <div className="flex flex-col h-full bg-[#F4F6F8]">
            <DemoHeader title="Service Review Templates" subtitle="Templates" onReset={onReset} />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ListChecks className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Service Review Templates</h3>
                <p className="text-sm text-slate-500">Service review template management interface</p>
              </div>
            </div>
          </div>
        );
      case 'mental_capacity':
        return (
          <div className="flex flex-col h-full bg-[#F4F6F8]">
            <DemoHeader title="Mental Capacity Templates" subtitle="Templates" onReset={onReset} />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Brain className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Mental Capacity Templates</h3>
                <p className="text-sm text-slate-500">Mental capacity template management interface</p>
              </div>
            </div>
          </div>
        );
      case 'staff_supervision':
        return (
          <div className="flex flex-col h-full bg-[#F4F6F8]">
            <DemoHeader title="Staff Supervision Templates" subtitle="Templates" onReset={onReset} />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Staff Supervision Templates</h3>
                <p className="text-sm text-slate-500">Staff supervision template management interface</p>
              </div>
            </div>
          </div>
        );
      case 'visit_templates':
        return (
          <div className="flex flex-col h-full bg-[#F4F6F8]">
            <DemoHeader title="Visit Templates" subtitle="Templates" onReset={onReset} />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Visit Templates</h3>
                <p className="text-sm text-slate-500">Visit template management interface</p>
              </div>
            </div>
          </div>
        );
      default:
        return <FormTemplatesDemo onReset={onReset} enableTour={false} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F4F6F8] overflow-hidden">
      <div className="bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex overflow-x-auto flex-1" data-tour="templates-library-header">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 mx-1 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-700'}`} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <TourButton onStart={tour.startTour} hasCompleted={tour.hasCompleted} />
        </div>
      </div>

      <DemoTour
        demoId="templates-page"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      {/* Content */}
      <div className="flex-1 overflow-hidden" data-tour="templates-library-grid">
        {renderContent()}
      </div>
    </div>
  );
};

