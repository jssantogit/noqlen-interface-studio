import { ChevronRight, Music2, Search, UserRound, Image, Tag, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { albumData, artistData, songData, type MockAlbum, type MockArtist, type MockSong } from '../forgeMockData'
import type { ForgeMockState } from '../forgeMockState'
import { CoverGradient, ForgeScreenHeader, SegmentedControl } from './ForgeCard'
import { ForgeEmptyState } from './ForgeEmptyState'
import { ForgeStateNotice } from './ForgeStateNotice'

type Section = 'artists' | 'albums' | 'songs'

export interface ForgeLibraryProps {
  mockState: ForgeMockState
  onOpenArtistEditor: (artist: MockArtist, initialTab?: string) => void
  onOpenAlbumEditor: (album: MockAlbum, initialTab?: string) => void
  onOpenTrackEditor: (song: MockSong, initialTab?: string) => void
  onOpenSettings?: () => void
}

export function ForgeLibrary({ mockState, onOpenArtistEditor, onOpenAlbumEditor, onOpenTrackEditor, onOpenSettings }: ForgeLibraryProps) {
  const [section, setSection] = useState<Section>('albums')
  const [query, setQuery] = useState('')
  const sectionIndex = section === 'artists' ? 0 : section === 'albums' ? 1 : 2
  const baseList = section === 'artists' ? artistData : section === 'songs' ? songData : albumData

  const list = useMemo(() => {
    if (mockState.libraryState === 'empty') return []
    if (!query.trim()) return baseList
    const q = query.toLowerCase()
    return baseList.filter((item) => {
      const title = 'name' in item ? item.name : item.title
      const subtitle = 'name' in item ? item.subtitle : 'album' in item ? `${item.artist} · ${item.album}` : item.artist
      return title.toLowerCase().includes(q) || subtitle.toLowerCase().includes(q)
    })
  }, [baseList, query, mockState.libraryState])

  const showMissingArtwork = mockState.libraryState === 'missingArtwork'
  const showMetadataIncomplete = mockState.libraryState === 'metadataIncomplete'

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

      {showMissingArtwork && (
        <ForgeStateNotice
          message="Some albums are missing artwork. Add covers in the Artwork tab of each album."
          title="Missing artwork"
          variant="info"
        />
      )}

      {showMetadataIncomplete && (
        <ForgeStateNotice
          message="Some items are missing tags, covers or lyrics. Review the orange badges below."
          title="Metadata incomplete"
          variant="warning"
        />
      )}

      <div className="mt-5 space-y-1">
        {list.length === 0 && (
          mockState.libraryState === 'empty' ? (
            <ForgeEmptyState
              actions={[
                { label: 'Open Settings', onClick: onOpenSettings || (() => {}), tone: 'secondary' },
              ]}
              title="No music found"
              message="Add a library folder in Anchor or run Enrich Mode after importing tracks."
            />
          ) : (
            <div className="mt-8 flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-white/50">No results found</p>
              <p className="text-xs text-white/35">Try a different search term or clear filters.</p>
              {query && (
                <button
                  className="mt-2 h-8 rounded-lg border border-white/[0.065] bg-white/[0.045] px-4 text-xs font-medium text-white transition hover:bg-white/[0.075]"
                  onClick={() => setQuery('')}
                  type="button"
                >
                  Clear search
                </button>
              )}
            </div>
          )
        )}
        {list.map((item) => (
          <LibraryRow
            item={item}
            key={item.id}
            onOpenAlbumEditor={onOpenAlbumEditor}
            onOpenArtistEditor={onOpenArtistEditor}
            onOpenTrackEditor={onOpenTrackEditor}
            section={section}
            showMissingArtwork={showMissingArtwork}
            showMetadataIncomplete={showMetadataIncomplete}
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
  showMissingArtwork,
  showMetadataIncomplete,
}: {
  item: MockAlbum | MockArtist | MockSong
  section: Section
  onOpenArtistEditor: (artist: MockArtist, initialTab?: string) => void
  onOpenAlbumEditor: (album: MockAlbum, initialTab?: string) => void
  onOpenTrackEditor: (song: MockSong, initialTab?: string) => void
  showMissingArtwork?: boolean
  showMetadataIncomplete?: boolean
}) {
  const title = 'name' in item ? item.name : item.title
  const subtitle = 'name' in item ? item.subtitle : 'album' in item ? `${item.artist} · ${item.album}` : item.artist
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

  const missingCover = showMissingArtwork && section === 'albums'
  const missingTags = showMetadataIncomplete && section === 'songs' && (item as MockSong).genres.length === 0
  const missingLyricsBadge = showMetadataIncomplete && section === 'songs' && !(item as MockSong).lyrics

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
      ) : missingCover ? (
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl bg-white/[0.05] text-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <Image size={20} />
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
        {(missingTags || missingLyricsBadge) && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {missingTags && (
              <span className="inline-flex items-center gap-1 rounded-md bg-orange-400/10 px-1.5 py-0.5 text-[10px] text-orange-300/80">
                <Tag size={9} /> Missing tags
              </span>
            )}
            {missingLyricsBadge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-orange-400/10 px-1.5 py-0.5 text-[10px] text-orange-300/80">
                <FileText size={9} /> Missing lyrics
              </span>
            )}
            {missingCover && (
              <span className="inline-flex items-center gap-1 rounded-md bg-orange-400/10 px-1.5 py-0.5 text-[10px] text-orange-300/80">
                <Image size={9} /> Missing cover
              </span>
            )}
          </div>
        )}
      </div>
      <ChevronRight className="shrink-0 text-white/44 group-hover:text-white/70" size={18} />
    </button>
  )
}
