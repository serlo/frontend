import type { CustomElement } from '@editor/plugins/text'
import { ReactNode, useEffect, useRef } from 'react'
import { ReactEditor, useSlate } from 'slate-react'

interface SlateOverlayProps {
  width: number
  anchor?: CustomElement
  children: ReactNode
}

export function SlateOverlay(props: SlateOverlayProps) {
  const { width, anchor, children } = props
  const editor = useSlate()
  const wrapper = useRef<HTMLDivElement>(null)

  // Positioning of the overlay relative to the anchor
  useEffect(() => {
    if (!wrapper.current) return

    const anchorRect = getAnchorRect(editor, anchor)

    const parentRect = wrapper.current
      .closest('.rows-editor-renderer-container')
      ?.getBoundingClientRect()

    const offsetRect = wrapper.current.offsetParent?.getBoundingClientRect()

    if (!anchorRect || !parentRect || !offsetRect) return

    const boundingLeft = anchorRect.left - 2 // wrapper starts at anchor's left

    const boundingWrapperRight = boundingLeft + width
    const overlap = boundingWrapperRight - parentRect.right
    const fallbackBoundingLeft = boundingLeft - overlap // wrapper ends at editor's right

    wrapper.current.style.left = `${
      (overlap > 0 ? fallbackBoundingLeft : boundingLeft) - offsetRect.left - 5
    }px`
    wrapper.current.style.top = `${anchorRect.bottom + 6 - offsetRect.top}px`
  }, [editor, anchor, width])

  return (
    <div ref={wrapper} className="absolute z-[95]">
      <div
        className="rounded bg-white text-start not-italic shadow-menu"
        style={{ width: `${width}px` }}
      >
        {children}
      </div>
    </div>
  )
}

// If provided an anchor element, returns its size and position (DOMRect).
// Otherwise, checks for native DOM selection, and provides a DOMRect based on it.
function getAnchorRect(editor: ReactEditor, anchor: CustomElement | undefined) {
  if (anchor) {
    return ReactEditor.toDOMNode(editor, anchor)?.getBoundingClientRect()
  }

  const nativeDomSelection = window.getSelection()
  if (nativeDomSelection && nativeDomSelection.rangeCount > 0) {
    return nativeDomSelection.getRangeAt(0).getBoundingClientRect()
  }
}
