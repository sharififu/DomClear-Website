/**
 * Travel gap tooltip — mirrors `TravelGapTooltip` copy and layout (fixed to viewport).
 */

import React, { useEffect, useState } from 'react';
import type { TravelGapConnectorModel } from './travelGapTypes';

function statusAccent(status: TravelGapConnectorModel['status']): string {
  switch (status) {
    case 'good':
      return '#2A9D68';
    case 'tight':
      return '#CC9900';
    case 'impossible':
      return '#EB4841';
    default:
      return '#64748b';
  }
}

export interface TravelGapTooltipWebProps {
  model: TravelGapConnectorModel | null;
  anchor: { x: number; y: number } | null;
  visible: boolean;
  pinned: boolean;
  onRequestClose: () => void;
}

const CARD_WIDTH = 260;

export function TravelGapTooltipWeb({
  model,
  anchor,
  visible,
  pinned,
  onRequestClose,
}: TravelGapTooltipWebProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (visible) {
      setEntered(false);
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
    setEntered(false);
  }, [visible]);

  if (!model || !anchor || !visible) return null;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
  const isNearRightEdge = anchor.x > vw - CARD_WIDTH - 24;
  const left = isNearRightEdge ? anchor.x - CARD_WIDTH - 8 : anchor.x + 8;
  const top = anchor.y + 6;

  const slackLine =
    model.slackMinutes >= 0 ? `${model.slackMinutes} min spare` : 'No spare time';

  const warning =
    model.status === 'impossible'
      ? 'Travel may be impossible in this window'
      : model.status === 'tight'
        ? 'Travel may be too tight'
        : null;

  return (
    <>
      {pinned && (
        <button
          type="button"
          aria-label="Dismiss travel gap details"
          className="fixed inset-0 z-[9998] cursor-default border-0 p-0 bg-transparent"
          onClick={onRequestClose}
        />
      )}
      <div
        className="fixed z-[10001] w-[260px] rounded-[10px] bg-white border border-slate-200 p-3 shadow-lg"
        style={{
          left,
          top,
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 150ms ease, transform 150ms ease',
          pointerEvents: pinned ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: statusAccent(model.status) }}
            aria-hidden
          />
          <span className="text-xs font-semibold text-slate-600 flex-1">Between visits</span>
        </div>
        <p className="text-xs text-slate-800 mb-0.5">{model.gapMinutes} min gap</p>
        <p className="text-xs text-slate-800 mb-0.5">{model.estimatedTravelMinutes} min estimated travel</p>
        <p className="text-xs text-slate-600 mb-2 mt-0.5">{slackLine}</p>
        <p className="text-xs font-medium text-slate-700">
          From {model.previousPatientLabel} to {model.nextPatientLabel}
        </p>
        {warning && <p className="text-xs font-medium text-amber-900 mt-2">{warning}</p>}
      </div>
    </>
  );
}
