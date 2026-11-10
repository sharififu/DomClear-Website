import React from 'react';
import { getContentIcon } from './icons';

export const ComprehensiveFeatures: React.FC = () => {
  const FileTextIcon = getContentIcon('FileText');
  const SmartphoneIcon = getContentIcon('Smartphone');
  const ShieldIcon = getContentIcon('Shield');
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Consolidated scheduling feature — staff availability and rota planning */}
        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.28)] mb-20">
          <div
            className="absolute -top-40 -right-36 h-96 w-96 rounded-full bg-[#4370B7]/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#4370B7] mb-5">
                  <span className="h-2 w-2 rounded-full bg-[#10bfa3]" aria-hidden="true" />
                  Smart care scheduling
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#0F172A] leading-[1.13] mb-6">
                  A smarter way to manage your rota.
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Plan visits, manage staff availability and see your daily schedule in one clear workspace.
                </p>
                <p className="text-base text-slate-600 leading-relaxed mt-4">
                  With DomiClear's Improve Rota tools, you can spot scheduling conflicts,
                  identify excessive travel and gaps between visits, and explore alternative
                  arrangements before making changes.
                </p>
                <p className="text-base font-medium text-[#17223c] mt-5">
                  Keep control of your rota while making more informed scheduling decisions.
                </p>
                <a
                  href="/home-care-scheduling-software"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#4370B7] px-5 py-3 font-semibold text-white hover:bg-[#315a98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4370B7] transition-colors"
                >
                  Explore scheduling features
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="DomiClear scheduling capabilities">
                {[
                  {
                    number: '01',
                    title: 'Plan the day',
                    detail: 'Review visits, carer assignments and staff availability in a visual daily rota.',
                  },
                  {
                    number: '02',
                    title: 'Spot scheduling issues',
                    detail: 'Identify long gaps, excessive travel and tight connections to review.',
                  },
                  {
                    number: '03',
                    title: 'Compare alternatives',
                    detail: 'Preview proposed changes alongside the current schedule before deciding.',
                  },
                  {
                    number: '04',
                    title: 'Consider care needs',
                    detail: 'Rota suggestions take recorded absence, availability, skills and care preferences into account.',
                  },
                ].map((feature) => (
                  <div
                    key={feature.number}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-5 py-5"
                  >
                    <span className="text-xs font-bold tracking-widest text-[#4370B7]" aria-hidden="true">
                      {feature.number}
                    </span>
                    <h3 className="text-base font-bold text-[#0F172A] mt-3 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {feature.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <p className="text-xs font-semibold tracking-[0.13em] uppercase text-slate-500 mb-4">
                A closer look at scheduling
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="overflow-hidden rounded-2xl bg-[#f8fafc] border border-slate-200 shadow-sm">
                  <div className="px-5 py-4 flex items-center justify-between gap-4 bg-white">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Daily rota</h3>
                    <span className="text-xs text-slate-500">Scheduling overview</span>
                  </div>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                    aria-label="DomiClear daily rota and shift management demonstration"
                  >
                    <source src="/demo-media/demo-shift-management.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="overflow-hidden rounded-2xl bg-[#f8fafc] border border-slate-200 shadow-sm">
                  <div className="px-5 py-4 flex items-center justify-between gap-4 bg-white">
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Staff availability</h3>
                    <span className="text-xs text-slate-500">Team planning overview</span>
                  </div>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-auto block"
                    aria-label="DomiClear staff availability management demonstration"
                  >
                    <source src="/demo-media/demo-staff-availability.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
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
