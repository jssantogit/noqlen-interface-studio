import { ChevronRight, Disc3, Folder, Gem, Music2, Search, Settings, Tags, UsersRound } from 'lucide-react'
import type { AriaAlbum, AriaPlaylist } from '../ariaMockData'
import { ariaAlbums, ariaPlaylists } from '../ariaMockData'

type LibraryCategoryId = 'songs' | 'albums' | 'artists' | 'genres' | 'folders' | 'compilations' | 'playlists' | 'recent' | 'search'
type LibraryPageCategoryId = Exclude<LibraryCategoryId, 'playlists' | 'search'>

const categories: { id: LibraryPageCategoryId; label: string; count: string; icon: typeof Music2 }[] = [
  { id: 'songs', label: 'Songs', count: '1,200', icon: Music2 },
  { id: 'albums', label: 'Albums', count: '245', icon: Disc3 },
  { id: 'artists', label: 'Artists', count: '168', icon: UsersRound },
  { id: 'genres', label: 'Genres', count: '32', icon: Tags },
  { id: 'folders', label: 'Folders', count: '48', icon: Folder },
  { id: 'compilations', label: 'Compilations', count: '12', icon: Gem },
]

const playlistArt = ['aria-art-blue', 'aria-art-dune', 'aria-art-record']
const recentArt = ['aria-art-tree', 'aria-art-violet', 'aria-art-mountain']

export function AriaLibrary({
  onOpenAlbum,
  onOpenPlaylist,
  onOpenSettings,
  onOpenLibraryCategory,
  onOpenLibrarySearch,
  onNavigateToPlaylists,
  onShowToast,
}: {
  onOpenAlbum: (album: AriaAlbum) => void
  onOpenPlaylist: (playlist: AriaPlaylist) => void
  onOpenSettings: () => void
  onOpenLibraryCategory: (category: LibraryPageCategoryId) => void
  onOpenLibrarySearch: () => void
  onNavigateToPlaylists: () => void
  onShowToast: (message: string) => void
}) {
  return (
    <div className="min-h-full min-w-0 overflow-x-hidden px-4 pt-6 text-[#f5ecdf]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[46px] leading-[0.95] text-[#fff3e4]">Library</h1>
          <p className="mt-2 text-[19px] text-[#f3b073]">Local library</p>
        </div>
        <div className="flex items-center gap-4 pt-1 text-[#f0a13d]">
          <button
            aria-label="Aria settings"
            className="grid h-10 w-10 place-items-center rounded-full text-[#ffd28b] transition hover:bg-white/[0.04]"
            onClick={onOpenSettings}
            type="button"
          >
            <Settings size={28} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Library search"
            className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/[0.04]"
            onClick={() => {
              onOpenLibrarySearch()
              onShowToast('Library search preview (mock)')
            }}
            type="button"
          >
            <Search size={30} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <section className="mt-5 space-y-1.5">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              className="group flex w-full items-center gap-4 rounded-[16px] px-1 py-1 text-left transition hover:bg-white/[0.035]"
              key={cat.id}
              onClick={() => onOpenLibraryCategory(cat.id)}
              type="button"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center text-[#ffad26]">
                <Icon size={25} strokeWidth={1.55} />
              </span>
              <span className="flex-1 text-[19px] leading-none text-[#fff3e4]">{cat.label}</span>
              <span className="text-[17px] tabular-nums text-[#b5aa9d]">{cat.count}</span>
              <ChevronRight size={24} className="text-[#ffb05d] transition group-hover:translate-x-0.5" strokeWidth={1.7} />
            </button>
          )
        })}
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[27px] leading-none text-[#fff3e4]">My Playlists</h2>
          <button
            className="text-[19px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={onNavigateToPlaylists}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-3.5">
          {ariaPlaylists.map((playlist, index) => (
            <button
              className="overflow-hidden rounded-[14px] border border-white/[0.075] bg-white/[0.035] text-left shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition hover:bg-white/[0.055]"
              key={playlist.id}
              onClick={() => onOpenPlaylist(playlist)}
              type="button"
            >
              <div className={`aria-art aria-art-card ${playlistArt[index % playlistArt.length]}`} />
                <div className="p-2.5">
                  <h3 className="truncate text-[15px] font-medium leading-tight text-[#fff3e4]">{playlist.title}</h3>
                  <p className="mt-1 text-[13px] text-[#b9b1a7]">{playlist.trackCount} Tracks</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[27px] leading-none text-[#fff3e4]">Recently Added</h2>
          <button
            className="text-[19px] text-[#f0a13d] transition hover:text-[#ffb958]"
            onClick={() => onOpenLibraryCategory('recent')}
            type="button"
          >
            See all
          </button>
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-3.5">
          {ariaAlbums.slice(0, 3).map((album, index) => (
            <button
              className="overflow-hidden rounded-[14px] text-left transition hover:opacity-90"
              key={album.id}
              onClick={() => onOpenAlbum(album)}
              type="button"
            >
              <div className={`aria-art aria-art-poster ${recentArt[index % recentArt.length]}`} />
            </button>
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  )
}
