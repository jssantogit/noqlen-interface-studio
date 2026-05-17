import type { ReactNode } from 'react'

export function AppViewport({ children }: { children: ReactNode }) {
  return (
    <div className="phone-app-viewport anchor-scrollbar-soft mx-0.5 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-[clamp(1.28rem,5vw,1.72rem)] bg-[#070a10] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.025),inset_0_1.2rem_2rem_rgba(255,255,255,0.025),inset_0_-1.2rem_2.2rem_rgba(0,0,0,0.55)]">
      {children}
    </div>
  )
}
