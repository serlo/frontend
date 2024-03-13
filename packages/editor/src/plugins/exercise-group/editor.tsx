import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ExerciseGroupProps } from '.'
import { ExerciseGroupRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'

export function ExeriseGroupEditor({ state }: ExerciseGroupProps) {
  const { content, exercises } = state

  const exGroupStrings = useEditorStrings().templatePlugins.textExerciseGroup

  // TODO: AI button
  return (
    <>
      <ExerciseGroupRenderer
        content={<>{content.render()}</>}
        exercises={exercises.map((exercise, index) => {
          return {
            id: exercise.id,
            element: (
              <>
                <nav className="flex justify-end">
                  <button
                    className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                    onClick={() => exercises.remove(index)}
                  >
                    <EditorTooltip text={exGroupStrings.removeExercise} />
                    <FaIcon icon={faTrashAlt} />
                  </button>
                </nav>
                {exercise.render()}
              </>
            ),
          }
        })}
      />
      {renderButton(exGroupStrings.addExercise)}
    </>
  )

  function renderButton(text: string, noIcon?: boolean) {
    return (
      <SerloAddButton
        text={text}
        noIcon={noIcon}
        onClick={() => exercises.insert()}
        className="mb-8 mt-4"
      />
    )
  }
}
