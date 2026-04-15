import { format, addDays, parseISO } from 'date-fns';

/** App-aligned colours (constants/Colors.ts). */
export const COLORS = {
  primary: '#4370B7',
  secondary: '#10bfa3',
  warning: '#FFBF00',
  error: '#EB4841',
  neutral900: '#0f172a',
} as const;

export type DemoRegion = 'Derby' | 'Nottingham';

export type DemoVisitStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'missed';

export interface Visit {
  id: string;
  patientName: string;
  /** Decimal hours from midnight for the visit's dayKey */
  startHour: number;
  duration: number;
  /** Legacy seed field; CMS parity uses `getStripeColorForVisit` instead of filling the card. */
  color?: string;
  type: string;
  /** Mirrors app `service_type` for stripe colours (falls back to `type`). */
  service_type?: string;
  status: DemoVisitStatus;
  /** yyyy-MM-dd — which day this visit appears on daily roster */
  dayKey: string;
  /** 0 Mon … 6 Sun for weekly column */
  weekDay: number;
  regionId?: DemoRegion | null;
  patient_id?: string;
  /** Minutes to next visit; when unset, demo uses 22 like app placeholder travel estimate. */
  travel_time_to_next?: number | null;
}

export interface StaffRow {
  id: string;
  name: string;
  avatar: string;
  role: string;
  teamId?: string;
  regionId?: DemoRegion;
  visits: Visit[];
}

export const DEMO_TEAMS: { id: string; name: string; color: string }[] = [
  { id: 'north', name: 'Team North', color: COLORS.primary },
  { id: 'south', name: 'Team South', color: '#7c6df0' },
];

export const TIME_COLUMN_WIDTH = 140;
export const STAFF_ROW_HEIGHT = 81;
export const TIME_HEADER_HEIGHT = 50;

/** Stable seed week for reproducible demo data */
export const SEED_WEEK_MONDAY = parseISO('2026-01-05T12:00:00');

export function dayKeyFromWeekDay(weekDay: number): string {
  return format(addDays(SEED_WEEK_MONDAY, weekDay), 'yyyy-MM-dd');
}

export function dayKeyForDate(d: Date): string {
  return format(d, 'yyyy-MM-dd');
}

export function weekDayFromDate(d: Date): number {
  return (d.getDay() + 6) % 7;
}

let visitIdSeq = 1;
export function nextVisitId(): string {
  return `demo-v-${Date.now()}-${visitIdSeq++}`;
}

function v(
  partial: Omit<Visit, 'dayKey'> & { weekDay: number },
  region: DemoRegion,
): Visit {
  return {
    ...partial,
    dayKey: dayKeyFromWeekDay(partial.weekDay),
    regionId: region,
    service_type: partial.service_type ?? partial.type,
  };
}

/** Initial roster with dayKey + region wired for regional filter */
export const INITIAL_ROSTER: StaffRow[] = [
  {
    id: 'unallocated',
    name: 'Unallocated',
    avatar: '!',
    role: 'Pending assignment',
    visits: [
      v(
        {
          id: 'u1',
          patientName: 'Margaret H.',
          startHour: 7,
          duration: 1,
          color: COLORS.error,
          type: 'personal care',
          status: 'scheduled',
          weekDay: 0,
        },
        'Derby',
      ),
      v(
        {
          id: 'u2',
          patientName: 'Thomas R.',
          startHour: 16,
          duration: 0.5,
          color: COLORS.error,
          type: 'medication',
          status: 'scheduled',
          weekDay: 2,
        },
        'Nottingham',
      ),
    ],
  },
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'EW',
    role: 'Senior Carer',
    teamId: 'north',
    regionId: 'Derby',
    visits: [
      v(
        {
          id: 'v1',
          patientName: 'Sarah J.',
          startHour: 8,
          duration: 1,
          color: COLORS.primary,
          type: 'medication',
          status: 'completed',
          travel_time_to_next: 22,
          weekDay: 0,
        },
        'Derby',
      ),
      v(
        {
          id: 'v2',
          patientName: 'John M.',
          startHour: 9.25,
          duration: 1.5,
          color: '#7c6df0',
          type: 'personal care',
          status: 'scheduled',
          weekDay: 1,
        },
        'Derby',
      ),
      v(
        {
          id: 'v3',
          patientName: 'Alice P.',
          startHour: 14,
          duration: 1,
          color: COLORS.primary,
          type: 'check-in',
          status: 'scheduled',
          weekDay: 3,
        },
        'Derby',
      ),
    ],
  },
  {
    id: '2',
    name: 'James Taylor',
    avatar: 'JT',
    role: 'Carer',
    teamId: 'north',
    regionId: 'Derby',
    visits: [
      v(
        {
          id: 'v4',
          patientName: 'Mary B.',
          startHour: 6,
          duration: 1,
          color: '#14B8A6',
          type: 'breakfast',
          status: 'completed',
          weekDay: 0,
        },
        'Derby',
      ),
      v(
        {
          id: 'v5',
          patientName: 'Robert K.',
          startHour: 9,
          duration: 1,
          color: COLORS.primary,
          type: 'medication',
          status: 'in_progress',
          travel_time_to_next: 18,
          weekDay: 1,
        },
        'Derby',
      ),
      v(
        {
          id: 'v6',
          patientName: 'Linda P.',
          startHour: 11,
          duration: 0.5,
          color: '#f59e0b',
          type: 'check-in',
          status: 'scheduled',
          weekDay: 2,
        },
        'Derby',
      ),
      v(
        {
          id: 'v7',
          patientName: 'George W.',
          startHour: 15,
          duration: 2,
          color: '#7c6df0',
          type: 'personal care',
          status: 'scheduled',
          weekDay: 4,
        },
        'Derby',
      ),
      v(
        {
          id: 'v8',
          patientName: 'Patricia M.',
          startHour: 19,
          duration: 1,
          color: '#14B8A6',
          type: 'evening care',
          status: 'scheduled',
          weekDay: 5,
        },
        'Derby',
      ),
    ],
  },
  {
    id: '3',
    name: 'Dave Smith',
    avatar: 'DS',
    role: 'Carer',
    teamId: 'south',
    regionId: 'Nottingham',
    visits: [
      v(
        {
          id: 'v9',
          patientName: 'Admin Meeting',
          startHour: 7,
          duration: 1,
          color: '#6b7280',
          type: 'meeting',
          status: 'completed',
          weekDay: 0,
        },
        'Nottingham',
      ),
      v(
        {
          id: 'v10',
          patientName: 'David T.',
          startHour: 9,
          duration: 2,
          color: '#7c6df0',
          type: 'personal care',
          status: 'scheduled',
          weekDay: 2,
        },
        'Nottingham',
      ),
      v(
        {
          id: 'v11',
          patientName: 'Susan K.',
          startHour: 13,
          duration: 1,
          color: COLORS.primary,
          type: 'medication',
          status: 'scheduled',
          weekDay: 3,
        },
        'Nottingham',
      ),
      v(
        {
          id: 'v12',
          patientName: 'Michael B.',
          startHour: 17,
          duration: 1,
          color: '#f59e0b',
          type: 'companionship',
          status: 'scheduled',
          weekDay: 4,
        },
        'Nottingham',
      ),
    ],
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    role: 'Carer',
    teamId: 'south',
    regionId: 'Nottingham',
    visits: [
      v(
        {
          id: 'v13',
          patientName: 'Elizabeth R.',
          startHour: 8,
          duration: 1.5,
          color: '#7c6df0',
          type: 'personal care',
          status: 'scheduled',
          weekDay: 1,
        },
        'Nottingham',
      ),
      v(
        {
          id: 'v14',
          patientName: 'William H.',
          startHour: 12,
          duration: 1,
          color: COLORS.primary,
          type: 'medication',
          status: 'scheduled',
          weekDay: 3,
        },
        'Nottingham',
      ),
      v(
        {
          id: 'v15',
          patientName: 'Anne M.',
          startHour: 16,
          duration: 1,
          color: '#14B8A6',
          type: 'dinner prep',
          status: 'scheduled',
          weekDay: 5,
        },
        'Nottingham',
      ),
    ],
  },
];

export function cloneRoster(roster: StaffRow[]): StaffRow[] {
  return roster.map((r) => ({
    ...r,
    visits: r.visits.map((x) => ({ ...x })),
  }));
}

/** Move every visit to the given calendar day (template follows selected date in the demo). */
export function anchorRosterVisitsToDate(roster: StaffRow[], date: Date): StaffRow[] {
  const dk = dayKeyForDate(date);
  const wd = weekDayFromDate(date);
  return roster.map((r) => ({
    ...r,
    visits: r.visits.map((v) => ({ ...v, dayKey: dk, weekDay: wd })),
  }));
}

export type DisplayRow =
  | { key: string; kind: 'unallocated'; staff: StaffRow }
  | { key: string; kind: 'team_header'; teamId: string; name: string; color: string }
  | { key: string; kind: 'staff'; staff: StaffRow };

export function buildDisplayRows(
  roster: StaffRow[],
  useTeamGrouping: boolean,
  collapsedTeams: Set<string>,
  filterUnassignedOnly: boolean,
): DisplayRow[] {
  const unallocated = roster.find((s) => s.id === 'unallocated');
  if (!unallocated) return [];

  if (filterUnassignedOnly) {
    return [{ key: 'unallocated', kind: 'unallocated', staff: unallocated }];
  }

  const staffOnly = roster.filter((s) => s.id !== 'unallocated');
  const rows: DisplayRow[] = [{ key: 'unallocated', kind: 'unallocated', staff: unallocated }];

  if (useTeamGrouping) {
    for (const team of DEMO_TEAMS) {
      rows.push({
        key: `team-${team.id}`,
        kind: 'team_header',
        teamId: team.id,
        name: team.name,
        color: team.color,
      });
      if (!collapsedTeams.has(team.id)) {
        for (const s of staffOnly.filter((m) => m.teamId === team.id)) {
          rows.push({ key: `staff-${s.id}`, kind: 'staff', staff: s });
        }
      }
    }
  } else {
    for (const s of staffOnly) {
      rows.push({ key: `staff-${s.id}`, kind: 'staff', staff: s });
    }
  }

  return rows;
}

export function dataRowsOnly(rows: DisplayRow[]): { staff: StaffRow }[] {
  return rows
    .filter((r): r is DisplayRow & { staff: StaffRow } => r.kind === 'unallocated' || r.kind === 'staff')
    .map((r) => ({ staff: r.staff }));
}

/** Filter roster for regional demo: staff in region; visits must match region or unallocated bucket */
export function applyRegionalRoster(roster: StaffRow[], selectedRegion: DemoRegion | null): StaffRow[] {
  if (!selectedRegion) return roster;

  return roster.map((row) => {
    if (row.id === 'unallocated') {
      return {
        ...row,
        visits: row.visits.filter((v) => v.regionId === selectedRegion || v.regionId == null),
      };
    }
    if (row.regionId && row.regionId !== selectedRegion) {
      return { ...row, visits: [] };
    }
    return {
      ...row,
      visits: row.visits.filter((v) => v.regionId === selectedRegion || v.regionId == null),
    };
  });
}

/** Visits visible on selected calendar day */
export function visitsForDay(staff: StaffRow, dayKey: string): Visit[] {
  return staff.visits.filter((v) => v.dayKey === dayKey);
}
