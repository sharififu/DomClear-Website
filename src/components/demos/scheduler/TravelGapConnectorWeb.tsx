/**
 * Web travel-gap connector — mirrors RN `TravelGapConnector` line + caps + hit area.
 */

import React, { memo, useCallback, useRef, useState } from 'react';
import type { TravelGapConnectorModel } from './travelGapTypes';

const HIT_SLOP_HEIGHT = 22;
const LINE_STROKE = 2;
const CAP_SIZE = 4;

const COL_SUCCESS = '#2A9D68';
const COL_WARNING = '#CC9900';
const COL_ERROR = '#EB4841';
const COL_NEUTRAL = '#94a3b8';

function lineColor(status: TravelGapConnectorModel['status'], emphasized: boolean): string {
  const alpha = emphasized ? 1 : 0.55;
  switch (status) {
    case 'good':
      return emphasized ? COL_SUCCESS : `rgba(42, 157, 104, ${alpha})`;
    case 'tight':
      return emphasized ? COL_WARNING : `rgba(204, 153, 0, ${alpha})`;
    case 'impossible':
      return emphasized ? COL_ERROR : `rgba(235, 72, 65, ${alpha})`;
    default:
      return COL_NEUTRAL;
  }
}

export interface TravelGapConnectorWebProps {
  model: TravelGapConnectorModel;
  gapKey: string;
  interactive?: boolean;
  onTooltipShow: (gapKey: string, model: TravelGapConnectorModel, anchor: { x: number; y: number }) => void;
  onTooltipHide: (gapKey: string) => void;
  onGapPress: (gapKey: string, model: TravelGapConnectorModel, anchor: { x: number; y: number }) => void;
  isTooltipPinned: boolean;
  isTooltipActiveForThisGap: boolean;
}

function TravelGapConnectorWebInner({
  model,
  gapKey,
  interactive = true,
  onTooltipShow,
  onTooltipHide,
  onGapPress,
  isTooltipPinned,
  isTooltipActiveForThisGap,
}: TravelGapConnectorWebProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const emphasized = hovered || isTooltipActiveForThisGap;
  const width = Math.max(0, model.lineEndX - model.lineStartX);
  const top = model.rowY - HIT_SLOP_HEIGHT / 2;
  const strokeColor = lineColor(model.status, emphasized);

  const measureAnchor = useCallback(
    (then: (x: number, y: number) => void) => {
      const el = rootRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        then(r.left + r.width / 2, r.bottom);
        return;
      }
      then(model.lineStartX + width / 2, top + HIT_SLOP_HEIGHT);
    },
    [model.lineStartX, top, width],
  );

  return (
    <div
      ref={rootRef}
      data-travel-gap="true"
      className="absolute flex items-center justify-center"
      style={{
        left: model.lineStartX,
        width,
        top,
        height: HIT_SLOP_HEIGHT,
        zIndex: 5,
        pointerEvents: interactive ? 'auto' : 'none',
        transition:
          interactive ? undefined : 'left 120ms ease-out, width 120ms ease-out, top 120ms ease-out',
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseEnter={
        interactive
          ? () => {
              setHovered(true);
              measureAnchor((x, y) => onTooltipShow(gapKey, model, { x, y }));
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? () => {
              setHovered(false);
              if (!isTooltipPinned) onTooltipHide(gapKey);
            }
          : undefined
      }
    >
      <button
        type="button"
        tabIndex={interactive ? 0 : -1}
        aria-label={`Travel gap ${model.gapMinutes} minutes between visits`}
        disabled={!interactive}
        className="flex flex-row items-center w-full h-full p-0 m-0 border-0 bg-transparent cursor-pointer disabled:pointer-events-none disabled:cursor-default"
        style={{ transform: emphasized ? 'scaleY(1.08)' : 'scaleY(1)' }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          measureAnchor((x, y) => onGapPress(gapKey, model, { x, y }));
        }}
      >
        <span
          className="rounded-full flex-shrink-0"
          style={{ width: CAP_SIZE, height: CAP_SIZE, backgroundColor: strokeColor }}
        />
        <span
          className="flex-1 flex-shrink rounded-sm"
          style={{ height: LINE_STROKE, backgroundColor: strokeColor }}
        />
        <span
          className="rounded-full flex-shrink-0"
          style={{ width: CAP_SIZE, height: CAP_SIZE, backgroundColor: strokeColor }}
        />
      </button>
    </div>
  );
}

export const TravelGapConnectorWeb = memo(TravelGapConnectorWebInner);
