import { AnchorBottomSheet } from './AnchorBottomSheet'

const summary = [
  { label: 'Songs', value: '12,458' },
  { label: 'Albums', value: '1,253' },
  { label: 'Artists', value: '842' },
]

const extraStats = [
  '326 playlists indexed',
  '91 genres detected',
  '34 missing covers',
  '18 missing lyrics',
]

export function AnchorLibraryStatsSheet({ onClose }: { onClose: () => void }) {
  return (
    <AnchorBottomSheet onClose={onClose} subtitle="Static Studio library summary." title="Library stats">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {summary.map((stat) => (
            <div className="rounded-2xl border border-white/[0.065] bg-white/[0.04] px-2 py-4 text-center" key={stat.label}>
              <p className="text-lg leading-none tracking-[-0.035em] text-white">{stat.value}</p>
              <p className="mt-2 text-[0.68rem] text-slate-300/72">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {extraStats.map((stat) => (
            <div className="rounded-xl border border-white/[0.055] bg-white/[0.035] px-3 py-2.5 text-xs text-slate-100" key={stat}>
              {stat}
            </div>
          ))}
        </div>

        <p className="rounded-xl border border-amber-300/16 bg-amber-300/[0.055] px-3 py-2.5 text-xs leading-5 text-amber-100/88">
          These are static Studio mock values.
        </p>
      </div>
    </AnchorBottomSheet>
  )
}
