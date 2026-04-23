import Link from 'next/link'
import React from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'gold' | 'light'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-navy text-off-white border border-navy hover:bg-charcoal hover:border-charcoal hover:shadow-lg',
  outline: 'bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-off-white hover:shadow-lg',
  ghost:   'bg-transparent text-navy border-0 hover:text-gold transition-colors hover:underline underline-offset-4',
  gold:    'bg-gradient-to-r from-gold to-gold-light text-navy border border-gold hover:shadow-lg hover:shadow-gold/30',
  light:   'bg-off-white text-navy border-2 border-off-white hover:bg-gold hover:text-navy hover:border-gold hover:shadow-lg',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-sm',
}

const base =
  'inline-flex items-center justify-center font-ui font-semibold uppercase transition-all duration-300 cursor-pointer select-none rounded-lg tracking-wider'

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
