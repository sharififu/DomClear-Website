import React, { useState, useEffect } from 'react';
import { Plus, Users, Clock, AlertCircle, AlertTriangle, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, GripVertical, User, CheckCircle } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

interface Visit {
  id: string;
  patientName: string;
  startHour: number;
  duration: number; // in hours
  color: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface StaffRow {
  id: string;
  name: string;
  avatar: string;
  role: string;
  visits: Visit[];
}

type ViewMode = 'daily' | 'weekly';

const SAMPLE_STAFF_ROSTER: StaffRow[] = [
  {
    id: 'unallocated',
    name: 'Unallocated',
    avatar: '!',
    role: 'Pending Assignment',
    visits: [
      { id: 'u1', patientName: 'Margaret H.', startHour: 7, duration: 1, color: '#ef4444', type: 'personal care', status: 'scheduled' },
      { id: 'u2', patientName: 'Thomas R.', startHour: 16, duration: 0.5, color: '#ef4444', type: 'medication', status: 'scheduled' },
    ]
  },
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'EW',
    role: 'Senior Carer',
    visits: [
      { id: 'v1', patientName: 'Sarah J.', startHour: 8, duration: 1, color: '#4370B7', type: 'medication', status: 'completed' },
      { id: 'v2', patientName: 'John M.', startHour: 10, duration: 1.5, color: '#7c6df0', type: 'personal care', status: 'scheduled' },
      { id: 'v3', patientName: 'Alice P.', startHour: 14, duration: 1, color: '#4370B7', type: 'check-in', status: 'scheduled' },
    ]
  },
  {
    id: '2',
    name: 'James Taylor',
    avatar: 'JT',
    role: 'Carer',
    visits: [
      { id: 'v4', patientName: 'Mary B.', startHour: 6, duration: 1, color: '#14B8A6', type: 'breakfast', status: 'completed' },
      { id: 'v5', patientName: 'Robert K.', startHour: 9, duration: 1, color: '#4370B7', type: 'medication', status: 'in-progress' },
      { id: 'v6', patientName: 'Linda P.', startHour: 11, duration: 0.5, color: '#f59e0b', type: 'check-in', status: 'scheduled' },
      { id: 'v7', patientName: 'George W.', startHour: 15, duration: 2, color: '#7c6df0', type: 'personal care', status: 'scheduled' },
      { id: 'v8', patientName: 'Patricia M.', startHour: 19, duration: 1, color: '#14B8A6', type: 'evening care', status: 'scheduled' },
    ]
  },
  {
    id: '3',
    name: 'Dave Smith',
    avatar: 'DS',
    role: 'Carer',
    visits: [
      { id: 'v9', patientName: 'Admin Meeting', startHour: 7, duration: 1, color: '#6b7280', type: 'meeting', status: 'completed' },
      { id: 'v10', patientName: 'David T.', startHour: 9, duration: 2, color: '#7c6df0', type: 'personal care', status: 'scheduled' },
      { id: 'v11', patientName: 'Susan K.', startHour: 13, duration: 1, color: '#4370B7', type: 'medication', status: 'scheduled' },
      { id: 'v12', patientName: 'Michael B.', startHour: 17, duration: 1, color: '#f59e0b', type: 'companionship', status: 'scheduled' },
    ]
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'Carer',
    visits: [
      { id: 'v13', patientName: 'Elizabeth R.', startHour: 8, duration: 1.5, color: '#7c6df0', type: 'personal care', status: 'scheduled' },
      { id: 'v14', patientName: 'William H.', startHour: 12, duration: 1, color: '#4370B7', type: 'medication', status: 'scheduled' },
      { id: 'v15', patientName: 'Anne M.', startHour: 16, duration: 1, color: '#14B8A6', type: 'dinner prep', status: 'scheduled' },
    ]
  },
];

const WEEKLY_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const PIXEL_PER_HOUR = 50; // Fixed pixel width per hour

interface DragState {
  isDragging: boolean;
  visitId: string | null;
  staffId: string | null;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  originalLeft: number;
  originalTop: number;
  targetStaffId: string | null;
}

export const SchedulingDemo: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [staffRoster, setStaffRoster] = useState<StaffRow[]>(SAMPLE_STAFF_ROSTER);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTeam, setSelectedTeam] = useState<'all' | 'unassigned'>('all');
  const tour = useDemoTour('scheduling');
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    visitId: null,
    staffId: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    originalLeft: 0,
    originalTop: 0,
    targetStaffId: null,
  });
  const [showMoveNotification, setShowMoveNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setViewMode('daily');
    setStaffRoster(SAMPLE_STAFF_ROSTER);
    setSelectedTeam('all');
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getCurrentTimePosition = () => {
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return (hour + minutes / 60) * PIXEL_PER_HOUR;
  };

  const currentTimePosition = getCurrentTimePosition();

  const filteredStaff = selectedTeam === 'unassigned' 
    ? staffRoster.filter(s => s.id === 'unallocated')
    : staffRoster;

  const handleMouseDown = (e: React.MouseEvent, visit: Visit, staffId: string, staffIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    
    // Get the actual position of the visit block relative to viewport
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setDragState({
      isDragging: false, // Will be set to true after threshold
      visitId: visit.id,
      staffId: staffId,
      startX,
      startY,
      currentX: startX,
      currentY: startY,
      originalLeft: rect.left,
      originalTop: rect.top,
      targetStaffId: staffId,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.visitId) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - dragState.startX;
    const deltaY = currentY - dragState.startY;
    const moved = Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5;

    if (moved && !dragState.isDragging) {
      setDragState(prev => ({ ...prev, isDragging: true, currentX, currentY }));
    } else if (dragState.isDragging) {
      // Calculate target staff based on Y movement (use full roster, not filtered)
      const rowChange = Math.round(deltaY / 80);
      const sourceStaffIndex = staffRoster.findIndex(s => s.id === dragState.staffId);
      const targetStaffIndex = Math.max(0, Math.min(staffRoster.length - 1, sourceStaffIndex + rowChange));
      const targetStaffId = staffRoster[targetStaffIndex]?.id || dragState.staffId;
      
      setDragState(prev => ({ ...prev, currentX, currentY, targetStaffId }));
    }
  };

  const handleMouseUp = () => {
    if (!dragState.visitId) return;

    const deltaX = dragState.currentX - dragState.startX;
    const deltaY = dragState.currentY - dragState.startY;
    const moved = Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5;

    if (dragState.isDragging && moved) {
      // Find the visit and update its position
      const newStaffRoster = [...staffRoster];
      let movedVisit: Visit | null = null;
      let sourceStaffIdx = -1;

      // Find and remove visit from source staff
      for (let i = 0; i < newStaffRoster.length; i++) {
        const visitIdx = newStaffRoster[i].visits.findIndex(v => v.id === dragState.visitId);
        if (visitIdx !== -1) {
          movedVisit = { ...newStaffRoster[i].visits[visitIdx] };
          newStaffRoster[i] = {
            ...newStaffRoster[i],
            visits: newStaffRoster[i].visits.filter(v => v.id !== dragState.visitId)
          };
          sourceStaffIdx = i;
          break;
        }
      }

      if (movedVisit && dragState.targetStaffId) {
        // Update time if moved horizontally
        const hoursMoved = deltaX / PIXEL_PER_HOUR;
        let newStartHour = movedVisit.startHour + hoursMoved;
        
        console.log('Drop calculation:', {
          deltaX,
          deltaY,
          hoursMoved,
          originalStartHour: movedVisit.startHour,
          newStartHour,
          snappedHour: Math.round(newStartHour * 4) / 4,
          PIXEL_PER_HOUR,
          sourceStaff: dragState.staffId,
          targetStaff: dragState.targetStaffId
        });
        
        // Ensure within 24-hour bounds
        newStartHour = Math.max(0, Math.min(23.75, newStartHour));
        
        // Snap to 15-minute intervals (0.25 hour increments)
        const snappedHour = Math.round(newStartHour * 4) / 4;
        movedVisit.startHour = snappedHour;

        // Add to target staff
        const targetStaffIdx = newStaffRoster.findIndex(s => s.id === dragState.targetStaffId);
        if (targetStaffIdx !== -1) {
          newStaffRoster[targetStaffIdx] = {
            ...newStaffRoster[targetStaffIdx],
            visits: [...newStaffRoster[targetStaffIdx].visits, movedVisit]
          };
          
          setStaffRoster(newStaffRoster);
          
          // Show success notification
          setShowMoveNotification(true);
          setTimeout(() => setShowMoveNotification(false), 2000);
        }
      }
    }

    setDragState({
      isDragging: false,
      visitId: null,
      staffId: null,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      originalLeft: 0,
      originalTop: 0,
      targetStaffId: null,
    });
  };

  useEffect(() => {
    if (dragState.visitId) {
      const handleMove = (e: MouseEvent) => handleMouseMove(e);
      const handleUp = () => handleMouseUp();
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      };
    }
  }, [dragState, staffRoster, selectedTeam]);

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]" style={{ userSelect: dragState.isDragging ? 'none' : 'auto', cursor: dragState.isDragging ? 'grabbing' : 'auto' }}>
      <DemoHeader 
        title="Shift Management" 
        subtitle="Daily Roster"
        onReset={handleReset}
        extraActions={
          <TourButton
            onStart={tour.startTour}
            hasCompleted={tour.hasCompleted}
          />
        }
        tourAnchorId="scheduling-header"
      />
      <DemoTour
        demoId="scheduling"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <div className="p-6 space-y-4 flex-1 flex flex-col min-h-0">
        {/* Header with View Mode Toggle */}
        <div className="bg-white px-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#4370B7]" />
                <h3 className="text-base font-semibold text-[#0F172A]">Shift Management</h3>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('daily')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                    viewMode === 'daily'
                      ? 'bg-[#4370B7] text-white shadow-xs'
                      : 'text-[#6b7280] hover:text-[#0F172A]'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                    viewMode === 'weekly'
                      ? 'bg-[#4370B7] text-white shadow-xs'
                      : 'text-[#6b7280] hover:text-[#0F172A]'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#4370B7] text-white rounded-lg text-sm font-medium hover:bg-blue-600 shadow-xs">
              <Plus className="w-4 h-4" />
              <span>Add Visit</span>
            </button>
          </div>
        </div>

        {/* Daily Roster Header */}
        <div className="bg-[#e5e7eb] px-4 py-2 flex items-center justify-between rounded-lg">
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-white/50 rounded-sm transition-colors">
              <ChevronLeft className="w-4 h-4 text-[#6b7280]" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#6b7280]" />
              <span className="text-sm font-semibold text-[#0F172A]">
                {viewMode === 'daily' ? 'Daily Roster' : 'Weekly Roster'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 text-xs font-medium text-[#4370B7] bg-blue-50 rounded-sm hover:bg-blue-100">
              Today
            </button>
            <span className="text-xs font-medium text-[#0F172A]">Tuesday, 25/11/2025</span>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-white/50 rounded-sm transition-colors">
                <ChevronLeft className="w-3 h-3 text-[#6b7280]" />
              </button>
              <button className="p-1 hover:bg-white/50 rounded-sm transition-colors">
                <ChevronRight className="w-3 h-3 text-[#6b7280]" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-4 py-3 border border-[rgba(20,30,60,0.08)] rounded-lg bg-white" data-tour="scheduling-filters">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#6b7280]" />
                <span className="text-sm font-medium text-[#6b7280]">Filter by Team</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTeam('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                    selectedTeam === 'all'
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-[#f8fafc] text-[#6b7280] border border-[rgba(20,30,60,0.08)] hover:bg-[#e5e7eb]'
                  }`}
                >
                  All Teams
                </button>
                <button
                  onClick={() => setSelectedTeam('unassigned')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                    selectedTeam === 'unassigned'
                      ? 'bg-[#ef4444] text-white'
                      : 'bg-[#f8fafc] text-[#6b7280] border border-[rgba(20,30,60,0.08)] hover:bg-[#e5e7eb]'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  Unassigned ({SAMPLE_STAFF_ROSTER[0].visits.length})
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6b7280]">
                {filteredStaff.reduce((sum, s) => sum + s.visits.length, 0)} visits
              </span>
              <div className="w-px h-4 bg-slate-200" />
              <span className="text-xs text-[#6b7280]">
                {filteredStaff.length - (selectedTeam === 'all' ? 1 : 0)} staff
              </span>
            </div>
          </div>
        </div>

        {/* Roster Content */}
        {viewMode === 'daily' ? (
          <div className="flex-1 flex border border-[rgba(20,30,60,0.08)] rounded-lg overflow-hidden bg-white shadow-xs">
            {/* Staff Column */}
            <div className="w-48 border-r border-[rgba(20,30,60,0.08)] flex-shrink-0 flex flex-col" data-tour="scheduling-staff">
              <div className="px-4 py-3 bg-slate-100 border-b border-[rgba(20,30,60,0.08)]">
                <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wide">Staff</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredStaff.map((staff) => (
                  <div 
                    key={staff.id} 
                    className={`h-20 px-4 border-b border-[rgba(20,30,60,0.08)] flex items-center ${
                      staff.id === 'unallocated' ? 'bg-red-50/50' : 'bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                        staff.id === 'unallocated' ? 'bg-red-500' : 'bg-[#4370B7]'
                      }`}>
                        {staff.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0F172A] truncate">{staff.name}</p>
                        <p className="text-xs text-[#6b7280] truncate">{staff.role}</p>
                        <p className="text-xs text-[#6b7280] mt-0.5">
                          {staff.visits.length} visit{staff.visits.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Area */}
            <div className="flex-1 flex flex-col min-w-0" data-tour="scheduling-timeline">
              {/* Time Headers */}
              <div className="flex border-b border-[rgba(20,30,60,0.08)] bg-slate-100" style={{ minWidth: `${PIXEL_PER_HOUR * 24}px` }}>
                {hours.map((hour) => (
                  <div 
                    key={hour} 
                    className="border-r border-[rgba(20,30,60,0.08)] last:border-r-0 px-2 py-3 flex-shrink-0"
                    style={{ width: `${PIXEL_PER_HOUR}px` }}
                  >
                    <span className="text-xs font-medium text-[#6b7280]">
                      {String(hour).padStart(2, '0')}:00
                    </span>
                  </div>
                ))}
              </div>

              {/* Timeline Rows */}
              <div className="flex-1 overflow-auto">
                <div style={{ minWidth: `${PIXEL_PER_HOUR * 24}px` }}>
                  {filteredStaff.map((staff, staffIdx) => (
                    <div 
                      key={staff.id}
                      className={`relative h-20 border-b border-[rgba(20,30,60,0.08)] transition-colors ${
                        staff.id === 'unallocated' ? 'bg-red-50/30' : 'bg-white'
                      } ${
                        dragState.isDragging && dragState.targetStaffId === staff.id && dragState.staffId !== staff.id
                          ? 'bg-blue-50/50 ring-2 ring-blue-300 ring-inset'
                          : ''
                      }`}
                    >
                      {/* Hour Grid Background */}
                      <div className="absolute inset-0 flex">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            className="border-r border-[rgba(20,30,60,0.05)] last:border-r-0 flex-shrink-0"
                            style={{ width: `${PIXEL_PER_HOUR}px` }}
                          />
                        ))}
                      </div>

                      {/* Current Time Indicator */}
                      {staff.id === staffRoster[0].id && currentTime.getHours() < 24 && (
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
                          style={{ left: `${currentTimePosition}px` }}
                        >
                          <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rounded-full border border-white" />
                        </div>
                      )}

                      {/* Drop Preview - show where visit will land if this is target row */}
                      {dragState.isDragging && dragState.targetStaffId === staff.id && dragState.staffId !== staff.id && (() => {
                        let draggingVisit: Visit | null = null;
                        for (const s of staffRoster) {
                          const found = s.visits.find(v => v.id === dragState.visitId);
                          if (found) {
                            draggingVisit = found;
                            break;
                          }
                        }
                        if (!draggingVisit) return null;
                        
                        const deltaX = dragState.currentX - dragState.startX;
                        const hoursMoved = deltaX / PIXEL_PER_HOUR;
                        let newStartHour = draggingVisit.startHour + hoursMoved;
                        newStartHour = Math.max(0, Math.min(23.75, newStartHour));
                        const snappedHour = Math.round(newStartHour * 4) / 4;
                        const leftPx = snappedHour * PIXEL_PER_HOUR;
                        const widthPx = draggingVisit.duration * PIXEL_PER_HOUR;
                        
                        return (
                          <div
                            key="drop-preview"
                            className="absolute top-2 h-16 rounded-lg border-2 border-dashed border-blue-400 bg-blue-100/40 z-5"
                            style={{
                              left: `${leftPx}px`,
                              width: `${Math.max(widthPx, 100)}px`,
                            }}
                          >
                            <div className="flex items-center justify-center h-full text-xs text-blue-700 font-semibold">
                              Drop here
                            </div>
                          </div>
                        );
                      })()}

                      {/* Visit Blocks */}
                      {staff.visits.map((visit) => {
                        const isDraggingThis = dragState.isDragging && dragState.visitId === visit.id;
                        const leftPx = visit.startHour * PIXEL_PER_HOUR;
                        const widthPx = visit.duration * PIXEL_PER_HOUR;
                        const endHour = visit.startHour + visit.duration;
                        const endMinutes = ((endHour % 1) * 60).toFixed(0);
                        const endTime = `${Math.floor(endHour).toString().padStart(2, '0')}:${endMinutes.padStart(2, '0')}`;
                        
                        // Hide original position if dragging
                        if (isDraggingThis) {
                          return null;
                        }
                        
                        return (
                          <div
                            key={visit.id}
                            className="absolute top-2 h-16 rounded-lg shadow-xs cursor-move hover:shadow-lg hover:scale-[1.02] transition-all z-10"
                            style={{
                              left: `${leftPx}px`,
                              width: `${Math.max(widthPx, 100)}px`,
                              backgroundColor: visit.status === 'completed' ? '#10b981' : 
                                              visit.status === 'in-progress' ? '#3b82f6' :
                                              visit.color,
                            }}
                            onMouseDown={(e) => handleMouseDown(e, visit, staff.id, staffIdx)}
                          >
                            <div className="flex items-center h-full px-2 gap-1.5">
                              <GripVertical className="w-3 h-3 text-white/60 flex-shrink-0" />
                              {staff.id === 'unallocated' ? (
                                <AlertTriangle className="w-3.5 h-3.5 text-white flex-shrink-0" />
                              ) : visit.status === 'in-progress' ? (
                                <Clock className="w-3.5 h-3.5 text-white flex-shrink-0" />
                              ) : visit.status === 'completed' ? (
                                <CheckCircle className="w-3.5 h-3.5 text-white flex-shrink-0" />
                              ) : (
                                <User className="w-3.5 h-3.5 text-white flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <p className="text-xs font-semibold text-white truncate leading-tight">
                                  {visit.patientName}
                                </p>
                                <p className="text-[11px] text-white/95 leading-tight">
                                  {String(visit.startHour).padStart(2, '0')}:00 - {endTime}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 bg-white/25 rounded-sm px-1.5 py-0.5 flex-shrink-0">
                                <Clock className="w-3 h-3 text-white" />
                                <span className="text-[11px] font-semibold text-white">
                                  {Math.round(visit.duration * 60)}m
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {/* Dragging Visit - Render separately for smooth movement */}
                  {dragState.isDragging && dragState.visitId && (() => {
                    let draggingVisit: Visit | null = null;
                    let originalStaffIdx = -1;
                    
                    for (let i = 0; i < staffRoster.length; i++) {
                      const found = staffRoster[i].visits.find(v => v.id === dragState.visitId);
                      if (found) {
                        draggingVisit = found;
                        originalStaffIdx = i;
                        break;
                      }
                    }
                    
                    if (!draggingVisit) return null;
                    
                    // Calculate position - follow mouse exactly
                    const deltaX = dragState.currentX - dragState.startX;
                    const deltaY = dragState.currentY - dragState.startY;
                    
                    // Position relative to original block position
                    const leftPx = dragState.originalLeft + deltaX;
                    const topPx = dragState.originalTop + deltaY;
                    const widthPx = draggingVisit.duration * PIXEL_PER_HOUR;
                    
                    // Calculate new time for display
                    const hoursMoved = deltaX / PIXEL_PER_HOUR;
                    let newStartHour = draggingVisit.startHour + hoursMoved;
                    newStartHour = Math.max(0, Math.min(23.75, newStartHour));
                    const snappedHour = Math.round(newStartHour * 4) / 4;
                    const hours = Math.floor(snappedHour);
                    const mins = Math.round((snappedHour % 1) * 60);
                    const endHour = snappedHour + draggingVisit.duration;
                    const endMinutes = ((endHour % 1) * 60).toFixed(0);
                    const endTime = `${Math.floor(endHour).toString().padStart(2, '0')}:${endMinutes.padStart(2, '0')}`;
                    const startTime = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                    
                    return (
                      <div
                        className="fixed h-16 rounded-lg shadow-2xl z-[9999] pointer-events-none border-2 border-white"
                        style={{
                          left: `${leftPx}px`,
                          top: `${topPx}px`,
                          width: `${Math.max(widthPx, 100)}px`,
                          backgroundColor: draggingVisit.status === 'completed' ? '#10b981' : 
                                          draggingVisit.status === 'in-progress' ? '#3b82f6' :
                                          draggingVisit.color,
                          opacity: 0.9,
                          transform: 'scale(1.05)',
                        }}
                      >
                        <div className="flex items-center h-full px-2 gap-1.5">
                          <GripVertical className="w-3 h-3 text-white/60 flex-shrink-0" />
                          {dragState.staffId === 'unallocated' ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          ) : draggingVisit.status === 'in-progress' ? (
                            <Clock className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          ) : draggingVisit.status === 'completed' ? (
                            <CheckCircle className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          ) : (
                            <User className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0 overflow-hidden">
                            <p className="text-xs font-semibold text-white truncate leading-tight">
                              {draggingVisit.patientName}
                            </p>
                            <p className="text-[11px] text-white/95 leading-tight font-semibold">
                              {startTime} - {endTime}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-white/25 rounded-sm px-1.5 py-0.5 flex-shrink-0">
                            <Clock className="w-3 h-3 text-white" />
                            <span className="text-[11px] font-semibold text-white">
                              {Math.round(draggingVisit.duration * 60)}m
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Drag & Drop Hint */}
              <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                <p className="text-xs text-blue-700 flex items-center gap-2">
                  <GripVertical className="w-3.5 h-3.5" />
                  <span className="font-medium">Drag visits to reassign staff or change times</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Weekly View */
          <div className="flex-1 bg-white rounded-lg border border-[rgba(20,30,60,0.08)] overflow-auto shadow-xs">
            {/* Week Header */}
            <div className="grid grid-cols-8 gap-0 border-b border-[rgba(20,30,60,0.08)] bg-slate-100 sticky top-0 z-10">
              <div className="px-4 py-3 border-r border-[rgba(20,30,60,0.08)]">
                <span className="text-xs font-bold text-[#6b7280] uppercase">Staff</span>
              </div>
              {WEEKLY_DAYS.map((day, idx) => (
                <div key={day} className="px-2 py-3 border-r border-[rgba(20,30,60,0.08)] last:border-r-0 text-center">
                  <div className="text-xs font-bold text-[#6b7280] uppercase">{day}</div>
                  <div className="text-xs text-[#9ca3af]">{25 + idx}</div>
                </div>
              ))}
            </div>

            {/* Staff Rows */}
            {filteredStaff.map((staff) => (
              <div key={staff.id} className="grid grid-cols-8 gap-0 border-b border-[rgba(20,30,60,0.08)] last:border-b-0">
                <div className={`px-4 py-4 border-r border-[rgba(20,30,60,0.08)] flex items-center min-h-[100px] ${
                  staff.id === 'unallocated' ? 'bg-red-50/30' : 'bg-slate-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      staff.id === 'unallocated' ? 'bg-red-500' : 'bg-[#4370B7]'
                    }`}>
                      {staff.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F172A] truncate">{staff.name}</p>
                      <p className="text-xs text-[#6b7280] truncate">{staff.role}</p>
                    </div>
                  </div>
                </div>
                {WEEKLY_DAYS.map((day, dayIdx) => (
                  <div key={day} className="px-2 py-2 border-r border-[rgba(20,30,60,0.08)] last:border-r-0 bg-white min-h-[100px]">
                    <div className="space-y-1">
                      {staff.visits
                        .filter((_, idx) => idx % 7 === dayIdx)
                        .slice(0, 2)
                        .map((visit) => (
                          <div
                            key={visit.id}
                            className="rounded-sm px-2 py-1.5 cursor-pointer hover:shadow-md transition-shadow"
                            style={{
                              backgroundColor: visit.status === 'completed' ? '#10b981' :
                                              visit.status === 'in-progress' ? '#3b82f6' :
                                              visit.color,
                            }}
                          >
                            <p className="text-xs font-medium text-white truncate leading-tight">
                              {visit.patientName}
                            </p>
                            <p className="text-[11px] text-white/95 leading-tight">
                              {String(visit.startHour).padStart(2, '0')}:00
                            </p>
                          </div>
                        ))}
                      {staff.visits.filter((_, idx) => idx % 7 === dayIdx).length > 2 && (
                        <div className="text-xs text-[#6b7280] text-center py-1 font-medium">
                          +{staff.visits.filter((_, idx) => idx % 7 === dayIdx).length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drag Tooltip */}
      {dragState.isDragging && dragState.visitId && (() => {
        let draggingVisit: Visit | null = null;
        for (const s of staffRoster) {
          const found = s.visits.find(v => v.id === dragState.visitId);
          if (found) {
            draggingVisit = found;
            break;
          }
        }
        if (!draggingVisit) return null;
        
        const deltaX = dragState.currentX - dragState.startX;
        const hoursMoved = deltaX / PIXEL_PER_HOUR;
        let newStartHour = draggingVisit.startHour + hoursMoved;
        newStartHour = Math.max(0, Math.min(23.75, newStartHour));
        const snappedHour = Math.round(newStartHour * 4) / 4;
        const hours = Math.floor(snappedHour);
        const mins = Math.round((snappedHour % 1) * 60);
        
        const targetStaff = staffRoster.find(s => s.id === dragState.targetStaffId);
        const staffName = targetStaff?.name || 'Unknown';
        const staffChanged = dragState.targetStaffId !== dragState.staffId;
        
        return (
          <div 
            className="fixed bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-2xl z-[10000] pointer-events-none"
            style={{
              left: `${dragState.currentX + 15}px`,
              top: `${dragState.currentY - 35}px`,
            }}
          >
            <div className="flex items-center gap-2">
              {staffChanged && <User className="w-3.5 h-3.5" />}
              <span>
                {staffName} • {hours.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        );
      })()}

      {/* Move Notification */}
      {showMoveNotification && (
        <div className="fixed bottom-6 right-6 bg-white border border-green-200 rounded-lg shadow-xl p-4 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Visit moved successfully</p>
            <p className="text-xs text-slate-600">Staff assignment and time updated</p>
          </div>
        </div>
      )}
    </div>
  );
};
