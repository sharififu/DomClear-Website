import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { DemoContainer } from '../components/demos/DemoContainer';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';
import { SchedulingDemo } from '../components/demos/SchedulingDemo';
import { CarePlanDemo } from '../components/demos/CarePlanDemo';
import { FinanceDemo } from '../components/demos/FinanceDemo';
import { PayrollDemo } from '../components/demos/PayrollDemo';
import { ComplianceDemo } from '../components/demos/ComplianceDemo';
import { EMARDemo } from '../components/demos/EMARDemo';
import { PatientMedicationsDemo } from '../components/demos/PatientMedicationsDemo';
import { TemplateBuilderDemo } from '../components/demos/TemplateBuilderDemo';
import { FormTemplatesDemo } from '../components/demos/FormTemplatesDemo';
import { TemplatesPageDemo } from '../components/demos/TemplatesPageDemo';
import { BlankDemo } from '../components/demos/BlankDemo';
import { ALL_DEMO_IDS, BLANK_DEMO_IDS, QUICK_NAV_DEMOS } from '../components/demos/demoConfig';
import { DemoId } from '../components/demos/types';
import {
  Maximize2,
  LayoutDashboard,
  Calendar,
  Pill,
  ShieldCheck,
  PoundSterling,
  Play,
} from 'lucide-react';

export const DemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoId>('scheduling');
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (ALL_DEMO_IDS.includes(hash as DemoId)) {
        setActiveDemo(hash as DemoId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleDemoChange = (id: DemoId) => {
    setActiveDemo(id);
    window.history.pushState(null, '', `#${id}`);
  };

  const openDemo = useCallback((id?: DemoId) => {
    if (id) setActiveDemo(id);
    setDemoOpen(true);
  }, []);

  const closeDemo = useCallback(() => {
    setDemoOpen(false);
  }, []);

  useEffect(() => {
    if (!demoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDemo();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [demoOpen, closeDemo]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (demoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  const renderActiveDemo = () => {
    if (BLANK_DEMO_IDS.includes(activeDemo)) {
      return <BlankDemo demoId={activeDemo} onReset={() => handleDemoChange(activeDemo)} />;
    }
    switch (activeDemo) {
      case 'scheduling': return <SchedulingDemo />;
      case 'care-planning': return <CarePlanDemo onReset={() => handleDemoChange('care-planning')} />;
      case 'care-plan': return <CarePlanDemo onReset={() => handleDemoChange('care-plan')} />;
      case 'care-plan-demo': return <CarePlanDemo onReset={() => handleDemoChange('care-plan-demo')} />;
      case 'finance': return <FinanceDemo />;
      case 'payroll': return <PayrollDemo />;
      case 'compliance': return <ComplianceDemo />;
      case 'emar': return <EMARDemo />;
      case 'patient-medications':
        return <PatientMedicationsDemo />;
      case 'patient-medications-mar':
        return <PatientMedicationsDemo initialPatientTab="MAR Chart" />;
      case 'template-builder': return <TemplateBuilderDemo onReset={() => handleDemoChange('template-builder')} />;
      case 'form-templates': return <FormTemplatesDemo onReset={() => handleDemoChange('form-templates')} />;
      case 'templates-page': return (
        <TemplatesPageDemo
          onReset={() => handleDemoChange('templates-page')}
          onOpenTemplateBuilder={() => handleDemoChange('template-builder')}
        />
      );
      default: return <SchedulingDemo />;
    }
  };

  const featureHighlights = [
    { icon: Calendar, label: 'Shift Scheduling', id: 'scheduling' as DemoId },
    { icon: Pill, label: 'eMAR', id: 'emar' as DemoId },
    { icon: LayoutDashboard, label: 'Care Planning', id: 'care-planning' as DemoId },
    { icon: ShieldCheck, label: 'Compliance', id: 'compliance' as DemoId },
    { icon: PoundSterling, label: 'Finance', id: 'finance' as DemoId },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 bg-[#FAFBFC]" style={{ paddingTop: '88px' }}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Try the home care management app
          </h1>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto mb-6">
            Explore DomiClear with interactive demos: scheduling, eMAR, compliance and more. Built for UK care agencies — no login required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
            <a
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4370B7] text-white rounded-lg font-semibold text-sm hover:bg-[#365a9a] transition-colors"
            >
              Start free trial
            </a>
            <a
              href="/book-demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Book a demo
            </a>
          </div>
          <p className="text-sm text-[#4B5563]">No card required · UK support · Cancel anytime</p>
        </div>

        {/* Preview card */}
        <div
          id="interactive-demo"
          className="relative rounded-2xl border border-[rgba(20,30,60,0.10)] shadow-lg overflow-hidden cursor-pointer group bg-white"
          onClick={() => openDemo()}
          role="button"
          tabIndex={0}
          aria-label="Launch interactive demo"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openDemo(); }}
        >
          {/* Fake browser chrome */}
          <div className="bg-[#F1F3F5] border-b border-slate-200 px-4 py-3 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-xs text-slate-400 text-center max-w-xs mx-auto">
                app.domi-clear.com/cms
              </div>
            </div>
          </div>

          {/* App preview mockup */}
          <div className="bg-[#F4F6F8] flex min-h-[380px] md:min-h-[460px]">
            {/* Sidebar preview */}
            <div className="hidden sm:flex w-52 bg-white border-r border-slate-200 flex-col flex-shrink-0 py-4">
              <div className="px-5 mb-3">
                <span className="font-bold text-slate-800 text-base">DomiClear</span>
              </div>
              <div className="px-4 mb-3">
                <div className="h-8 bg-slate-100 rounded-lg" />
              </div>
              {['Dashboard', 'Management', 'Workforce', 'Compliance & Safety', 'Finance', 'Resources'].map((item, i) => (
                <div
                  key={item}
                  className={`mx-2 px-3 py-2 rounded-lg mb-0.5 flex items-center gap-2 text-sm ${
                    i === 1 ? 'bg-blue-50 text-[#4370B7] font-medium' : 'text-slate-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-sm ${i === 1 ? 'bg-[#4370B7]/20' : 'bg-slate-200'}`} />
                  {item}
                </div>
              ))}
            </div>

            {/* Main area preview */}
            <div className="flex-1 p-5 flex flex-col gap-4">
              {/* Toolbar mockup */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="h-8 w-24 bg-[#4370B7] rounded-lg opacity-90" />
                <div className="h-8 w-20 bg-slate-200 rounded-lg" />
                <div className="h-8 w-20 bg-slate-200 rounded-lg" />
                <div className="h-8 w-24 bg-amber-400/70 rounded-lg ml-auto hidden sm:block" />
                <div className="h-8 w-28 bg-emerald-500/80 rounded-lg" />
              </div>

              {/* Calendar/roster mockup */}
              <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
                  <div className="h-4 w-28 bg-slate-300 rounded" />
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-4 w-12 bg-slate-200 rounded" />
                    <div className="h-4 w-24 bg-slate-300 rounded font-medium" />
                    <div className="h-4 w-4 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="p-4 grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-7 rounded ${
                        i % 7 === 0 ? 'bg-[#4370B7]/20 border border-[#4370B7]/30' :
                        i % 5 === 0 ? 'bg-emerald-100 border border-emerald-200' :
                        i % 3 === 0 ? 'bg-amber-50 border border-amber-200' :
                        'bg-slate-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hover overlay with launch CTA */}
          <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
            <div className="bg-white rounded-2xl px-8 py-6 flex flex-col items-center gap-3 shadow-2xl max-w-xs text-center">
              <div className="w-12 h-12 rounded-full bg-[#4370B7] flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">Launch Interactive Demo</p>
                <p className="text-slate-500 text-sm mt-1">Full-screen · No login required</p>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Opens in full screen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick nav pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <span className="text-sm text-slate-500 mr-1">Jump to:</span>
          {QUICK_NAV_DEMOS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => openDemo(id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeDemo === id && demoOpen
                  ? 'bg-[#4370B7] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Feature highlights */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {featureHighlights.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => openDemo(id)}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#4370B7]/40 hover:bg-blue-50/40 transition-colors group/card"
            >
              <div className="w-9 h-9 rounded-lg bg-[#4370B7]/10 flex items-center justify-center group-hover/card:bg-[#4370B7]/20 transition-colors">
                <Icon className="w-5 h-5 text-[#4370B7]" />
              </div>
              <span className="text-xs font-medium text-slate-700">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen demo modal */}
      {demoOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive demo"
        >
          <DemoContainer
            activeDemo={activeDemo}
            onDemoChange={handleDemoChange}
            isEmbedded={false}
            onExit={closeDemo}
          >
            {renderActiveDemo()}
          </DemoContainer>
        </div>,
        document.body
      )}
    </div>
  );
};
