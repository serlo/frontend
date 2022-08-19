import { LoadedFile, UploadValidator } from '@edtr-io/plugin'
import { createImagePlugin as createCoreImagePlugin } from '@edtr-io/plugin-image'
import { gql } from 'graphql-request'
import fetch from 'unfetch'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { useAuthentication } from '@/auth/auth-provider'
import { MediaType, MediaUploadQuery } from '@/fetcher/graphql-types/operations'

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

export const validateFile: UploadValidator<FileError[]> = (file) => {
  let uploadErrors: FileErrorCode[] = []

  if (!file) {
    uploadErrors = [...uploadErrors, FileErrorCode.NO_FILE_SELECTED]
  } else if (!matchesAllowedExtensions(file.name)) {
    uploadErrors = [...uploadErrors, FileErrorCode.BAD_EXTENSION]
  } else if (file.size > maxFileSize) {
    uploadErrors = [...uploadErrors, FileErrorCode.FILE_TOO_BIG]
  } else {
    return {
      valid: true,
    }
  }

  return {
    valid: false,
    errors: handleErrors(uploadErrors),
  }
}

export function createUploadImageHandler() {
  const readFile = createReadFile()
  return function uploadImageHandler(file: File): Promise<string> {
    const validation = validateFile(file)
    if (!validation.valid) {
      onError(validation.errors)
      return Promise.reject(validation.errors)
    }

    return readFile(file).then((loaded) => {
      return loaded.dataUrl
    })
  }
}

export function createReadFile() {
  return function readFile(file: File): Promise<LoadedFile> {
    return new Promise((resolve, reject) => {
      const authenticationPayload = useAuthentication()[0]
      if (!authenticationPayload?.current?.token) return

      const gqlFetch = createAuthAwareGraphqlFetch(authenticationPayload)
      const args = JSON.stringify({
        query: uploadUrlQuery,
        variables: {
          mediaType: mimeTypesToMediaType[file.type as SupportedMimeType],
        },
      })
      void gqlFetch(args).then((data: MediaUploadQuery) => {
        const reader = new FileReader()

        reader.onload = function (e: ProgressEvent) {
          if (!e.target) return
          fetch(data.media.newUpload.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file,
          })
            .then((response) => {
              if (response.status !== 200) reject()
              resolve({
                file,
                dataUrl: data.media.newUpload.urlAfterUpload,
              })
            })
            .catch(() => {
              reject()
            })
        }

        reader.readAsDataURL(file)
      })
    })
  }
}

export function createImagePlugin() {
  return createCoreImagePlugin({
    upload: createUploadImageHandler(),
    validate: validateFile,
    secondInput: 'description',
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
