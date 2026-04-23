import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { SectionHeader } from '@/components/ui/SectionHeader'

const pillars = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Craftsmanship',
    text: 'Every garment bears the imprint of skilled artisans who have inherited their craft through generations. From hand-embroidered threadwork to block printing, we honour the makers behind each piece.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Heritage',
    text: "Pakistan's textile heritage spans millennia — from the indigo-dyed cotton of the Indus Valley to the resplendent Mughal court fabrics. Malā is a keeper of this living tradition.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    title: 'Modernity',
    text: 'We bring traditional artistry into the contemporary wardrobe — silhouettes that suit modern life, with the soul of something timeless. Fashion that bridges the past and the present.',
  },
]

const teamMembers = [
  { name: 'Sana Malik', role: 'Creative Director', imgVariant: 'warm-1' },
  { name: 'Zara Hussain', role: 'Head of Design', imgVariant: 'warm-3' },
  { name: 'Omer Ashraf', role: 'Brand Director', imgVariant: 'warm-5' },
]

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────── */}
      {/* HERO SECTION */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-hero" style={{ height: 560 }}>
        <div className="absolute inset-0">
          <PlaceholderImage variant="editorial-2" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <p className="font-ui text-gold uppercase mb-4 tracking-widest text-sm font-semibold">
            ✨ Our Story
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-bold text-off-white leading-tight max-w-4xl">
            Celebrating Heritage
          </h1>
          <p className="text-off-white/80 text-lg max-w-2xl mt-6">
            Bridging centuries of textile artistry with contemporary elegance.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* BRAND STORY */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-navy mb-8 leading-tight">
            Who We Are
          </h2>
        </div>
        
        <div className="space-y-8 text-lg leading-relaxed text-grey">
          <p className="text-xl font-light">
            Malā was born from a deep love for Pakistan's unparalleled textile heritage. Founded in Lahore in 2019, we set out with a singular vision: to create luxury fashion that speaks the language of our culture while dressing the modern Pakistani woman with the refinement she deserves.
          </p>
          <p className="text-xl font-light">
            Every collection we design is a journey — through the markets of Anarkali, the looms of Multan, the embroidery workshops of Sindh. We work directly with master artisans, ensuring that ancient techniques survive, flourish, and find their way into garments worn with pride across Pakistan and beyond.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* THREE PILLARS */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-soft py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-ui text-gold uppercase text-sm font-semibold tracking-widest mb-4">Our Foundation</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-navy">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center animate-fade-up p-8 rounded-xl bg-off-white border border-grey-light hover:shadow-lg transition-shadow duration-300">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-coral/20 flex items-center justify-center text-gold mb-6">
                  {p.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-navy mb-4">{p.title}</h3>
                <p className="font-body text-grey leading-relaxed text-base">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* FEATURED QUOTE */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy via-charcoal to-slate">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-6 py-3 rounded-full bg-gold/15 border border-gold/30 mb-8">
            <p className="font-ui text-gold text-xs font-semibold uppercase tracking-widest">Our Philosophy</p>
          </div>
          <p className="font-display text-4xl md:text-5xl font-bold text-off-white leading-tight mb-8">
            "Fashion is the mirror of our time, and in our hands, it becomes a celebration of where we come from."
          </p>
          <p className="font-ui text-gold text-sm uppercase tracking-widest font-semibold">
            — Malā Design Studio
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────── */}
      {/* TEAM SECTION */}
      {/* ─────────────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-ui text-gold uppercase text-sm font-semibold tracking-widest mb-4">Meet The Team</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-navy">
              The Minds Behind Malā
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-gold/20 group-hover:ring-gold/50 transition-all duration-300 mb-6">
                  <PlaceholderImage variant={member.imgVariant} />
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-2">{member.name}</h3>
                <p className="font-ui text-gold text-xs uppercase tracking-widest font-semibold">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
