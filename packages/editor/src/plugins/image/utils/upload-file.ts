import { handleError, validateFile } from './validate-file'

// while testing
export function shouldUseNewUpload() {
  const nodeEnv = Object.hasOwn(process.env, 'NODE_ENV')
    ? process.env.NODE_ENV
    : undefined
  const nextPublicEnv = Object.hasOwn(process.env, 'NEXT_PUBLIC_ENV')
    ? process.env.NEXT_PUBLIC_ENV
    : undefined
  const isDevOrStaging =
    nodeEnv === 'development' ||
    nextPublicEnv === 'staging' ||
    nextPublicEnv === 'local'
  if (isDevOrStaging) {
    // eslint-disable-next-line no-console
    console.warn('using new upload method and temporary bucket')
  }
  return isDevOrStaging
}

export async function uploadFile(file: File) {
  const validated = validateFile(file)

  if (!validated) return Promise.reject()

  const data = await getSignedUrlAndSrc(file.type)
  if (!data) return Promise.reject('Could not get signed URL')

  const { signedUrl, imgSrc } = data

  const success = await uploadToBucket(file, signedUrl)
  if (!success) return Promise.reject('Could not upload file')
  return Promise.resolve(imgSrc)
}

async function getSignedUrlAndSrc(mimeType: string) {
  // TODO: depend on environment
  // TODO: add editorVariant
  const url = `https://editor.serlo.dev/media/presigned-url?mimeType=${encodeURIComponent(mimeType)}&editorVariant=${encodeURIComponent('unknown')}`

  const result = await fetch(url).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
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
