import { StaticSolutionRenderer } from '@editor/plugins/solution/static'
import type { EditorSolutionDocument } from '@editor/types/editor-plugins'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { useAB } from '@/contexts/ab'
import { ExerciseIdsContext } from '@/contexts/exercise-ids-context'
import { useInstanceData } from '@/contexts/instance-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

// Special version for serlo.org with author tools and comments
export function SolutionSerloStaticRenderer(props: EditorSolutionDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const commentStrings = useInstanceData().strings.comments
  const isRevisionView = useContext(RevisionViewContext)

  const exerciseIds = useContext(ExerciseIdsContext)
  const exerciseGroupId = exerciseIds?.exerciseGroupEntityId

  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

  if (isPrintMode && !printModeSolutionVisible) return null

  const solutionVisibleOnInit = isRevisionView
    ? true
    : isPrintMode
      ? printModeSolutionVisible
      : typeof window === 'undefined'
        ? false
        : !exerciseGroupId && window.location.href.includes('#comment-')

  function onSolutionOpen() {
    exerciseSubmission(
      {
        path: asPath,
        entityId: exerciseIds?.exerciseTrackingId,
        type: 'text',
        result: 'open',
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
        afterSlot={renderCommentLink()}
        onSolutionOpen={onSolutionOpen}
      />
    </div>
  )

  function renderCommentLink() {
    if (isRevisionView) return null
    const exerciseId = exerciseIds?.exerciseEntityId
    const linkPrefix =
      exerciseGroupId || exerciseId ? `${exerciseGroupId ?? exerciseId}/` : ''

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
