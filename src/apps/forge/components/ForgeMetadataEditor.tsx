import { ArrowLeft, BadgeCheck, ImageIcon, Search } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { MockAlbum, MockArtist, MockSong } from '../forgeMockData'
import type { ForgeMockState } from '../forgeMockState'
import { CoverGradient } from './ForgeCard'
import { ForgeStateNotice } from './ForgeStateNotice'

export type EditorEntityType = 'artist' | 'album' | 'track'

export interface ForgeMetadataEditorProps {
  entityType: EditorEntityType
  entity: MockArtist | MockAlbum | MockSong
  albums?: MockAlbum[]
  songs?: MockSong[]
  onClose: () => void
  onSave: (updated: MockArtist | MockAlbum | MockSong) => void
  mockState: ForgeMockState
  initialTab?: string
  showConfirm: (opts: {
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
    tone?: 'amber' | 'danger'
  }) => void
  onOpenTrackEditor?: (track: MockSong) => void
  onOpenAlbumEditor?: (album: MockAlbum) => void
}

/* ---------- Tabs per entity ---------- */
const TABS: Record<EditorEntityType, string[]> = {
  track: ['Overview', 'Artwork', 'Lyrics', 'Metadata', 'Audio', 'File info'],
  album: ['Overview', 'Artwork', 'Metadata', 'Release', 'Tracks', 'File info'],
  artist: ['Overview', 'Image', 'Metadata', 'Albums', 'Identity'],
}

/* ---------- Helpers ---------- */
function isProtectedField(label: string): boolean {
  const lower = label.toLowerCase()
  return lower.includes('mbid') || lower.includes('acoustid') || lower.includes('isrc') || lower.includes('musicbrainz')
}

/* ---------- Editable field row ---------- */
function EditableField({
  label,
  current,
  value,
  onChange,
  multiline = false,
  note,
  source,
}: {
  label: string
  current: string
  value: string
  onChange: (val: string) => void
  multiline?: boolean
  note?: string
  source?: string
}) {
  const changed = value !== current
  const protectedNote = isProtectedField(label) ? 'Protected identity field. Review before applying.' : undefined

  return (
    <div className="space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/42">{label}</p>
        {source && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-2 py-1 text-[10px] font-semibold text-[#f0b879]">
            <BadgeCheck size={10} />
            {source}
          </span>
        )}
      </div>
      <div className="rounded-lg bg-black/20 p-2">
        <p className="text-[10px] uppercase tracking-wider text-white/34">Current</p>
        <p className={`mt-1 text-xs leading-4 ${current ? 'text-white/60' : 'italic text-white/30'}`}>
          {current || 'Empty'}
        </p>
      </div>
      {multiline ? (
        <textarea
          className="w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 py-2.5 text-xs leading-5 text-white placeholder:text-white/25 focus:border-[#e7a35f]/40 focus:outline-none focus:ring-1 focus:ring-[#e7a35f]/20"
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter new ${label.toLowerCase()}`}
          rows={3}
          value={value}
        />
      ) : (
        <input
          className="h-9 w-full rounded-lg border border-white/[0.08] bg-black/25 px-3 text-xs text-white placeholder:text-white/25 focus:border-[#e7a35f]/40 focus:outline-none focus:ring-1 focus:ring-[#e7a35f]/20"
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter new ${label.toLowerCase()}`}
          type="text"
          value={value}
        />
      )}
      {changed && (
        <p className="text-[10px] text-[#f0b879]/80">Changed</p>
      )}
      {(protectedNote || note) && (
        <p className="text-[11px] leading-4 text-orange-200/60">{protectedNote || note}</p>
      )}
    </div>
  )
}

/* ---------- Read-only field row ---------- */
function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 rounded-xl border border-white/[0.06] bg-white/[0.035] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/42">{label}</p>
      <p className="text-xs leading-4 text-white/60">{value || '—'}</p>
    </div>
  )
}

/* ---------- Image picker mini-sheet ---------- */
function ForgeImagePickerSheet({
  title,
  onClose,
  onSelect,
}: {
  title: string
  onClose: () => void
  onSelect: (gradient: string, source: string) => void
}) {
  const [mode, setMode] = useState<'gallery' | 'search'>('gallery')
  const [query, setQuery] = useState('')

  const galleryOptions = [
    { gradient: 'from-amber-100 via-orange-300 to-stone-700', label: 'IMG_2023_001.jpg' },
    { gradient: 'from-slate-200 via-slate-400 to-stone-800', label: 'IMG_2023_002.jpg' },
    { gradient: 'from-zinc-300 via-zinc-500 to-neutral-900', label: 'IMG_2023_003.jpg' },
  ]

  const searchResults = [
    { provider: 'Discogs', gradient: 'from-amber-100 via-orange-400 to-stone-800', label: 'Discogs result 1' },
    { provider: 'MusicBrainz Cover Art', gradient: 'from-stone-200 via-stone-500 to-stone-950', label: 'MB result 1' },
    { provider: 'Deezer', gradient: 'from-neutral-200 via-stone-400 to-stone-800', label: 'Deezer result 1' },
    { provider: 'iTunes', gradient: 'from-zinc-200 via-zinc-500 to-zinc-900', label: 'iTunes result 1' },
  ]

  const filtered = mode === 'search' && query.trim()
    ? searchResults.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()) || r.provider.toLowerCase().includes(query.toLowerCase()))
    : searchResults

  return (
    <div className="absolute inset-0 z-50 flex w-full min-w-0 max-w-full items-end overflow-hidden bg-black/55 px-1.5 pb-0 pt-8 backdrop-blur-[2px]">
      <button aria-label="Close backdrop" className="absolute inset-0 cursor-default" onClick={onClose} type="button" />
      <section aria-modal="true" className="relative max-h-[75%] w-full min-w-0 max-w-full overflow-hidden rounded-t-[1.65rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(22,18,14,0.98),rgba(8,6,4,0.99))] shadow-[0_-1.2rem_3rem_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]" role="dialog">
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/18" />
        <header className="flex min-w-0 items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="font-serif text-[1.2rem] leading-6 tracking-[-0.04em] text-white">{title}</h2>
          </div>
        </header>

        <div className="mx-4 mb-3 flex gap-2">
          <button className={`h-8 flex-1 rounded-lg text-xs font-medium transition ${mode === 'gallery' ? 'bg-[#e7a35f] text-[#211508]' : 'border border-white/[0.07] bg-white/[0.045] text-white/70 hover:bg-white/[0.08]'}`} onClick={() => setMode('gallery')} type="button">Gallery</button>
          <button className={`h-8 flex-1 rounded-lg text-xs font-medium transition ${mode === 'search' ? 'bg-[#e7a35f] text-[#211508]' : 'border border-white/[0.07] bg-white/[0.045] text-white/70 hover:bg-white/[0.08]'}`} onClick={() => setMode('search')} type="button">Online</button>
        </div>

        {mode === 'search' && (
          <div className="mx-4 mb-3 flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.045] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <Search className="shrink-0 text-white/30" size={14} />
            <input className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-white/30 focus:outline-none" onChange={(e) => setQuery(e.target.value)} placeholder="Search artwork..." type="text" value={query} />
          </div>
        )}

        <div className="forge-scrollbar-soft max-h-[calc(75vh-10rem)] min-w-0 max-w-full overflow-y-auto overflow-x-hidden px-4 pb-6 sm:px-5">
          <div className="grid grid-cols-3 gap-2.5">
            {(mode === 'gallery' ? galleryOptions : filtered).map((opt, idx) => (
              <button className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.035] p-2 text-center transition hover:bg-white/[0.06]" key={idx} onClick={() => onSelect('gradient' in opt ? opt.gradient : '', mode === 'gallery' ? 'Gallery' : (opt as typeof searchResults[0]).provider)} type="button">
                <CoverGradient className="aspect-square w-full rounded-lg" gradient={'gradient' in opt ? opt.gradient : ''} />
                <p className="text-[9px] leading-3 text-white/50">{'label' in opt ? opt.label : ''}</p>
              </button>
            ))}
          </div>
          {mode === 'search' && filtered.length === 0 && (
            <p className="mt-4 text-center text-xs text-white/40">No results</p>
          )}
        </div>
      </section>
    </div>
  )
}

/* ---------- Save preview sheet ---------- */
function ForgeSavePreviewSheet({
  title,
  changes,
  onClose,
  onApply,
}: {
  title: string
  changes: { label: string; before: string; after: string; source?: string }[]
  onClose: () => void
  onApply: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 flex w-full min-w-0 max-w-full items-end overflow-hidden bg-black/55 px-1.5 pb-0 pt-8 backdrop-blur-[2px]">
      <button aria-label="Close backdrop" className="absolute inset-0 cursor-default" onClick={onClose} type="button" />
      <section aria-modal="true" className="relative max-h-[80%] w-full min-w-0 max-w-full overflow-hidden rounded-t-[1.65rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(22,18,14,0.98),rgba(8,6,4,0.99))] shadow-[0_-1.2rem_3rem_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)]" role="dialog">
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/18" />
        <header className="flex min-w-0 items-start justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
          <div className="min-w-0">
            <h2 className="font-serif text-[1.2rem] leading-6 tracking-[-0.04em] text-white">Review changes</h2>
            <p className="mt-1 text-xs leading-5 text-orange-100/60">{title}</p>
          </div>
        </header>
        <div className="forge-scrollbar-soft max-h-[calc(80vh-10rem)] min-w-0 max-w-full overflow-y-auto overflow-x-hidden px-4 pb-6 sm:px-5">
          <div className="space-y-2.5">
            {changes.map((change, idx) => (
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.035] p-3" key={idx}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/42">{change.label}</p>
                  {change.source && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-2 py-1 text-[10px] font-semibold text-[#f0b879]">
                      <BadgeCheck size={10} />
                      {change.source}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-black/20 p-2">
                    <p className="text-[10px] uppercase tracking-wider text-white/34">Current</p>
                    <p className="mt-1 text-xs leading-4 text-white/55">{change.before || 'Empty'}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-300/10 bg-emerald-300/[0.045] p-2">
                    <p className="text-[10px] uppercase tracking-wider text-emerald-200/55">New</p>
                    <p className="mt-1 text-xs leading-4 text-emerald-200">{change.after || 'Empty'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2.5 pt-4">
            <button className="h-10 rounded-lg border border-white/[0.075] bg-white/[0.045] text-sm font-medium text-white transition hover:bg-white/[0.075]" onClick={onClose} type="button">Keep editing</button>
            <button className="h-10 rounded-lg bg-[#e7a35f] text-sm font-semibold text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] transition hover:bg-[#efad6c]" onClick={onApply} type="button">Apply changes</button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ---------- Main editor ---------- */
export function ForgeMetadataEditor({
  entityType,
  entity,
  albums = [],
  songs = [],
  onClose,
  onSave,
  mockState,
  initialTab,
  showConfirm,
  onOpenTrackEditor,
  onOpenAlbumEditor,
}: ForgeMetadataEditorProps) {
  const tabs = TABS[entityType]
  const [activeTab, setActiveTab] = useState(initialTab && tabs.includes(initialTab) ? initialTab : tabs[0])
  const [draft, setDraft] = useState<Record<string, string>>(() => buildDraft(entity, entityType))
  const [pendingImage, setPendingImage] = useState<{ gradient: string; source: string } | null>(null)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [showSavePreview, setShowSavePreview] = useState(false)
  const [saveError, setSaveError] = useState(false)

  const original = useMemo(() => buildDraft(entity, entityType), [entity, entityType])

  const changedFields = useMemo(() => {
    const changes: { key: string; label: string; before: string; after: string; source?: string }[] = []
    Object.keys(draft).forEach((key) => {
      if (draft[key] !== original[key]) {
        changes.push({ key, label: formatLabel(key), before: original[key], after: draft[key], source: 'Manual' })
      }
    })
    if (pendingImage) {
      changes.push({ key: 'image', label: entityType === 'artist' ? 'Artist image' : entityType === 'album' ? 'Album cover' : 'Cover', before: 'Current', after: 'Selected image', source: pendingImage.source })
    }
    return changes
  }, [draft, original, pendingImage, entityType])

  const isDirty = changedFields.length > 0

  const updateField = useCallback((key: string, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleBack = useCallback(() => {
    if (isDirty) {
      showConfirm({
        title: 'Discard changes?',
        description: 'You have unsaved changes. Discard them and close the editor?',
        confirmLabel: 'Discard',
        tone: 'danger',
        onConfirm: onClose,
      })
    } else {
      onClose()
    }
  }, [isDirty, onClose, showConfirm])

  const handleSave = useCallback(() => {
    if (!isDirty) return
    setShowSavePreview(true)
  }, [isDirty])

  const applySave = useCallback(() => {
    setShowSavePreview(false)
    if (mockState.libraryState === 'editorSaveFailed') {
      setSaveError(true)
      return
    }
    const updated = applyDraftToEntity(entity, entityType, draft, pendingImage)
    onSave(updated)
  }, [entity, entityType, draft, pendingImage, mockState.libraryState, onSave])

  const entityTitle = entityType === 'artist' ? (entity as MockArtist).name : entityType === 'album' ? (entity as MockAlbum).title : (entity as MockSong).title

  /* Reset scroll when tab changes */
  useEffect(() => {
    const scrollEl = document.querySelector('.forge-editor-scroll')
    if (scrollEl) scrollEl.scrollTop = 0
  }, [activeTab])

  return (
    <div className="absolute inset-0 z-30 flex w-full min-w-0 max-w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_40%_0%,rgba(255,200,150,.08),transparent_35%),linear-gradient(180deg,#0f0c0a,#080604_70%)] text-white">
      {/* Header */}
      <header className="flex min-w-0 shrink-0 items-center gap-2.5 border-b border-white/[0.06] px-4 pb-3 pt-12 sm:px-5">
        <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/[0.07] hover:text-white" onClick={handleBack} type="button">
          <ArrowLeft size={20} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-white/50">
            {entityType === 'artist' ? 'Edit artist' : entityType === 'album' ? 'Edit album' : 'Edit track'}
          </p>
          <p className="truncate text-[15px] font-medium text-white">{entityTitle}</p>
        </div>
        {isDirty && (
          <span className="shrink-0 rounded-full bg-orange-400/13 px-2.5 py-1 text-[10px] font-semibold text-orange-300">Unsaved</span>
        )}
        <button
          className={`h-9 shrink-0 rounded-lg px-4 text-xs font-semibold transition ${isDirty ? 'bg-[#e7a35f] text-[#211508] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0.5rem_1rem_rgba(234,154,92,0.12)] hover:bg-[#efad6c]' : 'bg-white/[0.07] text-white/40 cursor-not-allowed'}`}
          disabled={!isDirty}
          onClick={handleSave}
          type="button"
        >
          Save
        </button>
      </header>

      {/* Tabs */}
      <div className="shrink-0 border-b border-white/[0.06] px-4 pt-2 sm:px-5">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-medium transition ${activeTab === tab ? 'bg-[#e7a35f]/12 text-[#f0b879]' : 'text-white/55 hover:bg-white/[0.05] hover:text-white/80'}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="forge-editor-scroll min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8 pt-4 sm:px-5">
        {saveError && (
          <ForgeStateNotice
            actions={[
              { label: 'Retry', onClick: () => setSaveError(false), tone: 'primary' },
              { label: 'Cancel', onClick: () => setSaveError(false), tone: 'secondary' },
            ]}
            message="Could not save changes."
            title="Save failed"
            variant="error"
          />
        )}
        {entityType === 'track' && (
          <TrackTabContent
            activeTab={activeTab}
            draft={draft}
            entity={entity as MockSong}
            pendingImage={pendingImage}
            updateField={updateField}
            onOpenImagePicker={() => setShowImagePicker(true)}
          />
        )}
        {entityType === 'album' && (
          <AlbumTabContent
            activeTab={activeTab}
            draft={draft}
            entity={entity as MockAlbum}
            pendingImage={pendingImage}
            songs={songs}
            updateField={updateField}
            onOpenImagePicker={() => setShowImagePicker(true)}
            onOpenTrackEditor={onOpenTrackEditor}
          />
        )}
        {entityType === 'artist' && (
          <ArtistTabContent
            activeTab={activeTab}
            albums={albums}
            draft={draft}
            entity={entity as MockArtist}
            pendingImage={pendingImage}
            updateField={updateField}
            onOpenImagePicker={() => setShowImagePicker(true)}
            onOpenAlbumEditor={onOpenAlbumEditor}
          />
        )}
      </div>

      {/* Image picker overlay */}
      {showImagePicker && (
        <ForgeImagePickerSheet
          title={entityType === 'artist' ? 'Choose artist image' : 'Choose cover'}
          onClose={() => setShowImagePicker(false)}
          onSelect={(gradient, source) => {
            setPendingImage({ gradient, source })
            setShowImagePicker(false)
          }}
        />
      )}

      {/* Save preview overlay */}
      {showSavePreview && (
        <ForgeSavePreviewSheet
          changes={changedFields.map((c) => ({ label: c.label, before: c.before, after: c.after, source: c.source }))}
          onApply={applySave}
          onClose={() => setShowSavePreview(false)}
          title={`${changedFields.length} field${changedFields.length > 1 ? 's' : ''} changed`}
        />
      )}
    </div>
  )
}

/* ---------- Tab content components ---------- */
function TrackTabContent({
  activeTab,
  draft,
  entity,
  pendingImage,
  updateField,
  onOpenImagePicker,
}: {
  activeTab: string
  draft: Record<string, string>
  entity: MockSong
  pendingImage: { gradient: string; source: string } | null
  updateField: (key: string, value: string) => void
  onOpenImagePicker: () => void
}) {
  if (activeTab === 'Overview') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.title} label="Title" onChange={(v) => updateField('title', v)} value={draft.title} />
        <EditableField current={entity.artist} label="Artist" onChange={(v) => updateField('artist', v)} value={draft.artist} />
        <EditableField current={entity.album} label="Album" onChange={(v) => updateField('album', v)} value={draft.album} />
        <EditableField current={entity.albumArtist ?? ''} label="Album Artist" onChange={(v) => updateField('albumArtist', v)} value={draft.albumArtist} />
        <div className="grid grid-cols-2 gap-2.5">
          <EditableField current={entity.trackNumber ?? ''} label="Track Number" onChange={(v) => updateField('trackNumber', v)} value={draft.trackNumber} />
          <EditableField current={entity.trackTotal ?? ''} label="Track Total" onChange={(v) => updateField('trackTotal', v)} value={draft.trackTotal} />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <EditableField current={entity.discNumber ?? ''} label="Disc Number" onChange={(v) => updateField('discNumber', v)} value={draft.discNumber} />
          <EditableField current={entity.discTotal ?? ''} label="Disc Total" onChange={(v) => updateField('discTotal', v)} value={draft.discTotal} />
        </div>
        <EditableField current={entity.date ?? ''} label="Date" onChange={(v) => updateField('date', v)} value={draft.date} />
        <EditableField current={entity.originalDate ?? ''} label="Original Date" onChange={(v) => updateField('originalDate', v)} value={draft.originalDate} />
      </div>
    )
  }

  if (activeTab === 'Artwork') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="space-y-2 text-center">
            <CoverGradient className="mx-auto aspect-square w-40 rounded-xl" gradient={pendingImage?.gradient ?? 'from-stone-200 via-stone-500 to-stone-950'} />
            <p className="text-[10px] text-white/40">{pendingImage ? `Selected: ${pendingImage.source}` : entity.fileFormat ? 'Current cover' : 'No cover'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.08]" onClick={onOpenImagePicker} type="button">
            <ImageIcon size={14} /> Choose from gallery
          </button>
          <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.08]" onClick={onOpenImagePicker} type="button">
            <Search size={14} /> Search online
          </button>
        </div>
        {pendingImage && (
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-3 py-1.5 text-[11px] font-semibold text-[#f0b879]">
            <BadgeCheck size={12} />
            Source: {pendingImage.source}
          </div>
        )}
      </div>
    )
  }

  if (activeTab === 'Lyrics') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.lyrics ?? ''} label="Lyrics" multiline onChange={(v) => updateField('lyrics', v)} value={draft.lyrics} />
        <EditableField current={entity.syncedLyrics ?? ''} label="Synced Lyrics" multiline onChange={(v) => updateField('syncedLyrics', v)} value={draft.syncedLyrics} />
        <EditableField current={entity.sidecarLrc ?? ''} label="Sidecar LRC" onChange={(v) => updateField('sidecarLrc', v)} value={draft.sidecarLrc} />
      </div>
    )
  }

  if (activeTab === 'Metadata') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.genres.join(', ')} label="Genre" onChange={(v) => updateField('genres', v)} value={draft.genres} />
        <EditableField current={entity.style ?? ''} label="Style" onChange={(v) => updateField('style', v)} value={draft.style} />
        <EditableField current={entity.mood} label="Mood" onChange={(v) => updateField('mood', v)} value={draft.mood} />
        <EditableField current={entity.lastFmTags ?? ''} label="Last.fm Tags" onChange={(v) => updateField('lastFmTags', v)} value={draft.lastFmTags} />
        <EditableField current={entity.mbTrackId ?? ''} label="MusicBrainz Track ID" note="Protected identity field. Review before applying." onChange={(v) => updateField('mbTrackId', v)} source="MusicBrainz" value={draft.mbTrackId} />
        <EditableField current={entity.mbReleaseTrackId ?? ''} label="MusicBrainz Release Track ID" note="Protected identity field. Review before applying." onChange={(v) => updateField('mbReleaseTrackId', v)} source="MusicBrainz" value={draft.mbReleaseTrackId} />
        <EditableField current={entity.acoustId ?? ''} label="AcoustID ID" note="Protected identity field. Review before applying." onChange={(v) => updateField('acoustId', v)} source="AcoustID" value={draft.acoustId} />
        <EditableField current={entity.isrc ?? ''} label="ISRC" note="Protected identity field. Review before applying." onChange={(v) => updateField('isrc', v)} source="MusicBrainz" value={draft.isrc} />
      </div>
    )
  }

  if (activeTab === 'Audio') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.bpm ?? ''} label="BPM" onChange={(v) => updateField('bpm', v)} value={draft.bpm} />
        <EditableField current={entity.key ?? ''} label="Key" onChange={(v) => updateField('key', v)} value={draft.key} />
        <EditableField current={entity.energy ?? ''} label="Energy" onChange={(v) => updateField('energy', v)} value={draft.energy} />
        <EditableField current={entity.danceability ?? ''} label="Danceability" onChange={(v) => updateField('danceability', v)} value={draft.danceability} />
        <EditableField current={entity.replayGainTrackGain ?? ''} label="ReplayGain Track Gain" onChange={(v) => updateField('replayGainTrackGain', v)} value={draft.replayGainTrackGain} />
        <EditableField current={entity.replayGainTrackPeak ?? ''} label="ReplayGain Track Peak" onChange={(v) => updateField('replayGainTrackPeak', v)} value={draft.replayGainTrackPeak} />
        <EditableField current={entity.replayGainAlbumGain ?? ''} label="ReplayGain Album Gain" onChange={(v) => updateField('replayGainAlbumGain', v)} value={draft.replayGainAlbumGain} />
        <EditableField current={entity.replayGainAlbumPeak ?? ''} label="ReplayGain Album Peak" onChange={(v) => updateField('replayGainAlbumPeak', v)} value={draft.replayGainAlbumPeak} />
      </div>
    )
  }

  if (activeTab === 'File info') {
    return (
      <div className="space-y-2.5">
        <ReadOnlyField label="Path" value={entity.filePath ?? ''} />
        <ReadOnlyField label="Format" value={entity.fileFormat ?? ''} />
        <ReadOnlyField label="Codec" value={entity.codec ?? ''} />
        <ReadOnlyField label="Bitrate" value={entity.bitrate ?? ''} />
        <ReadOnlyField label="Sample Rate" value={entity.sampleRate ?? ''} />
        <ReadOnlyField label="Duration" value={entity.duration ?? ''} />
      </div>
    )
  }

  return null
}

function AlbumTabContent({
  activeTab,
  draft,
  entity,
  pendingImage,
  songs,
  updateField,
  onOpenImagePicker,
  onOpenTrackEditor,
}: {
  activeTab: string
  draft: Record<string, string>
  entity: MockAlbum
  pendingImage: { gradient: string; source: string } | null
  songs: MockSong[]
  updateField: (key: string, value: string) => void
  onOpenImagePicker: () => void
  onOpenTrackEditor?: (track: MockSong) => void
}) {
  if (activeTab === 'Overview') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.title} label="Album" onChange={(v) => updateField('title', v)} value={draft.title} />
        <EditableField current={entity.artist} label="Album Artist" onChange={(v) => updateField('artist', v)} value={draft.artist} />
        <EditableField current={entity.albumArtist ?? ''} label="Artist" onChange={(v) => updateField('albumArtist', v)} value={draft.albumArtist} />
        <EditableField current={entity.date ?? ''} label="Date" onChange={(v) => updateField('date', v)} value={draft.date} />
        <EditableField current={entity.originalDate ?? ''} label="Original Date" onChange={(v) => updateField('originalDate', v)} value={draft.originalDate} />
        <EditableField current={entity.trackTotal ?? ''} label="Track Total" onChange={(v) => updateField('trackTotal', v)} value={draft.trackTotal} />
        <EditableField current={entity.discTotal ?? ''} label="Disc Total" onChange={(v) => updateField('discTotal', v)} value={draft.discTotal} />
      </div>
    )
  }

  if (activeTab === 'Artwork') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="space-y-2 text-center">
            <CoverGradient className="mx-auto aspect-square w-40 rounded-xl" gradient={pendingImage?.gradient ?? entity.coverGradient} />
            <p className="text-[10px] text-white/40">{pendingImage ? `Selected: ${pendingImage.source}` : `Current: ${entity.coverSize ?? 'Unknown size'}`}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.08]" onClick={onOpenImagePicker} type="button">
            <ImageIcon size={14} /> Choose from gallery
          </button>
          <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.08]" onClick={onOpenImagePicker} type="button">
            <Search size={14} /> Search online
          </button>
        </div>
        {pendingImage && (
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-3 py-1.5 text-[11px] font-semibold text-[#f0b879]">
            <BadgeCheck size={12} />
            Source: {pendingImage.source}
          </div>
        )}
      </div>
    )
  }

  if (activeTab === 'Metadata') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.genres.join(', ')} label="Genre" onChange={(v) => updateField('genres', v)} value={draft.genres} />
        <EditableField current={entity.style ?? ''} label="Style" onChange={(v) => updateField('style', v)} value={draft.style} />
        <EditableField current={entity.mood} label="Mood" onChange={(v) => updateField('mood', v)} value={draft.mood} />
        <EditableField current={entity.lastFmTags ?? ''} label="Last.fm Tags" onChange={(v) => updateField('lastFmTags', v)} value={draft.lastFmTags} />
        <EditableField current={entity.mbAlbumId ?? ''} label="MusicBrainz Album ID" note="Protected identity field. Review before applying." onChange={(v) => updateField('mbAlbumId', v)} source="MusicBrainz" value={draft.mbAlbumId} />
        <EditableField current={entity.mbReleaseGroupId ?? ''} label="MusicBrainz Release Group ID" note="Protected identity field. Review before applying." onChange={(v) => updateField('mbReleaseGroupId', v)} source="MusicBrainz" value={draft.mbReleaseGroupId} />
      </div>
    )
  }

  if (activeTab === 'Release') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.label ?? ''} label="Label" onChange={(v) => updateField('label', v)} value={draft.label} />
        <EditableField current={entity.catalogNumber ?? ''} label="Catalog Number" onChange={(v) => updateField('catalogNumber', v)} value={draft.catalogNumber} />
        <EditableField current={entity.barcode ?? ''} label="Barcode" onChange={(v) => updateField('barcode', v)} value={draft.barcode} />
        <EditableField current={entity.releaseCountry ?? ''} label="Release Country" onChange={(v) => updateField('releaseCountry', v)} value={draft.releaseCountry} />
        <EditableField current={entity.media ?? ''} label="Media" onChange={(v) => updateField('media', v)} value={draft.media} />
        <EditableField current={entity.releaseFormat ?? ''} label="Release Format" onChange={(v) => updateField('releaseFormat', v)} value={draft.releaseFormat} />
        <EditableField current={entity.releaseType ?? ''} label="Release Type" onChange={(v) => updateField('releaseType', v)} value={draft.releaseType} />
        <EditableField current={entity.edition ?? ''} label="Edition" onChange={(v) => updateField('edition', v)} value={draft.edition} />
      </div>
    )
  }

  if (activeTab === 'Tracks') {
    const albumSongs = songs.filter((s) => s.albumId === entity.id)
    return (
      <div className="space-y-1">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/42">{albumSongs.length} tracks</p>
        {albumSongs.map((song) => (
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] p-2.5 text-left transition hover:bg-white/[0.06]" key={song.id} onClick={() => onOpenTrackEditor?.(song)} type="button">
            <CoverGradient className="h-10 w-10 shrink-0 rounded-lg" gradient="from-stone-300 via-stone-500 to-stone-900" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">{song.title}</p>
              <p className="truncate text-[10px] text-white/45">{song.trackNumber ? `Track ${song.trackNumber}` : '—'} · {song.duration || '—'}</p>
            </div>
          </button>
        ))}
        {albumSongs.length === 0 && <p className="py-4 text-center text-xs text-white/40">No tracks for this album.</p>}
      </div>
    )
  }

  if (activeTab === 'File info') {
    return (
      <div className="space-y-2.5">
        <ReadOnlyField label="Album ID" value={entity.id} />
        <ReadOnlyField label="Artist ID" value={entity.artistId} />
        <ReadOnlyField label="Year" value={entity.year} />
        <ReadOnlyField label="Tracks" value={entity.tracks.join(', ')} />
      </div>
    )
  }

  return null
}

function ArtistTabContent({
  activeTab,
  albums,
  draft,
  entity,
  pendingImage,
  updateField,
  onOpenImagePicker,
  onOpenAlbumEditor,
}: {
  activeTab: string
  albums: MockAlbum[]
  draft: Record<string, string>
  entity: MockArtist
  pendingImage: { gradient: string; source: string } | null
  updateField: (key: string, value: string) => void
  onOpenImagePicker: () => void
  onOpenAlbumEditor?: (album: MockAlbum) => void
}) {
  if (activeTab === 'Overview') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.name} label="Artist" onChange={(v) => updateField('name', v)} value={draft.name} />
        <EditableField current={entity.sortName ?? ''} label="Sort Artist" onChange={(v) => updateField('sortName', v)} value={draft.sortName} />
        <EditableField current={entity.displayName ?? ''} label="Display Name" onChange={(v) => updateField('displayName', v)} value={draft.displayName} />
        <EditableField current={entity.country ?? ''} label="Country" onChange={(v) => updateField('country', v)} value={draft.country} />
        <EditableField current={entity.biography ?? ''} label="Biography / Notes" multiline onChange={(v) => updateField('biography', v)} value={draft.biography} />
      </div>
    )
  }

  if (activeTab === 'Image') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="space-y-2 text-center">
            <div className="mx-auto grid aspect-square w-40 place-items-center rounded-full bg-white/[0.06] text-white/40">
              <span className="text-xs">Artist photo</span>
            </div>
            <p className="text-[10px] text-white/40">{pendingImage ? `Selected: ${pendingImage.source}` : entity.imageSize ? `Current: ${entity.imageSize}` : 'No image'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.08]" onClick={onOpenImagePicker} type="button">
            <ImageIcon size={14} /> Choose from gallery
          </button>
          <button className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.045] text-xs font-medium text-white transition hover:bg-white/[0.08]" onClick={onOpenImagePicker} type="button">
            <Search size={14} /> Search online
          </button>
        </div>
        {pendingImage && (
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#e7a35f]/18 bg-[#e7a35f]/10 px-3 py-1.5 text-[11px] font-semibold text-[#f0b879]">
            <BadgeCheck size={12} />
            Source: {pendingImage.source}
          </div>
        )}
      </div>
    )
  }

  if (activeTab === 'Metadata') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.genres.join(', ')} label="Genre" onChange={(v) => updateField('genres', v)} value={draft.genres} />
        <EditableField current={entity.style ?? ''} label="Style" onChange={(v) => updateField('style', v)} value={draft.style} />
        <EditableField current={entity.mood} label="Mood" onChange={(v) => updateField('mood', v)} value={draft.mood} />
        <EditableField current={entity.lastFmTags ?? ''} label="Last.fm Tags" onChange={(v) => updateField('lastFmTags', v)} value={draft.lastFmTags} />
      </div>
    )
  }

  if (activeTab === 'Albums') {
    const artistAlbums = albums.filter((a) => a.artistId === entity.id)
    return (
      <div className="space-y-1">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/42">{artistAlbums.length} albums</p>
        {artistAlbums.map((album) => (
          <button className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.035] p-2.5 text-left transition hover:bg-white/[0.06]" key={album.id} onClick={() => onOpenAlbumEditor?.(album)} type="button">
            <CoverGradient className="h-10 w-10 shrink-0 rounded-lg" gradient={album.coverGradient} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">{album.title}</p>
              <p className="truncate text-[10px] text-white/45">{album.year} · {album.tracks.length} tracks</p>
            </div>
          </button>
        ))}
        {artistAlbums.length === 0 && <p className="py-4 text-center text-xs text-white/40">No albums for this artist.</p>}
      </div>
    )
  }

  if (activeTab === 'Identity') {
    return (
      <div className="space-y-2.5">
        <EditableField current={entity.mbArtistId ?? ''} label="MusicBrainz Artist ID" note="Protected identity field. Review before applying." onChange={(v) => updateField('mbArtistId', v)} source="MusicBrainz" value={draft.mbArtistId} />
        <ReadOnlyField label="Provider / Source" value="MusicBrainz" />
        <ReadOnlyField label="ID Confidence" value="96%" />
      </div>
    )
  }

  return null
}

/* ---------- Draft builders ---------- */
function buildDraft(entity: MockArtist | MockAlbum | MockSong, type: EditorEntityType): Record<string, string> {
  if (type === 'artist') {
    const e = entity as MockArtist
    return {
      name: e.name,
      sortName: e.sortName ?? '',
      displayName: e.displayName ?? '',
      country: e.country ?? '',
      biography: e.biography ?? '',
      genres: e.genres.join(', '),
      style: e.style ?? '',
      mood: e.mood,
      lastFmTags: e.lastFmTags ?? '',
      mbArtistId: e.mbArtistId ?? '',
    }
  }
  if (type === 'album') {
    const e = entity as MockAlbum
    return {
      title: e.title,
      artist: e.artist,
      albumArtist: e.albumArtist ?? '',
      date: e.date ?? '',
      originalDate: e.originalDate ?? '',
      trackTotal: e.trackTotal ?? '',
      discTotal: e.discTotal ?? '',
      genres: e.genres.join(', '),
      style: e.style ?? '',
      mood: e.mood,
      lastFmTags: e.lastFmTags ?? '',
      mbAlbumId: e.mbAlbumId ?? '',
      mbReleaseGroupId: e.mbReleaseGroupId ?? '',
      label: e.label ?? '',
      catalogNumber: e.catalogNumber ?? '',
      barcode: e.barcode ?? '',
      releaseCountry: e.releaseCountry ?? '',
      media: e.media ?? '',
      releaseFormat: e.releaseFormat ?? '',
      releaseType: e.releaseType ?? '',
      edition: e.edition ?? '',
    }
  }
  const e = entity as MockSong
  return {
    title: e.title,
    artist: e.artist,
    album: e.album,
    albumArtist: e.albumArtist ?? '',
    trackNumber: e.trackNumber ?? '',
    trackTotal: e.trackTotal ?? '',
    discNumber: e.discNumber ?? '',
    discTotal: e.discTotal ?? '',
    date: e.date ?? '',
    originalDate: e.originalDate ?? '',
    genres: e.genres.join(', '),
    style: e.style ?? '',
    mood: e.mood,
    lastFmTags: e.lastFmTags ?? '',
    lyrics: e.lyrics ?? '',
    syncedLyrics: e.syncedLyrics ?? '',
    sidecarLrc: e.sidecarLrc ?? '',
    mbTrackId: e.mbTrackId ?? '',
    mbReleaseTrackId: e.mbReleaseTrackId ?? '',
    acoustId: e.acoustId ?? '',
    isrc: e.isrc ?? '',
    bpm: e.bpm ?? '',
    key: e.key ?? '',
    energy: e.energy ?? '',
    danceability: e.danceability ?? '',
    replayGainTrackGain: e.replayGainTrackGain ?? '',
    replayGainTrackPeak: e.replayGainTrackPeak ?? '',
    replayGainAlbumGain: e.replayGainAlbumGain ?? '',
    replayGainAlbumPeak: e.replayGainAlbumPeak ?? '',
  }
}

function applyDraftToEntity(
  entity: MockArtist | MockAlbum | MockSong,
  type: EditorEntityType,
  draft: Record<string, string>,
  pendingImage: { gradient: string; source: string } | null,
): MockArtist | MockAlbum | MockSong {
  if (type === 'artist') {
    const e = entity as MockArtist
    return {
      ...e,
      name: draft.name,
      sortName: draft.sortName || undefined,
      displayName: draft.displayName || undefined,
      country: draft.country || undefined,
      biography: draft.biography || undefined,
      genres: draft.genres.split(',').map((g) => g.trim()).filter(Boolean),
      style: draft.style || undefined,
      mood: draft.mood,
      lastFmTags: draft.lastFmTags || undefined,
      mbArtistId: draft.mbArtistId || undefined,
    }
  }
  if (type === 'album') {
    const e = entity as MockAlbum
    return {
      ...e,
      title: draft.title,
      artist: draft.artist,
      albumArtist: draft.albumArtist || undefined,
      date: draft.date || undefined,
      originalDate: draft.originalDate || undefined,
      trackTotal: draft.trackTotal || undefined,
      discTotal: draft.discTotal || undefined,
      genres: draft.genres.split(',').map((g) => g.trim()).filter(Boolean),
      style: draft.style || undefined,
      mood: draft.mood,
      lastFmTags: draft.lastFmTags || undefined,
      mbAlbumId: draft.mbAlbumId || undefined,
      mbReleaseGroupId: draft.mbReleaseGroupId || undefined,
      label: draft.label || undefined,
      catalogNumber: draft.catalogNumber || undefined,
      barcode: draft.barcode || undefined,
      releaseCountry: draft.releaseCountry || undefined,
      media: draft.media || undefined,
      releaseFormat: draft.releaseFormat || undefined,
      releaseType: draft.releaseType || undefined,
      edition: draft.edition || undefined,
      coverGradient: pendingImage?.gradient ?? e.coverGradient,
    }
  }
  const e = entity as MockSong
  return {
    ...e,
    title: draft.title,
    artist: draft.artist,
    album: draft.album,
    albumArtist: draft.albumArtist || undefined,
    trackNumber: draft.trackNumber || undefined,
    trackTotal: draft.trackTotal || undefined,
    discNumber: draft.discNumber || undefined,
    discTotal: draft.discTotal || undefined,
    date: draft.date || undefined,
    originalDate: draft.originalDate || undefined,
    genres: draft.genres.split(',').map((g) => g.trim()).filter(Boolean),
    style: draft.style || undefined,
    mood: draft.mood,
    lastFmTags: draft.lastFmTags || undefined,
    lyrics: draft.lyrics || undefined,
    syncedLyrics: draft.syncedLyrics || undefined,
    sidecarLrc: draft.sidecarLrc || undefined,
    mbTrackId: draft.mbTrackId || undefined,
    mbReleaseTrackId: draft.mbReleaseTrackId || undefined,
    acoustId: draft.acoustId || undefined,
    isrc: draft.isrc || undefined,
    bpm: draft.bpm || undefined,
    key: draft.key || undefined,
    energy: draft.energy || undefined,
    danceability: draft.danceability || undefined,
    replayGainTrackGain: draft.replayGainTrackGain || undefined,
    replayGainTrackPeak: draft.replayGainTrackPeak || undefined,
    replayGainAlbumGain: draft.replayGainAlbumGain || undefined,
    replayGainAlbumPeak: draft.replayGainAlbumPeak || undefined,
  }
}

function formatLabel(key: string): string {
  const map: Record<string, string> = {
    title: 'Title',
    name: 'Name',
    artist: 'Artist',
    album: 'Album',
    albumArtist: 'Album Artist',
    trackNumber: 'Track Number',
    trackTotal: 'Track Total',
    discNumber: 'Disc Number',
    discTotal: 'Disc Total',
    date: 'Date',
    originalDate: 'Original Date',
    genres: 'Genre',
    style: 'Style',
    mood: 'Mood',
    lastFmTags: 'Last.fm Tags',
    lyrics: 'Lyrics',
    syncedLyrics: 'Synced Lyrics',
    sidecarLrc: 'Sidecar LRC',
    mbTrackId: 'MusicBrainz Track ID',
    mbReleaseTrackId: 'MusicBrainz Release Track ID',
    acoustId: 'AcoustID ID',
    isrc: 'ISRC',
    bpm: 'BPM',
    key: 'Key',
    energy: 'Energy',
    danceability: 'Danceability',
    replayGainTrackGain: 'ReplayGain Track Gain',
    replayGainTrackPeak: 'ReplayGain Track Peak',
    replayGainAlbumGain: 'ReplayGain Album Gain',
    replayGainAlbumPeak: 'ReplayGain Album Peak',
    mbAlbumId: 'MusicBrainz Album ID',
    mbReleaseGroupId: 'MusicBrainz Release Group ID',
    label: 'Label',
    catalogNumber: 'Catalog Number',
    barcode: 'Barcode',
    releaseCountry: 'Release Country',
    media: 'Media',
    releaseFormat: 'Release Format',
    releaseType: 'Release Type',
    edition: 'Edition',
    sortName: 'Sort Artist',
    displayName: 'Display Name',
    country: 'Country',
    biography: 'Biography / Notes',
    mbArtistId: 'MusicBrainz Artist ID',
    image: 'Image',
  }
  return map[key] || key
}
