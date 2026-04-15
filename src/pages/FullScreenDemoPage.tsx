import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../components/demos/DemoContainer';
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
import { ALL_DEMO_IDS, BLANK_DEMO_IDS } from '../components/demos/demoConfig';
import { DemoId } from '../components/demos/types';

export const FullScreenDemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoId>('scheduling');

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

