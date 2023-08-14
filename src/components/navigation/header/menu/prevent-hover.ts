import type { PointerEventHandler } from 'react'

export const preventHover: PointerEventHandler = (event) => {
  if (window.innerWidth < 1024) event.preventDefault()
}
