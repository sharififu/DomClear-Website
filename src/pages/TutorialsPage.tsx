import { useState } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/Button';

const tutorials = [
  { id: 'ayRpnggt9nY', category: 'Carer App', title: 'How to complete a care visit', description: 'Follow a carer through reviewing About Me and communication needs, recording planned personal care and vital checks, documenting declined care, and finishing a visit.' },
  { id: 'Vqp9kEvjPwg', category: 'Scheduling', title: 'How to schedule a visit', description: 'Follow this step-by-step tutorial to schedule a visit in DomiClear.' },
  { id: 'jJHYBeMx54A', category: 'Medication', title: 'Managing the medication library', description: 'Learn how to manage the medication library in DomiClear.' },
  { id: 'c3HPYNEt8DM', category: 'Medication', title: 'PRN medication and MAR', description: 'Explore PRN medication and medication administration records (MAR) in DomiClear.' },
  { id: 'Gt4dtcCTSN4', category: 'Medication', title: 'Adding a medication schedule', description: 'Learn how to add a medication schedule in DomiClear.' },
];
const categories = ['All topics', ...new Set(tutorials.map((tutorial) => tutorial.category))];

export const TutorialsPage = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All topics');
  const [limit, setLimit] = useState(12);
  const filtered = tutorials.filter((tutorial) =>
    (category === 'All topics' || tutorial.category === category) &&
    `${tutorial.title} ${tutorial.description} ${tutorial.category}`.toLowerCase().includes(query.trim().toLowerCase())
  );
  const resetPlayback = () => { setActiveVideo(null); setLimit(12); };

  return (
  <div className="min-h-screen bg-[#FAFBFC] pb-20 pt-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#4370B7]">Learn DomiClear</p>
        <h1 className="mb-5 text-4xl font-bold text-[#0F172A] sm:text-5xl">Tutorial library</h1>
        <p className="mx-auto max-w-2xl text-lg leading-8 text-[#4B5563]">
          Step-by-step guidance for your care team, at your own pace.
        </p>
      </header>
      <section aria-label="Find a tutorial" className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <label htmlFor="tutorial-search" className="mb-2 block font-semibold text-[#0F172A]">Search tutorials</label>
        <input id="tutorial-search" type="search" value={query} placeholder="Search by task or keyword…"
          onChange={(event) => { setQuery(event.target.value); resetPlayback(); }}
          className="min-h-12 w-full max-w-xl rounded-xl border border-slate-300 px-4 py-3 text-[#0F172A] focus:outline focus:outline-2 focus:outline-[#4370B7]" />
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {categories.map((topic) => (
            <button key={topic} type="button" aria-pressed={category === topic}
              onClick={() => { setCategory(topic); resetPlayback(); }}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold ${category === topic ? 'border-[#4370B7] bg-[#4370B7] text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
              {topic}
            </button>
          ))}
        </div>
      </section>
      <p role="status" className="mb-5 text-sm text-slate-500">{filtered.length} {filtered.length === 1 ? 'tutorial' : 'tutorials'} found</p>
      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filtered.slice(0, limit).map((tutorial) => (
      <section key={tutorial.id} id={tutorial.id === 'ayRpnggt9nY' ? 'carer-mobile-completing-visit' : undefined} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-labelledby={`tutorial-${tutorial.id}-title`}>
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
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <span className="relative flex items-center gap-3 rounded-full bg-[#0F172A]/90 px-6 py-3 font-semibold text-white shadow-lg transition-colors group-hover:bg-[#4370B7]">
                <PlayCircleIcon className="h-10 w-10" aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
        <div className="p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#4370B7]">{tutorial.category}</p>
          <h2 id={`tutorial-${tutorial.id}-title`} className="mb-3 text-xl font-bold text-[#0F172A]">{tutorial.title}</h2>
          <p className="mb-5 text-sm leading-6 text-[#4B5563]">{tutorial.description}</p>
          {activeVideo === tutorial.id && <button type="button" onClick={() => setActiveVideo(null)} className="mb-4 block min-h-11 font-semibold text-[#4370B7] underline">Close video</button>}
          <a href={`https://www.youtube.com/watch?v=${tutorial.id}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#4370B7] underline underline-offset-4">
            Watch on YouTube (opens in a new tab)
          </a>
        </div>
      </section>
      ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h2 className="mb-3 text-xl font-bold text-[#0F172A]">No tutorials found</h2>
          <p className="mb-4 text-slate-600">Try another keyword or browse all topics.</p>
          <button type="button" onClick={() => { setQuery(''); setCategory('All topics'); resetPlayback(); }} className="min-h-11 font-semibold text-[#4370B7] underline">Clear filters</button>
        </div>
      )}
      {filtered.length > limit && <div className="mt-8 text-center"><button type="button" onClick={() => setLimit((count) => count + 12)} className="min-h-12 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-[#4370B7]">Show more tutorials</button></div>}
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
