import { createRef, useEffect, useState, ReactNode, RefObject } from 'react'

import { styled } from '../ui'
import { colors } from '@/helper/colors'

const HoverOverlayWrapper = styled.div({
  position: 'absolute',
  top: '-10000px',
  left: '-10000px',
  opacity: 0,
  transition: 'opacity 0.5s',
  zIndex: 95,
  whiteSpace: 'nowrap',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#fff',
  color: colors.almostBlack,
  borderRadius: '3px',
  overflow: 'auto',
  '& a': {
    color: colors.almostBlack,
    '&:hover': {
      color: 'rgb(70, 155, 255)',
    },
  },
})

type HoverPosition = 'above' | 'below'

interface HoverOverlayProps {
  children: ReactNode
  position: HoverPosition
  anchor?: RefObject<HTMLElement>
}

export function HoverOverlay(props: HoverOverlayProps) {
  const overlay = createRef<HTMLDivElement>()
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
  }, [
    overlay,
    anchor,
    positionAbove,
    nativeSelection.focusNode,
    nativeSelection.anchorOffset,
    windowSelection,
  ])

  return <HoverOverlayWrapper ref={overlay}>{children}</HoverOverlayWrapper>
}
