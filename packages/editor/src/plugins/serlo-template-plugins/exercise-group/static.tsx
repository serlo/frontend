import { EditorPluginType } from '@editor/package'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorTemplateExerciseGroupDocument } from '@editor/types/editor-plugins'
import { useAuthentication } from '@serlo/frontend/src/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@serlo/frontend/src/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@serlo/frontend/src/data-types'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { TextExerciseGroupTypeRenderer } from './renderer'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@serlo/frontend/src/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function TextExerciseGroupTypeStaticRenderer(
  props: EditorTemplateExerciseGroupDocument
) {
  const { state, serloContext: context } = props
  const [loaded, setLoaded] = useState(false)
  const auth = useAuthentication()
  useEffect(() => {
    setLoaded(true)
  }, [])

  const { content, exercises } = state

  // new renderer
  if (content.plugin === EditorPluginType.ExerciseGroup) {
    return (
      <div className="relative">
        {loaded && auth && context?.uuid ? (
          <div className="absolute -right-8">
            <AuthorToolsExercises
              data={{
                type: ExerciseInlineType.ExerciseGroup,
                id: context?.uuid,
                trashed: context?.trashed,
                unrevisedRevisions: context?.unrevisedRevisions,
              }}
            />
          </div>
        ) : null}
        <StaticRenderer document={content} />
      </div>
    )
  }

  // old renderer

  if (!exercises) return null

  const rendered = exercises.map((exercise, index) => {
    const id = `${exercise.id ?? exercise.serloContext?.uuid ?? index}`
    return {
      id,
      element: <StaticRenderer document={exercise} />,
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
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        </div>
      ) : null}
      <TextExerciseGroupTypeRenderer
        content={<StaticRenderer document={content} />}
        exercises={rendered}
      />
    </div>
  )
}
