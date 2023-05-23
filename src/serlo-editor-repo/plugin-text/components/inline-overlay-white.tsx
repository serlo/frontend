import { useLayoutEffect, useRef, useState } from 'react'
import { useSlate } from 'slate-react'

import type { TextEditorConfig } from '../types'

export enum InlineOverlayPosition {
  above = 'above',
  below = 'below',
}

export function InlineOverlayWhite({
  children,
  initialPosition,
  hidden,
}: {
  config: TextEditorConfig
  children: React.ReactNode
  initialPosition: InlineOverlayPosition
  hidden?: boolean
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const editor = useSlate()
  const wrapper = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!wrapper.current) return
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
  })

  return (
    <div
      ref={wrapper}
      className="absolute opacity-0 transition-opacity z-[95] whitespace-nowrap"
    >
      <div className="bg-white shadow-menu rounded max-w-xl">{children}</div>
    </div>
  )
}
