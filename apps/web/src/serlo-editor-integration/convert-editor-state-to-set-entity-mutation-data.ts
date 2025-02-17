import { TemplatePluginType, type StorageFormat } from '@editor/package'

import type {
  SetEntityMutationData,
  SupportedTypesSerializedState,
} from '@/mutations/use-set-entity-mutation/types'

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as SupportedTypesSerializedState

  if (editorState.document.plugin === TemplatePluginType.Taxonomy) {
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
