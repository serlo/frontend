import { MutableRefObject, useEffect } from 'react'

import { focus, useAppDispatch } from '@/serlo-editor/store'

/**
 * Hook that handler clicks (mousedown) outside of the editor
 */
export function useBlurOnOutsideClick(
  editorWrapperRef: MutableRefObject<HTMLDivElement | null>
) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedElement = event.target as Element
      if (
        document.body.contains(clickedElement) && // clicked element is present in the document
        editorWrapperRef.current && // provided wrapper is defined
        !editorWrapperRef.current.contains(clickedElement) && // clicked element is not a child of the provided wrapper
        !clickedElement.closest('.ReactModalPortal') // clicked element is not a part of a modal
      ) {
        dispatch(focus(null)) // reset the focus state (blur the editor)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editorWrapperRef, dispatch])
}
