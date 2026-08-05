import React from 'react';
import { BuildingOffice2Icon, EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const companyDetails = [
  { label: 'Trading name', value: 'DomiClear' },
  { label: 'Legal company name', value: 'DOMICLEAR LTD' },
  { label: 'Company number', value: '17383911' },
  { label: 'Registered in', value: 'England and Wales' },
  { label: 'Registered office', value: '17 School Lane, Chellaston, Derby, DE73 6TF' },
];

export const CompanyInformationPage: React.FC = () => (
  <div className="bg-white text-[#0F172A]">
    <section className="bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#d9f4ff]">Legal information</p>
        <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl">Company information</h1>
        <p className="max-w-2xl text-lg leading-8 text-white/90">
          Legal and company information for DomiClear, operated by DOMICLEAR LTD.
        </p>
      </div>
    </section>

    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="registered-details-heading">
      <div className="mx-auto max-w-[900px]">
        <div className="overflow-hidden rounded-2xl border border-[rgba(20,30,60,0.08)] bg-white shadow-[0_12px_32px_rgba(10,20,40,0.08)]">
          <div className="border-b border-[rgba(20,30,60,0.08)] bg-[#F7F9FC] p-6 sm:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#4370B7]">
              <BuildingOffice2Icon className="h-7 w-7" />
            </div>
            <h2 id="registered-details-heading" className="text-2xl font-bold sm:text-3xl">
              Registered company details
            </h2>
          </div>

          <dl className="divide-y divide-[rgba(20,30,60,0.08)]">
            {companyDetails.map((detail) => (
              <div key={detail.label} className="grid gap-2 px-6 py-5 sm:grid-cols-[220px_1fr] sm:px-8">
                <dt className="font-semibold text-[#475569]">{detail.label}</dt>
                <dd className="text-[#0F172A]">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:info@domi-clear.com"
            className="flex items-start gap-4 rounded-xl border border-[rgba(20,30,60,0.08)] bg-[#F7F9FC] p-5 transition-colors hover:bg-[#EEF4FC]"
          >
            <EnvelopeIcon className="mt-0.5 h-6 w-6 shrink-0 text-[#4370B7]" />
            <span>
              <span className="block text-sm font-semibold text-[#475569]">Contact email</span>
              <span className="mt-1 block font-medium text-[#1F6FEB]">info@domi-clear.com</span>
            </span>
          </a>
          <a
            href="https://www.domi-clear.com"
            className="flex items-start gap-4 rounded-xl border border-[rgba(20,30,60,0.08)] bg-[#F7F9FC] p-5 transition-colors hover:bg-[#EEF4FC]"
          >
            <GlobeAltIcon className="mt-0.5 h-6 w-6 shrink-0 text-[#4370B7]" />
            <span>
              <span className="block text-sm font-semibold text-[#475569]">Website</span>
              <span className="mt-1 block font-medium text-[#1F6FEB]">https://www.domi-clear.com</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  </div>
);
