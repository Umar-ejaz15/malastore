interface Props {
  compact?: boolean
}

export function SizeGuide({ compact = false }: Props) {
  const headClass  = 'text-center py-2.5 font-ui text-[10px] uppercase tracking-widest text-grey font-semibold'
  const cellClass  = 'text-center py-2.5'
  const labelHead  = 'text-left py-2.5 font-ui text-[10px] uppercase tracking-widest text-grey font-semibold'
  const labelCell  = 'py-2.5 font-semibold'

  return (
    <div className={`grid ${compact ? 'gap-4' : 'gap-6 sm:grid-cols-2'}`}>

      {/* Shirt */}
      <div className={`bg-off-white rounded-xl border border-grey-light ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
        <p className="font-ui text-gold uppercase text-[10px] font-semibold tracking-widest mb-1">Shirt</p>
        <h3 className="font-display text-base sm:text-lg font-semibold text-navy mb-3">Top — inches</h3>
        <table className="w-full font-body text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-grey-light">
              <th className={labelHead}>Measure</th>
              <th className={headClass}>S</th>
              <th className={headClass}>M</th>
              <th className={headClass}>L</th>
            </tr>
          </thead>
          <tbody className="text-navy">
            <tr className="border-b border-grey-light/60">
              <td className={labelCell}>Chest</td>
              <td className={cellClass}>19</td>
              <td className={cellClass}>20</td>
              <td className={cellClass}>22</td>
            </tr>
            <tr>
              <td className={labelCell}>Sleeves</td>
              <td className={cellClass}>22</td>
              <td className={cellClass}>22</td>
              <td className={cellClass}>23</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Trouser */}
      <div className={`bg-off-white rounded-xl border border-grey-light ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
        <p className="font-ui text-gold uppercase text-[10px] font-semibold tracking-widest mb-1">Trouser</p>
        <h3 className="font-display text-base sm:text-lg font-semibold text-navy mb-3">Bottom — inches</h3>
        <table className="w-full font-body text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-grey-light">
              <th className={labelHead}>Measure</th>
              <th className={headClass}>S</th>
              <th className={headClass}>M</th>
              <th className={headClass}>L</th>
            </tr>
          </thead>
          <tbody className="text-navy">
            <tr className="border-b border-grey-light/60">
              <td className={labelCell}>Waist</td>
              <td className={cellClass}>28</td>
              <td className={cellClass}>29.5</td>
              <td className={cellClass}>31</td>
            </tr>
            <tr>
              <td className={labelCell}>Length</td>
              <td className={cellClass}>36</td>
              <td className={cellClass}>38</td>
              <td className={cellClass}>38</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
