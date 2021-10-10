/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { LoadedFile, UploadValidator } from '@edtr-io/plugin'
import { createImagePlugin as createCoreImagePlugin } from '@edtr-io/plugin-image'
import fetch from 'unfetch'

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

export function createUploadImageHandler(getCsrfToken: () => string) {
  const readFile = createReadFile(getCsrfToken)
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

export function createReadFile(getCsrfToken: () => string) {
  return function readFile(file: File): Promise<LoadedFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = function (e: ProgressEvent) {
        if (!e.target) return
        const formData = new FormData()
        formData.append('attachment[file]', file)
        formData.append('type', 'file')
        formData.append('csrf', getCsrfToken())

        fetch('/attachment/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data['success']) reject()
            resolve({
              file,
              dataUrl: data.files[0].location,
            })
          })
          .catch(() => {
            reject()
          })
      }

      reader.readAsDataURL(file)
    })
  }
}

export function createImagePlugin(getCsrfToken: () => string) {
  return createCoreImagePlugin({
    upload: createUploadImageHandler(getCsrfToken),
    validate: validateFile,
    secondInput: 'description',
  })
}
