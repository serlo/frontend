import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorExerciseGroupDocument,
  EditorRowsDocument,
} from '@editor/types/editor-plugins'
// import { useAuthentication } from '@serlo/frontend/src/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@serlo/frontend/src/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@serlo/frontend/src/data-types'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { ExerciseGroupRenderer } from './renderer'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@serlo/frontend/src/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function ExerciseGroupStaticRenderer(
  props: EditorExerciseGroupDocument
) {
  const { state, serloContext: context } = props
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])
  // const auth = useAuthentication()

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
      <div className="absolute -right-8">
        {context?.licenseId ? (
          <div className="ml-1">
            <ExerciseLicenseNotice exerciseLicenseId={context?.licenseId} />
          </div>
        ) : null}
        {loaded && context?.uuid ? (
          <AuthorToolsExercises
            data={{
              type: ExerciseInlineType.ExerciseGroup,
              id: context?.uuid,
              trashed: context?.trashed,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        ) : null}
      </div>
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
