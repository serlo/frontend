import { LoadedFile } from '@editor/plugin'
import { createImagePlugin } from '@editor/plugins/image'
import {
  type FileError,
  validateFile,
} from '@editor/plugins/image/utils/validate-file'
import { gql } from 'graphql-request'

import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { getAuthPayloadFromSession } from '@/auth/auth-provider'
import { fetchAndPersistAuthSession } from '@/auth/cookie/fetch-and-persist-auth-session'
import { MediaType, MediaUploadQuery } from '@/fetcher/graphql-types/operations'
import { showToastNotice } from '@/helper/show-toast-notice'

const supportedMimeTypes = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
] as const

type SupportedMimeType = (typeof supportedMimeTypes)[number]

const mimeTypesToMediaType: Record<SupportedMimeType, MediaType> = {
  'image/gif': MediaType.ImageGif,
  'image/jpeg': MediaType.ImageJpeg,
  'image/png': MediaType.ImagePng,
  'image/svg+xml': MediaType.ImageSvgXml,
  'image/webp': MediaType.ImageWebp,
}

export const imagePlugin = createImagePlugin({
  upload: createUploadImageHandler(),
  validate: validateFile,
})

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
      fetchAndPersistAuthSession()
        .then((session) => {
          const gqlFetch = createAuthAwareGraphqlFetch(
            getAuthPayloadFromSession(session)
          )
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
        .catch(() => {
          reject()
        })
    })
  }
}

function onError(errors: FileError[]): void {
  showToastNotice(errors.map((error) => error.message).join('\n'), 'warning')
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
