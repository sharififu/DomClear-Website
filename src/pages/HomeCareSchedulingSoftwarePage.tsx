import React from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { FAQAccordion } from '../components/FAQAccordion';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const schedulingFaqItems = [
  {
    question: 'What is home care scheduling software?',
    answer:
      'Home care scheduling software helps agencies plan visits, assign carers, manage rota changes, and keep daily operations visible in one system instead of relying on disconnected spreadsheets or messages.',
  },
  {
    question: 'Is DomiClear suitable for domiciliary care agencies?',
    answer:
      'Yes. DomiClear is built for UK domiciliary care agencies and supports coordinators, care managers, and agency owners who need clear rota control across carers and visits.',
  },
  {
    question: 'Can it help manage rotas and visit changes?',
    answer:
      'Yes. You can update rotas, reallocate carers, and respond to last-minute changes while keeping a live view of what is scheduled, in progress, and needs attention.',
  },
  {
    question: 'Is it better than spreadsheets or manual scheduling?',
    answer:
      'For most agencies, yes. A dedicated rota software workflow reduces version confusion, duplicate updates, and fragmented communication from whiteboards, spreadsheets, and WhatsApp threads.',
  },
  {
    question: 'Can I try it before booking a full demo?',
    answer:
      'Absolutely. You can start a free trial first, then book a demo if you want a guided walkthrough for your team and workflows.',
  },
];

export const HomeCareSchedulingSoftwarePage: React.FC = () => {
  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Scheduling & rota software
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Home care scheduling software for UK domiciliary care agencies
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Plan rotas faster, keep clear visibility across carers and visits, and handle last-minute changes with less stress.
            DomiClear gives coordinators practical daily control with modern domiciliary care rota software built for UK teams.
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

      <section className="py-20 bg-white" aria-labelledby="pain-points-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="pain-points-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Common scheduling pain points for home care teams
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              If your day starts with rota confusion and constant message chasing, the issue is usually process
              fragmentation, not your team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Multiple spreadsheet versions and no single source of truth',
              'Late cover changes spread across calls, texts, and WhatsApp',
              'Limited visibility of who is on time, delayed, or unallocated',
              'Too much coordinator time spent fixing avoidable rota friction',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[rgba(20,30,60,0.08)] bg-[#FAFBFC] p-6"
              >
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
              Core rota software benefits for busy agencies
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              DomiClear helps you coordinate care delivery with fewer moving parts and better day-to-day control.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: CalendarDaysIcon,
                title: 'Plan and adjust rotas faster',
                text: 'Make rota updates in minutes, not across disconnected files and chats.',
              },
              {
                icon: UserGroupIcon,
                title: 'Keep visibility across carers and visits',
                text: 'See allocations, visit status, and staffing gaps in one operational view.',
              },
              {
                icon: ArrowsRightLeftIcon,
                title: 'Handle last-minute changes cleanly',
                text: 'Reassign and rebalance work quickly when absences or delays happen.',
              },
              {
                icon: ClipboardDocumentListIcon,
                title: 'Reduce admin friction for coordinators',
                text: 'Spend less time reconciling updates and more time keeping care delivery on track.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] p-6"
                >
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

      <section className="py-20 bg-white" aria-labelledby="coordinator-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="coordinator-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              How DomiClear helps coordinators stay in control
            </h2>
            <p className="text-lg text-[#4B5563] mb-8">
              Scheduling software for home care agencies should make daily coordination easier, not add another admin
              layer. DomiClear keeps rota decisions, visit updates, and team visibility connected.
            </p>
            <ul className="space-y-4">
              {[
                'Live rota context for daily stand-up and handover decisions',
                'Clearer allocation visibility before issues become missed visits',
                'Smoother communication between office and carers during shift changes',
                'More confidence when balancing continuity, workload, and timing',
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
                src="/demo-media/demo-schedule-rota-planning.png"
                alt="Home care scheduling software rota planning view in DomiClear"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="bg-[#FAFBFC] rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
              <p className="text-[#0F172A] font-semibold mb-2">Need broader platform context?</p>
              <p className="text-[#4B5563] mb-4">
                See how scheduling fits into the full operational workflow without losing this page’s rota-focused view.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/platform#scheduling" className="text-[#4370B7] font-semibold hover:underline">
                  Platform
                </a>
                <a href="/" className="text-[#4370B7] font-semibold hover:underline">
                  Homepage
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
              Why agencies switch from spreadsheets, whiteboards, and WhatsApp
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              When rota coordination is scattered, simple changes become operational risk. A dedicated care staff
              scheduling software workflow creates cleaner execution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                before: 'Before: Cover decisions buried in message threads',
                after: 'After: A shared, visible rota state the whole office can trust',
              },
              {
                before: 'Before: Manual reconciles between carers, coordinators, and payroll',
                after: 'After: Scheduling decisions are captured once and tracked clearly',
              },
              {
                before: 'Before: Last-minute changes cause confusion and duplicated effort',
                after: 'After: Reallocation happens quickly with better operational visibility',
              },
              {
                before: 'Before: Coordinators spend hours firefighting basic schedule issues',
                after: 'After: More time for quality oversight and service continuity',
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
            Start with a free trial and test your scheduling workflows
          </h2>
          <p className="text-lg text-[#4B5563] mb-10">
            See how DomiClear handles rota planning, carer allocation, and day-of coordination in your real operating
            context.
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
          <FAQAccordion items={schedulingFaqItems} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bring rota clarity to your agency operations
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Use home care scheduling software built for UK domiciliary teams and keep trial-first momentum without
            waiting for a long sales process.
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
