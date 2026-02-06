import React from 'react';
import { HelpCircle, RefreshCcw } from 'lucide-react';

interface TourButtonProps {
  onStart: () => void;
  className?: string;
  hasCompleted?: boolean;
  label?: string;
}

export const TourButton: React.FC<TourButtonProps> = ({
  onStart,
  className = '',
  hasCompleted = false,
  label = 'Take a tour',
}) => {
  return (
    <button
      type="button"
      onClick={onStart}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors ${className}`}
    >
      {hasCompleted ? (
        <RefreshCcw className="w-3.5 h-3.5 text-blue-500" />
      ) : (
        <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
      )}
      <span>{hasCompleted ? 'Replay tour' : label}</span>
    </button>
  );
};

