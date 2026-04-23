'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FiltersSidebar } from '@/components/store/FiltersSidebar'
import { ProductGrid } from '@/components/store/ProductGrid'
import { products, categories } from '@/lib/data'
import type { FilterState } from '@/types'

const defaultFilters: FilterState = { categories: [], priceMin: 0, priceMax: 50000, fabrics: [], occasions: [] }

function ShopContent() {
  const searchParams    = useSearchParams()
  const categoryParam   = searchParams.get('category') ?? ''
  const queryParam      = searchParams.get('q') ?? ''

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    categories: categoryParam ? [categoryParam] : [],
  })
  const [sortBy, setSortBy]         = useState('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const currentCategory = categoryParam ? categories.find((c) => c.slug === categoryParam) : null

  const filtered = useMemo(() => {
    let result = [...products]
    if (queryParam) {
      const q = queryParam.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }
    const activeCats = filters.categories.length > 0 ? filters.categories : categoryParam ? [categoryParam] : []
    if (activeCats.length > 0) result = result.filter((p) => activeCats.includes(p.categorySlug))
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax)
    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest')     result.sort((a) => (a.isNew ? -1 : 1))
    return result
  }, [filters, sortBy, categoryParam, queryParam])

  const pageTitle = currentCategory?.name ?? (queryParam ? `Search: "${queryParam}"` : 'All Collections')

  return (
    <div className="bg-gradient-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">

        {/* Breadcrumb */}
        <Breadcrumb items={
          currentCategory
            ? [{ label: 'Shop', href: '/shop' }, { label: currentCategory.name }]
            : [{ label: 'Shop' }]
        } />

        {/* Page Header */}
        <div className="mt-12 mb-12">
          <p className="font-ui text-sm font-semibold text-gold uppercase tracking-widest mb-3">Browse</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy leading-tight mb-4">
            {pageTitle}
          </h1>
          <p className="text-grey max-w-2xl text-lg">
            Discover our curated selection of luxury pieces, each handpicked for quality and style.
          </p>
        </div>

        <div className="flex gap-8 items-start">

          {/* Sidebar — Desktop */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-32">
            <div className="bg-off-white rounded-xl p-6 border border-grey-light shadow-sm">
              <FiltersSidebar onFilterChange={setFilters} currentFilters={filters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-grey-light gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <p className="font-ui text-sm font-semibold text-grey uppercase tracking-wider">
                  {filtered.length} {filtered.length === 1 ? 'Product' : 'Products'}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden px-4 py-2 bg-navy text-off-white font-ui text-xs font-semibold uppercase border border-navy rounded-lg hover:bg-charcoal transition-colors tracking-wider"
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  {filtersOpen ? '✕ Close Filters' : '⧉ Filters'}
                </button>

                {/* Sort dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-off-white border border-grey-light text-navy font-ui focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 cursor-pointer px-4 py-2.5 transition-all rounded-lg text-sm font-semibold"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(filters.categories.length > 0 || queryParam) && (
              <div className="flex flex-wrap gap-2 mb-8">
                {queryParam && (
                  <span className="inline-flex items-center gap-2 bg-navy text-off-white px-4 py-2 rounded-full font-ui text-xs font-semibold uppercase tracking-wider">
                    🔍 {queryParam}
                  </span>
                )}
                {filters.categories.map((cat) => {
                  const c = categories.find((x) => x.slug === cat)
                  return c ? (
                    <button
                      key={cat}
                      onClick={() => setFilters((prev) => ({ ...prev, categories: prev.categories.filter((x) => x !== cat) }))}
                      className="inline-flex items-center gap-2 bg-gold/10 border border-gold text-navy px-4 py-2 rounded-full font-ui text-xs font-semibold uppercase hover:bg-gold/20 transition-all tracking-wider"
                    >
                      {c.name}
                      <span className="ml-1 text-lg leading-none">×</span>
                    </button>
                  ) : null
                })}
              </div>
            )}

            {/* Mobile Filters */}
            {filtersOpen && (
              <div className="lg:hidden mb-8 p-6 border border-grey-light bg-off-white rounded-xl shadow-sm">
                <FiltersSidebar onFilterChange={setFilters} currentFilters={filters} />
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid products={filtered} columns={4} />

            {/* No Results */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-2xl font-bold text-navy mb-2">No products found</h3>
                <p className="text-grey">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="animate-spin inline-block">
          <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="font-display text-xl text-navy mt-4">Loading collections…</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
