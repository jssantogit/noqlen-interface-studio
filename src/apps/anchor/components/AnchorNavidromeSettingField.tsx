import type { NavidromeConfigDraft, NavidromeConfigOption } from '../navidromeConfigCatalog'
import { AnchorNavidromeDangerNote } from './AnchorNavidromeDangerNote'

const safetyClass = {
  safe: 'border-emerald-300/18 bg-emerald-300/[0.055] text-emerald-200',
  caution: 'border-orange-300/18 bg-orange-300/[0.06] text-orange-200',
  sensitive: 'border-red-400/20 bg-red-400/[0.07] text-red-200',
  advanced: 'border-sky-300/18 bg-sky-300/[0.055] text-sky-200',
}

export function AnchorNavidromeSettingField({
  draft,
  onChange,
  option,
}: {
  draft: NavidromeConfigDraft
  onChange: (key: string, value: string | number | boolean) => void
  option: NavidromeConfigOption
}) {
  const value = draft[option.key]
  const enabled = value === true

  return (
    <section className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/[0.065] bg-white/[0.035] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="break-words text-sm font-semibold text-white">{option.label}</h4>
          <p className="mt-1 text-[0.7rem] leading-4 text-slate-300/72">{option.description}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-2 py-1 text-[0.6rem] font-semibold capitalize ${safetyClass[option.safetyLevel]}`}>
          {option.safetyLevel}
        </span>
      </div>

      <div className="mt-3 min-w-0">
        {option.type === 'boolean' ? (
          <button
            aria-pressed={enabled}
            className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#071014]/72 px-3 py-2.5 text-left transition hover:bg-white/[0.055] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
            onClick={() => onChange(option.key, !enabled)}
            type="button"
          >
            <span className="text-xs font-medium text-slate-200/88">{enabled ? 'Enabled' : 'Disabled'}</span>
            <span className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${enabled ? 'bg-amber-300' : 'bg-white/14'}`}>
              <span className={`h-4 w-4 rounded-full bg-[#071014] transition ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </span>
          </button>
        ) : option.type === 'select' ? (
          <select
            className="h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/88 px-3 text-xs text-white outline-none transition focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
            onChange={(event) => onChange(option.key, event.target.value)}
            value={String(value)}
          >
            {option.options?.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        ) : (
          <input
            className="h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 px-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
            inputMode={option.type === 'number' ? 'numeric' : 'text'}
            onChange={(event) => onChange(option.key, option.type === 'number' ? Number(event.target.value) : event.target.value)}
            type={option.type === 'secret' ? 'password' : option.type === 'number' ? 'number' : 'text'}
            value={option.type === 'secret' ? 'mock-secret' : String(value)}
          />
        )}
      </div>

      <div className="mt-2 flex min-w-0 flex-wrap gap-2 text-[0.64rem] text-slate-400">
        <span className="max-w-full break-words rounded-full bg-white/[0.055] px-2 py-1 font-mono [overflow-wrap:anywhere]">{option.key}</span>
        {option.envVar ? <span className="max-w-full break-words rounded-full bg-white/[0.055] px-2 py-1 font-mono [overflow-wrap:anywhere]">{option.envVar}</span> : null}
        {option.restartRequired ? <span className="rounded-full bg-amber-300/[0.075] px-2 py-1 text-amber-200">restart</span> : null}
      </div>
      <p className="mt-2 text-[0.68rem] leading-4 text-slate-400/88">{option.notes}</p>
      <AnchorNavidromeDangerNote settingKey={option.key} safetyLevel={option.safetyLevel} />
    </section>
  )
}
