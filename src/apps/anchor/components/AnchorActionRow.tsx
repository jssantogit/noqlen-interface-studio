import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function AnchorActionRow({
  icon,
  onClick,
  title,
  detail,
}: {
  icon: ReactNode
  onClick?: () => void
  title: string
  detail: string
}) {
  return (
    <button
      className="flex w-full items-center gap-3 border-b border-white/[0.055] px-4 py-3.5 text-left last:border-b-0 hover:bg-white/[0.035] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300/30"
      onClick={onClick}
      type="button"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center text-slate-100">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-white">{title}</span>
        <span className="mt-1 block truncate text-[0.71rem] leading-4 text-slate-300/72">
          {detail}
        </span>
      </span>
      <ChevronRight className="shrink-0 text-slate-300/70" size={18} />
    </button>
  )
}
