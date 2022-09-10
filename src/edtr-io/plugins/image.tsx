import { LoadedFile, UploadValidator } from '@edtr-io/plugin'
import { createImagePlugin as createCoreImagePlugin } from '@edtr-io/plugin-image'
import { gql } from 'graphql-request'
import fetch from 'unfetch'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { MediaType, MediaUploadQuery } from '@/fetcher/graphql-types/operations'
import { AuthSessionCookie } from '@/auth/auth-session-cookie'

const maxFileSize = 2 * 1024 * 1024
const allowedExtensions = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp']
const supportedMimeTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
] as const

type SupportedMimeType = typeof supportedMimeTypes[number]

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

export function createImagePlugin() {
  return createCoreImagePlugin({
    upload: createUploadImageHandler(),
    validate: validateFile,
    secondInput: 'description',
  })
}

export function createUploadImageHandler() {
  const readFile = createReadFile()
  return async function uploadImageHandler(file: File): Promise<string> {
    const validation = validateFile(file)
    if (!validation.valid) {
      onError(validation.errors)
      return Promise.reject(validation.errors)
    }

    return (await readFile(file)).dataUrl
  }
}

export function createReadFile() {
  return async function readFile(file: File): Promise<LoadedFile> {
    return new Promise((resolve, reject) => {
      // hard to get to the default auth logic outside of react components
      // we need to rely on the session cookie, with risk that the user changed
      // their username
      const session = AuthSessionCookie.parse()

      const gqlFetch = createAuthAwareGraphqlFetch({
        current: session
          ? {
              username: (session.identity.traits as { username: string })
                ?.username,
              id: (session.identity.metadata_public as { legacy_id: number })
                ?.legacy_id,
            }
          : null,
      })
      const args = JSON.stringify({
        query: uploadUrlQuery,
        variables: {
          mediaType: mimeTypesToMediaType[file.type as SupportedMimeType],
        },
      })

      async function runFetch() {
        const data = (await gqlFetch(args)) as MediaUploadQuery
        const reader = new FileReader()

        reader.onload = async function (e: ProgressEvent) {
          if (!e.target) return

          try {
            const response = await fetch(data.media.newUpload.uploadUrl, {
              method: 'PUT',
              headers: { 'Content-Type': file.type },
              body: file,
            })

            if (response.status !== 200) reject()
            resolve({
              file,
              dataUrl: data.media.newUpload.urlAfterUpload,
            })
          } catch {
            reject()
          }
        }

        reader.readAsDataURL(file)
      }

      void runFetch()
    })
  }
}

export const validateFile: UploadValidator<FileError[]> = (file) => {
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

function onError(errors: FileError[]): void {
  alert(errors.map((error) => error.message).join('\n'))
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
