import * as React from 'react'

import * as InternalDocumentEditor from '../../internal__document-editor'

/** @public */
export const DocumentEditorContext = React.createContext<
  React.ComponentType<DocumentEditorProps>
>(undefined as unknown as React.ComponentType<DocumentEditorProps>)
/** @public */
export type DocumentEditorProps = InternalDocumentEditor.DocumentEditorProps
