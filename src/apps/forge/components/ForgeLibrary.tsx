import { ChevronRight, Music2, Search, UserRound } from 'lucide-react'
import { useState } from 'react'
import { albumData, artistData, songData, type MockAlbum, type MockArtist, type MockSong } from '../forgeMockData'
import { CoverGradient, ForgeScreenHeader, SegmentedControl } from './ForgeCard'

type Section = 'artists' | 'albums' | 'songs'

export function ForgeLibrary() {
  const [section, setSection] = useState<Section>('albums')
  const sectionIndex = section === 'artists' ? 0 : section === 'albums' ? 1 : 2
  const list = section === 'artists' ? artistData : section === 'songs' ? songData : albumData

  return (
    <div className="min-h-full px-7 pb-28 text-white">
      <ForgeScreenHeader rightAction={<Search className="text-white/76" size={22} />} title="Library" />
      <div className="mx-4 mb-3 h-10 rounded-xl border border-white/[0.06] bg-white/[0.045] px-4 text-sm leading-10 text-white/35">
        Search your library
      </div>
      <SegmentedControl
        activeIndex={sectionIndex}
        onChange={(index) => setSection(index === 0 ? 'artists' : index === 1 ? 'albums' : 'songs')}
        options={['Artists', 'Albums', 'Songs']}
      />

      <div className="mt-5 space-y-2">
        {list.map((item) => (
          <LibraryRow item={item} key={item.id} section={section} />
        ))}
      </div>
    </div>
  )
}

function LibraryRow({ item, section }: { item: MockAlbum | MockArtist | MockSong; section: Section }) {
  const title = 'name' in item ? item.name : item.title
  const subtitle = 'name' in item ? item.subtitle : 'album' in item ? `${item.artist} · ${item.album}` : item.artist
  const note = 'note' in item ? item.note : undefined

  return (
    <button className="group flex w-full items-center gap-3 rounded-2xl px-1 py-2.5 text-left transition hover:bg-white/[0.045]" type="button">
      {section === 'artists' ? (
        <div className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/70">
          <UserRound size={24} />
        </div>
      ) : section === 'songs' ? (
        <div className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-xl bg-white/[0.06] text-orange-300">
          <Music2 size={22} />
        </div>
      ) : (
        <CoverGradient className="h-[54px] w-[54px] shrink-0" gradient={(item as MockAlbum).coverGradient} />
      )}
      <div className="min-w-0 flex-1 border-b border-white/[0.045] pb-2.5">
        <p className="truncate text-[16px] font-medium text-white">{title}</p>
        <p className="mt-0.5 truncate text-sm text-white/48">{subtitle}</p>
        {note && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-orange-300/80">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300/80" />
            {note}
          </p>
        )}
      </div>
      <ChevronRight className="shrink-0 text-white/44 group-hover:text-white/70" size={18} />
    </button>
  )
}
