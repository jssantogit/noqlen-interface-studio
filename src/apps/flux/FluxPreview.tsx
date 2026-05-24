import { ArrowRight, GitBranch, Timer } from 'lucide-react'

export function FluxPreview() {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden bg-[radial-gradient(circle_at_30%_0%,rgba(245,158,11,0.16),transparent_18rem),linear-gradient(180deg,#10141b_0%,#080b10_100%)] px-5 py-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-amber-100/55">
        Flow sketch
      </p>
      <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Flux</h2>

      <section className="mt-7 rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-slate-400">Current sequence</p>
            <p className="mt-1 truncate text-2xl font-semibold tracking-[-0.03em]">
              Draft motion
            </p>
          </div>
          <GitBranch className="shrink-0 text-amber-100" size={28} />
        </div>
      </section>

      <div className="mt-4 space-y-3">
        {['Capture', 'Shape', 'Resolve'].map((item, index) => (
          <article
            className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/24 p-4"
            key={item}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100/10 text-sm text-amber-100">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item}</p>
              <p className="truncate text-xs text-slate-400">Neutral workspace</p>
            </div>
            {index < 2 ? (
              <ArrowRight className="text-slate-500" size={18} />
            ) : (
              <Timer className="text-slate-500" size={18} />
            )}
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-dashed border-white/15 bg-white/[0.035] p-4 text-sm leading-6 text-slate-400">
        Flux keeps the sequence focused while dedicated concepts are shaped.
      </div>
    </div>
  )
}
