import React from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';

export default function FAQ() {
  const faqs = [
    {
      q: "Why is the acreage estimate lower than my actual fence line?",
      a: "The acreage calculator assumes your land is a perfect square. Any deviation from a perfect square—such as a rectangle, irregular shape, or uneven terrain—will result in a longer actual perimeter."
    },
    {
      q: "How many strands of wire do I need?",
      a: "This depends entirely on the livestock. Standard cattle fences use 4 to 5 strands of barbed wire. Sheep and goats typically require woven wire (netting) or highly spaced electric strands. Check local agricultural extension guidelines for your specific needs."
    },
    {
      q: "Does the cost estimate include concrete or fasteners?",
      a: "No. The cost estimator covers the primary bulk materials: posts and wire. You will need to budget separately for staples, clips, concrete for corner/gate posts, and bracing wire."
    },
    {
      q: "What is an 'effective run'?",
      a: "The effective run is the length of the fence line that actually requires wire. We calculate this by subtracting the total width of all your gates from the total boundary perimeter."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600 text-sm">{faq.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
