import type { ReactNode } from 'react'
import { PhoneHomeIndicator } from './PhoneHomeIndicator'
import { PhoneStatusBar } from './PhoneStatusBar'

export function PhoneFrame({
  appName,
  children,
}: {
  appName: string
  children: ReactNode
}) {
  return (
    <section
      aria-label={`${appName} phone simulator`}
      className="min-w-0 w-full max-w-[var(--studio-phone-width)] shrink rounded-[clamp(2.1rem,8vw,3rem)] border border-white/12 bg-gradient-to-b from-slate-700/35 via-black to-black p-1.5 shadow-[0_2rem_5rem_rgba(0,0,0,0.5)] sm:p-2.5 lg:shrink-0 lg:shadow-[0_3rem_7rem_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-[9/19.5] w-full min-w-0 max-w-full overflow-hidden rounded-[clamp(1.85rem,7vw,2.55rem)] border border-white/10 bg-black">
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black shadow-lg shadow-black sm:h-6 sm:w-28" />
        <div className="flex h-full flex-col bg-gradient-to-b from-white/[0.055] to-transparent">
          <PhoneStatusBar appName={appName} />
          {children}
          <PhoneHomeIndicator />
        </div>
      </div>
    </section>
  )
}
