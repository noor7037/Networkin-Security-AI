'use client';

import React from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { StudyPlanSkeleton, SkeletonShimmer } from '@/components/ui/SkeletonShimmer';

export default function ShowcasePage() {
  return (
    <div className="space-y-8 max-w-xl mx-auto py-6">
      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">1. Illustrated Friendly Empty State</h2>
        <EmptyState
          iconEmoji="🌱"
          title="No Scanned Syllabus Yet"
          description="Take a quick photograph of your child's textbook index or exam syllabus to generate their day-wise study roadmap."
          ctaText="Scan Syllabus Now"
          onCtaClick={() => {}}
        />
      </div>

      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">2. Skeleton Shimmer State</h2>
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-soft-sm">
          <StudyPlanSkeleton />
        </div>
      </div>
    </div>
  );
}
