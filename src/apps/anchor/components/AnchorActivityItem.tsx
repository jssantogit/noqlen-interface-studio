import {
  AlertTriangle,
  Database,
  Play,
  RefreshCw,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

type Tone = 'success' | 'library' | 'restart' | 'failure'

const toneStyles: Record<
  Tone,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  success: {
    Icon: Play,
    className: 'bg-emerald-400/13 text-emerald-300',
  },
  library: {
    Icon: Database,
    className: 'bg-amber-300/12 text-amber-300',
  },
  restart: {
    Icon: RefreshCw,
    className: 'bg-sky-400/13 text-sky-300',
  },
  failure: {
    Icon: AlertTriangle,
    className: 'bg-orange-600/15 text-orange-400',
  },
}

export function AnchorActivityItem({
  title,
  detail,
  time,
  tone,
  hasDetails,
}: {
  title: string
  detail: string
  time: string
  tone: Tone
  hasDetails?: boolean
}) {
  const { Icon, className } = toneStyles[tone]

  return (
    <article className="flex gap-3 border-b border-white/[0.055] px-3 py-3.5 last:border-b-0">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${className}`}
      >
        <Icon height={19} width={19} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
          <time className="shrink-0 text-[0.68rem] leading-5 text-slate-300/70">
            {time}
          </time>
        </div>
        <p className="mt-1 truncate text-[0.72rem] leading-4 text-slate-300/72">
          {detail}
        </p>
        {hasDetails ? (
          <button
            className="mt-2 rounded-lg border border-white/[0.055] bg-white/[0.045] px-3 py-1.5 text-[0.68rem] font-medium text-white transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            type="button"
          >
            Details
          </button>
        ) : null}
      </div>
    </article>
  )
}
