import { FileText, Images, ListChecks, Tags } from 'lucide-react'

const issues = [
  ['Missing lyrics', FileText],
  ['Cover review', Images],
  ['Genre cleanup', Tags],
] as const

export function ForgePreview() {
  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_70%_0%,rgba(251,146,60,0.2),transparent_18rem),linear-gradient(180deg,#15110d_0%,#090d12_100%)] px-5 py-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-orange-100/55">
        Repair queue
      </p>
      <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Forge</h2>

      <section className="mt-7 rounded-[1.8rem] border border-orange-200/15 bg-orange-200/[0.08] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-orange-50/70">Review now</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
              12 visual fixes
            </p>
          </div>
          <ListChecks className="text-orange-100" size={30} />
        </div>
        <button
          className="mt-5 w-full rounded-full bg-orange-100 px-4 py-3 text-sm font-semibold text-stone-950"
          type="button"
        >
          Static review action
        </button>
      </section>

      <div className="mt-4 space-y-3">
        {issues.map(([label, Icon], index) => (
          <article
            className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/24 p-4"
            key={label as string}
          >
            <div className="rounded-2xl bg-white/[0.08] p-3">
              <Icon className="text-orange-100" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{label}</p>
              <p className="text-xs text-slate-400">Placeholder batch</p>
            </div>
            <span className="text-sm text-orange-100/80">0{index + 2}</span>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[0.68rem] text-slate-400">
        {['Home', 'Review', 'Library', 'Activity'].map((item, index) => (
          <span className={index === 1 ? 'text-orange-100' : ''} key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
