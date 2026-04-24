const ITEMS = [
  'Free Shipping Nationwide',
  'New Arrivals — Shop Now',
  'Ready to Wear Collections',
  'Thoughtful Tailoring. Premium Fabrics.',
  'MALA By Kashmala — Founded 2026',
]

export function AnnouncementBar() {
  const segments = ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-6 px-6">
      {item}
      <span className="text-gold opacity-60" aria-hidden="true">◆</span>
    </span>
  ))

  return (
    <div
      className="h-8 overflow-hidden flex items-center select-none shrink-0 bg-navy"
      aria-label="Store announcements"
    >
      <div
        className="animate-marquee flex whitespace-nowrap font-ui text-off-white/70 text-[10px] tracking-[0.18em] uppercase"
        aria-hidden="true"
      >
        {segments}
        {segments}
      </div>
    </div>
  )
}
