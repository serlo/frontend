import { SolutionRenderer } from './renderer'
import { isEmptyRowsDocument } from '../rows/utils/static-is-empty'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { Link } from '@/components/content/link'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorSolutionPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// TODO: Commented out frontend specific stuff…

export function StaticSolutionRenderer({
  state,
  solutionVisibleOnInit,
  beforeSlot,
  afterSlot,
  onSolutionOpen,
}: EditorSolutionPlugin & {
  solutionVisibleOnInit: boolean
  afterSlot?: JSX.Element | null
  beforeSlot?: JSX.Element | null
  onSolutionOpen?: () => void
}) {
  const { prerequisite, strategy, steps } = state

  const hasPrerequisite =
    prerequisite && prerequisite.id && prerequisite.title.length
  const prerequisiteElement = hasPrerequisite ? (
    <Link href={prerequisite.alias ?? `/${prerequisite.id}`}>
      {prerequisite.title}
    </Link>
  ) : null

  const strategyElement = isEmptyTextDocument(strategy) ? null : (
    <StaticRenderer document={strategy} />
  )

  // don't show empty solutions
  if (isEmptyRowsDocument(steps) && !strategyElement) return null

  return (
    <SolutionRenderer
      prerequisite={prerequisiteElement}
      strategy={strategyElement}
      steps={
        <>
          <StaticRenderer document={steps} />
          {afterSlot}
        </>
      }
      solutionVisibleOnInit={solutionVisibleOnInit}
      elementBeforePrerequisite={beforeSlot}
      onSolutionOpen={onSolutionOpen}
    />
  )
}
