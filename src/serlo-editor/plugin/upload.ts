import { useEffect, useState } from 'react'

import { StateType } from './internal-plugin-state'
import { asyncScalar } from './scalar'

export function upload<T>(defaultState: T): UploadStateType<T> {
  const state = asyncScalar<T, TempFile>(defaultState, isTempFile)
  return {
    ...state,
    init(...args) {
      const s = state.init(...args)
      return {
        ...s,
        set(
          value: FileState<T> | ((currentValue: FileState<T>) => FileState<T>)
        ) {
          s.set(value)
        },
        isPending: isTempFile(s.value) && !!s.value.pending,
        upload(file: File, handler: UploadHandler<T>): Promise<T> {
          const uploaded = handler(file)
          s.set(defaultState, (resolve, reject) => {
            uploaded
              .then((uploaded) => {
                return uploaded
              })
              .then((uploaded) => {
                resolve(() => {
                  return uploaded
                })
              })
              .catch(() => {
                reject(() => {
                  return { uploadHandled: true, failed: file }
                })
              })
          })

          return uploaded
        },
      }
    },
  }
}

export type UploadStateType<T> = StateType<
  FileState<T>,
  FileState<T>,
  UploadStateReturnType<T>
>

export interface UploadStateReturnType<T> {
  get(): FileState<T>
  value: FileState<T>
  isPending: boolean
  upload(file: File, handler: UploadHandler<T>): Promise<T>
  set(
    value: FileState<T> | ((currentValue: FileState<T>) => FileState<T>)
  ): void
}

/**
 * @param file - The {@link UploadStateReturnType | upload state type}
 * @param uploadHandler - The {@link UploadHandler | upload handler}
 */
export function usePendingFileUploader<T>(
  file: UploadStateReturnType<T>,
  uploadHandler: UploadHandler<T>
) {
  usePendingFilesUploader([file], uploadHandler)
}
/**
 * @param files - The {@link UploadStateReturnType | upload state type}
 * @param uploadHandler - The {@link UploadHandler | upload handler}
 */
export function usePendingFilesUploader<T>(
  files: UploadStateReturnType<T>[],
  uploadHandler: UploadHandler<T>
) {
  const [uploading, setUploading] = useState(0)
  useEffect(() => {
    // everything uploaded already
    if (uploading >= files.length) return
    const fileState = files[uploading]

    if (
      isTempFile(fileState.value) &&
      fileState.value.pending &&
      !fileState.value.uploadHandled
    ) {
      fileState.set({ ...fileState.value, uploadHandled: true })

      void fileState
        .upload(fileState.value.pending, uploadHandler)
        .catch(onDone)
        .then(onDone)
    }

    function onDone() {
      setUploading((currentUploading) => currentUploading + 1)
    }
  }, [files, uploadHandler, uploading])
}
export type UploadHandler<T> = (file: File) => Promise<T>

export type UploadValidator<E = unknown> = (
  file: File
) => { valid: true } | { valid: false; errors: E }

export interface TempFile {
  uploadHandled?: boolean
  pending?: File
  failed?: File
  loaded?: LoadedFile
}
export type FileState<T> = T | TempFile

/**
 * @param state - The current {@link FileState | state}
 */
export function isTempFile<T>(state: FileState<T>): state is TempFile {
  const file = state as TempFile
  return !!(file.pending || file.failed || file.loaded)
}

export interface LoadedFile {
  file: File
  dataUrl: string
}
