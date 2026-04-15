import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { Users, AlertTriangle, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import {
  COLORS,
  TIME_COLUMN_WIDTH,
  STAFF_ROW_HEIGHT,
  TIME_HEADER_HEIGHT,
  type StaffRow,
  type Visit,
  type DisplayRow,
  dataRowsOnly,
  visitsForDay,
  nextVisitId,
  cloneRoster,
  weekDayFromDate,
} from '../scheduler/rosterModel';
import {
  snapToSlotHours,
  hourToPx,
  formatHourLabel,
  SLOT_HOURS,
  MIN_PIXELS_PER_HOUR,
} from '../scheduler/timeAxis';
import { getStripeColorForVisit } from '../scheduler/visitAppearance';
import { computeDemoTravelGaps } from '../scheduler/computeDemoTravelGaps';
import { TravelGapConnectorWeb } from '../scheduler/TravelGapConnectorWeb';
import { TravelGapTooltipWeb } from '../scheduler/TravelGapTooltipWeb';
import type { TravelGapConnectorModel } from '../scheduler/travelGapTypes';

export interface DailySchedulerProps {
  staffRoster: StaffRow[];
  setStaffRoster: React.Dispatch<React.SetStateAction<StaffRow[]>>;
  selectedDate: Date;
  dayKey: string;
  displayRows: DisplayRow[];
  currentTime: Date;
  collapsedTeams: Set<string>;
  toggleTeamCollapse: (teamId: string) => void;
  registerUndo: (snapshot: StaffRow[]) => void;
}

type MoveSession = {
  visitId: string;
  staffId: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  originalLeft: number;
  originalTop: number;
  isDragging: boolean;
  targetStaffId: string | null;
};

export const DailyScheduler: React.FC<DailySchedulerProps> = ({
  staffRoster,
  setStaffRoster,
  selectedDate,
  dayKey,
  displayRows,
  currentTime,
  collapsedTeams,
  toggleTeamCollapse,
  registerUndo,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const moveRef = useRef<MoveSession | null>(null);
  const rosterRef = useRef(staffRoster);
  rosterRef.current = staffRoster;
  const [moveSession, setMoveSession] = useState<MoveSession | null>(null);
  const [showLocalToast, setShowLocalToast] = useState(false);
  const [travelTooltip, setTravelTooltip] = useState<{
    gapKey: string;
    model: TravelGapConnectorModel;
    anchor: { x: number; y: number };
    pinned: boolean;
  } | null>(null);

  moveRef.current = moveSession;

  const dataRows = useMemo(() => dataRowsOnly(displayRows), [displayRows]);
  const dataRowsRef = useRef(dataRows);
  dataRowsRef.current = dataRows;

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const weekDay = weekDayFromDate(selectedDate);

  const visitBlockHeight = STAFF_ROW_HEIGHT - 16;
  const currentTimePosition =
    (currentTime.getHours() + currentTime.getMinutes() / 60) * MIN_PIXELS_PER_HOUR;

  const showUpdatedToast = () => {
    setShowLocalToast(true);
    window.setTimeout(() => setShowLocalToast(false), 2200);
  };

  const handleTravelGapTooltipShow = useCallback(
    (gapKey: string, model: TravelGapConnectorModel, anchor: { x: number; y: number }) => {
      setTravelTooltip((prev) => {
        if (prev?.pinned && prev.gapKey !== gapKey) return prev;
        return {
          gapKey,
          model,
          anchor,
          pinned: prev?.pinned === true && prev.gapKey === gapKey,
        };
      });
    },
    [],
  );

  const handleTravelGapTooltipHide = useCallback((gapKey: string) => {
    setTravelTooltip((prev) => {
      if (!prev || prev.gapKey !== gapKey) return prev;
      if (prev.pinned) return prev;
      return null;
    });
  }, []);

  const handleTravelGapPress = useCallback(
    (gapKey: string, model: TravelGapConnectorModel, anchor: { x: number; y: number }) => {
      setTravelTooltip((prev) => {
        if (prev?.gapKey === gapKey && prev.pinned) return null;
        return { gapKey, model, anchor, pinned: true };
      });
    },
    [],
  );

  const dismissTravelGapTooltip = useCallback(() => setTravelTooltip(null), []);

  useEffect(() => {
    if (!moveSession?.isDragging) return;
    setTravelTooltip((prev) => {
      if (!prev?.pinned) return null;
      return prev;
    });
  }, [moveSession?.isDragging]);

  const findVisit = useCallback(
    (visitId: string): { visit: Visit; staffId: string } | null => {
      for (const row of staffRoster) {
        const v = row.visits.find((x) => x.id === visitId);
        if (v) return { visit: v, staffId: row.id };
      }
      return null;
    },
    [staffRoster],
  );

  const hourFromClientX = useCallback((clientX: number) => {
    const sc = scrollRef.current;
    if (!sc) return 0;
    const r = sc.getBoundingClientRect();
    const x = clientX - r.left + sc.scrollLeft;
    return snapToSlotHours(x / MIN_PIXELS_PER_HOUR);
  }, []);

  const onVisitBodyMouseDown = (e: React.MouseEvent, visit: Visit, staffId: string) => {
    if ((e.target as HTMLElement).closest('[data-resize-handle]')) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setMoveSession({
      visitId: visit.id,
      staffId,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      originalLeft: rect.left,
      originalTop: rect.top,
      isDragging: false,
      targetStaffId: staffId,
    });
  };

  useEffect(() => {
    if (!moveSession) return;

    const onMove = (e: MouseEvent) => {
      const prev = moveRef.current;
      if (!prev) return;
      const currentX = e.clientX;
      const currentY = e.clientY;
      const deltaX = currentX - prev.startX;
      const deltaY = currentY - prev.startY;
      const moved = Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5;

      if (moved && !prev.isDragging) {
        setMoveSession({ ...prev, isDragging: true, currentX, currentY });
      } else if (prev.isDragging) {
        const rowChange = Math.round(deltaY / STAFF_ROW_HEIGHT);
        const dr = dataRowsRef.current;
        const sourceStaffIndex = dr.findIndex((r) => r.staff.id === prev.staffId);
        const targetStaffIndex = Math.max(0, Math.min(dr.length - 1, sourceStaffIndex + rowChange));
        const targetStaffId = dr[targetStaffIndex]?.staff.id ?? prev.staffId;
        setMoveSession({ ...prev, currentX, currentY, targetStaffId });
      }
    };

    const onUp = () => {
      const prev = moveRef.current;
      setMoveSession(null);
      if (!prev) return;
      const deltaX = prev.currentX - prev.startX;
      const deltaY = prev.currentY - prev.startY;
      const moved = Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5;
      if (!prev.isDragging || !moved) return;

      const ro0 = rosterRef.current;
      const found = ro0.flatMap((row) => row.visits.map((v) => ({ v, staffId: row.id }))).find((x) => x.v.id === prev.visitId);
      if (!found || !prev.targetStaffId) return;

      const hoursMoved = deltaX / MIN_PIXELS_PER_HOUR;
      let newStart = snapToSlotHours(found.v.startHour + hoursMoved);
      newStart = Math.max(0, Math.min(24 - found.v.duration, newStart));

      registerUndo(cloneRoster(ro0));
      setStaffRoster(() => {
        const next = ro0.map((row) => ({
          ...row,
          visits: row.visits.filter((v) => v.id !== prev.visitId),
        }));
        const ti = next.findIndex((r) => r.id === prev.targetStaffId);
        if (ti === -1) return ro0;
        const v = {
          ...found.v,
          startHour: newStart,
          dayKey,
          weekDay,
        };
        next[ti] = { ...next[ti], visits: [...next[ti].visits, v] };
        return next;
      });
      showUpdatedToast();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [moveSession, dayKey, weekDay, registerUndo, setStaffRoster]);

  const onResizeMouseDown = (
    e: React.MouseEvent,
    visit: Visit,
    staffId: string,
    edge: 'left' | 'right',
  ) => {
    e.preventDefault();
    e.stopPropagation();
    registerUndo(cloneRoster(rosterRef.current));
    const startX = e.clientX;
    const origStart = visit.startHour;
    const origDur = visit.duration;

    const onMove = (ev: MouseEvent) => {
      const dh = (ev.clientX - startX) / MIN_PIXELS_PER_HOUR;
      let newStart = origStart;
      let newDur = origDur;
      if (edge === 'right') {
        newDur = snapToSlotHours(Math.max(SLOT_HOURS, origDur + dh));
        if (origStart + newDur > 24) newDur = snapToSlotHours(24 - origStart);
      } else {
        newStart = snapToSlotHours(origStart + dh);
        newDur = snapToSlotHours(origStart + origDur - newStart);
        if (newDur < SLOT_HOURS) {
          newStart = snapToSlotHours(origStart + origDur - SLOT_HOURS);
          newDur = SLOT_HOURS;
        }
        if (newStart < 0) {
          newStart = 0;
          newDur = snapToSlotHours(origStart + origDur);
        }
      }
      setStaffRoster((ro) =>
        ro.map((row) => {
          if (row.id !== staffId) return row;
          return {
            ...row,
            visits: row.visits.map((v) =>
              v.id === visit.id ? { ...v, startHour: newStart, duration: newDur, dayKey, weekDay } : v,
            ),
          };
        }),
      );
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      showUpdatedToast();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const beginCreateRange = (e: React.MouseEvent, staffId: string) => {
    if (!e.shiftKey || staffId === 'unallocated') return;
    if ((e.target as HTMLElement).closest('[data-travel-gap]')) return;
    e.preventDefault();
    e.stopPropagation();
    const h0 = hourFromClientX(e.clientX);
    let h1 = h0;

    const onMove = (ev: MouseEvent) => {
      h1 = hourFromClientX(ev.clientX);
    };

    const cleanup = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    const onUp = () => {
      cleanup();
      const [a, b] = h0 <= h1 ? [h0, h1] : [h1, h0];
      const start = a;
      let dur = snapToSlotHours(b - a);
      if (dur < SLOT_HOURS) return;
      if (start + dur > 24) dur = snapToSlotHours(24 - start);
      const staff = staffRoster.find((s) => s.id === staffId);
      const region = staff?.regionId ?? null;
      const nv: Visit = {
        id: nextVisitId(),
        patientName: 'New visit',
        startHour: start,
        duration: dur,
        type: 'visit',
        service_type: 'personal care',
        status: 'scheduled',
        dayKey,
        weekDay,
        regionId: region,
      };
      const ro0 = rosterRef.current;
      registerUndo(cloneRoster(ro0));
      setStaffRoster(
        ro0.map((row) =>
          row.id === staffId ? { ...row, visits: [...row.visits, nv] } : row,
        ),
      );
      showUpdatedToast();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const onRowDoubleClick = (e: React.MouseEvent, staffId: string) => {
    if ((e.target as HTMLElement).closest('[data-scheduler-visit-card]')) return;
    if (staffId === 'unallocated') return;
    const h = hourFromClientX(e.clientX);
    const dur = 1;
    if (h + dur > 24) return;
    const staff = staffRoster.find((s) => s.id === staffId);
    const region = staff?.regionId ?? null;
    const nv: Visit = {
      id: nextVisitId(),
      patientName: 'New visit',
      startHour: h,
      duration: dur,
      type: 'visit',
      service_type: 'personal care',
      status: 'scheduled',
      dayKey,
      weekDay,
      regionId: region,
    };
    const ro0 = rosterRef.current;
    registerUndo(cloneRoster(ro0));
    setStaffRoster(
      ro0.map((row) =>
        row.id === staffId ? { ...row, visits: [...row.visits, nv] } : row,
      ),
    );
    showUpdatedToast();
  };

  const renderLeftCell = (row: DisplayRow) => {
    if (row.kind === 'team_header') {
      const collapsed = collapsedTeams.has(row.teamId);
      return (
        <button
          type="button"
          onClick={() => toggleTeamCollapse(row.teamId)}
          className="flex items-center justify-between w-full px-3 text-left font-semibold text-sm"
          style={{
            height: STAFF_ROW_HEIGHT,
            backgroundColor: `${row.color}18`,
            color: COLORS.neutral900,
            borderBottom: `1px solid #e2e8f0`,
          }}
        >
          <span className="truncate">{row.name}</span>
          {collapsed ? <ChevronDown className="w-4 h-4 flex-shrink-0" /> : <ChevronUp className="w-4 h-4 flex-shrink-0" />}
        </button>
      );
    }

    const staff = row.staff;
    const dayVisits = visitsForDay(staff, dayKey);

    if (staff.id === 'unallocated') {
      return (
        <div
          className="flex items-center gap-2 px-3 border-b border-slate-200 bg-amber-50/80"
          style={{ height: STAFF_ROW_HEIGHT, width: TIME_COLUMN_WIDTH }}
        >
          <Users className="w-4 h-4 flex-shrink-0 text-amber-700" />
          <span className="text-sm font-semibold text-amber-900">Unallocated</span>
        </div>
      );
    }

    return (
      <div
        className="flex items-center gap-2 px-3 border-b border-slate-200 bg-slate-50"
        style={{ height: STAFF_ROW_HEIGHT, width: TIME_COLUMN_WIDTH }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: COLORS.primary }}
        >
          {staff.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{staff.name}</p>
          <p className="text-xs text-slate-500 truncate">{staff.role}</p>
          <p className="text-xs text-slate-500">
            {dayVisits.length} visit{dayVisits.length !== 1 ? 's' : ''} today
          </p>
        </div>
      </div>
    );
  };

  const renderTimelineRow = (row: DisplayRow) => {
    if (row.kind === 'team_header') {
      return (
        <div
          key={row.key}
          className="relative border-b border-slate-200"
          style={{
            height: STAFF_ROW_HEIGHT,
            background: `linear-gradient(90deg, ${row.color}12%, transparent 40%)`,
            minWidth: MIN_PIXELS_PER_HOUR * 24,
          }}
        />
      );
    }

    const staff = row.staff;
    const dayVisits = visitsForDay(staff, dayKey);

    return (
      <div
        key={row.key}
        className={`relative border-b border-slate-200 transition-colors select-none ${
          staff.id === 'unallocated' ? 'bg-red-50/20' : 'bg-white'
        } ${
          moveSession?.isDragging &&
          moveSession.targetStaffId === staff.id &&
          moveSession.staffId !== staff.id
            ? 'bg-blue-50/50 ring-2 ring-blue-300 ring-inset'
            : ''
        }`}
        style={{ height: STAFF_ROW_HEIGHT, minWidth: MIN_PIXELS_PER_HOUR * 24 }}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest('[data-scheduler-visit-card]')) return;
          beginCreateRange(e, staff.id);
        }}
        onDoubleClick={(e) => onRowDoubleClick(e, staff.id)}
        role="presentation"
      >
        <div className="absolute inset-0 flex pointer-events-none">
          {hours.map((hour) => (
            <div
              key={hour}
              className="border-r border-slate-100 last:border-r-0 flex-shrink-0"
              style={{ width: MIN_PIXELS_PER_HOUR }}
            />
          ))}
        </div>

        {staff.id === staffRoster[0]?.id && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
            style={{ left: `${currentTimePosition}px` }}
          >
            <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rounded-full border border-white" />
          </div>
        )}

        {computeDemoTravelGaps(dayVisits, visitBlockHeight).map((g) => {
          const gk = `${g.previousVisitId}-${g.nextVisitId}`;
          const travelInteractive = !moveSession?.isDragging;
          return (
            <TravelGapConnectorWeb
              key={gk}
              gapKey={gk}
              model={g}
              interactive={travelInteractive}
              onTooltipShow={handleTravelGapTooltipShow}
              onTooltipHide={handleTravelGapTooltipHide}
              onGapPress={handleTravelGapPress}
              isTooltipPinned={!!travelTooltip?.pinned && travelTooltip.gapKey === gk}
              isTooltipActiveForThisGap={travelTooltip?.gapKey === gk}
            />
          );
        })}

        {dayVisits.map((visit) => {
          const isDraggingThis = moveSession?.isDragging && moveSession.visitId === visit.id;
          if (isDraggingThis) return null;
          const leftPx = hourToPx(visit.startHour);
          const widthPx = hourToPx(visit.duration);
          const stripe = getStripeColorForVisit(visit);
          const durMin = Math.round(visit.duration * 60);
          return (
            <div
              key={visit.id}
              data-scheduler-visit-card
              className="absolute rounded-lg z-10 group overflow-hidden bg-white border border-[#E6EAF2] shadow-sm cursor-grab"
              style={{
                left: `${leftPx}px`,
                top: 8,
                height: visitBlockHeight,
                width: `${Math.max(widthPx, 72)}px`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              }}
              onMouseDown={(e) => onVisitBodyMouseDown(e, visit, staff.id)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 z-[1]"
                style={{ width: 4, backgroundColor: stripe }}
              />
              <div
                data-resize-handle
                className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize z-20 bg-black/[0.03] border-l border-dashed border-[#CBD5E1]"
                style={{ width: 8 }}
                onMouseDown={(e) => onResizeMouseDown(e, visit, staff.id, 'left')}
              />
              <div className="flex flex-col justify-center h-full pl-3 pr-7 py-2 min-w-0 pointer-events-none">
                <div className="flex items-start justify-between gap-1 mb-0.5">
                  <span className="text-[11px] font-bold text-[#1F2937] leading-tight">
                    {formatHourLabel(visit.startHour)}
                  </span>
                  {staff.id === 'unallocated' && (
                    <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                </div>
                <p className="text-[13px] font-semibold text-[#111827] truncate leading-tight">
                  {visit.patientName}
                </p>
                {visitBlockHeight > 40 && (
                  <p className="text-[11px] text-[#6B7280] mt-0.5">{durMin}m</p>
                )}
              </div>
              <div
                className="absolute right-0 top-0 bottom-0 w-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                aria-hidden
              >
                <GripVertical className="w-3 h-3 text-[#6B7280]" />
              </div>
              <div
                data-resize-handle
                className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize z-20 bg-black/[0.03] border-r border-dashed border-[#CBD5E1]"
                style={{ width: 8 }}
                onMouseDown={(e) => onResizeMouseDown(e, visit, staff.id, 'right')}
              />
            </div>
          );
        })}

        {moveSession?.isDragging &&
          moveSession.visitId &&
          (() => {
            const hit = findVisit(moveSession.visitId);
            if (!hit || staff.id !== moveSession.staffId) return null;
            const v = hit.visit;
            const deltaX = moveSession.currentX - moveSession.startX;
            const deltaY = moveSession.currentY - moveSession.startY;
            const stripe = getStripeColorForVisit(v);
            return (
              <div
                className="fixed rounded-lg shadow-2xl z-[9999] pointer-events-none border border-[#E6EAF2] bg-white overflow-hidden"
                style={{
                  left: `${moveSession.originalLeft + deltaX}px`,
                  top: `${moveSession.originalTop + deltaY}px`,
                  width: `${Math.max(hourToPx(v.duration), 72)}px`,
                  height: visitBlockHeight,
                  opacity: 0.92,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ width: 4, backgroundColor: stripe }} />
                <div className="flex flex-col justify-center h-full pl-3 pr-2 py-2">
                  <span className="text-[11px] font-bold text-[#1F2937]">{formatHourLabel(v.startHour)}</span>
                  <span className="text-[13px] font-semibold text-[#111827] truncate">{v.patientName}</span>
                </div>
              </div>
            );
          })()}
      </div>
    );
  };

  return (
    <>
      <div className="flex-1 flex border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm min-h-0 max-h-[70vh]">
        <div className="flex max-h-[70vh] w-full min-h-0 overflow-y-auto overflow-x-hidden">
          <div
            className="flex-shrink-0 flex flex-col border-r border-slate-200 bg-white"
            style={{ width: TIME_COLUMN_WIDTH }}
            data-tour="scheduling-staff"
          >
            <div
              className="flex items-center px-3 border-b border-slate-200 bg-slate-100 font-bold text-xs text-slate-500 uppercase tracking-wide flex-shrink-0"
              style={{ height: TIME_HEADER_HEIGHT }}
            >
              Staff
            </div>
            {displayRows.map((row) => (
              <div key={row.key}>{renderLeftCell(row)}</div>
            ))}
          </div>

          <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-x-auto" data-tour="scheduling-timeline">
            <div ref={scrollRef} className="min-w-0 overflow-x-auto">
              <div style={{ minWidth: MIN_PIXELS_PER_HOUR * 24 }}>
                <div
                  className="flex border-b border-slate-200 bg-slate-100"
                  style={{ height: TIME_HEADER_HEIGHT }}
                >
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="border-r border-slate-200 last:border-r-0 px-1 flex items-center flex-shrink-0"
                      style={{ width: MIN_PIXELS_PER_HOUR }}
                    >
                      <span className="text-xs font-medium text-slate-500">
                        {String(hour).padStart(2, '0')}:00
                      </span>
                    </div>
                  ))}
                </div>
                {displayRows.map((row) => renderTimelineRow(row))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 mt-1">
        Double-click empty lane: 1h visit · Shift+drag: range (15m) · Drag edges: resize · Drag card: move · All local preview.
      </p>

      {showLocalToast && (
        <div className="fixed bottom-24 right-6 bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs text-slate-700 z-50 max-w-xs">
          Updated in this preview (local only).
        </div>
      )}

      <TravelGapTooltipWeb
        model={travelTooltip?.model ?? null}
        anchor={travelTooltip?.anchor ?? null}
        visible={!!travelTooltip}
        pinned={!!travelTooltip?.pinned}
        onRequestClose={dismissTravelGapTooltip}
      />
    </>
  );
};
