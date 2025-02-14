import type { StorageFormat } from '@editor/package'

import type { AbstractSerializedState } from './convert-editor-response-to-state'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as AbstractSerializedState

  const newContent = JSON.stringify({
    ...editorState,
    document: JSON.parse(editorDocumentState.content || '') as unknown,
  })

  return { ...editorDocumentState, content: newContent }
}
