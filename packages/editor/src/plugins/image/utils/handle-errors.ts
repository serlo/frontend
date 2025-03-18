import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { type EditStrings } from '@editor/types/language-data'

import { allowedExtensions } from './validate-file'

export interface ValidationError {
  error: 'noFile' | 'badExtension' | 'tooBig'
  extension?: string
  maxFileSize?: number
}

export function handleValidationError(
  result: ValidationError,
  uploadStrings: EditStrings['edtrIo']['fileUpload']
) {
  const { error, extension = '', maxFileSize = 2 } = result

  if (error === 'noFile') handleError(uploadStrings.noFileSelected)
  if (error === 'badExtension') {
    handleError(
      uploadStrings.badExtension
        .replace('%ext%', extension ?? '')
        .replace('%allowed%', allowedExtensions.join(', '))
    )
  }
  if (error === 'tooBig') {
    handleError(
      uploadStrings.fileTooBig.replace(
        '%maxsize%',
        String(maxFileSize / 1024 / 1024)
      )
    )
  }
}

export function handleError(message: string) {
  // eslint-disable-next-line no-console
  console.error(message)
  showToastNotice('⚠️ ' + message, 'warning')
}
