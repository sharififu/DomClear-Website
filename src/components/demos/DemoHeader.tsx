import React, { useEffect, useRef, useState } from 'react';
import { Search, Bell, Home, Calendar as CalendarIcon, MessageSquare, RotateCcw, ChevronRight, MoreHorizontal } from 'lucide-react';
import { resetAllTours } from './DemoTour';

interface DemoHeaderProps {
  title: string; // Used for breadcrumbs/page title
  subtitle?: string; // Optional subtitle
  onReset: () => void;
  extraActions?: React.ReactNode;
  tourAnchorId?: string;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({ title, subtitle, onReset, extraActions, tourAnchorId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <div
      className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-xs flex-shrink-0"
      data-tour={tourAnchorId}
    >
      {/* Left: Breadcrumbs/Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span className="font-bold text-slate-700">CMS Dashboard</span>
          {subtitle && (
            <>
              <span className="bg-slate-100 px-1.5 rounded-sm text-[10px]">/</span>
              <span>{subtitle}</span>
            </>
          )}
        </div>
        <h2 className="text-sm font-medium text-slate-400">{title}</h2>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search patients, staff, files..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
          />
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-mono border border-slate-200 rounded-sm px-1">/</span>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-3">
        {extraActions}
        <button 
          onClick={onReset}
          className="p-2 text-slate-400 hover:bg-slate-50 hover:text-[#4370B7] rounded-lg transition-colors" 
          title="Reset Demo"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative">
          <Home className="w-5 h-5" />
          <span className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-white"></span>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
          <CalendarIcon className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="ml-2 pl-4 border-l border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-medium shadow-xs">
            J
          </div>
          <div className="hidden lg:block">
            <div className="text-xs font-bold text-slate-700">john</div>
            <div className="text-[10px] text-slate-400">manager</div>
          </div>
          <ChevronRight className="w-3 h-3 text-slate-300 rotate-90 hidden lg:block" />
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
            title="More actions"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl p-2 z-20">
              <button
                onClick={() => {
                  onReset();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
              >
                Reset this demo
              </button>
              <button
                onClick={() => {
                  resetAllTours();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
              >
                Reset all tours
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
