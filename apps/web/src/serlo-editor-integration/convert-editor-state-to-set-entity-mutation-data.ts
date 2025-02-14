import type { StorageFormat } from '@editor/package'

import type {
  SetEntityMutationData,
  SupportedTypesSerializedState,
} from '@/mutations/use-set-entity-mutation/types'

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as SupportedTypesSerializedState

  const newContent = JSON.stringify({
    ...editorState,
    document: JSON.parse(editorDocumentState.content || '') as unknown,
  })

  return { ...editorDocumentState, content: newContent }
}
