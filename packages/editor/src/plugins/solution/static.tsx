import { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorSolutionDocument } from '@editor/types/editor-plugins'

import { SolutionRenderer } from './renderer'
import { isEmptyRowsDocument } from '../rows/utils/static-is-empty'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function StaticSolutionRenderer({
  state,
  solutionVisibleOnInit,
  beforeSlot,
  afterSlot,
}: EditorSolutionDocument & {
  solutionVisibleOnInit: boolean
  afterSlot?: JSX.Element | null
  beforeSlot?: JSX.Element | null
}) {
  const { prerequisite, strategy, steps } = state

  const strategyElement = isEmptyTextDocument(strategy) ? null : (
    <StaticRenderer document={strategy} />
  )

  // don't show empty solutions
  if (isEmptyRowsDocument(steps) && !strategyElement) return null

  const hasPrerequisite =
    prerequisite && prerequisite.id && prerequisite.title?.length

  const LinkRenderer = editorRenderers.getLinkRenderer()

  const prerequisiteElement = hasPrerequisite ? (
    <LinkRenderer href={prerequisite.alias ?? `/${prerequisite.id}`}>
      <>{prerequisite.title}</>
    </LinkRenderer>
  ) : null

  function onSolutionOpen() {
    editorLearnerEvent.trigger?.({ contentType: 'solution', value: 'open' })
  }

  return (
    <SolutionRenderer
      prerequisite={prerequisiteElement}
      strategy={strategyElement}
      elementBeforePrerequisite={beforeSlot}
      steps={
        <>
          <StaticRenderer document={steps} />
          {afterSlot}
        </>
      }
      solutionVisibleOnInit={solutionVisibleOnInit}
      onSolutionOpen={onSolutionOpen}
    />
  )
}
