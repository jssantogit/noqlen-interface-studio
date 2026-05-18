import { X } from 'lucide-react'

export type ForgeToastTone = 'success' | 'info' | 'warning'

export function ForgeToast({
  message,
  onClose,
  tone = 'success',
}: {
  message: string
  onClose: () => void
  tone?: ForgeToastTone
}) {
  const dotClass =
    tone === 'warning'
      ? 'bg-orange-300'
      : tone === 'info'
        ? 'bg-sky-300'
        : 'bg-emerald-300'

  return (
    <div className="absolute left-3 right-3 top-4 z-[60] flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#140f0a]/95 px-3.5 py-3 text-sm text-white shadow-[0_1rem_2rem_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
      <span className="min-w-0 flex-1 truncate font-medium">{message}</span>
      <button
        aria-label="Dismiss toast"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-orange-100/60 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-300/35"
        onClick={onClose}
        type="button"
      >
        <X size={15} />
      </button>
    </div>
  )
}
