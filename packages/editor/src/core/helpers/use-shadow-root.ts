import { useEffect, useState } from 'react'

// null while computing; false if we are certainly outside of the shadow DOM.
type PossibleShadowRoot = ShadowRoot | null | false

export function useShadowRoot(
  containerRef: React.RefObject<HTMLElement>
): PossibleShadowRoot {
  const [shadowRoot, setShadowRoot] = useState<PossibleShadowRoot>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Should be fixed in React 19, hopefully. If not for the timeout,
    // getRootNode() will not consistently return the shadow root...
    const timeout = setTimeout(() => {
      const possibleShadowRoot = containerRef.current?.getRootNode()
      if (possibleShadowRoot instanceof ShadowRoot) {
        // containerRef..current.shadowRoot is always null which is why we
        // use getRootNode.
        setShadowRoot(possibleShadowRoot)
      } else {
        setShadowRoot(false)
      }
    }, 1)

    return () => {
      clearTimeout(timeout)
    }
  }, [containerRef])

  return shadowRoot
}

export function isShadowRoot(
  shadowRoot: PossibleShadowRoot
): shadowRoot is ShadowRoot {
  return shadowRoot instanceof ShadowRoot
}
