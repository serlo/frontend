import { type StorageFormat } from '@editor/package'

import type { SerializedAbstractTemplatePluginDocument } from './convert-editor-response-to-state'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as SerializedAbstractTemplatePluginDocument

  return {
    ...editorDocumentState,
    content: JSON.stringify({
      ...editorState,
      document: editorDocumentState.content,
    }),
  }
}
