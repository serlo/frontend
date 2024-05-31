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
import { ExerciseIdsContext } from '@/contexts/exercise-ids-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
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

  const exerciseLicenseId = context?.licenseId ?? props.state.licenseId
  const solutionLicenseId = (props.state.solution as EditorSolutionDocument)
    ?.state.licenseId

  const exerciseContext = useContext(ExerciseIdsContext)

  // when we moved the groupedExercises into the exercises state we used the old entity uuid as editor id
  // e.g. `3743-exercise-child`. This way we can use the entity ids in injections and for exercise analytics
  const oldEntityId = context?.uuid ?? Number(props.id?.split('-')[0])
  const exerciseTrackingId = isNaN(oldEntityId)
    ? // construct fake but persisting tracking id just for evaluation
      Number(props.id?.replace(/[^0-9]/g, '').substring(0, 8))
    : oldEntityId

  return (
    <div className="relative">
      <div className="absolute -right-8 -mt-1">
        {exerciseLicenseId || solutionLicenseId ? (
          <div className="ml-1">
            <ExerciseLicenseNotice
              exerciseLicenseId={exerciseLicenseId}
              solutionLicenseId={solutionLicenseId}
            />
          </div>
        ) : null}
        {loaded && auth && context?.uuid && !isRevisionView ? (
          <AuthorToolsExercises
            data={{
              id: context?.uuid,
              ...context,
              typename: ExerciseInlineType.Exercise,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        ) : null}
      </div>
      {/* Provide exercise ids for analytics & comments */}
      {/* @@@ Remove all occurences of ExerciseIdsContext.Provider */}
      <ExerciseIdsContext.Provider
        value={{
          ...exerciseContext, // Use what was provided already (from topic.tsx)
          exerciseTrackingId,
        }}
      >
        <div className="-mt-block">
          <ExerciseStaticRenderer {...props} />
        </div>
      </ExerciseIdsContext.Provider>
    </div>
  )
}
