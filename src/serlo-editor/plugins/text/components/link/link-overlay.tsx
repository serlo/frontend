import { useEffect, useRef } from 'react'
import { ReactEditor, useSlate } from 'slate-react'

import type { Link } from '../../types/text-editor'

const wrapperWidth = 460

export function LinkOverlay({
  children,
  element,
}: {
  children: React.ReactNode
  element: Link
}) {
  const editor = useSlate()
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapper.current) return

    const anchorRect = ReactEditor.toDOMNode(
      editor,
      element
    )?.getBoundingClientRect()

    const parentRect = wrapper.current
      .closest('.rows-editor-renderer-container')
      ?.getBoundingClientRect()

    const offsetRect = wrapper.current.offsetParent?.getBoundingClientRect()

    if (!anchorRect || !parentRect || !offsetRect) return

    const boundingLeft = anchorRect.left - 2 // wrapper starts at anchor's left

    const boundingWrapperRight = boundingLeft + wrapperWidth
    const overlap = boundingWrapperRight - parentRect.right
    const fallbackBoundingLeft = boundingLeft - overlap // wrapper ends at editor's right

    wrapper.current.style.left = `${
      (overlap > 0 ? fallbackBoundingLeft : boundingLeft) - offsetRect.left - 5
    }px`
    wrapper.current.style.top = `${anchorRect.bottom + 6 - offsetRect.top}px`
  }, [editor, element])

  return (
    <div ref={wrapper} className="absolute z-[95] whitespace-nowrap">
      <div
        className="w-[460px] rounded bg-white text-start not-italic shadow-menu"
        style={{ width: `${wrapperWidth}px` }}
      >
        {children}
      </div>
    </div>
  )
}
