import type { EditorVariant } from '@editor/package/storage-format'
import { createContext } from 'react'

export interface EditorMeta {
  editorVariant: EditorVariant
  userId?: string
  ltik?: string
  disableMediaUpload?: boolean
  isProductionEnvironment?: boolean
  /**
   * Base URL for the presigned URL endpoint. Defaults to 'https://editor.serlo.org' or 'https://editor.serlo.dev'
   * depending on isProductionEnvironment.
   */
  presignedUrlEndpoint?: string
}

export const EditorMetaContext = createContext<EditorMeta>({
  editorVariant: 'unknown',
})
