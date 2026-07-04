import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { Select } from '@/src/components/ui/Select';
import { Button } from '@/src/components/ui/Button';

export default function PerimeterCalculator() {
  const [perimeter, setPerimeter] = useState<string>('5000');
  const [postSpacing, setPostSpacing] = useState<string>('12');
  const [gates, setGates] = useState<string>('2');
  const [gateWidth, setGateWidth] = useState<string>('12');
  const [corners, setCorners] = useState<string>('4');
  const [strands, setStrands] = useState<string>('5');
  const [rollLength, setRollLength] = useState<string>('1320'); // Quarter mile roll

  const calculateEstimate = () => {
    const p = parseFloat(perimeter) || 0;
    const spacing = parseFloat(postSpacing) || 12;
    const g = parseInt(gates) || 0;
    const gw = parseFloat(gateWidth) || 12;
    const c = parseInt(corners) || 4;
    const s = parseInt(strands) || 1;
    const rl = parseFloat(rollLength) || 1320;

    if (p <= 0) return null;

    const totalGateWidth = g * gw;
    const effectiveRun = Math.max(0, p - totalGateWidth);

    const linePosts = Math.ceil(effectiveRun / spacing);
    const gatePosts = g * 2;
    const totalPosts = linePosts + c + gatePosts;

    const wireLength = effectiveRun * s;
    const wireRolls = Math.ceil(wireLength / rl);

    return {
      perimeter: Math.round(p),
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Perimeter Boundary Estimator</h1>
        <p className="text-slate-600 mt-2">Use an exact linear measurement to calculate posts and wire requirements.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Field Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="perimeter">Total Perimeter (ft)</Label>
                <Input id="perimeter" type="number" min="0" value={perimeter} onChange={(e) => setPerimeter(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="corners">Number of Corners</Label>
                <Input id="corners" type="number" min="0" value={corners} onChange={(e) => setCorners(e.target.value)} />
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
              <CardDescription className="text-white/60">Based on a known perimeter length.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {results ? (
                <>
                  <div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Effective Wire Run</div>
                    <div className="text-4xl font-mono font-bold tracking-tight">{results.effectiveRun.toLocaleString()} ft</div>
                    <div className="text-xs text-white/70 mt-1">Total {results.perimeter.toLocaleString()} ft (excluding gates)</div>
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
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-white text-[#1B3022] hover:bg-white/90" size="lg" onClick={() => window.print()}>
                      Print / Save Estimate
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-white/60 text-center py-8">
                  Enter a valid perimeter to see estimates.
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
            <li><strong>Effective Wire Run:</strong> Subtracts the total width of all gates from your total perimeter.</li>
            <li><strong>Post Count:</strong> Divides the effective run by your chosen post spacing (rounded up), then adds your specified corner and gate posts.</li>
            <li><strong>Wire Rolls:</strong> Multiplies the effective run by the number of strands, then divides by the roll length (rounded up).</li>
          </ul>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Assumptions & Disclaimer</h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            This calculator assumes you have an accurate measurement of your property's boundary. It assumes flat terrain; elevation changes will increase the actual amount of wire needed. We recommend adding a 5-10% contingency to your material order to account for terrain, waste, and splicing. This estimate is for planning purposes only.
          </p>
        </section>

        <section className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1B3022] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#1A1C1E]">How do I measure my perimeter?</h3>
              <p className="text-sm text-[#4B5563] mt-1">You can use GPS property mapping tools, a measuring wheel for smaller lots, or reference the linear distances on your official property survey.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1C1E]">What roll length should I choose?</h3>
              <p className="text-sm text-[#4B5563] mt-1">Standard barbed wire often comes in 1,320 ft (1/4 mile) rolls. Woven wire usually comes in 330 ft rolls. Check with your local agricultural supplier for their stocked sizes.</p>
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
