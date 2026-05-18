import { motion } from 'framer-motion'
import { useState } from 'react'
import { studioApps, type StudioAppId } from '../../apps/apps'
import { AppViewport } from '../phone/AppViewport'
import { PhoneFrame } from '../phone/PhoneFrame'
import { PhoneStage } from '../phone/PhoneStage'
import { AppSwitcher } from './AppSwitcher'
import { StudioInspector } from './StudioInspector'
import { StudioTopBar } from './StudioTopBar'

export function StudioLayout() {
  const [selectedAppId, setSelectedAppId] = useState<StudioAppId>('anchor')
  const selectedApp =
    studioApps.find((app) => app.id === selectedAppId) ?? studioApps[0]
  const Preview = selectedApp.Preview

  return (
    <main className="min-h-dvh w-full max-w-full overflow-x-hidden px-[max(var(--studio-shell-pad),env(safe-area-inset-left))] py-[max(0.75rem,env(safe-area-inset-top))] pb-[max(var(--studio-shell-pad),env(safe-area-inset-bottom))] text-slate-100">
      <div className="mx-auto flex min-w-0 w-full max-w-7xl flex-col gap-[var(--studio-shell-gap)] overflow-x-hidden">
        <StudioTopBar />

        <section className="grid min-w-0 items-start gap-[var(--studio-shell-gap)] lg:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)_minmax(13rem,15rem)] xl:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)_minmax(14rem,16rem)]">
          <div className="order-1 min-w-0 lg:sticky lg:top-[var(--studio-shell-pad)]">
            <AppSwitcher
              apps={studioApps}
              onSelectApp={setSelectedAppId}
              selectedAppId={selectedAppId}
            />
          </div>

          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="order-2 flex min-w-0 justify-center lg:px-2"
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            key={selectedApp.id}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <PhoneStage>
              <PhoneFrame appName={selectedApp.name}>
                <AppViewport>
                  <Preview />
                </AppViewport>
              </PhoneFrame>
            </PhoneStage>
          </motion.div>

          <div className="order-3 hidden min-w-0 lg:sticky lg:top-[var(--studio-shell-pad)] lg:block">
            <StudioInspector selectedApp={selectedApp} />
          </div>
        </section>
      </div>
    </main>
  )
}
