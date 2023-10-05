import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import type { EditorExercisePlugin } from '../types/editor-plugins'
import { useAuthentication } from '@/auth/use-authentication'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { ExerciseInlineType } from '@/data-types'
import { ExerciseStaticRenderer } from '@/serlo-editor/plugins/exercise/static'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

// Special version for serlo.org with author tools and license
export function ExerciseSerloStaticRenderer(props: EditorExercisePlugin) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  const isRevisionView = useContext(RevisionViewContext)

  const context = props.serloContext

  return (
    <div className="relative">
      {context?.license ? (
        <div className="absolute right-0 z-20">
          <ExerciseLicenseNotice data={context.license} />
        </div>
      ) : null}
      {loaded && auth && context?.uuid && !isRevisionView ? (
        <div className="absolute -right-8 z-20">
          <AuthorToolsExercises
            data={{
              type: ExerciseInlineType.Exercise,
              id: context?.uuid,
              trashed: context?.trashed,
              grouped: context?.grouped,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        </div>
      ) : null}

      <ExerciseStaticRenderer {...props} />
    </div>
  )
}
