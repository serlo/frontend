import { isShadowRoot } from '@editor/core/helpers/use-shadow-root'
import { MutableRefObject, ReactNode, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ClientOnlyPortalProps {
  children: ReactNode
  selector: string
  shadowRootRef: ShadowRoot | null
}

export function ClientOnlyPortal(props: ClientOnlyPortalProps) {
  const { children, selector, shadowRootRef } = props
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const [mount, setMount] = useState(false)

  useEffect(() => {
    ref.current = isShadowRoot(shadowRootRef)
      ? shadowRootRef?.querySelector<HTMLDivElement>(selector)
      : document.querySelector<HTMLDivElement>(selector)

    setMount(true)
  }, [selector, shadowRootRef])

  if (!mount || !ref.current) return null

  return createPortal(children, ref.current)
}
