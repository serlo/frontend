import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@editor/utils/use-editor-strings'
import { faArrowCircleUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { shouldUseFeature } from '@serlo/frontend/src/components/user/profile-experimental'

import { IntermediateTask } from './intermediate-task'
import { type ExerciseGroupProps } from '..'
import { ExerciseGroupRenderer } from '../renderer'

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
                        text={templateStrings.entity.moveUpLabel}
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
                content: { plugin: EditorPluginType.Rows },
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
