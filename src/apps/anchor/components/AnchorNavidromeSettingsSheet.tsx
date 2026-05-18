import { RotateCcw, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { AnchorBottomSheet } from './AnchorBottomSheet'
import { AnchorNavidromeConfigPreview } from './AnchorNavidromeConfigPreview'
import { AnchorNavidromeDryRunSheet } from './AnchorNavidromeDryRunSheet'
import { AnchorNavidromeSettingField } from './AnchorNavidromeSettingField'
import { AnchorNavidromeSettingsSection } from './AnchorNavidromeSettingsSection'
import {
  createNavidromeMockDraft,
  getNavidromeChangedOptions,
  navidromeConfigCatalog,
  navidromeSettingCategories,
} from '../navidromeConfigCatalog'
import type { NavidromeConfigDraft, NavidromeSettingCategory } from '../navidromeConfigCatalog'

export function AnchorNavidromeSettingsSheet({
  onClose,
  onMockApply,
  onMockReset,
  onRestartRecommended,
  initialDraft,
  onDraftChange,
}: {
  onClose: () => void
  onMockApply: () => void
  onMockReset: () => void
  onRestartRecommended: () => void
  initialDraft?: NavidromeConfigDraft
  onDraftChange?: (draft: NavidromeConfigDraft) => void
}) {
  const [savedDraft, setSavedDraft] = useState<NavidromeConfigDraft>(() => initialDraft ?? createNavidromeMockDraft())
  const [draft, setDraft] = useState<NavidromeConfigDraft>(() => initialDraft ?? createNavidromeMockDraft())
  const [activeCategory, setActiveCategory] = useState<NavidromeSettingCategory>('basics')
  const [search, setSearch] = useState('')
  const [dryRunOpen, setDryRunOpen] = useState(false)

  const changed = getNavidromeChangedOptions(savedDraft, draft)
  const restartRequired = changed.some((option) => option.restartRequired)
  const searchedOptions = navidromeConfigCatalog.filter((option) => {
    const query = search.trim().toLowerCase()
    if (!query) return true
    return [option.key, option.label, option.envVar ?? '', option.description]
      .join(' ')
      .toLowerCase()
      .includes(query)
  })

  const updateDraft = (key: string, value: string | number | boolean) => {
    setDraft((current) => {
      const next = { ...current, [key]: value }
      onDraftChange?.(next)
      return next
    })
  }

  const applyMockChanges = () => {
    setSavedDraft(draft)
    setDryRunOpen(false)
    onMockApply()
    if (restartRequired) onRestartRecommended()
  }

  const resetChanges = () => {
    setDraft(savedDraft)
    onMockReset()
  }

  return (
    <>
      <AnchorBottomSheet
        onClose={onClose}
        subtitle="Configure the mock navidrome.toml profile."
        title="Navidrome Settings"
      >
        <div className="w-full min-w-0 max-w-full space-y-3 pb-1">
          <p className="rounded-2xl border border-amber-300/12 bg-amber-300/[0.055] px-3.5 py-3 text-xs leading-5 text-amber-50/82">
            Studio preview only. Future app changes must go through Anchor Core dry-run/apply flow.
          </p>

          <div className="grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))] gap-1.5 text-center sm:gap-2">
            <div className="min-w-0 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-2 sm:p-2.5">
              <div className="text-base font-semibold text-white">{navidromeConfigCatalog.length}</div>
              <div className="break-words text-[0.54rem] uppercase tracking-[0.1em] text-slate-400 sm:text-[0.58rem] sm:tracking-[0.13em]">modeled</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-amber-300/13 bg-amber-300/[0.055] p-2 sm:p-2.5">
              <div className="text-base font-semibold text-amber-100">{changed.length}</div>
              <div className="break-words text-[0.54rem] uppercase tracking-[0.1em] text-amber-200/78 sm:text-[0.58rem] sm:tracking-[0.13em]">changed</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-emerald-300/13 bg-emerald-300/[0.055] p-2 sm:p-2.5">
              <div className="break-words text-sm font-semibold leading-5 text-emerald-100 sm:text-base">dry-run</div>
              <div className="break-words text-[0.54rem] uppercase tracking-[0.1em] text-emerald-200/78 sm:text-[0.58rem] sm:tracking-[0.13em]">required</div>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden pb-1">
            <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
              {navidromeSettingCategories.map((category) => (
                <button
                  className={`min-w-0 shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[0.68rem] font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-300/30 sm:px-3 sm:py-2 sm:text-[0.72rem] ${
                    activeCategory === category.key
                      ? 'border-amber-300/45 bg-amber-300 text-[#211508] shadow-[0_0.7rem_1.2rem_rgba(245,158,11,0.13)]'
                      : 'border-white/[0.07] bg-white/[0.045] text-slate-200 hover:bg-white/[0.075]'
                  }`}
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  type="button"
                >
                  {category.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {activeCategory === 'advanced' ? (
            <div className="space-y-3">
              <section className="rounded-2xl border border-amber-300/13 bg-amber-300/[0.055] p-3.5">
                <div className="flex gap-3">
                  <SlidersHorizontal className="mt-0.5 shrink-0 text-amber-200" size={18} />
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl tracking-[-0.045em] text-white">Advanced</h3>
                    <p className="mt-1 text-xs leading-5 text-amber-50/78">
                      Search all modeled options, inspect generated TOML/env previews, and run a local dry-run.
                    </p>
                  </div>
                </div>
              </section>

              <label className="relative block min-w-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  className="h-10 w-full min-w-0 rounded-xl border border-white/[0.075] bg-[#071014]/72 pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/34 focus:ring-2 focus:ring-amber-300/18"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search label, key, env var"
                  value={search}
                />
              </label>

              <div className="anchor-scrollbar-soft max-h-80 space-y-2 overflow-y-auto overflow-x-hidden pr-1">
                {searchedOptions.map((option) => (
                  <AnchorNavidromeSettingField draft={draft} key={option.key} onChange={updateDraft} option={option} />
                ))}
              </div>

              <AnchorNavidromeConfigPreview draft={draft} />
            </div>
          ) : (
            <AnchorNavidromeSettingsSection category={activeCategory} draft={draft} onChange={updateDraft} />
          )}

          <div className="sticky bottom-0 z-10 -mx-4 mt-2 border-t border-white/[0.07] bg-[#071014]/95 px-4 py-3 backdrop-blur-xl sm:-mx-5 sm:px-5">
            <div className="mb-2 flex min-w-0 items-center gap-2 text-[0.68rem] text-slate-300/76">
              <ShieldCheck className="shrink-0 text-emerald-300" size={14} />
              <span className="min-w-0 break-words leading-4">Mock-only local draft. No backend, files, ports, or secrets.</span>
            </div>
            <div className="grid min-w-0 grid-cols-[repeat(2,minmax(0,1fr))] gap-2">
              <button
                className="flex min-h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl border border-white/[0.075] bg-white/[0.045] px-2 py-2 text-xs font-medium leading-4 text-white transition hover:bg-white/[0.075] focus:outline-none focus:ring-2 focus:ring-amber-300/30"
                onClick={resetChanges}
                type="button"
              >
                <RotateCcw size={14} />
                <span className="break-words">Reset changes</span>
              </button>
              <button
                className="min-h-10 min-w-0 rounded-xl bg-amber-400 px-2 py-2 text-xs font-semibold leading-4 text-[#211508] shadow-[0_0.8rem_1.5rem_rgba(245,158,11,0.16)] transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-100/70"
                onClick={() => setDryRunOpen(true)}
                type="button"
              >
                Preview changes
              </button>
            </div>
          </div>
        </div>
      </AnchorBottomSheet>

      {dryRunOpen ? (
        <AnchorNavidromeDryRunSheet
          draft={draft}
          onApply={applyMockChanges}
          onClose={() => setDryRunOpen(false)}
          saved={savedDraft}
        />
      ) : null}
    </>
  )
}
