import React, { useState, useEffect } from 'react';
import { DemoContainer } from '../components/demos/DemoContainer';
import { SchedulingDemo } from '../components/demos/SchedulingDemo';
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
import { BlankDemo } from '../components/demos/BlankDemo';
import { DemoId } from '../components/demos/types';

const ALL_DEMO_IDS: DemoId[] = [
  'dashboard', 'scheduling', 'care-planning', 'care-plan', 'care-plan-demo', 'finance', 'payroll',
  'compliance', 'emar', 'patient-medications', 'template-builder', 'form-templates', 'templates-page',
  'service-users', 'custom-tasks', 'monitoring-alerts', 'alert-rules', 'absence-requests', 'family-portal',
  'staff', 'teams', 'shift-management', 'attendance', 'compliance-reports', 'incidents', 'training',
  'visit-cost-types', 'documents', 'policies', 'reports', 'ppe-stock',
];

const BLANK_DEMO_IDS: DemoId[] = [
  'service-users', 'custom-tasks', 'monitoring-alerts', 'alert-rules', 'absence-requests', 'family-portal',
  'staff', 'teams', 'shift-management', 'attendance', 'compliance-reports', 'incidents', 'training',
  'visit-cost-types', 'documents', 'policies', 'reports', 'ppe-stock',
];

export const FullScreenDemoPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoId>('dashboard');

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
      case 'templates-page': return (
        <TemplatesPageDemo
          onReset={() => handleDemoChange('templates-page')}
          onOpenTemplateBuilder={() => handleDemoChange('template-builder')}
        />
      );
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

