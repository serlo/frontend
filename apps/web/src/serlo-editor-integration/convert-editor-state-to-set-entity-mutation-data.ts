import { TemplatePluginType, type StorageFormat } from '@editor/package'

import type { AbstractSerializedState } from './convert-editor-response-to-state'
import type { SetEntityMutationData } from '@/mutations/use-set-entity-mutation/types'

const typesWithDescription = [TemplatePluginType.User]

export function convertEditorStateToSetEntityMutationData(
  editorState: StorageFormat
): SetEntityMutationData {
  const editorDocumentState = editorState.document
    .state as AbstractSerializedState

  const document = typesWithDescription.includes(
    editorState.document.plugin as TemplatePluginType
  )
    ? editorDocumentState.description
    : editorDocumentState.content

  const content = JSON.stringify({ ...editorState, document })

  return { ...editorDocumentState, content }
}
