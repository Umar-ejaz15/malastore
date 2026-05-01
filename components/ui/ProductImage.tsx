import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import type { SanityImage } from '@/types'

interface ProductImageProps {
  sanityImage?: SanityImage
  fallbackVariant?: string
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function ProductImage({
  sanityImage,
  fallbackVariant = 'warm-1',
  alt = '',
  className = '',
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  priority = false,
}: ProductImageProps) {
  if (sanityImage?.asset?._ref) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={urlFor(sanityImage).width(800).height(1066).fit('crop').auto('format').url()}
          alt={sanityImage.alt ?? alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    )
  }

  return <PlaceholderImage variant={fallbackVariant} className={className} />
}
