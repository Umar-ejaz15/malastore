'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FiltersSidebar } from '@/components/store/FiltersSidebar'
import { ProductGrid } from '@/components/store/ProductGrid'
import type { Product, Category, FilterState } from '@/types'

const defaultFilters: FilterState = {
  categories: [],
  priceMin: 0,
  priceMax: 50000,
  fabrics: [],
  occasions: [],
}

const ITEMS_PER_PAGE = 12

interface ShopClientProps {
  products: Product[]
  categories: Category[]
}

function ShopContent({ products, categories }: ShopClientProps) {
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

  // Derive a filter key so page auto-resets when filters change (no useEffect needed)
  const filterKey = `${JSON.stringify(filters)}-${sortBy}-${categoryParam}-${filterParam}-${queryParam}`
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 })
  const page = pageState.key === filterKey ? pageState.page : 1

  const currentCategory = categoryParam
    ? categories.find((c) => c.slug === categoryParam)
    : null

  const filtered = useMemo(() => {
    let result = [...products]

    if (filterParam === 'new') result = result.filter((p) => p.isNew)

    if (queryParam) {
      const q = queryParam.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    const activeCats = (
      filters.categories.length > 0
        ? filters.categories
        : categoryParam
        ? [categoryParam]
        : []
    ).filter((c) => c !== 'ready-to-wear')

    if (activeCats.length > 0)
      result = result.filter((p) => activeCats.includes(p.categorySlug))

    if (filters.fabrics.length > 0) {
      const wanted = filters.fabrics.map((f) => f.toLowerCase())
      result = result.filter(
        (p) => p.fabric && wanted.includes(p.fabric.toLowerCase())
      )
    }

    if (filters.occasions.length > 0) {
      const wanted = filters.occasions.map((o) => o.toLowerCase())
      result = result.filter((p) =>
        p.occasions?.some((o) => wanted.includes(o.toLowerCase()))
      )
    }

    result = result.filter(
      (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
    )

    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest')     result.sort((a) => (a.isNew ? -1 : 1))

    return result
  }, [filters, sortBy, categoryParam, filterParam, queryParam, products])

  const totalPages     = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginatedItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const pageTitle =
    filterParam === 'new'
      ? 'New Arrivals'
      : currentCategory?.name ??
        (queryParam ? `Results for "${queryParam}"` : 'All Collections')

  const pageDesc =
    filterParam === 'new'
      ? 'The latest additions — clean silhouettes, thoughtful tailoring, and premium fabrics.'
      : currentCategory?.description ??
        'Ready-to-wear pieces designed for the modern Pakistani woman.'

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  const goToPage = (n: number) => {
    setPageState({ key: filterKey, page: n })
    scrollTop()
  }

  // Build visible page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '…')[] = []
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '…', totalPages)
    } else if (page >= totalPages - 3) {
      pages.push(1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '…', page - 1, page, page + 1, '…', totalPages)
    }
    return pages
  }, [page, totalPages])

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <Breadcrumb
          items={
            currentCategory
              ? [{ label: 'Collections', href: '/shop' }, { label: currentCategory.name }]
              : filterParam === 'new'
              ? [{ label: 'New Arrivals' }]
              : [{ label: 'Collections' }]
          }
        />

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
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-28">
            <FiltersSidebar
              onFilterChange={setFilters}
              currentFilters={filters}
            />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Controls bar */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-grey-light gap-4 flex-wrap">
              <p className="font-ui text-xs font-semibold text-grey uppercase tracking-widest">
                {filtered.length}{' '}
                {filtered.length === 1 ? 'Product' : 'Products'}
                {totalPages > 1 && (
                  <span className="ml-2 text-grey/50">
                    · Page {page}/{totalPages}
                  </span>
                )}
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

            {/* Active category filter chips */}
            {filters.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.categories.map((cat) => {
                  const c = categories.find((x) => x.slug === cat)
                  return c ? (
                    <button
                      key={cat}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          categories: prev.categories.filter((x) => x !== cat),
                        }))
                      }
                      className="inline-flex items-center gap-2 bg-navy/5 border border-navy/20 text-navy px-3 py-1.5 rounded-full font-ui text-xs uppercase tracking-wider hover:bg-navy/10 transition-all"
                    >
                      {c.name}
                      <span className="text-base leading-none">×</span>
                    </button>
                  ) : null
                })}
              </div>
            )}

            {/* Mobile filters */}
            {filtersOpen && (
              <div className="lg:hidden mb-8 px-5 py-4 border border-grey-light bg-white rounded-2xl shadow-sm">
                <FiltersSidebar
                  onFilterChange={setFilters}
                  currentFilters={filters}
                />
              </div>
            )}

            {/* Product grid */}
            <ProductGrid products={paginatedItems} columns={4} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center gap-4">
                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center gap-1.5 px-4 py-2.5 font-ui text-xs font-semibold uppercase tracking-widest border border-grey-light rounded-lg text-navy hover:border-navy transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Prev
                  </button>

                  {/* Page numbers */}
                  {pageNumbers.map((p, i) =>
                    p === '…' ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="w-9 h-9 flex items-center justify-center font-ui text-xs text-grey"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p as number)}
                        className={`w-9 h-9 flex items-center justify-center font-ui text-xs font-semibold rounded-lg border transition-all ${
                          page === p
                            ? 'page-active border-navy shadow-sm'
                            : 'border-grey-light text-navy hover:border-navy'
                        }`}
                        aria-label={`Page ${p}`}
                        aria-current={page === p ? 'page' : undefined}
                      >
                        {p}
                      </button>
                    )
                  )}

                  {/* Next */}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2.5 font-ui text-xs font-semibold uppercase tracking-widest border border-grey-light rounded-lg text-navy hover:border-navy transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    Next
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <p className="font-ui text-[10px] text-grey uppercase tracking-widest">
                  Showing{' '}
                  {(page - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)}{' '}
                  of {filtered.length} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ShopClient(props: ShopClientProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-display text-xl font-semibold text-navy">
            Loading collections…
          </p>
        </div>
      }
    >
      <ShopContent {...props} />
    </Suspense>
  )
}
