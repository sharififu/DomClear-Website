import React from 'react';
import { format, parseISO, differenceInCalendarDays } from 'date-fns';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
import {
  COLORS,
  TIME_COLUMN_WIDTH,
  type StaffRow,
  type Visit,
  type DisplayRow,
} from '../scheduler/rosterModel';
import { formatHourLabel } from '../scheduler/timeAxis';
import { getStripeColorForVisit } from '../scheduler/visitAppearance';

export interface WeeklySchedulerProps {
  weekStart: Date;
  weekDays: Date[];
  displayRows: DisplayRow[];
  toggleTeamCollapse: (id: string) => void;
  collapsedTeams: Set<string>;
}

function dayIndexInWeek(visitDayKey: string, ws: Date): number | null {
  try {
    const d = parseISO(visitDayKey);
    const i = differenceInCalendarDays(d, ws);
    if (i < 0 || i > 6) return null;
    return i;
  } catch {
    return null;
  }
}

function visitsForWeekCell(staff: StaffRow, dayIdx: number, ws: Date): Visit[] {
  return staff.visits.filter((v) => dayIndexInWeek(v.dayKey, ws) === dayIdx);
}

export const WeeklyScheduler: React.FC<WeeklySchedulerProps> = ({
  weekStart,
  weekDays,
  displayRows,
  toggleTeamCollapse,
  collapsedTeams,
}) => (
  <div className="flex-1 flex flex-col border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm min-h-0 max-h-[70vh]">
    <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex-shrink-0">
      <span className="font-semibold text-slate-800">Week of {format(weekStart, 'dd MMM yyyy')}</span>
      <span className="text-slate-400 mx-2">·</span>
      Sample visits follow the selected day (one column). Use Daily view for create, drag, resize, and undo.
    </div>
    <div className="overflow-auto flex-1">
      <div
        className="grid gap-0 border-b border-slate-200 bg-slate-100 sticky top-0 z-10"
        style={{ gridTemplateColumns: `${TIME_COLUMN_WIDTH}px repeat(7, minmax(0, 1fr))` }}
      >
        <div className="px-2 py-2 border-r border-slate-200 font-bold text-[10px] text-slate-500 uppercase">
          Staff
        </div>
        {weekDays.map((d, idx) => (
          <div key={idx} className="px-1 py-2 border-r border-slate-200 last:border-r-0 text-center">
            <div className="text-[10px] font-bold text-slate-500 uppercase">{format(d, 'EEE')}</div>
            <div className="text-[11px] text-slate-600">{format(d, 'd MMM')}</div>
          </div>
        ))}
      </div>
      {displayRows.map((row) => {
        if (row.kind === 'team_header') {
          const collapsed = collapsedTeams.has(row.teamId);
          return (
            <div
              key={row.key}
              className="flex border-b border-slate-200 items-stretch"
              style={{ background: `${row.color}12` }}
            >
              <button
                type="button"
                onClick={() => toggleTeamCollapse(row.teamId)}
                className="w-full px-3 py-2 text-xs font-semibold text-slate-800 flex items-center justify-between text-left"
              >
                <span>{row.name}</span>
                {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        }

        const staff = row.staff;
        return (
          <div
            key={row.key}
            className="grid border-b border-slate-200 last:border-b-0"
            style={{ gridTemplateColumns: `${TIME_COLUMN_WIDTH}px repeat(7, minmax(0, 1fr))` }}
          >
            <div
              className={`border-r border-slate-200 px-2 py-2 flex items-center ${
                staff.id === 'unallocated' ? 'bg-amber-50/80' : 'bg-slate-50'
              }`}
            >
              {staff.id === 'unallocated' ? (
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-xs font-semibold text-amber-900">Unallocated</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    {staff.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-900 truncate">{staff.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{staff.role}</p>
                  </div>
                </div>
              )}
            </div>
            {weekDays.map((_d, dayIdx) => {
              const show = visitsForWeekCell(staff, dayIdx, weekStart);
              return (
                <div
                  key={dayIdx}
                  className="border-r border-slate-100 last:border-r-0 p-1 min-h-[88px] bg-white align-top"
                >
                  <div className="space-y-1">
                    {show.slice(0, 4).map((visit) => {
                      const stripe = getStripeColorForVisit(visit);
                      return (
                        <div
                          key={visit.id}
                          className="rounded border border-[#E6EAF2] bg-white pl-1 pr-1.5 py-1 text-[10px] font-medium leading-tight shadow-sm flex gap-1 min-w-0"
                        >
                          <span className="w-1 rounded-sm flex-shrink-0 self-stretch" style={{ backgroundColor: stripe }} />
                          <div className="min-w-0">
                            <div className="truncate text-[#111827]">{visit.patientName}</div>
                            <div className="text-[#6B7280]">{formatHourLabel(visit.startHour)}</div>
                          </div>
                        </div>
                      );
                    })}
                    {show.length > 4 && (
                      <div className="text-[10px] text-slate-500 text-center">+{show.length - 4} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  </div>
);
