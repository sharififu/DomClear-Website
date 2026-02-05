import React from 'react';

const LEGAL_SLUGS = ['terms', 'privacy', 'cookies', 'acceptable-use', 'service-level'] as const;

type LegalSlug = (typeof LEGAL_SLUGS)[number];

function isLegalSlug(s: string): s is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(s);
}

interface LegalPageProps {
  /** e.g. 'terms' or null for hub */
  slug: string | null;
}

export const LegalPage: React.FC<LegalPageProps> = ({ slug }) => {
  const isHub = !slug;
  const isValidDoc = slug && isLegalSlug(slug);

  if (slug && !isValidDoc) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Document not found</h1>
          <p className="text-[#4B5563] mb-8">The legal document you requested does not exist.</p>
          <a
            href="/legal"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1a86f0] text-white font-semibold rounded-full hover:bg-[#1570d1] transition-colors"
          >
            View all legal documents
          </a>
        </div>
      </div>
    );
  }

  const iframeSrc = isHub ? '/legal/index.html' : `/legal/${slug}.html`;

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col">
      <iframe
        title={isHub ? 'Legal & compliance' : `${slug} – DomiClear`}
        src={iframeSrc}
        className="flex-1 w-full border-0 min-h-[calc(100vh-8rem)]"
      />
    </div>
  );
};
