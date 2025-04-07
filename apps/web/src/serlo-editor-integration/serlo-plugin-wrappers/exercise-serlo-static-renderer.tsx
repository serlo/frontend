import {
  ExerciseStaticRenderer,
  type EditorExerciseDocument,
  type EditorSolutionDocument,
} from '@editor/package'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import type { AuthorToolsExercisesProps } from '@/components/user-tools/foldout-author-menus/author-tools-exercises'
import { useEntityMetaData } from '@/contexts/entity-meta-context'
import { ExerciseContext } from '@/contexts/exercise-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { ExerciseInlineType } from '@/data-types'

const AuthorToolsExercises = dynamic<AuthorToolsExercisesProps>(() =>
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
  const { isEntity, isInExerciseGroup } = useContext(ExerciseContext)

  const { licenseId } = useEntityMetaData()

  const exerciseLicenseId = isInExerciseGroup
    ? props.state.licenseId
    : licenseId
  const solutionLicenseId = (props.state.solution as EditorSolutionDocument)
    ?.state.licenseId

  const exerciseContext = useContext(ExerciseContext)

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
        {loaded && auth && isEntity && !isRevisionView ? (
          <AuthorToolsExercises type={ExerciseInlineType.Exercise} />
        ) : null}
      </div>
      {/* Provide exercise ids for analytics & comments */}
      <ExerciseContext.Provider
        value={{
          ...exerciseContext, // Use what was provided already (from topic.tsx or entity.txs)
        }}
      >
        <div className="-mt-block">
          <ExerciseStaticRenderer {...props} />
        </div>
      </ExerciseContext.Provider>
    </div>
  )
}
