import { redirect } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { ProductGrid } from '@/components/store/ProductGrid'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getProductBySlug, getRelatedProducts } from '@/lib/data'
import { ProductActions } from './ProductActions'

// Sanity integration: replace with GROQ query *[_type == "product" && slug.current == $slug][0]
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) redirect('/shop')

  const related = getRelatedProducts(product, 4)
  const thumbnailVariants = ['warm-2', 'warm-4', 'warm-6']

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">

      <Breadcrumb
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category, href: `/shop?category=${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      {/* Product grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-16 items-start">

        {/* Left: gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-3/4 overflow-hidden bg-off-white">
            <PlaceholderImage variant={product.imgVariant} />
            {product.isNew && (
              <span
                className="absolute top-4 left-4 bg-brown text-mala-white font-ui font-bold px-2.5 py-1"
                style={{ fontSize: 9, letterSpacing: '0.15em' }}
              >
                NEW IN
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {thumbnailVariants.map((v, i) => (
              <div
                key={v}
                className={`aspect-square overflow-hidden cursor-pointer ring-1 transition-all duration-200 ${
                  i === 0 ? 'ring-brown' : 'ring-beige hover:ring-gold-dark'
                }`}
              >
                <PlaceholderImage variant={v} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: product info — sticky */}
        <div className="flex flex-col lg:sticky lg:top-24">

          {/* Category breadcrumb */}
          <a
            href={`/shop?category=${product.categorySlug}`}
            className="font-ui text-brown-light hover:text-gold transition-colors mb-3"
            style={{ fontSize: 11, letterSpacing: '0.2em' }}
          >
            {product.category.toUpperCase()}
          </a>

          <h1 className="font-display italic text-3xl md:text-4xl text-brown font-medium leading-tight mb-1">
            {product.name}
          </h1>

          <p className="font-ui text-sand-dark mb-4" style={{ fontSize: 10, letterSpacing: '0.15em' }}>
            SKU: {product.sku}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-body text-2xl font-medium text-brown">
              Rs. {product.price.toLocaleString('en-PK')}
            </span>
            {product.originalPrice && (
              <span className="font-body text-sand-dark line-through" style={{ fontSize: 15 }}>
                Rs. {product.originalPrice.toLocaleString('en-PK')}
              </span>
            )}
          </div>

          <div className="h-px bg-beige mb-6" />

          {/* Client actions */}
          <ProductActions product={product} />
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-beige">
          <SectionHeader eyebrow="You May Also Like" title="Related Products" align="center" />
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  )
}
