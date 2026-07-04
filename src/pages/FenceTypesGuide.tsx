import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';

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
      name: 'High-Tensile (Smooth or Electric)',
      description: 'Requires less maintenance and fewer posts than traditional barbed wire because of high tension. Can be electrified.',
      spacing: '20-50 ft (depending on terrain)',
      cost: 'Low to Medium',
      bestFor: 'Cattle, sheep, predator control (if electric)',
    },
    {
      name: 'Woven Wire (Netting)',
      description: 'Provides a solid physical barrier. Often topped with a strand of barbed wire to prevent leaning.',
      spacing: '10-12 ft',
      cost: 'High',
      bestFor: 'Sheep, goats, hogs, perimeter security',
    },
    {
      name: 'Board / Rail Fence',
      description: 'Highly visible and aesthetically pleasing. Usually wood or vinyl.',
      spacing: '8-10 ft',
      cost: 'Very High',
      bestFor: 'Horses, farm frontage, corrals',
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fence Types Guide</h1>
        <p className="text-slate-600 mt-2">A quick reference for common rural fencing materials and configurations.</p>
      </div>

      <div className="grid gap-6">
        {types.map((type, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">{type.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">{type.description}</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block text-slate-500 font-medium mb-1">Typical Post Spacing</span>
                  <span className="text-slate-900">{type.spacing}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-medium mb-1">Relative Cost</span>
                  <span className="text-slate-900">{type.cost}</span>
                </div>
                <div>
                  <span className="block text-slate-500 font-medium mb-1">Best For</span>
                  <span className="text-slate-900">{type.bestFor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
