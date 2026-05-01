'use client'

import { useState } from 'react'
import type { FilterState } from '@/types'

interface FiltersSidebarProps {
  onFilterChange: (filters: FilterState) => void
  currentFilters: FilterState
}

const categoryOptions = [
  { slug: 'luxury-lawn',    label: 'Luxury Lawn' },
  { slug: 'ready-to-wear',  label: 'Ready to Wear' },
  { slug: 'formals',        label: 'Formals' },
]

const fabricOptions   = ['Lawn', 'Chiffon', 'Silk', 'Organza', 'Cotton', 'Velvet', 'Linen']
const occasionOptions = ['Casual', 'Formal', 'Wedding', 'Party', 'Everyday', 'Eid']

const PRICE_PRESETS = [
  { label: 'Under Rs. 7,000',  min: 0,     max: 7000  },
  { label: 'Rs. 7,000–12,000', min: 7000,  max: 12000 },
  { label: 'Rs. 12,000–18,000',min: 12000, max: 18000 },
  { label: 'Rs. 18,000+',      min: 18000, max: 50000 },
]

export function FiltersSidebar({ onFilterChange, currentFilters }: FiltersSidebarProps) {
  const [expanded, setExpanded] = useState({
    category: true,
    price:    false,
    fabric:   false,
    occasion: false,
  })

  const toggle = (s: keyof typeof expanded) =>
    setExpanded((p) => ({ ...p, [s]: !p[s] }))

  const handleCategory = (slug: string) => {
    const cats = currentFilters.categories.includes(slug)
      ? currentFilters.categories.filter((c) => c !== slug)
      : [...currentFilters.categories, slug]
    onFilterChange({ ...currentFilters, categories: cats })
  }

  const handleFabric = (fab: string) => {
    const fabs = currentFilters.fabrics.includes(fab)
      ? currentFilters.fabrics.filter((f) => f !== fab)
      : [...currentFilters.fabrics, fab]
    onFilterChange({ ...currentFilters, fabrics: fabs })
  }

  const handleOccasion = (occ: string) => {
    const occs = currentFilters.occasions.includes(occ)
      ? currentFilters.occasions.filter((o) => o !== occ)
      : [...currentFilters.occasions, occ]
    onFilterChange({ ...currentFilters, occasions: occs })
  }

  const handlePricePreset = (min: number, max: number) => {
    onFilterChange({ ...currentFilters, priceMin: min, priceMax: max })
  }

  const isPresetActive = (min: number, max: number) =>
    currentFilters.priceMin === min && currentFilters.priceMax === max

  const activeFilterCount =
    currentFilters.categories.length +
    currentFilters.fabrics.length +
    currentFilters.occasions.length +
    (currentFilters.priceMin > 0 || currentFilters.priceMax < 50000 ? 1 : 0)

  const clearAll = () =>
    onFilterChange({ categories: [], priceMin: 0, priceMax: 50000, fabrics: [], occasions: [] })

  // ── Section header ──────────────────────────────────────────────────
  function Section({
    label,
    sectionKey,
    count,
  }: {
    label: string
    sectionKey: keyof typeof expanded
    count?: number
  }) {
    return (
      <button
        onClick={() => toggle(sectionKey)}
        className="flex items-center justify-between w-full py-3.5 group"
      >
        <div className="flex items-center gap-2">
          <span className="font-ui text-[10px] font-semibold uppercase tracking-widest text-navy">
            {label}
          </span>
          {count != null && count > 0 && (
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-gold text-navy font-ui font-bold text-[8px]">
              {count}
            </span>
          )}
        </div>
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          className={`text-grey transition-transform duration-200 ${expanded[sectionKey] ? 'rotate-180' : ''}`}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    )
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="font-ui text-xs font-semibold uppercase tracking-widest text-navy">Filter</span>
          {activeFilterCount > 0 && (
            <span className="font-ui text-[9px] font-bold bg-navy text-white px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="font-ui text-[10px] uppercase tracking-wider text-grey hover:text-gold transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* ── Category ──────────────────────────────────────────────── */}
      <div className="border-t border-grey-light">
        <Section label="Category" sectionKey="category" count={currentFilters.categories.length} />
        {expanded.category && (
          <div className="pb-4 flex flex-col gap-1">
            {categoryOptions.map((cat) => {
              const active = currentFilters.categories.includes(cat.slug)
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategory(cat.slug)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-navy text-white'
                      : 'text-navy/70 hover:bg-beige/60 hover:text-navy'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    active ? 'bg-gold border-gold' : 'border-grey-light'
                  }`}>
                    {active && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 4L3 6L7 2" stroke="#0F1419" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="font-body text-sm">{cat.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Price Range ────────────────────────────────────────────── */}
      <div className="border-t border-grey-light">
        <Section
          label="Price Range"
          sectionKey="price"
          count={currentFilters.priceMin > 0 || currentFilters.priceMax < 50000 ? 1 : 0}
        />
        {expanded.price && (
          <div className="pb-4 flex flex-col gap-1.5">
            {PRICE_PRESETS.map((p) => {
              const active = isPresetActive(p.min, p.max)
              return (
                <button
                  key={p.label}
                  onClick={() => handlePricePreset(p.min, p.max)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    active ? 'bg-navy text-white' : 'text-navy/70 hover:bg-beige/60 hover:text-navy'
                  }`}
                >
                  <span className="font-body text-sm">{p.label}</span>
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              )
            })}

            {/* Custom range */}
            <div className="mt-2 px-1">
              <p className="font-ui text-[9px] uppercase tracking-widest text-grey mb-2">Custom Range</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={currentFilters.priceMin}
                  onChange={(e) => onFilterChange({ ...currentFilters, priceMin: Number(e.target.value) })}
                  className="flex-1 border border-grey-light bg-white text-navy font-body text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  placeholder="Min"
                />
                <span className="text-grey text-xs">—</span>
                <input
                  type="number"
                  value={currentFilters.priceMax}
                  onChange={(e) => onFilterChange({ ...currentFilters, priceMax: Number(e.target.value) })}
                  className="flex-1 border border-grey-light bg-white text-navy font-body text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Fabric ────────────────────────────────────────────────── */}
      <div className="border-t border-grey-light">
        <Section label="Fabric" sectionKey="fabric" count={currentFilters.fabrics.length} />
        {expanded.fabric && (
          <div className="pb-4 flex flex-wrap gap-2">
            {fabricOptions.map((fab) => {
              const active = currentFilters.fabrics.includes(fab)
              return (
                <button
                  key={fab}
                  onClick={() => handleFabric(fab)}
                  className={`font-ui text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    active
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-navy/60 border-grey-light hover:border-navy hover:text-navy'
                  }`}
                >
                  {fab}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Occasion ──────────────────────────────────────────────── */}
      <div className="border-t border-grey-light">
        <Section label="Occasion" sectionKey="occasion" count={currentFilters.occasions.length} />
        {expanded.occasion && (
          <div className="pb-4 flex flex-wrap gap-2">
            {occasionOptions.map((occ) => {
              const active = currentFilters.occasions.includes(occ)
              return (
                <button
                  key={occ}
                  onClick={() => handleOccasion(occ)}
                  className={`font-ui text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    active
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-navy/60 border-grey-light hover:border-navy hover:text-navy'
                  }`}
                >
                  {occ}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="border-t border-grey-light" />
    </div>
  )
}
