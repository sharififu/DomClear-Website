import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, PieChart, FileCheck, ChevronRight, Filter, Download } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { COMPLIANCE_AUDITS, INCIDENT_REPORTS } from './mockData';
import { AuditChecklist, IncidentReport } from './types';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

export const ComplianceDemo: React.FC = () => {
  const [audits] = useState<AuditChecklist[]>(COMPLIANCE_AUDITS);
  const [incidents] = useState<IncidentReport[]>(INCIDENT_REPORTS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'audits' | 'incidents'>('dashboard');
  const tour = useDemoTour('compliance');

  const handleReset = () => {
    setActiveTab('dashboard');
  };

  const overallScore = Math.round(audits.reduce((sum, a) => sum + a.score, 0) / audits.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'non-compliant': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader 
        title="Compliance" 
        subtitle="Compliance & Safety"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
      />
      <DemoTour
        demoId="compliance"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div className="p-6 space-y-6 flex-1 flex flex-col min-h-0">
        {/* Header & Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex bg-slate-200 rounded-sm p-1" data-tour="compliance-tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('audits')}
              className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-all ${activeTab === 'audits' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Audits
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-all ${activeTab === 'incidents' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Incidents
            </button>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-tour="compliance-metrics">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-slate-700">Overall Score</h3>
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-4xl font-bold text-slate-900">{overallScore}%</div>
                      <div className="text-sm text-green-600 font-medium">Good</div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${overallScore}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-700">Open Incidents</h3>
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold text-slate-900">
                      {incidents.filter(i => i.status !== 'resolved').length}
                    </div>
                    <div className="text-xs text-slate-400">Requires attention</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                     <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-sm">1 Critical</span>
                     <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-sm">2 High</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-700">Audit Schedule</h3>
                    <FileCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold text-slate-900">2</div>
                    <div className="text-xs text-slate-400">Due this week</div>
                  </div>
                  <div className="mt-4 text-sm text-slate-600">
                    Next: Medication Audit (Tomorrow)
                  </div>
                </div>
              </div>

              {/* CQC Domains */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6" data-tour="compliance-domains">
                <h3 className="font-bold text-slate-800 mb-6">CQC Domain Performance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {['Safe', 'Effective', 'Caring', 'Responsive', 'Well-led'].map((domain, i) => (
                    <div key={domain} className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="relative w-20 h-20 mb-3">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={i % 2 === 0 ? '#3B82F6' : '#10B981'}
                            strokeWidth="3"
                            strokeDasharray={`${90 + i}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800">
                          {90 + i}%
                        </div>
                      </div>
                      <div className="font-bold text-slate-700 mb-1">{domain}</div>
                      <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Good</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audits' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" data-tour="compliance-table">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Audit Name</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Checked</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Score</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {audits.map(audit => (
                    <tr key={audit.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{audit.title}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-sm text-xs font-medium capitalize">
                          {audit.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-500">{audit.lastChecked}</td>
                      <td className="p-4 text-center font-bold text-slate-800">{audit.score}%</td>
                      <td className="p-4 text-center">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(audit.status)}`}>
                          {audit.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-4">
              {incidents.map(incident => (
                <div key={incident.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                       <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{incident.type}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{incident.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 pl-1">{incident.description}</p>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold text-slate-600">SJ</div>
                      <span className="text-xs text-slate-500">Reported by Sarah J.</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className={`
                        inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                        ${incident.status === 'resolved' ? 'bg-green-50 text-green-700' : 
                          incident.status === 'investigating' ? 'bg-blue-50 text-blue-700' : 
                          'bg-amber-50 text-amber-700'}
                      `}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
