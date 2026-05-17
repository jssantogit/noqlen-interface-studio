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
      className="w-full max-w-[25rem] rounded-[3rem] border border-white/12 bg-gradient-to-b from-slate-700/35 via-black to-black p-2 shadow-[0_3rem_7rem_rgba(0,0,0,0.55)] sm:p-2.5"
    >
      <div className="relative h-[min(46rem,calc(100vh-9.5rem))] min-h-[35rem] overflow-hidden rounded-[2.55rem] border border-white/10 bg-black">
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black shadow-lg shadow-black" />
        <div className="flex h-full flex-col bg-gradient-to-b from-white/[0.055] to-transparent">
          <PhoneStatusBar appName={appName} />
          {children}
          <PhoneHomeIndicator />
        </div>
      </div>
    </section>
  )
}
