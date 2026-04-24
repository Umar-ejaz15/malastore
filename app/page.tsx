import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Button } from '@/components/ui/Button'
import { FeatureStrip } from '@/components/store/FeatureStrip'
import { CategoryCard } from '@/components/store/CategoryCard'
import { LookbookCard } from '@/components/store/LookbookCard'
import { ProductGrid } from '@/components/store/ProductGrid'
import { NewsletterSection } from '@/components/store/NewsletterSection'
import { categories, getFeaturedProducts } from '@/lib/data'

export default function HomePage() {
  const featured = getFeaturedProducts(5)

  const lookbookItems = [
    { title: 'The Art of Embroidery',   imgVariant: 'dark-1' },
    { title: 'Summer in Lahore',        imgVariant: 'dark-2' },
    { title: 'Mughal Garden Mornings',  imgVariant: 'dark-3' },
    { title: 'The Eid Edit 2026',       imgVariant: 'dark-4' },
  ]

  return (
    <>
      {/* ────────────────────────────────────────────────────────────────── */}
      {/* HERO SECTION — Bold, Modern, High-Impact */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: '100vh', minHeight: 600 }}>
        <div className="absolute inset-0">
          <PlaceholderImage variant="hero" />
        </div>

        {/* Dynamic gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-navy/40 via-navy/20 to-navy/60" />
        <div className="absolute inset-0 bg-linear-to-r from-navy/30 to-transparent" />

        {/* Content — Centered with modern typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          {/* Eyebrow label */}
          <div className="mb-6 animate-fade-up">
            <span className="inline-block px-4 py-2 bg-gold/15 backdrop-blur rounded-full border border-gold/30">
              <p className="font-ui text-xs font-semibold text-gold uppercase tracking-widest">
                New Arrivals — 2026
              </p>
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-off-white leading-tight mb-6 animate-fade-up delay-100 max-w-4xl">
            Quiet Confidence.<br />Intentional Design.
          </h1>

          {/* Subheading */}
          <p className="font-body text-lg md:text-xl text-off-white/80 max-w-2xl mb-12 animate-fade-up delay-200 leading-relaxed">
            Ready-to-wear collections for the woman who values simplicity, yet refuses to be overlooked.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <Button href="/shop" variant="light" size="lg" className="px-8">
              Explore Collection
            </Button>
            <Button href="/about" variant="outline" size="lg" className="px-8 border-off-white text-off-white hover:bg-off-white/10">
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-off-white/50 text-xs uppercase tracking-widest font-ui">Scroll to explore</p>
          <div className="flex flex-col items-center gap-1">
            <div className="w-0.5 h-12 bg-linear-to-b from-gold to-transparent" />
            <svg className="w-5 h-5 text-off-white/50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* FEATURE STRIP — Fast Facts */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <FeatureStrip />

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* CATEGORIES — Modern Grid Layout */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="mb-16">
          <p className="font-ui text-sm font-semibold text-gold uppercase tracking-widest mb-3">Shop By Style</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            Collections
          </h2>
          <p className="text-grey max-w-2xl text-lg">
            Ready-to-wear pieces designed for the modern Pakistani woman — clean, refined, and enduring.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <div key={cat.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* NEWSLETTER — Modern CTA */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <NewsletterSection />

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* LOOKBOOK — Editorial Grid */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <p className="font-ui text-sm font-semibold text-gold uppercase tracking-widest mb-3">Visual Stories</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
            The Lookbook
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 md:gap-2">
          {lookbookItems.map((item, i) => (
            <div key={item.title} className="animate-scale-up" style={{ animationDelay: `${i * 100}ms` }}>
              <LookbookCard title={item.title} imgVariant={item.imgVariant} href="/shop" />
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* TRENDING — Top Products */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="mb-16">
          <p className="font-ui text-sm font-semibold text-gold uppercase tracking-widest mb-3">New In</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy mb-4">
            New Arrivals
          </h2>
        </div>

        <div className="mb-12">
          <ProductGrid products={featured} columns={5} />
        </div>

        <div className="flex justify-center">
          <Button href="/shop" variant="outline" size="lg" className="px-12 py-3 border-navy text-navy hover:bg-navy hover:text-off-white">
            View All Collections
          </Button>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────── */}
      {/* CLOSING CTA — Modern Banner */}
      {/* ────────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-12">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-navy via-charcoal to-slate p-12 md:p-20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -mr-48 -mt-48 blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-4 max-w-2xl">
              Dressed With Purpose
            </h3>
            <p className="text-off-white/70 text-lg mb-8 max-w-2xl">
              Effortless, refined, and enduring — pieces made for the woman who moves through her day with quiet confidence.
            </p>
            <Button href="/shop" variant="light" size="lg" className="px-10">
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
