import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { useCallback } from 'react'

import { SubDocument } from './sub-document'
import type { EditorRenderProps } from './types'
import {
  store,
  useAppDispatch,
  useAppSelector,
  persistHistory,
  undo,
  redo,
  selectPendingChanges,
  selectHasUndoActions,
  selectHasRedoActions,
  selectDocuments,
  selectStaticDocument,
} from '../store'
import { ROOT } from '../store/root/constants'

export function EditorChildren({ children }: { children: EditorRenderProps }) {
  const editStrings = useEditStrings()
  const staticStrings = useStaticStrings()

  const dispatch = useAppDispatch()

  const hasUndoActions = useAppSelector(selectHasUndoActions)
  const hasRedoActions = useAppSelector(selectHasRedoActions)

  const dispatchUndo = useCallback(() => {
    void dispatch(undo())
  }, [dispatch])
  const dispatchRedo = useCallback(() => {
    void dispatch(redo())
  }, [dispatch])

  const pendingChanges = useAppSelector(selectPendingChanges)
  const dispatchPersistHistory = useCallback(() => {
    const documents = selectDocuments(store.getState())
    void dispatch(persistHistory(documents))
  }, [dispatch])

  const selectRootDocument = useCallback(() => {
    return selectStaticDocument(store.getState(), ROOT)
  }, [])

  const editor = <SubDocument id={ROOT} />

  if (typeof children !== 'function') {
    return (
      <>
        {editor}
        {children}
      </>
    )
  }

  return children({
    element: editor,
    i18n: {
      staticStrings,
      editStrings,
    },
    history: {
      hasUndoActions,
      hasRedoActions,
      pendingChanges,
      dispatchUndo,
      dispatchRedo,
      dispatchPersistHistory,
    },
    selectRootDocument,
  })
}
