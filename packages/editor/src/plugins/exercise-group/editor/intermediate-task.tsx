import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'

import { type ExerciseGroupProps } from '..'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

interface IntermediateTaskProps {
  intermediateTasks: ExerciseGroupProps['state']['intermediateTasks']
  exerciseIndex: number
  lastExerciseIndex: number
}

export function IntermediateTask({
  intermediateTasks,
  exerciseIndex,
  lastExerciseIndex,
}: IntermediateTaskProps) {
  const templateStrings = useEditorStrings().templatePlugins
  const exGroupStrings = templateStrings.textExerciseGroup

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
