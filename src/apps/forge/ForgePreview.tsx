import { AnimatePresence, motion } from 'framer-motion'
import { useState, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { reviewGroups, type ReviewItemStatus, type ReviewItemType } from './forgeMockData'
import { ForgeActivity } from './components/ForgeActivity'
import { ForgeBottomNav } from './components/ForgeBottomNav'
import { ForgeConfirmDialog } from './components/ForgeConfirmDialog'
import { ForgeCoverComparisonSheet } from './components/ForgeCoverComparisonSheet'
import { ForgeGenrePickerSheet } from './components/ForgeGenrePickerSheet'
import { ForgeHome } from './components/ForgeHome'
import { ForgeLibrary } from './components/ForgeLibrary'
import { ForgeLyricsDetailSheet } from './components/ForgeLyricsDetailSheet'
import { ForgeMetadataDiffSheet } from './components/ForgeMetadataDiffSheet'
import { ForgeReview } from './components/ForgeReview'
import { ForgeSafetyNoteSheet } from './components/ForgeSafetyNoteSheet'
import { ForgeSettingsSheet } from './components/ForgeSettingsSheet'
import { ForgeToast } from './components/ForgeToast'

export type ForgeTab = 'home' | 'review' | 'library' | 'activity'
export type ReviewFilter = 'all' | 'lyrics' | 'covers' | 'genres'
export type ForgeSheet = 'settings' | 'safetyNote' | null
export type ForgeDetailSheet = 'lyrics' | 'covers' | 'genres' | 'metadata' | null

function buildInitialItemStatuses(): Record<string, ReviewItemStatus> {
  const map: Record<string, ReviewItemStatus> = {}
  reviewGroups.forEach((g) => g.items.forEach((i) => { map[i.id] = i.status }))
  return map
}

export function ForgePreview() {
  const [activeTab, setActiveTab] = useState<ForgeTab>('home')
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all')
  const [activeSheet, setActiveSheet] = useState<ForgeSheet>(null)
  const [activeDetailSheet, setActiveDetailSheet] = useState<ForgeDetailSheet>(null)
  const [selectedReviewItemId, setSelectedReviewItemId] = useState<string | null>(null)
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

  const showToast = useCallback((message: string, tone: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, tone })
  }, [])

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  const handleReviewNow = useCallback(() => {
    setReviewFilter('all')
    setActiveTab('review')
    showToast('Review queue opened', 'info')
  }, [showToast])

  const handleFilterReview = useCallback(
    (filter: ReviewFilter) => {
      setReviewFilter(filter)
      setActiveTab('review')
      const label =
        filter === 'lyrics'
          ? 'Missing lyrics queue selected'
          : filter === 'covers'
            ? 'Cover review queue selected'
            : 'Missing genres queue selected'
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

  const closeDetailSheet = useCallback(() => {
    setActiveDetailSheet(null)
    setSelectedReviewItemId(null)
  }, [])

  const openItemDetail = useCallback((itemId: string, type: ReviewItemType) => {
    setSelectedReviewItemId(itemId)
    setActiveDetailSheet(type === 'lyrics' ? 'lyrics' : type === 'covers' ? 'covers' : 'genres')
  }, [])

  const updateItemStatus = useCallback(
    (id: string, status: ReviewItemStatus) => {
      setItemStatuses((prev) => {
        if (prev[id] === status) return prev
        return { ...prev, [id]: status }
      })
      if (status === 'fixed') {
        setSessionFixed((s) => s + 1)
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
    [],
  )

  const resetQueue = useCallback(() => {
    setItemStatuses(buildInitialItemStatuses())
    setSelectedIds(new Set())
    setSessionFixed(0)
    setSessionIgnored(0)
    showToast('Mock review queue reset', 'info')
  }, [showToast])

  const handleSaveSettings = useCallback(() => {
    closeSheet()
    showToast('Forge settings saved in mock preview')
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

  const clearReviewFilter = useCallback(() => setReviewFilter('all'), [])

  const selectedReviewItem = useMemo(() => {
    if (!selectedReviewItemId) return null
    return reviewGroups.flatMap((g) => g.items).find((i) => i.id === selectedReviewItemId) ?? null
  }, [selectedReviewItemId])

  const applyDetailFix = useCallback(() => {
    if (!selectedReviewItemId) return
    updateItemStatus(selectedReviewItemId, 'fixed')
    closeDetailSheet()
    showToast('Item fixed in mock preview')
  }, [selectedReviewItemId, updateItemStatus, closeDetailSheet, showToast])

  const ignoreDetailItem = useCallback(() => {
    if (!selectedReviewItemId) return
    updateItemStatus(selectedReviewItemId, 'ignored')
    closeDetailSheet()
    showToast('Item ignored in mock preview')
  }, [selectedReviewItemId, updateItemStatus, closeDetailSheet, showToast])

  const keepCurrentCover = useCallback(() => {
    if (!selectedReviewItemId) return
    updateItemStatus(selectedReviewItemId, 'ignored')
    closeDetailSheet()
    showToast('Current cover kept in mock preview')
  }, [selectedReviewItemId, updateItemStatus, closeDetailSheet, showToast])

  const applyGenre = useCallback(
    (genres: string[]) => {
      if (!selectedReviewItemId) return
      setItemGenres((prev) => ({ ...prev, [selectedReviewItemId]: genres }))
      updateItemStatus(selectedReviewItemId, 'fixed')
      closeDetailSheet()
      showToast('Genre applied in mock preview')
    },
    [selectedReviewItemId, updateItemStatus, closeDetailSheet, showToast],
  )

  const openMetadataDiff = useCallback(() => {
    setActiveDetailSheet('metadata')
  }, [])

  const screens: Record<ForgeTab, ReactNode> = {
    home: (
      <ForgeHome
        onFilterReview={handleFilterReview}
        onOpenSafetyNote={openSafetyNote}
        onOpenSettings={openSettings}
        onReviewNow={handleReviewNow}
      />
    ),
    review: (
      <ForgeReview
        filter={reviewFilter}
        itemStatuses={itemStatuses}
        selectedIds={selectedIds}
        sessionFixed={sessionFixed}
        sessionIgnored={sessionIgnored}
        showToast={showToast}
        showConfirm={showConfirm}
        onClearFilter={clearReviewFilter}
        onOpenItemDetail={openItemDetail}
        onResetQueue={resetQueue}
        onSetItemStatuses={setItemStatuses}
        onSetSelectedIds={setSelectedIds}
        onSetSessionFixed={setSessionFixed}
        onSetSessionIgnored={setSessionIgnored}
      />
    ),
    library: <ForgeLibrary />,
    activity: <ForgeActivity />,
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
        <ForgeSettingsSheet onClose={closeSheet} onSave={handleSaveSettings} />
      )}
      {activeSheet === 'safetyNote' && <ForgeSafetyNoteSheet onClose={closeSheet} />}

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
          rows={[
            {
              label: selectedReviewItem.type === 'lyrics' ? 'Lyrics' : selectedReviewItem.type === 'covers' ? 'Cover' : 'Genre',
              before: selectedReviewItem.type === 'lyrics' ? 'Missing' : selectedReviewItem.type === 'covers' ? 'Low resolution' : 'Unknown',
              after: selectedReviewItem.type === 'lyrics' ? 'Mock lyrics preview' : selectedReviewItem.type === 'covers' ? 'Suggested cover' : (itemGenres[selectedReviewItem.id]?.join(', ') || 'Selected genre'),
            },
          ]}
          onApply={applyDetailFix}
          onClose={closeDetailSheet}
        />
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
    </div>
  )
}
