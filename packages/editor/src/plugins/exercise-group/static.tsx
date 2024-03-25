import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorExerciseGroupDocument,
  EditorRowsDocument,
} from '@editor/types/editor-plugins'

import { ExerciseGroupRenderer } from './renderer'

export function ExerciseGroupStaticRenderer(
  props: EditorExerciseGroupDocument
) {
  const { state } = props

  const { content, exercises, intermediateTasks } = state
  if (!exercises) return null

  const rendered = exercises.map((exercise, index) => {
    const id = `${exercise.id ?? index}`
    return {
      id,
      element: (
        <>
          <StaticRenderer document={exercise} /> {renderIntermediateTask(index)}
        </>
      ),
    }
  })

  return (
    <div className="relative">
      <ExerciseGroupRenderer
        content={
          <StaticRenderer document={content as unknown as EditorRowsDocument} />
        }
        exercises={rendered}
      />
    </div>
  )

  function renderIntermediateTask(exerciseIndex: number) {
    if (!intermediateTasks || !intermediateTasks.length) return null

    const task = intermediateTasks.find(
      ({ afterIndex }) => afterIndex === exerciseIndex
    )
    if (!task) return null

    return (
      <div className="rounded-lg bg-gray-50 p-0.25">
        <StaticRenderer document={task.content as EditorRowsDocument} />
      </div>
    )
  }
}
