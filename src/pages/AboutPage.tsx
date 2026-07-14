import React from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../components/Button';
import { EXTERNAL_SIGNUP_URL } from '../constants/links';

const missionPrinciples = [
  {
    icon: UserGroupIcon,
    title: 'Powerful enough to grow with you',
    description: 'Build strong systems from the beginning without replacing your platform as your service expands.',
  },
  {
    icon: SparklesIcon,
    title: 'Simple enough for everyday care',
    description: 'Give carers and managers a clear experience that supports their work instead of slowing it down.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Structured around quality',
    description: 'Help managers identify concerns, review evidence, follow up actions and maintain oversight.',
  },
];

const followUpActions = [
  'Manager review and sign-off',
  'Updated risk assessments or care plans',
  'Communication with relatives or professionals',
  'Additional staff guidance and monitoring',
  'Evidence that every required action was completed',
];

const enterpriseCapabilities = [
  {
    title: 'One connected care record',
    description: 'Bring care plans, notes, visits, medication, incidents, risks, audits and communications together.',
  },
  {
    title: 'Clear management oversight',
    description: 'See outstanding reviews, approvals, concerns and follow-up actions before they are forgotten.',
  },
  {
    title: 'Compliance in everyday work',
    description: 'Build evidence through normal care delivery instead of preparing everything shortly before inspection.',
  },
  {
    title: 'Reliable accountability',
    description: 'Record what happened, which decisions were made, who approved them and what happened next.',
  },
  {
    title: 'Technology people can use',
    description: 'Give carers and managers practical tools designed around their real responsibilities.',
  },
];

const providerTypes = [
  'New care agencies establishing strong systems from the beginning',
  'Independent providers moving away from paperwork and spreadsheets',
  'Growing agencies that need better management oversight',
  'Multi-branch services that need consistent standards',
  'Teams dissatisfied with expensive or fragmented care software',
];

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-[#0F172A]">
      <section className="relative flex min-h-[620px] items-center overflow-hidden text-white">
        <img
          src="/demo-media/women on Domiclear app.png"
          alt="Care professional using the DomiClear mobile app"
          className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,43,0.94)_0%,rgba(7,24,43,0.82)_48%,rgba(7,24,43,0.28)_100%)]" />

        <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-10 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase text-[#7dd3fc] sm:mb-5">About DomiClear</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:mb-6 sm:text-5xl lg:text-6xl">
              Powerful care technology should be accessible to every provider
            </h1>
            <p className="mb-6 max-w-2xl text-base leading-7 text-white/90 sm:mb-8 sm:text-lg sm:leading-8">
              DomiClear is building enterprise-grade home care software for small, growing and ambitious UK providers.
              Connect staff, visits, care plans, eMAR, compliance and finances without traditional enterprise cost or
              complexity.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button
                variant="accent"
                size="lg"
                href={EXTERNAL_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                analyticsEvent="subscription_cta"
                analyticsProperties={{ source: 'about_hero' }}
              >
                Start free trial
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/book-demo"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                analyticsEvent="demo_request"
                analyticsProperties={{ source: 'about_hero' }}
              >
                Book a demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/75 sm:mt-5">
              Built for UK home care teams, with CQC-ready workflows for services in England.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(20,30,60,0.08)] bg-white py-20 lg:py-24" aria-labelledby="experience-heading">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#4370B7]">Built from experience, not assumptions</p>
            <h2 id="experience-heading" className="text-3xl font-bold leading-tight sm:text-4xl">
              We understand the realities of home care
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#4B5563]">
            <p>DomiClear was founded by people who have worked in care as both managers and frontline care staff.</p>
            <p>
              We understand the responsibility managers carry every day: coordinating visits, supporting staff,
              reviewing care records, responding to incidents and maintaining clear evidence of safe, high-quality care.
            </p>
            <p>
              That experience shaped the platform we wanted to use: powerful enough for a complex care service, but
              straightforward and affordable enough for a growing independent provider.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase text-[#4370B7]">Our mission</p>
            <h2 id="mission-heading" className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">
              Make outstanding care management accessible
            </h2>
            <p className="text-lg leading-8 text-[#4B5563]">
              Providers of every size deserve the structure, visibility and operational control of enterprise systems
              in a platform their teams can realistically afford and use.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {missionPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title} className="rounded-lg border border-[rgba(20,30,60,0.08)] bg-[#F7F9FC] p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#4370B7]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{principle.title}</h3>
                  <p className="leading-7 text-[#4B5563]">{principle.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(20,30,60,0.08)] bg-[#F7F9FC] py-20 lg:py-24" aria-labelledby="action-heading">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#0A8F7A]">More than digital paperwork</p>
            <h2 id="action-heading" className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">
              Care records should lead to action
            </h2>
            <p className="mb-7 text-lg leading-8 text-[#4B5563]">
              When an incident is reported, it should not remain an isolated form. DomiClear is being built to connect
              the record with the reviews, decisions and follow-up work it requires.
            </p>
            <ul className="space-y-3">
              {followUpActions.map((action) => (
                <li key={action} className="flex gap-3 leading-7 text-[#374151]">
                  <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#0A8F7A]" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure>
            <div className="overflow-hidden rounded-lg border border-[rgba(20,30,60,0.08)] bg-white shadow-[0_20px_45px_-28px_rgba(15,23,42,0.45)]">
              <img
                src="/demo-media/demo-incident-management.png"
                alt="DomiClear incident management view connecting a care concern with follow-up actions"
                className="aspect-[16/10] w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 text-sm leading-6 text-[#64748B]">
              A clear chronology helps managers see what happened, who took responsibility and whether every action was completed.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="enterprise-heading">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase text-[#4370B7]">What enterprise-grade means to us</p>
            <h2 id="enterprise-heading" className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">
              Strong systems without unnecessary complexity
            </h2>
            <p className="text-lg leading-8 text-[#4B5563]">
              Enterprise-grade should describe the quality of the system, not the size of the bill or the training manual.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {enterpriseCapabilities.map((capability) => (
              <article key={capability.title} className="flex gap-4 border-t border-[#E5E7EB] py-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#4370B7]">
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold">{capability.title}</h3>
                  <p className="leading-7 text-[#4B5563]">{capability.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-20 text-white lg:py-24" aria-labelledby="providers-heading">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#7dd3fc]">Who we are building for</p>
            <h2 id="providers-heading" className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">
              Providers serious about safe, organised, high-quality care
            </h2>
            <p className="text-lg leading-8 text-white/75">
              You should not need hundreds of employees to access technology that supports excellent care.
            </p>
          </div>
          <ul className="space-y-4">
            {providerTypes.map((provider) => (
              <li key={provider} className="flex gap-3 border-b border-white/10 pb-4 text-base leading-7 text-white/85">
                <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#5EEAD4]" />
                <span>{provider}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="vision-heading">
        <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8FAF6] text-[#0A8F7A]">
            <EyeIcon className="h-7 w-7" />
          </div>
          <p className="mb-3 text-xs font-bold uppercase text-[#0A8F7A]">Our vision</p>
          <h2 id="vision-heading" className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">
            Better systems. Stronger providers. Higher standards of care.
          </h2>
          <p className="text-lg leading-8 text-[#4B5563]">
            We want every provider, regardless of its current size, to have the tools to operate safely, learn from
            concerns and continuously improve. The goal is not simply to complete more tasks. It is to build services
            that are well managed, inspection-ready and trusted by the people receiving care, their families and staff.
          </p>
        </div>
      </section>

      <section className="border-t border-[rgba(20,30,60,0.08)] bg-[#F7F9FC] py-16 lg:py-20" aria-labelledby="about-cta-heading">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#4370B7]">Build on a stronger foundation</p>
            <h2 id="about-cta-heading" className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">
              See how DomiClear can support your next stage of growth
            </h2>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-[#4B5563]">
              Reduce administration, improve oversight and maintain higher standards as your service grows.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Button
                variant="accent"
                size="lg"
                href={EXTERNAL_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                analyticsEvent="subscription_cta"
                analyticsProperties={{ source: 'about_cta' }}
              >
                Start free trial
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/book-demo"
                className="border-[#0F172A]/20 text-[#0F172A] hover:bg-[#0F172A]/5"
                analyticsEvent="demo_request"
                analyticsProperties={{ source: 'about_cta' }}
              >
                Book a demo
              </Button>
            </div>
            <p className="mt-5 text-sm text-[#64748B]">No card required · UK support · Cancel anytime</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/demo-media/domiclearappshowcase.png"
              alt="DomiClear care management platform shown on desktop and mobile"
              className="h-auto w-full max-w-[460px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
