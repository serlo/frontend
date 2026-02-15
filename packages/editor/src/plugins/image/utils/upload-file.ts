import {
  EditorMetaContext,
  type EditorMeta,
} from '@editor/core/contexts/editor-meta-context'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditStrings } from '@editor/types/language-data'
import { useContext } from 'react'

import { handleError, handleValidationError } from './handle-errors'
import { validateFile } from './validate-file'

type UploadMeta = Pick<
  EditorMeta,
  'editorVariant' | 'userId' | 'presignedUrlEndpoint'
>

export function useUploadFile() {
  const {
    editorVariant,
    userId,
    isProductionEnvironment,
    presignedUrlEndpoint,
  } = useContext(EditorMetaContext)
  const uploadStrings = useEditStrings().edtrIo.fileUpload
  const uploader = (file: File) =>
    uploadFile({
      file,
      editorVariant,
      userId,
      isProductionEnvironment,
      uploadStrings,
      presignedUrlEndpoint,
    })
  return uploader
}

async function uploadFile({
  isProductionEnvironment,
  file,
  editorVariant,
  userId,
  uploadStrings,
  presignedUrlEndpoint,
}: UploadMeta & {
  file: File
  uploadStrings: EditStrings['edtrIo']['fileUpload']
  isProductionEnvironment?: boolean
}) {
  const validated = validateFile(file)
  if (validated !== true) {
    handleValidationError(validated, uploadStrings)
    return Promise.reject()
  }

  const parentHost = getParentHost()

  // Use custom presigned URL endpoint if provided, otherwise use default
  let signedUrlHost: string
  try {
    signedUrlHost = presignedUrlEndpoint
      ? new URL(presignedUrlEndpoint).host
      : isProductionEnvironment
        ? 'editor.serlo.org'
        : 'editor.serlo.dev'
  } catch {
    const errorMsg = `Invalid presigned URL endpoint: ${presignedUrlEndpoint}`
    handleError(errorMsg)
    return Promise.reject(new Error(errorMsg))
  }

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
    handleError(uploadStrings.errorFetchingSignedUrl)
  })

  if (result && !result.ok) {
    const error = new Error(uploadStrings.errorFetchingSignedUrl)
    handleError(error.message)
    return Promise.reject(error)
  }

  const data = (await result?.json().catch(() => null)) as {
    signedUrl: string
    fileUrl: string
  } | null
  if (!data) {
    const error = new Error(uploadStrings.errorFetchingSignedUrl)
    handleError(error.message)

    return Promise.reject(error)
  }

  const { signedUrl, fileUrl } = data

  const success = await uploadToBucket({ file, signedUrl, uploadStrings })
  if (!success) {
    const error = new Error('Failed to upload file')
    handleError(error.message)
    return Promise.reject(error)
  }
  return Promise.resolve(fileUrl)
}

async function uploadToBucket({
  file,
  signedUrl,
  uploadStrings,
}: {
  file: File
  signedUrl: string
  uploadStrings: EditStrings['edtrIo']['fileUpload']
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
    handleError(uploadStrings.errorUploading)
    return
  })

  if (!response || response.status !== 200) {
    handleError(uploadStrings.errorUploading)
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
