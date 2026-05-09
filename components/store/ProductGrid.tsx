import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  columns?: 3 | 4 | 5
  loading?: boolean
  skeletonCount?: number
}

const colClass: Record<number, string> = {
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
}

export function ProductGrid({
  products,
  columns = 4,
  loading = false,
  skeletonCount = 8,
}: ProductGridProps) {
  const cls = `grid gap-x-4 gap-y-10 sm:gap-x-5 ${colClass[columns] ?? colClass[4]}`

  if (loading) {
    return (
      <div className={cls}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 rounded-full border border-grey-light flex items-center justify-center text-grey-light mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <p className="font-display text-2xl font-semibold text-navy mb-2">No products found</p>
        <p className="font-body text-grey text-sm">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className={cls}>
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-reveal"
          style={{ animationDelay: `${Math.min(i, 7) * 40}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
