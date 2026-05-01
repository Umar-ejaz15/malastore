import Link from 'next/link'
import { ProductImage } from '@/components/ui/ProductImage'
import { Button } from '@/components/ui/Button'
import type { Category } from '@/types'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="group block cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-soft rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300" style={{ aspectRatio: '3/4' }}>
        
        {/* Image */}
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <ProductImage
            sanityImage={category.sanityImage}
            fallbackVariant={category.imgVariant}
            alt={category.name}
          />
        </div>

        {/* Gradient Overlay - Base */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to bottom, transparent 50%, rgba(15, 20, 25, 0.2) 100%)',
          }}
        />

        {/* Gradient Overlay - Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to bottom, transparent 30%, rgba(15, 20, 25, 0.5) 100%)',
          }}
        />
      </div>

      {/* Category Info */}
      <div className="mt-5 text-center">
        <h3 className="font-display font-bold text-navy mb-3 text-lg group-hover:text-gold transition-colors">
          {category.name}
        </h3>
        <Button variant="outline" size="sm">Shop Now</Button>
      </div>
    </Link>
  )
}
