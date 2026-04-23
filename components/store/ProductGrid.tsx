import { ProductCard } from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  columns?: 3 | 4 | 5
}

const colClass: Record<number, string> = {
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-display italic text-2xl text-brown-light mb-2">No products found</p>
        <p className="font-body text-brown-light" style={{ fontSize: 15 }}>Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className={`grid gap-x-5 gap-y-10 ${colClass[columns] ?? colClass[4]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
