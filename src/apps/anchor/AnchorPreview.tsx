import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnchorActivity } from './components/AnchorActivity'
import { AnchorBottomNav } from './components/AnchorBottomNav'
import { AnchorHome } from './components/AnchorHome'
import { AnchorLibrary } from './components/AnchorLibrary'
import { AnchorServers } from './components/AnchorServers'

export type AnchorTab = 'home' | 'servers' | 'library' | 'activity'

export function AnchorPreview() {
  const [activeTab, setActiveTab] = useState<AnchorTab>('home')

  const screens: Record<AnchorTab, ReactNode> = {
    home: <AnchorHome />,
    servers: <AnchorServers />,
    library: <AnchorLibrary />,
    activity: <AnchorActivity />,
  }

  return (
    <div className="relative flex h-full min-h-full min-w-0 flex-col overflow-hidden bg-[radial-gradient(circle_at_24%_-8%,rgba(245,158,11,0.18),transparent_15rem),radial-gradient(circle_at_85%_4%,rgba(14,165,233,0.08),transparent_13rem),linear-gradient(180deg,#091217_0%,#071014_52%,#05090d_100%)] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-28"
          exit={{ opacity: 0, y: -8 }}
          initial={{ opacity: 0, y: 14 }}
          key={activeTab}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {screens[activeTab]}
        </motion.div>
      </AnimatePresence>
      <AnchorBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
