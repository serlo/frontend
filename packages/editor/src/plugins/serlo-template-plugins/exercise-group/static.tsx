import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorRowsDocument,
  EditorTemplateExerciseGroupDocument,
} from '@editor/types/editor-plugins'
import { useAuthentication } from '@serlo/frontend/src/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@serlo/frontend/src/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@serlo/frontend/src/data-types'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { TextExerciseGroupTypeRenderer } from './renderer'
import { ExerciseNumberContext } from '../../../core/contexts/exercise-number-context'
import { cn } from '@/helper/cn'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@serlo/frontend/src/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function TextExerciseGroupTypeStaticRenderer(
  props: EditorTemplateExerciseGroupDocument
) {
  const { state, serloContext: context } = props
  const uuid = context?.uuid
  const [loaded, setLoaded] = useState(false)
  const auth = useAuthentication()
  useEffect(() => {
    setLoaded(true)
  }, [])
  const exerciseNumbers = useContext(ExerciseNumberContext)

  const { content, exercises } = state

  if (!exercises) return null

  const rendered = exercises.map((exercise, index) => {
    const id = `${exercise.id ?? exercise.serloContext?.uuid ?? index}`
    return {
      id,
      element: <StaticRenderer document={exercise} />,
    }
  })

  const renderExerciseNumber = uuid && exerciseNumbers[uuid]

  return (
    <div className={cn('relative', renderExerciseNumber && 'flex flex-row')}>
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
      {/* Conditionally render ExerciseNumbering if it is available */}
      {renderExerciseNumber ? renderExerciseNumber() : null}
      <div className="flex flex-grow flex-col">
        <TextExerciseGroupTypeRenderer
          content={
            <StaticRenderer
              document={content as unknown as EditorRowsDocument}
            />
          }
          exercises={rendered}
        />
      </div>
    </div>
  )
}
