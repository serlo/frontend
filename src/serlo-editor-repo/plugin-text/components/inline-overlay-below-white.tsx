import { useEffect, useRef } from 'react'
import { useSlate } from 'slate-react'

export function InlineOverlayBelowWhite({
  children,
  shouldUpdate,
}: {
  children: React.ReactNode
  shouldUpdate: unknown
}) {
  const editor = useSlate()
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapper.current) return
    const { selection } = editor

    if (!selection) return

    const domSelection = window.getSelection()
    if (!domSelection || domSelection.rangeCount === 0) return

    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    if (!rect || rect.height === 0) return

    if (!wrapper.current.offsetParent) return
    const parentRect = wrapper.current.offsetParent.getBoundingClientRect()

    wrapper.current.style.opacity = '1'
    wrapper.current.style.top = `${rect.bottom + 6 - parentRect.top}px`
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
  }, [editor, shouldUpdate])

  return (
    <div
      ref={wrapper}
      className="absolute opacity-0 transition-opacity z-[95] whitespace-nowrap"
    >
      <div className="bg-white shadow-menu rounded max-w-xl">{children}</div>
    </div>
  )
}
