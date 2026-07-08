import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/src/lib/analytics';

export default function FenceTypesGuide() {
  const types = [
    {
      name: 'Barbed Wire',
      description: 'The standard for cattle fencing. Typically 4 to 6 strands.',
      spacing: '12-16 ft',
      cost: 'Low',
      bestFor: 'Cattle, large pasture perimeters',
    },
    {
      name: 'High-Tensile (Smooth)',
      description: 'Requires less maintenance and fewer posts than traditional barbed wire because of high tension.',
      spacing: '20-50 ft (depending on terrain)',
      cost: 'Low',
      bestFor: 'Cattle, sheep (with many strands)',
    },
    {
      name: 'Electric Fence',
      description: 'A psychological barrier rather than a physical one. Very cheap to run over long distances.',
      spacing: '30-60 ft',
      cost: 'Very Low',
      bestFor: 'Rotational grazing, predator control',
    },
    {
      name: 'Woven Wire (Field Fence)',
      description: 'Provides a solid physical barrier. Often topped with a strand of barbed wire to prevent leaning.',
      spacing: '10-12 ft',
      cost: 'High',
      bestFor: 'Sheep, goats, hogs, perimeter security',
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-display font-bold text-fence-iron tracking-tight mb-4">Fencing Guide & Formulas</h1>
        <p className="text-fence-iron/60 text-lg max-w-2xl mx-auto">
          Understand different fence types, how we calculate materials, and a real-world cost example.
        </p>
      </div>

      <div className="grid gap-6 mb-12">
        {types.map((type, i) => (
          <Card key={i}>
            <CardHeader className="pb-3 border-b border-fence-iron/10">
              <CardTitle className="text-xl font-display">{type.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-fence-iron/80 mb-4">{type.description}</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block text-fence-iron/50 font-bold uppercase tracking-wider text-xs mb-1">Typical Post Spacing</span>
                  <span className="text-fence-iron font-medium">{type.spacing}</span>
                </div>
                <div>
                  <span className="block text-fence-iron/50 font-bold uppercase tracking-wider text-xs mb-1">Relative Cost</span>
                  <span className="text-fence-iron font-medium">{type.cost}</span>
                </div>
                <div>
                  <span className="block text-fence-iron/50 font-bold uppercase tracking-wider text-xs mb-1">Best For</span>
                  <span className="text-fence-iron font-medium">{type.bestFor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white border border-fence-iron/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-display font-bold text-fence-iron mb-4">The Math (Formulas)</h2>
          <div className="space-y-4 text-sm text-fence-iron/80 font-mono bg-pasture-cream p-4 rounded-md border border-fence-iron/10">
            <p className="border-b border-fence-iron/10 pb-2">
              <span className="text-fence-iron font-bold">Square Perimeter:</span><br/>
              P = 4 × √(Acreage × 43,560)
            </p>
            <p className="border-b border-fence-iron/10 pb-2">
              <span className="text-fence-iron font-bold">Effective Run:</span><br/>
              Run = Total Perimeter - (Gates × Gate Width)
            </p>
            <p className="border-b border-fence-iron/10 pb-2">
              <span className="text-fence-iron font-bold">Line Posts:</span><br/>
              Posts = Math.ceil(Run / Post Spacing)
            </p>
            <p className="border-b border-fence-iron/10 pb-2">
              <span className="text-fence-iron font-bold">H-Brace Hardware:</span><br/>
              Hardware Sets = (Corners × 2) + (Gates × 2)
            </p>
            <p>
              <span className="text-fence-iron font-bold">Wire Rolls:</span><br/>
              Rolls = Math.ceil((Run × Strands) / Roll Length)
            </p>
          </div>
        </section>

        <section className="bg-fence-iron text-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Worked Example: 40 Acres</h2>
          <div className="space-y-4 text-sm text-white/80">
            <p><strong>Scenario:</strong> 40-acre square parcel, Barbed wire (5 strands), Hilly terrain, 2 gates (12ft each).</p>
            <ul className="list-disc pl-5 space-y-2 font-mono">
              <li>Perimeter: ~5,280 ft</li>
              <li>Effective Run: 5,280 - (2 × 12) = 5,256 ft</li>
              <li>Line Posts (12ft spacing): 438 posts</li>
              <li>H-Braces (4 corners + 2 gates): 12 hardware sets</li>
              <li>Wire (5 strands / 1320ft rolls): 20 rolls</li>
            </ul>
            <div className="pt-4 mt-4 border-t border-white/20">
              <p><strong>Cost Breakdown:</strong></p>
              <ul className="space-y-1 font-mono mt-2 text-white/90">
                <li>Posts ($7.50 ea): $3,285</li>
                <li>Wire ($85/roll): $1,700</li>
                <li>H-Brace Hardware ($150 ea): $1,800</li>
                <li className="text-barbed-amber">Materials Total: $6,785</li>
                <li>Labor (5280ft @ $2.50 + 25% hilly): $16,500</li>
                <li className="font-bold text-lg text-barbed-amber mt-2">Grand Total: $23,285</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center">
        <Link 
          to="/cost" 
          onClick={() => trackEvent('guide_to_calculator_click')}
          className="inline-flex items-center justify-center rounded-md bg-barbed-amber text-fence-iron px-8 py-3 text-lg font-display font-bold shadow-sm hover:bg-barbed-amber/90 transition-colors"
        >
          Try the Calculator
        </Link>
      </div>
    </div>
  );
}
