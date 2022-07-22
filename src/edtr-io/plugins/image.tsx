import { LoadedFile, UploadValidator } from '@edtr-io/plugin'
import { createImagePlugin as createCoreImagePlugin } from '@edtr-io/plugin-image'
import { gql } from 'graphql-request'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { Token } from 'simple-oauth2'
import fetch from 'unfetch'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { AuthenticationPayload } from '@/auth/auth-provider'
import { MediaType, MediaUploadQuery } from '@/fetcher/graphql-types/operations'

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ALLOWED_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png', 'svg']

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
  return ALLOWED_EXTENSIONS.indexOf(extension) >= 0
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
  } else if (file.size > MAX_FILE_SIZE) {
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
      const authenticationPayload = parseAuthCookie()

      if (!authenticationPayload?.token) return

      const gqlFetch = createAuthAwareGraphqlFetch({
        current: authenticationPayload,
      })
      const args = JSON.stringify({
        query: uploadUrlQuery,
        variables: { mediaType: MediaType.ImagePng },
      })
      void gqlFetch(args).then((data: MediaUploadQuery) => {
        const reader = new FileReader()

        reader.onload = function (e: ProgressEvent) {
          if (!e.target) return
          const formData = new FormData()
          formData.append('attachment[file]', file)
          formData.append('type', 'file')

          fetch(data.media.upload.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'image/jpeg' },
            body: formData,
          })
            .then((response) => response.json())
            .then(
              (data: { success: boolean; files: { location: string }[] }) => {
                if (!data['success']) reject()
                resolve({
                  file,
                  dataUrl: data.files[0].location,
                })
              }
            )
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
      upload(mediaType: $mediaType) {
        uploadUrl
        urlAfterUpload
      }
    }
  }
`

// TODO: Duplicated because of hooks
function parseAuthCookie(): AuthenticationPayload {
  try {
    const cookies = typeof window === 'undefined' ? {} : Cookies.get()

    const { access_token, id_token } = JSON.parse(
      cookies['auth-token']
    ) as Token

    const decoded = jwt_decode<{
      username: string
      id: number
    }>(id_token as string)

    return {
      username: decoded.username,
      id: decoded.id,
      token: access_token as string,
      refreshToken: () => Promise.resolve(),
      clearToken: () => {
        return
      },
    }
  } catch {
    return null
  }
}
