/**
 * Adjacent-visit travel gaps for demo timeline — mirrors `computeStaffRowTravelGaps` geometry
 * using decimal hours + hourToPx (no overlap lanes in demo).
 */

import type { Visit } from './rosterModel';
import { hourToPx } from './timeAxis';
import {
  TRAVEL_GAP_MIN_PIXEL_WIDTH,
  travelGapStatusFromSlack,
  type TravelGapConnectorModel,
} from './travelGapTypes';

const EVENT_TOP_MARGIN = 8;

function normalizePatientLabel(s: string): string {
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
}

function pairPatientLabelsForGap(prev: Visit, next: Visit): {
  previousPatientLabel: string;
  nextPatientLabel: string;
} {
  const basePrev = prev.patientName ?? 'Unknown';
  const baseNext = next.patientName ?? 'Unknown';
  const labelsMatch = normalizePatientLabel(basePrev) === normalizePatientLabel(baseNext);
  const samePatientDifferentVisit =
    !!prev.patient_id &&
    !!next.patient_id &&
    prev.patient_id === next.patient_id &&
    prev.id !== next.id;
  if (!labelsMatch && !samePatientDifferentVisit) {
    return { previousPatientLabel: basePrev, nextPatientLabel: baseNext };
  }
  const fmt = (h: number) => {
    const hh = Math.floor(h);
    const mm = Math.round((h - hh) * 60);
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };
  return {
    previousPatientLabel: `${basePrev} (${fmt(prev.startHour)})`,
    nextPatientLabel: `${baseNext} (${fmt(next.startHour)})`,
  };
}

export function computeDemoTravelGaps(
  visits: Visit[],
  visitBlockHeight: number,
): TravelGapConnectorModel[] {
  const sorted = [...visits].sort((a, b) => a.startHour - b.startHour);
  if (sorted.length < 2) return [];

  const rowY = EVENT_TOP_MARGIN + visitBlockHeight / 2;
  const out: TravelGapConnectorModel[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const prev = sorted[i];
    const next = sorted[i + 1];
    if (prev.id && next.id && prev.id === next.id) continue;

    const prevEndH = prev.startHour + prev.duration;
    if (next.startHour < prevEndH) continue;

    const gapMinutes = Math.round((next.startHour - prevEndH) * 60);
    if (gapMinutes <= 0) continue;

    const lineStartX = hourToPx(prevEndH);
    const lineEndX = hourToPx(next.startHour);
    if (lineEndX - lineStartX < TRAVEL_GAP_MIN_PIXEL_WIDTH) continue;

    const ttn = prev.travel_time_to_next;
    const estimatedTravelMinutes =
      ttn != null && Number.isFinite(ttn) && ttn >= 0 ? Math.round(ttn) : 22;

    const slackMinutes = gapMinutes - estimatedTravelMinutes;
    const status = travelGapStatusFromSlack(slackMinutes);
    const { previousPatientLabel, nextPatientLabel } = pairPatientLabelsForGap(prev, next);

    out.push({
      previousVisitId: prev.id,
      nextVisitId: next.id,
      previousPatientLabel,
      nextPatientLabel,
      gapMinutes,
      estimatedTravelMinutes,
      slackMinutes,
      status,
      lineStartX,
      lineEndX,
      rowY,
    });
  }

  return out;
}
