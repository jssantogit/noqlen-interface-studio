import type { NavidromeConfigDraft, NavidromeSettingCategory } from '../navidromeConfigCatalog'
import { navidromeConfigCatalog, navidromeSettingCategories } from '../navidromeConfigCatalog'
import { AnchorNavidromeSettingField } from './AnchorNavidromeSettingField'

export function AnchorNavidromeSettingsSection({
  category,
  draft,
  onChange,
}: {
  category: NavidromeSettingCategory
  draft: NavidromeConfigDraft
  onChange: (key: string, value: string | number | boolean) => void
}) {
  const categoryMeta = navidromeSettingCategories.find((item) => item.key === category)
  const options = navidromeConfigCatalog.filter((option) => option.category === category)

  if (category === 'advanced') return null

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-amber-300/13 bg-amber-300/[0.055] p-3.5">
        <h3 className="font-serif text-xl tracking-[-0.045em] text-white">{categoryMeta?.label}</h3>
        <p className="mt-1 text-xs leading-5 text-amber-50/78">{categoryMeta?.description}</p>
      </div>
      {options.map((option) => (
        <AnchorNavidromeSettingField draft={draft} key={option.key} onChange={onChange} option={option} />
      ))}
    </div>
  )
}
