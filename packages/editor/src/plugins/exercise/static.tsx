import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorExerciseDocument } from '@editor/types/editor-plugins'
import { isRowsDocument } from '@editor/types/plugin-type-guards'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'

export function ExerciseStaticRenderer({ state }: EditorExerciseDocument) {
  const { content, interactive, solution, hideInteractiveInitially } = state
  const [interactiveHidden, setInteractiveHidden] = useState(
    hideInteractiveInitially
  )
  const { strings } = useInstanceData()
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

      {interactiveHidden ? (
        <button
          className="serlo-button-blue-transparent ml-side text-base hover:bg-brand-100 hover:text-brand-700"
          onClick={() => setInteractiveHidden(false)}
        >
          <FaIcon icon={faCircleCheck} />{' '}
          {strings.content.exercises.showHiddenInteractive}
        </button>
      ) : (
        <StaticRenderer document={interactive} />
      )}

      <StaticRenderer document={solution} />
    </>
  )
}
