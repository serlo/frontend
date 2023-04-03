import * as InternalDocumentEditor from '../../internal__document-editor'
import * as React from 'react'

/** @public */
export const DocumentEditorContext = React.createContext<
  React.ComponentType<DocumentEditorProps>
>(undefined as unknown as React.ComponentType<DocumentEditorProps>)
/** @public */
export type DocumentEditorProps = InternalDocumentEditor.DocumentEditorProps
