import React, { useMemo, useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  RefreshCw,
  Download,
  BarChart3,
  Search,
  X,
  Calendar,
  Clock,
  User,
  Globe,
  Eye,
  ShieldAlert,
  Database,
  Pill,
  Users,
  Activity,
  FileText,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  format,
  parseISO,
  subDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from 'date-fns';
import { DemoHeader } from './DemoHeader';
import {
  COMPLIANCE_AUDITS,
  INCIDENT_REPORTS,
  DEMO_AUDIT_LOGS,
} from './mockData';
import { AuditChecklist, IncidentReport, DemoAuditLog } from './types';
import { DemoTour, useDemoTour } from './DemoTour';
import { TourButton } from './TourButton';

type DateRangeKey = 'today' | 'week' | 'month' | 'custom';
type CategoryFilter = 'all' | 'critical' | 'medication' | 'patient' | 'staff';

function isOffHours(ts: string): boolean {
  try {
    const h = parseISO(ts).getHours();
    return h < 7 || h >= 19;
  } catch {
    return false;
  }
}

function isOffHoursMed(ts: string, table: string, action: string): boolean {
  try {
    const h = parseISO(ts).getHours();
    return table === 'medication_administrations' && action === 'update' && (h < 7 || h >= 22);
  } catch {
    return false;
  }
}

function computeIntegrityScore(logs: DemoAuditLog[]): { score: number; label: string; color: string; bg: string } {
  const deleteCount = logs.filter((l) => l.action === 'delete').length;
  const exportCount = logs.filter((l) => l.action === 'export').length;
  const offHoursCount = logs.filter((l) => isOffHours(l.timestamp)).length;
  const deleteDeduction = Math.min(deleteCount * 5, 25);
  const exportDeduction = Math.min(exportCount * 8, 24);
  const offHoursDeduction = Math.min(offHoursCount * 4, 20);
  const totalDeduction = deleteDeduction + exportDeduction + offHoursDeduction;
  const score = Math.max(0, 100 - totalDeduction);
  if (score >= 85) return { score, label: 'Compliant', color: '#16a34a', bg: '#f0fdf4' };
  if (score >= 65) return { score, label: 'Monitor', color: '#d97706', bg: '#fffbeb' };
  return { score, label: 'At Risk', color: '#dc2626', bg: '#fff5f5' };
}

function alertTitle(log: DemoAuditLog): string {
  if (log.action === 'export') return 'Data Export Detected';
  if (log.action === 'delete') {
    const t = log.table_name?.replace(/_/g, ' ');
    return `Record Deleted${t ? ` — ${t}` : ''}`;
  }
  if (isOffHours(log.timestamp)) return 'Off-Hours System Access';
  return 'High-Risk Action';
}

function alertSubtitle(log: DemoAuditLog): string {
  if (log.action === 'export') return 'Bulk data exported outside normal parameters';
  if (log.action === 'delete') return 'Deletion of clinical record requires justification';
  if (isOffHours(log.timestamp)) return 'System accessed outside working hours (07:00–19:00)';
  return 'Flagged by automated compliance monitor';
}

export const ComplianceDemo: React.FC = () => {
  const [audits] = useState<AuditChecklist[]>(COMPLIANCE_AUDITS);
  const [incidents] = useState<IncidentReport[]>(INCIDENT_REPORTS);
  const [logs] = useState<DemoAuditLog[]>(DEMO_AUDIT_LOGS);

  const [cqcInspectionMode, setCqcInspectionMode] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeKey>('week');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<CategoryFilter>('all');
  const [timelineView, setTimelineView] = useState(false);
  const [sortColumn, setSortColumn] = useState<'timestamp' | 'user_name' | 'action' | 'table_name' | null>(
    'timestamp',
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv');
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);
  const [detailLog, setDetailLog] = useState<DemoAuditLog | null>(null);
  const [demoNewLogs] = useState(3);

  const tour = useDemoTour('compliance');

  const showPreview = (msg: string) => {
    setPreviewMessage(msg);
    window.setTimeout(() => setPreviewMessage(null), 3200);
  };

  const handleReset = () => {
    setCqcInspectionMode(false);
    setDateRange('week');
    setCustomStart('');
    setCustomEnd('');
    setSearchQuery('');
    setSelectedFilter('all');
    setTimelineView(false);
    setSortColumn('timestamp');
    setSortDirection('desc');
    setCurrentPage(1);
    setDismissedAlerts(new Set());
    setShowExportModal(false);
    setDetailLog(null);
  };

  const effectiveFilter: CategoryFilter = cqcInspectionMode ? 'critical' : selectedFilter;

  const { rangeStart, rangeEnd } = useMemo(() => {
    const now = new Date();
    if (dateRange === 'custom' && customStart && customEnd) {
      return {
        rangeStart: startOfDay(parseISO(customStart)),
        rangeEnd: endOfDay(parseISO(customEnd)),
      };
    }
    switch (dateRange) {
      case 'today':
        return { rangeStart: startOfDay(now), rangeEnd: now };
      case 'week':
        return { rangeStart: startOfDay(subDays(now, 7)), rangeEnd: now };
      case 'month':
        return { rangeStart: startOfDay(subDays(now, 30)), rangeEnd: now };
      default:
        return { rangeStart: startOfDay(now), rangeEnd: now };
    }
  }, [dateRange, customStart, customEnd]);

  const dateFiltered = useMemo(
    () =>
      logs.filter((l) => {
        try {
          const t = parseISO(l.timestamp);
          return isWithinInterval(t, { start: rangeStart, end: rangeEnd });
        } catch {
          return false;
        }
      }),
    [logs, rangeStart, rangeEnd],
  );

  const searchFiltered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return dateFiltered;
    return dateFiltered.filter(
      (l) =>
        l.user_name.toLowerCase().includes(q) ||
        l.table_name.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        (l.details?.toLowerCase().includes(q) ?? false) ||
        l.ip_address.includes(q),
    );
  }, [dateFiltered, searchQuery]);

  const categoryFiltered = useMemo(() => {
    if (effectiveFilter === 'all') return searchFiltered;
    if (effectiveFilter === 'critical') {
      return searchFiltered.filter(
        (l) => l.action === 'delete' || l.action === 'export' || isOffHours(l.timestamp),
      );
    }
    if (effectiveFilter === 'medication') {
      return searchFiltered.filter((l) => l.table_name.toLowerCase().includes('medication'));
    }
    if (effectiveFilter === 'patient') {
      return searchFiltered.filter((l) => l.table_name.toLowerCase().includes('patient'));
    }
    if (effectiveFilter === 'staff') {
      return searchFiltered.filter((l) => l.table_name.toLowerCase().includes('staff'));
    }
    return searchFiltered;
  }, [searchFiltered, effectiveFilter]);

  const integrity = useMemo(() => computeIntegrityScore(dateFiltered), [dateFiltered]);

  const clinicalSignals = useMemo(() => {
    const signals: Array<{
      title: string;
      detail: string;
      why: string;
      severity: 'high' | 'medium' | 'low';
    }> = [];
    const offHoursMedLogs = dateFiltered.filter((l) =>
      isOffHoursMed(l.timestamp, l.table_name, l.action),
    );
    if (offHoursMedLogs.length > 0) {
      signals.push({
        title: 'Out-of-Schedule Medication Updates',
        detail: `${offHoursMedLogs.length} medication record${offHoursMedLogs.length > 1 ? 's' : ''} updated outside safe hours`,
        why: 'CQC requires documented justification for out-of-hours clinical changes',
        severity: 'medium',
      });
    }
    const userReadCounts: Record<string, number> = {};
    dateFiltered.filter((l) => l.action === 'read').forEach((l) => {
      userReadCounts[l.user_id] = (userReadCounts[l.user_id] || 0) + 1;
    });
    const heavy = Object.entries(userReadCounts).find(([, c]) => c > 15);
    if (heavy) {
      const [uid, count] = heavy;
      const name = dateFiltered.find((l) => l.user_id === uid)?.user_name ?? 'A user';
      signals.push({
        title: 'Unusual Access Pattern',
        detail: `${name} accessed ${count} records in this period`,
        why: 'Excessive record access may indicate data harvesting or inappropriate browsing',
        severity: 'high',
      });
    }
    const todayLogs = dateFiltered.filter((l) => format(parseISO(l.timestamp), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'));
    if (todayLogs.length === 0 && new Date().getHours() >= 10 && dateRange === 'today') {
      signals.push({
        title: 'Missing Activity Logs',
        detail: 'No activity recorded today after 10:00 AM',
        why: 'Gaps in audit logs may indicate system issues or deliberate log suppression',
        severity: 'low',
      });
    }
    return signals;
  }, [dateFiltered, dateRange]);

  const criticalLogs = useMemo(
    () =>
      dateFiltered
        .filter((l) => {
          const critical = l.action === 'delete' || l.action === 'export' || isOffHours(l.timestamp);
          return critical && !dismissedAlerts.has(l.id);
        })
        .slice(0, 5),
    [dateFiltered, dismissedAlerts],
  );

  const sortedLogs = useMemo(() => {
    const copy = [...categoryFiltered];
    if (!sortColumn) return copy;
    copy.sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';
      switch (sortColumn) {
        case 'timestamp':
          av = parseISO(a.timestamp).getTime();
          bv = parseISO(b.timestamp).getTime();
          break;
        case 'user_name':
          av = a.user_name.toLowerCase();
          bv = b.user_name.toLowerCase();
          break;
        case 'action':
          av = a.action;
          bv = b.action;
          break;
        case 'table_name':
          av = a.table_name;
          bv = b.table_name;
          break;
        default:
          return 0;
      }
      if (av < bv) return sortDirection === 'asc' ? -1 : 1;
      if (av > bv) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [categoryFiltered, sortColumn, sortDirection]);

  const totalRecords = sortedLogs.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const pageSlice = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedLogs.slice(start, start + pageSize);
  }, [sortedLogs, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [dateRange, searchQuery, effectiveFilter, customStart, customEnd]);

  const toggleSort = (col: typeof sortColumn) => {
    if (sortColumn !== col) {
      setSortColumn(col);
      setSortDirection('desc');
    } else {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    }
  };

  const actionCounts = useMemo(() => {
    const m: Record<string, number> = {};
    dateFiltered.forEach((l) => {
      m[l.action] = (m[l.action] || 0) + 1;
    });
    return m;
  }, [dateFiltered]);

  const trendByDay = useMemo(() => {
    const days: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const key = format(d, 'yyyy-MM-dd');
      const label = format(d, 'EEE d');
      const count = dateFiltered.filter((l) => format(parseISO(l.timestamp), 'yyyy-MM-dd') === key).length;
      days.push({ label, count });
    }
    const max = Math.max(1, ...days.map((x) => x.count));
    return { days, max };
  }, [dateFiltered]);

  const overallScore = Math.round(audits.reduce((sum, a) => sum + a.score, 0) / audits.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'non-compliant':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-blue-600 bg-blue-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const filterChipClass = (key: CategoryFilter) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
      effectiveFilter === key
        ? 'bg-[#4370B7] text-white border-[#4370B7]'
        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
    }`;

  const onExportConfirm = () => {
    setShowExportModal(false);
    showPreview(`Export (${exportFormat.toUpperCase()}) is preview-only — no file is generated in this demo.`);
  };

  const SortHint = ({ col }: { col: NonNullable<typeof sortColumn> }) =>
    sortColumn === col ? (
      <span className="text-[10px] text-slate-400 ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
    ) : null;

  return (
    <div className="h-full flex flex-col bg-[#F4F6F8]">
      <DemoHeader
        title="Audit Dashboard"
        subtitle="Compliance Intelligence — interactive preview"
        onReset={handleReset}
        extraActions={
          <TourButton onStart={tour.startTour} hasCompleted={tour.hasCompleted} label="Guided tour" />
        }
      />
      <DemoTour
        demoId="compliance"
        run={tour.run}
        stepIndex={tour.stepIndex}
        onStepChange={tour.setStepIndex}
        onComplete={tour.markCompleted}
      />

      <p className="text-[11px] text-slate-500 px-6 pt-2 flex-shrink-0 border-b border-slate-100 bg-slate-50/80">
        Sample audit intelligence UI — data is mock and stays in this browser session; actions do not connect to your live
        organisation.
      </p>

      <div className="p-4 md:p-6 space-y-4 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Intelligence header (navy) */}
        <div
          className="rounded-2xl px-4 py-4 md:px-6 md:py-5 text-white flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 shrink-0"
          style={{ backgroundColor: '#001d4e' }}
          data-tour="compliance-intel-header"
        >
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight">Compliance Intelligence</h2>
            <p className="text-xs md:text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Audit Dashboard — Real-time monitoring (demo)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 xl:mx-4">
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3 border border-white/10"
              style={{ backgroundColor: integrity.bg }}
            >
              <div className="relative w-[72px] h-[72px] shrink-0">
                <svg width="72" height="72" viewBox="0 0 88 88" className="block">
                  <circle cx="44" cy="44" r="36" fill="none" stroke="#e5e7eb" strokeWidth="7" />
                  <circle
                    cx="44"
                    cy="44"
                    r="36"
                    fill="none"
                    stroke={integrity.color}
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 36}
                    strokeDashoffset={2 * Math.PI * 36 * (1 - integrity.score / 100)}
                    transform="rotate(-90 44 44)"
                  />
                  <text
                    x="44"
                    y="46"
                    textAnchor="middle"
                    className="text-[18px] font-bold"
                    fill={integrity.color}
                    style={{ fontFamily: 'inherit' }}
                  >
                    {integrity.score}
                  </text>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-slate-800">
                  <Shield className="w-3.5 h-3.5" style={{ color: integrity.color }} />
                  <span className="text-xs font-semibold">System Integrity</span>
                </div>
                <p className="text-sm font-bold mt-0.5" style={{ color: integrity.color }}>
                  {integrity.label}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[200px]">
                  Derived from delete/export/off-hours in the selected date window (demo rules).
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 mr-1">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-white/70">CQC Mode</div>
                <div className="text-xs font-semibold">{cqcInspectionMode ? 'ON' : 'OFF'}</div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={cqcInspectionMode}
                onClick={() => {
                  setCqcInspectionMode((v) => !v);
                  if (!cqcInspectionMode) setSelectedFilter('critical');
                  else setSelectedFilter('all');
                }}
                className={`relative w-11 h-6 rounded-full transition-colors ${cqcInspectionMode ? 'bg-amber-600' : 'bg-white/30'}`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${cqcInspectionMode ? 'translate-x-5' : ''}`}
                />
              </button>
            </div>
            {demoNewLogs > 0 && (
              <button
                type="button"
                onClick={() => showPreview('Refresh is preview-only — mock data unchanged.')}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold bg-red-600 text-white hover:bg-red-700"
              >
                {demoNewLogs} new
              </button>
            )}
            <button
              type="button"
              onClick={() => showPreview('Refresh preview — no live connection.')}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold bg-white/15 hover:bg-white/25"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold bg-white/15 hover:bg-white/25"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button
              type="button"
              onClick={() => showPreview('Reports opens the full app — not linked in this marketing preview.')}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold bg-white/15 hover:bg-white/25"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Reports
            </button>
          </div>
        </div>

        {cqcInspectionMode && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="font-medium truncate">CQC Inspection Mode — Showing compliance-critical data only</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCqcInspectionMode(false);
                setSelectedFilter('all');
              }}
              className="p-1 rounded hover:bg-amber-100 shrink-0"
              aria-label="Dismiss CQC mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div
          className="rounded-xl border border-slate-200 bg-white shadow-sm shrink-0"
          data-tour="compliance-filters"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-3 md:p-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { key: 'today' as const, label: 'Today' },
                  { key: 'week' as const, label: '7 Days' },
                  { key: 'month' as const, label: '30 Days' },
                ]
              ).map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    setDateRange(f.key);
                    setCustomStart('');
                    setCustomEnd('');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    dateRange === f.key ? 'bg-[#4370B7] text-white' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setDateRange('custom')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  dateRange === 'custom' ? 'bg-[#4370B7] text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                {dateRange === 'custom' && customStart && customEnd
                  ? `${format(parseISO(customStart), 'MMM d')} – ${format(parseISO(customEnd), 'MMM d')}`
                  : 'Custom'}
              </button>
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0 max-w-xl border border-slate-200 rounded-lg px-3 py-2 bg-slate-50/80">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                className="flex-1 min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="Search logs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery.length > 0 && (
                <button type="button" onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {dateRange === 'custom' && (
            <div className="flex flex-wrap items-center gap-3 px-3 md:px-4 py-3 bg-slate-50 border-b border-slate-100">
              <label className="text-xs text-slate-600 flex items-center gap-2">
                From
                <input
                  type="date"
                  className="border border-slate-200 rounded-md px-2 py-1 text-sm"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                />
              </label>
              <label className="text-xs text-slate-600 flex items-center gap-2">
                To
                <input
                  type="date"
                  className="border border-slate-200 rounded-md px-2 py-1 text-sm"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 p-3 md:p-4">
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mr-1">Category</span>
            {(
              [
                { key: 'all' as const, label: 'All', icon: Database },
                { key: 'critical' as const, label: 'Critical', icon: AlertTriangle },
                { key: 'medication' as const, label: 'Medication', icon: Pill },
                { key: 'patient' as const, label: 'Patient', icon: User },
                { key: 'staff' as const, label: 'Staff', icon: Users },
              ]
            ).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                disabled={cqcInspectionMode && key !== 'critical'}
                onClick={() => !cqcInspectionMode && setSelectedFilter(key)}
                className={`${filterChipClass(key)} ${cqcInspectionMode && key !== 'critical' ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0" data-tour="compliance-metrics">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Logs in view</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{dateFiltered.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">After date range</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Filtered rows</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{categoryFiltered.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">Search + category</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Checklist avg score</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{overallScore}%</div>
            <div className="text-[11px] text-green-600 font-medium mt-1">Good (mock audits)</div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
          {/* Critical alerts */}
          {criticalLogs.length > 0 && (
            <section data-tour="compliance-alerts">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <h3 className="text-sm font-bold text-slate-800">Critical Alerts</h3>
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                    {criticalLogs.length}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Requires immediate review</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {criticalLogs.map((log) => (
                  <div
                    key={log.id}
                    className="min-w-[280px] max-w-[320px] rounded-xl border border-red-100 bg-white shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="flex items-center justify-between px-3 py-2 bg-red-50 border-b border-red-100">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded">
                        <ShieldAlert className="w-3 h-3" />
                        HIGH RISK
                      </span>
                      <button
                        type="button"
                        onClick={() => setDismissedAlerts((s) => new Set(s).add(log.id))}
                        className="text-slate-400 hover:text-slate-600"
                        aria-label="Dismiss"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-3 flex-1 flex flex-col gap-2">
                      <div className="text-sm font-bold text-slate-900 leading-snug">{alertTitle(log)}</div>
                      <div className="text-xs text-slate-600 leading-snug">{alertSubtitle(log)}</div>
                      <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mt-1">
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.user_name}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {format(parseISO(log.timestamp), 'MMM d, HH:mm')}
                        </span>
                        {log.ip_address && (
                          <span className="inline-flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {log.ip_address}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setDetailLog(log)}
                        className="mt-2 text-xs font-semibold text-[#4370B7] hover:underline text-left"
                      >
                        Investigate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Clinical signals */}
          {clinicalSignals.length > 0 && (
            <section data-tour="compliance-signals">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-bold text-slate-900">Priority Clinical Signals</h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {clinicalSignals.length}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {clinicalSignals.map((signal, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-4 ${
                      signal.severity === 'high'
                        ? 'bg-red-50/80 border-red-100'
                        : signal.severity === 'medium'
                          ? 'bg-amber-50/80 border-amber-100'
                          : 'bg-sky-50/80 border-sky-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="text-sm font-bold text-slate-900">{signal.title}</div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          signal.severity === 'high'
                            ? 'bg-red-100 text-red-700'
                            : signal.severity === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {signal.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">{signal.detail}</p>
                    <div className="flex items-start gap-1.5 mt-2 text-[11px] text-slate-500">
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>Why this matters: {signal.why}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-tour="compliance-charts">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Anomaly highlights</h4>
              <p className="text-[11px] text-slate-500 mb-4">Action mix in the selected window (demo aggregation)</p>
              <div className="space-y-3">
                {['delete', 'export', 'update', 'read', 'create', 'login'].map((action) => {
                  const c = actionCounts[action] ?? 0;
                  const max = Math.max(1, ...Object.values(actionCounts));
                  const w = Math.round((c / max) * 100);
                  return (
                    <div key={action}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="capitalize text-slate-600">{action}</span>
                        <span className="font-semibold text-slate-800">{c}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            action === 'delete'
                              ? 'bg-red-500'
                              : action === 'export'
                                ? 'bg-amber-500'
                                : 'bg-[#4370B7]'
                          }`}
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 mb-1">Activity trend</h4>
              <p className="text-[11px] text-slate-500 mb-4">Events per day (last 7 days)</p>
              <div className="flex items-end justify-between gap-2 h-36 px-1">
                {trendByDay.days.map((d) => (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full max-w-[40px] rounded-t bg-[#4370B7]/85"
                      style={{ height: `${Math.max(8, (d.count / trendByDay.max) * 100)}%` }}
                      title={`${d.count} events`}
                    />
                    <span className="text-[9px] text-slate-500 text-center leading-tight">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CQC domains */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-6" data-tour="compliance-domains">
            <h3 className="font-bold text-slate-800 mb-4">CQC Domain Performance</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {['Safe', 'Effective', 'Caring', 'Responsive', 'Well-led'].map((domain, i) => (
                <div
                  key={domain}
                  className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100"
                >
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
                        strokeDasharray={`${88 + i}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800 text-sm">
                      {90 + i}%
                    </div>
                  </div>
                  <div className="font-bold text-slate-700 mb-1 text-sm">{domain}</div>
                  <div className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Good</div>
                </div>
              ))}
            </div>
          </section>

          {/* Audit log */}
          <section
            className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            data-tour="compliance-audit-log"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-white">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Audit Log</h3>
                <span className="text-[11px] font-semibold bg-[#dce4f3] text-[#355a92] px-2.5 py-0.5 rounded-full">
                  {totalRecords.toLocaleString()} entries
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setTimelineView(false)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                      !timelineView ? 'bg-[#4370B7] text-white' : 'text-slate-600'
                    }`}
                  >
                    Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineView(true)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold ${
                      timelineView ? 'bg-[#4370B7] text-white' : 'text-slate-600'
                    }`}
                  >
                    Timeline
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Showing {pageSlice.length} of {totalRecords}
                </span>
              </div>
            </div>

            {totalRecords === 0 ? (
              <div className="py-16 text-center px-4">
                <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <div className="font-semibold text-slate-700">No audit logs found</div>
                <p className="text-sm text-slate-500 mt-1">Try adjusting filters or date range (demo data).</p>
              </div>
            ) : !timelineView ? (
              <div className="overflow-x-auto" data-tour="compliance-table">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleSort('timestamp')}
                          className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center"
                        >
                          Timestamp
                          <SortHint col="timestamp" />
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleSort('user_name')}
                          className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"
                        >
                          User
                          <Filter className="w-3 h-3 opacity-40" />
                          <SortHint col="user_name" />
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleSort('action')}
                          className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"
                        >
                          Action
                          <Filter className="w-3 h-3 opacity-40" />
                          <SortHint col="action" />
                        </button>
                      </th>
                      <th className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleSort('table_name')}
                          className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"
                        >
                          Table
                          <Filter className="w-3 h-3 opacity-40" />
                          <SortHint col="table_name" />
                        </button>
                      </th>
                      <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">IP</th>
                      <th className="p-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pageSlice.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80">
                        <td className="p-3 text-sm text-slate-700 whitespace-nowrap">
                          {format(parseISO(log.timestamp), 'dd MMM yyyy, HH:mm')}
                        </td>
                        <td className="p-3 text-sm text-slate-800">
                          <div className="font-medium">{log.user_name}</div>
                          {log.user_role && <div className="text-[11px] text-slate-500">{log.user_role}</div>}
                        </td>
                        <td className="p-3">
                          <span className="text-xs font-semibold capitalize px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 text-sm text-slate-600">{log.table_name.replace(/_/g, ' ')}</td>
                        <td className="p-3 text-xs text-slate-500 font-mono">{log.ip_address}</td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => setDetailLog(log)}
                            className="inline-flex items-center justify-center p-1.5 rounded-lg text-[#4370B7] hover:bg-slate-100"
                            aria-label="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="divide-y divide-slate-100" data-tour="compliance-table">
                {pageSlice.map((log) => (
                  <div key={log.id} className="flex gap-3 px-4 py-3 hover:bg-slate-50/80">
                    <div className="w-px bg-slate-200 relative shrink-0">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#4370B7]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-slate-500">{format(parseISO(log.timestamp), 'PPp')}</div>
                      <div className="text-sm font-semibold text-slate-900 mt-0.5 capitalize">
                        {log.action} · {log.table_name.replace(/_/g, ' ')}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">{log.user_name}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDetailLog(log)}
                      className="self-center text-[#4370B7] p-2 hover:bg-slate-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                <span className="text-xs text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Checklist + incidents */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-4">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 font-bold text-slate-800 text-sm">Audit checklist</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
                    <tr>
                      <th className="p-3">Audit</th>
                      <th className="p-3">Score</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {audits.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-800">{a.title}</td>
                        <td className="p-3 font-bold">{a.score}%</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(a.status)}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
              <div className="font-bold text-slate-800 text-sm mb-3">Open incidents</div>
              <div className="space-y-3">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="rounded-xl border border-slate-100 p-3 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <span className="font-semibold text-slate-800 truncate">{incident.type}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{incident.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{incident.description}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                      <span className="text-[10px] text-slate-500">Demo record</span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Export audit report</h3>
            <p className="text-sm text-slate-500 mt-1">Choose a format (preview only).</p>
            <div className="flex flex-col gap-2 mt-4">
              {(['csv', 'pdf', 'excel'] as const).map((fmt) => (
                <label key={fmt} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="exportFmt"
                    checked={exportFormat === fmt}
                    onChange={() => setExportFormat(fmt)}
                  />
                  <span className="uppercase font-medium">{fmt}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onExportConfirm}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#4370B7] text-white"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail drawer */}
      {detailLog && (
        <div className="fixed inset-0 z-[10002] flex justify-end bg-black/30">
          <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Log detail</h3>
              <button type="button" onClick={() => setDetailLog(null)} className="p-2 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-sm overflow-y-auto flex-1">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">When</div>
                <div>{format(parseISO(detailLog.timestamp), 'PPpp')}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">User</div>
                <div>{detailLog.user_name}</div>
                {detailLog.user_role && <div className="text-slate-500 text-xs">{detailLog.user_role}</div>}
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Action</div>
                <div className="capitalize">{detailLog.action}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Table</div>
                <div>{detailLog.table_name}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">IP / Session</div>
                <div className="font-mono text-xs">{detailLog.ip_address}</div>
                {detailLog.session_id && <div className="font-mono text-xs text-slate-500">{detailLog.session_id}</div>}
              </div>
              {detailLog.details && (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Notes</div>
                  <div>{detailLog.details}</div>
                </div>
              )}
              <p className="text-xs text-slate-500 pt-4 border-t border-slate-100">
                Full replay and live exports exist in the DomiClear app — this panel is a static preview.
              </p>
            </div>
          </div>
        </div>
      )}

      {previewMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl z-[10000] max-w-md text-center">
          {previewMessage}
        </div>
      )}
    </div>
  );
};
