import { AnimatePresence, motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { ForgeActivity } from './components/ForgeActivity'
import { ForgeBottomNav } from './components/ForgeBottomNav'
import { ForgeConfirmDialog } from './components/ForgeConfirmDialog'
import { ForgeHome } from './components/ForgeHome'
import { ForgeLibrary } from './components/ForgeLibrary'
import { ForgeReview } from './components/ForgeReview'
import { ForgeSafetyNoteSheet } from './components/ForgeSafetyNoteSheet'
import { ForgeSettingsSheet } from './components/ForgeSettingsSheet'
import { ForgeToast } from './components/ForgeToast'

export type ForgeTab = 'home' | 'review' | 'library' | 'activity'
export type ReviewFilter = 'all' | 'lyrics' | 'covers' | 'genres'
export type ForgeSheet = 'settings' | 'safetyNote' | null

export function ForgePreview() {
  const [activeTab, setActiveTab] = useState<ForgeTab>('home')
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all')
  const [activeSheet, setActiveSheet] = useState<ForgeSheet>(null)
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

  const handleSaveSettings = useCallback(() => {
    closeSheet()
    showToast('Forge settings saved in mock preview')
  }, [closeSheet, showToast])

  const screens: Record<ForgeTab, ReactNode> = {
    home: (
      <ForgeHome
        onFilterReview={handleFilterReview}
        onOpenSafetyNote={openSafetyNote}
        onOpenSettings={openSettings}
        onReviewNow={handleReviewNow}
      />
    ),
    review: <ForgeReview filter={reviewFilter} />,
    library: <ForgeLibrary />,
    activity: <ForgeActivity />,
  }

  return (
    <div className="relative flex h-full min-h-full min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_40%_0%,rgba(255,216,170,.07),transparent_35%),linear-gradient(180deg,#0c1012,#07090a_70%)] text-white">
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
