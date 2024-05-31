import { StaticSolutionRenderer } from '@editor/plugins/solution/static'
import type { EditorSolutionDocument } from '@editor/types/editor-plugins'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import type { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import { FaIcon } from '@/components/fa-icon'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { useAB } from '@/contexts/ab'
import { ExerciseIdsContext } from '@/contexts/exercise-ids-context'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useEntityData } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

// Special version for serlo.org with author tools and comments
export function SolutionSerloStaticRenderer(props: EditorSolutionDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const commentStrings = useInstanceData().strings.comments
  const isRevisionView = useContext(RevisionViewContext)

  const { entityId } = useEntityData()
  const { exerciseTrackingId, isInExerciseGroup, hasEntityId } =
    useContext(ExerciseIdsContext)

  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

  if (isPrintMode && !printModeSolutionVisible) return null

  const solutionVisibleOnInit = isRevisionView
    ? true
    : isPrintMode
      ? printModeSolutionVisible
      : typeof window === 'undefined'
        ? false
        : !isInExerciseGroup && window.location.href.includes('#comment-')

  function onSolutionOpen() {
    exerciseSubmission(
      {
        path: asPath,
        entityId: exerciseTrackingId,
        type: 'text',
        result: 'open',
        revisionId,
      },
      ab,
      trackExperiment
    )
  }

  return (
    <div className="relative">
      <StaticSolutionRenderer
        {...props}
        solutionVisibleOnInit={solutionVisibleOnInit}
        afterSlot={renderCommentSection()}
        onSolutionOpen={onSolutionOpen}
      />
    </div>
  )

  // @@@ Rename to renderCommentSection ?
  function renderCommentSection() {
    if (isRevisionView || !entityId) return null

    if (hasEntityId) {
      return (
        <Lazy>
          <CommentAreaEntity entityId={entityId} />
        </Lazy>
      )
    }

    // const exerciseId = exerciseContext?.exerciseEntityId
    // const exerciseEntityId = exerciseGroupId ?? exerciseId

    // const isExerciseEntityInInjectionOrTaxonomy =
    //   exerciseId && exerciseId !== entityId

    // if (isExerciseEntityInInjectionOrTaxonomy) {
    //   if (!exerciseEntityId) return null
    //   return (
    //     <Lazy>
    //       <CommentAreaEntity entityId={entityId} />
    //     </Lazy>
    //   )
    // }

    // In exerciseGroup navigate to its url. Otherwise only scroll to comment section.
    const linkPrefix = isInExerciseGroup ? `${entityId}/` : ''
    const onlyScroll = !linkPrefix
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
            href={`${linkPrefix}#comment-area-begin-scrollpoint`}
            className="serlo-button-light"
          >
            {commentStrings.questionLink} {onlyScroll ? '👇' : '👉'}
          </a>
        </p>
      </>
    )
  }
}
