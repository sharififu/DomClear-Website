import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../components/demos/DemoContainer';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';
import { SchedulingDemo } from '../components/demos/SchedulingDemo';
// CarePlanningDemo is deprecated - care-planning now uses CarePlanDemo
import { CarePlanDemo } from '../components/demos/CarePlanDemo';
import { FinanceDemo } from '../components/demos/FinanceDemo';
import { PayrollDemo } from '../components/demos/PayrollDemo';
import { ComplianceDemo } from '../components/demos/ComplianceDemo';
import { EMARDemo } from '../components/demos/EMARDemo';
import { PatientMedicationsDemo } from '../components/demos/PatientMedicationsDemo';
import { DashboardDemo } from '../components/demos/DashboardDemo';
import { TemplateBuilderDemo } from '../components/demos/TemplateBuilderDemo';
import { FormTemplatesDemo } from '../components/demos/FormTemplatesDemo';
import { TemplatesPageDemo } from '../components/demos/TemplatesPageDemo';
import { DemoId } from '../components/demos/types';

export const DemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoId>('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'scheduling', 'care-planning', 'care-plan', 'finance', 'payroll', 'compliance', 'emar', 'patient-medications', 'template-builder', 'form-templates', 'templates-page', 'care-plan-demo'].includes(hash)) {
        setActiveDemo(hash as DemoId);
        const element = document.getElementById('interactive-demo');
        if (element) {
          // Account for fixed navbar (72px) plus some padding
          const navbarHeight = 72;
          const offset = navbarHeight + 16; // 16px padding
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleDemoChange = (id: DemoId) => {
    setActiveDemo(id);
    window.history.pushState(null, '', `#${id}`);
  };

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'dashboard': return <DashboardDemo />;
      case 'scheduling': return <SchedulingDemo />;
      case 'care-planning': return <CarePlanDemo onReset={() => handleDemoChange('care-planning')} />;
      case 'care-plan': return <CarePlanDemo onReset={() => handleDemoChange('care-plan')} />;
      case 'care-plan-demo': return <CarePlanDemo onReset={() => handleDemoChange('care-plan-demo')} />;
      case 'finance': return <FinanceDemo />;
      case 'payroll': return <PayrollDemo />;
      case 'compliance': return <ComplianceDemo />;
      case 'emar': return <EMARDemo />;
      case 'patient-medications': return <PatientMedicationsDemo />;
      case 'template-builder': return <TemplateBuilderDemo onReset={() => handleDemoChange('template-builder')} />;
      case 'form-templates': return <FormTemplatesDemo onReset={() => handleDemoChange('form-templates')} />;
      case 'templates-page': return <TemplatesPageDemo onReset={() => handleDemoChange('templates-page')} />;
      default: return <DashboardDemo />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-[#FAFBFC]" style={{ paddingTop: '88px' }}>
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Interactive Demos
          </h1>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto mb-6">
            Experience the power of DomiClear with our interactive demos. No login required.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a86f0] text-white rounded-lg font-semibold text-sm hover:bg-[#1570d1] transition-colors"
            >
              <span>Start free trial</span>
            </a>
            <span className="text-[#4B5563]">·</span>
            <a
              href="/book-demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              <span>Book a demo</span>
            </a>
          </div>
        </div>

        {/* Demo container */}
        <div className="relative bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] shadow-sm" style={{ height: '900px' }}>
          <DemoContainer activeDemo={activeDemo} onDemoChange={handleDemoChange} isEmbedded={true}>
            {renderActiveDemo()}
          </DemoContainer>
        </div>
      </div>
    </div>
  );
};
