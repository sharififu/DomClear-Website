import React from 'react';
import { ArrowTopRightOnSquareIcon, CheckBadgeIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon, IdentificationIcon } from '@heroicons/react/24/outline';

const completed = [
  {
    title: 'NHS Data Security and Protection Toolkit',
    emblem: 'dspt',
    status: 'Standards Met — 2026–27',
    description: 'DomiClear Ltd published its NHS Data Security and Protection Toolkit self-assessment on 24 October 2026. The result is Standards Met, valid to 30 June 2028.',
    detail: 'The DSPT is an organisational self-assessment. It is not NHS product endorsement or inclusion on the NHS Assured Solutions List.',
    link: 'https://www.dsptoolkit.nhs.uk/',
    linkLabel: 'Visit the official DSPT website',
  },
  {
    title: 'Information Commissioner’s Office',
    emblem: 'ico',
    status: 'Registered — ZC220419',
    description: 'DomiClear Ltd is registered with the Information Commissioner’s Office under registration reference ZC220419.',
    detail: 'ICO registration is a statutory registration, not certification that a product or organisation complies with every data-protection requirement.',
    link: 'https://ico.org.uk/esdwebpages/search',
    linkLabel: 'Verify registration at the ICO',
  },
  {
    title: 'Minimum Operational Data Standard (MODS)',
    emblem: 'mods',
    status: 'MODS compliant — DAPB4102',
    description: 'DomiClear is compliant with the NHS England Adult Social Care Digital Social Care Record Minimum Operational Data Standard (DAPB4102), the information standard for what a digital social care record must hold.',
    detail: 'MODS compliance is DomiClear Ltd’s own assessment against the published standard. It is not NHS product endorsement or inclusion on the NHS Assured Solutions List.',
    link: 'https://digital.nhs.uk/data-and-information/information-standards/governance/latest-activity/standards-and-collections/dapb4102-adult-social-care-record-minimum-operational-data-standard',
    linkLabel: 'Read the MODS standard',
  },
];

export const CredentialsPage: React.FC = () => (
  <div className="bg-white text-[#0F172A]">
    <section className="bg-gradient-to-br from-[#123458] via-[#245e94] to-[#4a6eb5] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#aee9fc]">Security &amp; transparency</p>
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Our credentials &amp; assurance</h1>
        <p className="max-w-3xl text-lg leading-8 text-white/85">
          Care providers deserve to know what security assurance a supplier has achieved.
          Here is the current, evidence-based position for DomiClear Ltd.
        </p>
      </div>
    </section>

    <section aria-labelledby="verified-credentials" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 flex items-start gap-4">
          <CheckBadgeIcon className="mt-1 h-9 w-9 shrink-0 text-[#0A8F7A]" aria-hidden="true" />
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#0F766E]">Current evidence</p>
            <h2 id="verified-credentials" className="text-3xl font-bold">Achieved and registered</h2>
          </div>
        </div>
        <div className="mb-9 overflow-hidden rounded-2xl border border-[#DCE7F1] bg-[#E8F0F0] shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="w-full shrink-0 rounded-lg border border-[#CBDAD6] bg-white p-6 text-center shadow-sm sm:w-[280px]" aria-label="Summary of DomiClear's issued DSPT certificate">
              <p className="text-sm font-bold tracking-tight text-[#0F172A]">Data Security and<br />Protection Toolkit</p>
              <p className="mt-1 text-xs text-[#64748B]">2026–27 (version 9)</p>
              <div className="my-5 border-y border-[#DCE7F1] py-4">
                <ShieldCheckIcon className="mx-auto h-11 w-11 text-[#0A8F7A]" aria-hidden="true" />
                <p className="mt-2 text-lg font-bold text-[#0F172A]">Standards Met</p>
              </div>
              <p className="text-xs font-bold text-[#334155]">DOMICLEAR LTD</p>
              <p className="mt-1 text-[11px] text-[#64748B]">Published 24 October 2026</p>
            </div>
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#0F766E]">Issued NHS DSPT certificate</p>
              <h3 className="mb-3 text-2xl font-bold">Our 2026–27 Standards Met result</h3>
              <p className="mb-4 leading-7 text-[#475569]">The certificate confirms DomiClear Ltd's published organisational DSPT self-assessment, dated 24 October 2026 and valid to 30 June 2028.</p>
              <p className="mb-5 text-sm leading-6 text-[#475569]">The graphic is a summary of our genuine issued certificate, not a reproduction or NHS product endorsement. The original PDF can be supplied on request; publication status can be checked with the NHS.</p>
              <a href="https://www.dsptoolkit.nhs.uk/OrganisationSearch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#164E83] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#123C65]">Check NHS DSPT publication <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <p className="mb-6 text-sm text-[#64748B]">DomiClear-designed illustrations, not official regulator logos or certification marks.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {completed.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#DCE7F1] bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-[#B9DCCD] bg-gradient-to-br from-[#F2FBF7] to-[#E6F4FF] text-[#116F64] shadow-sm" aria-hidden="true">
                  {item.emblem === 'dspt' ? <ShieldCheckIcon className="mb-1 h-10 w-10" /> : item.emblem === 'mods' ? <ClipboardDocumentCheckIcon className="mb-1 h-10 w-10" /> : <IdentificationIcon className="mb-1 h-10 w-10" />}
                  <span className="text-[11px] font-extrabold tracking-[0.15em]">{item.emblem === 'dspt' ? 'DSPT' : item.emblem === 'mods' ? 'MODS' : 'REGISTERED'}</span>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E5F6F0] px-3 py-1.5 text-xs font-semibold text-[#086C5D]"><CheckBadgeIcon className="h-4 w-4" aria-hidden="true" />{item.status}</span>
              </div>
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
