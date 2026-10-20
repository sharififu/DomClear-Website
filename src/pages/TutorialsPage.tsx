import { useState } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button';

const tutorials = [
  { id: 'Vqp9kEvjPwg', title: 'How to schedule a visit', description: 'Follow this step-by-step tutorial to schedule a visit in DomiClear.' },
  { id: 'jJHYBeMx54A', title: 'Managing the medication library', description: 'Learn how to manage the medication library in DomiClear.' },
  { id: 'c3HPYNEt8DM', title: 'PRN medication and MAR', description: 'Explore PRN medication and medication administration records (MAR) in DomiClear.' },
  { id: 'Gt4dtcCTSN4', title: 'Adding a medication schedule', description: 'Learn how to add a medication schedule in DomiClear.' },
];

export const TutorialsPage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
  <div className="min-h-screen bg-[#FAFBFC] pb-20 pt-32">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#4370B7]">Learn DomiClear</p>
        <h1 className="mb-5 text-4xl font-bold text-[#0F172A] sm:text-5xl">Tutorial videos</h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-[#4B5563]">
          Step-by-step guidance for your care team, at your own pace.
        </p>
      </header>
      <div className="space-y-8">
      {tutorials.map((tutorial) => (
      <section key={tutorial.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby={`tutorial-${tutorial.id}-title`}>
        <div className="aspect-video bg-slate-900">
          {activeVideo === tutorial.id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${tutorial.id}?autoplay=1&rel=0`}
              title={`${tutorial.title} in DomiClear`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setActiveVideo(tutorial.id)}
              aria-label={`Play tutorial: ${tutorial.title} in DomiClear`}
              className="group relative flex h-full w-full items-center justify-center focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
            >
              <img
                src={`https://i.ytimg.com/vi/${tutorial.id}/hqdefault.jpg`}
                alt=""
                width="480"
                height="360"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <span className="relative flex items-center gap-3 rounded-full bg-[#0F172A]/90 px-6 py-3 font-semibold text-white shadow-lg transition-colors group-hover:bg-[#4370B7]">
                <PlayCircleIcon className="h-9 w-9" aria-hidden="true" />
                Watch tutorial
              </span>
            </button>
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h2 id={`tutorial-${tutorial.id}-title`} className="mb-3 text-2xl font-bold text-[#0F172A]">{tutorial.title}</h2>
          <p className="mb-5 leading-7 text-[#4B5563]">{tutorial.description}</p>
          <a href={`https://www.youtube.com/watch?v=${tutorial.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#4370B7] underline underline-offset-4">
            Watch on YouTube (opens in a new tab)
          </a>
        </div>
      </section>
      ))}
      </div>
      <section className="mt-10 text-center" aria-labelledby="walkthrough-title">
        <h2 id="walkthrough-title" className="mb-3 text-2xl font-bold text-[#0F172A]">Want a walkthrough for your team?</h2>
        <p className="mx-auto mb-6 max-w-xl leading-7 text-[#4B5563]">
          Book a personalised walkthrough to see DomiClear and ask questions about your team’s workflow.
        </p>
        <Button href="/book-demo" variant="primary" size="lg">Book a walkthrough</Button>
      </section>
    </div>
  </div>
  );
};
