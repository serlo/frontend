import { useEffect, useState } from 'react'

export function useShadowRoot(containerRef: React.RefObject<HTMLElement>) {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null)

  useEffect(() => {
    // Should be fixed in React 19, hopefully. If not for the timeout,
    // getRootNode() will not consistently return the shadow root...
    const timeout = setTimeout(() => {
      // containerRef.current.shadowRoot is always null which is why we
      // use getRootNode.
      const possibleShadowRoot = containerRef.current?.getRootNode()
      if (possibleShadowRoot instanceof ShadowRoot) {
        setShadowRoot(possibleShadowRoot)
      }
    }, 1)

    return () => {
      clearTimeout(timeout)
    }
  }, [containerRef])

  return shadowRoot
}

export function isShadowRoot(
  shadowRoot: ShadowRoot | null | Node | undefined
): shadowRoot is ShadowRoot {
  return shadowRoot instanceof ShadowRoot
}

export function getFirstElementOrUndefined(
  shadowRoot: ShadowRoot | null | undefined
): HTMLElement | undefined {
  if (!shadowRoot) {
    return undefined
  }

  return shadowRoot?.firstElementChild as HTMLElement
}
