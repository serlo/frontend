import { showToastNotice } from '@editor/editor-ui/show-toast-notice'

import {
  FileErrorCode,
  errorCodeToMessage,
  validateFile,
  type FileError,
} from './validate-file'

export async function uploadFile(file: File) {
  const validation = validateFile(file)

  if (!validation.valid) {
    if (validation.errors) onError(validation.errors)
    return Promise.reject(validation.errors)
  }

  const data = await getSignedUrlAndSrc(file.type)
  if (!data) return Promise.reject('Could not get signed URL')

  const { signedUrl, imgSrc } = data

  const success = await uploadToBucket(file, signedUrl)
  if (!success) return Promise.reject('Could not upload file')
  return Promise.resolve(imgSrc)
}

async function getSignedUrlAndSrc(mimeType: string) {
  // TODO: depend on editor variant / environment
  const url = `/api/media/presigned-url?mimeType=${encodeURIComponent(mimeType)}`

  const result = await fetch(url).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
  })

  const data = (await result?.json()) as { signedUrl: string; imgSrc: string }
  return data
}

const uploadError = {
  errorCode: FileErrorCode.UPLOAD_FAILED,
  message: errorCodeToMessage(FileErrorCode.UPLOAD_FAILED),
}

async function uploadToBucket(file: File, signedUrl: string) {
  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      // 'Content-Type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    onError([uploadError])
    return
  })

  if (!response || response.status !== 200) {
    onError([uploadError])
    return
  }
  return true
}

// TODO: simplify error handling, maybe don't store errors in state!
function onError(errors: FileError[]): void {
  showToastNotice(errors.map((error) => error.message).join('\n'), 'warning')
}
