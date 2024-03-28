import type { DocumentState } from '@editor/store'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import type { LanguageData } from '@editor/types/language-data'
import type { ReactNode } from 'react'

interface HistoryData {
  hasUndoActions: boolean
  hasRedoActions: boolean
  pendingChanges: number
  dispatchUndo: () => void
  dispatchRedo: () => void
  dispatchPersistHistory: () => void
}

export interface EditorProps {
  children?: EditorRenderProps
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: OnEditorChange
}

export type EditorRenderProps = ReactNode | ((editor: BaseEditor) => ReactNode)

export interface BaseEditor {
  element: ReactNode
  i18n: LanguageData
  history: HistoryData
  selectRootDocument: () => AnyEditorDocument
}

export type OnEditorChange = (payload: {
  changed: boolean
  getDocument: () => DocumentState | null
}) => void
