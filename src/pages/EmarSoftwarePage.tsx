import React from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { FAQAccordion } from '../components/FAQAccordion';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const emarFaqItems = [
  {
    question: 'What is eMAR software?',
    answer:
      'eMAR software is electronic medication administration record software that helps teams document medication administration in a clear, structured digital workflow.',
  },
  {
    question: 'Is DomiClear suitable for domiciliary care agencies?',
    answer:
      'Yes. DomiClear is built for UK domiciliary care agencies and supports carers, coordinators, and managers who need clearer medication administration workflows.',
  },
  {
    question: 'Can it replace paper MAR charts?',
    answer:
      'DomiClear can replace paper-based MAR tracking with a digital eMAR workflow, helping agencies reduce paperwork and keep records easier to follow.',
  },
  {
    question: 'Does it help carers and managers keep medication records clearer?',
    answer:
      'Yes. Teams can record administration activity in one place, giving managers better visibility and helping carers avoid fragmented documentation.',
  },
  {
    question: 'Can I try it before booking a full demo?',
    answer:
      'Absolutely. You can start a free trial first, and book a demo if you want a guided walkthrough for your agency workflows.',
  },
];

export const EmarSoftwarePage: React.FC = () => {
  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            eMAR software
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            eMAR software for UK domiciliary care agencies
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Move medication administration records out of paper folders and into a clear digital workflow. DomiClear is
            eMAR for home care agencies that want cleaner records, better team visibility, and less admin friction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button
              variant="secondary"
              size="lg"
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="!bg-white !text-[#1a86f0] border-0 hover:!bg-white/90"
            >
              Start free trial
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/book-demo"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Book a demo
            </Button>
          </div>
          <p className="text-sm text-white/80">No card required · UK support · Cancel anytime</p>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="med-pain-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="med-pain-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Medication administration pain points that slow teams down
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              Most medication process friction comes from scattered records and disconnected handovers, not from lack of
              effort by carers and coordinators.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Paper MAR charts that are hard to track across visits and shifts',
              'Medication updates spread across notebooks, calls, and message threads',
              'Limited visibility for managers reviewing medication administration records',
              'Time lost chasing missing context before making routine decisions',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[rgba(20,30,60,0.08)] bg-[#FAFBFC] p-6">
                <p className="text-[#0F172A] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="emar-benefits-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="emar-benefits-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Core eMAR software benefits for day-to-day operations
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              DomiClear helps agencies run a more organised medication management software workflow without making the
              process heavier for frontline teams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: ClipboardDocumentListIcon,
                title: 'Clearer medication administration records',
                text: 'Document administration activity in one structured workflow rather than fragmented paper trails.',
              },
              {
                icon: EyeIcon,
                title: 'Better visibility for carers and managers',
                text: 'Give office teams and care delivery staff a shared, easier-to-follow view of medication records.',
              },
              {
                icon: ClockIcon,
                title: 'Easier tracking and review',
                text: 'Spend less time reconciling scattered notes and more time acting on clear information.',
              },
              {
                icon: UserGroupIcon,
                title: 'More organised team workflows',
                text: 'Support cleaner handovers and everyday coordination around medication tasks.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
                  <div className="w-12 h-12 rounded-full bg-[#e6f7ff] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#4370B7]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.title}</h3>
                  <p className="text-[#4B5563]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="team-control-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="team-control-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              How DomiClear helps teams stay clear and organised
            </h2>
            <p className="text-lg text-[#4B5563] mb-8">
              Care medication software should simplify medication documentation and visibility across the agency. DomiClear
              keeps the medication process practical, consistent, and easier to manage at scale.
            </p>
            <ul className="space-y-4">
              {[
                'A clearer shared record of medication administration activity',
                'Less duplicated admin caused by disconnected tools',
                'More confident day-to-day review for coordinators and managers',
                'Medication workflows that are easier to follow across teams',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-[#4370B7] flex-shrink-0 mt-0.5" />
                  <span className="text-[#374151]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden shadow-lg">
              <img
                src="/demo-media/demo-emar-medication-management.png"
                alt="eMAR software medication administration screen in DomiClear"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
              <p className="text-[#0F172A] font-semibold mb-2">Explore connected workflows</p>
              <p className="text-[#4B5563] mb-4">
                See how eMAR connects with scheduling and wider operations while this page stays focused on medication intent.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/platform" className="text-[#4370B7] font-semibold hover:underline">
                  Platform
                </a>
                <a href="/" className="text-[#4370B7] font-semibold hover:underline">
                  Homepage
                </a>
                <a href="/home-care-scheduling-software" className="text-[#4370B7] font-semibold hover:underline">
                  Scheduling software
                </a>
                <a href="/care-planning-software" className="text-[#4370B7] font-semibold hover:underline">
                  Care planning software
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="switch-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="switch-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why agencies switch from paper MAR charts and fragmented systems
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              When medication records are scattered, routine administration work becomes harder to coordinate. A focused
              electronic medication administration record software workflow keeps teams more organised.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                before: 'Before: Paper records that are difficult to review quickly',
                after: 'After: Digital records that are easier to track and understand',
              },
              {
                before: 'Before: Medication updates across disconnected channels',
                after: 'After: One structured eMAR workflow for team visibility',
              },
              {
                before: 'Before: Time lost reconciling unclear administration notes',
                after: 'After: Cleaner records with less day-to-day admin friction',
              },
              {
                before: 'Before: Limited oversight across carers and office teams',
                after: 'After: Shared operational clarity for medication workflows',
              },
            ].map((item) => (
              <div key={item.before} className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
                <p className="text-sm uppercase tracking-wide text-[#64748B] font-semibold mb-2">Before</p>
                <p className="text-[#0F172A] font-medium mb-4">{item.before.replace('Before: ', '')}</p>
                <p className="text-sm uppercase tracking-wide text-[#4370B7] font-semibold mb-2">After</p>
                <p className="text-[#4B5563]">{item.after.replace('After: ', '')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            Start a free trial and test your eMAR workflow
          </h2>
          <p className="text-lg text-[#4B5563] mb-10">
            See how DomiClear supports medication administration tracking and clearer records in your real agency context.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" href={EXTERNAL_SIGNUP_URL} target="_blank" rel="noreferrer">
              Start free trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/book-demo"
              className="border-[#0F172A]/20 text-[#0F172A] hover:bg-[#0F172A]/5"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FAFBFC]" aria-labelledby="faq-heading">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
              Frequently asked questions
            </h2>
            <p className="text-lg text-[#4B5563]">
              Need more detail? <a href="/contact" className="text-[#4370B7] font-semibold hover:underline">Contact our team</a>{' '}
              or <a href="/book-demo" className="text-[#4370B7] font-semibold hover:underline">book a demo</a>.
            </p>
          </div>
          <FAQAccordion items={emarFaqItems} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make medication workflows clearer with focused eMAR software
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Use DomiClear to move from fragmented medication records to a cleaner, more practical day-to-day process for
            carers, coordinators, and managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              href={EXTERNAL_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="!bg-white !text-[#1a86f0] border-0 hover:!bg-white/90"
            >
              Start free trial
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/book-demo"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
