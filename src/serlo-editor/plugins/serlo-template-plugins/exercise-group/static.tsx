import { Fragment } from 'react'

import { TextExerciseGroupTypeRenderer } from './renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import {
  EditorRowsPlugin,
  EditorTemplateGroupedExercise,
} from '@/serlo-editor-integration/types/editor-plugins'

export function TextExerciseGroupTypeStaticRenderer({
  state,
}: EditorTemplateGroupedExercise) {
  const { content, exercisesWithSolutions } = state

  const rendered = exercisesWithSolutions.map((exerciseWithSolution) => {
    if (exerciseWithSolution.length === 0) return null

    const exercise = exerciseWithSolution[0]
    const solution = exerciseWithSolution[1]

    return {
      id: exercise.id,
      element: (
        <Fragment key={exercise.id}>
          <StaticRenderer state={exercise} />
          {solution ? <StaticRenderer state={solution} /> : null}
        </Fragment>
      ),
    }
  })

  return (
    <>
      <TextExerciseGroupTypeRenderer
        content={
          <StaticRenderer state={content as unknown as EditorRowsPlugin} />
        }
        exercises={rendered}
      />
    </>
  )
}
