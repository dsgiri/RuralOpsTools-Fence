import React from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';

export default function Assumptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Assumptions & Methodology</h1>
        <p className="text-slate-600 mt-2">How we calculate your estimates and what variables to watch out for.</p>
      </div>

      <Card>
        <CardContent className="prose prose-slate prose-sm max-w-none pt-6">
          <h3>The Mathematics of Acreage</h3>
          <p>
            When calculating fence length based purely on acreage, we assume the parcel is a perfect square. 
            A square yields the smallest possible perimeter for a given area (excluding a circle). 
            <strong>Therefore, acreage-based estimates represent the absolute minimum boundary length.</strong>
          </p>
          <p>
            If your land is rectangular, triangular, or follows natural geographic contours like rivers or hills, 
            your actual perimeter will be longer. We recommend using the Perimeter Estimator if you have exact 
            measurements from a property survey or GPS mapping tool.
          </p>

          <h3>Post Calculations</h3>
          <ul>
            <li><strong>Line Posts:</strong> Calculated by dividing the effective wire run (total perimeter minus gate widths) by the post spacing. We always round up (ceiling) to ensure you have enough posts.</li>
            <li><strong>Corner Posts:</strong> User-defined. A standard square parcel requires 4 corners.</li>
            <li><strong>Gate Posts:</strong> We assume every gate requires 2 sturdy end/gate posts.</li>
            <li><strong>H-Braces:</strong> We do not explicitly calculate H-brace assemblies for long runs. If you are building high-tensile or long woven wire fences, you will need to manually add additional heavy posts for your brace assemblies.</li>
          </ul>

          <h3>Wire Rolls</h3>
          <p>
            Wire length is calculated by multiplying the effective wire run by the number of strands. 
            The total wire required is then divided by the selected roll length (e.g., 1,320 feet for standard barbed wire). 
            We round up to the nearest whole roll.
          </p>

          <h3>Terrain Variations</h3>
          <p>
            These calculations assume perfectly flat, level ground. Hills, dips, and ravines require more wire and often tighter post spacing.
            Always order 5% to 10% more material than the flat-ground mathematical estimate to account for terrain and waste.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
