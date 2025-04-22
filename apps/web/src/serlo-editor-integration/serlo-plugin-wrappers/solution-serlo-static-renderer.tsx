import {
  type EditorSolutionDocument,
  StaticSolutionRenderer,
} from '@editor/package'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { lazy, Suspense, useContext } from 'react'

import { Lazy } from '@/components/content/lazy'
import { FaIcon } from '@/components/fa-icon'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { useEntityMetaData } from '@/contexts/entity-meta-context'
import { ExerciseContext } from '@/contexts/exercise-context'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'

const CommentAreaEntity = lazy(() =>
  import('@/components/comments/comment-area-entity').then((module) => ({
    default: module.CommentAreaEntity,
  }))
)

// Special version for serlo.org with author tools and comments
export function SolutionSerloStaticRenderer(props: EditorSolutionDocument) {
  const commentStrings = useInstanceData().strings.comments
  const isRevisionView = useContext(RevisionViewContext)
  const currentPath = useRouter().asPath

  const { entityId } = useEntityMetaData()
  const { isInExerciseGroup, isEntity } = useContext(ExerciseContext)

  if (isPrintMode && !printModeSolutionVisible) return null

  const solutionVisibleOnInit = isRevisionView
    ? true
    : isPrintMode
      ? printModeSolutionVisible
      : typeof window === 'undefined'
        ? false
        : !isInExerciseGroup && window.location.href.includes('#comment-')

  return (
    <div className="relative">
      <StaticSolutionRenderer
        {...props}
        solutionVisibleOnInit={solutionVisibleOnInit}
        afterSlot={renderCommentSection()}
      />
    </div>
  )

  function renderCommentSection() {
    if (isRevisionView || !entityId) return null

    // Exercise has its own entity ID
    if (isEntity) {
      return (
        <Lazy>
          <Suspense>
            <CommentAreaEntity entityId={entityId} />
          </Suspense>
        </Lazy>
      )
    }

    // if already on entity, just scroll down. Otherwise open entity in new tab.
    const onlyScroll = currentPath.includes(String(entityId))

    return (
      <>
        <h2 className="serlo-h2 mt-10 border-b-0">
          <FaIcon className="text-2xl text-brand-400" icon={faQuestionCircle} />{' '}
          {commentStrings.question}
        </h2>
        <p className="serlo-p">
          <a
            target={onlyScroll ? undefined : '_blank'}
            rel={onlyScroll ? undefined : 'noreferrer'}
            href={`/${entityId}#comment-area-begin-scrollpoint`}
            className="serlo-button-learner-secondary"
          >
            {commentStrings.questionLink} {onlyScroll ? '👇' : '👉'}
          </a>
        </p>
      </>
    )
  }
}
