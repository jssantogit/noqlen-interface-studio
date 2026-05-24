import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  albumData,
  artistData,
  forgeAllReviewItems,
  reviewGroups,
  songData,
  type ActivityItem,
  type ActivityFilter,
  type ForgeMetadataFilter,
  type ForgeReviewQueueItem,
  type ForgeReviewSection,
  type MockAlbum,
  type MockArtist,
  type MockSong,
  type ReviewItemStatus,
  type ReviewItemType,
} from './forgeMockData'
import { buildMockState, type ForgeMockScenario } from './forgeMockState'
import { ForgeActivity } from './components/ForgeActivity'
import { ForgeActivityDetailSheet } from './components/ForgeActivityDetailSheet'
import { ForgeActivityFilterSheet } from './components/ForgeActivityFilterSheet'
import { ForgeActivitySummarySheet } from './components/ForgeActivitySummarySheet'
import { ForgeBottomNav } from './components/ForgeBottomNav'
import { ForgeConfirmDialog } from './components/ForgeConfirmDialog'
import { ForgeCoverComparisonSheet } from './components/ForgeCoverComparisonSheet'
import { ForgeEnrichMode } from './components/ForgeEnrichMode'
import { ForgeGenrePickerSheet } from './components/ForgeGenrePickerSheet'
import { ForgeHome } from './components/ForgeHome'
import { ForgeLibrary } from './components/ForgeLibrary'
import { ForgeLyricsDetailSheet } from './components/ForgeLyricsDetailSheet'
import { ForgeMetadataEditor, type EditorEntityType } from './components/ForgeMetadataEditor'
import { ForgeMetadataDiffSheet } from './components/ForgeMetadataDiffSheet'
import { ForgeProgressSheet, type ForgeProgressFlow } from './components/ForgeProgressSheet'
import { ForgeReview } from './components/ForgeReview'
import { ForgeSafetyNoteSheet } from './components/ForgeSafetyNoteSheet'
import { ForgeSettingsSheet } from './components/ForgeSettingsSheet'
import { ForgeToast } from './components/ForgeToast'

export type ForgeTab = 'home' | 'review' | 'library' | 'activity'
export type ReviewFilter = ForgeReviewSection
export type ForgeSheet = 'settings' | 'safetyNote' | null
export type ForgeDetailSheet = 'lyrics' | 'covers' | 'genres' | 'metadata' | null

function buildInitialItemStatuses(): Record<string, ReviewItemStatus> {
  const map: Record<string, ReviewItemStatus> = {}
  reviewGroups.forEach((g) => g.items.forEach((i) => { map[i.id] = i.status }))
  forgeAllReviewItems.forEach((i) => { map[i.id] = 'pending' })
  return map
}

function getProgressConfig(item: ForgeReviewQueueItem | null): {
  title: string
  steps: string[]
  source: string
  message: string
} | null {
  if (!item) return null
  const action = item.actionLabel || 'Apply change'
  switch (action) {
    case 'Apply artwork':
      return {
        title: 'Applying artwork',
        steps: ['Preparing artwork update', 'Replacing artwork'],
        source: 'Discogs',
        message: 'Artwork updated',
      }
    case 'Apply lyrics':
      return {
        title: 'Applying lyrics',
        steps: ['Preparing lyrics', 'Updating lyrics'],
        source: 'Lyrics provider',
        message: 'Lyrics added',
      }
    case 'Apply synced':
      return {
        title: 'Applying synced lyrics',
        steps: ['Preparing synced lyrics', 'Updating LRC'],
        source: 'LRC provider',
        message: 'Synced lyrics applied',
      }
    case 'Apply tags':
      return {
        title: 'Applying tags',
        steps: ['Preparing tag update', 'Applying tags'],
        source: 'Last.fm',
        message: 'Tags applied',
      }
    case 'Apply identity':
      return {
        title: 'Applying identity',
        steps: ['Validating identity choice', 'Applying protected identity'],
        source: 'MusicBrainz',
        message: 'Identity applied',
      }
    case 'Choose match':
      return {
        title: 'Resolving match',
        steps: ['Resolving match'],
        source: 'MusicBrainz',
        message: 'Match selected',
      }
    case 'Apply release data':
      return {
        title: 'Applying release data',
        steps: ['Preparing release metadata', 'Applying release fields'],
        source: 'Discogs',
        message: 'Release data applied',
      }
    case 'Apply audio data':
      return {
        title: 'Applying audio data',
        steps: ['Preparing audio analysis', 'Applying audio metadata'],
        source: 'Audio analysis',
        message: 'Audio data applied',
      }
    default:
      return {
        title: 'Applying change',
        steps: ['Preparing change', 'Applying update'],
        source: 'Forge',
        message: 'Change applied',
      }
  }
}

function makeActivityEntryFromReviewItem(
  item: ForgeReviewQueueItem,
): ActivityItem | null {
  const typeMap: Record<string, ActivityItem['activityType']> = {
    'Apply artwork': 'artwork',
    'Apply lyrics': 'lyrics',
    'Apply synced': 'lyrics',
    'Review lyrics': 'lyrics',
    'Apply tags': 'tags',
    'Apply identity': 'identity',
    'Choose match': 'identity',
    'Apply release data': 'release',
    'Apply audio data': 'audio',
  }
  const activityType = typeMap[item.actionLabel || ''] || 'tags'
  const providerMap: Record<string, string> = {
    'Apply artwork': 'Discogs',
    'Apply lyrics': 'Lyrics provider',
    'Apply synced': 'LRC provider',
    'Review lyrics': 'Lyrics provider',
    'Apply tags': 'Last.fm',
    'Apply identity': 'MusicBrainz',
    'Choose match': 'MusicBrainz',
    'Apply release data': 'Discogs',
    'Apply audio data': 'Audio analysis',
  }
  const titleMap: Record<string, string> = {
    'Apply artwork': 'Artwork updated',
    'Apply lyrics': 'Lyrics added',
    'Apply synced': 'Synced lyrics applied',
    'Review lyrics': 'Lyrics reviewed',
    'Apply tags': 'Tags applied',
    'Apply identity': 'Identity applied',
    'Choose match': 'Identity match resolved',
    'Apply release data': 'Release metadata updated',
    'Apply audio data': 'Audio analysis applied',
  }
  const relatedMap: Record<string, ActivityItem['relatedReviewTarget']> = {
    'Apply artwork': 'artwork',
    'Apply lyrics': 'lyrics',
    'Apply synced': 'lyrics',
    'Review lyrics': 'lyrics',
    'Apply tags': 'metadata/tags',
    'Apply identity': 'metadata/identity',
    'Choose match': 'metadata/identity',
    'Apply release data': 'metadata/release',
    'Apply audio data': 'metadata/audio',
  }
  const changedFieldsMap: Record<string, string[]> = {
    'Apply artwork': ['Cover image'],
    'Apply lyrics': ['Plain lyrics'],
    'Apply synced': ['Synced lyrics', 'LRC'],
    'Review lyrics': ['Plain lyrics'],
    'Apply tags': ['Genre', 'Mood', 'Style'],
    'Apply identity': ['Album MBID', 'Artist MBID', 'Release Group MBID'],
    'Choose match': ['Album MBID', 'Release Group MBID'],
    'Apply release data': ['Label', 'Country', 'Catalog number', 'Barcode'],
    'Apply audio data': ['BPM', 'Key', 'Energy', 'Danceability'],
  }
  const now = new Date()
  const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: titleMap[item.actionLabel || ''] || 'Change applied',
    subtitle: `${item.title} · ${item.artist}`,
    time: timeStr,
    icon: 'CheckCircle2',
    accent: 'text-emerald-300',
    bgAccent: 'bg-emerald-400/13',
    summary: [item.title],
    detail: `${titleMap[item.actionLabel || ''] || 'Change'} was applied to ${item.title} by ${item.artist}.`,
    activityType,
    dateGroup: 'today',
    affectedCount: 1,
    affectedItems: [item.title],
    changedFields: changedFieldsMap[item.actionLabel || ''] || ['Metadata'],
    provider: providerMap[item.actionLabel || ''] || 'Forge',
    status: 'completed',
    relatedReviewTarget: relatedMap[item.actionLabel || ''] || 'all',
  }
}

export function ForgePreview() {
  const [activeTab, setActiveTab] = useState<ForgeTab>('home')
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all')
  const [metadataFilter, setMetadataFilter] = useState<ForgeMetadataFilter>('tags')
  const [activeSheet, setActiveSheet] = useState<ForgeSheet>(null)
  const [activeDetailSheet, setActiveDetailSheet] = useState<ForgeDetailSheet>(null)
  const [selectedReviewItemId, setSelectedReviewItemId] = useState<string | null>(null)
  const [enrichModeOpen, setEnrichModeOpen] = useState(false)
  const [itemStatuses, setItemStatuses] = useState<Record<string, ReviewItemStatus>>(buildInitialItemStatuses)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [sessionFixed, setSessionFixed] = useState(0)
  const [sessionIgnored, setSessionIgnored] = useState(0)
  const [itemGenres, setItemGenres] = useState<Record<string, string[]>>({})
  const [toast, setToast] = useState<{ message: string; tone?: 'success' | 'info' | 'warning' } | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string
    description: string
    confirmLabel: string
    onConfirm: () => void
    tone?: 'amber' | 'danger'
  } | null>(null)
  const [progressFlow, setProgressFlow] = useState<ForgeProgressFlow | null>(null)

  /* Mutable library data */
  const [libraryArtists, setLibraryArtists] = useState<MockArtist[]>([...artistData])
  const [libraryAlbums, setLibraryAlbums] = useState<MockAlbum[]>([...albumData])
  const [librarySongs, setLibrarySongs] = useState<MockSong[]>([...songData])

  /* Metadata editor state */
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorType, setEditorType] = useState<EditorEntityType>('track')
  const [editorEntityId, setEditorEntityId] = useState<string | null>(null)
  const [editorInitialTab, setEditorInitialTab] = useState<string | undefined>(undefined)

  /* Activity state */
  const [activityItemsState, setActivityItemsState] = useState<ActivityItem[]>([])
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('all')
  const [activitySort, setActivitySort] = useState<'newest' | 'oldest'>('newest')
  const [activeActivitySheet, setActiveActivitySheet] = useState<'detail' | 'summary' | 'filter' | null>(null)
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)

  /* Mock state coverage */
  const [mockState, setMockState] = useState(() => buildMockState('normal'))
  const setMockScenario = useCallback((scenario: ForgeMockScenario) => {
    setMockState(buildMockState(scenario))
  }, [])

  // Lazy-init activity items on first render
  useMemo(() => {
    if (activityItemsState.length === 0) {
      import('./forgeMockData').then((mod) => {
        setActivityItemsState([...mod.activityItems])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showToast = useCallback((message: string, tone: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, tone })
  }, [])

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  const appendActivity = useCallback((entry: ActivityItem) => {
    setActivityItemsState((prev) => [entry, ...prev])
  }, [])

  const handleReviewNow = useCallback(() => {
    setReviewFilter('all')
    setActiveTab('review')
    showToast('Review queue opened', 'info')
  }, [showToast])

  const handleFilterReview = useCallback(
    (filter: ReviewFilter, nextMetadataFilter?: ForgeMetadataFilter) => {
      setReviewFilter(filter)
      if (nextMetadataFilter) setMetadataFilter(nextMetadataFilter)
      setActiveTab('review')
      const label =
        filter === 'lyrics'
          ? 'Lyrics review selected'
          : filter === 'artwork'
            ? 'Cover review queue selected'
            : filter === 'metadata'
              ? 'Metadata review selected'
              : 'Review queue selected'
      showToast(label, 'info')
    },
    [showToast],
  )

  const openSettings = useCallback(() => {
    setActiveSheet('settings')
  }, [])

  const openSafetyNote = useCallback(() => {
    setActiveSheet('safetyNote')
  }, [])

  const closeSheet = useCallback(() => {
    setActiveSheet(null)
  }, [])

  const openEnrichMode = useCallback(() => {
    setEnrichModeOpen(true)
  }, [])

  const closeEnrichMode = useCallback(() => {
    setEnrichModeOpen(false)
  }, [])

  const markSafeItemsApplied = useCallback(() => {
    // Mock: mark a few safe review items as applied locally
    setItemStatuses((prev) => {
      const next = { ...prev }
      forgeAllReviewItems.forEach((item) => {
        if (item.proposalStatus === 'Safe' && next[item.id] === 'pending') {
          next[item.id] = 'fixed'
        }
      })
      return next
    })
    setSessionFixed((s) => s + 5)
  }, [])

  const closeDetailSheet = useCallback(() => {
    setActiveDetailSheet(null)
    setSelectedReviewItemId(null)
  }, [])

  const openItemDetail = useCallback((itemId: string, type: ReviewItemType, section?: ForgeReviewSection) => {
    setSelectedReviewItemId(itemId)
    setActiveDetailSheet(section === 'metadata' ? 'metadata' : type === 'lyrics' ? 'lyrics' : type === 'covers' ? 'covers' : 'genres')
  }, [])

  const updateItemStatus = useCallback(
    (id: string, status: ReviewItemStatus) => {
      setItemStatuses((prev) => {
        if (prev[id] === status) return prev
        return { ...prev, [id]: status }
      })
      if (status === 'fixed') {
        setSessionFixed((s) => s + 1)
        const item = forgeAllReviewItems.find((i) => i.id === id)
        if (item) {
          const entry = makeActivityEntryFromReviewItem(item)
          if (entry) appendActivity(entry)
        }
      } else if (status === 'ignored') {
        setSessionIgnored((s) => s + 1)
      }
      setSelectedIds((prev) => {
        if (!prev.has(id)) return prev
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    },
    [appendActivity],
  )

  const resetQueue = useCallback(() => {
    setItemStatuses(buildInitialItemStatuses())
    setSelectedIds(new Set())
    setSessionFixed(0)
    setSessionIgnored(0)
    showToast('Review queue reset', 'info')
  }, [showToast])

  const handleSaveSettings = useCallback(() => {
    closeSheet()
    showToast('Forge settings saved')
  }, [closeSheet, showToast])

  const showConfirm = useCallback(
    (opts: {
      title: string
      description: string
      confirmLabel: string
      onConfirm: () => void
      tone?: 'amber' | 'danger'
    }) => {
      setConfirmDialog({
        title: opts.title,
        description: opts.description,
        confirmLabel: opts.confirmLabel,
        onConfirm: opts.onConfirm,
        tone: opts.tone,
      })
    },
    [],
  )

  const startProgress = useCallback((flow: ForgeProgressFlow) => {
    setProgressFlow(flow)
  }, [])

  const closeProgress = useCallback(() => {
    setProgressFlow(null)
  }, [])

  const clearReviewFilter = useCallback(() => setReviewFilter('all'), [])

  const selectedReviewItem = useMemo(() => {
    if (!selectedReviewItemId) return null
    return forgeAllReviewItems.find((i) => i.id === selectedReviewItemId) ?? null
  }, [selectedReviewItemId])

  const metadataPreviewRows = useMemo(() => {
    if (!selectedReviewItem) return []
    if (!('metadataFilter' in selectedReviewItem)) {
      return [
        {
          label: selectedReviewItem.type === 'lyrics' ? 'Lyrics' : selectedReviewItem.type === 'covers' ? 'Artwork' : 'Metadata',
          before: 'current' in selectedReviewItem && selectedReviewItem.current ? selectedReviewItem.current : selectedReviewItem.type === 'lyrics' ? 'Missing' : selectedReviewItem.type === 'covers' ? 'Low resolution' : 'Unknown',
          after: 'suggested' in selectedReviewItem && selectedReviewItem.suggested ? selectedReviewItem.suggested : selectedReviewItem.type === 'lyrics' ? 'Suggested lyrics' : selectedReviewItem.type === 'covers' ? 'Suggested cover' : (itemGenres[selectedReviewItem.id]?.join(', ') || 'Selected metadata'),
          source: selectedReviewItem.type === 'lyrics' ? 'Lyrics provider' : selectedReviewItem.type === 'covers' ? 'Discogs' : 'Forge',
        },
      ]
    }

    if (selectedReviewItem.metadataFilter === 'tags') {
      return [
        { label: 'Genre', before: 'Empty', after: 'Post-rock · Ambient · Instrumental', afterChips: ['Post-rock', 'Ambient', 'Instrumental'], source: 'Last.fm' },
        { label: 'Mood', before: 'Empty', after: 'Calm · Melancholic', afterChips: ['Calm', 'Melancholic'], source: 'Last.fm' },
        { label: 'Style', before: 'Electronic', after: 'Modern Classical · Minimal · Piano', afterChips: ['Modern Classical', 'Minimal', 'Piano'], source: 'Last.fm' },
        { label: 'Last.fm Tags', before: 'Empty', after: 'Instrumental, Piano-driven, Atmospheric', source: 'Last.fm' },
      ]
    }
    if (selectedReviewItem.metadataFilter === 'identity') {
      const source = selectedReviewItem.proposalStatus === 'Conflict' ? 'MusicBrainz' : 'MusicBrainz / AcoustID'
      return selectedReviewItem.proposalStatus === 'Conflict'
        ? [
            { label: 'Match option A', before: 'Current match unclear', after: 'All Melody · Nils Frahm · 2018', source, note: 'Conflict: choose a match before applying identity data.' },
            { label: 'Match option B', before: 'Current match unclear', after: 'All Melody live edition · Nils Frahm · 2019', source, note: 'Conflict: choose a match before applying identity data.' },
          ]
        : [
            { label: 'Album MBID', before: 'Empty', after: 'mbid-all-melody-2018', source, note: 'Protected identity field.' },
            { label: 'Artist MBID', before: 'Empty', after: 'mbid-nils-frahm', source, note: 'Protected identity field.' },
            { label: 'Release Group MBID', before: 'Empty', after: 'rgid-all-melody-2018', source, note: 'Protected identity field.' },
            { label: 'ISRC', before: 'Empty', after: 'isrc-2018-0001', source, note: 'Protected identity field.' },
            { label: 'AcoustID', before: 'Empty', after: 'acoustid-all-melody', source, note: 'Protected identity field.' },
          ]
    }
    if (selectedReviewItem.metadataFilter === 'release') {
      return [
        { label: 'Label', before: 'Empty', after: 'Erased Tapes', source: 'Discogs' },
        { label: 'Country', before: 'Empty', after: 'DE', source: 'Discogs / MusicBrainz' },
        { label: 'Catalog number', before: 'Empty', after: 'ERATP106', source: 'Discogs' },
        { label: 'Barcode', before: 'Empty', after: '4050486123456', source: 'Discogs' },
        { label: 'Edition', before: 'Empty', after: 'Standard', source: 'Discogs' },
        { label: 'Release type', before: 'Empty', after: 'Album', source: 'MusicBrainz' },
      ]
    }
    if (selectedReviewItem.metadataFilter === 'audio') {
      return [
        { label: 'BPM', before: 'Empty', after: '120', source: 'Audio analysis' },
        { label: 'Key', before: 'Empty', after: 'A minor', source: 'Audio analysis' },
        { label: 'ReplayGain', before: 'Empty', after: 'Available', source: 'Audio analysis' },
        { label: 'Energy', before: 'Empty', after: 'Low', source: 'Audio analysis' },
        { label: 'Danceability', before: 'Empty', after: 'Very low', source: 'Audio analysis' },
      ]
    }
    return []
  }, [itemGenres, selectedReviewItem])

  const applyDetailFix = useCallback(() => {
    if (!selectedReviewItemId || !selectedReviewItem) return
    const config = getProgressConfig(selectedReviewItem)
    if (!config) return
    closeDetailSheet()
    startProgress({
      title: config.title,
      steps: config.steps,
      sourceBadge: config.source,
      completeMessage: config.message,
      onComplete: () => {
        updateItemStatus(selectedReviewItemId, 'fixed')
        showToast(config.message)
      },
    })
  }, [selectedReviewItemId, selectedReviewItem, closeDetailSheet, startProgress, updateItemStatus, showToast])

  const ignoreDetailItem = useCallback(() => {
    if (!selectedReviewItemId) return
    closeDetailSheet()
    startProgress({
      title: 'Ignoring item',
      steps: ['Marking item ignored'],
      completeMessage: 'Item ignored',
      onComplete: () => {
        updateItemStatus(selectedReviewItemId, 'ignored')
        showToast('Item ignored')
      },
    })
  }, [selectedReviewItemId, closeDetailSheet, startProgress, updateItemStatus, showToast])

  const keepCurrentCover = useCallback(() => {
    if (!selectedReviewItemId) return
    closeDetailSheet()
    startProgress({
      title: 'Keeping current cover',
      steps: ['Marking item ignored'],
      completeMessage: 'Current cover kept',
      onComplete: () => {
        updateItemStatus(selectedReviewItemId, 'ignored')
        showToast('Current cover kept')
      },
    })
  }, [selectedReviewItemId, closeDetailSheet, startProgress, updateItemStatus, showToast])

  const applyGenre = useCallback(
    (genres: string[]) => {
      if (!selectedReviewItemId) return
      setItemGenres((prev) => ({ ...prev, [selectedReviewItemId]: genres }))
      closeDetailSheet()
      startProgress({
        title: 'Applying genre',
        steps: ['Preparing genre update', 'Applying genres'],
        sourceBadge: 'Last.fm',
        completeMessage: 'Genre applied',
        onComplete: () => {
          updateItemStatus(selectedReviewItemId, 'fixed')
          showToast('Genre applied')
        },
      })
    },
    [selectedReviewItemId, closeDetailSheet, startProgress, updateItemStatus, showToast],
  )

  const openMetadataDiff = useCallback(() => {
    setActiveDetailSheet('metadata')
  }, [])

  /* Library metadata editor callbacks */
  const openArtistEditor = useCallback((artist: MockArtist, initialTab?: string) => {
    setEditorType('artist')
    setEditorEntityId(artist.id)
    setEditorInitialTab(initialTab)
    setEditorOpen(true)
  }, [])

  const openAlbumEditor = useCallback((album: MockAlbum, initialTab?: string) => {
    setEditorType('album')
    setEditorEntityId(album.id)
    setEditorInitialTab(initialTab)
    setEditorOpen(true)
  }, [])

  const openTrackEditor = useCallback((song: MockSong, initialTab?: string) => {
    setEditorType('track')
    setEditorEntityId(song.id)
    setEditorInitialTab(initialTab)
    setEditorOpen(true)
  }, [])

  const closeEditor = useCallback(() => {
    setEditorOpen(false)
    setEditorEntityId(null)
    setEditorInitialTab(undefined)
  }, [])

  const handleSaveEntity = useCallback((updated: MockArtist | MockAlbum | MockSong) => {
    const entityName =
      'name' in updated
        ? updated.name
        : 'title' in updated
          ? updated.title
          : 'Track'
    const entityTypeLabel = editorType === 'artist' ? 'artist' : editorType === 'album' ? 'album' : 'track'
    startProgress({
      title: 'Applying changes',
      steps: ['Preparing changes', 'Applying metadata'],
      sourceBadge: 'Forge',
      completeMessage: 'Metadata updated',
      onComplete: () => {
        if (editorType === 'artist') {
          setLibraryArtists((prev) => prev.map((a) => (a.id === (updated as MockArtist).id ? (updated as MockArtist) : a)))
        } else if (editorType === 'album') {
          setLibraryAlbums((prev) => prev.map((a) => (a.id === (updated as MockAlbum).id ? (updated as MockAlbum) : a)))
        } else {
          setLibrarySongs((prev) => prev.map((s) => (s.id === (updated as MockSong).id ? (updated as MockSong) : s)))
        }
        showToast('Metadata updated')
        // Append library edit activity
        const now = new Date()
        const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
        appendActivity({
          id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: 'Manual metadata edit',
          subtitle: `${entityTypeLabel} edited`,
          time: timeStr,
          icon: 'CheckCircle2',
          accent: 'text-emerald-300',
          bgAccent: 'bg-emerald-400/13',
          summary: [entityName],
          detail: `${entityName} was edited manually in the library metadata editor.`,
          activityType: 'libraryEdit',
          dateGroup: 'today',
          affectedCount: 1,
          affectedItems: [entityName],
          changedFields: ['Metadata'],
          provider: 'Manual',
          status: 'completed',
          relatedLibraryTarget: entityTypeLabel as 'artist' | 'album' | 'track',
        })
      },
    })
    closeEditor()
  }, [editorType, startProgress, showToast, closeEditor, appendActivity])

  const editorEntity = useMemo(() => {
    if (!editorOpen || !editorEntityId) return null
    if (editorType === 'artist') return libraryArtists.find((a) => a.id === editorEntityId) ?? null
    if (editorType === 'album') return libraryAlbums.find((a) => a.id === editorEntityId) ?? null
    return librarySongs.find((s) => s.id === editorEntityId) ?? null
  }, [editorOpen, editorEntityId, editorType, libraryArtists, libraryAlbums, librarySongs])

  /* Activity callbacks */
  const selectedActivityItem = useMemo(() => {
    if (!selectedActivityId) return null
    return activityItemsState.find((i) => i.id === selectedActivityId) ?? null
  }, [selectedActivityId, activityItemsState])

  const openActivityDetail = useCallback((item: ActivityItem) => {
    setSelectedActivityId(item.id)
    setActiveActivitySheet('detail')
  }, [])

  const openActivitySummary = useCallback((item: ActivityItem) => {
    setSelectedActivityId(item.id)
    setActiveActivitySheet('summary')
  }, [])

  const closeActivitySheet = useCallback(() => {
    setActiveActivitySheet(null)
    setSelectedActivityId(null)
  }, [])

  const navigateActivityToReview = useCallback(
    (target: ActivityItem['relatedReviewTarget']) => {
      if (!target) return
      if (target === 'artwork') {
        handleFilterReview('artwork')
      } else if (target === 'lyrics') {
        handleFilterReview('lyrics')
      } else if (target === 'metadata/tags') {
        setMetadataFilter('tags')
        handleFilterReview('metadata')
      } else if (target === 'metadata/identity') {
        setMetadataFilter('identity')
        handleFilterReview('metadata')
      } else if (target === 'metadata/release') {
        setMetadataFilter('release')
        handleFilterReview('metadata')
      } else if (target === 'metadata/audio') {
        setMetadataFilter('audio')
        handleFilterReview('metadata')
      } else {
        handleFilterReview('all')
      }
      closeActivitySheet()
    },
    [handleFilterReview, closeActivitySheet],
  )

  const openActivityFilter = useCallback(() => {
    setActiveActivitySheet('filter')
  }, [])

  const applyActivityFilter = useCallback((filter: ActivityFilter, sort: 'newest' | 'oldest') => {
    setActivityFilter(filter)
    setActivitySort(sort)
    closeActivitySheet()
    showToast(filter === 'all' ? 'Showing all activity' : `Filtered by ${filter}`, 'info')
  }, [closeActivitySheet, showToast])

  const resetActivityFilters = useCallback(() => {
    setActivityFilter('all')
    setActivitySort('newest')
    showToast('Activity filters reset', 'info')
  }, [showToast])

  const screens: Record<ForgeTab, ReactNode> = {
    home: (
      <ForgeHome
        mockState={mockState}
        onFilterReview={handleFilterReview}
        onNavigateToActivity={() => setActiveTab('activity')}
        onNavigateToLibrary={() => setActiveTab('library')}
        onOpenSafetyNote={openSafetyNote}
        onOpenSettings={openSettings}
        onReviewNow={handleReviewNow}
        onOpenEnrichMode={openEnrichMode}
      />
    ),
    review: (
      <ForgeReview
        filter={reviewFilter}
        metadataFilter={metadataFilter}
        itemStatuses={itemStatuses}
        mockState={mockState}
        selectedIds={selectedIds}
        sessionFixed={sessionFixed}
        sessionIgnored={sessionIgnored}
        showToast={showToast}
        showConfirm={showConfirm}
        showProgress={startProgress}
        onClearFilter={clearReviewFilter}
        onNavigateToActivity={() => setActiveTab('activity')}
        onNavigateToLibrary={() => setActiveTab('library')}
        onOpenEnrichMode={openEnrichMode}
        onOpenSettings={openSettings}
        onOpenItemDetail={openItemDetail}
        onResetQueue={resetQueue}
        onSetFilter={setReviewFilter}
        onSetMetadataFilter={setMetadataFilter}
        onSetItemStatuses={setItemStatuses}
        onSetSelectedIds={setSelectedIds}
        onSetSessionFixed={setSessionFixed}
        onSetSessionIgnored={setSessionIgnored}
      />
    ),
    library: (
      <ForgeLibrary
        mockState={mockState}
        onOpenAlbumEditor={openAlbumEditor}
        onOpenArtistEditor={openArtistEditor}
        onOpenTrackEditor={openTrackEditor}
        onOpenSettings={openSettings}
      />
    ),
    activity: (
      <ForgeActivity
        activeFilter={activityFilter}
        items={activityItemsState}
        mockState={mockState}
        onNavigateToReview={navigateActivityToReview}
        onOpenDetail={openActivityDetail}
        onOpenFilter={openActivityFilter}
        onOpenSummary={openActivitySummary}
        onResetFilters={resetActivityFilters}
      />
    ),
  }

  return (
    <div className="relative flex h-full min-h-full min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_40%_0%,rgba(255,200,150,.08),transparent_35%),linear-gradient(180deg,#0f0c0a,#080604_70%)] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          key={activeTab}
          transition={{ duration: 0.24 }}
        >
          {screens[activeTab]}
        </motion.div>
      </AnimatePresence>
      <ForgeBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Overlay layers */}
      {activeSheet === 'settings' && (
        <ForgeSettingsSheet
          mockState={mockState}
          onClose={closeSheet}
          onSave={handleSaveSettings}
          onSetMockScenario={setMockScenario}
          showConfirm={showConfirm}
          showToast={showToast}
        />
      )}
      {activeSheet === 'safetyNote' && <ForgeSafetyNoteSheet onClose={closeSheet} />}

      {/* Enrich Mode full-screen flow */}
      {enrichModeOpen && (
        <ForgeEnrichMode
          appendActivity={appendActivity}
          markSafeItemsApplied={markSafeItemsApplied}
          mockState={mockState}
          onClose={closeEnrichMode}
          onOpenSettings={() => {
            closeEnrichMode()
            setActiveSheet('settings')
            showToast('Forge Settings opened', 'info')
          }}
          onViewActivity={() => {
            setActiveTab('activity')
            showToast('Activity opened', 'info')
          }}
          onViewReview={() => {
            setReviewFilter('all')
            setActiveTab('review')
            showToast('Review queue opened', 'info')
          }}
          showToast={showToast}
        />
      )}

      {/* Detail sheets */}
      {activeDetailSheet === 'lyrics' && selectedReviewItem && (
        <ForgeLyricsDetailSheet
          item={selectedReviewItem}
          onApply={applyDetailFix}
          onIgnore={ignoreDetailItem}
          onPreviewChanges={openMetadataDiff}
          onClose={closeDetailSheet}
        />
      )}
      {activeDetailSheet === 'covers' && selectedReviewItem && (
        <ForgeCoverComparisonSheet
          item={selectedReviewItem}
          onApply={applyDetailFix}
          onKeepCurrent={keepCurrentCover}
          onIgnore={ignoreDetailItem}
          onPreviewChanges={openMetadataDiff}
          onClose={closeDetailSheet}
        />
      )}
      {activeDetailSheet === 'genres' && selectedReviewItem && (
        <ForgeGenrePickerSheet
          item={selectedReviewItem}
          initialGenres={itemGenres[selectedReviewItem.id]}
          onApply={applyGenre}
          onIgnore={ignoreDetailItem}
          onPreviewChanges={openMetadataDiff}
          onClose={closeDetailSheet}
        />
      )}
      {activeDetailSheet === 'metadata' && selectedReviewItem && (
        <ForgeMetadataDiffSheet
          title="Metadata preview"
          subtitle="Review the changes before applying."
          rows={metadataPreviewRows}
          applyLabel={'actionLabel' in selectedReviewItem && selectedReviewItem.actionLabel ? selectedReviewItem.actionLabel : 'Apply change'}
          onApply={applyDetailFix}
          onClose={closeDetailSheet}
        />
      )}

      {/* Activity sheets */}
      {activeActivitySheet === 'detail' && selectedActivityItem && (
        <ForgeActivityDetailSheet
          item={selectedActivityItem}
          onClose={closeActivitySheet}
          onOpenRelatedReview={
            selectedActivityItem.relatedReviewTarget
              ? () => navigateActivityToReview(selectedActivityItem.relatedReviewTarget)
              : undefined
          }
          onOpenRelatedLibrary={
            selectedActivityItem.relatedLibraryTarget
              ? () => {
                  closeActivitySheet()
                  showToast('Library item focus is planned for a later Forge batch', 'info')
                }
              : undefined
          }
        />
      )}
      {activeActivitySheet === 'summary' && selectedActivityItem && (
        <ForgeActivitySummarySheet
          item={selectedActivityItem}
          onClose={closeActivitySheet}
          onOpenRelatedReview={
            selectedActivityItem.relatedReviewTarget
              ? () => navigateActivityToReview(selectedActivityItem.relatedReviewTarget)
              : undefined
          }
        />
      )}
      {activeActivitySheet === 'filter' && (
        <ForgeActivityFilterSheet
          activeFilter={activityFilter}
          activeSort={activitySort}
          onApply={applyActivityFilter}
          onReset={resetActivityFilters}
          onClose={closeActivitySheet}
        />
      )}

      {/* Progress sheet */}
      {progressFlow && (
        <ForgeProgressSheet flow={progressFlow} onClose={closeProgress} />
      )}

      {toast && (
        <ForgeToast
          key={toast.message}
          message={toast.message}
          onClose={dismissToast}
          tone={toast.tone}
        />
      )}

      {confirmDialog && (
        <ForgeConfirmDialog
          confirmLabel={confirmDialog.confirmLabel}
          description={confirmDialog.description}
          onCancel={() => setConfirmDialog(null)}
          onConfirm={() => {
            confirmDialog.onConfirm()
            setConfirmDialog(null)
          }}
          tone={confirmDialog.tone}
          title={confirmDialog.title}
        />
      )}

      {/* Metadata editor */}
      {editorOpen && editorEntity && (
        <ForgeMetadataEditor
          albums={libraryAlbums}
          entity={editorEntity}
          entityType={editorType}
          initialTab={editorInitialTab}
          mockState={mockState}
          showConfirm={showConfirm}
          songs={librarySongs}
          onClose={closeEditor}
          onOpenAlbumEditor={openAlbumEditor}
          onOpenTrackEditor={openTrackEditor}
          onSave={handleSaveEntity}
        />
      )}
    </div>
  )
}
