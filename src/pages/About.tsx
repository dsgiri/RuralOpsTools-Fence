import React from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';

export default function About() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">About</h1>
      </div>

      <Card>
        <CardContent className="prose prose-slate prose-sm max-w-none pt-6">
          <p>
            The Field Fence Estimator was built to solve a simple problem: providing fast, conservative, 
            and transparent fencing material estimates for rural landowners.
          </p>
          <p>
            Whether you are a rancher cross-fencing a pasture, a farmer securing a new field, or a land 
            manager calculating capital expenses, we wanted to build a tool that feels serious, respects 
            your time, and clearly states its mathematical assumptions.
          </p>
          <p>
            This is not a home-improvement or decorative backyard tool. It is built strictly for agricultural 
            and acreage fencing. 
          </p>
          <p>
            Always consult with local contractors and verify property lines with a registered surveyor before 
            breaking ground or purchasing bulk materials.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
