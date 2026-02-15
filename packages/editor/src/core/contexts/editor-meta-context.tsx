import type { EditorVariant } from '@editor/package/storage-format'
import { createContext } from 'react'

export type UploadHandler = (file: File) => Promise<string>

export interface FileUploadConfig {
  /**
   * Custom upload handler function. If provided, this will be used instead of the default presigned URL workflow.
   * The function should upload the file and return a Promise that resolves to the final URL of the uploaded file.
   */
  uploadHandler?: UploadHandler
  /**
   * Base URL for the presigned URL endpoint. Defaults to 'https://editor.serlo.org' or 'https://editor.serlo.dev'
   * depending on isProductionEnvironment. Only used if uploadHandler is not provided.
   */
  presignedUrlEndpoint?: string
  /**
   * Additional allowed domains for images. These domains will be whitelisted and images from them
   * won't be proxied through the asset-proxy.
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
