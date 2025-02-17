import { TemplatePluginType, type StorageFormat } from '@editor/package'

import type { AbstractSerializedState } from './convert-editor-response-to-state'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as AbstractSerializedState

  const editorDocument =
    editorState.document.plugin === TemplatePluginType.Taxonomy ||
    editorState.document.plugin === TemplatePluginType.Video
      ? editorDocumentState.description || ''
      : editorDocumentState.content || ''

  return {
    ...editorDocumentState,
    description: JSON.stringify({
      ...editorState,
      document: JSON.parse(editorDocument) as unknown,
    }),
  }
}
