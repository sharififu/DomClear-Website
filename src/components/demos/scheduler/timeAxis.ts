/** Mirrors DomiClear ImprovedDailyRoster time grid (15-minute slots, 80px/hour). */

export const SLOT_MINUTES = 15;
export const MIN_PIXELS_PER_HOUR = 80;
export const SLOT_HOURS = SLOT_MINUTES / 60;

export function snapToSlotHours(hourFloat: number): number {
  const quarters = Math.round(hourFloat / SLOT_HOURS);
  const snapped = quarters * SLOT_HOURS;
  return Math.max(0, Math.min(24 - SLOT_HOURS, snapped));
}

export function hourToPx(hour: number): number {
  return hour * MIN_PIXELS_PER_HOUR;
}

/** Convert x position inside timeline content (including scroll) to hours from midnight. */
export function pxToHour(contentX: number): number {
  return contentX / MIN_PIXELS_PER_HOUR;
}

export function formatHourLabel(hourFloat: number): string {
  const h = Math.floor(hourFloat);
  const m = Math.round((hourFloat % 1) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
