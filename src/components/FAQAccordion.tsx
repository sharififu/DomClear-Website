import React, { useState } from 'react';
import { Disclosure, DisclosureGroup } from '@heroui/react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  return (
    <DisclosureGroup
      className="space-y-4"
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
      allowsMultipleExpanded={false}
    >
      {items.map((item, index) => (
        <Disclosure
          key={index}
          id={String(index)}
          className="bg-white rounded-2xl border border-[rgba(20,30,60,0.08)] overflow-hidden"
        >
          <Disclosure.Heading>
            <Disclosure.Trigger className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAFBFC] transition-colors font-semibold text-[#0F172A]">
              {item.question}
              <Disclosure.Indicator className="w-5 h-5 text-[#4B5563] flex-shrink-0 transition-transform duration-300" />
            </Disclosure.Trigger>
          </Disclosure.Heading>
          <Disclosure.Content>
            <Disclosure.Body className="px-6 pb-5 text-[#4B5563] leading-relaxed border-t border-[rgba(20,30,60,0.05)] pt-4">
              {item.answer}
            </Disclosure.Body>
          </Disclosure.Content>
        </Disclosure>
      ))}
    </DisclosureGroup>
  );
};
