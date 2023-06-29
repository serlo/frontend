import { MutableRefObject, ReactNode, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ClientOnlyPortalProps {
  children: ReactNode
  selector: string
}

export function ClientOnlyPortal(props: ClientOnlyPortalProps) {
  const { children, selector } = props
  const ref: MutableRefObject<Element | null> = useRef(null)
  const [mount, setMount] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMount(true)
  }, [selector])

  if (!mount || !ref.current) return null

  return createPortal(children, ref.current)
}
