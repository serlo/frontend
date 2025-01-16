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
    console.log('using new upload method and temporary bucket')
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

  const parentHost = getParentHost()

  // url for signedUrl fetch
  const url = new URL(`https://${signedUrlHost}/media/presigned-url`)
  url.searchParams.append('mimeType', file.type)
  url.searchParams.append('editorVariant', editorVariant)
  url.searchParams.append('parentHost', parentHost)
  if (userId) url.searchParams.append('userId', userId)

  // fetch signedUrl endpoint
  const result = await fetch(url).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    handleError(errorMessage)
  })

  if (result && !result.ok) {
    const error = new Error('Failed to get signed URL')
    handleError(error.message)
    return Promise.reject(error)
  }

  const data = (await result?.json().catch(() => null)) as {
    signedUrl: string
    fileUrl: string
  } | null
  if (!data) {
    const error = new Error('Failed to get signed URL')
    handleError(error.message)

    return Promise.reject(error)
  }

  const { signedUrl, fileUrl } = data

  const success = await uploadToBucket({ file, signedUrl })
  if (!success) {
    const error = new Error('Failed to upload file')
    handleError(error.message)
    return Promise.reject(error)
  }
  return Promise.resolve(fileUrl)
}

const signedUrlHost =
  process.env.NODE_ENV === 'development'
    ? 'editor.serlo.dev'
    : 'editor.serlo.dev' // TODO: Change to production bucket after testing

const errorMessage = 'Error while uploading'

async function uploadToBucket({
  file,
  signedUrl,
}: {
  file: File
  signedUrl: string
}) {
  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': file.type,
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

function getParentHost() {
  // this should work for iframes as well
  const url =
    window.location.ancestorOrigins?.[0] ||
    (window !== window.parent && document.referrer) ||
    window.location.href
  return new URL(url).host
}
