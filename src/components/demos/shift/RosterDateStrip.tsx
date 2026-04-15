import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays } from 'date-fns';
import type { ViewMode } from './ShiftToolbar';

export interface RosterDateStripProps {
  viewMode: ViewMode;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const RosterDateStrip: React.FC<RosterDateStripProps> = ({
  viewMode,
  selectedDate,
  setSelectedDate,
}) => (
  <div className="bg-slate-200/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2 rounded-lg">
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="p-1 rounded hover:bg-white/60"
        onClick={() => setSelectedDate((d) => addDays(d, viewMode === 'daily' ? -1 : -7))}
      >
        <ChevronLeft className="w-4 h-4 text-slate-600" />
      </button>
      <CalendarIcon className="w-4 h-4 text-slate-600" />
      <span className="text-sm font-semibold text-slate-900">
        {viewMode === 'daily' ? 'Daily Roster' : 'Weekly Roster'}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 text-[#4370B7] hover:bg-blue-100"
        onClick={() => setSelectedDate(new Date())}
      >
        Today
      </button>
      <span className="text-xs font-medium text-slate-800">{format(selectedDate, 'EEEE, dd/MM/yyyy')}</span>
      <button
        type="button"
        className="p-1 rounded hover:bg-white/60"
        onClick={() => setSelectedDate((d) => addDays(d, viewMode === 'daily' ? 1 : 7))}
      >
        <ChevronRight className="w-3 h-3 text-slate-600" />
      </button>
    </div>
  </div>
);
