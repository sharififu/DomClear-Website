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
              <div className="px-6 py-4 border-b border-[rgba(20,30,60,0.08)]">
                <h3 className="text-lg font-bold text-[#0F172A]">Roster</h3>
              </div>

              <div className="bg-[#f8fafc]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                  aria-label="Roster and shift management in DomiClear domiciliary care software"
                >
                  <source src="/demo-media/demo-shift-management.mp4" type="video/mp4" />
                </video>
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
              Give managers and care staff one operational picture of who is out, what is running late, and what still needs cover — without jumping between spreadsheets and chat threads.
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
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-lg border border-gray-100 w-full h-auto block"
              aria-label="Care planning view in DomiClear domiciliary care software"
            >
              <source src="/demo-media/demo-care-planning.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* eMAR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1 relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-lg border border-gray-100 w-full h-auto block"
              aria-label="eMAR medication management in DomiClear"
            >
              <source src="/demo-media/demo-emar-medication-management.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center mb-6">
              {SmartphoneIcon && <SmartphoneIcon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              eMAR software with centralised medication management
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Create a medication once and reuse it across service users — no need to enter the same medication again and again. Record administration with prompts, photos, timestamps, and clear audit trails, all built for how UK domiciliary care teams actually work.
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
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-lg border border-gray-100 w-full h-auto block"
              aria-label="Audit and reporting dashboard in DomiClear"
            >
              <source src="/demo-media/demo-audit-dashboard.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
