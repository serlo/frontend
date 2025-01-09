import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { useContext } from 'react'

export function useIsSerlo(): boolean {
  const isSerlo = useContext(EditorMetaContext).editorVariant === 'serlo-org'
  return isSerlo ?? false
}
