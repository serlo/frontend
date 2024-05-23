import { useEffect, useState } from 'react'

export function useGetShadowRoot(containerRef: React.RefObject<HTMLElement>) {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)

  useEffect(() => {
    // Should be fixed in React 19, hopefully. If not for the timeout,
    // getRootNode() will not consistently return the shadow root...
    const timeout = setTimeout(() => {
      if (
        containerRef.current &&
        (containerRef.current.shadowRoot ||
          containerRef.current.getRootNode() instanceof ShadowRoot)
      ) {
        // containerRef..current.shadowRoot is always null which is why we
        // use getRootNode.
        setShadowRoot(containerRef.current.getRootNode() as ShadowRoot)
      }
    }, 1)

    return () => {
      clearTimeout(timeout)
    }
  }, [containerRef])

  return shadowRoot
}
