import { useRef, useEffect } from 'react'
import { ConnectDragPreview } from 'react-dnd'

/**
 * This hook is used to create an empty preview for the item that is being
 * dragged, so that the custom-drag-layer can do it's thing.
 *
 * Usage:
 * ```
 * const [, dragRef, preview] = useDrag(...)
 * useEmptyPreview(preview)
 * ```
 */
export function useEmptyPreview(preview: ConnectDragPreview) {
  const previewRef = useRef(null)

  useEffect(() => {
    if (previewRef.current) {
      preview(previewRef.current)
    }
  }, [preview])

  useEffect(() => {
    // Create an empty image for the drag preview
    const img = new Image()
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    img.onload = () => preview(img)
  }, [preview])
}
