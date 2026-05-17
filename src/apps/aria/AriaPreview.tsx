import { Music2, Radio, Search } from 'lucide-react'

export function AriaPreview() {
  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.18),transparent_17rem),linear-gradient(180deg,#111318_0%,#080b10_100%)] px-5 py-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-amber-100/55">
        Listening space
      </p>
      <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Aria</h2>

      <section className="mt-7 rounded-[2rem] border border-white/10 bg-gradient-to-br from-amber-100/20 via-orange-200/10 to-slate-950 p-4">
        <div className="aspect-square rounded-[1.55rem] border border-white/10 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.38),transparent_7rem),linear-gradient(135deg,#d97706,#111827_62%)]" />
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em]">
              Golden Hour
            </p>
            <p className="text-sm text-slate-300">Now playing mock</p>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950">
            Play
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {(
          [
          ['Featured', Radio],
          ['Recent', Music2],
          ] as const
        ).map(([label, Icon]) => (
          <article
            className="rounded-[1.5rem] border border-white/10 bg-black/24 p-4"
            key={label as string}
          >
            <Icon className="text-amber-100" size={22} />
            <p className="mt-5 text-lg font-medium">{label}</p>
            <p className="mt-1 text-xs text-slate-400">Visual card</p>
          </article>
        ))}
      </div>

      <section className="mt-4 flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4">
        <Search className="text-slate-400" size={18} />
        <span className="text-sm text-slate-400">Search remains visual only</span>
      </section>

      <div className="mt-5 flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[0.68rem] text-slate-400">
        {['Home', 'Explore', 'Library', 'Search'].map((item, index) => (
          <span className={index === 0 ? 'text-amber-100' : ''} key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
