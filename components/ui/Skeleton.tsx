import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton rounded-lg', className)} />
}

export function ProductCardSkeleton() {
  return (
    <div className="group">
      <div className="skeleton rounded-2xl" style={{ aspectRatio: '3/4' }} />
      <div className="pt-4 pb-1 space-y-2.5">
        <div className="skeleton h-2.5 w-14 rounded-full" />
        <div className="skeleton h-4 w-4/5 rounded-full" />
        <div className="skeleton h-4 w-1/2 rounded-full" />
        <div className="flex gap-1 mt-1">
          <div className="skeleton h-4 w-8 rounded" />
          <div className="skeleton h-4 w-8 rounded" />
          <div className="skeleton h-4 w-8 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="skeleton h-4 w-48 rounded-full mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-3">
          <div className="skeleton rounded-2xl aspect-3/4 w-full" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton rounded-xl aspect-square" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="skeleton h-10 w-3/4 rounded" />
          <div className="skeleton h-8 w-32 rounded-full" />
          <div className="skeleton h-px w-full" />
          <div className="space-y-2 mt-4">
            <div className="skeleton h-3 w-20 rounded-full" />
            <div className="grid grid-cols-6 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton h-10 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="skeleton h-12 w-full rounded-xl mt-4" />
          <div className="skeleton h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function OrderCardSkeleton() {
  return (
    <div className="border border-grey-light rounded-2xl p-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="skeleton h-3 w-20 rounded-full" />
          <div className="skeleton h-5 w-32 rounded-full" />
        </div>
        <div className="skeleton h-7 w-24 rounded-full" />
      </div>
      <div className="skeleton h-px w-full" />
      <div className="flex gap-3">
        <div className="skeleton h-16 w-12 rounded-lg shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="skeleton h-3 w-3/4 rounded-full" />
          <div className="skeleton h-3 w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  )
}
