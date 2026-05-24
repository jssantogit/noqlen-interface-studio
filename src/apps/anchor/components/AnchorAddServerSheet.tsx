import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'

const serverTypes = ['Navidrome', 'Jellyfin', 'Emby'] as const

export function AnchorAddServerSheet({
  onCancel,
  onSave,
}: {
  onCancel: () => void
  onSave: () => void
}) {
  const [serverType, setServerType] = useState<(typeof serverTypes)[number]>('Navidrome')
  const [fields, setFields] = useState({
    name: 'Living Room Navidrome',
    address: '192.168.1.156',
    port: '4533',
  })
  const [error, setError] = useState<string | null>(null)

  const validateAndSave = () => {
    const port = Number(fields.port)
    if (!fields.name.trim()) {
      setError('Enter a display name for the server.')
      return
    }
    if (!fields.address.trim()) {
      setError('Enter a local address.')
      return
    }
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      setError('Use a port between 1 and 65535.')
      return
    }
    setError(null)
    onSave()
  }

  return (
    <AnchorBottomSheet
      onClose={onCancel}
      title="Add server"
    >
      <div className="space-y-4">
        <section className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300/70">
            Server type
          </p>
          <div className="grid grid-cols-3 gap-2">
            {serverTypes.map((type) => {
              const selected = serverType === type
              return (
                <button
                  aria-pressed={selected}
                  className={`h-9 rounded-xl border text-[0.7rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-300/35 ${
                    selected
                      ? 'border-amber-300/35 bg-amber-300/18 text-amber-100'
                      : 'border-white/[0.07] bg-white/[0.035] text-slate-300 hover:bg-white/[0.07]'
                  }`}
                  key={type}
                  onClick={() => setServerType(type)}
                  type="button"
                >
                  {type}
                </button>
              )
            })}
          </div>
        </section>

        <section className="space-y-2.5 rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3.5">
          {[
            ['Display name', 'name'],
            ['Local address', 'address'],
            ['Port', 'port'],
          ].map(([label, key]) => (
            <label className="block" key={key}>
              <span className="text-xs font-medium text-slate-300/74">{label}</span>
              <input
                className="mt-1.5 h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
                onChange={(event) =>
                  setFields((current) => ({ ...current, [key]: event.target.value }))
                }
                inputMode={key === 'port' ? 'numeric' : 'text'}
                value={fields[key as keyof typeof fields]}
              />
            </label>
          ))}
        </section>

        {error ? (
          <p className="rounded-2xl border border-orange-300/18 bg-orange-300/[0.07] px-3.5 py-2.5 text-xs leading-5 text-orange-100">
            {error}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-2.5">
          <button
            className="h-10 rounded-xl border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="h-10 rounded-xl bg-amber-400 text-sm font-semibold text-[#211508] shadow-[0_0.8rem_1.5rem_rgba(245,158,11,0.16)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
            onClick={validateAndSave}
            type="button"
          >
            Add server
          </button>
        </div>
      </div>
    </AnchorBottomSheet>
  )
}
