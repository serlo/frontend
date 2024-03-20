import type { DocumentState } from '@editor/store'
import type { LanguageData } from '@editor/types/language-data'
import type { ReactNode } from 'react'

type StoreType = { ROOT: string } & Partial<typeof import('@editor/store')>

export interface EditorProps {
  children?: ReactNode | ((editor: EditorData) => ReactNode)
  initialState: {
    plugin: string
    state?: unknown
  }
  onChange?: OnEditorChange
}

export interface EditorData {
  element: ReactNode
  languageData: LanguageData
  storeData: StoreType
}

export type OnEditorChange = (payload: {
  changed: boolean
  getDocument: () => DocumentState | null
}) => void
