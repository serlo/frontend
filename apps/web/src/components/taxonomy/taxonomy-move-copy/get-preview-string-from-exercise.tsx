import { extractStringFromTextDocument } from '@editor/plugins/text/utils/static-extract-text'
import {
  AnyEditorDocument,
  EditorExerciseDocument,
  EditorRowsDocument,
  EditorTemplateExerciseGroupDocument,
} from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'

import { InstanceData } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'

export function getPreviewStringFromExercise(
  document: EditorExerciseDocument | EditorTemplateExerciseGroupDocument,
  strings: InstanceData['strings']
) {
  const typeString = getTranslatedType(strings, document.plugin)

  const rows = isRowsDocument(document.state.content as AnyEditorDocument)
    ? (document.state.content as EditorRowsDocument)
    : undefined

  const titleString = rows?.state.map(extractStringFromTextDocument).join(' ')

  if (!titleString || titleString.trim().length < 3) return typeString

  return `${typeString}: "${
    titleString.length < 60 ? titleString : titleString.substring(0, 50) + '…'
  }"`
}
