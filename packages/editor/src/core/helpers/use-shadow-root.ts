import { useEffect, useState } from 'react'

// null while computing; false if we are certainly outside of the shadow DOM.
type PossibleShadowRoot = ShadowRoot | null

export function useShadowRoot(
  containerRef: React.RefObject<HTMLElement>
): PossibleShadowRoot {
  console.log(
    'useShadowRoot. Checking whether container ref is part of the shadow root: ',
    { containerRef }
  )
  const [shadowRoot, setShadowRoot] = useState<PossibleShadowRoot>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Should be fixed in React 19, hopefully. If not for the timeout,
    // getRootNode() will not consistently return the shadow root...
    const timeout = setTimeout(() => {
      // containerRef..current.shadowRoot is always null which is why we
      // use getRootNode.
      const possibleShadowRoot = containerRef.current?.getRootNode()

      console.log('Use Shadow root called. Checking if root is a shadow root', {
        containerRef,
        possibleShadowRoot,
      })

      if (isShadowRoot(possibleShadowRoot)) {
        console.log('It is a shadow root! 🎉')
        setShadowRoot(possibleShadowRoot)
      }
      // else {
      //   setShadowRoot(false)
      // }
    }, 1)

    return () => {
      clearTimeout(timeout)
    }
  }, [containerRef])

  console.log('Returning shadow root: ', shadowRoot)
  return shadowRoot
}

export function isShadowRoot(
  shadowRoot: PossibleShadowRoot | Node | undefined
): shadowRoot is ShadowRoot {
  return shadowRoot instanceof ShadowRoot
}
