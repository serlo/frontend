import { SolutionRenderer } from './renderer'
import { isEmptyTextPlugin } from '../text/utils/static-is-empty'
import { Link } from '@/components/content/link'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorSolutionPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// TODO: Commented out frontend specific stuff…

export function StaticSolutionRenderer({
  state,
  solutionVisibleOnInit,
  beforeSlot,
  afterSlot,
}: EditorSolutionPlugin & {
  solutionVisibleOnInit: boolean
  afterSlot?: JSX.Element | null
  beforeSlot?: JSX.Element | null
}) {
  const { prerequisite, strategy, steps } = state

  const hasPrerequisite =
    prerequisite && prerequisite.id && prerequisite.title.length
  const prerequisiteElement = hasPrerequisite ? (
    <Link href={prerequisite.alias ?? `/${prerequisite.id}`}>
      {prerequisite.title}
    </Link>
  ) : null

  const strategyElement = isEmptyTextPlugin(strategy) ? null : (
    <StaticRenderer state={strategy} />
  )

  return (
    <SolutionRenderer
      prerequisite={prerequisiteElement}
      strategy={strategyElement}
      steps={
        <>
          <StaticRenderer state={steps} />
          {afterSlot}
        </>
      }
      solutionVisibleOnInit={solutionVisibleOnInit}
      elementBeforePrerequisite={beforeSlot}
    // hideToggle={
    //   !node.solution.content ||
    //   node.solution.trashed ||
    //   (isPrintMode && !printModeSolutionVisible)
    // }
    // onSolutionOpen={() =>
    //   exerciseSubmission(
    //     {
    //       path: asPath,
    //       entityId: node.context.id,
    //       revisionId: node.context.revisionId,
    //       type: 'text',
    //       result: 'open',
    //     },
    //     ab
    //   )
    // }
    />
  )
}
