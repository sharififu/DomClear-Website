import React, { useMemo, useState, useEffect } from 'react';
import {
  Search,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  AlertTriangle,
  Filter,
  Pill,
  ChevronDown,
} from 'lucide-react';
import {
  format,
  parseISO,
  addDays,
  addMonths,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isWithinInterval,
  startOfDay,
  endOfDay,
  subDays,
  isSameDay,
} from 'date-fns';
import {
  DEMO_MAR_PATIENT_META,
  DEMO_MAR_SCHEDULES,
  MAR_HISTORY_POOL,
  filterMarAdminsInRange,
} from './mockData';
import type { DemoMARScheduleRow, DemoMARAdminRow } from './types';

type RangeKey = 'today' | 'week' | 'month';

type SelectedSlot = {
  schedule: DemoMARScheduleRow;
  day: Date;
  timeIndex: number;
  scheduledTime: string;
  admin?: DemoMARAdminRow;
};

type HistoryRange = 'all' | '7days' | '30days' | '90days';

function calcInterval(range: RangeKey, anchorDate: Date): { start: Date; end: Date } {
  if (range === 'today') {
    const d = anchorDate;
    return { start: startOfDay(d), end: endOfDay(d) };
  }
  if (range === 'month') {
    const end = endOfDay(anchorDate);
    const start = startOfDay(subDays(end, 29));
    return { start, end };
  }
  const ws = startOfWeek(anchorDate, { weekStartsOn: 1 });
  const we = endOfWeek(anchorDate, { weekStartsOn: 1 });
  return { start: startOfDay(ws), end: endOfDay(we) };
}

function scheduleActiveOnDay(s: DemoMARScheduleRow, day: Date): boolean {
  try {
    const d0 = startOfDay(day);
    const sStart = startOfDay(parseISO(s.start_date));
    const sEnd = s.end_date ? endOfDay(parseISO(s.end_date)) : new Date(8640000000000000);
    return isWithinInterval(d0, { start: sStart, end: sEnd });
  } catch {
    return true;
  }
}

function symbolFor(
  status?: string,
  isPrn?: boolean,
): { symbol: string; color: string; bgColor: string; borderColor: string; borderStyle: 'solid' | 'dashed' } {
  switch (status?.toLowerCase()) {
    case 'taken':
      return { symbol: '✓✓', color: '#4e6073', bgColor: '#e3e9ec', borderColor: 'transparent', borderStyle: 'solid' };
    case 'refused':
      return { symbol: 'R', color: '#4e6073', bgColor: '#ccdff6', borderColor: 'transparent', borderStyle: 'solid' };
    case 'missed':
      return { symbol: '!', color: '#9f403d', bgColor: '#fce8e6', borderColor: '#9f403d', borderStyle: 'solid' };
    case 'late':
      return { symbol: '🕒', color: '#b45309', bgColor: '#fef3c7', borderColor: 'transparent', borderStyle: 'solid' };
    case 'omitted':
    case 'withheld':
      return { symbol: 'O', color: '#6B7280', bgColor: '#F3F4F6', borderColor: 'transparent', borderStyle: 'solid' };
    default:
      if (isPrn) {
        return { symbol: '★', color: '#4e6073', bgColor: '#e3e9ec', borderColor: 'transparent', borderStyle: 'solid' };
      }
      return { symbol: '—', color: '#D1D5DB', bgColor: '#ffffff', borderColor: '#D1D5DB', borderStyle: 'dashed' };
  }
}

function getAdminForSlot(
  medId: string,
  day: Date,
  scheduledTime: string,
  admins: DemoMARAdminRow[],
): DemoMARAdminRow | undefined {
  const d0 = startOfDay(day);
  const d1 = endOfDay(day);
  return admins.find((a) => {
    if (a.medication_id !== medId) return false;
    try {
      const at = parseISO(a.administered_at);
      if (at < d0 || at > d1) return false;
    } catch {
      return false;
    }
    if (scheduledTime === '--') {
      return medId === '2' || !a.scheduled_time;
    }
    return (a.scheduled_time || '') === scheduledTime;
  });
}

function getStaffDisplayName(admin?: DemoMARAdminRow | null): string {
  return admin?.staff_display_name?.trim() || 'Not Recorded';
}

export const PatientMARDemoTab: React.FC = () => {
  const [historyMode, setHistoryMode] = useState(false);
  const [range, setRange] = useState<RangeKey>('week');
  const [anchorDate, setAnchorDate] = useState<Date>(new Date());
  const [dateInput, setDateInput] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [marSearch, setMarSearch] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [adminModal, setAdminModal] = useState<DemoMARAdminRow | null>(null);
  const [previewMsg, setPreviewMsg] = useState<string | null>(null);

  const [hRange, setHRange] = useState<HistoryRange>('30days');
  const [hStatus, setHStatus] = useState<string>('all');
  const [hMed, setHMed] = useState<string>('all');
  const [hSearch, setHSearch] = useState('');

  const showPreview = (msg: string) => {
    setPreviewMsg(msg);
    window.setTimeout(() => setPreviewMsg(null), 3200);
  };

  const interval = useMemo(() => calcInterval(range, anchorDate), [range, anchorDate]);

  const adminsInInterval = useMemo(
    () => filterMarAdminsInRange(interval.start, interval.end, MAR_HISTORY_POOL),
    [interval.start, interval.end],
  );

  const displayDays = useMemo(() => {
    if (range === 'week') {
      const ws = startOfWeek(anchorDate, { weekStartsOn: 1 });
      const we = endOfWeek(anchorDate, { weekStartsOn: 1 });
      return eachDayOfInterval({ start: ws, end: we });
    }
    if (range === 'today') return [startOfDay(anchorDate)];
    return eachDayOfInterval({ start: interval.start, end: interval.end });
  }, [range, anchorDate, interval.start, interval.end]);

  const schedulesFiltered = useMemo(
    () =>
      DEMO_MAR_SCHEDULES.filter((s) =>
        s.medication_name.toLowerCase().includes(marSearch.trim().toLowerCase()),
      ),
    [marSearch],
  );

  const stats = useMemo(() => {
    const taken = adminsInInterval.filter((a) => a.status === 'taken').length;
    const refused = adminsInInterval.filter((a) => a.status === 'refused').length;
    const missed = adminsInInterval.filter((a) => a.status === 'missed').length;
    const late = adminsInInterval.filter((a) => a.status === 'late').length;
    const prnMedIds = new Set(
      DEMO_MAR_SCHEDULES.filter((s) => s.frequency?.toLowerCase().includes('prn')).map((s) => s.medication_id),
    );
    const prn = adminsInInterval.filter((a) => prnMedIds.has(a.medication_id)).length;
    let scheduled = 0;
    schedulesFiltered.forEach((s) => {
      displayDays.forEach((d) => {
        if (!scheduleActiveOnDay(s, d)) return;
        const times = s.scheduled_times?.length ? s.scheduled_times : ['--'];
        times.forEach((t) => {
          if (t === '--') return;
          scheduled += 1;
        });
      });
    });
    return { taken, refused, missed, late, prn, scheduled };
  }, [adminsInInterval, schedulesFiltered, displayDays]);

  useEffect(() => {
    setSelectedSlot(null);
  }, [range, anchorDate, historyMode]);

  function shiftInterval(direction: -1 | 1) {
    if (range === 'today') setAnchorDate(addDays(anchorDate, direction));
    else if (range === 'week') setAnchorDate(addDays(anchorDate, direction * 7));
    else setAnchorDate(addMonths(anchorDate, direction));
  }

  function jumpToDate() {
    try {
      const d = parseISO(dateInput);
      if (!isNaN(d.getTime())) setAnchorDate(d);
    } catch {
      /* ignore */
    }
  }

  const historyFiltered = useMemo(() => {
    let rows = [...MAR_HISTORY_POOL];
    const now = new Date();
    if (hRange !== 'all') {
      const days = hRange === '7days' ? 7 : hRange === '30days' ? 30 : 90;
      const start = startOfDay(subDays(now, days));
      rows = rows.filter((a) => parseISO(a.administered_at) >= start);
    }
    if (hStatus !== 'all') {
      rows = rows.filter((a) => a.status === hStatus);
    }
    if (hMed !== 'all') {
      rows = rows.filter((a) => a.medication_id === hMed);
    }
    const q = hSearch.trim().toLowerCase();
    if (q) {
      rows = rows.filter((a) => {
        const med = DEMO_MAR_SCHEDULES.find((s) => s.medication_id === a.medication_id)?.medication_name ?? '';
        return (
          med.toLowerCase().includes(q) ||
          (a.notes?.toLowerCase().includes(q) ?? false) ||
          (a.staff_display_name?.toLowerCase().includes(q) ?? false)
        );
      });
    }
    return rows.sort((a, b) => parseISO(b.administered_at).getTime() - parseISO(a.administered_at).getTime());
  }, [hRange, hStatus, hMed, hSearch]);

  const historyStats = useMemo(() => {
    const total = historyFiltered.length;
    const taken = historyFiltered.filter((a) => a.status === 'taken').length;
    const missed = historyFiltered.filter((a) => a.status === 'missed').length;
    const refused = historyFiltered.filter((a) => a.status === 'refused').length;
    const denom = taken + missed + refused;
    const complianceRate = denom === 0 ? 0 : Math.round((taken / denom) * 100);
    return { total, taken, missed, refused, complianceRate };
  }, [historyFiltered]);

  const medOptions = useMemo(
    () => DEMO_MAR_SCHEDULES.map((s) => ({ id: s.medication_id, name: s.medication_name })),
    [],
  );

  if (historyMode) {
    return (
      <div
        className="bg-white rounded-lg border border-[rgba(20,30,60,0.08)] p-6 space-y-6"
        data-tour="patient-mar-history"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A]">Medication Administration Record — History</h3>
            <p className="text-sm text-[#586064] mt-1">
              Complete administration history for {DEMO_MAR_PATIENT_META.name} (demo data, preview only)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setHistoryMode(false)}
              className="px-4 py-2 rounded-lg border border-[#abb3b7] text-sm font-semibold text-[#4e6073] bg-white hover:bg-slate-50"
            >
              MAR Chart
            </button>
            <button
              type="button"
              onClick={() => showPreview('Export is preview-only in this demo.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#abb3b7] text-sm font-semibold text-[#4e6073] bg-white"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center" data-tour="patient-mar-history-filters">
          {(
            [
              { k: '7days' as const, label: '7 Days' },
              { k: '30days' as const, label: '30 Days' },
              { k: '90days' as const, label: '90 Days' },
              { k: 'all' as const, label: 'All' },
            ]
          ).map(({ k, label }) => (
            <button
              key={k}
              type="button"
              onClick={() => setHRange(k)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                hRange === k ? 'bg-[#4370B7] text-white' : 'bg-[#e3e9ec] text-[#4e6073]'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="relative flex items-center border border-[#e3e9ec] rounded-lg px-2 bg-white">
            <Search className="w-4 h-4 text-[#abb3b7]" />
            <input
              className="pl-2 pr-2 py-2 text-sm outline-none min-w-[140px]"
              placeholder="Search…"
              value={hSearch}
              onChange={(e) => setHSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 border border-[#e3e9ec] rounded-lg px-2 bg-white">
            <Filter className="w-4 h-4 text-[#abb3b7]" />
            <select
              className="py-2 text-sm bg-transparent outline-none"
              value={hStatus}
              onChange={(e) => setHStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="taken">Taken</option>
              <option value="missed">Missed</option>
              <option value="refused">Refused</option>
              <option value="late">Late</option>
            </select>
          </div>
          <div className="flex items-center gap-1 border border-[#e3e9ec] rounded-lg px-2 bg-white">
            <Pill className="w-4 h-4 text-[#abb3b7]" />
            <select
              className="py-2 text-sm bg-transparent outline-none"
              value={hMed}
              onChange={(e) => setHMed(e.target.value)}
            >
              <option value="all">All medications</option>
              {medOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#e3e9ec] p-4 bg-[#f8f9fa]">
            <div className="text-xs text-[#586064] font-semibold">Total (filtered)</div>
            <div className="text-2xl font-bold text-[#2b3437]">{historyStats.total}</div>
          </div>
          <div className="rounded-xl border border-[#e3e9ec] p-4 bg-[#f0fdf4]">
            <div className="text-xs text-green-700 font-semibold">Taken</div>
            <div className="text-2xl font-bold text-green-800">{historyStats.taken}</div>
          </div>
          <div className="rounded-xl border border-[#e3e9ec] p-4 bg-[#fff5f5]">
            <div className="text-xs text-red-700 font-semibold">Missed</div>
            <div className="text-2xl font-bold text-red-800">{historyStats.missed}</div>
          </div>
          <div className="rounded-xl border border-[#e3e9ec] p-4 bg-[#eff6ff]">
            <div className="text-xs text-blue-700 font-semibold">Compliance (demo)</div>
            <div className="text-2xl font-bold text-blue-900">{historyStats.complianceRate}%</div>
          </div>
        </div>

        <div className="divide-y divide-[#e3e9ec] border border-[#e3e9ec] rounded-xl overflow-hidden max-h-[480px] overflow-y-auto">
          {historyFiltered.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#586064]">No rows match filters.</div>
          ) : (
            historyFiltered.map((row) => {
              const med = DEMO_MAR_SCHEDULES.find((s) => s.medication_id === row.medication_id);
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => setAdminModal(row)}
                  className="w-full text-left p-4 hover:bg-[#f8f9fa] flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <div className="font-semibold text-[#2b3437]">{med?.medication_name ?? 'Medication'}</div>
                    <div className="text-xs text-[#586064]">
                      {format(parseISO(row.administered_at), 'PPp')} ·{' '}
                      <span className="uppercase">{row.status}</span>
                    </div>
                    {row.notes && <div className="text-xs text-[#586064] mt-1">{row.notes}</div>}
                  </div>
                  <div className="text-xs text-[#586064]">{getStaffDisplayName(row)}</div>
                </button>
              );
            })
          )}
        </div>

        {previewMsg && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-[10000]">
            {previewMsg}
          </div>
        )}

        {adminModal && (
          <AdminDetailModal
            admin={adminModal}
            patientName={DEMO_MAR_PATIENT_META.name}
            onClose={() => setAdminModal(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="bg-[#f8f9fa] rounded-lg border border-[rgba(20,30,60,0.08)] p-6 space-y-6"
      data-tour="patient-mar-panel"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A]">Medication Administration Record (MAR)</h3>
          <p className="text-sm text-[#586064] mt-1">
            Chart and history for {DEMO_MAR_PATIENT_META.name} — interactive preview only
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setHistoryMode(true)}
            className="px-4 py-2 rounded-lg bg-[#4370B7] text-white text-sm font-semibold hover:opacity-95"
            data-tour="patient-mar-history-toggle"
          >
            MAR History
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e3e9ec] p-6 space-y-6 shadow-sm">
        {/* CMS-style page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" data-tour="patient-mar-header">
          <div>
            <h4 className="text-xl font-bold text-[#2b3437]">Medication Administration Record</h4>
            <p className="text-sm text-[#586064] mt-1">Complete administration history and chart</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => showPreview('Export PDF is preview-only in this demo.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#abb3b7] bg-white text-sm font-semibold text-[#4e6073]"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              type="button"
              onClick={() => showPreview('Print is preview-only in this demo.')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#abb3b7] bg-white text-sm font-semibold text-[#4e6073]"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-[#586064] border-b border-[#e3e9ec] pb-4">
          <span>Patient: {DEMO_MAR_PATIENT_META.name}</span>
          <span>DOB: {DEMO_MAR_PATIENT_META.dob}</span>
          <span>Allergies: {DEMO_MAR_PATIENT_META.allergies}</span>
        </div>

        {/* Toolbar */}
        <div
          className="flex flex-col xl:flex-row xl:items-center gap-4 pb-2 border-b border-[#e3e9ec]"
          data-tour="patient-mar-toolbar"
        >
          <div className="flex rounded-lg bg-[#e3e9ec] p-1">
            {(['today', 'week', 'month'] as RangeKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setRange(key)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
                  range === key ? 'bg-white text-[#2b3437] shadow-sm' : 'text-[#586064]'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shiftInterval(-1)}
              className="p-2 rounded-lg border border-[#e3e9ec] bg-white hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-[#4e6073]" />
            </button>
            <span className="text-sm font-semibold text-[#2b3437] min-w-[140px] text-center">
              {format(interval.start, 'dd MMM')} – {format(interval.end, 'dd MMM')}
            </span>
            <button
              type="button"
              onClick={() => shiftInterval(1)}
              className="p-2 rounded-lg border border-[#e3e9ec] bg-white hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-[#4e6073]" />
            </button>
            <button
              type="button"
              onClick={() => {
                const n = new Date();
                setAnchorDate(n);
                setDateInput(format(n, 'yyyy-MM-dd'));
              }}
              className="px-3 py-2 text-sm font-semibold rounded-lg bg-[#e3e9ec] text-[#4e6073]"
            >
              Today
            </button>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-2 justify-end">
            <div className="flex items-center gap-2 border border-[#e3e9ec] rounded-lg px-2 bg-[#f8f9fa] min-w-[200px]">
              <Calendar className="w-4 h-4 text-[#abb3b7]" />
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="py-2 text-sm bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={jumpToDate}
                className="text-xs font-semibold text-[#4370B7] px-2"
              >
                Go
              </button>
            </div>
            <div className="flex items-center gap-2 border border-[#e3e9ec] rounded-lg px-2 bg-white min-w-[180px]">
              <Search className="w-4 h-4 text-[#abb3b7]" />
              <input
                className="py-2 text-sm outline-none flex-1 min-w-0"
                placeholder="Search medication…"
                value={marSearch}
                onChange={(e) => setMarSearch(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#e3e9ec] text-xs font-semibold text-[#586064] bg-white"
            >
              All Caregivers
              <ChevronDown className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#e3e9ec] text-xs font-semibold text-[#586064] bg-white"
            >
              All Statuses
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3" data-tour="patient-mar-kpi">
          {(
            [
              { label: 'Doses due', value: stats.scheduled, Icon: Calendar, accent: '#f0f4f8' },
              { label: 'Administered', value: stats.taken, Icon: CheckCircle, accent: '#f0f4f8' },
              { label: 'Late', value: stats.late, Icon: Clock, accent: '#fef3c7', valueColor: '#b45309' },
              { label: 'Missed', value: stats.missed, Icon: AlertTriangle, accent: '#fee2e2', valueColor: '#9f403d' },
              { label: 'Refused', value: stats.refused, Icon: XCircle, accent: '#e0e7ff' },
              { label: 'PRN', value: stats.prn, Icon: Star, accent: '#f0f4f8' },
            ] as const
          ).map(({ label, value, Icon, accent, valueColor }) => (
            <div key={label} className="rounded-xl border border-[#e3e9ec] p-3 bg-white">
              <div className="text-[11px] font-semibold text-[#586064] truncate">{label}</div>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xl font-bold ${valueColor ? '' : 'text-[#2b3437]'}`} style={valueColor ? { color: valueColor } : undefined}>
                  {value}
                </span>
                <span className="p-2 rounded-lg" style={{ backgroundColor: accent }}>
                  <Icon className="w-4 h-4" style={{ color: valueColor ?? '#4e6073' }} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main layout: grid + sidebar */}
        <div className="flex flex-col xl:flex-row gap-4 items-start">
          <div className="flex-1 min-w-0 w-full" data-tour="patient-mar-grid">
            {range !== 'month' && displayDays.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-[#e3e9ec] bg-white">
                <div className="min-w-[720px]">
                  <div className="grid" style={{ gridTemplateColumns: `200px repeat(${displayDays.length}, minmax(88px, 1fr))` }}>
                    <div className="px-3 py-3 bg-[#f8f9fa] border-b border-r border-[#e3e9ec] text-[10px] font-bold text-[#586064] tracking-wide">
                      MEDICATION DETAILS
                    </div>
                    {displayDays.map((d, i) => (
                      <div
                        key={i}
                        className="px-2 py-3 bg-[#f8f9fa] border-b border-r border-[#e3e9ec] text-center last:border-r-0"
                      >
                        <div className="text-[10px] font-bold text-[#586064]">{format(d, 'EEE').toUpperCase()}</div>
                        <div className="text-xs font-semibold text-[#2b3437]">{format(d, 'dd MMM')}</div>
                      </div>
                    ))}
                    {schedulesFiltered.flatMap((s) => {
                      const isPrn = s.frequency?.toLowerCase().includes('prn');
                      const times = s.scheduled_times?.length ? s.scheduled_times : ['--'];
                      return times.map((t, idx) => (
                        <React.Fragment key={`${s.id}-${idx}`}>
                          <div className="px-3 py-3 border-b border-r border-[#e3e9ec] bg-white">
                            <div className="text-sm font-semibold text-[#2b3437]">{s.medication_name}</div>
                            <div className="text-xs text-[#586064] mt-1">
                              {s.route} • {isPrn ? 'PRN' : s.frequency}
                              {t !== '--' ? ` • ${t}` : ''}
                            </div>
                            {s.indication && (
                              <div className="mt-2 inline-block px-2 py-0.5 rounded bg-[#e3e9ec] text-[9px] font-bold text-[#4e6073]">
                                {s.indication.toUpperCase()}
                              </div>
                            )}
                          </div>
                          {displayDays.map((d, di) => {
                            const admin = getAdminForSlot(s.medication_id, d, t, adminsInInterval);
                            const { symbol, color, bgColor, borderColor, borderStyle } = symbolFor(
                              admin?.status,
                              isPrn,
                            );
                            const staffName = getStaffDisplayName(admin);
                            const isSelected =
                              selectedSlot &&
                              selectedSlot.schedule.id === s.id &&
                              selectedSlot.timeIndex === idx &&
                              isSameDay(selectedSlot.day, d);
                            return (
                              <button
                                key={di}
                                type="button"
                                onClick={() =>
                                  setSelectedSlot({
                                    schedule: s,
                                    day: d,
                                    timeIndex: idx,
                                    scheduledTime: t,
                                    admin,
                                  })
                                }
                                className={`min-h-[88px] px-1 py-2 border-b border-r border-[#e3e9ec] flex flex-col items-center justify-center gap-1 last:border-r-0 ${
                                  isSelected ? 'bg-[#eef2ff]' : 'bg-white'
                                } hover:bg-slate-50/80`}
                              >
                                <div
                                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                                  style={{
                                    backgroundColor: bgColor,
                                    borderColor: isSelected ? '#4e6073' : borderColor,
                                    borderStyle,
                                    borderWidth: isSelected ? 2 : 1,
                                  }}
                                >
                                  <span style={{ color }}>{symbol}</span>
                                </div>
                                {admin && (
                                  <span className="text-[9px] text-[#586064] text-center leading-tight line-clamp-2 px-0.5">
                                    {staffName}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </React.Fragment>
                      ));
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[#e3e9ec] bg-white p-6 space-y-4">
                <h5 className="font-semibold text-[#2b3437]">30-day activity summary</h5>
                <p className="text-sm text-[#586064]">
                  Month range in the app focuses on analytics; this demo lists administrations by day in the selected
                  window.
                </p>
                <div className="max-h-[360px] overflow-y-auto divide-y divide-[#e3e9ec]">
                  {eachDayOfInterval({ start: interval.start, end: interval.end }).map((d) => {
                    const dayAdmins = adminsInInterval.filter(
                      (a) => format(parseISO(a.administered_at), 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd'),
                    );
                    if (dayAdmins.length === 0) return null;
                    return (
                      <div key={format(d, 'yyyy-MM-dd')} className="py-3">
                        <div className="text-xs font-bold text-[#586064] mb-2">{format(d, 'EEEE dd MMM')}</div>
                        <ul className="space-y-1">
                          {dayAdmins.map((a) => (
                            <li key={a.id}>
                              <button
                                type="button"
                                className="text-sm text-[#4370B7] hover:underline"
                                onClick={() => setAdminModal(a)}
                              >
                                {DEMO_MAR_SCHEDULES.find((s) => s.medication_id === a.medication_id)?.medication_name} —{' '}
                                {format(parseISO(a.administered_at), 'HH:mm')} ({a.status})
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 items-center" data-tour="patient-mar-legend">
              {[
                { label: 'GIVEN', symbol: '✓✓', color: '#4e6073', bgColor: '#e3e9ec' },
                { label: 'LATE', symbol: '🕒', color: '#b45309', bgColor: '#fef3c7' },
                { label: 'MISSED', symbol: '!', color: '#9f403d', bgColor: '#fce8e6', borderColor: '#9f403d' },
                { label: 'REFUSED', symbol: 'R', color: '#4e6073', bgColor: '#ccdff6' },
                { label: 'PRN (AS NEEDED)', symbol: '★', color: '#4e6073', bgColor: '#e3e9ec' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border"
                    style={{
                      backgroundColor: item.bgColor,
                      borderColor: item.borderColor ?? 'transparent',
                      color: item.color,
                    }}
                  >
                    {item.symbol}
                  </div>
                  <span className="text-[11px] font-semibold text-[#586064]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slot sidebar (always mounted for tour + CMS parity) */}
          <div
            className="w-full xl:w-[300px] shrink-0 rounded-xl border border-[#e3e9ec] bg-white p-4 shadow-sm"
            data-tour="patient-mar-sidebar"
          >
            {!selectedSlot ? (
              <div>
                <h5 className="font-bold text-[#2b3437] mb-2">Slot details</h5>
                <p className="text-sm text-[#586064] leading-relaxed">
                  Select a cell in the MAR matrix to see scheduled time, status, assigned staff, notes, and preview
                  actions — demo data only.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-bold text-[#2b3437]">Slot Details</h5>
                  <button
                    type="button"
                    onClick={() => setSelectedSlot(null)}
                    className="p-1 rounded hover:bg-slate-100"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-[#2b3437]" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{
                        color: symbolFor(
                          selectedSlot.admin?.status,
                          selectedSlot.schedule.frequency?.toLowerCase().includes('prn'),
                        ).color,
                      }}
                    >
                      {selectedSlot.admin?.status ? selectedSlot.admin.status.toUpperCase() : 'NOT DUE'}
                    </div>
                    <div className="text-base font-semibold text-[#2b3437] mt-1">
                      {selectedSlot.schedule.medication_name}
                    </div>
                    <div className="text-sm text-[#586064]">{format(selectedSlot.day, 'EEE dd MMM yyyy')}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#586064]">Scheduled</span>
                    <span className="font-semibold text-[#2b3437]">
                      {selectedSlot.scheduledTime === '--' ? '—' : selectedSlot.scheduledTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#586064]">Actual</span>
                    <span className="font-semibold text-[#2b3437]">
                      {selectedSlot.admin?.administered_at
                        ? format(parseISO(selectedSlot.admin.administered_at), 'HH:mm')
                        : '--:--'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#586064]">Assigned Staff</span>
                    <span className="font-semibold text-[#2b3437] text-right">
                      {getStaffDisplayName(selectedSlot.admin)}
                    </span>
                  </div>
                  {selectedSlot.admin?.notes && (
                    <div
                      className="rounded-lg p-3 text-sm"
                      style={{
                        backgroundColor: symbolFor(selectedSlot.admin?.status).bgColor,
                        color: symbolFor(selectedSlot.admin?.status).color,
                      }}
                    >
                      <div className="text-[10px] font-bold text-[#586064] mb-1">Reason / notes</div>
                      &quot;{selectedSlot.admin.notes}&quot;
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => showPreview('Incident report is not linked in this demo.')}
                    className="w-full py-2.5 rounded-lg bg-[#4e6073] text-white text-sm font-semibold"
                  >
                    View Incident Report
                  </button>
                  <button
                    type="button"
                    onClick={() => showPreview('Re-schedule is preview-only in this demo.')}
                    className="w-full py-2.5 rounded-lg border border-[#abb3b7] text-[#4e6073] text-sm font-semibold bg-white"
                  >
                    Re-Schedule Dose
                  </button>
                  <button
                    type="button"
                    onClick={() => selectedSlot.admin && setAdminModal(selectedSlot.admin)}
                    disabled={!selectedSlot.admin}
                    className="w-full py-2 text-sm font-semibold text-[#4370B7] disabled:opacity-40"
                  >
                    Open administration record
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {previewMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-[10000]">
          {previewMsg}
        </div>
      )}

      {adminModal && (
        <AdminDetailModal
          admin={adminModal}
          patientName={DEMO_MAR_PATIENT_META.name}
          onClose={() => setAdminModal(null)}
        />
      )}
    </div>
  );
};

function AdminDetailModal({
  admin,
  patientName,
  onClose,
}: {
  admin: DemoMARAdminRow;
  patientName: string;
  onClose: () => void;
}) {
  const med = DEMO_MAR_SCHEDULES.find((s) => s.medication_id === admin.medication_id);
  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/45">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-[#e3e9ec] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e3e9ec]">
          <h3 className="font-bold text-[#2b3437]">Administration detail</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-3 text-sm">
          <div>
            <div className="text-[10px] font-bold text-[#586064] uppercase">Patient</div>
            <div>{patientName}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#586064] uppercase">Medication</div>
            <div>{med?.medication_name ?? '—'}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#586064] uppercase">Date / time</div>
            <div>{format(parseISO(admin.administered_at), 'PPpp')}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#586064] uppercase">Status</div>
            <div className="uppercase font-semibold">{admin.status}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#586064] uppercase">Staff</div>
            <div>{getStaffDisplayName(admin)}</div>
          </div>
          {admin.notes && (
            <div>
              <div className="text-[10px] font-bold text-[#586064] uppercase">Notes</div>
              <div>{admin.notes}</div>
            </div>
          )}
          <p className="text-xs text-[#586064] pt-2 border-t border-[#e3e9ec]">
            Live eMAR in DomiClear links to witness workflows and incident reporting — this modal is a static preview.
          </p>
        </div>
      </div>
    </div>
  );
}
