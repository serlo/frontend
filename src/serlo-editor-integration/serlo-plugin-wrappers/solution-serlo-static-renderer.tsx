import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import type { EditorSolutionPlugin } from '../types/editor-plugins'
import { useAuthentication } from '@/auth/use-authentication'
import type { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import { ExerciseLicenseNotice } from '@/components/content/license/exercise-license-notice'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import type { MoreAuthorToolsProps } from '@/components/user-tools/foldout-author-menus/more-author-tools'
import { useAB } from '@/contexts/ab'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useEntityId, useRevisionId } from '@/contexts/uuids-context'
import { ExerciseInlineType } from '@/data-types'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { StaticSolutionRenderer } from '@/serlo-editor/plugins/solution/static'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)
const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

// TODO: check if empty solutions are hidden

// Special version for serlo.org with author tools and license
export function SolutionSerloStaticRenderer(props: EditorSolutionPlugin) {
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])
  const { asPath } = useRouter()
  const ab = useAB()
  const entityId = useEntityId()
  const revisionId = useRevisionId()
  const isRevisionView = useContext(RevisionViewContext)
  const context = props.serloContext

  if (isPrintMode && !printModeSolutionVisible) return null

  const solutionVisibleOnInit = isRevisionView
    ? true
    : isPrintMode
    ? printModeSolutionVisible
    : typeof window === 'undefined'
    ? false
    : window.location.href.includes('#comment-')

  return (
    <div className="relative">
      {/* TODO: if (isRevisionView) don't show AuthorTools and Comments*/}
      <StaticSolutionRenderer
        beforeSlot={
          <>
            {context?.license ? (
              <div className="absolute right-0 z-20">
                <ExerciseLicenseNotice data={context.license} />
              </div>
            ) : null}
            {loaded && auth && context?.uuid ? (
              <div className="absolute -right-8 top-0 z-20">
                <AuthorToolsExercises
                  data={{
                    type: ExerciseInlineType.Solution,
                    id: context?.uuid,
                    parentId: context?.exerciseId,
                    trashed: context?.trashed,
                    unrevisedRevisions: context?.unrevisedRevisions,
                  }}
                />
              </div>
            ) : null}
          </>
        }
        // TODO: check how this was set before
        solutionVisibleOnInit={solutionVisibleOnInit}
        {...props}
        afterSlot={
          context?.uuid ? (
            <Lazy>
              <CommentAreaEntity entityId={context.uuid} />
            </Lazy>
          ) : null
        }
        onSolutionOpen={() => {
          if (entityId && revisionId)
            exerciseSubmission(
              {
                path: asPath,
                entityId,
                revisionId,
                type: 'text',
                result: 'open',
              },
              ab
            )
        }}
      />
    </div>
  )
}
