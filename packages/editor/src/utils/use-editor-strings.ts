import { useContext } from 'react'

import { LoggedInDataContext } from '@/contexts/logged-in-data-context'

export function useEditorStrings() {
  const data = useContext(LoggedInDataContext)
  if (!data) {
    throw new Error('Attempt to use editorStrings outside of provider!')
  }
  return data.strings.editor
}
