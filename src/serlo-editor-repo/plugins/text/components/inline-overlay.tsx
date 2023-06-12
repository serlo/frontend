import { useLayoutEffect, useRef, useState } from 'react'
import { useSlate } from 'slate-react'

import type { TextEditorConfig } from '../types'
import { legacyEditorTheme } from '@/helper/colors'
import { styled } from '@/serlo-editor-repo/ui'

export enum InlineOverlayPosition {
  above = 'above',
  below = 'below',
}

function isAbove(position: InlineOverlayPosition) {
  return position === InlineOverlayPosition.above
}

const Wrapper = styled.div({
  position: 'absolute',
  top: '-10000px',
  left: '-10000px',
  opacity: 0,
  transition: 'opacity 0.5s',
  zIndex: 95,
  whiteSpace: 'nowrap',
})

const Content = styled.div({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
  backgroundColor: legacyEditorTheme.backgroundColor,
  color: legacyEditorTheme.color,
  borderRadius: '4px',
})

const Triangle = styled.div<{ position: InlineOverlayPosition }>(
  ({ position }) => {
    const borderPosition = isAbove(position) ? 'borderTop' : 'borderBottom'
    return {
      position: 'relative',
      width: 0,
      height: 0,
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      [borderPosition]: `10px solid ${legacyEditorTheme.backgroundColor}`,
    }
  }
)

export function InlineOverlay({
  children,
  initialPosition,
  hidden,
}: {
  config: TextEditorConfig
  children: React.ReactNode
  initialPosition: InlineOverlayPosition
  hidden?: boolean
}) {
  const editor = useSlate()
  const wrapper = useRef<HTMLDivElement>(null)
  const triangle = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!wrapper.current || !triangle.current) return
    const { selection } = editor

    if (!selection) return
    if (hidden) {
      wrapper.current.style.top = ''
      wrapper.current.style.left = ''
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection || domSelection.rangeCount === 0) return

    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    if (!rect || rect.height === 0) return

    if (!wrapper.current.offsetParent) return
    const parentRect = wrapper.current.offsetParent.getBoundingClientRect()

    wrapper.current.style.opacity = '1'
    const aboveValue = rect.top - wrapper.current.offsetHeight - 6
    setPosition(
      initialPosition === InlineOverlayPosition.above && aboveValue >= 0
        ? InlineOverlayPosition.above
        : InlineOverlayPosition.below
    )
    wrapper.current.style.top = `${
      (position === InlineOverlayPosition.above
        ? aboveValue
        : rect.bottom + 6) - parentRect.top
    }px`
    wrapper.current.style.left = `${Math.min(
      Math.max(
        rect.left -
          parentRect.left -
          wrapper.current.offsetWidth / 2 +
          rect.width / 2,
        0
      ),
      parentRect.width - wrapper.current.offsetWidth - 5
    )}px`
    triangle.current.style.left = `${
      rect.left -
      wrapper.current.offsetLeft -
      parentRect.left -
      triangle.current.offsetWidth / 2 +
      rect.width / 2
    }px`
  })

  return (
    <Wrapper ref={wrapper}>
      {!isAbove(position) && <Triangle ref={triangle} position={position} />}
      <Content>{children}</Content>
      {isAbove(position) && <Triangle ref={triangle} position={position} />}
    </Wrapper>
  )
}
