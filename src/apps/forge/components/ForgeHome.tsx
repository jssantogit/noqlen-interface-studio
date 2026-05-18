import { ChevronRight, Image, Music2, Settings, ShieldCheck, Tags } from 'lucide-react'
import { ForgeCard, ForgeScreenHeader } from './ForgeCard'

interface AttentionCardProps {
  icon: typeof Music2
  title: string
  subtitle: string
  accent: string
  bgTint: string
  onClick: () => void
}

function AttentionCard({ icon: Icon, title, subtitle, accent, bgTint, onClick }: AttentionCardProps) {
  return (
    <ForgeCard className="flex items-center gap-4 p-4" onClick={onClick}>
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${bgTint}`}>
        <Icon className={accent} size={24} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-medium leading-tight text-white">{title}</p>
        <p className="mt-1 text-sm text-white/55">{subtitle}</p>
      </div>
      <ChevronRight className="shrink-0 text-white/52" size={18} />
    </ForgeCard>
  )
}

export function ForgeHome({
  onReviewNow,
  onFilterReview,
  onOpenSettings,
  onOpenSafetyNote,
}: {
  onReviewNow: () => void
  onFilterReview: (filter: 'all' | 'artwork' | 'lyrics' | 'metadata', metadataFilter?: 'tags' | 'identity' | 'release' | 'audio') => void
  onOpenSettings: () => void
  onOpenSafetyNote: () => void
}) {
  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader
        rightAction={
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/[0.07] hover:text-white"
            onClick={onOpenSettings}
            type="button"
          >
            <Settings size={21} />
          </button>
        }
        title="Forge"
      />

      <div className="mb-7">
        <p className="mb-3 text-sm text-white/62">Good morning</p>
        <h2 className="max-w-[285px] font-serif text-[36px] leading-[0.98] tracking-[-0.04em] text-white">
          A few things are missing from your library.
        </h2>
        <p className="mt-5 max-w-[270px] text-sm leading-5 text-white/58">
          Let&apos;s bring everything up to date so your music always feels right.
        </p>
      </div>

      <button
        className="mb-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(234,154,92,0.18)] transition hover:bg-[#efad6c] active:scale-[0.99]"
        onClick={onReviewNow}
        type="button"
      >
        Review now
        <ChevronRight size={17} />
      </button>

      <h3 className="mb-3 text-sm font-medium text-white/82">What needs attention</h3>
      <div className="space-y-3">
        <AttentionCard
          accent="text-orange-300"
          bgTint="bg-orange-400/13"
          icon={Music2}
          onClick={() => onFilterReview('lyrics')}
          subtitle="are missing lyrics"
          title="2 tracks"
        />
        <AttentionCard
          accent="text-violet-300"
          bgTint="bg-violet-400/13"
          icon={Image}
          onClick={() => onFilterReview('artwork')}
          subtitle="need better covers"
          title="4 albums"
        />
        <AttentionCard
          accent="text-amber-300"
          bgTint="bg-amber-400/13"
          icon={Tags}
          onClick={() => onFilterReview('metadata', 'tags')}
          subtitle="are missing genres"
          title="3 songs"
        />
      </div>

      <ForgeCard className="mt-5 flex cursor-pointer items-center gap-3 p-4" onClick={onOpenSafetyNote}>
        <ShieldCheck className="shrink-0 text-white/60" size={21} />
        <p className="text-xs leading-5 text-white/48">Nothing changes until you confirm a preview.</p>
      </ForgeCard>
    </div>
  )
}
