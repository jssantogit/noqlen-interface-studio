import { useState } from 'react'
import type { NavidromeConfigDraft } from '../navidromeConfigCatalog'
import { renderNavidromeEnvPreview, renderNavidromeTomlPreview } from '../navidromeConfigCatalog'

export function AnchorNavidromeConfigPreview({ draft }: { draft: NavidromeConfigDraft }) {
  const [mode, setMode] = useState<'toml' | 'env'>('toml')
  const envPreview = renderNavidromeEnvPreview(draft)

  return (
    <section className="min-w-0 rounded-2xl border border-white/[0.065] bg-[#071014]/78 p-3.5">
      <div className="mb-3 flex min-w-0 items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white">Config preview</h3>
          <p className="mt-1 text-[0.68rem] leading-4 text-slate-300/72">Display-only preview. No files are written.</p>
        </div>
        <div className="grid shrink-0 grid-cols-2 rounded-full bg-white/[0.055] p-1 text-[0.66rem] font-semibold">
          {(['toml', 'env'] as const).map((item) => (
            <button
              className={`rounded-full px-2.5 py-1 transition ${mode === item ? 'bg-amber-300 text-[#211508]' : 'text-slate-300'}`}
              key={item}
              onClick={() => setMode(item)}
              type="button"
            >
              {item === 'toml' ? 'TOML' : 'Env'}
            </button>
          ))}
        </div>
      </div>

      {mode === 'toml' ? (
        <pre className="max-h-72 min-w-0 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-white/[0.06] bg-black/28 p-3 text-[0.66rem] leading-4 text-slate-200/88">
          {renderNavidromeTomlPreview(draft)}
        </pre>
      ) : (
        <div className="max-h-72 min-w-0 space-y-2 overflow-y-auto overflow-x-hidden rounded-xl border border-white/[0.06] bg-black/22 p-2.5">
          {envPreview.map((row) => (
            <div className="min-w-0 rounded-lg bg-white/[0.035] px-2.5 py-2" key={row.key}>
              <div className="truncate text-[0.66rem] font-semibold text-amber-200">{row.envVar}</div>
              <div className="mt-1 break-words text-[0.66rem] text-slate-300/86">{row.value}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
