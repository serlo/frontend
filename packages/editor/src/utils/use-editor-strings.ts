import { LoggedInDataContext } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useContext } from 'react'

export function useEditorStrings() {
  const data = useContext(LoggedInDataContext)
  if (!data) {
    throw new Error('Attempt to use editorStrings outside of provider!')
  }
  return data.strings.editor
}
