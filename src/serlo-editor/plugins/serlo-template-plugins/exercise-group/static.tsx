import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { TextExerciseGroupTypeRenderer } from './renderer'
import { useAuthentication } from '@/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@/data-types'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import {
  EditorRowsDocument,
  EditorTemplateGroupedExerciseDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function TextExerciseGroupTypeStaticRenderer(
  props: EditorTemplateGroupedExerciseDocument
) {
  const { state, serloContext: context } = props
  const [loaded, setLoaded] = useState(false)
  const auth = useAuthentication()
  useEffect(() => {
    setLoaded(true)
  }, [])

  const { content, exercisesWithSolutions } = state

  const rendered = exercisesWithSolutions.map((exerciseWithSolution, index) => {
    if (exerciseWithSolution.length === 0) return null
    const exercise = exerciseWithSolution[0]
    const solution = exerciseWithSolution[1]

    const id = String(
      exercise.id ?? Object.hasOwn(exercise, 'serloContext')
        ? exercise.serloContext?.uuid
        : index
    )

    return {
      id,
      element: (
        <>
          <StaticRenderer document={exercise} />
          {solution ? <StaticRenderer document={solution} /> : null}
        </>
      ),
    }
  })

  return (
    <div className="relative">
      {loaded && auth && context?.uuid ? (
        <div className="absolute -right-8">
          <AuthorToolsExercises
            data={{
              type: ExerciseInlineType.ExerciseGroup,
              id: context?.uuid,
              trashed: context?.trashed,
              unrevisedRevisions: context?.uuid,
            }}
          />
        </div>
      ) : null}
      <TextExerciseGroupTypeRenderer
        content={
          <StaticRenderer document={content as unknown as EditorRowsDocument} />
        }
        exercises={rendered}
      />
    </div>
  )
}
