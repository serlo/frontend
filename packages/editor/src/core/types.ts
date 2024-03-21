import type { DocumentState } from '@editor/store'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import type { LanguageData } from '@editor/types/language-data'
import type { ReactNode } from 'react'

interface StoreData {
  hasUndoActions: boolean
  hasRedoActions: boolean
  dispatchUndo: () => void
  dispatchRedo: () => void
  pendingChanges: number
  dispatchPersistHistory: () => void
  selectRootDocument: () => AnyEditorDocument
}

export interface EditorProps {
  children?: EditorChildren
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: OnEditorChange
}

export type EditorChildren = ReactNode | ((editor: EditorData) => ReactNode)

export interface EditorData {
  element: ReactNode
  languageData: LanguageData
  storeData: StoreData
}

export type OnEditorChange = (payload: {
  changed: boolean
  getDocument: () => DocumentState | null
}) => void
