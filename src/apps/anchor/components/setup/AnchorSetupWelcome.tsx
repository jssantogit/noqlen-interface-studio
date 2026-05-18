import { Music, Server, Shield, Sparkles } from 'lucide-react'
import { AnchorCard } from '../AnchorCard'

export function AnchorSetupWelcome({
  onStartSetup,
  onPreviewConfigured,
}: {
  onStartSetup: () => void
  onPreviewConfigured: () => void
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-6 sm:px-5">
      <header className="mb-5">
        <h1 className="break-words font-serif text-[clamp(2rem,14vw,2.35rem)] leading-none tracking-[-0.06em] text-white">
          Anchor
        </h1>
        <p className="mt-2.5 text-[0.85rem] leading-5 text-slate-300/82">
          Your local music server, configured from one place.
        </p>
      </header>

      <p className="mb-5 text-sm leading-6 text-slate-300/78">
        Anchor helps you prepare a local music library and configure Navidrome from the app.
      </p>

      <div className="space-y-2.5">
        <AnchorCard className="p-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-300/16 text-amber-300">
              <Shield size={20} />
            </span>
            <div className="min-w-0">
              <span className="block text-sm font-semibold text-white">Local-first</span>
              <span className="block text-xs text-slate-300/72">All your music stays on your device</span>
            </div>
          </div>
        </AnchorCard>

        <AnchorCard className="p-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-300/16 text-emerald-300">
              <Server size={20} />
            </span>
            <div className="min-w-0">
              <span className="block text-sm font-semibold text-white">Navidrome-powered</span>
              <span className="block text-xs text-slate-300/72">Local streaming server included</span>
            </div>
          </div>
        </AnchorCard>

        <AnchorCard className="p-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sky-300/16 text-sky-300">
              <Sparkles size={20} />
            </span>
            <div className="min-w-0">
              <span className="block text-sm font-semibold text-white">Mock-safe preview</span>
              <span className="block text-xs text-slate-300/72">No real files, servers or permissions used</span>
            </div>
          </div>
        </AnchorCard>
      </div>

      <div className="mt-auto space-y-2.5 pb-6 pt-6">
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/60"
          onClick={onStartSetup}
          type="button"
        >
          Start setup
        </button>
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onPreviewConfigured}
          type="button"
        >
          <Music size={16} />
          Preview configured app
        </button>
      </div>
    </div>
  )
}
