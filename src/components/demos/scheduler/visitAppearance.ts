/**
 * Visit stripe colours — mirrors `ImprovedDailyRoster.getStripeColorForVisit`.
 */

import type { Visit } from './rosterModel';

function serviceKeywords(v: Visit): string {
  const raw = (v.service_type ?? v.type ?? '').toLowerCase();
  return raw;
}

/** Left status stripe on visit cards (CMS parity). */
export function getStripeColorForVisit(v: Visit): string {
  const serviceType = serviceKeywords(v);
  if (serviceType) {
    if (serviceType.includes('medication')) return '#3B82F6';
    if (serviceType.includes('personal') && serviceType.includes('care')) return '#10B981';
    if (serviceType.includes('night') && serviceType.includes('check')) return '#8B5CF6';
    if (serviceType.includes('welfare') && serviceType.includes('check')) return '#F59E0B';
    if (serviceType.includes('check-in') || serviceType === 'check-in') return '#F59E0B';
  }
  switch (v.status) {
    case 'scheduled':
      return '#3B82F6';
    case 'in_progress':
      return '#F59E0B';
    case 'completed':
      return '#10B981';
    case 'cancelled':
      return '#EF4444';
    case 'missed':
      return '#6B7280';
    default:
      return '#3B82F6';
  }
}
