import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAFBFC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a86f0] focus:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span id={`faq-question-${index}`} className="font-semibold text-[#0F172A] pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#4B5563] flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          {openIndex === index && (
            <div 
              id={`faq-answer-${index}`}
              className="px-6 pb-5 text-[#4B5563] leading-relaxed border-t border-[rgba(20,30,60,0.05)] pt-4"
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
