import { redirect } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { ProductGrid } from '@/components/store/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getProductBySlug, getRelatedProducts } from '@/lib/data'
import { ProductActions } from './ProductActions'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) redirect('/shop')

  const related = getRelatedProducts(product, 4)
  const thumbnailVariants = ['warm-2', 'warm-4', 'warm-6']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">

      <Breadcrumb items={[
        { label: 'Shop', href: '/shop' },
        { label: product.category, href: `/shop?category=${product.categorySlug}` },
        { label: product.name },
      ]} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-16 items-start">

        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-beige">
            <PlaceholderImage variant={product.imgVariant} />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-navy text-white font-ui font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded">
                New In
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {thumbnailVariants.map((v, i) => (
              <div key={v} className={`aspect-square overflow-hidden rounded-lg cursor-pointer ring-1 transition-all duration-200 ${
                i === 0 ? 'ring-navy' : 'ring-grey-light hover:ring-gold'
              }`}>
                <PlaceholderImage variant={v} />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col lg:sticky lg:top-24">

          <a href={`/shop?category=${product.categorySlug}`} className="font-ui text-[11px] uppercase tracking-widest text-grey hover:text-gold transition-colors mb-3">
            {product.category}
          </a>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-tight mb-1">
            {product.name}
          </h1>

          <p className="font-ui text-grey text-[10px] uppercase tracking-widest mb-5">SKU: {product.sku}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-body text-2xl font-semibold text-navy">
              Rs. {product.price.toLocaleString('en-PK')}
            </span>
            {product.originalPrice && (
              <span className="font-body text-grey line-through text-base">
                Rs. {product.originalPrice.toLocaleString('en-PK')}
              </span>
            )}
          </div>

          <div className="h-px bg-grey-light mb-6" />

          <ProductActions product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-grey-light">
          <SectionHeader eyebrow="You May Also Like" title="Related Products" align="center" />
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  )
}
