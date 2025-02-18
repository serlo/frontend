import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { useCallback } from 'react'

import { SubDocument } from './sub-document'
import type { EditorRenderProps } from './types'
import {
  useAppDispatch,
  useAppSelector,
  persistHistory,
  undo,
  redo,
  runReplaceDocumentSaga,
  selectPendingChanges,
  selectHasUndoActions,
  selectHasRedoActions,
  useStore,
} from '../store'
import { ROOT } from '../store/root/constants'

export function EditorChildren({ children }: { children: EditorRenderProps }) {
  const store = useStore()
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
    const documents = store.getState().documents
    void dispatch(persistHistory(documents))
  }, [dispatch, store])

  const dispatchReplaceRootDocument = useCallback(
    (pluginType: string, state: unknown) => {
      dispatch(runReplaceDocumentSaga({ id: ROOT, pluginType, state }))
    },
    [dispatch]
  )

  const editor = <SubDocument id={ROOT} />

  if (typeof children !== 'function') {
    return (
      <>
        {children}
        {editor}
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
    dispatchReplaceRootDocument,
  })
}
