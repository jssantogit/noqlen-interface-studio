import { Filter } from 'lucide-react'
import { anchorActivity } from '../anchorMockData'
import { AnchorActivityItem } from './AnchorActivityItem'
import { AnchorCard, AnchorIconButton, AnchorScreenHeader } from './AnchorCard'

export function AnchorActivity() {
  return (
    <div className="px-5 pt-5">
      <AnchorScreenHeader
        action={
          <AnchorIconButton label="Filter activity">
            <Filter size={21} />
          </AnchorIconButton>
        }
        subtitle="Recent events and system activity."
        title="Activity"
      />

      <section>
        <h2 className="mb-3 text-sm font-semibold text-white">Today</h2>
        <AnchorCard className="overflow-hidden">
          {anchorActivity.today.map((item) => (
            <AnchorActivityItem
              detail={item.detail}
              hasDetails={item.hasDetails}
              key={`${item.title}-${item.time}`}
              time={item.time}
              title={item.title}
              tone={item.tone}
            />
          ))}
        </AnchorCard>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-sm font-semibold text-white">Yesterday</h2>
        <AnchorCard className="overflow-hidden">
          {anchorActivity.yesterday.map((item) => (
            <AnchorActivityItem
              detail={item.detail}
              hasDetails={item.hasDetails}
              key={`${item.title}-${item.time}`}
              time={item.time}
              title={item.title}
              tone={item.tone}
            />
          ))}
        </AnchorCard>
      </section>
    </div>
  )
}
