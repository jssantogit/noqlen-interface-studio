import { Download, FolderPlus, MoreHorizontal, Play, Plus, Share, SlidersHorizontal } from 'lucide-react'
import { ariaPlaylists } from '../ariaMockData'

const actions = [
  { id: 'create', title: 'Create Playlist', subtitle: 'Start a new collection', icon: Plus, active: true },
  { id: 'folder', title: 'New Folder', subtitle: 'Group your playlists', icon: FolderPlus },
  { id: 'import', title: 'Import Playlist', subtitle: 'Bring playlists from file', icon: Download },
  { id: 'export', title: 'Export Playlist', subtitle: 'Save or share your lists', icon: Share },
]

const folders = [
  { id: 'metal', title: 'Metal Collections', count: '8 playlists' },
  { id: 'study', title: 'Study Sessions', count: '5 playlists' },
  { id: 'ambient', title: 'Ambient / Focus', count: '4 playlists' },
]

const playlistRows = [
  ...ariaPlaylists,
  { id: 'prog-archives', title: 'Prog Archives', description: 'Long-form records and live favorites.', trackCount: 126, duration: '8h 14m', accent: 'from-stone-200 via-stone-500 to-slate-900' },
  { id: 'late-ambient', title: 'Late Ambient', description: 'Low light textures and piano fragments.', trackCount: 32, duration: '2h 42m', accent: 'from-violet-200 via-violet-500 to-slate-900' },
]

const rowArt = ['aria-art-waves', 'aria-art-architecture', 'aria-art-mountain', 'aria-art-hall', 'aria-art-violet']

export function AriaPlaylists({ onShowToast }: { onShowToast: (message: string) => void }) {
  const featured = ariaPlaylists[1]

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div>
        <h1 className="font-serif text-[50px] leading-[0.95] text-[#fff3e4]">Playlists</h1>
        <p className="mt-2 text-[18px] text-[#c9beb1]">Organize your listening spaces</p>
      </div>

      <section className="mt-5 overflow-hidden rounded-[24px] border border-[rgba(240,161,61,0.22)] bg-[linear-gradient(145deg,rgba(60,35,16,0.42),rgba(255,255,255,0.035))] p-3 shadow-[0_18px_36px_rgba(0,0,0,0.28),0_0_34px_rgba(240,161,61,0.08)]">
        <div className="flex gap-4">
          <div className="aria-art aria-art-feature-sm aria-art-waves shrink-0" />
          <div className="min-w-0 flex-1 py-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#f0a13d]">Featured</p>
            <h2 className="mt-2 font-serif text-[25px] leading-none text-[#fff3e4]">{featured.title}</h2>
            <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-[#c8bdb1]">{featured.description}</p>
            <p className="mt-3 text-[12px] text-[#918980]">{featured.trackCount} tracks · {featured.duration}</p>
            <div className="mt-4 flex items-center gap-2">
              <button
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[#1a1008] shadow-[0_8px_18px_rgba(240,161,61,0.22)] transition active:scale-[0.98]"
                onClick={() => onShowToast(`Play ${featured.title} (mock)`)}
                type="button"
              >
                <Play size={14} fill="currentColor" />
              </button>
              <button
                className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.1] bg-white/[0.045] text-[#d3c7bb] transition hover:bg-white/[0.07]"
                onClick={() => onShowToast('Featured options (mock)')}
                type="button"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              className={`rounded-[20px] border p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.05] ${
                action.active
                  ? 'border-[rgba(240,161,61,0.62)] bg-[linear-gradient(145deg,rgba(66,39,18,0.58),rgba(255,255,255,0.035))] text-[#f0a13d] shadow-[0_0_24px_rgba(240,161,61,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'border-white/[0.075] bg-white/[0.035] text-[#d8cdc1]'
              }`}
              key={action.id}
              onClick={() => onShowToast(`${action.title} (mock)`)}
              type="button"
            >
              <Icon size={27} strokeWidth={1.5} />
              <h3 className="mt-7 font-serif text-[18px] leading-tight text-[#fff3e4]">{action.title}</h3>
              <p className="mt-1 text-[12px] leading-snug text-[#b9b1a7]">{action.subtitle}</p>
            </button>
          )
        })}
      </section>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-1 anchor-scrollbar-none">
        {['All', 'Folders', 'Created', 'Imported', 'Favorites'].map((filter, index) => (
          <button
            className={`shrink-0 rounded-full px-5 py-2 text-[14px] transition ${
              index === 0
                ? 'bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[#1a1008] shadow-[0_8px_18px_rgba(240,161,61,0.18)]'
                : 'border border-white/[0.08] bg-white/[0.035] text-[#c8bdb1] hover:bg-white/[0.055]'
            }`}
            key={filter}
            onClick={() => onShowToast(`${filter} filter (mock)`)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="mt-4">
        <h2 className="font-serif text-[24px] leading-none text-[#fff3e4]">Folders</h2>
        <div className="mt-2 overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {folders.map((folder) => (
            <button
              className="flex w-full items-center gap-4 border-b border-white/[0.055] px-4 py-3 text-left last:border-b-0 transition hover:bg-white/[0.035]"
              key={folder.id}
              onClick={() => onShowToast(`${folder.title} (mock)`)}
              type="button"
            >
              <FolderPlus size={25} className="shrink-0 text-[#f0a13d]" strokeWidth={1.5} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-[17px] leading-tight text-[#fff3e4]">{folder.title}</span>
                <span className="mt-1 block text-[12px] text-[#b9b1a7]">{folder.count}</span>
              </span>
              <span className="text-[22px] text-[#c6bcb1]">›</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[24px] leading-none text-[#fff3e4]">Your Playlists</h2>
          <button
            className="flex items-center gap-2 text-[15px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => onShowToast('Sort playlists (mock)')}
            type="button"
          >
            Sort <SlidersHorizontal size={16} />
          </button>
        </div>
        <div className="mt-3 overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {playlistRows.map((playlist, index) => (
            <div
              className="flex min-w-0 items-center gap-3 border-b border-white/[0.055] p-2.5 last:border-b-0"
              key={playlist.id}
            >
              <button
                className={`aria-art aria-art-row ${rowArt[index % rowArt.length]} shrink-0`}
                aria-label={`${playlist.title} artwork`}
                onClick={() => onShowToast(`${playlist.title} (mock)`)}
                type="button"
              />
              <button
                className="min-w-0 flex-1 text-left"
                onClick={() => onShowToast(`${playlist.title} (mock)`)}
                type="button"
              >
                <h3 className="truncate font-serif text-[17px] leading-tight text-[#fff3e4]">{playlist.title}</h3>
                <p className="mt-1 truncate text-[12px] text-[#b9b1a7]">
                  {playlist.trackCount} tracks <span className="px-2 text-[#777d82]">•</span> {index === 1 ? 'Imported' : index === 2 ? 'Favorite' : 'Created'}
                </p>
              </button>
              <button
                aria-label={`More options for ${playlist.title}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#d8cec3] transition hover:bg-white/[0.06]"
                onClick={() => onShowToast('More options (mock)')}
                type="button"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
