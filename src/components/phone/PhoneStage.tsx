import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const PHONE_FRAME_WIDTH = 414
const PHONE_FRAME_HEIGHT = 868
const MIN_SCALE = 0.48
const EDGE_GAP = 12

function usePhoneScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const updateScale = () => {
      const rect = element.getBoundingClientRect()
      const availableWidth = Math.max(0, rect.width - EDGE_GAP * 2)
      const availableHeight = Math.max(0, window.innerHeight - rect.top - EDGE_GAP)
      const nextScale = Math.min(
        1,
        availableWidth / PHONE_FRAME_WIDTH,
        availableHeight / PHONE_FRAME_HEIGHT,
      )
      setScale(Math.max(MIN_SCALE, Number(nextScale.toFixed(4))))
    }

    updateScale()
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(updateScale)
    observer?.observe(element)
    window.addEventListener('resize', updateScale)
    window.addEventListener('orientationchange', updateScale)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateScale)
      window.removeEventListener('orientationchange', updateScale)
    }
  }, [])

  return { ref, scale }
}

export function PhoneStage({ children }: { children: ReactNode }) {
  const { ref, scale } = usePhoneScale()

  return (
    <div ref={ref} className="flex w-full min-w-0 justify-center overflow-visible">
      <div
        className="relative shrink-0"
        style={{
          height: PHONE_FRAME_HEIGHT * scale,
          width: PHONE_FRAME_WIDTH * scale,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
