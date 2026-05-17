import { RotateCcw } from 'lucide-react'

export function AnchorActivityEmptyState({
  isErrorFilter,
  onReset,
}: {
  isErrorFilter: boolean
  onReset: () => void
}) {
  return (
    <section className="rounded-[1.3rem] border border-white/[0.075] bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.026))] px-4 py-6 text-center shadow-[0_1rem_2rem_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.045)]">
      <div
        className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${
          isErrorFilter
            ? 'bg-red-500/12 text-red-300'
            : 'bg-amber-300/12 text-amber-200'
        }`}
      >
        <RotateCcw size={19} />
      </div>
      <h2 className="mt-4 font-serif text-[1.35rem] leading-6 tracking-[-0.045em] text-white">
        No events found
      </h2>
      <p className="mx-auto mt-2 max-w-[16rem] text-xs leading-5 text-slate-300/76">
        Try another filter or check back after more mock activity.
      </p>
      <button
        className="mt-4 rounded-xl border border-amber-300/25 bg-amber-300/12 px-4 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/18 focus:outline-none focus:ring-2 focus:ring-amber-300/35"
        onClick={onReset}
        type="button"
      >
        Reset filter
      </button>
    </section>
  )
}
