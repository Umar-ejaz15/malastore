interface SectionHeaderProps {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ eyebrow, title, align = 'center', className = '' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="font-ui text-xs uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-navy font-semibold leading-tight">
        {title}
      </h2>
      <div
        className={`mt-2 h-px bg-gold ${align === 'center' ? 'self-center' : 'self-start'}`}
        style={{ width: 50 }}
      />
    </div>
  )
}
