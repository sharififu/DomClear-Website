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

        {/* Person-centred care planning — grounded in DomiClear's versioned workflow */}
        <section
          aria-labelledby="home-care-planning-heading"
          className="relative mb-20 overflow-hidden rounded-[2rem] bg-[#101d36] text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-36 h-[28rem] w-[28rem] rounded-full bg-[#4370B7]/35 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#10bfa3]/15 blur-[100px]"
          />

          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.03fr_1fr] gap-10 lg:gap-14 items-start">
              <div>
                <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase text-[#71dec9] mb-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10" aria-hidden="true">
                    {FileTextIcon && <FileTextIcon className="h-5 w-5 text-[#8edbcf]" />}
                  </span>
                  Person-centred care planning
                </p>
                <h2 id="home-care-planning-heading" className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.13] mb-6">
                  Care plans built around the person, not the paperwork.
                </h2>
                <p className="text-lg text-[#d7e1f2] leading-relaxed">
                  Go beyond a list of tasks. Document assessed needs, connect meaningful outcomes
                  to goals and supporting care tasks, and keep the purpose of each action clear.
                </p>
                <p className="text-base text-[#bbcae2] leading-relaxed mt-4">
                  Prepare changes as a draft, send revisions for independent manager review,
                  and keep the existing approved plan in place until the new version is approved.
                </p>
                <a
                  href="/care-planning-software"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#10bfa3] px-5 py-3 font-semibold text-[#052b29] hover:bg-[#5be0cd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white transition-colors"
                >
                  Explore care planning
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.075] p-5 sm:p-7 backdrop-blur-sm">
                <h3 className="text-sm font-bold tracking-[0.12em] uppercase text-[#a9c5e9] mb-5">
                  From an assessed need to a care plan
                </h3>
                <ol className="space-y-0">
                  {[
                    {
                      number: '01',
                      title: 'Understand the need',
                      detail: 'Record the assessed support someone requires.',
                    },
                    {
                      number: '02',
                      title: 'Define an outcome',
                      detail: 'Describe the result that matters to the person.',
                    },
                    {
                      number: '03',
                      title: 'Set a goal',
                      detail: 'Link a specific goal to the outcome.',
                    },
                    {
                      number: '04',
                      title: 'Add supporting tasks',
                      detail: 'Set out the care actions that support the goal.',
                    },
                    {
                      number: '05',
                      title: 'Review and approve',
                      detail: 'Submit plan changes for an independent manager’s decision.',
                    },
                  ].map((step, i, steps) => (
                    <li key={step.number} className="relative flex gap-4 pb-5 last:pb-0">
                      {i < steps.length - 1 && (
                        <span
                          className="absolute left-[17px] top-9 bottom-0 w-px bg-white/20"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 grid h-9 w-9 flex-none place-items-center rounded-full border border-[#71dec9]/50 bg-[#173653] text-xs font-bold text-[#8de1d3]">
                        {step.number}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h4 className="font-semibold text-white">{step.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-[#bdcce2]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-[#a9c5e9]">
                  Your team chooses how outcomes, goals and tasks connect. An independent manager reviews revisions before they replace the active plan.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-center border-t border-white/15 pt-9">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#f7fafc] shadow-[0_22px_50px_-24px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between gap-3 bg-white px-5 py-4">
                  <h3 className="text-sm sm:text-base font-bold text-[#17223c]">
                    Care planning in DomiClear
                  </h3>
                  <span className="text-xs font-medium text-[#64748B]">Interface preview</span>
                </div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full"
                  aria-label="DomiClear care planning interface demonstration"
                >
                  <source src="/demo-media/demo-care-planning.mp4" type="video/mp4" />
                </video>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#71dec9] mb-4">
                  Beyond the core plan
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-5">
                  The details matter, too.
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#d7e1f2] mb-5">
                  Build out the wider care record with specialist planning and review areas,
                  rather than relying on one generic document.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {[
                    'Personal care, meals and dietary needs',
                    'Positioning, handling and mobility',
                    'Vital checks and monitoring',
                    'Capacity, consent and related records',
                  ].map((area) => (
                    <li key={area} className="flex items-start gap-3 text-sm text-[#e3ecf9]">
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#10bfa3]" aria-hidden="true" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-[#c7d8e9]">
                  Approved care-plan tasks can also be selected when scheduling a visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* eMAR: medication library, PRN and recorded administration outcomes */}
        <section
          aria-labelledby="home-emar-heading"
          className="relative mb-20 overflow-hidden rounded-[2rem] border border-[#ced9f0] bg-gradient-to-br from-[#eef3ff] via-[#f9fbff] to-[#e9faf4] shadow-[0_25px_80px_-60px_rgba(27,52,100,0.3)]"
        >
          <div className="pointer-events-none absolute -right-24 -top-36 h-80 w-80 rounded-full bg-[#8c93f7]/20 blur-3xl" aria-hidden="true" />
          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[0.94fr_1.06fr] items-center gap-10 lg:gap-14">
              <div>
                <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#435bb6]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#afbde3]/70 bg-white/80" aria-hidden="true">
                    {SmartphoneIcon && <SmartphoneIcon className="h-5 w-5 text-[#435bb6]" />}
                  </span>
                  Medication management &amp; eMAR
                </p>
                <h2 id="home-emar-heading" className="mb-6 text-3xl font-bold leading-[1.14] tracking-tight text-[#0F172A] sm:text-4xl lg:text-[2.75rem]">
                  Know what's scheduled. Record what happened.
                </h2>
                <p className="text-lg leading-relaxed text-[#475569]">
                  Bring your medication library, each person's schedules and their administration history together.
                  Give carers a structured way to record doses during visits, while managers can review the resulting MAR.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  From regular medication to as-needed (PRN) doses, keep the dose given, the reason where required,
                  and the recorded outcome connected to the care record.
                </p>
                <a
                  href="/emar-software"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#435bb6] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#304492] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#435bb6]"
                >
                  Explore eMAR features
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-[#cbd5e1] bg-white shadow-[0_24px_48px_-28px_rgba(15,23,42,0.45)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                  <h3 className="text-sm font-bold text-[#17223c] sm:text-base">
                    Medication management in DomiClear
                  </h3>
                  <span className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#435bb6]">
                    Interface demo
                  </span>
                </div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="block h-auto w-full"
                  aria-label="DomiClear medication management and eMAR interface demonstration"
                >
                  <source src="/demo-media/demo-emar-medication-management.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="mt-10 border-t border-[#cbd5e1]/80 pt-8">
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#52668e]">
                From setup to recorded care
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    number: '01',
                    title: 'One medication library',
                    detail: 'Manage medication definitions and select medicines for individual service-user schedules.',
                  },
                  {
                    number: '02',
                    title: 'Scheduled and PRN doses',
                    detail: 'Work with regular schedules and record the actual dose and reason for as-needed medication.',
                  },
                  {
                    number: '03',
                    title: 'Record dose outcomes',
                    detail: 'Capture what happened, including the recorded time, staff member and reasons for non-administration where applicable.',
                  },
                  {
                    number: '04',
                    title: 'Review the MAR',
                    detail: 'Find administration history, review recorded outcomes and export medication records for follow-up.',
                  },
                ].map((feature) => (
                  <div key={feature.number} className="rounded-2xl border border-[#d7e0f1] bg-white/85 p-5 shadow-sm">
                    <span className="text-xs font-bold tracking-widest text-[#435bb6]" aria-hidden="true">
                      {feature.number}
                    </span>
                    <h4 className="mt-3 mb-2 text-base font-bold text-[#0F172A]">
                      {feature.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#475569]">{feature.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-[#64748b]">
                Medication administration is recorded while online; carers must reconnect before recording a dose.
              </p>
            </div>
          </div>
        </section>

        {/* Incident follow-up and evidence-led quality oversight */}
        <section aria-labelledby="home-quality-heading" className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_-52px_rgba(17,35,64,0.28)]">
          <div className="h-1.5 bg-gradient-to-r from-[#17345b] via-[#4370B7] to-[#10bfa3]" aria-hidden="true" />
          <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
              <div>
                <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#345e9c]">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf2ff]" aria-hidden="true">
                    {ShieldIcon && <ShieldIcon className="h-5 w-5 text-[#345e9c]" />}
                  </span>
                  Incidents &amp; quality oversight
                </p>
                <h2 id="home-quality-heading" className="mb-6 text-3xl font-bold leading-[1.14] tracking-tight text-[#0F172A] sm:text-4xl lg:text-[2.75rem]">
                  Record the concern. Follow through on what matters.
                </h2>
                <p className="text-lg leading-relaxed text-[#475569]">
                  An incident report is only the beginning. DomiClear links reported concerns
                  with relevant follow-up actions, giving managers a clearer way to review
                  what happened, see what is outstanding and record their decisions.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  Bring investigations, action tracking and audit history into the same
                  care-management workspace — without chasing disconnected paperwork.
                </p>
                <a href="/platform#compliance" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#17345b] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#2a5484] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17345b]">
                  Explore quality and reporting
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="rounded-2xl border border-[#d7e0ee] bg-[#f7faff] p-5 sm:p-7">
                <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-[#345e9c]">
                  A connected path from concern to review
                </h3>
                <ol>
                  {[
                    { number: '01', title: 'Capture the incident', detail: 'Record what happened, its severity and relevant safety concerns.' },
                    { number: '02', title: 'Follow up', detail: 'Track relevant manager, risk-assessment or care-plan review actions when raised.' },
                    { number: '03', title: 'Review and sign off', detail: 'Managers record investigation notes, decisions and sign-off where applicable.' },
                    { number: '04', title: 'Keep the trail', detail: 'Return to action status, incident history and recorded review evidence.' },
                  ].map((step, i, steps) => (
                    <li key={step.number} className="relative flex gap-4 pb-5 last:pb-0">
                      {i < steps.length - 1 && <span className="absolute bottom-0 left-[17px] top-9 w-px bg-[#c4d2e7]" aria-hidden="true" />}
                      <span className="relative z-10 grid h-9 w-9 flex-none place-items-center rounded-full border border-[#b4cbec] bg-white text-xs font-bold text-[#345e9c]">{step.number}</span>
                      <div className="min-w-0 pt-0.5">
                        <h4 className="font-semibold text-[#0F172A]">{step.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-[#51637a]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 items-center gap-8 border-t border-[#e2e8f0] pt-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_-27px_rgba(15,23,42,0.4)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#fafcff] px-5 py-4">
                  <h3 className="text-sm font-bold text-[#17223c] sm:text-base">Audit history in DomiClear</h3>
                  <span className="text-xs text-[#64748b]">Existing dashboard demo</span>
                </div>
                <video autoPlay loop muted playsInline preload="metadata" className="block h-auto w-full" aria-label="DomiClear audit dashboard demonstration">
                  <source src="/demo-media/demo-audit-dashboard.mp4" type="video/mp4" />
                </video>
              </div>
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#345e9c]">Quality monitoring</p>
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                  See what your records are telling you.
                </h3>
                <p className="text-base leading-relaxed text-[#475569]">
                  Review CQC-aligned indicative measures across the five key questions,
                  save self-assessments with findings and action plans, and export
                  supporting information for your internal quality reviews.
                </p>
                <div className="mt-6 border-l-4 border-[#10bfa3] bg-[#f0fbf7] px-5 py-4">
                  <p className="text-sm font-semibold text-[#15433c]">Built to support quality reviews, not replace them.</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#355b53]">
                    These internal indicators come from recorded data. They are not official
                    CQC inspection ratings or proof of regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
