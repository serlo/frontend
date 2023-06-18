import { createContext, ComponentType } from 'react'

import * as InternalDocumentEditor from '../../types/internal__document-editor'

export const DocumentEditorContext = createContext<
  ComponentType<DocumentEditorProps>
>(undefined as unknown as ComponentType<DocumentEditorProps>)
export type DocumentEditorProps = InternalDocumentEditor.DocumentEditorProps
