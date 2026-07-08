import React, { useEffect } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { trackEvent } from '@/src/lib/analytics';

const faqData = [
  {
    question: "How much does it cost to fence 40 acres?",
    answer: "A perfectly square 40-acre parcel has a perimeter of 5,280 feet (1 mile). Using standard 5-strand barbed wire on flat terrain, expect materials to cost between $3,500 and $5,000, with labor adding another $8,000 to $15,000 depending on your region. Total costs typically range from $11,500 to $20,000."
  },
  {
    question: "What is the cheapest fence for cattle?",
    answer: "A 4-to-5 strand barbed wire fence is traditionally the most cost-effective permanent fencing for cattle. However, if you have access to power, a high-tensile electric fence (2 to 3 strands) can be significantly cheaper in both material and labor, though it requires more maintenance to prevent shorts."
  },
  {
    question: "How much fence wire do I need for X acres?",
    answer: "First, you must know the perimeter. A square 10-acre parcel has a perimeter of about 2,640 feet, while a long, rectangular 10-acre parcel might have a 3,000+ foot perimeter. Once you have the perimeter, multiply by the number of strands you plan to use, then divide by the roll length (usually 1,320 feet for barbed wire)."
  },
  {
    question: "Is high tensile wire cheaper than barbed wire?",
    answer: "Yes, high-tensile smooth wire is generally cheaper per foot than barbed wire, and because it can be stretched tighter, you can often space posts further apart (up to 30 feet in flat terrain vs. 12-15 feet for barbed wire), which significantly reduces post and labor costs."
  },
  {
    question: "How many fence posts do I need?",
    answer: "Divide your total perimeter by your planned post spacing (typically 10-15 feet for standard woven/barbed wire). Then add heavy-duty corner posts for every change in direction, and two gate posts for every gate you plan to install."
  }
];

export default function FAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const handleToggle = (question: string) => {
    trackEvent('faq_expanded', { question });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 animate-in fade-in duration-500">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-display font-bold text-fence-iron tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-fence-iron/60 text-lg max-w-2xl mx-auto">
          Common questions about agricultural fencing costs, materials, and best practices.
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-white border border-fence-iron/20 rounded-lg open:shadow-sm"
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) {
                handleToggle(faq.question);
              }
            }}
          >
            <summary className="font-semibold text-fence-iron p-6 cursor-pointer select-none list-none flex justify-between items-center group-open:border-b group-open:border-fence-iron/10">
              {faq.question}
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-6 text-fence-iron/80 leading-relaxed text-sm">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
