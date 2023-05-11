import { createContext, ComponentType } from 'react'

import * as InternalDocumentEditor from '../../internal__document-editor'

/** @public */
export const DocumentEditorContext = createContext<
  ComponentType<DocumentEditorProps>
>(undefined as unknown as ComponentType<DocumentEditorProps>)
/** @public */
export type DocumentEditorProps = InternalDocumentEditor.DocumentEditorProps
