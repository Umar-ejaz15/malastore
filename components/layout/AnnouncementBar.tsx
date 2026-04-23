const ITEMS = [
  'Free Shipping Nationwide',
  'New Arrivals',
  'Shop Eid Collection 2026',
  'Ready To Wear',
  'For International Orders Visit Malā Global',
  'Luxury Lawn Now Live',
]

export function AnnouncementBar() {
  const segments = ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-5 px-5">
      {item}
      <span className="text-gold-dark" style={{ fontSize: 7 }} aria-hidden="true">◆</span>
    </span>
  ))

  return (
    <div
      className="h-9 overflow-hidden flex items-center select-none shrink-0"
      style={{ background: '#1A1210' }}
      aria-label="Store announcements"
    >
      <div
        className="animate-marquee flex whitespace-nowrap font-ui text-sand-dark"
        style={{ letterSpacing: '0.2em', fontSize: 10 }}
        aria-hidden="true"
      >
        {segments}
        {segments}
      </div>
    </div>
  )
}
