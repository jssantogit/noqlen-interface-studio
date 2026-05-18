import type { ReactNode } from 'react'

export function AppViewport({ children }: { children: ReactNode }) {
  return (
    <div className="phone-app-viewport anchor-scrollbar-soft min-h-0 w-[var(--phone-virtual-width)] min-w-[var(--phone-virtual-width)] flex-1 overflow-x-hidden overflow-y-auto overscroll-contain rounded-[26px] bg-[#070a10] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.022),inset_0_0.9rem_1.6rem_rgba(255,255,255,0.02),inset_0_-1rem_1.8rem_rgba(0,0,0,0.48)]">
      {children}
    </div>
  )
}
