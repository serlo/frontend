import { createContext, useContext } from 'react'

import type { LoggedInData } from '@/data-types'

const LoggedInDataContext = createContext<LoggedInData | null>(null)

export const LoggedInDataProvider = LoggedInDataContext.Provider

export function useLoggedInData() {
  const data = useContext(LoggedInDataContext)
  return data
}

export function useEditorStrings() {
  const data = useContext(LoggedInDataContext)
  if (!data) {
    throw new Error('Attempt to use editorStrings outside of provider/editor!')
  }
  return data.strings.editor
}

export type EditorStrings = LoggedInData['strings']['editor']
