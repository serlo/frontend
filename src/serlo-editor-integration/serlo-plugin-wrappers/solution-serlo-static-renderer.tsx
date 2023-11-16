import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import type { EditorSolutionDocument } from '../types/editor-plugins'
import type { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { useAB } from '@/contexts/ab'
import { useExerciseFolderStats } from '@/contexts/exercise-folder-stats-context'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { useEntityId } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { StaticSolutionRenderer } from '@/serlo-editor/plugins/solution/static'

const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

// Special version for serlo.org with author tools, comments and license
export function SolutionSerloStaticRenderer(props: EditorSolutionDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const isRevisionView = useContext(RevisionViewContext)
  const context = props.serloContext
  const exerciseData = useExerciseFolderStats()

  const entry = exerciseData?.data[context!.exerciseId!]

  const count = entry?.solutionOpen

  const exerciseUuid = useEntityId()

  if (isPrintMode && !printModeSolutionVisible) return null

  const solutionVisibleOnInit = isRevisionView
    ? true
    : isPrintMode
    ? printModeSolutionVisible
    : typeof window === 'undefined'
    ? false
    : window.location.href.includes('#comment-')

  const afterSlot =
    exerciseUuid && !isRevisionView ? (
      <Lazy>
        <CommentAreaEntity entityId={exerciseUuid} />
      </Lazy>
    ) : null

  function onSolutionOpen() {
    {
      exerciseSubmission(
        {
          path: asPath,
          entityId: context?.exerciseId,
          type: 'text',
          result: 'open',
        },
        ab
      )
    }
  }

  return (
    <div className="relative">
      <StaticSolutionRenderer
        {...props}
        solutionVisibleOnInit={solutionVisibleOnInit}
        afterSlot={afterSlot}
        onSolutionOpen={onSolutionOpen}
        count={count}
      />
    </div>
  )
}
