import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

const pillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Intentional Design',
    text: 'Clean silhouettes, thoughtful tailoring, and premium fabrics — each piece is created with restraint and meaning. We design for the woman who moves through her day with purpose, balancing ambition, grace, and individuality.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/>
      </svg>
    ),
    title: 'Quiet Luxury',
    text: 'At MALA, luxury does not need to be loud. It lives in the details — in the fall of a fabric, in the precision of a cut, in the quiet beauty of something well made. Simplicity is our signature.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: 'Rooted in Heritage',
    text: "From delicately printed pieces to finely executed embroidery — both machine and hand-crafted techniques inspired by Pakistan's rich heritage such as kachha dhaga — every design honors the past while preserving a modern sensibility.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero" style={{ height: 600 }}>
        <div className="absolute inset-0">
          <PlaceholderImage variant="editorial-2" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/50 to-navy/10" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="font-ui text-gold uppercase mb-5 tracking-widest text-xs font-semibold">
            Our Story
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-off-white leading-tight max-w-3xl">
            MALA By Kashmala
          </h1>
          <p className="text-off-white/70 text-base md:text-lg max-w-xl mt-6 leading-relaxed font-body">
            Born from a deep love for timeless elegance — a vision to redefine modern Pakistani wear through quiet confidence and intentional design.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="mb-14">
          <p className="font-ui text-gold uppercase text-xs font-semibold tracking-widest mb-4">Who We Are</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy leading-tight">
            About MALA By Kashmala
          </h2>
        </div>

        <div className="space-y-7 text-grey leading-relaxed">
          <p className="text-lg font-light">
            MALA By Kashmala was born from a deep love for timeless elegance and founded in 2026 — a vision to redefine modern Pakistani wear through quiet confidence and intentional design.
          </p>
          <p className="text-lg font-light">
            We create for the woman who values simplicity, yet refuses to be overlooked. The woman who moves through her day with purpose — balancing ambition, grace, and individuality. Our pieces are designed to complement her rhythm: effortless, refined, and enduring.
          </p>
          <p className="text-lg font-light">
            Rooted in minimalism, our ready-to-wear collections focus on clean silhouettes, thoughtful tailoring, and premium fabrics. From understated solids to delicately printed pieces and finely executed embroidery — both machine and hand-crafted techniques inspired by Pakistan's rich heritage such as kachha dhaga — every design is created with restraint and meaning.
          </p>
          <p className="text-lg font-light">
            At MALA, we believe luxury does not need to be loud. It lives in the details — in the fall of a fabric, in the precision of a cut, in the quiet beauty of something well made.
          </p>
          <p className="text-lg font-light">
            As we grow, our journey will expand into more traditional expressions of Pakistani craftsmanship — from flowing maxis and long frocks to lehengas, ghararas, and shararas — honoring heritage while preserving our signature modern sensibility.
          </p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="bg-gradient-soft py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-ui text-gold uppercase text-xs font-semibold tracking-widest mb-4">Our Foundation</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex flex-col items-center text-center animate-fade-up p-10 rounded-2xl bg-off-white border border-grey-light hover:shadow-xl transition-shadow duration-400"
              >
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-gold/15 to-gold/5 flex items-center justify-center text-gold mb-7">
                  {p.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-4">{p.title}</h3>
                <p className="font-body text-grey leading-relaxed text-sm">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING PHILOSOPHY QUOTE */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-navy via-charcoal to-slate">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-6 py-2.5 rounded-full bg-gold/15 border border-gold/30 mb-10">
            <p className="font-ui text-gold text-xs font-semibold uppercase tracking-widest">Our Philosophy</p>
          </div>
          <p className="font-display text-3xl md:text-4xl font-bold text-off-white leading-relaxed mb-10">
            "MALA By Kashmala is not just clothing.<br />
            It is a feeling — of confidence, of softness,<br />
            of strength in simplicity."
          </p>
          <p className="font-ui text-gold text-xs uppercase tracking-widest font-semibold">
            — Kashmala, Founder
          </p>
        </div>
      </section>
    </>
  )
}
