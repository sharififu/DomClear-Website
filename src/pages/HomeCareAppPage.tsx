import React from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { FAQAccordion } from '../components/FAQAccordion';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const homeCareAppFaqItems = [
  {
    question: 'What is a home care app?',
    answer:
      'A home care app is software carers and office teams use on mobile devices to access schedules, care information, and records during domiciliary visits, with less reliance on paper or scattered messages.',
  },
  {
    question: 'Is DomiClear suitable for domiciliary care agencies?',
    answer:
      'Yes. DomiClear is built for UK domiciliary care agencies and supports practical day-to-day use in the field and coordination from the office.',
  },
  {
    question: 'Can carers and managers both use it?',
    answer:
      'Carers typically use the mobile app for visits, while coordinators and managers use the web experience for oversight, planning, and administration. Everyone works from connected information.',
  },
  {
    question: 'Does it help replace paper and fragmented systems?',
    answer:
      'DomiClear helps agencies move routine coordination and record access into one home care software app workflow, reducing dependence on loose paper and disconnected chat threads.',
  },
  {
    question: 'Can I try it before booking a full demo?',
    answer:
      'Yes. Start a free trial to explore the app in your own context, or book a demo if you prefer a guided walkthrough.',
  },
];

export const HomeCareAppPage: React.FC = () => {
  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Home care app
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Home care app for UK domiciliary care agencies
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            A practical home care management app for teams on the move and coordinators in the office. See schedules and
            records with less friction than paper, scattered tools, or clunky software. Built as a domiciliary care app
            agencies can run day to day.
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

      <section className="py-20 bg-white" aria-labelledby="why-app-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="why-app-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why agencies need a better home care app
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              Domiciliary care depends on clear information at the point of care. When the app experience is weak, teams
              fall back to workarounds that create extra admin and uneven visibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Carers juggling paper, photos, and messages to piece together what matters on a visit',
              'Coordinators unable to see a joined-up picture of the day without multiple tools',
              'Care record access that is slow or awkward on mobile when time is tight',
              'Office and field teams working from different snapshots of the same situation',
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
              Core benefits of a care app for agencies
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              DomiClear is designed as practical home care software app experience: mobile-friendly where visits happen,
              clearer for managers who need visibility without chasing updates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: DevicePhoneMobileIcon,
                title: 'Easier day-to-day use on the go',
                text: 'Access what you need for visits without wrestling with awkward mobile workflows.',
              },
              {
                icon: ClipboardDocumentListIcon,
                title: 'Clearer access to records and schedules',
                text: 'Bring routine information into one place so carers spend less time hunting for context.',
              },
              {
                icon: EyeIcon,
                title: 'Better visibility for teams',
                text: 'Help coordinators and managers see progress and gaps with less manual chasing.',
              },
              {
                icon: ArrowsRightLeftIcon,
                title: 'More joined-up workflows',
                text: 'Reduce handover friction between office planning and doorstep delivery.',
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

      <section className="py-20 bg-white" aria-labelledby="connected-heading">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="connected-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            How DomiClear helps carers, coordinators, and managers stay connected
          </h2>
          <p className="text-lg text-[#4B5563] mb-8">
            An app for domiciliary care agencies should connect roles without duplicating work. Carers get structured visit
            support; coordinators get operational clarity; managers get a clearer line of sight across the week.
          </p>
          <ul className="space-y-4">
            {[
              'Scheduling visibility so teams know where they need to be and what is changing',
              'Care planning access so visit context is easier to find before and during care',
              'Medication visibility in line with your eMAR workflow, without turning this page into a medication deep dive',
              'Less admin friction from re-keying the same detail across separate channels',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-[#4370B7] flex-shrink-0 mt-0.5" />
                <span className="text-[#374151]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="visual-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 id="visual-heading" className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Home care app on mobile, clarity on the web for the office
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              The same domiciliary care app experience scales from the doorstep to the coordinator desk, so teams are not
              working from different versions of the day.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden shadow-lg bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                <div className="p-4 flex items-center justify-center bg-[#FAFBFC]">
                  <img
                    src="/demo-media/Mobile-white.png"
                    alt="DomiClear home care app on mobile"
                    className="max-w-full h-auto object-contain max-h-80"
                  />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img
                    src="/demo-media/Desktop-white.png"
                    alt="DomiClear web for coordinators and managers"
                    className="max-w-full h-auto object-contain max-h-72"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
              <p className="text-[#0F172A] font-semibold mb-2">Explore related workflows</p>
              <p className="text-[#4B5563] mb-4">
                This page focuses on the app experience. Use these links for feature-specific detail.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <a href="/" className="text-[#4370B7] font-semibold hover:underline">
                  Homepage
                </a>
                <a href="/platform" className="text-[#4370B7] font-semibold hover:underline">
                  Platform
                </a>
                <a href="/home-care-scheduling-software" className="text-[#4370B7] font-semibold hover:underline">
                  Scheduling software
                </a>
                <a href="/care-planning-software" className="text-[#4370B7] font-semibold hover:underline">
                  Care planning software
                </a>
                <a href="/emar-software" className="text-[#4370B7] font-semibold hover:underline">
                  eMAR software
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="switch-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="switch-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why agencies switch from fragmented systems and outdated tools
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              When every visit depends on a patchwork of tools, small delays add up. A focused home care management app
              brings routine coordination into a clearer daily rhythm.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                before: 'Before: Information trapped in paper folders and ad hoc messages',
                after: 'After: A structured app workflow carers can use on shift',
              },
              {
                before: 'Before: Coordinators rebuilding the day from partial updates',
                after: 'After: Better visibility of visits, changes, and handover context',
              },
              {
                before: 'Before: Older apps that feel slow or unintuitive on mobile',
                after: 'After: A more practical mobile-friendly experience for domiciliary work',
              },
              {
                before: 'Before: Duplicate admin across separate systems',
                after: 'After: More joined-up records and scheduling context in one platform',
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

      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">
            Start a free trial and put the app in your team&apos;s hands
          </h2>
          <p className="text-lg text-[#4B5563] mb-10">
            See how DomiClear fits real domiciliary workflows before you commit to a longer rollout conversation.
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
          <FAQAccordion items={homeCareAppFaqItems} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a home care app your team will actually use?
          </h2>
          <p className="text-lg text-white/90 mb-10">
            DomiClear gives UK domiciliary agencies a practical app-led experience alongside powerful office tools, so
            day-to-day coordination stays clearer for everyone.
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
