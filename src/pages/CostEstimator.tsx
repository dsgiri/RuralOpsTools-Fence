import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Label } from '@/src/components/ui/Label';
import { Select } from '@/src/components/ui/Select';
import { Button } from '@/src/components/ui/Button';
import { FenceLineBuilder } from '@/src/components/FenceLineBuilder';
import { trackEvent } from '@/src/lib/analytics';

export default function CostEstimator() {
  const [perimeter, setPerimeter] = useState<string>('5000');
  const [gates, setGates] = useState<string>('2');
  const [gateWidth, setGateWidth] = useState<string>('12');
  
  const [fenceType, setFenceType] = useState('barbed');
  const [terrain, setTerrain] = useState('flat');

  // Materials & Specs (Defaults shift based on type)
  const [postSpacing, setPostSpacing] = useState<string>('12');
  const [strands, setStrands] = useState<string>('5');
  const [rollLength, setRollLength] = useState<string>('1320');

  // Costs
  const [linePostCost, setLinePostCost] = useState<string>('7.50');
  const [wireRollCost, setWireRollCost] = useState<string>('85.00');
  const [cornerPostCost, setCornerPostCost] = useState<string>('35.00');
  const [gatePostCost, setGatePostCost] = useState<string>('45.00');
  const [hBraceCost, setHBraceCost] = useState<string>('150.00');
  const [laborCostPerFoot, setLaborCostPerFoot] = useState<string>('2.50');

  useEffect(() => {
    // When fence type changes, update defaults
    if (fenceType === 'woven') {
      setStrands('1');
      setRollLength('330');
      setWireRollCost('220.00');
      setLaborCostPerFoot('3.00');
    } else if (fenceType === 'high_tensile') {
      setStrands('6');
      setRollLength('4000');
      setWireRollCost('110.00');
      setLaborCostPerFoot('2.00');
    } else if (fenceType === 'electric') {
      setStrands('2');
      setRollLength('2640');
      setWireRollCost('45.00');
      setLaborCostPerFoot('1.50');
    } else {
      setStrands('5');
      setRollLength('1320');
      setWireRollCost('85.00');
      setLaborCostPerFoot('2.50');
    }
  }, [fenceType]);

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    trackEvent('calculator_started', { calculator: 'cost' });
  }, [perimeter, gates, gateWidth, fenceType, terrain, linePostCost, wireRollCost, cornerPostCost, gatePostCost, hBraceCost, laborCostPerFoot]);

  useEffect(() => {
    const p = parseFloat(perimeter) || 0;
    const g = parseFloat(gates) || 0;
    const gw = parseFloat(gateWidth) || 0;
    const spacing = parseFloat(postSpacing) || 1;
    const strandCount = parseFloat(strands) || 1;
    const rollLen = parseFloat(rollLength) || 1;

    const cLinePost = parseFloat(linePostCost) || 0;
    const cWireRoll = parseFloat(wireRollCost) || 0;
    const cCorner = parseFloat(cornerPostCost) || 0;
    const cGatePost = parseFloat(gatePostCost) || 0;
    const cHBrace = parseFloat(hBraceCost) || 0;
    const cLabor = parseFloat(laborCostPerFoot) || 0;

    if (p > 0) {
      const effectiveRun = Math.max(0, p - (g * gw));
      
      // Hardware quantities
      const linePosts = Math.ceil(effectiveRun / spacing);
      const cornerPosts = 4; // standard assumption
      const gatePosts = g * 2;
      const hBraceAssemblies = cornerPosts * 2 + g * 2; // Rough estimate: 2 per corner, 2 per gate
      
      const totalWireRun = effectiveRun * strandCount;
      const wireRolls = Math.ceil(totalWireRun / rollLen);

      // Terrain multipliers
      let terrainMultiplier = 1.0;
      if (terrain === 'hilly') terrainMultiplier = 1.25;
      if (terrain === 'rocky') terrainMultiplier = 1.5;

      // Calculations
      const costLinePosts = linePosts * cLinePost * terrainMultiplier; // rocky terrain makes setting posts harder/more expensive if including equipment, but here it's material. Wait, terrain usually affects labor, not post material cost unless breaking posts. Let's apply it just to labor, but wait, rocky terrain often requires specialized posts or drilling. Let's apply it to labor primarily.
      
      const costMaterialsLinePosts = linePosts * cLinePost;
      const costMaterialsCorner = cornerPosts * cCorner;
      const costMaterialsGate = gatePosts * cGatePost;
      const costMaterialsWire = wireRolls * cWireRoll;
      const costMaterialsHBrace = hBraceAssemblies * cHBrace;

      const totalMaterials = costMaterialsLinePosts + costMaterialsCorner + costMaterialsGate + costMaterialsWire + costMaterialsHBrace;
      const totalLabor = p * cLabor * terrainMultiplier;
      
      const totalCost = totalMaterials + totalLabor;
      const perFoot = totalCost / p;

      setResults({
        effectiveRun,
        linePosts,
        cornerPosts,
        gatePosts,
        hBraceAssemblies,
        wireRolls,
        costs: {
          linePosts: costMaterialsLinePosts,
          cornerPosts: costMaterialsCorner,
          gatePosts: costMaterialsGate,
          wire: costMaterialsWire,
          hBraces: costMaterialsHBrace,
          materials: totalMaterials,
          labor: totalLabor,
          total: totalCost,
          perFoot: perFoot
        }
      });
      
      trackEvent('calculator_completed', { calculator: 'cost', result_total: totalCost });
    } else {
      setResults(null);
    }
  }, [perimeter, gates, gateWidth, postSpacing, strands, rollLength, linePostCost, wireRollCost, cornerPostCost, gatePostCost, hBraceCost, laborCostPerFoot, terrain, fenceType]);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-fence-iron tracking-tight mb-2">Cost Estimator</h1>
        <p className="text-fence-iron/60 text-lg">Calculate total material and labor costs including hardware and terrain multipliers.</p>
        
        {results && (
           <FenceLineBuilder 
             length={perimeter ? parseInt(perimeter, 10) : 0} 
             posts={results.linePosts} 
             gates={parseInt(gates, 10) || 0}
             fenceType={fenceType as any}
             cost={results.costs.total}
           />
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Project Basics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="perimeter">Total Perimeter (ft)</Label>
                  <Input id="perimeter" type="number" min="0" value={perimeter} onChange={(e) => setPerimeter(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fenceType">Fence Type</Label>
                  <Select id="fenceType" value={fenceType} onChange={(e) => setFenceType(e.target.value)}>
                    <option value="barbed">Barbed Wire</option>
                    <option value="woven">Woven Wire (Field Fence)</option>
                    <option value="high_tensile">High-Tensile (Smooth)</option>
                    <option value="electric">Electric Fence</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="terrain" className="text-danger-rust flex items-center gap-1">
                    Terrain & Soil
                  </Label>
                  <Select id="terrain" value={terrain} onChange={(e) => setTerrain(e.target.value)} className="border-danger-rust/30 focus-visible:ring-danger-rust">
                    <option value="flat">Flat / Level (Standard)</option>
                    <option value="hilly">Hilly / Rolling (+25% Labor)</option>
                    <option value="rocky">Rocky / Hardpan (+50% Labor)</option>
                  </Select>
                </div>
                <div className="space-y-2 flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="gates">Number of Gates</Label>
                    <Input id="gates" type="number" min="0" value={gates} onChange={(e) => setGates(e.target.value)} />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="gateWidth">Avg Gate Width (ft)</Label>
                    <Input id="gateWidth" type="number" min="0" value={gateWidth} onChange={(e) => setGateWidth(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Materials Setup</CardTitle>
              <CardDescription>Adjust based on {fenceType.replace('_', '-')} defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postSpacing">Post Spacing (ft)</Label>
                  <Input id="postSpacing" type="number" min="1" step="0.5" value={postSpacing} onChange={(e) => setPostSpacing(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="strands">{fenceType === 'woven' ? 'Rolls High' : 'Strands'}</Label>
                  <Input id="strands" type="number" min="1" value={strands} onChange={(e) => setStrands(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollLength">Roll Length (ft)</Label>
                  <Input id="rollLength" type="number" min="1" value={rollLength} onChange={(e) => setRollLength(e.target.value)} />
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
                  <Label htmlFor="hBraceCost" className="text-barbed-amber">H-Brace Assembly / Hardware ($/each)</Label>
                  <Input id="hBraceCost" type="number" min="0" step="0.01" value={hBraceCost} onChange={(e) => setHBraceCost(e.target.value)} className="border-barbed-amber/30 focus-visible:ring-barbed-amber" />
                  <p className="text-[10px] text-fence-iron/60 mt-1">Cost for brace posts, pins, and wire tensioners per corner/gate end.</p>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="laborCostPerFoot">Labor ($/foot) <span className="font-normal text-fence-iron/60">(Optional)</span></Label>
                  <Input id="laborCostPerFoot" type="number" min="0" step="0.01" value={laborCostPerFoot} onChange={(e) => setLaborCostPerFoot(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="bg-fence-iron text-white border-fence-iron sticky top-24">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-white">Estimated Cost</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {results ? (
                <>
                  <div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Estimated Cost</div>
                    <div className="text-4xl font-mono font-bold tracking-tight text-barbed-amber">{formatCurrency(results.costs.total)}</div>
                    <div className="text-xs text-white/70 mt-1 font-mono">{formatCurrency(results.costs.perFoot)} per foot</div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Line Posts ({results.linePosts})</span>
                      <span className="font-mono">{formatCurrency(results.costs.linePosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Corner/Gate Posts</span>
                      <span className="font-mono">{formatCurrency(results.costs.cornerPosts + results.costs.gatePosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">H-Braces/Hardware ({results.hBraceAssemblies})</span>
                      <span className="font-mono text-barbed-amber">{formatCurrency(results.costs.hBraces)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Wire Rolls ({results.wireRolls})</span>
                      <span className="font-mono">{formatCurrency(results.costs.wire)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-white/20">
                      <span className="text-white/90">Total Materials</span>
                      <span className="font-mono">{formatCurrency(results.costs.materials)}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-white/60">Labor {terrain !== 'flat' ? <span className="text-danger-rust text-[10px] ml-1 uppercase">{terrain} multiplier</span> : ''}</span>
                      <span className="font-mono">{formatCurrency(results.costs.labor)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-white text-fence-iron hover:bg-white/90 font-display text-lg tracking-wide" size="lg" onClick={() => window.print()}>
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
        {/* Support content */}
        <section className="bg-white/50 p-6 rounded-xl border border-fence-iron/20">
          <h2 className="text-xl font-bold text-fence-iron mb-4">How It Works</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-fence-iron/80">
            <li><strong>Material Quantities:</strong> Calculates posts and wire rolls needed based on the perimeter minus gate openings.</li>
            <li><strong>Hardware Costs:</strong> Automatically estimates H-brace assemblies for each corner and gate to provide an accurate real-world hardware total.</li>
            <li><strong>Terrain Adjustments:</strong> Hilly and rocky terrain increase labor costs by 25% and 50% respectively, as setting posts and running wire becomes significantly harder.</li>
            <li><strong>Total & Per Foot:</strong> Sums all costs and divides by the total perimeter to find the blended cost per foot.</li>
          </ul>
        </section>
        
        {/* ... remaining sections ... */}
      </div>
    </div>
  );
}
