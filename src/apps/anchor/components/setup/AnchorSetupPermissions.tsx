import { Check, ChevronLeft, Lock, Network, Bell, Music, ShieldCheck } from 'lucide-react'
import type { AnchorSetupPermission } from '../../anchorSetupState'

const permissionIcons: Record<string, typeof Music> = {
  musicLibrary: Music,
  localServer: ShieldCheck,
  network: Network,
  notifications: Bell,
}

export function AnchorSetupPermissions({
  permissions,
  onAcknowledge,
  onContinue,
  onBack,
}: {
  permissions: AnchorSetupPermission[]
  onAcknowledge: (id: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  const requiredAcknowledged = permissions.filter((p) => p.required).every((p) => p.acknowledged)
  const allAcknowledged = permissions.every((p) => p.acknowledged)

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-5 sm:px-5">
      <header className="mb-4">
        <h1 className="break-words font-serif text-[clamp(1.6rem,12vw,1.9rem)] leading-none tracking-[-0.055em] text-white">
          Permissions
        </h1>
        <p className="mt-2 text-[0.82rem] leading-4 text-slate-300/82">
          Anchor needs a few local capabilities.
        </p>
      </header>

      <div className="space-y-2">
        {permissions.map((permission) => {
          const Icon = permissionIcons[permission.id] ?? Lock
          const statusLabel = permission.required
            ? 'Required'
            : permission.id === 'notifications'
              ? 'Optional'
              : 'Optional'
          const statusColor = permission.required
            ? 'text-amber-200/82'
            : permission.id === 'notifications'
              ? 'text-slate-300/72'
              : 'text-slate-400/72'

          return (
            <button
              aria-pressed={permission.acknowledged}
              className={`flex w-full min-w-0 items-center gap-3 rounded-2xl border p-3.5 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-300/30 ${
                permission.acknowledged
                  ? 'border-emerald-300/22 bg-emerald-300/[0.055]'
                  : 'border-white/[0.065] bg-white/[0.04] hover:bg-white/[0.06]'
              }`}
              key={permission.id}
              onClick={() => onAcknowledge(permission.id)}
              type="button"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                  permission.acknowledged
                    ? 'bg-emerald-300/16 text-emerald-300'
                    : 'bg-white/[0.06] text-slate-300'
                }`}
              >
                <Icon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{permission.label}</span>
                <span className="block text-xs leading-4 text-slate-300/72">{permission.description}</span>
                <span className={`mt-0.5 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${
                  permission.acknowledged
                    ? 'border-emerald-300/45 bg-emerald-300 text-[#071014]'
                    : 'border-white/15 bg-transparent'
                }`}
              >
                {permission.acknowledged ? <Check size={13} strokeWidth={2.8} /> : null}
              </span>
            </button>
          )
        })}
      </div>

      {!allAcknowledged ? (
        <p className="mt-3 text-xs leading-4 text-orange-200/78">
          Tap each card to acknowledge. Required permissions must be acknowledged before continuing.
        </p>
      ) : null}

      <div className="mt-auto space-y-2.5 pb-6 pt-6">
        <button
          className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-100/60 ${
            requiredAcknowledged
              ? 'bg-amber-400 text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(245,158,11,0.12)] hover:bg-amber-300'
              : 'cursor-not-allowed bg-white/[0.07] text-slate-300 opacity-60'
          }`}
          disabled={!requiredAcknowledged}
          onClick={onContinue}
          type="button"
        >
          Continue
        </button>
        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.065] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
          onClick={onBack}
          type="button"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>
    </div>
  )
}
