import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  PoundSterling, 
  FileBarChart, 
  ChevronDown,
  ChevronRight,
  Search,
  LogOut,
  Settings,
  Star,
  User,
  PenTool,
  FolderOpen,
  X,
  ArrowLeft
} from 'lucide-react';
import { DemoId } from './types';

interface DemoContainerProps {
  activeDemo: DemoId;
  onDemoChange: (id: DemoId) => void;
  children: React.ReactNode;
  isEmbedded?: boolean;
}

export const DemoContainer: React.FC<DemoContainerProps> = ({ activeDemo, onDemoChange, children, isEmbedded = false }) => {
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);

  // Helper to check if a section is active based on the active demo
  const isManagementActive = ['scheduling', 'care-planning', 'emar', 'template-builder', 'templates-page'].includes(activeDemo);
  const isPatientActive = ['patient-medications', 'care-plan'].includes(activeDemo);
  const isComplianceActive = activeDemo === 'compliance';
  const isFinanceActive = activeDemo === 'finance' || activeDemo === 'payroll';
  const isDashboardActive = activeDemo === 'dashboard';

  // Auto-open sections when their demo is active
  React.useEffect(() => {
    if (isManagementActive) setIsManagementOpen(true);
    if (isPatientActive) setIsPatientOpen(true);
    if (isComplianceActive) setIsComplianceOpen(true);
    if (isFinanceActive) setIsFinanceOpen(true);
  }, [activeDemo]);

  return (
    <div className={`bg-[#F4F6F8] flex flex-col md:flex-row text-[#64748B] font-sans text-sm ${
      isEmbedded 
        ? 'w-full h-full rounded-xl border border-slate-200 shadow-sm overflow-hidden' 
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
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search menu..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className={`flex-1 py-2 ${isEmbedded ? 'overflow-y-auto' : ''}`}>
          {/* Dashboard */}
          <div className="mb-2">
            <button 
              onClick={() => onDemoChange('dashboard')}
              className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                activeDemo === 'dashboard' ? 'bg-blue-50/50 text-[#1a86f0] font-medium border-r-2 border-[#1a86f0]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </div>
              <Star className={`w-3 h-3 ${activeDemo === 'dashboard' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
            </button>
          </div>

          {/* Management Section */}
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
            
            {/* Submenu */}
            <div className={`pl-14 pr-4 space-y-1 ${isManagementOpen ? 'block' : 'hidden'}`}>
              <button 
                onClick={() => onDemoChange('scheduling')}
                className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'scheduling' ? 'text-[#1a86f0] font-medium' : 'hover:text-slate-800'}`}
              >
                <span>Schedule & Rota Planning</span>
                <Star className={`w-3 h-3 ${activeDemo === 'scheduling' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
              </button>
              <button 
                onClick={() => onDemoChange('template-builder')}
                className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'template-builder' ? 'text-[#1a86f0] font-medium' : 'hover:text-slate-800'}`}
              >
                <span>Template Builder</span>
                <Star className={`w-3 h-3 ${activeDemo === 'template-builder' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
              </button>
              <button 
                onClick={() => onDemoChange('templates-page')}
                className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'templates-page' ? 'text-[#1a86f0] font-medium' : 'hover:text-slate-800'}`}
              >
                <span>Templates</span>
                <Star className={`w-3 h-3 ${activeDemo === 'templates-page' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
              </button>
              <button 
                onClick={() => onDemoChange('emar')}
                className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'emar' ? 'text-[#1a86f0] font-medium' : 'hover:text-slate-800'}`}
              >
                <span>Medication</span>
                <Star className={`w-3 h-3 ${activeDemo === 'emar' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
              </button>
            </div>
          </div>

          {/* Patient Section */}
          <div className="mb-2">
            <button 
              onClick={() => setIsPatientOpen(!isPatientOpen)}
              className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isPatientActive ? 'text-slate-800 font-medium' : ''}`}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span>Patient</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isPatientOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>
            
            {/* Submenu */}
            <div className={`pl-14 pr-4 space-y-1 ${isPatientOpen ? 'block' : 'hidden'}`}>
              <button 
                onClick={() => onDemoChange('care-plan')}
                className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'care-plan' ? 'text-[#1a86f0] font-medium' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <span>Patient Care Plan</span>
                <Star className={`w-3 h-3 ${activeDemo === 'care-plan' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
              </button>
              <button 
                onClick={() => onDemoChange('patient-medications')}
                className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'patient-medications' ? 'text-[#1a86f0] font-medium' : 'text-slate-500 hover:text-slate-800'}`}
              >
                <span>Patient Profile</span>
                <Star className={`w-3 h-3 ${activeDemo === 'patient-medications' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
              </button>
            </div>
          </div>

          {/* Compliance Section */}
          <div className="mb-2">
             <button 
              onClick={() => {
                onDemoChange('compliance');
                setIsComplianceOpen(!isComplianceOpen);
              }}
              className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isComplianceActive ? 'bg-blue-50/50 text-[#1a86f0] font-medium border-r-2 border-[#1a86f0]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Compliance & Safety</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isComplianceOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>

            <div className={`pl-14 pr-4 space-y-1 mt-1 ${isComplianceOpen ? 'block' : 'hidden'}`}>
               <button 
                 onClick={() => onDemoChange('compliance')}
                 className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'compliance' ? 'text-[#1a86f0] font-medium' : 'text-slate-500 hover:text-slate-800'}`}
               >
                  <span>Audit Dashboard</span>
                  <Star className={`w-3 h-3 ${activeDemo === 'compliance' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
               </button>
               <button 
                 onClick={() => onDemoChange('compliance')}
                 className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'compliance' ? 'text-[#1a86f0] font-medium' : 'text-slate-500 hover:text-slate-800'}`}
               >
                  <span>Incidents</span>
                  <Star className={`w-3 h-3 ${activeDemo === 'compliance' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
               </button>
            </div>
          </div>

          {/* Finance Section */}
          <div className="mb-2">
            <button 
              className={`w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors ${isFinanceActive ? 'bg-blue-50/50 text-[#1a86f0] font-medium border-r-2 border-[#1a86f0]' : ''}`}
              onClick={() => {
                onDemoChange('finance');
                setIsFinanceOpen(!isFinanceOpen);
              }}
            >
              <div className="flex items-center gap-3">
                <PoundSterling className="w-5 h-5" />
                <span>Finance</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFinanceOpen ? 'rotate-0' : '-rotate-90'}`} />
            </button>

            <div className={`pl-14 pr-4 space-y-1 mt-1 ${isFinanceOpen ? 'block' : 'hidden'}`}>
               <button 
                 onClick={() => onDemoChange('finance')}
                 className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'finance' ? 'text-[#1a86f0] font-medium' : 'text-slate-500 hover:text-slate-800'}`}
               >
                  <span>Invoices</span>
                  <Star className={`w-3 h-3 ${activeDemo === 'finance' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
               </button>
               <button 
                 onClick={() => onDemoChange('payroll')}
                 className={`w-full text-left py-2 flex items-center justify-between ${activeDemo === 'payroll' ? 'text-[#1a86f0] font-medium' : 'text-slate-500 hover:text-slate-800'}`}
               >
                  <span>Payroll</span>
                  <Star className={`w-3 h-3 ${activeDemo === 'payroll' ? 'fill-[#1a86f0] text-[#1a86f0]' : 'text-slate-300'}`} />
               </button>
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
        isEmbedded ? 'min-h-0 overflow-hidden' : ''
      }`}>
        {children}
      </div>
    </div>
  );
};
