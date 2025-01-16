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
    // When the "+" button is clicked, the "/" is inserted and the editor is
    // focused. We need to wait for the editor to have an updated focused to
    // select the correct anchor
    const timeout = setTimeout(() => {
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

      const leftOffset =
        (overlap > 0 ? fallbackBoundingLeft : boundingLeft) -
        offsetRect.left -
        5
      wrapper.current.style.left = `${leftOffset}px`
      wrapper.current.style.top = `${anchorRect.bottom + 20 - offsetRect.top}px`
    }, 1)

    return () => clearTimeout(timeout)
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

// If provided an anchor element, returns its size and position (DOMRect). Otherwise
// retrieves the native DOM selection, and yields a DOMRect based on it.
function getAnchorRect(
  editor: ReactEditor,
  anchor: CustomElement | undefined
): DOMRect | null {
  if (anchor) {
    return (
      ReactEditor.toDOMNode(editor, anchor)?.getBoundingClientRect() ?? null
    )
  }

  const nativeDomSelection = window.getSelection()
  if (nativeDomSelection && nativeDomSelection.rangeCount > 0) {
    return nativeDomSelection.getRangeAt(0).getBoundingClientRect()
  }

  return null
}
