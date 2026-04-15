import React from 'react';
import {
  Plus,
  Users,
  Calendar as CalendarIcon,
  CalendarDays,
  Grid3X3,
  MapPin,
  RefreshCw,
  AlertTriangle,
  User,
} from 'lucide-react';
import { COLORS } from '../scheduler/rosterModel';

export type ViewMode = 'daily' | 'weekly';

export interface ShiftToolbarProps {
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  useTeamGrouping: boolean;
  setUseTeamGrouping: (v: boolean) => void;
  showRegionalGrouping: boolean;
  setShowRegionalGrouping: (v: boolean) => void;
  onPreviewMessage: (msg: string) => void;
  demoConflictCount: number;
}

export const ShiftToolbar: React.FC<ShiftToolbarProps> = ({
  viewMode,
  setViewMode,
  useTeamGrouping,
  setUseTeamGrouping,
  showRegionalGrouping,
  setShowRegionalGrouping,
  onPreviewMessage,
  demoConflictCount,
}) => (
  <div
    className="bg-white px-3 py-2.5 border border-slate-200 rounded-lg shadow-sm flex flex-wrap items-center gap-2"
    data-tour="scheduling-toolbar"
  >
    <div className="flex items-center gap-2 mr-1">
      <CalendarIcon className="w-5 h-5" style={{ color: COLORS.primary }} />
      <h3 className="text-base font-semibold text-slate-900">Shift Management</h3>
    </div>

    <div className="flex rounded-lg p-0.5 gap-0.5" style={{ backgroundColor: '#e2e8f0' }}>
      <button
        type="button"
        onClick={() => setViewMode('daily')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
        style={{
          backgroundColor: viewMode === 'daily' ? COLORS.primary : 'transparent',
          color: viewMode === 'daily' ? '#fff' : '#475569',
        }}
      >
        <CalendarDays className="w-3.5 h-3.5" />
        Daily
      </button>
      <button
        type="button"
        onClick={() => setViewMode('weekly')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
        style={{
          backgroundColor: viewMode === 'weekly' ? COLORS.primary : 'transparent',
          color: viewMode === 'weekly' ? '#fff' : '#475569',
        }}
      >
        <Grid3X3 className="w-3.5 h-3.5" />
        Weekly
      </button>
    </div>

    {viewMode === 'daily' && (
      <>
        <button
          type="button"
          onClick={() => setUseTeamGrouping(!useTeamGrouping)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium"
          style={{
            backgroundColor: useTeamGrouping ? COLORS.primary : '#f1f5f9',
            color: useTeamGrouping ? '#fff' : '#475569',
            borderColor: useTeamGrouping ? COLORS.primary : '#e2e8f0',
          }}
        >
          <Users className="w-3.5 h-3.5" />
          Teams
        </button>
        <button
          type="button"
          onClick={() => setShowRegionalGrouping(!showRegionalGrouping)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium"
          style={{
            backgroundColor: showRegionalGrouping ? COLORS.primary : '#f1f5f9',
            color: showRegionalGrouping ? '#fff' : '#475569',
            borderColor: showRegionalGrouping ? COLORS.primary : '#e2e8f0',
          }}
        >
          <MapPin className="w-3.5 h-3.5" />
          Regional
        </button>
      </>
    )}

    <button
      type="button"
      onClick={() =>
        onPreviewMessage('Preview only — sign in to DomiClear to review and resolve visit conflicts.')
      }
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-white"
      style={{ backgroundColor: COLORS.error }}
    >
      <AlertTriangle className="w-3.5 h-3.5" />
      Conflicts ({demoConflictCount})
    </button>

    <button
      type="button"
      onClick={() => onPreviewMessage('Preview only — sign in to DomiClear to record staff absence.')}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-900"
      style={{ backgroundColor: COLORS.warning }}
    >
      <User className="w-3.5 h-3.5" />
      Set Absence
    </button>

    <button
      type="button"
      title="Preview only"
      onClick={() => onPreviewMessage('Preview only — refresh is a visual control in this demo.')}
      className="p-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200"
    >
      <RefreshCw className="w-4 h-4" />
    </button>

    <button
      type="button"
      onClick={() => onPreviewMessage('Preview only — sign in to DomiClear to build shifts.')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white ml-auto sm:ml-0"
      style={{ backgroundColor: COLORS.secondary }}
    >
      <Plus className="w-4 h-4" />
      Build Shift
    </button>

    <button
      type="button"
      onClick={() => onPreviewMessage('Preview only — sign in to DomiClear to create visits.')}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
      style={{ backgroundColor: COLORS.primary }}
    >
      <Plus className="w-4 h-4" />
      New Visit
    </button>
  </div>
);
