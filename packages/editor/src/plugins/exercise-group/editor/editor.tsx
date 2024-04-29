import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faArrowCircleUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { v4 as uuidv4 } from 'uuid'

import { IntermediateTask } from './intermediate-task'
import { type ExerciseGroupProps } from '..'
import { ExerciseGroupRenderer } from '../renderer'
import { FaIcon } from '@/components/fa-icon'
import { shouldUseFeature } from '@/components/user/profile-experimental'

export function ExeriseGroupEditor({ state }: ExerciseGroupProps) {
  const { content, exercises, intermediateTasks } = state

  const templateStrings = useEditorStrings().templatePlugins
  const exGroupStrings = templateStrings.textExerciseGroup

  const lastExerciseIndex = exercises.length - 1

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
                  {index > 0 ? (
                    <button
                      className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                      onClick={() => {
                        exercises.move(index, index - 1)
                      }}
                    >
                      <EditorTooltip
                        text={templateStrings.article.moveUpLabel}
                      />
                      <FaIcon icon={faArrowCircleUp} />
                    </button>
                  ) : null}
                  <button
                    className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                    onClick={() => exercises.remove(index)}
                  >
                    <EditorTooltip text={exGroupStrings.removeExercise} />
                    <FaIcon icon={faTrashAlt} />
                  </button>
                </nav>
                {exercise.render()}
                <IntermediateTask
                  intermediateTasks={intermediateTasks}
                  exerciseIndex={index}
                  lastExerciseIndex={lastExerciseIndex}
                />
              </>
            ),
          }
        })}
      />
      {renderButtons()}
    </>
  )

  function renderButtons() {
    const showIntermediateTaskButton =
      shouldUseFeature('editorIntermediateTasks') &&
      lastExerciseIndex >= 0 &&
      (intermediateTasks.defined
        ? !intermediateTasks.find(
            (task) => task.afterIndex.value === lastExerciseIndex
          )
        : true)

    return (
      <>
        <SerloAddButton
          text={exGroupStrings.addExercise}
          onClick={() => exercises.insert()}
          className="mb-8 mt-4"
        />
        {showIntermediateTaskButton ? (
          <SerloAddButton
            text={exGroupStrings.addIntermediateTask}
            onClick={() => {
              const newTask = {
                afterIndex: lastExerciseIndex,
                content: { plugin: EditorPluginType.Rows, id: uuidv4() },
              }
              if (intermediateTasks.defined) {
                intermediateTasks.insert(undefined, newTask)
              } else {
                intermediateTasks.create([newTask])
              }
            }}
            className="mb-8 mt-4"
          />
        ) : null}
      </>
    )
  }
}
