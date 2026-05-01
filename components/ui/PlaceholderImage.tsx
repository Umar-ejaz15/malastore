interface PaletteEntry {
  bg: string
  weave: string
  vignette: string
  motif: string
}

const PALETTE: Record<string, PaletteEntry> = {
  hero: {
    bg: 'radial-gradient(ellipse at 38% 28%, #F5E8C2 0%, #D9C080 22%, #C4A040 44%, #9A7018 66%, #6B4A0E 84%, #4A3008 100%)',
    weave: '#8B6914', vignette: '#4A3008', motif: '#8B6914',
  },
  'warm-1': {
    bg: 'radial-gradient(ellipse at 32% 22%, #FBF0E4 0%, #EDD8BC 26%, #D8C4A0 48%, #BCA07E 68%, #9A8060 84%, #7A6248 100%)',
    weave: '#9A8060', vignette: '#7A6248', motif: '#8B7255',
  },
  'warm-2': {
    bg: 'radial-gradient(ellipse at 35% 25%, #F8ECD8 0%, #E4CCA8 26%, #CEB484 48%, #B09068 68%, #8C7050 84%, #6A5035 100%)',
    weave: '#8C7050', vignette: '#6A5035', motif: '#8B6A45',
  },
  'warm-3': {
    bg: 'radial-gradient(ellipse at 30% 20%, #F4E4CC 0%, #DDC4A0 26%, #C4A878 48%, #A88C5C 68%, #8A7044 84%, #6A5030 100%)',
    weave: '#8A7044', vignette: '#6A5030', motif: '#7A6035',
  },
  'warm-4': {
    bg: 'radial-gradient(ellipse at 36% 24%, #F8EDDC 0%, #E8D0B0 26%, #D0B488 48%, #B4906A 68%, #90704C 84%, #6C5030 100%)',
    weave: '#90704C', vignette: '#6C5030', motif: '#806040',
  },
  'warm-5': {
    bg: 'radial-gradient(ellipse at 34% 22%, #F6ECD6 0%, #E0CCA8 26%, #C8B284 48%, #AC9060 68%, #8A7040 84%, #685030 100%)',
    weave: '#8A7040', vignette: '#685030', motif: '#7A6238',
  },
  'warm-6': {
    bg: 'radial-gradient(ellipse at 33% 24%, #F5EAD4 0%, #DFCAA4 26%, #C8B082 48%, #AC8E60 68%, #8C7040 84%, #6A5228 100%)',
    weave: '#8C7040', vignette: '#6A5228', motif: '#7E6238',
  },
  'warm-7': {
    bg: 'radial-gradient(ellipse at 30% 22%, #F2E6CC 0%, #DCCAA0 26%, #C4AE7C 48%, #A88C58 68%, #886C38 84%, #645020 100%)',
    weave: '#886C38', vignette: '#645020', motif: '#7A6030',
  },
  'warm-8': {
    bg: 'radial-gradient(ellipse at 32% 20%, #F0E4C8 0%, #D8C498 26%, #C0A87A 48%, #A48858 68%, #846A38 84%, #62481C 100%)',
    weave: '#846A38', vignette: '#62481C', motif: '#786030',
  },
  'cool-1': {
    bg: 'radial-gradient(ellipse at 36% 24%, #E8EEF8 0%, #C8D4EC 26%, #A0B4D8 48%, #7090C0 68%, #4A6CA0 84%, #2A4878 100%)',
    weave: '#4A6CA0', vignette: '#2A4878', motif: '#3A5A90',
  },
  'cool-2': {
    bg: 'radial-gradient(ellipse at 34% 22%, #E4ECF4 0%, #C0D0E4 26%, #94B0D0 48%, #6488B8 68%, #3C6498 84%, #1E4070 100%)',
    weave: '#3C6498', vignette: '#1E4070', motif: '#2E5488',
  },
  'cool-3': {
    bg: 'radial-gradient(ellipse at 35% 26%, #EAE0F4 0%, #CCC0E4 26%, #A898CC 48%, #8470A8 68%, #60508A 84%, #40306A 100%)',
    weave: '#60508A', vignette: '#40306A', motif: '#50407A',
  },
  'cool-4': {
    bg: 'radial-gradient(ellipse at 32% 22%, #DCEEE0 0%, #B8D8C0 26%, #8ABCA0 48%, #5E9C78 68%, #387858 84%, #1E5840 100%)',
    weave: '#387858', vignette: '#1E5840', motif: '#2E6848',
  },
  'dark-1': {
    bg: 'radial-gradient(ellipse at 38% 26%, #D4A860 0%, #AE8038 24%, #8A6020 46%, #6A4810 68%, #4C3008 84%, #301C04 100%)',
    weave: '#6A4810', vignette: '#301C04', motif: '#C4982E',
  },
  'dark-2': {
    bg: 'radial-gradient(ellipse at 35% 24%, #DCB870 0%, #B89040 24%, #946820 46%, #704A10 68%, #502E08 84%, #342004 100%)',
    weave: '#704A10', vignette: '#342004', motif: '#C8A030',
  },
  'dark-3': {
    bg: 'radial-gradient(ellipse at 36% 26%, #C89850 0%, #A87828 24%, #865810 46%, #643C08 68%, #442802 84%, #281800 100%)',
    weave: '#643C08', vignette: '#281800', motif: '#BC8E24',
  },
  'dark-4': {
    bg: 'radial-gradient(ellipse at 34% 24%, #D0A860 0%, #AA8430 24%, #886210 46%, #664408 68%, #462C04 84%, #2C1A02 100%)',
    weave: '#664408', vignette: '#2C1A02', motif: '#C09828',
  },
  'editorial-1': {
    bg: 'radial-gradient(ellipse at 30% 20%, #5A3820 0%, #7C5032 28%, #A07850 52%, #C8A870 74%, #D4B878 100%)',
    weave: '#D4B878', vignette: '#2A1A10', motif: '#D4B060',
  },
  'editorial-2': {
    bg: 'radial-gradient(ellipse at 25% 18%, #1A1010 0%, #3A2A20 30%, #6A5030 60%, #D4B060 85%, #E8CC78 100%)',
    weave: '#E8CC78', vignette: '#0A0808', motif: '#D4B060',
  },
  blush: {
    bg: 'radial-gradient(ellipse at 36% 26%, #FBE8E4 0%, #ECC8C0 26%, #D8A49C 48%, #BE8080 68%, #9C6060 84%, #7C4040 100%)',
    weave: '#9C6060', vignette: '#7C4040', motif: '#B07070',
  },
}

interface Props {
  variant?: string
  className?: string
}

export function PlaceholderImage({ variant = 'warm-1', className = '' }: Props) {
  const p = PALETTE[variant] ?? PALETTE['warm-1']

  return (
    <div
      className={`w-full h-full relative overflow-hidden ${className}`}
      style={{ background: p.bg }}
      aria-hidden="true"
    >
      {/* Diagonal fabric weave texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${p.weave}1A 0px, ${p.weave}1A 1px, transparent 1px, transparent 5px)`,
        }}
      />

      {/* Top-left highlight for dimensional depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 18% 12%, rgba(255,255,255,0.22) 0%, transparent 52%)',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, transparent 52%, ${p.vignette}99 100%)`,
        }}
      />

      {/* Central Pakistani textile motif — 8-petal mandala */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none"
        style={{ top: '28%' }}
      >
        <svg
          width="80"
          height="80"
          viewBox="-40 -40 80 80"
          fill="none"
          style={{ opacity: 0.2 }}
        >
          {/* Outer dashed ring */}
          <circle r="36" stroke={p.motif} strokeWidth="0.6" strokeDasharray="3 2.5" />
          {/* Middle solid ring */}
          <circle r="24" stroke={p.motif} strokeWidth="0.7" />
          {/* Inner ring */}
          <circle r="13" stroke={p.motif} strokeWidth="0.5" />
          {/* Center dot */}
          <circle r="2.5" fill={p.motif} />
          {/* 8 petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const cx = 18.5 * Math.cos(rad)
            const cy = 18.5 * Math.sin(rad)
            return (
              <ellipse
                key={`petal-${deg}`}
                cx={cx}
                cy={cy}
                rx="3.2"
                ry="6"
                transform={`rotate(${deg}, ${cx}, ${cy})`}
                fill={p.motif}
                opacity="0.7"
              />
            )
          })}
          {/* Between-petal accent lines */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={`line-${deg}`}
                x1={13 * Math.cos(rad)}
                y1={13 * Math.sin(rad)}
                x2={24 * Math.cos(rad)}
                y2={24 * Math.sin(rad)}
                stroke={p.motif}
                strokeWidth="0.5"
                opacity="0.6"
              />
            )
          })}
          {/* Corner diamond accents on outer ring */}
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180
            const cx = 36 * Math.cos(rad)
            const cy = 36 * Math.sin(rad)
            return (
              <rect
                key={`diamond-${deg}`}
                x={cx - 2}
                y={cy - 2}
                width="4"
                height="4"
                transform={`rotate(45, ${cx}, ${cy})`}
                fill={p.motif}
                opacity="0.5"
              />
            )
          })}
        </svg>
      </div>

      {/* Bottom label band — subtle brand mark */}
      <div
        className="absolute bottom-0 inset-x-0 flex items-end justify-center pb-3"
        style={{ opacity: 0.15 }}
      >
        <span
          className="font-display text-[10px] uppercase tracking-[0.22em]"
          style={{ color: p.motif }}
        >
          Mala By Kashmala
        </span>
      </div>
    </div>
  )
}
