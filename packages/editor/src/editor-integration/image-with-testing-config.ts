import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import type { LoadedFile, UploadValidator } from '@editor/plugin'
import { createImagePlugin } from '@editor/plugins/image'

interface MediaUploadQuery {
  __typename?: 'Query'
  media: {
    __typename?: 'MediaQuery'
    newUpload: {
      __typename?: 'MediaUpload'
      uploadUrl: string
      urlAfterUpload: string
    }
  }
}

enum MediaType {
  ImageGif = 'IMAGE_GIF',
  ImageJpeg = 'IMAGE_JPEG',
  ImagePng = 'IMAGE_PNG',
  ImageSvgXml = 'IMAGE_SVG_XML',
  ImageWebp = 'IMAGE_WEBP',
}

const maxFileSize = 2 * 1024 * 1024
const allowedExtensions = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp']
type SupportedMimeType =
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/webp'

const mimeTypesToMediaType: Record<SupportedMimeType, MediaType> = {
  'image/gif': MediaType.ImageGif,
  'image/jpeg': MediaType.ImageJpeg,
  'image/png': MediaType.ImagePng,
  'image/svg+xml': MediaType.ImageSvgXml,
  'image/webp': MediaType.ImageWebp,
}

enum FileErrorCode {
  TOO_MANY_FILES,
  NO_FILE_SELECTED,
  BAD_EXTENSION,
  FILE_TOO_BIG,
  UPLOAD_FAILED,
}

export interface FileError {
  errorCode: FileErrorCode
  message: string
}

const validateFile: UploadValidator<FileError[]> = (file) => {
  let uploadErrors: FileErrorCode[] = []

  if (!file) {
    uploadErrors = [...uploadErrors, FileErrorCode.NO_FILE_SELECTED]
  } else if (!matchesAllowedExtensions(file.name)) {
    uploadErrors = [...uploadErrors, FileErrorCode.BAD_EXTENSION]
  } else if (file.size > maxFileSize) {
    uploadErrors = [...uploadErrors, FileErrorCode.FILE_TOO_BIG]
  } else {
    return { valid: true }
  }

  return { valid: false, errors: handleErrors(uploadErrors) }
}

export const createTestingImagePlugin = (secret: string) => {
  return createImagePlugin({
    upload: createUploadImageHandler(secret),
    validate: validateFile,
  })
}

function createUploadImageHandler(secret: string) {
  const readFile = createReadFile(secret)
  return async function uploadImageHandler(file: File): Promise<string> {
    const validation = validateFile(file)
    if (!validation.valid) {
      showErrorToast(validation.errors)
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject(validation.errors)
    }

    try {
      const result = await readFile(file)
      return result.dataUrl
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Upload failed:', error)
      const errors = handleErrors([FileErrorCode.UPLOAD_FAILED])
      showErrorToast(errors)
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject(errors)
    }
  }
}

export function createReadFile(secret: string) {
  return async function readFile(file: File): Promise<LoadedFile> {
    if (!secret) {
      throw new Error('Missing secret for image plugin!')
    }

    const endpoint = 'https://api.serlo-staging.dev/graphql'
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-SERLO-EDITOR-TESTING': secret,
      },
      method: 'POST',
      body: JSON.stringify({
        query: uploadUrlQuery,
        variables: {
          mediaType: mimeTypesToMediaType[file.type as SupportedMimeType],
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get upload URL: ${response.status}`)
    }

    const { data } = (await response.json()) as { data: MediaUploadQuery }

    if (!data?.media?.newUpload) {
      // eslint-disable-next-line no-console
      console.error('Server responded with following invalid data: ', data)
      throw new Error('Invalid response format from server')
    }

    const uploadResponse = await fetch(data.media.newUpload.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    })

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status: ${uploadResponse.status}`)
    }

    if (!data?.media?.newUpload?.urlAfterUpload) {
      throw new Error('Invalid response format from server')
    }

    return {
      file,
      dataUrl: data.media.newUpload.urlAfterUpload,
    }
  }
}

function matchesAllowedExtensions(fileName: string) {
  const extension = fileName.toLowerCase().slice(fileName.lastIndexOf('.') + 1)
  return allowedExtensions.includes(extension)
}

function handleErrors(errors: FileErrorCode[]): FileError[] {
  return errors.map((error) => ({
    errorCode: error,
    message: errorCodeToMessage(error),
  }))
}

function showErrorToast(errors: FileError[]): void {
  showToastNotice(errors.map((error) => error.message).join('\n'), 'warning')
}

function errorCodeToMessage(error: FileErrorCode) {
  switch (error) {
    case FileErrorCode.TOO_MANY_FILES:
      return 'You can only upload one file'
    case FileErrorCode.NO_FILE_SELECTED:
      return 'No file selected'
    case FileErrorCode.BAD_EXTENSION:
      return 'Not an accepted file type'
    case FileErrorCode.FILE_TOO_BIG:
      return 'Filesize is too big'
    case FileErrorCode.UPLOAD_FAILED:
      return 'Error while uploading'
  }
}

/**
 * This marker is used by https://github.com/serlo/unused-graphql-properties
 * to detect graphql statements.
 */
function gql(strings: TemplateStringsArray, ...expr: string[]): string {
  return strings.reduce((result, str, i) => {
    return result + expr[i - 1] + str
  })
}

const uploadUrlQuery = gql`
  query mediaUpload($mediaType: MediaType!) {
    media {
      newUpload(mediaType: $mediaType) {
        uploadUrl
        urlAfterUpload
      }
    }
  }
`
