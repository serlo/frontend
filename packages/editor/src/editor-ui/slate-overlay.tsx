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

    const anchorRect = getAnchorRect(editor, anchor, wrapper.current)
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
      (overlap > 0 ? fallbackBoundingLeft : boundingLeft) - offsetRect.left - 5
    wrapper.current.style.left = `${leftOffset}px`
    wrapper.current.style.top = `${anchorRect.bottom + 20 - offsetRect.top}px`

    // Adjust the top position based on whether it's a new plugin or not
    // const isNewPlugin = anchorRect.top < offsetRect.top
    // const topOffset = isNewPlugin
    //   ? parentRect.top - offsetRect.top
    //   : anchorRect.bottom - offsetRect.top + 6

    // wrapper.current.style.top = `${topOffset}px`

    console.log('Slate overlay style: ', {
      wrapperStyle: {
        top: wrapper.current?.style.top,
        left: wrapper.current?.style.left,
        bottom: wrapper.current?.style.bottom,
        right: wrapper.current?.style.right,
      },
      boundingLeft,
      boundingWrapperRight,
      overlap,
      leftOffset,
      offsetRect,
      parentRect,
      anchorRect,
    })
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

// If provided an anchor element, returns its size and position (DOMRect). Also
// checks the Shadow DOM, otherwise retrieves the native DOM selection, and
// yields a DOMRect based on it.
function getAnchorRect(
  editor: ReactEditor,
  anchor: CustomElement | undefined,
  wrapper: HTMLDivElement
): DOMRect | null {
  console.log('getAnchorRect', {
    editor,
    anchor,
    wrapper,
    shadowRect: getRectWithinShadowDom(wrapper),
    nativeDomSelection:
      Number(window?.getSelection()?.rangeCount) > 0
        ? window?.getSelection()?.getRangeAt(0).getBoundingClientRect()
        : undefined,
  })
  if (anchor) {
    return (
      ReactEditor.toDOMNode(editor, anchor)?.getBoundingClientRect() ?? null
    )
  }

  const shadowRect = getRectWithinShadowDom(wrapper)
  if (shadowRect) return shadowRect

  const nativeDomSelection = window.getSelection()
  if (nativeDomSelection && nativeDomSelection.rangeCount > 0) {
    return nativeDomSelection.getRangeAt(0).getBoundingClientRect()
  }

  return null
}

function getRectWithinShadowDom(wrapper: HTMLDivElement): DOMRect | null {
  const rootNode = wrapper.getRootNode() as ShadowRoot | Document

  if (!(rootNode instanceof ShadowRoot)) return null

  const activeElement = rootNode.activeElement as HTMLElement
  if (activeElement) {
    const rect = activeElement.getBoundingClientRect()
    console.log('Shadow Rect active Element: ', rect)
    return new DOMRect(
      rect.left,
      // Add 14 px to the top to make the menu align with where the cursor is
      // placed
      rect.top,
      rect.width,
      rect.height
    )
  } else {
    const shadowHostRect = rootNode.host.getBoundingClientRect()
    console.log('Shadow Rect shadowHostRect: ', shadowHostRect)
    return new DOMRect(
      shadowHostRect.left,
      // Add 14 px to the top to make the menu align with where the cursor is
      // placed
      shadowHostRect.top,
      shadowHostRect.width,
      shadowHostRect.height
    )
  }
}
