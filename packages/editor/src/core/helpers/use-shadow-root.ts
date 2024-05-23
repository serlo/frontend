import { useEffect, useState } from 'react'

export function useShadowRoot(containerRef: React.RefObject<HTMLElement>) {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)

  useEffect(() => {
    // Should be fixed in React 19, hopefully. If not for the timeout,
    // getRootNode() will not consistently return the shadow root...
    const timeout = setTimeout(() => {
      const possibleShadowRoot = containerRef.current?.getRootNode()
      if (containerRef.current && possibleShadowRoot instanceof ShadowRoot) {
        // containerRef..current.shadowRoot is always null which is why we
        // use getRootNode.
        setShadowRoot(possibleShadowRoot)
      }
    }, 1)

    return () => {
      clearTimeout(timeout)
    }
  }, [containerRef])

  return shadowRoot
}
