import { Check, Image, Music2, Tags } from 'lucide-react'
import { useState } from 'react'
import { reviewGroups } from '../forgeMockData'
import { CoverGradient } from './ForgeCard'
import { ForgeScreenHeader } from './ForgeCard'

const iconMap = { Music2, Image, Tags }

export function ForgeReview() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(['The Whole Universe Wants', 'Says', 'A Place', 'My Friend the Forest', 'The Bells']),
  )
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(['lyrics', 'covers', 'genres']))

  const allItems = reviewGroups.flatMap((group) => group.items)

  const toggle = (item: string) => {
    const next = new Set(selected)
    if (next.has(item)) next.delete(item)
    else next.add(item)
    setSelected(next)
  }

  const toggleGroup = (groupId: string) => {
    const next = new Set(openGroups)
    if (next.has(groupId)) next.delete(groupId)
    else next.add(groupId)
    setOpenGroups(next)
  }

  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader title="Review" />
      <p className="-mt-5 mb-5 text-sm leading-5 text-white/52">Select items to fix or ignore.</p>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <button className="min-h-11 rounded-xl bg-[#e7a35f] px-2 text-[11px] font-semibold leading-tight text-black transition hover:bg-[#efad6c]" type="button">
          Fix selected ({selected.size})
        </button>
        <button className="min-h-11 rounded-xl bg-white/[0.07] px-2 text-[11px] font-medium leading-tight text-white/82 transition hover:bg-white/[0.1]" onClick={() => setSelected(new Set(allItems))} type="button">
          Fix all ({allItems.length})
        </button>
        <button className="min-h-11 rounded-xl bg-white/[0.07] px-2 text-[11px] font-medium leading-tight text-white/82 transition hover:bg-white/[0.1]" onClick={() => setSelected(new Set())} type="button">
          Ignore selected
        </button>
      </div>

      <div className="space-y-3">
        {reviewGroups.map((group) => {
          const Icon = iconMap[group.icon]
          const isOpen = openGroups.has(group.id)
          return (
            <section className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-3" key={group.id}>
              <button className="flex w-full items-center gap-3 text-left" onClick={() => toggleGroup(group.id)} type="button">
                <Icon className={`${group.accent} shrink-0`} size={18} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{group.title}</p>
                  <p className="text-[11px] text-white/45">{group.items.length} items</p>
                </div>
                <span className="rounded-xl bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-orange-200">{isOpen ? 'Hide' : 'Show'}</span>
              </button>

              {isOpen && (
                <div className="mt-3 space-y-1">
                  {group.items.map((item) => {
                    const active = selected.has(item)
                    return (
                      <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/[0.045]" key={item} onClick={() => toggle(item)} type="button">
                        <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[10px] transition ${active ? 'border-[#e7a35f] bg-[#e7a35f] text-black' : 'border-white/25 text-transparent'}`}>
                          <Check size={13} />
                        </span>
                        <CoverGradient className="h-9 w-9 shrink-0 rounded-lg" gradient="from-stone-200 via-stone-500 to-stone-950" />
                        <span className="min-w-0 flex-1 truncate text-sm text-white/80">{item}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
