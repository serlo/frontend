import { focus, useAppDispatch } from '@editor/store'
import { MutableRefObject, useEffect } from 'react'

import { useGetShadowRoot } from '../helpers/use-get-shadow-root'

/**
 * Hook that handler clicks (mousedown) outside of the editor
 */
export function useBlurOnOutsideClick(
  editorWrapperRef: MutableRefObject<HTMLDivElement | null>
) {
  const dispatch = useAppDispatch()
  const shadowRoot = useGetShadowRoot(editorWrapperRef)

  useEffect(() => {
    const root = shadowRoot || document.body

    function handleClickOutside(event: Event) {
      const mouseEvent = event as MouseEvent
      const clickedElement = mouseEvent.target as Element
      if (
        root.contains(clickedElement) && // clicked element is present in the document
        editorWrapperRef.current && // provided wrapper is defined
        !editorWrapperRef.current.contains(clickedElement) && // clicked element is not a child of the provided wrapper
        !clickedElement.closest('.ReactModalPortal') // clicked element is not a part of a modal
      ) {
        console.log('Outside click detected, blur editor', {
          shadowRoot,
          clickedElement,
          root,
          editorWrapperRef,
        })
        dispatch(focus(null)) // reset the focus state (blur the editor)
      }
    }

    const rootListener = shadowRoot || document
    // Bind the event listener
    rootListener.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      rootListener.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editorWrapperRef, dispatch, shadowRoot])
}
