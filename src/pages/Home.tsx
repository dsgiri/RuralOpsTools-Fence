import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-fence-iron">
          Practical fence estimates for rural field boundaries.
        </h1>
        <p className="text-xl text-fence-iron/60 max-w-2xl leading-relaxed">
          Estimate posts, wire, and cost for field boundaries. Practical fence sizing for rural land and pasture edges. Simple estimates with visible assumptions, built for farmers and ranchers.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col hover:border-fence-iron/40 transition-colors">
          <CardHeader>
            <Calculator className="h-8 w-8 text-fence-iron mb-2" />
            <CardTitle>Acreage Estimate</CardTitle>
            <CardDescription>Estimate boundary fence length and materials from total acres.</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-4">
            <Button asChild className="w-full justify-between" variant="outline">
              <Link to="/acreage">
                Start Acreage Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:border-fence-iron/40 transition-colors">
          <CardHeader>
            <Calculator className="h-8 w-8 text-fence-iron mb-2" />
            <CardTitle>Perimeter Estimate</CardTitle>
            <CardDescription>Use an exact linear perimeter to calculate post spacing and wire runs.</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-4">
            <Button asChild className="w-full justify-between" variant="outline">
              <Link to="/perimeter">
                Start Perimeter Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col sm:col-span-2 lg:col-span-1 hover:border-fence-iron/40 transition-colors">
          <CardHeader>
            <Calculator className="h-8 w-8 text-fence-iron mb-2" />
            <CardTitle>Cost Estimate</CardTitle>
            <CardDescription>Compare fence configurations by spacing, wire type, and material cost.</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-4">
            <Button asChild className="w-full justify-between" variant="outline">
              <Link to="/cost">
                Start Cost Estimate <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="bg-white/50 border border-fence-iron/20 p-8 rounded-xl space-y-4">
        <div className="flex items-center space-x-3 text-fence-iron mb-2">
          <ShieldCheck className="h-6 w-6" />
          <h2 className="text-2xl font-display font-bold tracking-tight">Our Method & Assumptions</h2>
        </div>
        <div className="prose prose-slate prose-sm text-fence-iron/80 max-w-none space-y-4">
          <p>
            This tool provides conservative, practical estimates intended for preliminary planning of rural fencing projects. 
            We do not sell fencing materials. Our goal is to give you a transparent baseline before you talk to a supplier or contractor.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Conservative Rounding:</strong> We round up post counts and wire rolls to ensure you aren't left short-handed in the field.</li>
            <li><strong>Effective Runs:</strong> Wire lengths account for gates being subtracted from the total perimeter.</li>
            <li><strong>Acreage Approximation:</strong> When calculating from acres without precise dimensions, we assume a perfectly square parcel, which yields the minimum possible perimeter. Real-world boundaries will likely require more material.</li>
          </ul>
          <p className="pt-2">
            <Link to="/assumptions" className="text-fence-iron font-semibold hover:underline">
              Read our full methodology
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
