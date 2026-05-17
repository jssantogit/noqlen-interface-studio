import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { ForgeActivity } from './components/ForgeActivity'
import { ForgeBottomNav } from './components/ForgeBottomNav'
import { ForgeHome } from './components/ForgeHome'
import { ForgeLibrary } from './components/ForgeLibrary'
import { ForgeReview } from './components/ForgeReview'

export type ForgeTab = 'home' | 'review' | 'library' | 'activity'

export function ForgePreview() {
  const [activeTab, setActiveTab] = useState<ForgeTab>('home')

  const screens: Record<ForgeTab, ReactNode> = {
    home: <ForgeHome onReviewNow={() => setActiveTab('review')} />,
    review: <ForgeReview />,
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
    </div>
  )
}
