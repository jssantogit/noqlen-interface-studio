export function PhoneStatusBar() {
  return (
    <div className="relative z-20 flex h-10 shrink-0 items-center justify-between px-6 pt-1.5 text-[0.66rem] font-semibold tracking-[-0.01em] text-white/86 sm:h-11 sm:px-7 sm:text-[0.68rem]">
      <span className="tabular-nums">9:41</span>
      <span
        className="flex items-center gap-1.5 text-white/72"
        aria-label="Simulated status"
      >
        <span className="flex h-2.5 items-end gap-[0.12rem]" aria-hidden="true">
          <span className="h-1 w-[0.16rem] rounded-full bg-white/55" />
          <span className="h-1.5 w-[0.16rem] rounded-full bg-white/62" />
          <span className="h-2 w-[0.16rem] rounded-full bg-white/72" />
          <span className="h-2.5 w-[0.16rem] rounded-full bg-white/82" />
        </span>
        <span className="relative h-2.5 w-3.5" aria-hidden="true">
          <span className="absolute inset-x-0 bottom-0 h-2 rounded-t-full border-x border-t border-white/70" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-t-full bg-white/70" />
        </span>
        <span className="relative h-2.5 w-[1.125rem] rounded-[0.2rem] border border-white/72" aria-hidden="true">
          <span className="absolute -right-[0.18rem] top-1/2 h-1 w-[0.12rem] -translate-y-1/2 rounded-r-full bg-white/72" />
          <span className="absolute bottom-[0.12rem] left-[0.12rem] top-[0.12rem] w-[70%] rounded-[0.12rem] bg-white/72" />
        </span>
      </span>
    </div>
  )
}
