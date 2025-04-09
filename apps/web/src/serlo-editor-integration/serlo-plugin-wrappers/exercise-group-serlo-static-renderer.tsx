import {
  type EditorExerciseGroupDocument,
  ExerciseGroupStaticRenderer,
} from '@editor/package'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import type { AuthorToolsExercisesProps } from '@/components/user-tools/foldout-author-menus/author-tools-exercises'
import { useEntityMetaData } from '@/contexts/entity-meta-context'
import { ExerciseContext } from '@/contexts/exercise-context'
import { ExerciseInlineType } from '@/data-types'

const AuthorToolsExercises = dynamic<AuthorToolsExercisesProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

/**
 * Special version for serlo.org with author tools and license
 */
export function ExerciseGroupSerloStaticRenderer(
  props: EditorExerciseGroupDocument
) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  const exerciseContext = useContext(ExerciseContext)
  useEffect(() => setLoaded(true), [])

  const { entityId, licenseId } = useEntityMetaData()

  return (
    <div className="relative">
      <div className="absolute -right-8">
        {licenseId ? (
          <div className="ml-1">
            <ExerciseLicenseNotice exerciseLicenseId={licenseId} />
          </div>
        ) : null}
        {loaded && auth && entityId ? (
          <AuthorToolsExercises type={ExerciseInlineType.ExerciseGroup} />
        ) : null}
      </div>
      <ExerciseContext.Provider
        value={{
          ...exerciseContext, // Use what was provided already (from topic.tsx)
          isInExerciseGroup: true,
          isEntity: false,
        }}
      >
        <div className="-mt-block">
          <ExerciseGroupStaticRenderer {...props} />
        </div>
      </ExerciseContext.Provider>
    </div>
  )
}
