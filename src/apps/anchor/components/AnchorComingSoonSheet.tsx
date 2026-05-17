import { CheckCircle2 } from 'lucide-react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

export function AnchorComingSoonSheet({
  onClose,
  serverName,
}: {
  onClose: () => void
  serverName: 'Jellyfin' | 'Emby'
}) {
  return (
    <AnchorBottomSheet
      onClose={onClose}
      subtitle="No real integration is available in the Studio."
      title={`${serverName} support`}
    >
      <div className="space-y-4">
        <p className="rounded-2xl border border-white/[0.065] bg-white/[0.04] px-3.5 py-3 text-sm leading-6 text-slate-100/86">
          This server type is planned for the mock interface.
        </p>

        <section className="space-y-2 rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          {['Connection profile', 'Library sync preview', 'Status dashboard'].map((item) => (
            <div className="flex items-center gap-2.5 text-xs text-slate-200/86" key={item}>
              <CheckCircle2 className="text-amber-300" size={16} />
              {item}
            </div>
          ))}
        </section>

        <button
          className="h-10 w-full rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
          onClick={onClose}
          type="button"
        >
          Got it
        </button>
      </div>
    </AnchorBottomSheet>
  )
}
