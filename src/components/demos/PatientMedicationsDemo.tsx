import React, { useState, useEffect } from 'react';
import { Pill, Search, Eye, Pencil, X, Download, Plus, Clock, Save } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';
import { BodyMapSelector } from './BodyMapSelector';
import { PatientMARDemoTab } from './PatientMARDemoTab';
import { getTourSteps } from './tourSteps';

interface Medication {
  id: string;
  name: string;
  type: 'regular' | 'high-risk';
  indication: string;
  dose: string;
  route: string;
  frequency: string;
}

const PATIENT_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: 'Lithium',
    type: 'high-risk',
    indication: 'test auto',
    dose: 'As prescribed',
    route: 'Oral',
    frequency: 'Once daily'
  }
];

type PatientMedicationsDemoProps = {
  initialPatientTab?: string;
};

/** Patient header tabs that render demo content; others are placeholder labels only. */
const IMPLEMENTED_PATIENT_TABS = new Set(['Medications', 'MAR Chart']);
const DEFAULT_PATIENT_TAB = 'Medications';

export const PatientMedicationsDemo: React.FC<PatientMedicationsDemoProps> = ({
  initialPatientTab = DEFAULT_PATIENT_TAB,
}) => {
  const [medications] = useState<Medication[]>(PATIENT_MEDICATIONS);
  const [activeTab, setActiveTab] = useState<'prescribed' | 'prn'>('prescribed');
  const [patientTab, setPatientTab] = useState<string>(() =>
    IMPLEMENTED_PATIENT_TABS.has(initialPatientTab) ? initialPatientTab : DEFAULT_PATIENT_TAB,
  );
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    medicationId: '1',
    medicationName: 'Lithium',
    route: 'Topical',
    dose: 'Apply thin layer',
    frequency: 'Twice daily',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    times: ['09:00', '21:00'],
    applicationSites: [] as string[],
    notes: 'Apply to affected area as directed'
  });
  const [newTime, setNewTime] = useState('09:00');
  const tour = useDemoTour('patient-medications');

  useEffect(() => {
    if (!tour.run) return;
    const steps = getTourSteps('patient-medications');
    const step = steps[tour.stepIndex];
    if (!step || typeof step.target !== 'string') return;
    if (step.target.includes('patient-mar')) {
      setPatientTab('MAR Chart');
    } else if (
      step.target.includes('patient-medications-table') ||
      step.target.includes('patient-medications-sidebar') ||
      step.target.includes('patient-medications-calendar')
    ) {
      setPatientTab('Medications');
    }
  }, [tour.run, tour.stepIndex]);

  const handleReset = () => {
    setActiveTab('prescribed');
    setPatientTab(DEFAULT_PATIENT_TAB);
    setShowScheduleModal(false);
    setScheduleForm({
      medicationId: '1',
      medicationName: 'Lithium',
      route: 'Topical',
      dose: 'Apply thin layer',
      frequency: 'Twice daily',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      times: ['09:00', '21:00'],
      applicationSites: [],
      notes: 'Apply to affected area as directed'
    });
  };

  const handleAddTime = () => {
    if (newTime && !scheduleForm.times.includes(newTime)) {
      setScheduleForm({
        ...scheduleForm,
        times: [...scheduleForm.times, newTime].sort()
      });
      setNewTime('09:00');
    }
  };

  const handleRemoveTime = (time: string) => {
    setScheduleForm({
      ...scheduleForm,
      times: scheduleForm.times.filter(t => t !== time)
    });
  };

  const handleScheduleSubmit = () => {
    // In a real app, this would save to the database
    console.log('Scheduling medication:', scheduleForm);
    alert(`Medication "${scheduleForm.medicationName}" scheduled successfully!\n\nRoute: ${scheduleForm.route}\nTimes: ${scheduleForm.times.join(', ')}\nApplication Sites: ${scheduleForm.applicationSites.length > 0 ? scheduleForm.applicationSites.join(', ') : 'Not specified'}`);
    setShowScheduleModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader 
        title="Patient Profile" 
        subtitle="yannick yaba"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="patient-medications-header"
      />
      <DemoTour
        demoId="patient-medications"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div
        className="p-6 space-y-4 flex-1 flex flex-col min-h-0 overflow-auto"
        data-tour="patient-medications-body"
      >
        {/* Patient Header */}
        <div
          className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4"
          data-tour="patient-medications-calendar"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#4370B7] flex items-center justify-center text-white font-semibold">
              YY
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">yannick yaba</h2>
              <p className="text-sm text-[#6b7280]">yesy</p>
            </div>
          </div>

          {/* Patient Tabs */}
          <div className="flex gap-2 overflow-x-auto border-b border-[rgba(20,30,60,0.08)]">
            {['Overview', 'Profile', 'Medications', 'MAR Chart', 'Assessments', 'Forms', 'Notes', 'Documents'].map((tab) => {
              const isImplemented = IMPLEMENTED_PATIENT_TABS.has(tab);
              const isActive = isImplemented && patientTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  disabled={!isImplemented}
                  title={!isImplemented ? 'Not available in this demo' : undefined}
                  onClick={() => setPatientTab(tab)}
                  className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:text-[#94a3b8] disabled:opacity-60 ${
                    isActive
                      ? 'border-[#4370B7] text-[#4370B7]'
                      : 'border-transparent text-[#6b7280] enabled:hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAR Chart — full CMS-parity demo (mock data) */}
        {patientTab === 'MAR Chart' && <PatientMARDemoTab />}

        {/* Medication Management Section */}
        {patientTab === 'Medications' && (
          <>
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4" data-tour="patient-medications-table">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-[#4370B7]" />
              <h3 className="text-base font-semibold text-[#0F172A]">Medication Management</h3>
              <span className="text-sm text-[#6b7280]">yannick yaba</span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#4370B7] text-white rounded-lg text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
              <button className="px-4 py-2 bg-white border border-[rgba(20,30,60,0.08)] text-[#6b7280] rounded-lg text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export MAR
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-[rgba(20,30,60,0.08)]">
            <button
              onClick={() => setActiveTab('prescribed')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'prescribed'
                  ? 'border-[#4370B7] text-[#4370B7]'
                  : 'border-transparent text-[#6b7280] hover:text-[#0F172A]'
              }`}
            >
              Prescribed (1)
            </button>
            <button
              onClick={() => setActiveTab('prn')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'prn'
                  ? 'border-[#4370B7] text-[#4370B7]'
                  : 'border-transparent text-[#6b7280] hover:text-[#0F172A]'
              }`}
            >
              PRN (1)
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search medications..."
                className="w-full pl-9 pr-4 py-2 bg-[#f8fafc] border border-[rgba(20,30,60,0.08)] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4370B7]"
              />
            </div>
            <select className="px-3 py-2 bg-[#f8fafc] border border-[rgba(20,30,60,0.08)] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4370B7]">
              <option>All medications</option>
              <option>High Risk</option>
              <option>Regular</option>
            </select>
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 bg-[#e6f7ff] text-[#4370B7] rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-100"
            >
              <Pill className="w-4 h-4" />
              Schedule Existing
            </button>
          </div>

          {/* Medications Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8fafc] border-b border-[rgba(20,30,60,0.08)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase">MEDICATION NAME</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase">DOSE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase">ROUTE</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase">FREQUENCY</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase">INDICATION</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#6b7280] uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(20,30,60,0.08)]">
                {medications.map((med) => (
                  <tr key={med.id} className="hover:bg-[#f8fafc]">
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-sm font-medium text-[#0F172A]">{med.name}</span>
                        {med.type === 'high-risk' && (
                          <div className="mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-red-100 text-red-700">
                              A HIGH RISK
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#6b7280]">{med.dose}</td>
                    <td className="px-4 py-3 text-sm text-[#6b7280]">{med.route}</td>
                    <td className="px-4 py-3 text-sm text-[#6b7280]">{med.frequency}</td>
                    <td className="px-4 py-3 text-sm text-[#6b7280]">{med.indication}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-[#4370B7] hover:bg-blue-50 rounded-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-[#6b7280] hover:bg-gray-50 rounded-sm">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-[#ef4444] hover:bg-red-50 rounded-sm">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MAR Quick View Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"></div>
          <div
            className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4"
            data-tour="patient-medications-sidebar"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-[#0F172A]">MAR Quick View</h4>
              <button className="text-xs text-[#4370B7] hover:underline">View Full MAR</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Pill className="w-4 h-4 text-[#4370B7]" />
                  <span className="text-sm font-medium text-[#0F172A]">yannick yaba - Nov 27, 2025</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <button className="px-3 py-1 text-xs bg-[#f8fafc] text-[#6b7280] rounded-sm">Today</button>
                  <button className="px-3 py-1 text-xs bg-[#4370B7] text-white rounded-sm">Week</button>
                  <button className="px-3 py-1 text-xs bg-[#f8fafc] text-[#6b7280] rounded-sm">Month</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-700">0</p>
                  <p className="text-xs text-green-600">Taken</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-red-700">0</p>
                  <p className="text-xs text-red-600">Refused</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-amber-700">0</p>
                  <p className="text-xs text-amber-600">Missed</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-blue-700">0</p>
                  <p className="text-xs text-blue-600">Total</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(20,30,60,0.08)]">
                <h5 className="text-sm font-medium text-[#0F172A] mb-2">Scheduled Medications for Today</h5>
                <p className="text-xs text-[#6b7280] mb-3">No administrations recorded yet, but 1 medication(s) are scheduled</p>
                
                <div className="bg-[#f8fafc] rounded-lg p-3 border border-[rgba(20,30,60,0.08)]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Lithium</p>
                      <p className="text-xs text-[#6b7280]">As prescribed</p>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-sm text-xs font-medium">Scheduled</span>
                  </div>
                  <div className="space-y-1 text-xs text-[#6b7280] mb-3">
                    <p>Times: 09:00</p>
                    <p>Route: Oral</p>
                  </div>
                  <button className="w-full px-3 py-1.5 bg-red-50 text-red-700 rounded-sm text-xs font-medium hover:bg-red-100">
                    Unschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>

      {/* Medication Scheduling Modal */}
      {showScheduleModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          onClick={() => setShowScheduleModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Schedule Medication</h3>
                <p className="text-sm text-slate-600 mt-1">Schedule {scheduleForm.medicationName} for yannick yaba</p>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1 hover:bg-slate-100 rounded-sm"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Medication Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Pill className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">{scheduleForm.medicationName}</p>
                    <p className="text-sm text-blue-700">Dose: {scheduleForm.dose}</p>
                  </div>
                </div>
              </div>

              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Route of Administration</label>
                <select
                  value={scheduleForm.route}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, route: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Oral">Oral</option>
                  <option value="Topical">Topical</option>
                  <option value="Injection">Injection</option>
                  <option value="Inhalation">Inhalation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Body Map - Only show for Topical */}
              {scheduleForm.route === 'Topical' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Application Site(s)</label>
                  <BodyMapSelector
                    selectedSites={scheduleForm.applicationSites}
                    onSitesChange={(sites) => setScheduleForm({ ...scheduleForm, applicationSites: sites })}
                  />
                </div>
              )}

              {/* Dose */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Dose</label>
                <input
                  type="text"
                  value={scheduleForm.dose}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, dose: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Apply thin layer"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
                <select
                  value={scheduleForm.frequency}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>

              {/* Administration Times */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Administration Times</label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {scheduleForm.times.map((time) => (
                      <span
                        key={time}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm"
                      >
                        <Clock className="w-4 h-4" />
                        {time}
                        <button
                          onClick={() => handleRemoveTime(time)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={handleAddTime}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Time
                    </button>
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={scheduleForm.startDate}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date (Optional)</label>
                  <input
                    type="date"
                    value={scheduleForm.endDate}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Additional instructions or notes..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleSubmit}
                className="px-4 py-2 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Schedule Medication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

