import {
  EditorMetaContext,
  type EditorMeta,
} from '@editor/core/contexts/editor-meta-context'
import { type UploadHandler } from '@editor/plugin'
import { useContext } from 'react'

import { handleError, validateFile } from './validate-file'

type UploadMeta = Pick<EditorMeta, 'editorVariant' | 'userId'>

export function useUploadFile(oldUploader: UploadHandler<string>) {
  const { editorVariant, userId } = useContext(EditorMetaContext)

  const uploader = (file: File) => uploadFile({ file, editorVariant, userId })
  return shouldUseNewUpload() ? uploader : oldUploader
}

// while testing
export function shouldUseNewUpload() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  const isDevOrPreviewOrStaging =
    (host.startsWith('frontend-git') && host.endsWith('vercel.app')) ||
    host.endsWith('serlo-staging.dev') ||
    host === 'localhost' ||
    process.env.NODE_ENV === 'development' ||
    host.endsWith('serlo.dev')

  if (isDevOrPreviewOrStaging) {
    // eslint-disable-next-line no-console
    console.warn('using new upload method and temporary bucket')
  }
  return isDevOrPreviewOrStaging
}

async function uploadFile({
  file,
  editorVariant,
  userId,
}: UploadMeta & {
  file: File
}) {
  const validated = validateFile(file)
  if (!validated) return Promise.reject()

  const data = await getSignedUrlAndSrc({
    mimeType: file.type,
    editorVariant,
    userId,
  })
  if (!data) return Promise.reject('Could not get signed URL')

  const { signedUrl, fileUrl } = data

  const success = await uploadToBucket(file, signedUrl)
  if (!success) return Promise.reject('Could not upload file')
  return Promise.resolve(fileUrl)
}

const signedUrlHost =
  process.env.NODE_ENV === 'development'
    ? 'editor.serlo.dev'
    : 'editor.serlo.dev' // TODO: Change to production bucket after testing

async function getSignedUrlAndSrc({
  mimeType,
  editorVariant,
  userId,
}: UploadMeta & {
  mimeType: string
}) {
  const params = `mimeType=${encodeURIComponent(mimeType)}&editorVariant=${encodeURIComponent(editorVariant)}&userId=${encodeURIComponent(userId ?? '')}`
  const url = `https://${signedUrlHost}/media/presigned-url?${params}`

  const result = await fetch(url).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    handleError(errorMessage)
  })

  const data = (await result?.json()) as { signedUrl: string; fileUrl: string }
  return data
}

const errorMessage = 'Error while uploading'

async function uploadToBucket(file: File, signedUrl: string) {
  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    handleError(errorMessage)
    return
  })

  if (!response || response.status !== 200) {
    handleError(errorMessage)
    return
  }
  return true
}
