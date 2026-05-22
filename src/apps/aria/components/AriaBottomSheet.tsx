import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function AriaBottomSheet({
  ariaLabel,
  children,
  onClose,
  subtitle,
  title,
}: {
  ariaLabel?: string
  children: ReactNode
  onClose: () => void
  subtitle?: string
  title: string
}) {
  return (
    <div className="absolute inset-0 z-[45] flex w-full min-w-0 max-w-full items-end overflow-hidden bg-black/45 px-1.5 pb-0 pt-8 backdrop-blur-[2px]">
      <button
        aria-label="Close sheet backdrop"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <section
        aria-label={ariaLabel ?? title}
        aria-modal="true"
        className="relative max-h-[84%] w-full min-w-0 max-w-full overflow-hidden rounded-t-[26px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(16,27,36,0.98),rgba(5,10,15,0.99))] text-[#f5ecdf] shadow-[0_-1.2rem_3rem_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.07)]"
        role="dialog"
      >
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/18" />
        <header className="flex min-w-0 items-start justify-between gap-3 px-4 pb-3 pt-4">
          <div className="min-w-0">
            <h2 className="font-serif text-[26px] leading-none text-[#fff3e4]">{title}</h2>
            {subtitle ? <p className="mt-1.5 text-[12px] leading-5 text-[#b9b1a7]">{subtitle}</p> : null}
          </div>
          <button
            aria-label={`Close ${title}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.055] text-[#f0a13d] transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-[#f0a13d]/35"
            onClick={onClose}
            type="button"
          >
            <X size={17} />
          </button>
        </header>
        <div className="anchor-scrollbar-soft max-h-[calc(84vh-6rem)] min-w-0 max-w-full overflow-y-auto overflow-x-hidden px-4 pb-7">
          {children}
        </div>
      </section>
    </div>
  )
}
