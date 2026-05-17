import {
  AlertTriangle,
  Database,
  Play,
  RefreshCw,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import type { AnchorActivitySeverity } from '../anchorMockData'

const toneStyles: Record<
  AnchorActivitySeverity,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  success: {
    Icon: Play,
    className: 'bg-emerald-400/13 text-emerald-300',
  },
  info: {
    Icon: RefreshCw,
    className: 'bg-sky-400/13 text-sky-300',
  },
  warning: {
    Icon: Database,
    className: 'bg-amber-300/12 text-amber-300',
  },
  error: {
    Icon: AlertTriangle,
    className: 'bg-red-500/15 text-red-300',
  },
}

export function AnchorActivityItem({
  title,
  description,
  time,
  severity,
  category,
  onOpen,
}: {
  title: string
  description: string
  time: string
  severity: AnchorActivitySeverity
  category: string
  onOpen: () => void
}) {
  const { Icon, className } = toneStyles[severity]
  const label = severity === 'error' ? 'Error details' : 'Details'

  return (
    <article
      className="flex scroll-mb-32 cursor-pointer gap-3 border-b border-white/[0.055] px-3 py-3.5 text-left transition last:border-b-0 hover:bg-white/[0.035] focus-within:bg-white/[0.035]"
      onClick={onOpen}
    >
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${className}`}
      >
        <Icon height={19} width={19} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-400/80">
              {category}
            </p>
          </div>
          <time className="shrink-0 text-[0.68rem] leading-5 text-slate-300/70">
            {time}
          </time>
        </div>
        <p className="mt-1 truncate text-[0.72rem] leading-4 text-slate-300/72">
          {description}
        </p>
        <button
          className="mt-2 scroll-mb-32 rounded-lg border border-white/[0.055] bg-white/[0.045] px-3 py-1.5 text-[0.68rem] font-medium text-white transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={(event) => {
            event.stopPropagation()
            onOpen()
          }}
          type="button"
        >
          {label}
        </button>
      </div>
    </article>
  )
}
