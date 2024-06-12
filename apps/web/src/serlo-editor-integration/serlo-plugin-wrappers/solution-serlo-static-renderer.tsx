import { StaticSolutionRenderer } from '@editor/plugins/solution/static'
import type { EditorSolutionDocument } from '@editor/types/editor-plugins'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import type { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { useAB } from '@/contexts/ab'
import { ExerciseGroupIdContext } from '@/contexts/exercise-group-id-context'
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
  const exerciseGroupId = useContext(ExerciseGroupIdContext)
  const context = props.serloContext

  const { entityId: exerciseUuid, revisionId } = useEntityData()
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)

  if (isPrintMode && !printModeSolutionVisible) return null

  const solutionVisibleOnInit = isRevisionView
    ? true
    : isPrintMode
      ? printModeSolutionVisible
      : typeof window === 'undefined'
        ? false
        : !exerciseGroupId && window.location.href.includes('#comment-')

  const afterSlot =
    isRevisionView || !exerciseUuid ? null : exerciseGroupId ? (
      <>
        <h2 className="serlo-h2 mt-10 border-b-0">
          <FaIcon className="text-2xl text-brand-400" icon={faQuestionCircle} />{' '}
          {commentStrings.question}
        </h2>
        <p className="serlo-p">
          <Link
            href={`${exerciseGroupId}/#comment-area-begin-scrollpoint`}
            className="serlo-button-light"
          >
            {commentStrings.questionLink} 👇
          </Link>
        </p>
      </>
    ) : (
      <Lazy>
        <CommentAreaEntity entityId={exerciseUuid} />
      </Lazy>
    )

  function onSolutionOpen() {
    exerciseSubmission(
      {
        path: asPath,
        entityId: context?.exerciseId ?? exerciseUuid,
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
        afterSlot={afterSlot}
        onSolutionOpen={onSolutionOpen}
      />
    </div>
  )
}
