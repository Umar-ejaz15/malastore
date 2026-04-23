'use client'

import { useState } from 'react'
import type { FilterState } from '@/types'

interface FiltersSidebarProps {
  onFilterChange: (filters: FilterState) => void
  currentFilters: FilterState
}

const categoryOptions = [
  { slug: 'luxury-lawn', label: 'Luxury Lawn' },
  { slug: 'unstitched-summer', label: 'Unstitched Summer' },
  { slug: 'formals', label: 'Formals' },
  { slug: 'ready-to-wear', label: 'Ready To Wear' },
]

const fabricOptions = ['Lawn', 'Chiffon', 'Silk', 'Organza', 'Cotton', 'Velvet']
const occasionOptions = ['Casual', 'Formal', 'Wedding', 'Party', 'Everyday']

export function FiltersSidebar({ onFilterChange, currentFilters }: FiltersSidebarProps) {
  const [expanded, setExpanded] = useState({ category: true, price: true, fabric: false, occasion: false })

  const toggle = (section: keyof typeof expanded) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))

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

  const SectionToggle = ({ label, section }: { label: string; section: keyof typeof expanded }) => (
    <button
      onClick={() => toggle(section)}
      className="flex items-center justify-between w-full py-3 font-ui text-xs uppercase tracking-widest text-brown border-b border-beige"
    >
      {label}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={`transition-transform duration-200 ${expanded[section] ? 'rotate-180' : ''}`}
      >
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )

  return (
    <aside className="w-56 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-ui text-xs uppercase tracking-widest text-brown">Filter</h2>
        <button
          onClick={() => onFilterChange({ categories: [], priceMin: 0, priceMax: 50000, fabrics: [], occasions: [] })}
          className="font-ui text-[10px] uppercase tracking-wider text-brown-light hover:text-gold transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <SectionToggle label="Category" section="category" />
      {expanded.category && (
        <div className="py-3 flex flex-col gap-2.5">
          {categoryOptions.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentFilters.categories.includes(cat.slug)}
                onChange={() => handleCategory(cat.slug)}
                className="accent-gold w-3.5 h-3.5 cursor-pointer"
              />
              <span className="font-body text-sm text-brown group-hover:text-gold transition-colors">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Price */}
      <SectionToggle label="Price Range" section="price" />
      {expanded.price && (
        <div className="py-3 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <p className="font-ui text-[10px] uppercase tracking-wider text-brown-light mb-1">Min</p>
              <input
                type="number"
                value={currentFilters.priceMin}
                onChange={(e) => onFilterChange({ ...currentFilters, priceMin: Number(e.target.value) })}
                className="w-full border border-beige bg-ivory text-brown font-body text-sm px-2 py-1.5 focus:outline-none focus:border-gold transition-colors"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <p className="font-ui text-[10px] uppercase tracking-wider text-brown-light mb-1">Max</p>
              <input
                type="number"
                value={currentFilters.priceMax}
                onChange={(e) => onFilterChange({ ...currentFilters, priceMax: Number(e.target.value) })}
                className="w-full border border-beige bg-ivory text-brown font-body text-sm px-2 py-1.5 focus:outline-none focus:border-gold transition-colors"
                placeholder="50000"
              />
            </div>
          </div>
        </div>
      )}

      {/* Fabric */}
      <SectionToggle label="Fabric" section="fabric" />
      {expanded.fabric && (
        <div className="py-3 flex flex-col gap-2.5">
          {fabricOptions.map((fab) => (
            <label key={fab} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentFilters.fabrics.includes(fab)}
                onChange={() => handleFabric(fab)}
                className="accent-gold w-3.5 h-3.5 cursor-pointer"
              />
              <span className="font-body text-sm text-brown group-hover:text-gold transition-colors">{fab}</span>
            </label>
          ))}
        </div>
      )}

      {/* Occasion */}
      <SectionToggle label="Occasion" section="occasion" />
      {expanded.occasion && (
        <div className="py-3 flex flex-col gap-2.5">
          {occasionOptions.map((occ) => (
            <label key={occ} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={currentFilters.occasions.includes(occ)}
                onChange={() => handleOccasion(occ)}
                className="accent-gold w-3.5 h-3.5 cursor-pointer"
              />
              <span className="font-body text-sm text-brown group-hover:text-gold transition-colors">{occ}</span>
            </label>
          ))}
        </div>
      )}
    </aside>
  )
}
