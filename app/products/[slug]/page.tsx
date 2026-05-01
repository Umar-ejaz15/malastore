import { redirect } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProductGrid } from '@/components/store/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getProductBySlug, getRelatedProducts } from '@/lib/data'
import { ProductActions } from './ProductActions'
import { ProductGallery } from './ProductGallery'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) redirect('/shop')

  const related = await getRelatedProducts(product, 4)

  const fallbackImages = product.images ?? [
    product.imgVariant,
    product.imgVariant,
    product.imgVariant,
    product.imgVariant,
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">

      <Breadcrumb items={[
        { label: 'Shop', href: '/shop' },
        { label: product.category, href: `/shop?category=${product.categorySlug}` },
        { label: product.name },
      ]} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.15fr_0.85fr] gap-10 xl:gap-16 items-start">

        {/* Gallery */}
        <div className="group">
          <ProductGallery
            sanityImages={product.sanityImages}
            fallbackImages={fallbackImages}
            videoUrl={product.videoUrl}
            productName={product.name}
            isNew={product.isNew}
            isRestocked={product.isRestocked}
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col lg:sticky lg:top-24">

          {/* Category breadcrumb */}
          <a
            href={`/shop?category=${product.categorySlug}`}
            className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-gold transition-colors mb-3 w-fit"
          >
            {product.category}
            {product.pieces && <span className="ml-2 opacity-60">· {product.pieces} Piece</span>}
          </a>

          <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-tight mb-1">
            {product.name}
          </h1>

          <p className="font-ui text-grey text-[10px] uppercase tracking-widest mb-5">SKU: {product.sku}</p>

          {/* Price row */}
          <div className="flex items-baseline gap-3 mb-2">
            <span className="font-body text-2xl font-bold text-navy">
              Rs. {product.price.toLocaleString('en-PK')}
            </span>
            {product.originalPrice && (
              <>
                <span className="font-body text-grey line-through text-base">
                  Rs. {product.originalPrice.toLocaleString('en-PK')}
                </span>
                <span className="font-ui text-[10px] font-bold text-coral uppercase tracking-wider bg-coral/10 px-2 py-0.5 rounded-full">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Delivery note */}
          <div className="flex items-center gap-2 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold shrink-0">
              <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 4v4h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/>
            </svg>
            <p className="font-ui text-[10px] text-grey uppercase tracking-wider">
              Rs. 250 delivery · <span className="text-gold font-semibold">Free on JazzCash / Bank</span>
            </p>
          </div>

          <div className="h-px bg-grey-light mb-6" />

          <ProductActions product={product} />
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-28 pt-16 border-t border-grey-light">
          <SectionHeader eyebrow="You May Also Like" title="Related Products" align="center" />
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  )
}
