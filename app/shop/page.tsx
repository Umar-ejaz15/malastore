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
  const searchParams  = useSearchParams()
  const categoryParam = searchParams.get('category') ?? ''
  const filterParam   = searchParams.get('filter') ?? ''
  const queryParam    = searchParams.get('q') ?? ''

  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    categories: categoryParam ? [categoryParam] : [],
  })
  const [sortBy, setSortBy]           = useState('newest')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const currentCategory = categoryParam ? categories.find((c) => c.slug === categoryParam) : null

  const filtered = useMemo(() => {
    let result = [...products]

    if (filterParam === 'new') result = result.filter((p) => p.isNew)

    if (queryParam) {
      const q = queryParam.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    }

    const activeCats = filters.categories.length > 0 ? filters.categories : categoryParam ? [categoryParam] : []
    if (activeCats.length > 0) result = result.filter((p) => activeCats.includes(p.categorySlug))

    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax)

    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest')     result.sort((a) => (a.isNew ? -1 : 1))

    return result
  }, [filters, sortBy, categoryParam, filterParam, queryParam])

  const pageTitle =
    filterParam === 'new'   ? 'New Arrivals' :
    currentCategory?.name  ?? (queryParam ? `Results for "${queryParam}"` : 'All Collections')

  const pageDesc =
    filterParam === 'new'
      ? 'The latest additions — clean silhouettes, thoughtful tailoring, and premium fabrics.'
      : currentCategory?.description
      ?? 'Ready-to-wear pieces designed for the modern Pakistani woman.'

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">

        <Breadcrumb items={
          currentCategory
            ? [{ label: 'Collections', href: '/shop' }, { label: currentCategory.name }]
            : filterParam === 'new'
            ? [{ label: 'New Arrivals' }]
            : [{ label: 'Collections' }]
        } />

        <div className="mt-10 mb-10">
          <p className="font-ui text-xs font-semibold text-gold uppercase tracking-widest mb-3">
            {filterParam === 'new' ? 'New In' : 'Browse'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy leading-tight mb-3">
            {pageTitle}
          </h1>
          <p className="text-grey text-base max-w-2xl">{pageDesc}</p>
        </div>

        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0 sticky top-28">
            <div className="bg-beige/30 rounded-xl p-6 border border-grey-light">
              <FiltersSidebar onFilterChange={setFilters} currentFilters={filters} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">

            {/* Controls */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-grey-light gap-4 flex-wrap">
              <p className="font-ui text-xs font-semibold text-grey uppercase tracking-widest">
                {filtered.length} {filtered.length === 1 ? 'Product' : 'Products'}
              </p>

              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden px-4 py-2 bg-navy text-white font-ui text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-charcoal transition-colors"
                  onClick={() => setFiltersOpen((v) => !v)}
                >
                  {filtersOpen ? 'Close' : 'Filter'}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-grey-light text-navy font-ui text-sm focus:outline-none focus:border-gold cursor-pointer px-4 py-2.5 rounded-lg transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active filters */}
            {filters.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.categories.map((cat) => {
                  const c = categories.find((x) => x.slug === cat)
                  return c ? (
                    <button
                      key={cat}
                      onClick={() => setFilters((prev) => ({ ...prev, categories: prev.categories.filter((x) => x !== cat) }))}
                      className="inline-flex items-center gap-2 bg-navy/5 border border-navy/20 text-navy px-3 py-1.5 rounded-full font-ui text-xs uppercase tracking-wider hover:bg-navy/10 transition-all"
                    >
                      {c.name} <span className="text-base leading-none">×</span>
                    </button>
                  ) : null
                })}
              </div>
            )}

            {/* Mobile filters */}
            {filtersOpen && (
              <div className="lg:hidden mb-8 p-6 border border-grey-light bg-beige/20 rounded-xl">
                <FiltersSidebar onFilterChange={setFilters} currentFilters={filters} />
              </div>
            )}

            <ProductGrid products={filtered} columns={4} />

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-display text-2xl font-semibold text-navy mb-2">No products found</p>
                <p className="text-grey text-sm">Try adjusting your filters or search terms</p>
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
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-display text-xl font-semibold text-navy">Loading collections…</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
