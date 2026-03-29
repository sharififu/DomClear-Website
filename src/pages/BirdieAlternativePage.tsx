import React from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyPoundIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { FAQAccordion } from '../components/FAQAccordion';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const birdieAlternativeFaqItems = [
  {
    question: 'What makes DomiClear a Birdie alternative?',
    answer:
      'DomiClear may be a better fit for agencies looking for a more affordable care software option, a lower cost of entry, and practical day-to-day workflows across scheduling, care planning, eMAR, and records.',
  },
  {
    question: 'Is DomiClear suitable for domiciliary care agencies?',
    answer:
      'Yes. DomiClear is built for UK domiciliary care agencies and supports carers, coordinators, managers, and agency owners with connected day-to-day workflows.',
  },
  {
    question: 'Can I try DomiClear before booking a full demo?',
    answer:
      'Yes. You can start a free trial to explore the platform in your own context, or book a demo if you want a guided walkthrough first.',
  },
  {
    question: 'Does DomiClear cover scheduling, care planning, and eMAR?',
    answer:
      'Yes. DomiClear brings scheduling, care planning, medication visibility, and care records into one joined-up platform for day-to-day operations.',
  },
  {
    question: 'How should agencies compare care software options?',
    answer:
      'Look at day-to-day usability, visibility for teams, how joined-up the workflows feel, and whether the cost of entry fits your agency stage and operating model.',
  },
];

export const BirdieAlternativePage: React.FC = () => {
  return (
    <div>
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Birdie alternative
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Birdie alternative for UK domiciliary care agencies
          </h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-10">
            If you&apos;re comparing care software options, DomiClear may be a better fit for agencies looking for a
            more affordable care software option, a lower cost of entry, clearer day-to-day workflows, and a practical
            platform carers and office teams can use with less friction.
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

      <section className="py-20 bg-white" aria-labelledby="why-birdie-alt-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="why-birdie-alt-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Why buyers look for a Birdie alternative
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              Agencies comparing modern care software are often looking for a platform that feels easier to roll out,
              clearer for teams to use every day, and more realistic on cost from the start.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'A more affordable care software option that feels viable for growing agencies',
              'A lower cost of entry without losing the core workflows teams rely on day to day',
              'A clearer user experience for carers, coordinators, and managers',
              'Less friction across records, schedules, handovers, and office visibility',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-[rgba(20,30,60,0.08)] bg-[#FAFBFC] p-6">
                <p className="text-[#0F172A] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="better-fit-heading">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="better-fit-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
            When DomiClear may be the better fit
          </h2>
          <p className="text-lg text-[#4B5563] mb-8">
            DomiClear may be a better fit if your agency wants a practical option for teams that want modern care
            software without the cost or complexity that can come with larger platforms.
          </p>
          <ul className="space-y-4">
            {[
              'For agencies looking for a lower cost of entry while still covering day-to-day operational essentials',
              'For teams that want modern, clearer UX rather than clunky or hard-to-train workflows',
              'For coordinators and managers who need joined-up visibility across scheduling, care planning, eMAR, and records',
              'For agency owners who want a platform that feels practical to trial, evaluate, and roll out',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-[#4370B7] flex-shrink-0 mt-0.5" />
                <span className="text-[#374151]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="comparison-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="comparison-heading" className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              A practical comparison angle for agencies evaluating options
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              This page is not about attacking another platform. It is about showing where DomiClear may offer the kind
              of affordability, usability, and operational clarity some agencies are actively looking for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: CurrencyPoundIcon,
                title: 'More affordable starting point',
                text: 'A practical option for teams that want a lower cost of entry when comparing care software options.',
              },
              {
                icon: DevicePhoneMobileIcon,
                title: 'Modern, clearer UX',
                text: 'Help carers and office teams work with software that feels easier to learn and use day to day.',
              },
              {
                icon: ArrowsRightLeftIcon,
                title: 'Joined-up workflows',
                text: 'Bring scheduling, care planning, medication visibility, and records into one connected operating rhythm.',
              },
              {
                icon: EyeIcon,
                title: 'Operational visibility',
                text: 'Give coordinators and managers a clearer view of what is happening across the day without chasing updates.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-[#F8FAFC] rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
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

      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="visual-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 id="visual-heading" className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              See the product experience teams are actually evaluating
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              For agencies looking for a Birdie alternative, the day-to-day product experience matters just as much as
              the headline feature list.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden shadow-lg bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                <div className="p-4 flex items-center justify-center bg-[#FAFBFC]">
                  <img
                    src="/demo-media/Mobile-white.png"
                    alt="DomiClear mobile care software experience"
                    className="max-w-full h-auto object-contain max-h-80"
                  />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <img
                    src="/demo-media/Desktop-white.png"
                    alt="DomiClear web platform for coordinators and managers"
                    className="max-w-full h-auto object-contain max-h-72"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] p-6">
              <p className="text-[#0F172A] font-semibold mb-2">Explore related workflows</p>
              <p className="text-[#4B5563] mb-4">
                Comparing options often means looking at the workflows behind the headline comparison term.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <a href="/" className="text-[#4370B7] font-semibold hover:underline">
                  Homepage
                </a>
                <a href="/platform" className="text-[#4370B7] font-semibold hover:underline">
                  Platform
                </a>
                <a href="/home-care-app" className="text-[#4370B7] font-semibold hover:underline">
                  Home care app
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
              Why agencies switch from older or more rigid systems
            </h2>
            <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
              When software feels heavy, unclear, or difficult to roll out, teams often fall back to extra admin and
              workarounds. DomiClear is designed as a more practical daily operating option.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                before: 'Before: Pricing or setup feels hard to justify at the stage your agency is in',
                after: 'After: A lower cost of entry that may make evaluation and rollout easier to approach',
              },
              {
                before: 'Before: Users need too much training to stay confident in the workflow',
                after: 'After: A clearer product experience for carers, coordinators, and managers',
              },
              {
                before: 'Before: Key workflows live in separate places and create more handover friction',
                after: 'After: More joined-up operations across visits, records, planning, and medication visibility',
              },
              {
                before: 'Before: Managers rebuild the day from fragmented updates',
                after: 'After: Better operational visibility without constant chasing',
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
            Start a free trial if you want to evaluate the fit properly
          </h2>
          <p className="text-lg text-[#4B5563] mb-10">
            For agencies looking for a Birdie alternative, the clearest next step is to see how DomiClear feels in
            practice and whether the workflow fits your team.
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
          <FAQAccordion items={birdieAlternativeFaqItems} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#1a86f0] to-[#7c6df0] text-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to compare DomiClear with a clearer view of fit and cost?
          </h2>
          <p className="text-lg text-white/90 mb-10">
            DomiClear keeps the comparison grounded in what many agencies actually care about: affordability, clearer UX,
            practical workflows, and a straightforward way to evaluate the platform.
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
