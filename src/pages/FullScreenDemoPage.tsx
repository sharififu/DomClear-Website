import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../components/demos/DemoContainer';
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

export const FullScreenDemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoId>('dashboard');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'scheduling', 'care-planning', 'care-plan', 'finance', 'payroll', 'compliance', 'emar', 'patient-medications', 'template-builder', 'form-templates', 'templates-page', 'care-plan-demo'].includes(hash)) {
        setActiveDemo(hash as DemoId);
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
      case 'care-plan': return <CarePlanDemo />;
      case 'finance': return <FinanceDemo />;
      case 'payroll': return <PayrollDemo />;
      case 'compliance': return <ComplianceDemo />;
      case 'emar': return <EMARDemo />;
      case 'patient-medications': return <PatientMedicationsDemo />;
      case 'template-builder': return <TemplateBuilderDemo onReset={() => handleDemoChange('template-builder')} />;
      case 'form-templates': return <FormTemplatesDemo onReset={() => handleDemoChange('form-templates')} />;
      case 'templates-page': return <TemplatesPageDemo onReset={() => handleDemoChange('templates-page')} />;
      case 'care-plan-demo': return <CarePlanDemo onReset={() => handleDemoChange('care-plan-demo')} />;
      default: return <DashboardDemo />;
    }
  };

  useEffect(() => {
    // Remove any default margins/padding for full screen
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    return () => {
      // Reset on unmount
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <DemoContainer activeDemo={activeDemo} onDemoChange={handleDemoChange} isEmbedded={false}>
        {renderActiveDemo()}
      </DemoContainer>
    </div>
  );
};

