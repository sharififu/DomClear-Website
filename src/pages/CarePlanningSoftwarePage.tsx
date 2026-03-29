import React from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  FolderOpenIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { FAQAccordion } from '../components/FAQAccordion';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const carePlanningFaqItems = [
  {
    question: 'What is care planning software?',
    answer:
      'Care planning software helps agencies create, update, and organise digital care plans so teams can access the right information in one structured place instead of scattered paper or files.',
  },
  {
    question: 'Is DomiClear suitable for domiciliary care agencies?',
    answer:
      'Yes. DomiClear is built for UK domiciliary care agencies and supports care managers, coordinators, and owners who need clearer care plan workflows and team access.',
  },
  {
    question: 'Can it replace paper care plans?',
    answer:
      'DomiClear supports digital care planning so you can move away from ring-binders and printouts that are harder to keep current and share consistently across visits.',
  },
  {
    question: 'Does it make care plan updates easier for teams?',
    answer:
      'Yes. Updates can be reflected in one care plan record, giving carers and office staff a clearer view of what has changed and reducing duplicate admin across channels.',
  },
  {
    question: 'Can I try it before booking a full demo?',
    answer:
      'Absolutely. You can start a free trial first, then book a demo if you want a guided walkthrough for your agency.',
  },
];

export const CarePlanningSoftwarePage: React.FC = () => {
  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Care planning software
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Care planning software for UK domiciliary care agencies
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Give teams easier access to care plans, clearer updates, and more organised day-to-day workflows. DomiClear
            is digital care planning software and domiciliary care planning software in one practical system for UK home
            care teams.
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

      <section className="py-20 bg-white" aria-labelledby="pain-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="pain-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Care planning pain points that create extra admin
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              When care plan information is hard to find or keep current, coordinators and carers spend time on paperwork
              instead of coordinated delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Paper files or PDFs that do not reflect the latest agreed care plan',
              'Care plan updates spread across calls, notes, and informal messages',
              'Carers and managers sometimes working from different versions of the same plan',
              'Time lost locating risk, preferences, and routine detail before each visit',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[rgba(20,30,60,0.08)] bg-[#FAFBFC] p-6">
                <p className="text-[#0F172A] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="benefits-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="benefits-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Core benefits of a digital care planning system
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              Care plan software should make information easier to organise, update, and share. DomiClear supports home care care planning software needs and focuses on a
              clearer workflow for UK domiciliary teams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: DocumentTextIcon,
                title: 'Easier digital care planning',
                text: 'Structure care plan content so teams know where to look for needs, preferences, and routines.',
              },
              {
                icon: ArrowPathIcon,
                title: 'Faster care plan updates',
                text: 'Reflect changes in one record so the office and doorstep stay closer to the same information.',
              },
              {
                icon: FolderOpenIcon,
                title: 'Clearer information access',
                text: 'Reduce hunting through folders, inboxes, and ad hoc notes for the detail carers need on shift.',
              },
              {
                icon: UserGroupIcon,
                title: 'Better visibility for carers and managers',
                text: 'Support day-to-day coordination with a shared view of care plan context across roles.',
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

      <section className="py-20 bg-white" aria-labelledby="teams-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="teams-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              How DomiClear helps teams keep care plans clearer and easier to access
            </h2>
            <p className="text-lg text-[#4B5563] mb-8">
              Whether you call it care plan software or a broader digital care planning system, the goal is the same:
              clearer access and faster updates. DomiClear fits real visit rhythms and keeps care plan records organised
              alongside scheduling and medication workflows.
            </p>
            <ul className="space-y-4">
              {[
                'A single place to work from for care plan structure and updates',
                'Less duplicate admin from re-keying or circulating informal changes',
                'Easier for coordinators to support carers with the right context',
                'More organised records for day-to-day operations',
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
                src="/demo-media/demo-patient-profile-care-planning.png"
                alt="Digital care planning software care plan view in DomiClear"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
              <p className="text-[#0F172A] font-semibold mb-2">Related product areas</p>
              <p className="text-[#4B5563] mb-4">
                Care planning sits alongside scheduling and medication. This page stays focused on care plans; use these
                links for rota and eMAR detail.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/platform#care-planning" className="text-[#4370B7] font-semibold hover:underline">
                  Platform
                </a>
                <a href="/" className="text-[#4370B7] font-semibold hover:underline">
                  Homepage
                </a>
                <a href="/home-care-scheduling-software" className="text-[#4370B7] font-semibold hover:underline">
                  Scheduling software
                </a>
                <a href="/emar-software" className="text-[#4370B7] font-semibold hover:underline">
                  eMAR software
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
              Why agencies switch from paper files, scattered records, and older software
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              A dedicated care planning system reduces friction when everyone needs the same up-to-date detail without
              running a second job as an archivist.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                before: 'Before: Ring binders and printouts that fall behind real life',
                after: 'After: Digital care plans that are easier to keep organised and find',
              },
              {
                before: 'Before: Updates stuck in emails and informal messages',
                after: 'After: Care plan changes reflected where the team already works',
              },
              {
                before: 'Before: Carers unsure which version of a plan is current',
                after: 'After: A clearer shared reference for visits and handovers',
              },
              {
                before: 'Before: Older tools that feel slow or awkward on the front line',
                after: 'After: A more practical workflow built around domiciliary delivery',
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
            Start a free trial and test your care planning workflows
          </h2>
          <p className="text-lg text-[#4B5563] mb-10">
            See how DomiClear supports digital care plans, updates, and team access in your real agency context.
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
              Need more detail?{' '}
              <a href="/contact" className="text-[#4370B7] font-semibold hover:underline">
                Contact our team
              </a>{' '}
              or{' '}
              <a href="/book-demo" className="text-[#4370B7] font-semibold hover:underline">
                book a demo
              </a>
              .
            </p>
          </div>
          <FAQAccordion items={carePlanningFaqItems} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Put care plan clarity at the centre of your agency workflow
          </h2>
          <p className="text-lg text-white/90 mb-10">
            DomiClear helps UK domiciliary agencies run care planning software that is easier to update, easier to access,
            and easier to coordinate around every day.
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
