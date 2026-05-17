import { Clock3, Disc3, FileText, Home, Images, ListChecks, ShieldCheck, Tags } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { forgeActivity, forgeAlbums, forgeIssues } from './forgeMockData'

type ForgeTab = 'home' | 'review' | 'library' | 'activity'

const tabs: { id: ForgeTab; label: string; Icon: LucideIcon }[] = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'review', label: 'Review', Icon: ListChecks },
  { id: 'library', label: 'Library', Icon: Disc3 },
  { id: 'activity', label: 'Activity', Icon: Clock3 },
]

const issueIcons: Record<string, LucideIcon> = {
  lyrics: FileText,
  covers: Images,
  genres: Tags,
}

function CoverTile({ gradient }: { gradient: string }) {
  return (
    <div className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.45),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.55),transparent_42%)]" />
      <div className="absolute bottom-2 left-2 h-4 w-4 rounded bg-black/30" />
    </div>
  )
}

function ForgeBottomNav({ activeTab, onTabChange }: { activeTab: ForgeTab; onTabChange: (tab: ForgeTab) => void }) {
  return (
    <nav className="sticky bottom-0 z-10 -mx-5 mt-auto border-t border-white/[0.06] bg-[#070a10]/92 px-4 pb-4 pt-2 backdrop-blur-xl" aria-label="Forge preview tabs">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map(({ id, label, Icon }) => {
          const selected = activeTab === id
          return (
            <button
              aria-pressed={selected}
              className={selected ? 'rounded-2xl py-1.5 text-[0.68rem] text-orange-100' : 'rounded-2xl py-1.5 text-[0.68rem] text-slate-500'}
              key={id}
              onClick={() => onTabChange(id)}
              type="button"
            >
              <Icon className="mx-auto mb-1" size={18} strokeWidth={selected ? 2.4 : 1.8} />
              <span className="block truncate">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function ForgePreview() {
  const [activeTab, setActiveTab] = useState<ForgeTab>('home')

  return (
    <div className="flex min-h-full min-w-0 flex-col overflow-x-hidden bg-[radial-gradient(circle_at_70%_0%,rgba(251,146,60,0.22),transparent_18rem),linear-gradient(180deg,#15110d_0%,#070a10_100%)] px-5 pt-5 text-white">
      <div className="min-w-0 flex-1 pb-5">
        <p className="text-xs uppercase tracking-[0.28em] text-orange-100/55">Library care</p>
        <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em]">Forge</h2>

        {activeTab === 'home' && (
          <>
            <section className="mt-7 rounded-[1.8rem] border border-orange-200/15 bg-orange-200/[0.08] p-5 shadow-2xl shadow-black/20">
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-orange-50/70">Review now</p>
                  <p className="mt-2 text-3xl font-semibold leading-none tracking-[-0.04em]">9 visual fixes</p>
                </div>
                <ListChecks className="shrink-0 text-orange-100" size={30} />
              </div>
              <button className="mt-5 w-full rounded-full bg-orange-100 px-4 py-3 text-sm font-semibold text-stone-950" type="button">
                Preview static changes
              </button>
            </section>

            <div className="mt-4 space-y-3">
              {forgeIssues.map((issue) => {
                const Icon = issueIcons[issue.id]
                return (
                  <article className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/24 p-4" key={issue.id}>
                    <div className="rounded-2xl bg-white/[0.08] p-3">
                      <Icon className="text-orange-100" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{issue.title}</p>
                      <p className="truncate text-xs text-slate-400">{issue.subtitle}</p>
                    </div>
                    <span className="shrink-0 text-sm text-orange-100/80">{issue.count}</span>
                  </article>
                )
              })}
            </div>
          </>
        )}

        {activeTab === 'review' && (
          <section className="mt-7 space-y-3">
            <p className="text-sm leading-6 text-slate-400">Legacy review groups adapted as a mock-only decision center. Nothing writes metadata.</p>
            {forgeIssues.map((issue) => {
              const Icon = issueIcons[issue.id]
              return (
                <article className="rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-4" key={issue.id}>
                  <div className="flex items-center gap-3">
                    <Icon className="text-orange-100" size={20} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{issue.title}</p>
                      <p className="truncate text-xs text-slate-400">{issue.items.length} mock items</p>
                    </div>
                    <span className="rounded-full bg-orange-100/10 px-3 py-1 text-xs text-orange-100">Review</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {issue.items.map((item) => (
                      <div className="flex items-center gap-2 rounded-xl bg-black/20 px-3 py-2 text-sm text-slate-300" key={item}>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-200" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </section>
        )}

        {activeTab === 'library' && (
          <section className="mt-7 space-y-3">
            <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-slate-400">Search stays visual only</div>
            {forgeAlbums.map((album) => (
              <article className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/24 p-3" key={album.id}>
                <CoverTile gradient={album.gradient} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{album.title}</p>
                  <p className="truncate text-xs text-slate-400">{album.artist} · {album.year}</p>
                  <p className="mt-1 truncate text-xs text-orange-100/75">{album.note}</p>
                </div>
              </article>
            ))}
          </section>
        )}

        {activeTab === 'activity' && (
          <section className="mt-7 space-y-3">
            <div className="flex items-center gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-4 text-sm text-slate-300">
              <ShieldCheck className="shrink-0 text-orange-100" size={19} />
              Mock summaries only. No files or metadata are changed.
            </div>
            {forgeActivity.map((item) => (
              <article className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-black/24 p-4" key={item.id}>
                <Clock3 className="shrink-0 text-orange-100" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className="truncate text-xs text-slate-400">{item.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-500">{item.time}</span>
              </article>
            ))}
          </section>
        )}
      </div>

      <ForgeBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
