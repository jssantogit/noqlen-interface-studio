import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function ForgeBottomSheet({
  children,
  onClose,
  subtitle,
  title,
}: {
  children: ReactNode
  onClose: () => void
  subtitle?: string
  title?: string
}) {
  return (
    <div className="absolute inset-0 z-40 flex w-full min-w-0 max-w-full items-end overflow-hidden bg-black/48 px-1.5 pb-0 pt-8 backdrop-blur-[2px]">
      <button
        aria-label="Close sheet backdrop"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="relative max-h-[86%] w-full min-w-0 max-w-full overflow-hidden rounded-t-[1.65rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(18,31,38,0.98),rgba(6,13,18,0.99))] shadow-[0_-1.2rem_3rem_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]"
        role="dialog"
      >
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/18" />
        <header className="flex min-w-0 items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
          <div className="min-w-0">
            {title ? (
              <h2 className="font-serif text-[1.35rem] leading-7 tracking-[-0.045em] text-white">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-1 text-xs leading-5 text-slate-300/76">{subtitle}</p>
            ) : null}
          </div>
          <button
            aria-label="Close sheet"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.055] text-slate-200 transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-amber-300/35"
            onClick={onClose}
            type="button"
          >
            <X size={17} />
          </button>
        </header>
        <div className="forge-scrollbar-soft max-h-[calc(86vh-6rem)] min-w-0 max-w-full overflow-y-auto overflow-x-hidden px-4 pb-6 sm:px-5">
          {children}
        </div>
      </section>
    </div>
  )
}
