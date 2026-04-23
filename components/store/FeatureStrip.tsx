const features = [
  {
    label: 'Free Shipping',
    sub:   'Nationwide delivery',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 4v4h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/>
      </svg>
    ),
  },
  {
    label: 'International Orders',
    sub:   'Delivered worldwide',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2c-2.76 3.33-4 6.67-4 10s1.24 6.67 4 10M12 2c2.76 3.33 4 6.67 4 10s-1.24 6.67-4 10"/>
      </svg>
    ),
  },
  {
    label: 'Easy Returns',
    sub:   'Hassle-free exchange',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12A9 9 0 1 1 3.5 6.5"/><path d="M3 3v4h4"/>
      </svg>
    ),
  },
  {
    label: 'Secure Payment',
    sub:   '100% safe checkout',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

export function FeatureStrip() {
  return (
    <div className="bg-beige border-y border-sand/60 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.label}
              className={`flex items-start gap-4 px-6 py-2 ${i < features.length - 1 ? 'border-r border-sand' : ''}`}
            >
              <div className="text-gold-dark shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <p className="font-ui font-bold text-brown" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
                  {f.label}
                </p>
                <p className="font-body text-brown-light mt-0.5" style={{ fontSize: 13 }}>
                  {f.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
