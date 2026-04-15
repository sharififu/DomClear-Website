/**
 * Travel gap model — aligned with HomeCareMana `components/cms/scheduler/travelGapTypes.ts`.
 */

export type TravelGapStatus = 'good' | 'tight' | 'impossible';

export const TRAVEL_GAP_MIN_PIXEL_WIDTH = 4;

export const TRAVEL_GAP_TIGHT_SLACK_MINUTES = 5;

export function travelGapStatusFromSlack(slackMinutes: number): TravelGapStatus {
  if (slackMinutes < 0) return 'impossible';
  if (slackMinutes < TRAVEL_GAP_TIGHT_SLACK_MINUTES) return 'tight';
  return 'good';
}

export interface TravelGapConnectorModel {
  previousVisitId: string;
  nextVisitId: string;
  previousPatientLabel: string;
  nextPatientLabel: string;
  gapMinutes: number;
  estimatedTravelMinutes: number;
  slackMinutes: number;
  status: TravelGapStatus;
  lineStartX: number;
  lineEndX: number;
  rowY: number;
}
