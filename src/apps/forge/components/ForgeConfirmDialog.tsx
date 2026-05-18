export function ForgeConfirmDialog({
  confirmLabel,
  description,
  onCancel,
  onConfirm,
  tone = 'amber',
  title,
}: {
  confirmLabel: string
  description: string
  onCancel: () => void
  onConfirm: () => void
  tone?: 'amber' | 'danger'
  title: string
}) {
  const confirmClass =
    tone === 'danger'
      ? 'bg-orange-500 text-white hover:bg-orange-400 focus:ring-orange-200/70 shadow-[0_0.8rem_1.5rem_rgba(249,115,22,0.16)]'
      : 'bg-amber-400 text-[#211508] hover:bg-amber-300 focus:ring-amber-100/70 shadow-[0_0.8rem_1.5rem_rgba(245,158,11,0.16)]'

  return (
    <div className="absolute inset-0 z-50 grid min-w-0 place-items-center overflow-hidden bg-black/55 px-5 backdrop-blur-[2px]">
      <button
        aria-label="Cancel confirmation"
        className="absolute inset-0 cursor-default"
        onClick={onCancel}
        type="button"
      />
      <section
        aria-modal="true"
        className="relative w-full max-w-[19rem] rounded-[1.35rem] border border-white/[0.09] bg-[linear-gradient(150deg,rgba(21,34,41,0.98),rgba(7,14,19,0.99))] p-4 shadow-[0_1.4rem_3rem_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.07)]"
        role="dialog"
      >
        <h2 className="font-serif text-[1.35rem] leading-7 tracking-[-0.045em] text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-5 text-slate-300/78">{description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`h-10 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 ${confirmClass}`}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}
