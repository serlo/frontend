import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { EditStrings } from '@editor/types/language-data'

const maxImageFileSize = 2 * 1024 * 1024
const maxVideoFileSize = 16 * 1024 * 1024
const allowedExtensions = [
  'gif',
  'jpg',
  'jpeg',
  'png',
  'svg',
  'webp',
  'webm',
  'mp4',
]

export function validateFile(
  file: File,
  uploadStrings: EditStrings['edtrIo']['fileUpload']
) {
  if (!file) {
    handleError(uploadStrings.noFileSelected)
    return false
  }

  const extension = file.name
    .toLowerCase()
    .slice(file.name.lastIndexOf('.') + 1)

  if (!matchesAllowedExtensions(extension)) {
    handleError(
      uploadStrings.badExtension
        .replace('%ext%', extension)
        .replace('%allowed%', allowedExtensions.join(', '))
    )
    return false
  }
  const maxFileSize = file.type.startsWith('video/')
    ? maxVideoFileSize
    : maxImageFileSize

  if (file.size > maxFileSize) {
    handleError(
      uploadStrings.fileTooBig.replace(
        '%maxsize%',
        String(maxFileSize / 1024 / 1024)
      )
    )
    return false
  }

  return true
}

function matchesAllowedExtensions(extension: string) {
  return allowedExtensions.includes(extension)
}

export function handleError(message: string) {
  // eslint-disable-next-line no-console
  console.error(message)
  showToastNotice('⚠️ ' + message, 'warning')
}
