import React from 'react';

export const SkeletonShimmer: React.FC<{ className?: string }> = ({ className = 'h-24 w-full' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-slate-200/70 rounded-2xl ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer shimmer-gradient" />
    </div>
  );
};

export const StudyPlanSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 p-4">
      <SkeletonShimmer className="h-28 w-full rounded-3xl" />
      <div className="grid grid-cols-2 gap-3">
        <SkeletonShimmer className="h-24 w-full rounded-2xl" />
        <SkeletonShimmer className="h-24 w-full rounded-2xl" />
      </div>
      <SkeletonShimmer className="h-44 w-full rounded-3xl" />
    </div>
  );
};
