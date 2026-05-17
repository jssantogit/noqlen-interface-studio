import { Activity, Database, Folder, RadioTower } from 'lucide-react'

const navItems = ['Home', 'Servers', 'Library', 'Activity']

export function AnchorPreview() {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(245,158,11,0.22),transparent_18rem),linear-gradient(180deg,#111827_0%,#090d12_100%)] px-5 py-5 text-white">
      <div className="flex min-w-0 items-center justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-100/55">
            Server lab
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">
            Anchor
          </h2>
        </div>
        <div className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
          Active
        </div>
      </div>

      <section className="mt-7 rounded-[1.8rem] border border-white/10 bg-white/[0.075] p-5 shadow-2xl shadow-black/25">
        <div className="flex min-w-0 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-slate-300">Primary server</p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
              Home vault
            </p>
          </div>
          <RadioTower className="shrink-0 text-amber-200" size={28} />
        </div>
        <div className="mt-5 grid min-w-0 grid-cols-3 gap-2 text-center text-xs text-slate-300">
          {['Online', 'Local', 'Mock'].map((item) => (
            <div className="min-w-0 truncate rounded-2xl bg-black/25 px-2 py-3" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-4 grid min-w-0 grid-cols-2 gap-3">
        <article className="min-w-0 rounded-[1.5rem] border border-white/10 bg-black/24 p-4">
          <Folder className="text-amber-100" size={22} />
          <p className="mt-4 text-sm text-slate-400">Library</p>
          <p className="mt-1 truncate text-xl font-semibold">Curated view</p>
        </article>
        <article className="min-w-0 rounded-[1.5rem] border border-white/10 bg-black/24 p-4">
          <Database className="text-amber-100" size={22} />
          <p className="mt-4 text-sm text-slate-400">Index</p>
          <p className="mt-1 truncate text-xl font-semibold">Static state</p>
        </article>
      </div>

      <section className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
        <p className="text-sm font-medium text-slate-200">Quick actions</p>
        <div className="mt-3 flex min-w-0 gap-2 overflow-hidden">
          {['Scan', 'Queue', 'Review'].map((item) => (
            <span
              className="min-w-0 shrink rounded-full border border-amber-200/15 bg-amber-200/[0.07] px-4 py-2 text-xs text-amber-50/80"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-5 flex min-w-0 items-center justify-between gap-2 overflow-hidden rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[0.68rem] text-slate-400">
        {navItems.map((item, index) => (
          <span className={index === 0 ? 'truncate text-amber-100' : 'truncate'} key={item}>
            {item}
          </span>
        ))}
      </div>
      <Activity className="sr-only" />
    </div>
  )
}
