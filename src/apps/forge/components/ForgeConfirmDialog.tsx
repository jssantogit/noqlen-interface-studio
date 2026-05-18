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
      ? 'bg-orange-600 text-white hover:bg-orange-500 focus:ring-orange-300/40 shadow-[0_0.8rem_1.5rem_rgba(234,88,12,0.18)]'
      : 'bg-[#e7a35f] text-[#211508] hover:bg-[#efad6c] focus:ring-orange-300/40 shadow-[0_0.8rem_1.5rem_rgba(234,154,92,0.16)]'

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
        className="relative w-full max-w-[19rem] rounded-[1.35rem] border border-white/[0.09] bg-[linear-gradient(150deg,rgba(24,18,12,0.98),rgba(8,5,3,0.99))] p-4 shadow-[0_1.4rem_3rem_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.07)]"
        role="dialog"
      >
        <h2 className="font-serif text-[1.35rem] leading-7 tracking-[-0.045em] text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-5 text-orange-100/70">{description}</p>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-orange-300/30"
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
