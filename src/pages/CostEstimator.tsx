import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { Select } from '@/src/components/ui/Select';
import { Button } from '@/src/components/ui/Button';

export default function CostEstimator() {
  // Dimension state
  const [perimeter, setPerimeter] = useState<string>('5000');
  const [postSpacing, setPostSpacing] = useState<string>('12');
  const [gates, setGates] = useState<string>('2');
  const [gateWidth, setGateWidth] = useState<string>('12');
  const [corners, setCorners] = useState<string>('4');
  const [strands, setStrands] = useState<string>('5');
  const [rollLength, setRollLength] = useState<string>('1320');

  // Cost state
  const [linePostCost, setLinePostCost] = useState<string>('8.50');
  const [cornerPostCost, setCornerPostCost] = useState<string>('35.00');
  const [gatePostCost, setGatePostCost] = useState<string>('45.00');
  const [wireRollCost, setWireRollCost] = useState<string>('110.00');
  const [laborCostPerFoot, setLaborCostPerFoot] = useState<string>('1.50');

  const calculateEstimate = () => {
    const p = parseFloat(perimeter) || 0;
    const spacing = parseFloat(postSpacing) || 12;
    const g = parseInt(gates) || 0;
    const gw = parseFloat(gateWidth) || 12;
    const c = parseInt(corners) || 4;
    const s = parseInt(strands) || 1;
    const rl = parseFloat(rollLength) || 1320;

    const lpc = parseFloat(linePostCost) || 0;
    const cpc = parseFloat(cornerPostCost) || 0;
    const gpc = parseFloat(gatePostCost) || 0;
    const wrc = parseFloat(wireRollCost) || 0;
    const labor = parseFloat(laborCostPerFoot) || 0;

    if (p <= 0) return null;

    const totalGateWidth = g * gw;
    const effectiveRun = Math.max(0, p - totalGateWidth);

    const linePosts = Math.ceil(effectiveRun / spacing);
    const gatePosts = g * 2;
    const totalPosts = linePosts + c + gatePosts;

    const wireLength = effectiveRun * s;
    const wireRolls = Math.ceil(wireLength / rl);

    const totalLinePostCost = linePosts * lpc;
    const totalCornerPostCost = c * cpc;
    const totalGatePostCost = gatePosts * gpc;
    const totalWireCost = wireRolls * wrc;
    const totalLaborCost = p * labor;

    const materialCost = totalLinePostCost + totalCornerPostCost + totalGatePostCost + totalWireCost;
    const totalCost = materialCost + totalLaborCost;
    const costPerFoot = totalCost / p;

    return {
      totalPosts,
      wireRolls,
      costs: {
        linePosts: totalLinePostCost,
        cornerPosts: totalCornerPostCost,
        gatePosts: totalGatePostCost,
        wire: totalWireCost,
        materials: materialCost,
        labor: totalLaborCost,
        total: totalCost,
        perFoot: costPerFoot
      }
    };
  };

  const results = calculateEstimate();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Fence Cost Estimator</h1>
        <p className="text-slate-600 mt-2">Estimate total material and labor costs based on your fence dimensions and current prices.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Dimensions & Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="perimeter">Total Perimeter (ft)</Label>
                  <Input id="perimeter" type="number" min="0" value={perimeter} onChange={(e) => setPerimeter(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spacing">Post Spacing (ft)</Label>
                  <Input id="spacing" type="number" min="1" value={postSpacing} onChange={(e) => setPostSpacing(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="corners">Number of Corners</Label>
                  <Input id="corners" type="number" min="0" value={corners} onChange={(e) => setCorners(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gates">Number of Gates</Label>
                  <Input id="gates" type="number" min="0" value={gates} onChange={(e) => setGates(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strands">Wire Strands</Label>
                  <Input id="strands" type="number" min="1" value={strands} onChange={(e) => setStrands(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollLength">Roll Length (ft)</Label>
                  <Select id="rollLength" value={rollLength} onChange={(e) => setRollLength(e.target.value)}>
                    <option value="1320">1,320 ft (1/4 mile)</option>
                    <option value="330">330 ft (Woven Wire)</option>
                    <option value="660">660 ft (1/8 mile)</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Unit Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linePostCost">Line Post ($/each)</Label>
                  <Input id="linePostCost" type="number" min="0" step="0.01" value={linePostCost} onChange={(e) => setLinePostCost(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wireRollCost">Wire Roll ($/each)</Label>
                  <Input id="wireRollCost" type="number" min="0" step="0.01" value={wireRollCost} onChange={(e) => setWireRollCost(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cornerPostCost">Corner Post ($/each)</Label>
                  <Input id="cornerPostCost" type="number" min="0" step="0.01" value={cornerPostCost} onChange={(e) => setCornerPostCost(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gatePostCost">Gate Post ($/each)</Label>
                  <Input id="gatePostCost" type="number" min="0" step="0.01" value={gatePostCost} onChange={(e) => setGatePostCost(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="laborCostPerFoot">Labor ($/foot) <span className="font-normal text-slate-500">(Optional)</span></Label>
                  <Input id="laborCostPerFoot" type="number" min="0" step="0.01" value={laborCostPerFoot} onChange={(e) => setLaborCostPerFoot(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-[#1B3022] text-white border-[#1B3022] sticky top-24">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white">Estimated Cost</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {results ? (
                <>
                  <div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Estimated Cost</div>
                    <div className="text-4xl font-mono font-bold tracking-tight text-[#10B981]">{formatCurrency(results.costs.total)}</div>
                    <div className="text-xs text-white/70 mt-1">{formatCurrency(results.costs.perFoot)} per foot</div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Line Posts</span>
                      <span>{formatCurrency(results.costs.linePosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Corner & Gate Posts</span>
                      <span>{formatCurrency(results.costs.cornerPosts + results.costs.gatePosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Wire Rolls ({results.wireRolls})</span>
                      <span>{formatCurrency(results.costs.wire)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-white/20">
                      <span className="text-white/90">Total Materials</span>
                      <span>{formatCurrency(results.costs.materials)}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-white/60">Labor Estimate</span>
                      <span>{formatCurrency(results.costs.labor)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-white text-[#1B3022] hover:bg-white/90" size="lg" onClick={() => window.print()}>
                      Print / Save Estimate
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-white/60 text-center py-8">
                  Enter dimensions to see cost estimate.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 space-y-8 max-w-4xl">
        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">How It Works</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#4B5563]">
            <li><strong>Material Quantities:</strong> Calculates posts and wire rolls needed based on the perimeter minus gate openings.</li>
            <li><strong>Material Costs:</strong> Multiplies the required quantities by your entered unit prices.</li>
            <li><strong>Labor Costs:</strong> (Optional) Multiplies the total perimeter by the labor rate per foot.</li>
            <li><strong>Total & Per Foot:</strong> Sums all costs and divides by the total perimeter to find the blended cost per foot.</li>
          </ul>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Assumptions & Disclaimer</h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            This calculator covers the primary bulk materials (posts and wire) and optional labor. It does NOT include costs for fasteners (staples, clips), concrete, tensioners, taxes, or delivery fees. Prices fluctuate regionally. Always get a formal quote from a supplier or contractor before finalizing your budget.
          </p>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#1A1C1E]">What is a typical labor cost per foot?</h3>
              <p className="text-sm text-[#4B5563] mt-1">Labor costs vary wildly by region, terrain difficulty, and fence type. A basic barbed wire fence might see labor rates of $1.50 to $3.00 per foot, while complex woven wire or rocky terrain can push labor over $4.00 per foot.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1C1E]">Why isn't hardware included?</h3>
              <p className="text-sm text-[#4B5563] mt-1">Hardware like staples, clips, and brace wire are usually bought in bulk boxes and represent a very small fraction of the total cost. We focus on the high-cost items (posts and wire rolls) to give you the most accurate baseline budget.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/acreage" className="block p-4 bg-white border border-[#DDE2E6] rounded-lg hover:border-[#9CA3AF] transition-colors">
              <h3 className="font-semibold text-[#1B3022]">Acreage Estimator</h3>
              <p className="text-xs text-[#6B7280] mt-1">Calculate boundary length from total acres.</p>
            </Link>
            <Link to="/perimeter" className="block p-4 bg-white border border-[#DDE2E6] rounded-lg hover:border-[#9CA3AF] transition-colors">
              <h3 className="font-semibold text-[#1B3022]">Perimeter Estimator</h3>
              <p className="text-xs text-[#6B7280] mt-1">Calculate materials from an exact perimeter length.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
