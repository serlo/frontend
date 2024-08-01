import { useEffect, useRef } from 'react'

export function useScrollUpTrigger(handleScroll: () => void, active: boolean) {
  const throttleTimer = useRef<NodeJS.Timeout | false>()
  const oldScrollY = useRef<number>(0)

  useEffect(() => {
    const handler = () => {
      const isUp = window.scrollY < oldScrollY.current
      if (isUp && window.scrollY > 100) handleScroll()
      oldScrollY.current = window.scrollY
    }

    const cleanup = () => {
      window.removeEventListener('scroll', handler)
      if (throttleTimer.current) clearTimeout(throttleTimer.current)
    }

    if (active) {
      window.addEventListener('scroll', handler, { passive: true })
    } else cleanup()

    return () => cleanup()
  }, [active, handleScroll])
}
