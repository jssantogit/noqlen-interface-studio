import { ChevronLeft, MoreHorizontal } from 'lucide-react'

export function AriaDetailHeader({
  label,
  onBack,
  onMore,
}: {
  label?: string
  onBack: () => void
  onMore?: () => void
}) {
  const moreLabel = label ? `${label} more actions` : 'More actions'

  if (!label && !onMore) {
    return (
      <div className="flex pt-1">
        <button
          aria-label="Back"
          className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.045] text-[#fff3e4] backdrop-blur transition hover:bg-white/[0.07]"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={25} strokeWidth={1.8} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between pt-1">
      <button
        aria-label="Back"
        className="grid h-10 w-10 place-items-center rounded-full text-[#fff3e4] transition hover:bg-white/[0.05]"
        onClick={onBack}
        type="button"
      >
        <ChevronLeft size={30} strokeWidth={1.8} />
      </button>
      {label ? <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#b9b1a7]">{label}</span> : <span aria-hidden="true" className="h-10 flex-1" />}
      {onMore ? (
        <button
          aria-label={moreLabel}
          className="grid h-10 w-10 place-items-center rounded-full text-[#fff3e4] transition hover:bg-white/[0.05]"
          onClick={onMore}
          type="button"
        >
          <MoreHorizontal size={24} strokeWidth={1.8} />
        </button>
      ) : (
        <span aria-hidden="true" className="h-10 w-10" />
      )}
    </div>
  )
}
