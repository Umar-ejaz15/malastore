import Link from 'next/link'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

interface LookbookCardProps {
  title: string
  imgVariant: string
  href?: string
}

export function LookbookCard({ title, imgVariant, href = '/shop' }: LookbookCardProps) {
  return (
    <Link
      href={href}
      className="group block relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Image fills card */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
        <PlaceholderImage variant={imgVariant} />
      </div>

      {/* Persistent gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,18,16,0.7) 0%, transparent 55%)' }}
      />

      {/* Label at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-5 pl-5 pr-5">
        <p className="font-ui font-semibold text-mala-white" style={{ fontSize: 11, letterSpacing: '0.22em' }}>
          {title.toUpperCase()}
        </p>
        <span
          className="block mt-2 h-px bg-gold-pale transition-all duration-500 ease-out"
          style={{ width: 24 }}
          data-line
        />
      </div>

      {/* Line expansion on hover via CSS group */}
      <style>{`
        a:hover [data-line] { width: 40px !important; }
      `}</style>
    </Link>
  )
}
