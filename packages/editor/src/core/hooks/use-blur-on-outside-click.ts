import { focus, useAppDispatch } from '@editor/store'
import { MutableRefObject, useEffect } from 'react'

import { useShadowRoot } from '../helpers/use-shadow-root'

/**
 * Hook that handler clicks (mousedown) outside of the editor
 */
export function useBlurOnOutsideClick(
  editorWrapperRef: MutableRefObject<HTMLDivElement | null>
) {
  const dispatch = useAppDispatch()
  const shadowRoot = useShadowRoot(editorWrapperRef)

  useEffect(() => {
    const root = shadowRoot || document.body

    function handleClickOutside(event: Event) {
      const mouseEvent = event as MouseEvent
      const clickedElement = mouseEvent.target as Element

      const isModalOpen =
        root.querySelector('[data-modal-state="open"]') !== null

      // We let the modal close by itself and don't steal the focus here as
      // it'll restore the focus to the previous focused element!
      if (isModalOpen) {
        return
      }

      if (
        root.contains(clickedElement) && // clicked element is present in the document
        editorWrapperRef.current && // provided wrapper is defined
        !editorWrapperRef.current.contains(clickedElement) && // clicked element is not a child of the provided wrapper
        !clickedElement.closest('.serlo-modal') // clicked element is not a part of a modal
      ) {
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
