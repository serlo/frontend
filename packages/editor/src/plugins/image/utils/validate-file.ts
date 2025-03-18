import { type ValidationError } from './handle-errors'

const maxImageFileSize = 2 * 1024 * 1024
const maxVideoFileSize = 16 * 1024 * 1024
export const allowedExtensions = [
  'gif',
  'jpg',
  'jpeg',
  'png',
  'svg',
  'webp',
  'webm',
  'mp4',
]

export function validateFile(file: File): true | ValidationError {
  if (!file) return { error: 'noFile' }

  const extension = file.name
    .toLowerCase()
    .slice(file.name.lastIndexOf('.') + 1)

  const isAllowedExtension = allowedExtensions.includes(extension)

  if (!isAllowedExtension) return { error: 'badExtension', extension }

  const maxFileSize = file.type.startsWith('video/')
    ? maxVideoFileSize
    : maxImageFileSize

  if (file.size > maxFileSize) return { error: 'tooBig', maxFileSize }

  return true
}
