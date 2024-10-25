import { EditorVariantContext } from '@editor/core/contexts/editor-variant-context'
import { type EditorVariant } from '@editor/package/storage-format'
import { type UploadHandler } from '@editor/plugin'
import { useContext } from 'react'

import { handleError, validateFile } from './validate-file'

export function useUploadFile(oldFileUploader: UploadHandler<string>) {
  const editorVariant = useContext(EditorVariantContext)
  return shouldUseNewUpload()
    ? (file: File) => uploadFile(file, editorVariant)
    : oldFileUploader
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

export async function uploadFile(file: File, editorVariant: EditorVariant) {
  const validated = validateFile(file)
  if (!validated) return Promise.reject()

  const data = await getSignedUrlAndSrc(file.type, editorVariant)
  if (!data) return Promise.reject('Could not get signed URL')

  const { signedUrl, imgSrc } = data

  const success = await uploadToBucket(file, signedUrl)
  if (!success) return Promise.reject('Could not upload file')
  return Promise.resolve(imgSrc)
}

const signedUrlHost =
  process.env.NODE_ENV === 'development'
    ? 'editor.serlo.dev'
    : 'editor.serlo.dev' // TODO: Change to production bucket after testing

async function getSignedUrlAndSrc(
  mimeType: string,
  editorVariant: EditorVariant
) {
  const url = `https://${signedUrlHost}/media/presigned-url?mimeType=${encodeURIComponent(mimeType)}&editorVariant=${encodeURIComponent(editorVariant)}`

  const result = await fetch(url).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    handleError(errorMessage)
  })

  const data = (await result?.json()) as { signedUrl: string; imgSrc: string }
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
