import { ExerciseGroupStaticRenderer } from '@editor/plugins/exercise-group/static'
import type { EditorExerciseGroupDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseGroupIdProvider } from '@/contexts/exercise-group-id-context'
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
              type: ExerciseInlineType.ExerciseGroup,
              id: context?.uuid,
              trashed: context?.trashed,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        ) : null}
      </div>
      {/* Provide parent uuids for nested exercises plugins */}
      <ExerciseGroupIdProvider value={context?.uuid}>
        <div className="-mt-block">
          <ExerciseGroupStaticRenderer {...props} />
        </div>
      </ExerciseGroupIdProvider>
    </div>
  )
}
