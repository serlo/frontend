import { TemplatePluginType, type StorageFormat } from '@editor/package'

import type { AbstractSerializedState } from './convert-editor-response-to-state'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as AbstractSerializedState

  if (
    editorState.document.plugin === TemplatePluginType.Taxonomy ||
    editorState.document.plugin === TemplatePluginType.Video ||
    editorState.document.plugin === TemplatePluginType.User
  ) {
    return {
      ...editorDocumentState,
      description: JSON.stringify({
        ...editorState,
        document: JSON.parse(editorDocumentState.description || '') as unknown,
      }),
    }
  }

  return {
    ...editorDocumentState,
    content: JSON.stringify({
      ...editorState,
      document: JSON.parse(editorDocumentState.content || '') as unknown,
    }),
  }
}
