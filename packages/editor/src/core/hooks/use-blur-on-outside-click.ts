import { focus, useAppDispatch } from '@editor/store'
import { MutableRefObject, useEffect } from 'react'

/**
 * Hook that handler clicks (mousedown) outside of the editor
 */
export function useBlurOnOutsideClick(
  editorWrapperRef: MutableRefObject<HTMLDivElement | null>
) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const root = editorWrapperRef.current?.shadowRoot || document.body

    function handleClickOutside(event: Event) {
      const mouseEvent = event as MouseEvent
      const clickedElement = mouseEvent.target as Element
      if (
        root.contains(clickedElement) && // clicked element is present in the document
        editorWrapperRef.current && // provided wrapper is defined
        !editorWrapperRef.current.contains(clickedElement) && // clicked element is not a child of the provided wrapper
        !clickedElement.closest('.ReactModalPortal') // clicked element is not a part of a modal
      ) {
        dispatch(focus(null)) // reset the focus state (blur the editor)
      }
    }

    const rootListener = editorWrapperRef.current?.shadowRoot || document
    // Bind the event listener
    rootListener.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      rootListener.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editorWrapperRef, dispatch])
}
