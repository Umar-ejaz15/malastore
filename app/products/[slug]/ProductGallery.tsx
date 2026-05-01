'use client'

import { useState } from 'react'
import { ProductImage } from '@/components/ui/ProductImage'
import type { SanityImage } from '@/types'

interface ProductGalleryProps {
  sanityImages?: SanityImage[]
  fallbackImages: string[]
  videoUrl?: string
  productName: string
  isNew?: boolean
  isRestocked?: boolean
}

export function ProductGallery({
  sanityImages,
  fallbackImages,
  videoUrl,
  productName,
  isNew,
  isRestocked,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const galleryLength = (sanityImages?.length ?? 0) > 0
    ? Math.min(sanityImages!.length, 4)
    : Math.min(fallbackImages.length, 4)

  return (
    <div className="flex flex-col gap-3">

      {/* Main image */}
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-beige shadow-md">
        {showVideo && videoUrl ? (
          <div className="w-full h-full relative bg-navy/95 flex items-center justify-center">
            <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-navy hover:bg-white transition-colors"
              aria-label="Close video"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="w-full h-full transition-transform duration-700 ease-out hover:scale-105">
              <ProductImage
                sanityImage={sanityImages?.[activeIndex]}
                fallbackVariant={fallbackImages[activeIndex] ?? 'warm-1'}
                alt={`${productName} — photo ${activeIndex + 1}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={activeIndex === 0}
              />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {isNew && (
                <span className="bg-navy text-white font-ui font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                  New In
                </span>
              )}
              {isRestocked && (
                <span className="bg-emerald text-white font-ui font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                  Restocked
                </span>
              )}
            </div>

            {/* Navigation arrows on hover */}
            {galleryLength > 1 && (
              <>
                <button
                  onClick={() => setActiveIndex((i) => (i - 1 + galleryLength) % galleryLength)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-sm"
                  aria-label="Previous image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveIndex((i) => (i + 1) % galleryLength)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-sm"
                  aria-label="Next image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-navy/60 backdrop-blur-sm text-white font-ui text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {galleryLength}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className={`grid gap-2 ${videoUrl ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {Array.from({ length: galleryLength }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setShowVideo(false) }}
            className={`aspect-square overflow-hidden rounded-xl ring-1.5 transition-all duration-200 hover:ring-gold ${
              !showVideo && i === activeIndex
                ? 'ring-2 ring-navy shadow-sm'
                : 'ring-grey-light/60'
            }`}
            aria-label={`View photo ${i + 1} of ${productName}`}
          >
            <ProductImage
              sanityImage={sanityImages?.[i]}
              fallbackVariant={fallbackImages[i] ?? 'warm-1'}
              alt={`${productName} thumbnail ${i + 1}`}
              sizes="10vw"
            />
          </button>
        ))}

        {videoUrl && (
          <button
            onClick={() => setShowVideo(true)}
            className={`aspect-square overflow-hidden rounded-xl ring-1.5 flex items-center justify-center transition-all duration-200 hover:ring-gold ${
              showVideo ? 'ring-2 ring-navy bg-navy/90' : 'ring-grey-light/60 bg-navy/80'
            }`}
            aria-label="Play product video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
