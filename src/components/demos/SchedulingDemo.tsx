import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { MapPin, AlertTriangle } from 'lucide-react';
import { DemoHeader } from './DemoHeader';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';
import {
  INITIAL_ROSTER,
  cloneRoster,
  anchorRosterVisitsToDate,
  buildDisplayRows,
  applyRegionalRoster,
  dayKeyForDate,
  type StaffRow,
  type DemoRegion,
} from './scheduler/rosterModel';
import { ShiftToolbar } from './shift/ShiftToolbar';
import { RosterDateStrip } from './shift/RosterDateStrip';
import { DailyScheduler } from './shift/DailyScheduler';
import { WeeklyScheduler } from './shift/WeeklyScheduler';

const DEMO_CONFLICT_COUNT = 2;

export const SchedulingDemo: React.FC = () => {
  const bootDateRef = useRef<Date | null>(null);
  if (bootDateRef.current === null) {
    bootDateRef.current = new Date();
  }
  const [selectedDate, setSelectedDate] = useState(() => bootDateRef.current!);
  const [staffRoster, setStaffRoster] = useState<StaffRow[]>(() =>
    anchorRosterVisitsToDate(cloneRoster(INITIAL_ROSTER), bootDateRef.current!),
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [useTeamGrouping, setUseTeamGrouping] = useState(true);
  const [showRegionalGrouping, setShowRegionalGrouping] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<DemoRegion | null>(null);
  const [filterUnassignedOnly, setFilterUnassignedOnly] = useState(false);
  const [collapsedTeams, setCollapsedTeams] = useState<Set<string>>(new Set());
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);
  const [undoSnapshot, setUndoSnapshot] = useState<StaffRow[] | null>(null);
  const undoTimerRef = useRef<number | null>(null);

  const tour = useDemoTour('scheduling');

  const dayKey = useMemo(() => dayKeyForDate(selectedDate), [selectedDate]);
  const weekStart = useMemo(() => startOfWeek(selectedDate, { weekStartsOn: 1 }), [selectedDate]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const rosterForDisplay = useMemo(
    () => applyRegionalRoster(staffRoster, selectedRegion),
    [staffRoster, selectedRegion],
  );

  const displayRows = useMemo(
    () => buildDisplayRows(rosterForDisplay, useTeamGrouping, collapsedTeams, filterUnassignedOnly),
    [rosterForDisplay, useTeamGrouping, collapsedTeams, filterUnassignedOnly],
  );

  const dataRowsCount = useMemo(() => {
    const visitCount = displayRows.reduce((sum, r) => {
      if (r.kind === 'team_header') return sum;
      return sum + r.staff.visits.filter((v) => v.dayKey === dayKey).length;
    }, 0);
    const staffCount = displayRows.filter((r) => r.kind === 'staff').length;
    return { visitCount, staffCount };
  }, [displayRows, dayKey]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStaffRoster((prev) => anchorRosterVisitsToDate(prev, selectedDate));
  }, [selectedDate]);

  const showPreviewOnly = (msg: string) => {
    setPreviewMessage(msg);
    window.setTimeout(() => setPreviewMessage(null), 3500);
  };

  const registerUndo = useCallback((snapshot: StaffRow[]) => {
    setUndoSnapshot(cloneRoster(snapshot));
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    undoTimerRef.current = window.setTimeout(() => setUndoSnapshot(null), 8000);
  }, []);

  const applyUndo = () => {
    if (undoSnapshot) {
      setStaffRoster(cloneRoster(undoSnapshot));
      setUndoSnapshot(null);
      if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current);
    }
  };

  const handleReset = () => {
    const d = new Date();
    setSelectedDate(d);
    setStaffRoster(anchorRosterVisitsToDate(cloneRoster(INITIAL_ROSTER), d));
    setViewMode('daily');
    setUseTeamGrouping(true);
    setShowRegionalGrouping(false);
    setSelectedRegion(null);
    setFilterUnassignedOnly(false);
    setCollapsedTeams(new Set());
    setUndoSnapshot(null);
  };

  const toggleTeamCollapse = (teamId: string) => {
    setCollapsedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) next.delete(teamId);
      else next.add(teamId);
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader
        title="Shift Management"
        subtitle="CMS Dashboard"
        onReset={handleReset}
        extraActions={
          <TourButton onStart={tour.startTour} hasCompleted={tour.hasCompleted} label="Guided tour" />
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

      <p className="text-[11px] text-slate-500 px-6 pt-2 flex-shrink-0 border-b border-slate-100 bg-slate-50/80">
        Interactive UI preview — sample data only; actions do not connect to a live account. Sample visits are anchored to
        the selected date (change the date strip to move them); edits stay in this browser session only.
      </p>

      <div className="p-4 md:p-6 space-y-3 flex-1 flex flex-col min-h-0">
        <ShiftToolbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          useTeamGrouping={useTeamGrouping}
          setUseTeamGrouping={setUseTeamGrouping}
          showRegionalGrouping={showRegionalGrouping}
          setShowRegionalGrouping={setShowRegionalGrouping}
          onPreviewMessage={showPreviewOnly}
          demoConflictCount={DEMO_CONFLICT_COUNT}
        />

        <RosterDateStrip
          viewMode={viewMode}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="space-y-2" data-tour="scheduling-filters">
          {showRegionalGrouping && viewMode === 'daily' && (
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Region
              </span>
              {(['All regions', 'Derby', 'Nottingham'] as const).map((label) => {
                const id: DemoRegion | null =
                  label === 'All regions' ? null : (label as DemoRegion);
                const active =
                  label === 'All regions' ? selectedRegion === null : selectedRegion === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSelectedRegion(id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      active ? 'bg-[#4370B7] text-white border-[#4370B7]' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <span className="text-[10px] text-slate-400 ml-1">Filters roster rows in this preview</span>
            </div>
          )}

          <div className="px-3 py-2.5 border border-slate-200 rounded-lg bg-white flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Roster focus</span>
              <button
                type="button"
                onClick={() => setFilterUnassignedOnly(false)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  !filterUnassignedOnly ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'
                }`}
              >
                All rows
              </button>
              <button
                type="button"
                onClick={() => setFilterUnassignedOnly(true)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                  filterUnassignedOnly ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200'
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                Unallocated only
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{dataRowsCount.visitCount} visits (this day)</span>
              <span className="text-slate-300">|</span>
              <span>{dataRowsCount.staffCount} staff</span>
            </div>
          </div>
        </div>

        {viewMode === 'daily' ? (
          <DailyScheduler
            staffRoster={staffRoster}
            setStaffRoster={setStaffRoster}
            selectedDate={selectedDate}
            dayKey={dayKey}
            displayRows={displayRows}
            currentTime={currentTime}
            collapsedTeams={collapsedTeams}
            toggleTeamCollapse={toggleTeamCollapse}
            registerUndo={registerUndo}
          />
        ) : (
          <WeeklyScheduler
            weekStart={weekStart}
            weekDays={weekDays}
            displayRows={displayRows}
            toggleTeamCollapse={toggleTeamCollapse}
            collapsedTeams={collapsedTeams}
          />
        )}
      </div>

      {undoSnapshot && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10002] flex items-center gap-3 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl">
          <span>Undo last change in this preview?</span>
          <button
            type="button"
            onClick={applyUndo}
            className="px-3 py-1 rounded-md bg-white text-slate-900 font-semibold text-xs hover:bg-slate-100"
          >
            Undo
          </button>
        </div>
      )}

      {previewMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl z-[10001] max-w-md text-center">
          {previewMessage}
        </div>
      )}
    </div>
  );
};
