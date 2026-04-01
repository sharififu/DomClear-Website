import React from 'react';
import { getContentIcon } from './icons';

export const ComprehensiveFeatures: React.FC = () => {
  const SearchIcon = getContentIcon('Search');
  const PlayIcon = getContentIcon('Play');
  const PlusIcon = getContentIcon('Plus');
  const UserIcon = getContentIcon('User');
  const UsersIcon = getContentIcon('Users');
  const FileTextIcon = getContentIcon('FileText');
  const SmartphoneIcon = getContentIcon('Smartphone');
  const ShieldIcon = getContentIcon('Shield');
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Feature Section - Search/Scheduling */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-center mb-20">
          {/* Left side - Text content */}
          <div className="order-2 lg:order-1">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-6">
              {SearchIcon && <SearchIcon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Home care scheduling software your coordinators can rely on
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Plan rotas in minutes, match carers to clients, and keep the day visible in one domiciliary care software workspace — fewer clashes, fewer missed visits, less spreadsheet wrangling.
            </p>
            <p className="mt-4">
              <a
                href="/home-care-scheduling-software"
                className="text-[#4370B7] font-semibold text-sm hover:underline"
              >
                Scheduling software
              </a>
            </p>
          </div>

          {/* Right side - UI Mockup */}
          <div className="order-1 lg:order-2 relative">
            {/* Main card - Staff Availability Management */}
            <div className="bg-white rounded-2xl shadow-lg relative z-10 overflow-hidden">
              {/* Simple Title */}
              <div className="px-6 py-4 border-b border-[rgba(20,30,60,0.08)]">
                <h3 className="text-lg font-bold text-[#0F172A]">Staff Availability Management</h3>
              </div>

              <div className="bg-[#f8fafc]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                  aria-label="Staff availability management in DomiClear domiciliary care software"
                >
                  <source src="/demo-media/demo-staff-availability.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg z-20">
              {PlayIcon && <PlayIcon className="w-6 h-6 text-white" />}
            </div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-20">
              {PlusIcon && <PlusIcon className="w-5 h-5 text-white" />}
            </div>
          </div>
        </div>

        {/* Second Feature Section - Team Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - UI Mockup */}
          <div className="relative">
            {/* Main card - Minimal Roster */}
            <div className="bg-white rounded-2xl shadow-lg relative z-10 overflow-hidden">
              {/* Header with Title and Date */}
              <div className="px-6 py-4 border-b border-[rgba(20,30,60,0.08)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#0F172A]">Roster</h3>
                  <span className="text-sm text-[#6b7280]">Tuesday, 25 Nov 2025</span>
                </div>
              </div>

              {/* Minimal Roster Grid */}
              <div className="p-6">
                <div className="relative">
                  {/* Time Markers */}
                  <div className="flex mb-2 ml-32">
                    {['00', '02', '04', '06', '08', '10'].map((hour) => (
                      <div key={hour} className="flex-1 text-center">
                        <div className="text-[10px] text-[#9ca3af]">{hour}:00</div>
                      </div>
                    ))}
                  </div>

                  {/* Roster Rows */}
                  {[
                    { name: 'Unallocated', isUnallocated: true, visits: [
                      { start: 9, duration: 1, client: 'yannick yaba', type: 'unallocated', color: '#fef3c7', highlighted: false },
                    ]},
                    { name: 'Emma Wilson', isUnallocated: false, visits: [
                      { start: 8, duration: 2, client: 'Sarah J.', type: 'medication', color: '#e2e8f0', highlighted: true },
                      { start: 10, duration: 1, client: 'John M.', type: 'personal care', color: '#e2e8f0', highlighted: false },
                    ]},
                    { name: 'James Taylor', isUnallocated: false, visits: [
                      { start: 6, duration: 2, client: 'Mary B.', type: 'breakfast', color: '#e2e8f0', highlighted: false },
                      { start: 9, duration: 1, client: 'Robert K.', type: 'medication', color: '#e2e8f0', highlighted: true },
                      { start: 11, duration: 1, client: 'Linda P.', type: 'check-in', color: '#e2e8f0', highlighted: false },
                    ]},
                    { name: 'Dave Smith', isUnallocated: false, visits: [
                      { start: 7, duration: 1, client: 'Admin', type: 'meeting', color: '#e2e8f0', highlighted: false },
                      { start: 9, duration: 2, client: 'David T.', type: 'personal care', color: '#e2e8f0', highlighted: true },
                    ]},
                    { name: 'Sarah Johnson', isUnallocated: false, visits: [
                      { start: 5, duration: 3, client: 'Client A', type: 'care', color: '#e2e8f0', highlighted: false },
                    ]},
                    { name: 'Michael Brown', isUnallocated: false, visits: [
                      { start: 8, duration: 1, client: 'Client B', type: 'medication', color: '#e2e8f0', highlighted: false },
                    ]},
                    { name: 'Lisa Davis', isUnallocated: false, visits: [
                      { start: 10, duration: 2, client: 'Client C', type: 'personal care', color: '#e2e8f0', highlighted: false },
                    ]},
                    { name: 'Tom Wilson', isUnallocated: false, visits: [
                      { start: 7, duration: 1, client: 'Client D', type: 'check-in', color: '#e2e8f0', highlighted: false },
                    ]},
                  ].map((staff, rowIndex) => (
                    <div 
                      key={rowIndex} 
                      className={`relative mb-1 flex items-center ${staff.isUnallocated ? 'bg-amber-50 rounded-md' : ''}`} 
                      style={{ height: '32px', paddingLeft: staff.isUnallocated ? '4px' : '0', paddingRight: staff.isUnallocated ? '4px' : '0' }}
                    >
                      {/* Name Label */}
                      <div className="absolute left-0 w-32 pr-2 text-right">
                        <span className={`text-xs font-medium truncate block ${staff.isUnallocated ? 'text-amber-700' : 'text-[#0F172A]'}`}>
                          {staff.name}
                        </span>
                      </div>
                      
                      {/* Timeline area with margin for names */}
                      <div className="flex-1 ml-32 relative" style={{ height: '32px' }}>
                        {/* Timeline background */}
                        <div className="absolute inset-0 flex">
                          {Array.from({ length: 12 }).map((_, hour) => (
                            <div
                              key={hour}
                              className="flex-1 border-r border-[rgba(20,30,60,0.05)] last:border-r-0"
                            />
                          ))}
                        </div>
                        
                        {/* Visit blocks */}
                        {staff.visits.map((visit, visitIndex) => {
                          const leftPercent = (visit.start / 12) * 100;
                          const widthPercent = (visit.duration / 12) * 100;
                          
                          return (
                            <div
                              key={visitIndex}
                              className="absolute h-full rounded-sm"
                              style={{
                                left: `${leftPercent}%`,
                                width: `${widthPercent}%`,
                                backgroundColor: visit.type === 'unallocated' 
                                  ? '#fbbf24' 
                                  : visit.highlighted 
                                    ? '#f0fdf4' 
                                    : '#e2e8f0',
                                border: visit.type === 'unallocated' 
                                  ? '1.5px solid #f59e0b' 
                                  : visit.highlighted 
                                    ? '1.5px solid #34d399' 
                                    : 'none',
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-20">
              {PlayIcon && <PlayIcon className="w-5 h-5 text-white" />}
            </div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-20">
              {UserIcon && <UserIcon className="w-4 h-4 text-white" />}
            </div>
          </div>

          {/* Right side - Text content */}
          <div>
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-6">
              {UsersIcon && <UsersIcon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Visibility across carers, visits, and the rota
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Give managers and owners one operational picture of who is out, what is running late, and what still needs cover — without jumping between spreadsheets and chat threads.
            </p>
            <p className="mt-4">
              <a href="/home-care-app" className="text-[#4370B7] font-semibold text-sm hover:underline">
                Home care app
              </a>
            </p>
          </div>
        </div>

        {/* Care planning software */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-6">
              {FileTextIcon && <FileTextIcon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Care planning software that stays with the visit
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Digital care plans, risk context, and structured handovers mean your home care app and office teams work from the same detail — not a faded printout from last month.
            </p>
            <p className="mt-4">
              <a
                href="/care-planning-software"
                className="text-[#4370B7] font-semibold text-sm hover:underline"
              >
                Care planning software
              </a>
            </p>
          </div>
          <div className="relative">
            <img
              src="/demo-media/demo-patient-profile-care-planning.png"
              alt="Care planning view in DomiClear domiciliary care software"
              className="rounded-2xl shadow-lg border border-gray-100 w-full h-auto"
            />
          </div>
        </div>

        {/* eMAR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1 relative">
            <img
              src="/demo-media/demo-emar-medication-management.png"
              alt="eMAR medication management in DomiClear"
              className="rounded-2xl shadow-lg border border-gray-100 w-full h-auto"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mb-6">
              {SmartphoneIcon && <SmartphoneIcon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              eMAR software on the carer app
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Medication rounds with prompts, photos, and timestamps help teams document what was given, when, and where — aligned with how domiciliary visits actually run.
            </p>
            <p className="mt-4">
              <a href="/emar-software" className="text-[#4370B7] font-semibold text-sm hover:underline">
                eMAR software
              </a>
            </p>
          </div>
        </div>

        {/* Records & compliance tooling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center mb-6">
              {ShieldIcon && <ShieldIcon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Records, incidents, and audit-friendly reporting
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Keep incidents, governance views, and exports organised so you can answer supervision and regulatory questions with less last-minute scrambling.
            </p>
            <p className="mt-4">
              <a href="/platform" className="text-[#4370B7] font-semibold text-sm hover:underline">
                Platform
              </a>
            </p>
          </div>
          <div className="relative">
            <img
              src="/demo-media/demo-audit-dashboard.png"
              alt="Audit and reporting dashboard in DomiClear"
              className="rounded-2xl shadow-lg border border-gray-100 w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
