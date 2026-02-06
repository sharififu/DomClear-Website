import React, { useState, useMemo } from 'react';
import { Pill, Search, Eye, Pencil, X, Download, Plus, Calendar, ChevronLeft, ChevronRight, Clock, Save, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { EnhancedVisitScheduler } from './EnhancedVisitScheduler';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';
import { BodyMapSelector } from './BodyMapSelector';

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

interface Visit {
  id: string;
  patient: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  staffCount: number;
}

export const PatientMedicationsDemo: React.FC = () => {
  const [medications] = useState<Medication[]>(PATIENT_MEDICATIONS);
  const [activeTab, setActiveTab] = useState<'prescribed' | 'prn'>('prescribed');
  const [patientTab, setPatientTab] = useState<string>('Visits');
  const [visitView, setVisitView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState<number>(27);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);
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
  const [marRange, setMarRange] = useState<'today' | 'week' | 'month'>('week');
  const [marAnchorDate, setMarAnchorDate] = useState<Date>(new Date());
  const [marJumpToDate, setMarJumpToDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const tour = useDemoTour('patient-medications');

  // Helper functions for month view
  const getMonthDays = useMemo(() => {
    if (marRange !== 'month') return [];
    const year = marAnchorDate.getFullYear();
    const month = marAnchorDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }, [marRange, marAnchorDate]);

  const getMonthWeeks = useMemo(() => {
    if (marRange !== 'month') return [];
    const year = marAnchorDate.getFullYear();
    const month = marAnchorDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }
    
    // Add all days of the month
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      currentWeek.push(new Date(d));
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }
    
    // Fill the last week with empty cells if needed
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  }, [marRange, marAnchorDate]);

  // Mock MAR data
  const mockMARData = useMemo(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
    
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });

    const schedules = [
      {
        id: 'schedule-1',
        medicationId: '1',
        medicationName: 'Lithium',
        dose: 'As prescribed',
        route: 'Oral',
        times: ['09:00', '21:00'],
        startDate: new Date(2025, 10, 1), // Nov 1, 2025
      }
    ];

    // Generate administrations for the current month
    const administrations: Array<{
      medicationId: string;
      date: Date;
      time: string;
      status: 'taken' | 'refused' | 'missed';
      adminBy: string | null;
    }> = [];

    // Add some sample administrations for the current month
    const currentMonth = marAnchorDate.getMonth();
    const currentYear = marAnchorDate.getFullYear();
    const monthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const staffMembers = ['Emma Wilson', 'James Taylor', 'Dave Smith', 'Sarah Johnson'];
    const statuses: Array<'taken' | 'refused' | 'missed'> = ['taken', 'taken', 'taken', 'refused', 'missed'];
    
    // Generate random administrations for about 60% of the month
    for (let day = 1; day <= monthDays; day++) {
      if (Math.random() > 0.4) {
        const date = new Date(currentYear, currentMonth, day);
        const time = Math.random() > 0.5 ? '09:00' : '21:00';
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const adminBy = status === 'taken' ? staffMembers[Math.floor(Math.random() * staffMembers.length)] : null;
        administrations.push({
          medicationId: '1',
          date,
          time,
          status,
          adminBy
        });
      }
    }

    // Also add the week view administrations
    administrations.push(
      { medicationId: '1', date: weekDays[0], time: '09:00', status: 'taken', adminBy: 'Emma Wilson' },
      { medicationId: '1', date: weekDays[0], time: '21:00', status: 'taken', adminBy: 'James Taylor' },
      { medicationId: '1', date: weekDays[1], time: '09:00', status: 'taken', adminBy: 'Emma Wilson' },
      { medicationId: '1', date: weekDays[1], time: '21:00', status: 'refused', adminBy: null },
      { medicationId: '1', date: weekDays[2], time: '09:00', status: 'taken', adminBy: 'Dave Smith' },
      { medicationId: '1', date: weekDays[2], time: '21:00', status: 'missed', adminBy: null },
      { medicationId: '1', date: weekDays[3], time: '09:00', status: 'taken', adminBy: 'Sarah Johnson' },
      { medicationId: '1', date: weekDays[3], time: '21:00', status: 'taken', adminBy: 'Sarah Johnson' },
    );

    return { schedules, administrations, weekDays };
  }, [marAnchorDate]);

  const marStats = useMemo(() => {
    // Filter administrations based on current range
    let filteredAdmins = mockMARData.administrations;
    
    if (marRange === 'today') {
      const todayStr = marAnchorDate.toISOString().split('T')[0];
      filteredAdmins = mockMARData.administrations.filter(a => 
        a.date.toISOString().split('T')[0] === todayStr
      );
    } else if (marRange === 'week') {
      const weekStart = new Date(marAnchorDate);
      weekStart.setDate(marAnchorDate.getDate() - marAnchorDate.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      filteredAdmins = mockMARData.administrations.filter(a => 
        a.date >= weekStart && a.date <= weekEnd
      );
    } else if (marRange === 'month') {
      const monthStart = new Date(marAnchorDate.getFullYear(), marAnchorDate.getMonth(), 1);
      const monthEnd = new Date(marAnchorDate.getFullYear(), marAnchorDate.getMonth() + 1, 0);
      filteredAdmins = mockMARData.administrations.filter(a => 
        a.date >= monthStart && a.date <= monthEnd
      );
    }
    
    const taken = filteredAdmins.filter(a => a.status === 'taken').length;
    const refused = filteredAdmins.filter(a => a.status === 'refused').length;
    const missed = filteredAdmins.filter(a => a.status === 'missed').length;
    const total = filteredAdmins.length;
    
    // Calculate scheduled based on range
    let scheduled = 0;
    if (marRange === 'today') {
      scheduled = mockMARData.schedules.reduce((sum, s) => sum + s.times.length, 0);
    } else if (marRange === 'week') {
      scheduled = mockMARData.schedules.reduce((sum, s) => sum + (s.times.length * 7), 0);
    } else if (marRange === 'month') {
      const daysInMonth = new Date(marAnchorDate.getFullYear(), marAnchorDate.getMonth() + 1, 0).getDate();
      scheduled = mockMARData.schedules.reduce((sum, s) => sum + (s.times.length * daysInMonth), 0);
    }
    
    return { taken, refused, missed, total, scheduled };
  }, [mockMARData, marRange, marAnchorDate]);

  const handleJumpToDate = () => {
    try {
      const date = new Date(marJumpToDate);
      if (!isNaN(date.getTime())) {
        setMarAnchorDate(date);
      }
    } catch (e) {
      console.error('Invalid date:', e);
    }
  };

  const getAdminFor = (medicationId: string, date: Date, time?: string) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockMARData.administrations.find(a => 
      a.medicationId === medicationId && 
      a.date.toISOString().split('T')[0] === dateStr &&
      (!time || a.time === time)
    );
  };

  const getStatusSymbol = (status: string) => {
    switch (status) {
      case 'taken': return { symbol: '✓', color: '#10B981', bgColor: '#D1FAE5', icon: CheckCircle };
      case 'refused': return { symbol: 'R', color: '#EF4444', bgColor: '#FEE2E2', icon: XCircle };
      case 'missed': return { symbol: 'M', color: '#F59E0B', bgColor: '#FEF3C7', icon: AlertCircle };
      default: return { symbol: '—', color: '#D1D5DB', bgColor: '#F9FAFB', icon: null };
    }
  };

  const handleReset = () => {
    setActiveTab('prescribed');
    setPatientTab('Visits');
    setVisitView('calendar');
    setSelectedDate(27);
    setVisits([]);
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

  const handleCreateVisit = (visitData: {
    patient: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number;
    staffCount: number;
  }) => {
    const newVisit: Visit = {
      id: `visit-${Date.now()}`,
      ...visitData
    };
    setVisits([...visits, newVisit]);
  };

  // Calendar data for November 2025
  // November 2025 starts on Saturday (day 0 = Saturday)
  const getDaysInMonth = () => {
    const days: Array<{ day: number; isCurrentMonth: boolean; visits: number }> = [];
    
    // Previous month days (Oct 27-31, faded)
    for (let i = 27; i <= 31; i++) {
      days.push({ day: i, isCurrentMonth: false, visits: 0 });
    }
    
    // November days (1-30)
    for (let day = 1; day <= 30; day++) {
      let visitCount = 0;
      // Count existing visits for this day
      const dayString = `2025-11-${day.toString().padStart(2, '0')}`;
      const dayVisits = visits.filter(v => v.date === dayString);
      visitCount = dayVisits.length;
      // Add default visits for days 24 and 28 if no visits exist
      if (visitCount === 0 && (day === 24 || day === 28)) visitCount = 1;
      days.push({ day, isCurrentMonth: true, visits: visitCount });
    }
    
    return days;
  };
  
  const monthDays = getDaysInMonth();

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

      <div className="p-6 space-y-4 flex-1 flex flex-col min-h-0 overflow-auto">
        {/* Patient Header */}
        <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
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
            {['Overview', 'Profile', 'Visits', 'Medications', 'MAR Chart', 'Assessments', 'Forms', 'Notes', 'Documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setPatientTab(tab)}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                  patientTab === tab
                    ? 'border-[#4370B7] text-[#4370B7]'
                    : 'border-transparent text-[#6b7280] hover:text-[#0F172A]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Visits Section */}
        {patientTab === 'Visits' && (
          <div className="flex-1 flex gap-4 min-h-0">
            {/* Main Calendar View */}
            <div className="flex-1 bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-6 flex flex-col" data-tour="patient-medications-calendar">
              {/* Calendar/List Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setVisitView('calendar')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    visitView === 'calendar'
                      ? 'bg-[#4370B7] text-white'
                      : 'bg-[#f8fafc] text-[#6b7280] hover:bg-[#e5e7eb]'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setVisitView('list')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    visitView === 'list'
                      ? 'bg-[#4370B7] text-white'
                      : 'bg-[#f8fafc] text-[#6b7280] hover:bg-[#e5e7eb]'
                  }`}
                >
                  List
                </button>
              </div>

              {visitView === 'calendar' && (
                <>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <button className="p-2 hover:bg-[#f8fafc] rounded-lg">
                        <ChevronLeft className="w-5 h-5 text-[#6b7280]" />
                      </button>
                      <h3 className="text-lg font-semibold text-[#0F172A]">November 2025</h3>
                      <button className="p-2 hover:bg-[#f8fafc] rounded-lg">
                        <ChevronRight className="w-5 h-5 text-[#6b7280]" />
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-[#f8fafc] text-[#6b7280] rounded-lg text-sm font-medium hover:bg-[#e5e7eb]">
                      Today
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="flex-1">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <div key={day} className="text-center text-xs font-semibold text-[#6b7280] py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-2">
                      {monthDays.map((dateInfo, index) => (
                        <button
                          key={index}
                          onClick={() => dateInfo.isCurrentMonth && setSelectedDate(dateInfo.day)}
                          className={`aspect-square p-2 rounded-lg border-2 transition-all ${
                            !dateInfo.isCurrentMonth
                              ? 'text-[#9ca3af] border-transparent'
                              : selectedDate === dateInfo.day
                              ? 'bg-blue-50 border-[#4370B7] text-[#4370B7]'
                              : 'border-transparent hover:bg-[#f8fafc] text-[#0F172A]'
                          }`}
                        >
                          <div className="flex flex-col items-center h-full">
                            <span className={`text-sm font-medium ${selectedDate === dateInfo.day ? 'text-[#4370B7]' : ''}`}>
                              {dateInfo.day}
                            </span>
                            {dateInfo.isCurrentMonth && dateInfo.visits > 0 && (
                              <>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4370B7] mt-1"></div>
                                <span className="text-xs text-[#6b7280] mt-1">{dateInfo.visits} visit</span>
                              </>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Panel - Visit Details */}
            <div className="w-80 flex-shrink-0 bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-6 flex flex-col" data-tour="patient-medications-sidebar">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-1">
                  Thursday, November 27, 2025
                </h4>
                <p className="text-xs text-[#6b7280]">
                  {visits.filter(v => v.date === `2025-11-${selectedDate.toString().padStart(2, '0')}`).length} visit{visits.filter(v => v.date === `2025-11-${selectedDate.toString().padStart(2, '0')}`).length !== 1 ? 's' : ''}
                </p>
              </div>

              {visits.filter(v => v.date === `2025-11-${selectedDate.toString().padStart(2, '0')}`).length > 0 ? (
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-3">
                    {visits
                      .filter(v => v.date === `2025-11-${selectedDate.toString().padStart(2, '0')}`)
                      .map((visit) => (
                        <div key={visit.id} className="bg-[#f8fafc] rounded-lg p-3 border border-[rgba(20,30,60,0.08)]">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-sm font-medium text-[#0F172A]">{visit.patient}</p>
                              <p className="text-xs text-[#6b7280] mt-1">
                                {visit.startTime} - {visit.endTime} ({visit.duration} min)
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                            <span>{visit.staffCount} staff member{visit.staffCount !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => setIsSchedulerOpen(true)}
                    className="w-full mt-4 px-4 py-2 bg-[#4370B7] text-white rounded-lg text-sm font-medium hover:bg-[#365a9a]"
                  >
                    Schedule Another Visit
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <Calendar className="w-16 h-16 text-[#9ca3af] mb-4" />
                  <p className="text-sm text-[#6b7280] mb-6">No visits scheduled for Nov 27, 2025</p>
                  <button
                    onClick={() => setIsSchedulerOpen(true)}
                    className="px-4 py-2 bg-[#4370B7] text-white rounded-lg text-sm font-medium hover:bg-[#365a9a]"
                  >
                    Schedule Visit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAR Chart Section */}
        {patientTab === 'MAR Chart' && (
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">MAR Chart</h3>
                <p className="text-sm text-[#6b7280] mt-1">Medication Administration Record for yannick yaba</p>
              </div>
              <button className="px-4 py-2 bg-white border border-[rgba(20,30,60,0.08)] text-[#6b7280] rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#f8fafc]">
                <Download className="w-4 h-4" />
                Export MAR
              </button>
            </div>

            {/* Patient Info */}
            <div className="flex gap-6 text-sm text-[#6b7280] border-b border-[rgba(20,30,60,0.08)] pb-4">
              <span>Patient: yannick yaba</span>
              <span>DOB: 15 Jan 1985</span>
              <span>Allergies: No known allergies</span>
            </div>

            {/* Range Controls */}
            <div className="flex items-center gap-2">
              {(['today', 'week', 'month'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setMarRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    marRange === range
                      ? 'bg-[#4370B7] text-white'
                      : 'bg-[#f8fafc] text-[#6b7280] hover:bg-[#e5e7eb]'
                  }`}
                >
                  {range === 'today' ? 'Today' : range === 'week' ? 'Week' : 'Month'}
                </button>
              ))}
              <div className="flex-1" />
              <button
                onClick={() => {
                  const newDate = new Date(marAnchorDate);
                  if (marRange === 'week') {
                    newDate.setDate(newDate.getDate() - 7);
                  } else if (marRange === 'month') {
                    newDate.setMonth(newDate.getMonth() - 1);
                  } else {
                    newDate.setDate(newDate.getDate() - 1);
                  }
                  setMarAnchorDate(newDate);
                  setMarJumpToDate(newDate.toISOString().split('T')[0]);
                }}
                className="px-3 py-2 bg-[#f8fafc] text-[#6b7280] rounded-lg text-sm font-medium hover:bg-[#e5e7eb]"
              >
                ←
              </button>
              <button
                onClick={() => {
                  const newDate = new Date(marAnchorDate);
                  if (marRange === 'week') {
                    newDate.setDate(newDate.getDate() + 7);
                  } else if (marRange === 'month') {
                    newDate.setMonth(newDate.getMonth() + 1);
                  } else {
                    newDate.setDate(newDate.getDate() + 1);
                  }
                  setMarAnchorDate(newDate);
                  setMarJumpToDate(newDate.toISOString().split('T')[0]);
                }}
                className="px-3 py-2 bg-[#f8fafc] text-[#6b7280] rounded-lg text-sm font-medium hover:bg-[#e5e7eb]"
              >
                →
              </button>
              <button
                onClick={() => {
                  setMarAnchorDate(new Date());
                  setMarJumpToDate(new Date().toISOString().split('T')[0]);
                }}
                className="px-4 py-2 bg-[#e5e7eb] text-[#6b7280] rounded-lg text-sm font-medium hover:bg-[#d1d5db]"
              >
                Today
              </button>
              <span className="text-sm text-[#6b7280] mx-2">Jump to:</span>
              <input
                type="date"
                value={marJumpToDate}
                onChange={(e) => setMarJumpToDate(e.target.value)}
                className="px-3 py-2 bg-white border border-[rgba(20,30,60,0.08)] rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4370B7]"
              />
              <button
                onClick={handleJumpToDate}
                className="px-4 py-2 bg-[#4370B7] text-white rounded-lg text-sm font-medium hover:bg-[#365a9a]"
              >
                Go
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-700">{marStats.taken}</p>
                <p className="text-xs text-green-600 mt-1">Taken</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-red-700">{marStats.refused}</p>
                <p className="text-xs text-red-600 mt-1">Refused</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-700">{marStats.missed}</p>
                <p className="text-xs text-amber-600 mt-1">Missed</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-slate-700">{marStats.total}</p>
                <p className="text-xs text-slate-600 mt-1">Total</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{marStats.scheduled}</p>
                <p className="text-xs text-blue-600 mt-1">Scheduled</p>
              </div>
            </div>

            {/* MAR Grid - Week View */}
            {marRange === 'week' && (
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Header Row */}
                  <div className="grid grid-cols-8 gap-2 mb-2">
                    <div className="px-3 py-2 bg-[#f8fafc] border border-[rgba(20,30,60,0.08)] rounded-sm text-xs font-semibold text-[#6b7280]">
                      Medication
                    </div>
                    {mockMARData.weekDays.map((day, i) => {
                      const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = day.getDate().toString().padStart(2, '0');
                      return (
                        <div key={i} className="px-3 py-2 bg-[#f8fafc] border border-[rgba(20,30,60,0.08)] rounded-sm text-xs font-semibold text-[#6b7280] text-center">
                          {dayName} {dayNum}
                        </div>
                      );
                    })}
                  </div>

                  {/* Medication Rows */}
                  {mockMARData.schedules.map((schedule) => (
                    schedule.times.map((time, timeIdx) => (
                      <div key={`${schedule.id}-${timeIdx}`} className="grid grid-cols-8 gap-2 mb-2">
                        <div className="px-3 py-3 bg-white border border-[rgba(20,30,60,0.08)] rounded-sm">
                          <p className="text-sm font-medium text-[#0F172A]">{schedule.medicationName}</p>
                          <p className="text-xs text-[#6b7280] mt-1">
                            {schedule.dose} • {schedule.route} • {time}
                          </p>
                        </div>
                        {mockMARData.weekDays.map((day, dayIdx) => {
                          const admin = getAdminFor(schedule.medicationId, day, time);
                          const statusInfo = admin ? getStatusSymbol(admin.status) : getStatusSymbol('');
                          const StatusIcon = statusInfo.icon;
                          
                          return (
                            <div
                              key={dayIdx}
                              className="px-3 py-3 bg-white border border-[rgba(20,30,60,0.08)] rounded-sm flex flex-col items-center justify-center"
                              style={{ backgroundColor: statusInfo.bgColor }}
                            >
                              {StatusIcon ? (
                                <StatusIcon className="w-5 h-5" style={{ color: statusInfo.color }} />
                              ) : (
                                <span className="text-lg font-semibold" style={{ color: statusInfo.color }}>
                                  {statusInfo.symbol}
                                </span>
                              )}
                              {admin?.adminBy && (
                                <p className="text-xs text-[#6b7280] mt-1 text-center">{admin.adminBy}</p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  ))}
                </div>
              </div>
            )}

            {/* Today View */}
            {marRange === 'today' && (
              <div className="space-y-3">
                {mockMARData.schedules.map((schedule) => (
                  schedule.times.map((time, timeIdx) => {
                    const admin = getAdminFor(schedule.medicationId, marAnchorDate, time);
                    const statusInfo = admin ? getStatusSymbol(admin.status) : getStatusSymbol('');
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div
                        key={`${schedule.id}-${timeIdx}`}
                        className="p-4 bg-white border border-[rgba(20,30,60,0.08)] rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#0F172A]">{schedule.medicationName}</p>
                            <p className="text-xs text-[#6b7280] mt-1">
                              {schedule.dose} • {schedule.route} • {time}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className="px-4 py-2 rounded-lg flex items-center gap-2"
                              style={{ backgroundColor: statusInfo.bgColor }}
                            >
                              {StatusIcon ? (
                                <StatusIcon className="w-5 h-5" style={{ color: statusInfo.color }} />
                              ) : (
                                <span className="text-lg font-semibold" style={{ color: statusInfo.color }}>
                                  {statusInfo.symbol}
                                </span>
                              )}
                              <span className="text-sm font-medium" style={{ color: statusInfo.color }}>
                                {admin?.status?.toUpperCase() || 'NOT GIVEN'}
                              </span>
                            </div>
                            {admin?.adminBy && (
                              <p className="text-sm text-[#6b7280]">by {admin.adminBy}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ))}
              </div>
            )}

            {/* Month View */}
            {marRange === 'month' && (
              <div className="space-y-4">
                {/* Month Header */}
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-[#0F172A]">
                    {marAnchorDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h4>
                </div>

                {/* Week Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="px-2 py-2 text-center text-xs font-semibold text-[#6b7280]">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Medication Rows with Calendar Grid */}
                {mockMARData.schedules.map((schedule) => (
                  <div key={schedule.id} className="space-y-2">
                    {/* Medication Info */}
                    <div className="mb-2">
                      <p className="text-sm font-medium text-[#0F172A]">{schedule.medicationName}</p>
                      <p className="text-xs text-[#6b7280]">
                        {schedule.dose} • {schedule.route}
                      </p>
                    </div>

                    {/* Calendar Grid for each time */}
                    {schedule.times.map((time, timeIdx) => (
                      <div key={`${schedule.id}-${timeIdx}`} className="space-y-1">
                        <p className="text-xs text-[#6b7280] mb-1">Time: {time}</p>
                        <div className="grid grid-cols-7 gap-1">
                          {getMonthWeeks.map((week, weekIndex) => (
                            <React.Fragment key={weekIndex}>
                              {week.map((day, dayIndex) => {
                                if (day === null) {
                                  return (
                                    <div
                                      key={`empty-${dayIndex}`}
                                      className="aspect-square p-1 border border-transparent rounded-sm"
                                    />
                                  );
                                }

                                const admin = getAdminFor(schedule.medicationId, day, time);
                                const statusInfo = admin ? getStatusSymbol(admin.status) : getStatusSymbol('');
                                const StatusIcon = statusInfo.icon;
                                const isCurrentMonth = day.getMonth() === marAnchorDate.getMonth();
                                const isToday = day.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

                                return (
                                  <div
                                    key={dayIndex}
                                    className={`aspect-square p-1 border rounded-sm flex flex-col items-center justify-center ${
                                      isCurrentMonth
                                        ? admin
                                          ? 'border-[rgba(20,30,60,0.08)]'
                                          : 'border-[rgba(20,30,60,0.08)] bg-[#f9fafb]'
                                        : 'border-transparent'
                                    } ${isToday ? 'ring-2 ring-[#4370B7]' : ''}`}
                                    style={admin ? { backgroundColor: statusInfo.bgColor } : {}}
                                  >
                                    {isCurrentMonth && (
                                      <>
                                        <span className={`text-xs ${isToday ? 'font-bold text-[#4370B7]' : 'text-[#6b7280]'}`}>
                                          {day.getDate()}
                                        </span>
                                        {admin && (
                                          <div className="mt-0.5">
                                            {StatusIcon ? (
                                              <StatusIcon className="w-3 h-3" style={{ color: statusInfo.color }} />
                                            ) : (
                                              <span className="text-xs font-semibold" style={{ color: statusInfo.color }}>
                                                {statusInfo.symbol}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
          <div className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-4">
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

      {/* Enhanced Visit Scheduler Modal */}
      <EnhancedVisitScheduler
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        selectedDate={`2025-11-${selectedDate.toString().padStart(2, '0')}`}
        patientName="yannick yaba"
        patientAddress="Stourport Drive, Derby, Derby, DE73 6PX"
        onCreateVisit={handleCreateVisit}
      />

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

