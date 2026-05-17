import { motion } from 'framer-motion'
import { useState } from 'react'
import { studioApps, type StudioAppId } from '../../apps/apps'
import { AppViewport } from '../phone/AppViewport'
import { PhoneFrame } from '../phone/PhoneFrame'
import { AppSwitcher } from './AppSwitcher'
import { StudioInspector } from './StudioInspector'
import { StudioTopBar } from './StudioTopBar'

export function StudioLayout() {
  const [selectedAppId, setSelectedAppId] = useState<StudioAppId>('anchor')
  const selectedApp =
    studioApps.find((app) => app.id === selectedAppId) ?? studioApps[0]
  const Preview = selectedApp.Preview

  return (
    <main className="min-h-screen overflow-x-hidden px-3 py-3 text-slate-100 sm:px-5 sm:py-5 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <StudioTopBar />

        <section className="grid items-start gap-4 lg:grid-cols-[15rem_minmax(0,1fr)_15rem]">
          <div className="order-1 lg:sticky lg:top-5">
            <AppSwitcher
              apps={studioApps}
              onSelectApp={setSelectedAppId}
              selectedAppId={selectedAppId}
            />
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="order-2 flex min-w-0 justify-center"
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            key={selectedApp.id}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <PhoneFrame appName={selectedApp.name}>
              <AppViewport>
                <Preview />
              </AppViewport>
            </PhoneFrame>
          </motion.div>

          <div className="order-3 hidden lg:sticky lg:top-5 lg:block">
            <StudioInspector selectedApp={selectedApp} />
          </div>
        </section>
      </div>
    </main>
  )
}
