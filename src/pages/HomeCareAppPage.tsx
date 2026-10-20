import React from 'react';
import {
  ArrowRightIcon,
  CameraIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  MicrophoneIcon,
  ShieldCheckIcon,
  SignalIcon,
  WifiIcon,
} from '@heroicons/react/24/outline';

const phoneMockup = '/demo-media/care-app-figma-phone.png';
const mapOfflineMockup = '/demo-media/care-app-figma-map-offline.png';
const dashboardMockup = '/demo-media/care-app-figma-dashboard.png';
const careAppDemoVideo = '/demo-media/careapp-demo.mp4';

const featureCards = [
  {
    icon: ClockIcon,
    title: 'Clear Daily Schedules',
    text: 'See exactly where to go, when to be there, and who needs care. Real-time updates mean no more calling the office.',
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Step-by-Step Tasks',
    text: 'Mandatory and optional tasks clearly laid out. Ensure care plans are followed perfectly every single visit.',
  },
  {
    icon: MicrophoneIcon,
    title: 'Voice-to-Text Notes',
    text: 'Dictate detailed care notes instantly. Our intelligent system captures tone and details without typing.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Safe eMAR Logging',
    text: 'Clear prompts for PRN and scheduled meds. Prevent errors before they happen with built-in safety alerts.',
  },
  {
    icon: CameraIcon,
    title: 'Secure Photo Capture',
    text: 'Snap photos of wounds or household hazards securely within the app. Nothing saves to the personal camera roll.',
  },
  {
    icon: MapPinIcon,
    title: 'GPS Clock In/Out',
    text: 'Automatic geofencing ensures accurate visit times. Protects carers and provides transparency for families.',
  },
];

const pocketBenefits = [
  {
    icon: ClipboardDocumentCheckIcon,
    title: 'Clear Daily Schedules',
    text: 'See exactly where to go, when to be there, and who needs care. Real-time updates mean no more calling the office.',
  },
  {
    icon: MapPinIcon,
    title: 'GPS Clock In/Out',
    text: 'Automatic geofencing ensures accurate visit times. Protects carers and provides transparency for families.',
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Interactive Body Maps',
    text: 'Visually track and update physical conditions and wound care directly on the app.',
  },
];

const managerBullets = [
  'See instantly when visits start, run late, or are completed.',
  'Receive immediate alerts for missed medications or urgent notes.',
  'Ensure full compliance with automatic audit trails for CQC inspections.',
];

export const HomeCareAppPage: React.FC = () => {
  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30]">
      <section className="relative overflow-hidden pt-32 pb-20 lg:pb-28">
        <div className="absolute inset-0 bg-[linear-gradient(147deg,#dce9ff_0%,#f8f9ff_52%,#f8f9ff_100%)]" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#004ac6]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#006686]/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d3e4fe] bg-[#e5eeff] px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#434655] shadow-sm">
              <SignalIcon className="h-4 w-4 text-[#2563eb]" />
              Built for all care providers
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-[-0.02em] text-[#0b1c30] sm:text-5xl lg:text-[48px] lg:leading-[1.15]">
              The Home Care App That Cares!
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-base leading-8 text-[#434655] sm:text-lg lg:mx-0">
              Give your care team a mobile tool they&apos;ll actually love using. DomiClear streamlines schedules,
              tasks, and eMAR so carers can focus on what matters: the person in front of them.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="/tutorials"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#004ac6] to-[#003ea8] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/20 transition-transform hover:-translate-y-0.5"
              >
                Tutorial videos
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c3c6d7] bg-[#f8f9ff] px-8 py-3 text-sm font-semibold text-[#0b1c30] shadow-sm transition-colors hover:bg-white"
              >
                View Carer Testimonials
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[520px] w-full max-w-[520px] lg:h-[600px]">
            <div className="absolute left-0 top-20 z-20 hidden items-center gap-3 rounded-lg border border-[#e5eeff] bg-white p-3 shadow-[0_12px_32px_-8px_rgba(37,99,235,0.18)] sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d1fae5]">
                <CheckCircleIcon className="h-4 w-4 text-[#16a34a]" />
              </span>
              <span>
                <span className="block text-sm text-[#0b1c30]">Visit Completed</span>
                <span className="block text-[11px] text-[#434655]">Arthur P. - 09:48 AM</span>
              </span>
            </div>

            <div className="absolute right-0 top-72 z-20 hidden items-center gap-3 rounded-lg border border-[#e5eeff] bg-white p-3 shadow-[0_12px_32px_-8px_rgba(37,99,235,0.18)] sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef3c7]">
                <ShieldCheckIcon className="h-4 w-4 text-[#d97706]" />
              </span>
              <span>
                <span className="block text-sm text-[#0b1c30]">Medication Reviewed</span>
                <span className="block text-[11px] text-[#434655]">Signed by Mary</span>
              </span>
            </div>

            <div className="absolute left-1/2 top-0 h-full w-[300px] -translate-x-1/2 rounded-[40px] border-8 border-[#dce9ff] bg-white px-5 py-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:w-[324px]">
              <img
                src={phoneMockup}
                alt="DomiClear home care app visit screen"
                className="h-full w-full rounded-[28px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="pocket-heading">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 mx-auto w-full max-w-[620px] lg:order-1">
            <video
              className="block h-auto w-full rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)]"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="DomiClear care app demo video"
            >
              <source src={careAppDemoVideo} type="video/mp4" />
            </video>
          </div>

          <div className="order-1 lg:order-2">
            <h2 id="pocket-heading" className="mb-6 max-w-lg text-4xl font-bold leading-tight tracking-[-0.01em] text-[#0b1c30]">
              Everything a carer needs in their pocket
            </h2>
            <p className="mb-10 max-w-xl text-lg leading-8 text-[#444653]">
              Everything a carer needs to know, right in their hand. Immediate access to critical information ensures
              confident, easy, swift personalised care.
            </p>

            <div className="space-y-8">
              {pocketBenefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e5eeff] text-[#004ac6]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-bold tracking-[0.04em] text-[#0b1c30]">{item.title}</h3>
                      <p className="max-w-lg text-base leading-6 text-[#434655]">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9ff] py-20 lg:py-24" aria-labelledby="secure-heading">
        <div className="mx-auto grid max-w-[1050px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 id="secure-heading" className="mb-6 max-w-md text-4xl font-bold leading-tight tracking-[-0.01em] text-[#004ac6]">
              Secure, reliable, always connected
            </h2>
            <p className="mb-10 max-w-xl text-lg leading-8 text-[#434655]">
              Built for the realities of field work. Ensures safety for carers and uninterrupted service delivery
              regardless of connectivity.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#e5eeff] bg-white p-6 shadow-[0_4px_18px_-10px_rgba(37,99,235,0.35)]">
                <MapPinIcon className="mb-4 h-7 w-7 text-[#2563eb]" />
                <h3 className="mb-2 text-sm font-semibold text-[#0b1c30]">GPS Verification</h3>
                <p className="text-sm leading-6 text-[#434655]">
                  Automated check-ins safeguard carer location and verify visit compliance.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5eeff] bg-white p-6 shadow-[0_4px_18px_-10px_rgba(37,99,235,0.35)]">
                <WifiIcon className="mb-4 h-7 w-7 text-[#2563eb]" />
                <h3 className="mb-2 text-sm font-semibold text-[#0b1c30]">Robust Offline Mode</h3>
                <p className="text-sm leading-6 text-[#434655]">
                  Full access to care plans and note-taking even in zero-signal areas. Syncs automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[520px] w-full max-w-[500px] items-center justify-center">
            <div className="absolute h-[390px] w-[390px] rounded-[64px] bg-[#dce9ff]/70 rotate-12" />
            <div className="relative h-[560px] w-[280px] overflow-hidden rounded-[32px] border-4 border-[#f9f9fc] bg-white shadow-[0_15px_40px_rgba(3,52,165,0.15)]">
              <img
                src={mapOfflineMockup}
                alt="DomiClear map and offline mode"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24" aria-labelledby="manager-heading">
        <div className="mx-auto max-w-[1232px] px-6">
          <div className="grid grid-cols-1 items-center gap-12 rounded-3xl border border-[#e5eeff] bg-[#f8f9ff] p-6 shadow-[0_12px_32px_-8px_rgba(37,99,235,0.12)] md:p-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#004ac6]">For managers</p>
              <h2 id="manager-heading" className="mb-6 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.01em] text-[#0b1c30] sm:text-4xl">
                CQC compliance software MANAGEMENT
              </h2>
              <p className="mb-8 max-w-xl text-lg leading-8 text-[#444653]">
                When a carer reports a fall, medication error or safeguarding concern, DomiClear doesn&apos;t just file
                it. Every incident lands on the client&apos;s chronological care timeline and instantly generates the
                follow-up actions your inspectors expect to see.
              </p>

              <ul className="space-y-4">
                {managerBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-base leading-6 text-[#434655]">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#004ac6]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[514px]">
              <div className="overflow-hidden rounded-xl border border-[#e5eeff] bg-white shadow-lg">
                <img
                  src={dashboardMockup}
                  alt="DomiClear dashboard showing care data"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 left-4 flex items-center gap-4 rounded-xl border border-[#e5eeff] bg-white p-4 shadow-[0_4px_24px_-4px_rgba(37,99,235,0.18)] sm:-left-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
                  <CheckCircleIcon className="h-5 w-5 text-[#16a34a]" />
                </span>
                <span>
                  <span className="block text-xl font-semibold leading-none text-[#0b1c30]">100%</span>
                  <span className="block text-[10px] uppercase tracking-wide text-[#434655]">Compliance tracked</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[#dce9ff] bg-[#f8f9ff] py-20 lg:py-24" aria-labelledby="features-heading">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 id="features-heading" className="mb-16 text-center text-3xl font-semibold tracking-[-0.01em] text-[#0b1c30]">
            Everything a carer needs in their pocket
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#2563eb] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-normal text-[#0b1c30]">{item.title}</h3>
                  <p className="text-base leading-6 text-[#434655]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
