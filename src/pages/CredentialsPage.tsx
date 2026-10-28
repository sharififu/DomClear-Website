import React from 'react';
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const completed = [
  {
    title: 'NHS Data Security and Protection Toolkit',
    status: 'Standards Met — 2026–27',
    description: 'DomiClear Ltd published its NHS Data Security and Protection Toolkit self-assessment on 24 October 2026. The result is Standards Met, valid to 30 June 2028.',
    detail: 'The DSPT is an organisational self-assessment. It is not NHS product endorsement or inclusion on the NHS Assured Solutions List.',
    link: 'https://www.dsptoolkit.nhs.uk/',
    linkLabel: 'Visit the official DSPT website',
  },
  {
    title: 'Information Commissioner’s Office',
    status: 'Registered — ZC220419',
    description: 'DomiClear Ltd is registered with the Information Commissioner’s Office under registration reference ZC220419.',
    detail: 'ICO registration is a statutory registration, not certification that a product or organisation complies with every data-protection requirement.',
    link: 'https://ico.org.uk/esdwebpages/search',
    linkLabel: 'Verify registration at the ICO',
  },
];

const underway = [
  {
    title: 'Cyber Essentials',
    description: 'We are working towards Cyber Essentials certification and completing the required security controls and assessment. Certification has not yet been awarded.',
  },
  {
    title: 'Accessibility and WCAG 2.2',
    description: 'We are improving accessibility and testing selected areas against WCAG criteria. Full WCAG 2.2 conformance has not yet been established.',
  },
  {
    title: 'DCB0129 clinical risk management',
    description: 'Clinical safety documentation is being prepared for qualified clinical safety review. DCB0129 assurance remains in progress; clinical sign-off has not been obtained.',
  },
  {
    title: 'Care information standards — MODS and PRSB',
    description: 'We are using relevant PRSB and NHS information standards to inform product design. PRSB / MODS conformance has not yet been established, and DomiClear is not a PRSB Quality Partner.',
  },
  {
    title: 'ISO/IEC 27001',
    description: 'We are developing our information security controls and assessing them against ISO 27001. DomiClear is not ISO 27001 certified.',
  },
];

export const CredentialsPage: React.FC = () => (
  <div className="bg-white text-[#0F172A]">
    <section className="bg-gradient-to-br from-[#123458] via-[#245e94] to-[#4a6eb5] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#aee9fc]">Security &amp; transparency</p>
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Our credentials &amp; assurance</h1>
        <p className="max-w-3xl text-lg leading-8 text-white/85">
          Care providers deserve to know what security assurance a supplier has achieved — and what is still in progress.
          Here is the current, evidence-based position for DomiClear Ltd.
        </p>
      </div>
    </section>

    <section aria-labelledby="verified-credentials" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 flex items-start gap-4">
          <CheckBadgeIcon className="mt-1 h-9 w-9 shrink-0 text-[#0A8F7A]" aria-hidden="true" />
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#0A8F7A]">Current evidence</p>
            <h2 id="verified-credentials" className="text-3xl font-bold">Achieved and registered</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {completed.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#DCE7F1] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <span className="mb-5 inline-flex rounded-full bg-[#E5F6F0] px-3 py-1 text-xs font-semibold text-[#086C5D]">{item.status}</span>
              <h3 className="mb-3 text-2xl font-bold leading-tight">{item.title}</h3>
              <p className="mb-4 leading-7 text-[#475569]">{item.description}</p>
              <p className="mb-5 text-sm leading-6 text-[#64748B]">{item.detail}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#2364AA] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2364AA]">
                {item.linkLabel}<ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section aria-labelledby="assurance-roadmap" className="border-y border-[#E2E8F0] bg-[#F6F9FC] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-9 flex items-start gap-4">
          <ShieldCheckIcon className="mt-1 h-9 w-9 shrink-0 text-[#4370B7]" aria-hidden="true" />
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#4370B7]">Our roadmap</p>
            <h2 id="assurance-roadmap" className="text-3xl font-bold">Work in progress</h2>
            <p className="mt-3 max-w-3xl leading-7 text-[#475569]">These are planned or ongoing activities, not awarded certifications or independently confirmed conformance.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {underway.map((item) => (
            <article key={item.title} className="rounded-xl border border-[#DCE7F1] bg-white p-6">
              <span className="mb-3 inline-block rounded-full bg-[#EAF2FF] px-3 py-1 text-xs font-semibold text-[#255794]">In progress</span>
              <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
              <p className="leading-7 text-[#475569]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-6 rounded-2xl bg-[#0F172A] p-8 text-white sm:flex-row sm:items-center sm:p-10">
        <div className="max-w-2xl">
          <ClipboardDocumentCheckIcon className="mb-4 h-8 w-8 text-[#7DD3FC]" aria-hidden="true" />
          <h2 className="mb-3 text-2xl font-bold">Need security assurance information?</h2>
          <p className="leading-7 text-white/75">We can discuss the evidence available for supplier due diligence and explain the scope of our current assurance activities.</p>
        </div>
        <a href="/contact" className="inline-flex shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-[#16365D] transition-colors hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Contact DomiClear</a>
      </div>
    </section>
  </div>
);
