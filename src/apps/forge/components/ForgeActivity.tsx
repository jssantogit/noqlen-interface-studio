import { Check, CheckCircle2, Clock3, Image, Tags } from 'lucide-react'
import type { ActivityItem } from '../forgeMockData'
import { activityItems } from '../forgeMockData'
import { ForgeCard, ForgeScreenHeader } from './ForgeCard'

const iconMap = { CheckCircle2, Image, Tags, Clock3, Check }

export function ForgeActivity() {
  const todayItems = activityItems.filter((item) => item.time.includes('AM'))
  const yesterdayItems = activityItems.filter((item) => !item.time.includes('AM'))

  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader title="Activity" />

      <h3 className="mb-3 text-sm font-semibold text-white/85">Today</h3>
      <div className="space-y-3">
        {todayItems.map((item) => (
          <ActivityCard item={item} key={item.id} />
        ))}
      </div>

      <h3 className="mb-3 mt-7 text-sm font-semibold text-white/65">Yesterday</h3>
      <div className="space-y-3">
        {yesterdayItems.map((item) => (
          <ActivityCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

function ActivityCard({ item }: { item: ActivityItem }) {
  const Icon = iconMap[item.icon]
  const isReview = item.id === 'still-review'

  return (
    <ForgeCard className="flex items-center gap-4 p-4">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${item.bgAccent} shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`}>
        <Icon className={item.accent} size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-medium text-white">{item.title}</p>
          <span className="shrink-0 text-xs text-white/46">{item.time}</span>
        </div>
        <p className="mt-1 text-sm text-white/52">{item.subtitle}</p>
      </div>
      <span className={`shrink-0 rounded-xl px-3 py-2 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${isReview ? 'bg-orange-400/13 text-orange-200' : 'bg-white/[0.07] text-white/82'}`}>
        {isReview ? 'Review' : 'Summary'}
      </span>
    </ForgeCard>
  )
}
