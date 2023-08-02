import { createRef, useEffect, useState, ReactNode, RefObject } from 'react'

export type HoverPosition = 'above' | 'below'

interface HoverOverlayProps {
  children: ReactNode
  position: HoverPosition
  anchor?: RefObject<HTMLElement>
}

// TODO: Once all redesign tasks are done, delete this component
export function HoverOverlayOld(props: HoverOverlayProps) {
  const overlay = createRef<HTMLDivElement>()
  const triangle = createRef<HTMLDivElement>()
  const [positionAbove, setPositionAbove] = useState(props.position === 'above')

  const windowSelection = window.getSelection()

  const [nativeSelection, setNativeSelection] = useState({
    anchorOffset: windowSelection?.anchorOffset,
    focusNode: windowSelection?.focusNode,
  })
  const handleSelectionChange = () => {
    setNativeSelection({
      anchorOffset: windowSelection?.anchorOffset,
      focusNode: windowSelection?.focusNode,
    })
  }
  document.addEventListener('selectionchange', handleSelectionChange)
  useEffect(() => () => {
    document.removeEventListener('selectionchange', handleSelectionChange)
  })

  const { anchor, children } = props

  useEffect(() => {
    if (!overlay.current || !triangle.current) return
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
    // menu is set to display:none, shouldn't ever happen
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
    triangle.current.style.left = `${
      rect.left -
      menu.offsetLeft -
      parentRect.left -
      triangle.current.offsetWidth / 2 +
      rect.width / 2
    }px`
  }, [
    overlay,
    triangle,
    anchor,
    positionAbove,
    nativeSelection.focusNode,
    nativeSelection.anchorOffset,
    windowSelection,
  ])

  const triangleClass = 'relative w-0 h-0 border-x-6 border-transparent'

  return (
    <div
      ref={overlay}
      className="absolute -left-[10000px] -top-[10000px] z-[95] whitespace-nowrap opacity-0 transition-opacity"
    >
      {!positionAbove && (
        <div
          ref={triangle}
          className={triangleClass + ' border-b-[10px] border-b-editor-primary'}
        />
      )}
      <div className="rounded-sm bg-almost-black text-white shadow-menu [&_a]:text-white [&_a]:hover:text-brand">
        {children}
      </div>
      {positionAbove && (
        <div
          ref={triangle}
          className={
            triangleClass + '  border-t-[10px] border-t-editor-primary'
          }
        />
      )}
    </div>
  )
}
