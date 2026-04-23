type BadgeVariant = 'new' | 'restock' | 'sale' | 'featured'

interface BadgeProps {
  variant: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  new:      'bg-brown text-mala-white',
  restock:  'bg-gold text-white',
  sale:     'bg-red-700 text-white',
  featured: 'bg-brown-mid text-mala-white',
}

const labels: Record<BadgeVariant, string> = {
  new:      'New In',
  restock:  'Restocked',
  sale:     'Sale',
  featured: 'Featured',
}

export function Badge({ variant, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-ui uppercase tracking-widest ${variantClasses[variant]} ${className}`}
    >
      {labels[variant]}
    </span>
  )
}
