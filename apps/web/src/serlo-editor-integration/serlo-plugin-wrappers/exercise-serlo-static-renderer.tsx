import { ExerciseStaticRenderer } from '@editor/plugins/exercise/static'
import type {
  EditorExerciseDocument,
  EditorSolutionDocument,
} from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { UuidsProvider } from '@/contexts/uuids-context'
import { ExerciseInlineType } from '@/data-types'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

// Special version for serlo.org with author tools and license
export function ExerciseSerloStaticRenderer(props: EditorExerciseDocument) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  const isRevisionView = useContext(RevisionViewContext)

  const context = props.serloContext

  const solutionLicenseId = (props.state.solution as EditorSolutionDocument)
    ?.state.licenseId

  return (
    <div className="relative">
      <div className="absolute -right-8 -mt-1">
        {context?.licenseId || solutionLicenseId ? (
          <div className="ml-1">
            <ExerciseLicenseNotice
              exerciseLicenseId={context?.licenseId}
              solutionLicenseId={solutionLicenseId}
            />
          </div>
        ) : null}
        {loaded && auth && context?.uuid && !isRevisionView ? (
          <AuthorToolsExercises
            data={{
              type: ExerciseInlineType.Exercise,
              id: context?.uuid,
              trashed: context?.trashed,
              grouped: context?.grouped,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        ) : null}
      </div>
      {/* Provide uuids for interactive exercises */}
      <UuidsProvider
        value={{ entityId: context?.uuid, revisionId: context?.revisionId }}
      >
        <div className="-mt-block">
          <ExerciseStaticRenderer {...props} />
        </div>
      </UuidsProvider>
    </div>
  )
}
