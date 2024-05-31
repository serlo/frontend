import { ExerciseGroupStaticRenderer } from '@editor/plugins/exercise-group/static'
import type { EditorExerciseGroupDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseContext } from '@/contexts/exercise-ids-context'
import { ExerciseInlineType } from '@/data-types'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

// Special version for serlo.org with author tools and license
export function ExerciseGroupSerloStaticRenderer(
  props: EditorExerciseGroupDocument
) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  const exerciseContext = useContext(ExerciseContext)
  useEffect(() => setLoaded(true), [])

  const context = props.serloContext

  return (
    <div className="relative">
      <div className="absolute -right-8">
        {context?.licenseId ? (
          <div className="ml-1">
            <ExerciseLicenseNotice exerciseLicenseId={context?.licenseId} />
          </div>
        ) : null}
        {loaded && auth && context?.uuid ? (
          <AuthorToolsExercises
            data={{
              typename: ExerciseInlineType.ExerciseGroup,
              id: context?.uuid,
              trashed: context?.trashed,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        ) : null}
      </div>
      <ExerciseContext.Provider
        value={{
          ...exerciseContext, // Use what was provided already (from topic.tsx)
          isInExerciseGroup: true,
        }}
      >
        <div className="-mt-block">
          <ExerciseGroupStaticRenderer {...props} />
        </div>
      </ExerciseContext.Provider>
    </div>
  )
}
