import { useState } from 'react'
import { Download, FolderPlus, MoreHorizontal, Plus, Share, SlidersHorizontal } from 'lucide-react'
import type { AriaPlaylist } from '../ariaMockData'
import { ariaPlaylists } from '../ariaMockData'

type PlaylistFilter = 'All' | 'Folders' | 'Created' | 'Imported' | 'Favorites'
type SortMode = 'Recent' | 'A-Z' | 'Most tracks'

const actions = [
  { id: 'create', title: 'Create Playlist', subtitle: 'Start a new collection', icon: Plus, active: true },
  { id: 'folder', title: 'New Folder', subtitle: 'Group your playlists', icon: FolderPlus },
  { id: 'import', title: 'Import Playlist', subtitle: 'Mock import preview', icon: Download },
  { id: 'export', title: 'Export Playlist', subtitle: 'Preview export flow', icon: Share },
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
const filters: PlaylistFilter[] = ['All', 'Folders', 'Created', 'Imported', 'Favorites']
const sortModes: SortMode[] = ['Recent', 'A-Z', 'Most tracks']

function getPlaylistKind(index: number): Exclude<PlaylistFilter, 'All' | 'Folders'> {
  if (index === 1) return 'Imported'
  if (index === 2) return 'Favorites'
  return 'Created'
}

function getActionToast(actionId: string, title: string) {
  if (actionId === 'import') return 'Import preview only - no file access (mock)'
  if (actionId === 'export') return 'Export preview only - no file created (mock)'
  return `${title} (mock)`
}

export function AriaPlaylists({
  onOpenPlaylist,
  onShowToast,
}: {
  onOpenPlaylist: (playlist: AriaPlaylist) => void
  onShowToast: (message: string) => void
}) {
  const [selectedFilter, setSelectedFilter] = useState<PlaylistFilter>('All')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('Recent')

  const rowsWithMeta = playlistRows.map((playlist, index) => ({ playlist, index, kind: getPlaylistKind(index) }))
  const filteredRows = rowsWithMeta.filter((row) => {
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Folders') return selectedFolder ? row.index % folders.length === folders.findIndex((folder) => folder.title === selectedFolder) : false
    return row.kind === selectedFilter
  })
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortMode === 'A-Z') return a.playlist.title.localeCompare(b.playlist.title)
    if (sortMode === 'Most tracks') return b.playlist.trackCount - a.playlist.trackCount
    return a.index - b.index
  })

  const cycleSortMode = () => {
    const next = sortModes[(sortModes.indexOf(sortMode) + 1) % sortModes.length]
    setSortMode(next)
    onShowToast(`Sort: ${next} (mock)`)
  }

  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div>
        <h1 className="font-serif text-[50px] leading-[0.95] text-[#fff3e4]">Playlists</h1>
        <p className="mt-2 text-[18px] text-[#c9beb1]">Organize your listening spaces</p>
      </div>

      <section className="mt-4 grid grid-cols-2 gap-2.5">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              className={`rounded-[18px] border p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:bg-white/[0.05] ${
                action.active
                  ? 'border-[rgba(240,161,61,0.62)] bg-[linear-gradient(145deg,rgba(66,39,18,0.58),rgba(255,255,255,0.035))] text-[#f0a13d] shadow-[0_0_24px_rgba(240,161,61,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]'
                  : 'border-white/[0.075] bg-white/[0.035] text-[#d8cdc1]'
              }`}
              key={action.id}
              onClick={() => onShowToast(getActionToast(action.id, action.title))}
              type="button"
            >
              <Icon size={23} strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-[17px] leading-tight text-[#fff3e4]">{action.title}</h3>
              <p className="mt-1 text-[12px] leading-snug text-[#b9b1a7]">{action.subtitle}</p>
            </button>
          )
        })}
      </section>

      <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 anchor-scrollbar-none">
        {filters.map((filter) => (
          <button
            className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] transition ${
              selectedFilter === filter
                ? 'bg-gradient-to-b from-[#ffbd63] to-[#f09a35] text-[#1a1008] shadow-[0_8px_18px_rgba(240,161,61,0.18)]'
                : 'border border-white/[0.08] bg-white/[0.035] text-[#c8bdb1] hover:bg-white/[0.055]'
            }`}
            key={filter}
            onClick={() => {
              setSelectedFilter(filter)
              if (filter !== 'Folders') setSelectedFolder(null)
              onShowToast(`${filter} playlists (mock)`)
            }}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="mt-3">
        <h2 className="font-serif text-[24px] leading-none text-[#fff3e4]">Folders</h2>
        <div className="mt-2 overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {folders.map((folder) => (
            <button
              className="flex w-full items-center gap-3 border-b border-white/[0.055] px-4 py-1.5 text-left last:border-b-0 transition hover:bg-white/[0.035]"
              key={folder.id}
              onClick={() => {
                setSelectedFilter('Folders')
                setSelectedFolder(folder.title)
                onShowToast(`Opened ${folder.title} folder (mock)`)
              }}
              type="button"
            >
              <FolderPlus size={23} className="shrink-0 text-[#f0a13d]" strokeWidth={1.5} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-[16px] leading-tight text-[#fff3e4]">{folder.title}</span>
                <span className="mt-0.5 block text-[11px] text-[#b9b1a7]">{folder.count}</span>
              </span>
              <span className="text-[22px] text-[#c6bcb1]">›</span>
            </button>
          ))}
        </div>
        {selectedFilter === 'Folders' && selectedFolder && (
          <p className="mt-2 rounded-2xl border border-white/[0.075] bg-white/[0.035] px-3 py-2 text-[12px] text-[#c9beb1]">
            Showing mock contents for {selectedFolder}. No folder access is performed.
          </p>
        )}
      </section>

      <section className="mt-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[24px] leading-none text-[#fff3e4]">Your Playlists</h2>
          <button
            className="flex items-center gap-2 text-[15px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={cycleSortMode}
            type="button"
          >
            Sort: {sortMode} <SlidersHorizontal size={16} />
          </button>
        </div>
        <div className="mt-3 overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {sortedRows.map(({ playlist, index, kind }) => (
            <div
              className="flex min-w-0 items-center gap-3 border-b border-white/[0.055] p-2 last:border-b-0"
              key={playlist.id}
            >
              <button
                className={`aria-art aria-art-row ${rowArt[index % rowArt.length]} shrink-0`}
                aria-label={`${playlist.title} artwork`}
                onClick={() => onOpenPlaylist(playlist)}
                type="button"
              />
              <button
                className="min-w-0 flex-1 text-left"
                onClick={() => onOpenPlaylist(playlist)}
                type="button"
              >
                <h3 className="truncate font-serif text-[17px] leading-tight text-[#fff3e4]">{playlist.title}</h3>
                <p className="mt-1 truncate text-[12px] text-[#b9b1a7]">
                  {playlist.trackCount} tracks <span className="px-2 text-[#777d82]">•</span> {kind === 'Favorites' ? 'Favorite' : kind}
                </p>
              </button>
              <button
                aria-label={`More options for ${playlist.title}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#d8cec3] transition hover:bg-white/[0.06]"
                onClick={() => onShowToast(`Options for ${playlist.title} (mock)`)}
                type="button"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          ))}
          {sortedRows.length === 0 && (
            <div className="px-4 py-3 text-[13px] text-[#b9b1a7]">Select a folder or another filter to show mock playlists.</div>
          )}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
