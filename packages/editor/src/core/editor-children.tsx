import { useCallback } from 'react'

import { SubDocument } from './sub-document'
import type { EditorChildren } from './types'
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
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function EditorChildren({ children }: { children: EditorChildren }) {
  const instanceData = useInstanceData()
  const loggedInData = useLoggedInData()

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

  if (typeof children === 'function' && loggedInData) {
    return children({
      element: editor,
      languageData: {
        instanceData,
        loggedInData,
      },
      storeData: {
        hasUndoActions,
        hasRedoActions,
        dispatchUndo,
        dispatchRedo,
        pendingChanges,
        dispatchPersistHistory,
        selectRootDocument,
      },
    })
  }

  return (
    <>
      {editor}
      {children}
    </>
  )
}
