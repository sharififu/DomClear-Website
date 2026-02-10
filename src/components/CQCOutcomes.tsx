import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  HeartIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { Modal } from './Modal';
import { analytics } from '../utils/analytics';

interface CQCOutcome {
  domain: string;
  icon: React.ReactNode;
  description: string;
  evidence: string[];
  exportDetails?: string;
}

const cqcOutcomes: CQCOutcome[] = [
  {
    domain: 'Safe',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    description: 'Protecting people from abuse and avoidable harm',
    evidence: [
      'GPS visit verification ensures carers arrive on time',
      'Incident reporting workflows track and resolve issues',
      'EMAR medication logging with photo evidence prevents errors',
      'Audit trails for all care activities',
    ],
    exportDetails: 'Export incident reports, medication administration records, and GPS verification logs. Generate Safe domain reports showing incident trends, medication errors, and visit compliance rates. All exports include timestamps, carer details, and full audit trails.',
  },
  {
    domain: 'Effective',
    icon: <CheckCircleIcon className="w-6 h-6" />,
    description: 'Care achieves good outcomes based on best available evidence',
    evidence: [
      'Evidence-based care plan templates',
      'Outcome tracking and KPI dashboards',
      'Compliance reports demonstrate quality measures',
      'Data-driven insights for service improvement',
    ],
    exportDetails: 'Export care plan outcomes, KPI dashboards, and quality metrics. Generate Effective domain reports showing outcome achievement rates, care plan adherence, and evidence-based interventions. Reports include comparative analysis and trend data.',
  },
  {
    domain: 'Caring',
    icon: <HeartIcon className="w-6 h-6" />,
    description: 'People are treated with compassion, kindness, dignity and respect',
    evidence: [
      'Personalised care plans reflect individual preferences',
      'Family portal keeps loved ones informed and involved',
      'Real-time visit notes show person-centred care delivery',
      'Carer app supports consistent, quality care delivery',
    ],
    exportDetails: 'Export personalised care plans, family feedback, and visit notes demonstrating person-centred care. Generate Caring domain reports showing family engagement rates, preference adherence, and quality of care delivery evidence.',
  },
  {
    domain: 'Responsive',
    icon: <ClockIcon className="w-6 h-6" />,
    description: 'Services are organised to meet people\'s needs',
    evidence: [
      'Intelligent scheduling prevents missed visits',
      'Real-time updates keep families informed',
      'Absence management ensures continuity of care',
      'Flexible care plan adjustments respond to changing needs',
    ],
    exportDetails: 'Export scheduling reports, visit completion rates, and response time metrics. Generate Responsive domain reports showing visit punctuality, missed visit rates, and how quickly care plans are adjusted to changing needs.',
  },
  {
    domain: 'Well-led',
    icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
    description: 'Leadership ensures high-quality, person-centred care',
    evidence: [
      'Executive dashboards provide oversight and insights',
      'CQC-ready domain reports demonstrate compliance',
      'Performance metrics identify areas for improvement',
      'Clear audit trails support governance and accountability',
    ],
    exportDetails: 'Export executive dashboards, performance metrics, and governance reports. Generate Well-led domain reports showing leadership oversight, quality improvement initiatives, and accountability measures. Includes trend analysis and strategic insights.',
  },
];

export const CQCOutcomes: React.FC = () => {
  const [selectedOutcome, setSelectedOutcome] = useState<CQCOutcome | null>(null);

  const handleOutcomeClick = (outcome: CQCOutcome) => {
    setSelectedOutcome(outcome);
    analytics.trackExportClicked('cqc_outcome', { cqc_domain: outcome.domain });
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#FAFBFC] rounded-full text-xs font-bold text-[#4370B7] uppercase tracking-wider mb-4 border border-[rgba(20,30,60,0.08)]">
              CQC Compliance
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Be CQC-Ready With Confidence
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto mb-2">
              DomiClear helps you evidence compliance across all five CQC key lines of enquiry.
            </p>
            <p className="text-base text-[#4B5563] max-w-2xl mx-auto">
              Be confident you can evidence compliance at any time — not just during inspections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {cqcOutcomes.map((outcome, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOutcomeClick(outcome)}
                className="text-left w-full bg-[#FAFBFC] rounded-2xl p-6 border border-[rgba(20,30,60,0.08)] hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#e6f7ff] flex items-center justify-center text-[#4370B7] hover:bg-[#b3d9ff] transition-colors">
                    {outcome.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{outcome.domain}</h3>
                </div>
                <p className="text-sm text-[#4B5563] mb-4 leading-relaxed">
                  {outcome.description}
                </p>
                <ul className="space-y-2">
                  {outcome.evidence.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#4370B7] mt-2"></div>
                      <span className="text-xs text-[#4B5563] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for export details */}
      <Modal
        isOpen={!!selectedOutcome}
        onClose={() => setSelectedOutcome(null)}
        title={selectedOutcome ? `${selectedOutcome.domain} Domain - Export & Evidence` : ''}
      >
        {selectedOutcome && (
          <div className="space-y-4">
            <p className="text-[#4B5563] leading-relaxed">{selectedOutcome.exportDetails}</p>
            <div className="pt-4 border-t border-[rgba(20,30,60,0.08)]">
              <h4 className="font-semibold text-[#0F172A] mb-3">Key Evidence Generated:</h4>
              <ul className="space-y-2">
                {selectedOutcome.evidence.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#4370B7] mt-2"></div>
                    <span className="text-[#4B5563] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
