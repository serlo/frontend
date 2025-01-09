import {
  isMultimediaDocument,
  isRowsDocument,
  type AnyEditorDocument,
  type EditorExerciseDocument,
  type EditorExerciseGroupDocument,
  type EditorRowsDocument,
} from '@editor/package'
import { extractStringFromTextDocument } from '@editor/plugins/text/utils/static-extract-text'

import { InstanceData } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'

export function getPreviewStringFromExercise(
  document: EditorExerciseDocument | EditorExerciseGroupDocument,
  strings: InstanceData['strings']
) {
  const typeString = getTranslatedType(strings, document.plugin)

  const rows = isRowsDocument(document.state.content as AnyEditorDocument)
    ? (document.state.content as EditorRowsDocument)
    : undefined

  const titleString = extractStringFromRowsTextAndMultimedia(rows)

  if (!titleString || titleString.trim().length < 3) return typeString

  return `${typeString}: "${
    titleString.length < 60 ? titleString : titleString.substring(0, 50) + '…'
  }"`
}

function extractStringFromRowsTextAndMultimedia(
  document?: AnyEditorDocument
): string {
  if (document) {
    if (isRowsDocument(document)) {
      return document.state
        .map(extractStringFromRowsTextAndMultimedia)
        .join(' ')
        .trim()
    }

    if (isMultimediaDocument(document)) {
      return extractStringFromRowsTextAndMultimedia(document.state.explanation)
    }

    return extractStringFromTextDocument(document)
  }

  return ''
}
