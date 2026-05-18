import { ChevronRight, Image, Music2, Settings, ShieldCheck, Tags, Wand2 } from 'lucide-react'
import type { ForgeMockState } from '../forgeMockState'
import { ForgeCard, ForgeScreenHeader } from './ForgeCard'
import { ForgeStateNotice } from './ForgeStateNotice'

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
  mockState,
  onReviewNow,
  onFilterReview,
  onOpenSettings,
  onOpenSafetyNote,
  onOpenEnrichMode,
  onNavigateToLibrary,
  onNavigateToActivity,
}: {
  mockState: ForgeMockState
  onReviewNow: () => void
  onFilterReview: (filter: 'all' | 'artwork' | 'lyrics' | 'metadata', metadataFilter?: 'tags' | 'identity' | 'release' | 'audio') => void
  onOpenSettings: () => void
  onOpenSafetyNote: () => void
  onOpenEnrichMode: () => void
  onNavigateToLibrary: () => void
  onNavigateToActivity: () => void
}) {
  const { homeState, appOffline } = mockState

  const isNormal = homeState === 'normal'
  const hasIssues = isNormal

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

      {appOffline && (
        <ForgeStateNotice
          actions={[{ label: 'Open Settings', onClick: onOpenSettings, tone: 'secondary' }]}
          message="Forge is offline in this mock preview. No provider requests are sent."
          title="Offline preview"
          variant="warning"
        />
      )}

      {homeState === 'providersUnavailable' && (
        <ForgeStateNotice
          actions={[{ label: 'Open Settings', onClick: onOpenSettings, tone: 'secondary' }]}
          message="Metadata providers are unavailable in this mock state."
          title="Providers unavailable"
          variant="warning"
        />
      )}

      {homeState === 'missingCredentials' && (
        <ForgeStateNotice
          actions={[{ label: 'Configure providers', onClick: onOpenSettings, tone: 'primary' }]}
          message="Some providers need API credentials before suggestions can be generated."
          title="Provider credentials missing"
          variant="warning"
        />
      )}

      {homeState === 'enrichCompleted' && (
        <ForgeCard className="mb-5 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400/10">
              <Wand2 size={18} className="text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Enrich Mode completed</p>
              <p className="text-xs text-white/50">Mock preview finished successfully.</p>
            </div>
          </div>
          <button
            className="mt-3 h-9 w-full rounded-lg bg-[#e7a35f] text-xs font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:bg-[#efad6c]"
            onClick={onNavigateToActivity}
            type="button"
          >
            View Activity
          </button>
        </ForgeCard>
      )}

      <div className="mb-7">
        <p className="mb-3 text-sm text-white/62">Good morning</p>
        <h2 className="max-w-[285px] font-serif text-[36px] leading-[0.98] tracking-[-0.04em] text-white">
          {homeState === 'noIssues' ? 'Your library looks clean.' : 'A few things are missing from your library.'}
        </h2>
        <p className="mt-5 max-w-[270px] text-sm leading-5 text-white/58">
          {homeState === 'noIssues'
            ? 'Everything is up to date in this mock preview.'
            : "Let's bring everything up to date so your music always feels right."}
        </p>
      </div>

      {homeState === 'noIssues' ? (
        <div className="mb-8 flex flex-col gap-2.5">
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(234,154,92,0.18)] transition hover:bg-[#efad6c] active:scale-[0.99]"
            onClick={onNavigateToLibrary}
            type="button"
          >
            Open Library
            <ChevronRight size={17} />
          </button>
          <button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-transparent text-sm font-medium text-white/60 transition hover:bg-white/[0.04] hover:text-white/85"
            onClick={onOpenEnrichMode}
            type="button"
          >
            <Wand2 size={15} />
            Open Enrich Mode
          </button>
        </div>
      ) : (
        <button
          className="mb-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.8rem_1.5rem_rgba(234,154,92,0.18)] transition hover:bg-[#efad6c] active:scale-[0.99]"
          onClick={onReviewNow}
          type="button"
        >
          Review now
          <ChevronRight size={17} />
        </button>
      )}

      {hasIssues && (
        <>
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
        </>
      )}

      <ForgeCard className="mt-5 flex cursor-pointer items-center gap-3 p-4" onClick={onOpenSafetyNote}>
        <ShieldCheck className="shrink-0 text-white/60" size={21} />
        <p className="text-xs leading-5 text-white/48">Nothing changes until you confirm a preview.</p>
      </ForgeCard>
    </div>
  )
}
