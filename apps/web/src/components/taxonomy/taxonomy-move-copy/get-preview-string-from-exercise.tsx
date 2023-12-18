import { extractStringFromTextDocument } from '@serlo/editor/src/plugins/text/utils/static-extract-text'
import {
  EditorExerciseDocument,
  EditorRowsDocument,
  EditorTemplateExerciseGroupDocument,
} from '@serlo/editor/src/types/editor-plugins'

import { InstanceData } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'

export function getPreviewStringFromExercise(
  document: EditorExerciseDocument | EditorTemplateExerciseGroupDocument,
  strings: InstanceData['strings']
) {
  const typeString = getTranslatedType(strings, document.plugin)

  const rows = document.state.content as EditorRowsDocument

  const titleString = rows?.state.map(extractStringFromTextDocument).join(' ')

  if (!titleString || titleString.trim().length < 3) return typeString

  return `${typeString}: "${
    titleString.length < 60 ? titleString : titleString.substring(0, 50) + '…'
  }"`
}
