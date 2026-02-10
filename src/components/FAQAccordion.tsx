import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAFBFC] transition-colors font-semibold text-[#0F172A]"
              aria-expanded={isExpanded}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <ChevronDownIcon
                className={`w-5 h-5 text-[#4B5563] flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}
            >
              <div className="px-6 pb-5 text-[#4B5563] leading-relaxed border-t border-[rgba(20,30,60,0.05)] pt-4">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
