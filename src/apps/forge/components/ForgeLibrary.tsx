import { ChevronRight, Music2, Search, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { albumData, artistData, songData, type MockAlbum, type MockArtist, type MockSong } from '../forgeMockData'
import { CoverGradient, ForgeScreenHeader, SegmentedControl } from './ForgeCard'

type Section = 'artists' | 'albums' | 'songs'

export interface ForgeLibraryProps {
  onOpenArtistEditor: (artist: MockArtist, initialTab?: string) => void
  onOpenAlbumEditor: (album: MockAlbum, initialTab?: string) => void
  onOpenTrackEditor: (song: MockSong, initialTab?: string) => void
}

export function ForgeLibrary({ onOpenArtistEditor, onOpenAlbumEditor, onOpenTrackEditor }: ForgeLibraryProps) {
  const [section, setSection] = useState<Section>('albums')
  const [query, setQuery] = useState('')
  const sectionIndex = section === 'artists' ? 0 : section === 'albums' ? 1 : 2
  const baseList = section === 'artists' ? artistData : section === 'songs' ? songData : albumData

  const list = useMemo(() => {
    if (!query.trim()) return baseList
    const q = query.toLowerCase()
    return baseList.filter((item) => {
      const title = 'name' in item ? item.name : item.title
      const subtitle = 'name' in item ? item.subtitle : 'album' in item ? `${item.artist} \u00b7 ${item.album}` : item.artist
      return title.toLowerCase().includes(q) || subtitle.toLowerCase().includes(q)
    })
  }, [baseList, query])

  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader
        rightAction={
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/[0.07] hover:text-white"
            type="button"
          >
            <Search size={21} />
          </button>
        }
        title="Library"
      />
      <div className="mx-4 mb-3 flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.045] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Search className="shrink-0 text-white/30" size={16} />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your library"
          type="text"
          value={query}
        />
      </div>
      <SegmentedControl
        activeIndex={sectionIndex}
        onChange={(index) => {
          setSection(index === 0 ? 'artists' : index === 1 ? 'albums' : 'songs')
          setQuery('')
        }}
        options={['Artists', 'Albums', 'Songs']}
      />

      <div className="mt-5 space-y-1">
        {list.length === 0 && (
          <div className="mt-8 flex flex-col items-center gap-2 text-center">
            <p className="text-sm text-white/50">No results found</p>
            <p className="text-xs text-white/35">Try a different search term.</p>
          </div>
        )}
        {list.map((item) => (
          <LibraryRow
            item={item}
            key={item.id}
            onOpenAlbumEditor={onOpenAlbumEditor}
            onOpenArtistEditor={onOpenArtistEditor}
            onOpenTrackEditor={onOpenTrackEditor}
            section={section}
          />
        ))}
      </div>
    </div>
  )
}

function LibraryRow({
  item,
  section,
  onOpenArtistEditor,
  onOpenAlbumEditor,
  onOpenTrackEditor,
}: {
  item: MockAlbum | MockArtist | MockSong
  section: Section
  onOpenArtistEditor: (artist: MockArtist, initialTab?: string) => void
  onOpenAlbumEditor: (album: MockAlbum, initialTab?: string) => void
  onOpenTrackEditor: (song: MockSong, initialTab?: string) => void
}) {
  const title = 'name' in item ? item.name : item.title
  const subtitle = 'name' in item ? item.subtitle : 'album' in item ? `${item.artist} \u00b7 ${item.album}` : item.artist
  const note = 'note' in item ? item.note : undefined

  const handleTap = () => {
    if (section === 'artists') {
      onOpenArtistEditor(item as MockArtist)
    } else if (section === 'albums') {
      onOpenAlbumEditor(item as MockAlbum)
    } else {
      onOpenTrackEditor(item as MockSong)
    }
  }

  const handleNoteTap = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!note) return
    if (section === 'artists') return
    if (note.includes('lyrics')) {
      onOpenTrackEditor(item as MockSong, 'Lyrics')
    } else if (note.includes('genre')) {
      onOpenTrackEditor(item as MockSong, 'Metadata')
    } else if (note.includes('cover')) {
      onOpenAlbumEditor(item as MockAlbum, 'Artwork')
    }
  }

  return (
    <button className="group flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left transition hover:bg-white/[0.045]" onClick={handleTap} type="button">
      {section === 'artists' ? (
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <UserRound size={22} />
        </div>
      ) : section === 'songs' ? (
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl bg-orange-400/10 text-orange-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <Music2 size={20} />
        </div>
      ) : (
        <CoverGradient className="h-[52px] w-[52px] shrink-0 rounded-xl" gradient={(item as MockAlbum).coverGradient} />
      )}
      <div className="min-w-0 flex-1 border-b border-white/[0.045] pb-2">
        <p className="truncate text-[15px] font-medium text-white">{title}</p>
        <p className="mt-0.5 truncate text-sm text-white/48">{subtitle}</p>
        {note && (
          <button className="mt-1 flex items-center gap-1.5 text-xs text-orange-300/90" onClick={handleNoteTap} type="button">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300/90" />
            {note}
          </button>
        )}
      </div>
      <ChevronRight className="shrink-0 text-white/44 group-hover:text-white/70" size={18} />
    </button>
  )
}
