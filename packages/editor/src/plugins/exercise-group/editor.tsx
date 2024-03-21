import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { SerloAddButton } from '@editor/plugin/helpers/serlo-editor-button'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

import type { ExerciseGroupProps } from '.'
import { ExerciseGroupRenderer } from './renderer'
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
                {renderIntermediateTask(index)}
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

  function renderIntermediateTask(exerciseIndex: number) {
    if (!intermediateTasks.defined) return
    const taskIndex = intermediateTasks.findIndex(
      (task) => task.afterIndex.value === exerciseIndex
    )
    const task = intermediateTasks[taskIndex]
    if (!task) return null

    return (
      <>
        <nav className="flex justify-end">
          <small className="mx-2 bg-editor-primary-50 p-1 font-bold text-gray-600">
            {exGroupStrings.intermediateTask}
          </small>
          <div>
            {exerciseIndex > 0 ? (
              <button
                className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                onClick={() => {
                  task.afterIndex.set(exerciseIndex - 1)
                }}
              >
                <EditorTooltip text={templateStrings.article.moveUpLabel} />
                <FaIcon icon={faArrowCircleUp} />
              </button>
            ) : null}
            {exerciseIndex < lastExerciseIndex ? (
              <button
                className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                onClick={() => {
                  task.afterIndex.set(exerciseIndex + 1)
                }}
              >
                <FaIcon icon={faArrowCircleDown} />
              </button>
            ) : null}
            <button
              className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
              onClick={() => intermediateTasks.remove(taskIndex)}
            >
              <EditorTooltip text={exGroupStrings.removeIntermediateTask} />
              <FaIcon icon={faTrashAlt} />
            </button>
          </div>
        </nav>
        <div className="rounded-lg bg-gray-50 p-0.25">
          {task.content.render()}
        </div>
      </>
    )
  }
}
