export function StudioTopBar() {
  return (
    <header className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/20 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5">
      <div>
        <p className="text-[0.68rem] uppercase tracking-[0.35em] text-amber-100/55">
          Noqlen Interface Studio
        </p>
        <h1 className="mt-1 text-base font-medium tracking-[-0.02em] text-white sm:text-lg">
          Mobile simulator lab
        </h1>
      </div>
      <div className="rounded-full border border-amber-200/15 bg-amber-200/[0.06] px-3 py-1 text-xs text-amber-100/75">
        Visual only
      </div>
    </header>
  )
}
