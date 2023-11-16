import { SolutionRenderer } from './renderer'
import { isEmptyRowsDocument } from '../rows/utils/static-is-empty'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import type { EditorSolutionDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function StaticSolutionRenderer({
  state,
  solutionVisibleOnInit,
  beforeSlot,
  afterSlot,
  onSolutionOpen,
  count,
}: EditorSolutionDocument & {
  solutionVisibleOnInit: boolean
  afterSlot?: JSX.Element | null
  beforeSlot?: JSX.Element | null
  onSolutionOpen?: () => void
  count?: number
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
      count={count}
    />
  )
}
