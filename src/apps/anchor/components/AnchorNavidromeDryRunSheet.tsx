import { X } from 'lucide-react'
import type { NavidromeConfigDraft } from '../navidromeConfigCatalog'
import { formatNavidromeValue, getNavidromeChangedOptions, renderNavidromeTomlDiff } from '../navidromeConfigCatalog'

export function AnchorNavidromeDryRunSheet({
  draft,
  onApply,
  onClose,
  saved,
}: {
  draft: NavidromeConfigDraft
  onApply: () => void
  onClose: () => void
  saved: NavidromeConfigDraft
}) {
  const changed = getNavidromeChangedOptions(saved, draft)
  const restartCount = changed.filter((option) => option.restartRequired).length
  const warningCount = changed.filter((option) => option.safetyLevel === 'caution' || option.safetyLevel === 'sensitive').length

  return (
    <div className="absolute inset-0 z-50 flex w-full min-w-0 max-w-full items-end overflow-hidden bg-black/56 px-1.5 pt-8 backdrop-blur-[2px]">
      <button aria-label="Close dry-run backdrop" className="absolute inset-0 cursor-default" onClick={onClose} type="button" />
      <section className="relative max-h-[82%] w-full min-w-0 max-w-full overflow-hidden rounded-t-[1.55rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(20,32,38,0.99),rgba(6,12,17,0.99))] shadow-[0_-1.2rem_3rem_rgba(0,0,0,0.5)]">
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/18" />
        <header className="flex min-w-0 items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="font-serif text-[1.3rem] leading-7 tracking-[-0.045em] text-white">Dry-run preview</h2>
            <p className="mt-1 text-xs leading-5 text-slate-300/76">No config files are read or written.</p>
          </div>
          <button className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.055] text-slate-200" onClick={onClose} type="button" aria-label="Close dry-run preview">
            <X size={17} />
          </button>
        </header>

        <div className="anchor-scrollbar-soft max-h-[calc(82vh-6rem)] min-w-0 max-w-full space-y-3 overflow-y-auto overflow-x-hidden px-4 pb-5 sm:px-5">
          <div className="grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-1.5 text-center sm:gap-2">
            <div className="min-w-0 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-2 sm:p-3">
              <div className="text-lg font-semibold text-white">{changed.length}</div>
              <div className="break-words text-[0.56rem] uppercase tracking-[0.1em] text-slate-400 sm:text-[0.62rem] sm:tracking-[0.14em]">changed</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-amber-300/14 bg-amber-300/[0.055] p-2 sm:p-3">
              <div className="text-lg font-semibold text-amber-100">{restartCount}</div>
              <div className="break-words text-[0.56rem] uppercase tracking-[0.1em] text-amber-200/74 sm:text-[0.62rem] sm:tracking-[0.14em]">restart</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-orange-300/14 bg-orange-300/[0.055] p-2 sm:p-3">
              <div className="text-lg font-semibold text-orange-100">{warningCount}</div>
              <div className="break-words text-[0.56rem] uppercase tracking-[0.1em] text-orange-200/74 sm:text-[0.62rem] sm:tracking-[0.14em]">warnings</div>
            </div>
          </div>

          <div className="space-y-2">
            {changed.length === 0 ? (
              <p className="rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3 text-xs text-slate-300/82">No local mock changes.</p>
            ) : changed.map((option) => (
              <div className="min-w-0 rounded-2xl border border-white/[0.065] bg-white/[0.04] p-3" key={option.key}>
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <h3 className="min-w-0 break-words font-mono text-xs font-semibold text-white [overflow-wrap:anywhere]">{option.key}</h3>
                  <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-1 text-[0.62rem] text-slate-300">{option.safetyLevel}</span>
                </div>
                <div className="mt-2 grid min-w-0 grid-cols-2 gap-2 text-[0.66rem]">
                  <div className="min-w-0 rounded-lg bg-black/20 p-2 text-slate-400">
                    Old<br /><span className="break-words text-slate-200">{formatNavidromeValue(saved[option.key], option.type === 'secret')}</span>
                  </div>
                  <div className="min-w-0 rounded-lg bg-amber-300/[0.055] p-2 text-amber-200/70">
                    New<br /><span className="break-words text-amber-50">{formatNavidromeValue(draft[option.key], option.type === 'secret')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <pre className="anchor-scrollbar-soft max-h-44 min-w-0 max-w-full overflow-x-auto overflow-y-auto whitespace-pre-wrap break-words rounded-2xl border border-white/[0.065] bg-black/30 p-3 text-[0.66rem] leading-4 text-slate-200/86 [overflow-wrap:anywhere]">
            {renderNavidromeTomlDiff(saved, draft)}
          </pre>

          <p className="rounded-2xl border border-amber-300/12 bg-amber-300/[0.055] px-3.5 py-3 text-xs leading-5 text-amber-50/82">
            Future real app changes must use Anchor Core validation, dry-run preview, explicit apply, path safety validation, and sanitized logs.
          </p>

          <div className="grid min-w-0 grid-cols-[repeat(2,minmax(0,1fr))] gap-2 pt-1">
            <button className="min-h-10 rounded-xl border border-white/[0.075] bg-white/[0.045] px-2 py-2 text-sm font-medium leading-4 text-white" onClick={onClose} type="button">Close</button>
            <button className="min-h-10 rounded-xl bg-amber-400 px-2 py-2 text-sm font-semibold leading-4 text-[#211508] shadow-[0_0.8rem_1.5rem_rgba(245,158,11,0.16)]" onClick={onApply} type="button">Apply mock changes</button>
          </div>
        </div>
      </section>
    </div>
  )
}
