import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  PoundSterling,
  ChevronDown,
  Search,
  LogOut,
  Star,
  ArrowLeft,
  FolderOpen,
} from 'lucide-react';
import { Input } from '@heroui/react';
import { isDemoEmpty } from './demoConfig';
import { DemoId } from './types';

interface DemoContainerProps {
  activeDemo: DemoId;
  onDemoChange: (id: DemoId) => void;
  children: React.ReactNode;
  isEmbedded?: boolean;
}

const MANAGEMENT_IDS: DemoId[] = ['service-users', 'visits', 'medications', 'custom-tasks', 'monitoring-alerts', 'alert-rules', 'absence-requests', 'family-portal'];
const WORKFORCE_IDS: DemoId[] = ['staff', 'teams', 'shift-management', 'attendance'];
const COMPLIANCE_IDS: DemoId[] = ['audit-dashboard', 'compliance-reports', 'incidents', 'training'];
const FINANCE_IDS: DemoId[] = ['invoices', 'payroll', 'visit-cost-types'];
const RESOURCES_IDS: DemoId[] = ['documents', 'policies', 'templates-page', 'reports', 'ppe-stock'];

export const DemoContainer: React.FC<DemoContainerProps> = ({ activeDemo, onDemoChange, children, isEmbedded = false }) => {
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isWorkforceOpen, setIsWorkforceOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const isManagementActive = MANAGEMENT_IDS.includes(activeDemo) || ['scheduling', 'emar'].includes(activeDemo);
  const isWorkforceActive = WORKFORCE_IDS.includes(activeDemo);
  const isComplianceActive = COMPLIANCE_IDS.includes(activeDemo) || activeDemo === 'compliance';
  const isFinanceActive = FINANCE_IDS.includes(activeDemo) || activeDemo === 'finance' || activeDemo === 'payroll';
  const isResourcesActive = RESOURCES_IDS.includes(activeDemo);

  React.useEffect(() => {
    if (isManagementActive) setIsManagementOpen(true);
    if (isWorkforceActive) setIsWorkforceOpen(true);
    if (isComplianceActive) setIsComplianceOpen(true);
    if (isFinanceActive) setIsFinanceOpen(true);
    if (isResourcesActive) setIsResourcesOpen(true);
  }, [activeDemo]);

  return (
    <div className={`bg-[#F4F6F8] flex flex-col md:flex-row text-[#64748B] font-sans text-sm ${
      isEmbedded 
        ? 'w-full h-full rounded-xl border border-slate-200 shadow-xs overflow-hidden' 
        : 'min-h-screen w-full'
    }`}>
      {/* CMS Sidebar */}
      <div className={`w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col ${
        isEmbedded ? 'min-h-0 overflow-hidden' : ''
      }`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <h1 className="font-bold text-slate-800 text-lg">HomeCare CMS</h1>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
            title="Exit Demo"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Demo</span>
          </button>
        </div>

        {/* Sidebar Search */}
        <div className="p-4">
          <Input
            aria-label="Search menu"
            placeholder="Search menu..."
            className="w-full bg-slate-50 border-slate-200 text-sm"
          />
        </div>

        {/* Navigation Menu */}
        <div className={`flex-1 py-2 ${isEmbedded ? 'overflow-y-auto' : ''}`}>
          {/* Dashboard */}
          <div className="mb-2">
            <button
              type="button"
              onClick={() => !isDemoEmpty('dashboard') && onDemoChange('dashboard')}
              aria-disabled={isDemoEmpty('dashboard')}
              tabIndex={isDemoEmpty('dashboard') ? -1 : 0}
              title={isDemoEmpty('dashboard') ? 'Demo coming soon' : undefined}
              className={`w-full px-6 py-3 flex items-center justify-between transition-colors ${
                isDemoEmpty('dashboard')
                  ? 'text-slate-400 cursor-not-allowed'
                  : `hover:bg-slate-50 ${activeDemo === 'dashboard' ? 'bg-blue-50/50 text-[#4370B7] font-medium border-r-2 border-[#4370B7]' : ''}`
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
              <Star className={`w-3 h-3 ${activeDemo === 'dashboard' ? 'fill-[#4370B7] text-[#4370B7]' : 'text-slate-300'}`} />
            </button>
          </div>

          {/* Management */}
          <div className="mb-2">
            <button
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isManagementActive ? 'text-slate-800 font-medium' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Management</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isManagementOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
            <div className={`pl-14 pr-4 space-y-1 ${isManagementOpen ? 'block' : 'hidden'}`}>
              {[
                { id: 'service-users' as DemoId, label: 'Service users' },
                { id: 'scheduling' as DemoId, label: 'Visits' },
                { id: 'emar' as DemoId, label: 'Medications' },
                { id: 'custom-tasks' as DemoId, label: 'Custom Tasks' },
                { id: 'monitoring-alerts' as DemoId, label: 'Monitoring Alerts' },
                { id: 'alert-rules' as DemoId, label: 'Alert Rules' },
                { id: 'absence-requests' as DemoId, label: 'Absence Requests' },
                { id: 'family-portal' as DemoId, label: 'Family Portal' },
              ].map(({ id, label }) => {
                const empty = isDemoEmpty(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => !empty && onDemoChange(id)}
                    aria-disabled={empty}
                    tabIndex={empty ? -1 : 0}
                    title={empty ? 'Demo coming soon' : undefined}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      empty ? 'text-slate-400 cursor-not-allowed' : activeDemo === id ? 'text-[#4370B7] font-medium' : 'hover:text-slate-800'
                    }`}
                  >
                    <span>{label}</span>
                    <Star className={`w-3 h-3 ${activeDemo === id ? 'fill-[#4370B7] text-[#4370B7]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workforce */}
          <div className="mb-2">
            <button onClick={() => setIsWorkforceOpen(!isWorkforceOpen)} className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isWorkforceActive ? 'text-slate-800 font-medium' : ''}`}>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span>Workforce</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isWorkforceOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
            <div className={`pl-14 pr-4 space-y-1 ${isWorkforceOpen ? 'block' : 'hidden'}`}>
              {[
                { id: 'staff' as DemoId, label: 'Staff' },
                { id: 'teams' as DemoId, label: 'Teams' },
                { id: 'shift-management' as DemoId, label: 'Shift Management' },
                { id: 'attendance' as DemoId, label: 'Attendance' },
              ].map(({ id, label }) => {
                const empty = isDemoEmpty(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => !empty && onDemoChange(id)}
                    aria-disabled={empty}
                    tabIndex={empty ? -1 : 0}
                    title={empty ? 'Demo coming soon' : undefined}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      empty ? 'text-slate-400 cursor-not-allowed' : activeDemo === id ? 'text-[#4370B7] font-medium' : 'hover:text-slate-800'
                    }`}
                  >
                    <span>{label}</span>
                    <Star className={`w-3 h-3 ${activeDemo === id ? 'fill-[#4370B7] text-[#4370B7]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compliance & Safety */}
          <div className="mb-2">
            <button onClick={() => setIsComplianceOpen(!isComplianceOpen)} className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isComplianceActive ? 'bg-blue-50/50 text-[#4370B7] font-medium border-r-2 border-[#4370B7]' : ''}`}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Compliance & Safety</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isComplianceOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
            <div className={`pl-14 pr-4 space-y-1 mt-1 ${isComplianceOpen ? 'block' : 'hidden'}`}>
              {[
                { id: 'compliance' as DemoId, label: 'Audit Dashboard' },
                { id: 'compliance-reports' as DemoId, label: 'Compliance Reports' },
                { id: 'incidents' as DemoId, label: 'Incidents' },
                { id: 'training' as DemoId, label: 'Training' },
              ].map(({ id, label }) => {
                const empty = isDemoEmpty(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => !empty && onDemoChange(id)}
                    aria-disabled={empty}
                    tabIndex={empty ? -1 : 0}
                    title={empty ? 'Demo coming soon' : undefined}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      empty ? 'text-slate-400 cursor-not-allowed' : activeDemo === id ? 'text-[#4370B7] font-medium' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{label}</span>
                    <Star className={`w-3 h-3 ${activeDemo === id ? 'fill-[#4370B7] text-[#4370B7]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Finance */}
          <div className="mb-2">
            <button onClick={() => setIsFinanceOpen(!isFinanceOpen)} className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isFinanceActive ? 'bg-blue-50/50 text-[#4370B7] font-medium border-r-2 border-[#4370B7]' : ''}`}>
              <div className="flex items-center gap-3">
                <PoundSterling className="w-5 h-5" />
                <span>Finance</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFinanceOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
            <div className={`pl-14 pr-4 space-y-1 mt-1 ${isFinanceOpen ? 'block' : 'hidden'}`}>
              {[
                { id: 'finance' as DemoId, label: 'Invoices' },
                { id: 'payroll' as DemoId, label: 'Payroll' },
                { id: 'visit-cost-types' as DemoId, label: 'Visit Cost Types' },
              ].map(({ id, label }) => {
                const empty = isDemoEmpty(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => !empty && onDemoChange(id)}
                    aria-disabled={empty}
                    tabIndex={empty ? -1 : 0}
                    title={empty ? 'Demo coming soon' : undefined}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      empty ? 'text-slate-400 cursor-not-allowed' : activeDemo === id ? 'text-[#4370B7] font-medium' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{label}</span>
                    <Star className={`w-3 h-3 ${activeDemo === id ? 'fill-[#4370B7] text-[#4370B7]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resources - Templates here (no Template Builder in sidebar) */}
          <div className="mb-2">
            <button onClick={() => setIsResourcesOpen(!isResourcesOpen)} className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isResourcesActive ? 'text-slate-800 font-medium' : ''}`}>
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5" />
                <span>Resources</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
            <div className={`pl-14 pr-4 space-y-1 mt-1 ${isResourcesOpen ? 'block' : 'hidden'}`}>
              {[
                { id: 'documents' as DemoId, label: 'Documents' },
                { id: 'policies' as DemoId, label: 'Policies' },
                { id: 'templates-page' as DemoId, label: 'Templates' },
                { id: 'reports' as DemoId, label: 'Reports' },
                { id: 'ppe-stock' as DemoId, label: 'PPE Stock' },
              ].map(({ id, label }) => {
                const empty = isDemoEmpty(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => !empty && onDemoChange(id)}
                    aria-disabled={empty}
                    tabIndex={empty ? -1 : 0}
                    title={empty ? 'Demo coming soon' : undefined}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      empty ? 'text-slate-400 cursor-not-allowed' : activeDemo === id ? 'text-[#4370B7] font-medium' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>{label}</span>
                    <Star className={`w-3 h-3 ${activeDemo === id ? 'fill-[#4370B7] text-[#4370B7]' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
              J
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-800 truncate">john</div>
              <div className="text-xs text-slate-500 truncate">Manager</div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#F4F6F8] ${
        isEmbedded ? 'min-h-0 overflow-y-auto overflow-x-hidden' : ''
      }`}>
        {children}
      </div>
    </div>
  );
};
