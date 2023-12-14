import { cn } from '@serlo/frontend/src/helper/cn'
import { createRef, useEffect, useState, ReactNode, RefObject } from 'react'
import { BaseSelection } from 'slate'

export type HoverPosition = 'above' | 'below'

export interface HoverOverlayProps {
  children: ReactNode
  position: HoverPosition
  anchor?: RefObject<HTMLElement>
  selection?: BaseSelection
}

export function HoverOverlay(props: HoverOverlayProps) {
  const overlay = createRef<HTMLDivElement>()
  const [positionAbove, setPositionAbove] = useState(props.position === 'above')

  const windowSelection = window.getSelection()

  const { anchor, children, selection } = props

  useEffect(() => {
    if (!overlay.current) return

    let rect
    if (anchor && anchor.current !== null) {
      rect = anchor.current.getBoundingClientRect()
    } else if (windowSelection && windowSelection.rangeCount > 0) {
      const range = windowSelection.getRangeAt(0)
      rect = range.getBoundingClientRect()
    }
    if (!rect) return
    if (rect.height === 0) return

    const menu = overlay.current
    if (!menu.offsetParent) return

    const parentRect = menu.offsetParent.getBoundingClientRect()
    menu.style.opacity = '1'
    const aboveValue = rect.top - menu.offsetHeight - 6
    // if top becomes negative, place menu below
    setPositionAbove(positionAbove && aboveValue >= 0)
    menu.style.top = `${
      (positionAbove ? aboveValue : rect.bottom + 6) - parentRect.top
    }px`

    menu.style.left = `${Math.max(
      Math.min(
        Math.max(
          rect.left - parentRect.left - menu.offsetWidth / 2 + rect.width / 2,
          0
        ),
        parentRect.width - menu.offsetWidth - 5
      ),
      0
    )}px`
  }, [overlay, anchor, positionAbove, windowSelection, selection])

  return (
    <div
      ref={overlay}
      className={cn(`
        absolute -left-[10000px] -top-[10000px] z-[95] overflow-auto whitespace-nowrap
        rounded-md bg-white text-almost-black opacity-0 shadow-modal
        transition-opacity [&_a]:text-almost-black [&_a]:hover:text-brand
      `)}
    >
      {children}
    </div>
  )
}
