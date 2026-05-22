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
