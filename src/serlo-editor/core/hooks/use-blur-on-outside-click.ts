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
    //
    function handleClickOutside(event: MouseEvent) {
      if (
        editorWrapperRef.current &&
        !editorWrapperRef.current.contains(event.target as Node)
      ) {
        dispatch(focus(null))
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
