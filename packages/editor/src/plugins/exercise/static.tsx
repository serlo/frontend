import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorExerciseDocument } from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'

import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function ExerciseStaticRenderer({ state }: EditorExerciseDocument) {
  const { content, interactive, solution } = state
  if (!content) return null

  const isEmptyContent =
    isRowsDocument(content) &&
    content.state.length === 1 &&
    isEmptyTextDocument(content.state[0])

  return (
    <>
      {isEmptyContent ? (
        <div className="mt-6"></div>
      ) : (
        <StaticRenderer document={content} />
      )}
      <StaticRenderer document={interactive} />
      <StaticRenderer document={solution} />
    </>
  )
}
