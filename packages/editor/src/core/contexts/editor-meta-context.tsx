import type { EditorVariant } from '@editor/package/storage-format'
import { createContext } from 'react'

export interface FileUploadConfig {
  /**
   * Base URL for the presigned URL endpoint. Defaults to 'https://editor.serlo.org' or 'https://editor.serlo.dev'
   * depending on isProductionEnvironment.
   */
  presignedUrlEndpoint?: string
  /**
   * Additional allowed domains for images. These domains will be whitelisted and images from them
   * won't be proxied through the asset-proxy. Supports wildcards like '*.example.com'.
   */
  allowedImageDomains?: string[]
}

export interface EditorMeta {
  editorVariant: EditorVariant
  userId?: string
  ltik?: string
  disableMediaUpload?: boolean
  isProductionEnvironment?: boolean
  fileUploadConfig?: FileUploadConfig
}

export const EditorMetaContext = createContext<EditorMeta>({
  editorVariant: 'unknown',
})
