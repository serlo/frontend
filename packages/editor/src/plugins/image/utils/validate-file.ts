import { showToastNotice } from '@editor/editor-ui/show-toast-notice'

export enum FileErrorCode {
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
const maxFileSize = 2 * 1024 * 1024
const allowedExtensions = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp']

export function validateFile(file: File) {
  // TODO: i18n and make error messages actually helpful
  if (!file) {
    handleError('No file selected')
    return false
  }
  if (!matchesAllowedExtensions(file.name)) {
    handleError('Not an accepted file type')
    return false
  }
  if (file.size > maxFileSize) {
    handleError('File is too big')
    return false
  }

  return true
}

function matchesAllowedExtensions(fileName: string) {
  const extension = fileName.toLowerCase().slice(fileName.lastIndexOf('.') + 1)
  return allowedExtensions.includes(extension)
}

export function handleError(message: string) {
  // eslint-disable-next-line no-console
  console.error(message)
  showToastNotice(message, 'warning')
}
