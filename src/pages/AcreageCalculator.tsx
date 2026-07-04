import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { Select } from '@/src/components/ui/Select';
import { Button } from '@/src/components/ui/Button';
import { Info } from 'lucide-react';

const SQ_FT_PER_ACRE = 43560;

export default function AcreageCalculator() {
  const [acres, setAcres] = useState<string>('10');
  const [postSpacing, setPostSpacing] = useState<string>('12');
  const [gates, setGates] = useState<string>('1');
  const [gateWidth, setGateWidth] = useState<string>('12');
  const [corners, setCorners] = useState<string>('4');
  const [strands, setStrands] = useState<string>('5');
  const [rollLength, setRollLength] = useState<string>('1320'); // Quarter mile roll

  // Calculate perimeter for a square parcel
  const calculateEstimate = () => {
    const a = parseFloat(acres) || 0;
    const spacing = parseFloat(postSpacing) || 12;
    const g = parseInt(gates) || 0;
    const gw = parseFloat(gateWidth) || 12;
    const c = parseInt(corners) || 4;
    const s = parseInt(strands) || 1;
    const rl = parseFloat(rollLength) || 1320;

    if (a <= 0) return null;

    const sqFt = a * SQ_FT_PER_ACRE;
    const side = Math.sqrt(sqFt);
    const perimeter = side * 4;

    const totalGateWidth = g * gw;
    const effectiveRun = Math.max(0, perimeter - totalGateWidth);

    const linePosts = Math.ceil(effectiveRun / spacing);
    const gatePosts = g * 2;
    const totalPosts = linePosts + c + gatePosts;

    const wireLength = effectiveRun * s;
    const wireRolls = Math.ceil(wireLength / rl);

    return {
      perimeter: Math.round(perimeter),
      effectiveRun: Math.round(effectiveRun),
      linePosts,
      cornerPosts: c,
      gatePosts,
      totalPosts,
      wireLength: Math.round(wireLength),
      wireRolls
    };
  };

  const results = calculateEstimate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Acreage Boundary Estimator</h1>
        <p className="text-slate-600 mt-2">Estimate fence length and materials based on total acres. Assumes a perfectly square parcel.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Field Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acres">Total Acres</Label>
                <Input id="acres" type="number" min="0" step="0.1" value={acres} onChange={(e) => setAcres(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corners">Number of Corners</Label>
                <Input id="corners" type="number" min="0" value={corners} onChange={(e) => setCorners(e.target.value)} />
                <p className="text-xs text-slate-500">A perfect square has 4 corners.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gates">Number of Gates</Label>
                  <Input id="gates" type="number" min="0" value={gates} onChange={(e) => setGates(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gateWidth">Gate Width (ft)</Label>
                  <Input id="gateWidth" type="number" min="0" value={gateWidth} onChange={(e) => setGateWidth(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Fence Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spacing">Post Spacing (ft)</Label>
                <Input id="spacing" type="number" min="1" value={postSpacing} onChange={(e) => setPostSpacing(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div>
          <Card className="bg-[#1B3022] text-white border-[#1B3022] sticky top-24">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white">Estimated Materials</CardTitle>
              <CardDescription className="text-white/60">Based on a minimum perimeter square parcel.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {results ? (
                <>
                  <div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Boundary Perimeter</div>
                    <div className="text-4xl font-mono font-bold tracking-tight">{results.perimeter.toLocaleString()} ft</div>
                    <div className="text-xs text-white/70 mt-1">Effective run: {results.effectiveRun.toLocaleString()} ft (excluding gates)</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Posts</div>
                      <div className="text-3xl font-mono font-bold">{results.totalPosts.toLocaleString()}</div>
                      <div className="text-xs text-white/70 mt-1">
                        {results.linePosts} line, {results.cornerPosts} corner, {results.gatePosts} gate
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Wire Rolls</div>
                      <div className="text-3xl font-mono font-bold">{results.wireRolls.toLocaleString()}</div>
                      <div className="text-xs text-white/70 mt-1">
                        {results.wireLength.toLocaleString()} ft total wire
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 flex gap-3 text-sm text-white/80">
                    <Info className="h-5 w-5 text-white/60 shrink-0" />
                    <p>
                      <strong>Note:</strong> Real-world parcels are rarely perfect squares. Uneven terrain and irregular boundaries will increase the actual perimeter. We recommend adding 5-10% to these numbers for a safe order quantity.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-white text-[#1B3022] hover:bg-white/90" size="lg" onClick={() => window.print()}>
                      Print / Save Estimate
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-white/60 text-center py-8">
                  Enter a valid acreage to see estimates.
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
            <li><strong>Perimeter Calculation:</strong> Assumes a perfectly square parcel to find the absolute minimum boundary length (Perimeter = 4 × √Area).</li>
            <li><strong>Effective Wire Run:</strong> Subtracts total gate width from the perimeter.</li>
            <li><strong>Post Count:</strong> Divides effective run by post spacing and rounds up, adding corner and gate posts.</li>
            <li><strong>Wire Rolls:</strong> Multiplies effective run by strands, then divides by roll length (rounding up).</li>
          </ul>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Assumptions & Disclaimer</h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            This calculator assumes flat terrain and a perfectly square property shape. Real-world boundaries are rarely perfect squares and terrain variations (hills, dips) will require more materials and tighter post spacing. We recommend adding a 5-10% contingency to your final material order. This tool provides preliminary estimates and is not a substitute for a professional survey or contractor quote.
          </p>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#1A1C1E]">Why does acreage assume a square shape?</h3>
              <p className="text-sm text-[#4B5563] mt-1">A square yields the smallest possible perimeter for a given area. This gives you the baseline minimum materials needed. A long, narrow rectangular field of the same acreage will require significantly more fencing.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1C1E]">Do I need to account for gates?</h3>
              <p className="text-sm text-[#4B5563] mt-1">Yes. The calculator automatically subtracts gate widths from your total wire run, but adds the necessary heavy-duty posts to support those gates.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/perimeter" className="block p-4 bg-white border border-[#DDE2E6] rounded-lg hover:border-[#9CA3AF] transition-colors">
              <h3 className="font-semibold text-[#1B3022]">Perimeter Estimator</h3>
              <p className="text-xs text-[#6B7280] mt-1">Calculate materials from an exact perimeter length.</p>
            </Link>
            <Link to="/cost" className="block p-4 bg-white border border-[#DDE2E6] rounded-lg hover:border-[#9CA3AF] transition-colors">
              <h3 className="font-semibold text-[#1B3022]">Cost Estimator</h3>
              <p className="text-xs text-[#6B7280] mt-1">Estimate total material and labor costs.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
