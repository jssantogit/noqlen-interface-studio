export function StudioTopBar() {
  return (
    <header className="flex min-w-0 max-w-full items-center justify-between gap-3 overflow-hidden rounded-3xl border border-white/10 bg-black/20 px-3 py-2.5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:gap-4 sm:px-5 sm:py-3">
      <div className="min-w-0">
        <p className="truncate text-[0.68rem] uppercase tracking-[0.35em] text-amber-100/55">
          Noqlen Interface Studio
        </p>
        <h1 className="mt-1 truncate text-base font-medium tracking-[-0.02em] text-white sm:text-lg">
          Mobile simulator lab
        </h1>
      </div>
      <div className="shrink-0 rounded-full border border-amber-200/15 bg-amber-200/[0.06] px-2.5 py-1 text-xs text-amber-100/75 sm:px-3">
        Visual only
      </div>
    </header>
  )
}
