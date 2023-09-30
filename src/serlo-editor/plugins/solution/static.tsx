import { SolutionRenderer } from './renderer'
import { isEmptyRowsPlugin } from '../rows/utils/static-is-empty'
import { Link } from '@/components/content/link'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorSolutionPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// TODO: All frontend specific stuff…

export function StaticSolutionRenderer({
  state,
  solutionVisibleOnInit,
}: EditorSolutionPlugin & { solutionVisibleOnInit: boolean }) {
  const { prerequisite, strategy, steps } = state

  const hasPrerequisite =
    prerequisite && prerequisite.alias && prerequisite.title.length
  const prerequisiteElement = hasPrerequisite ? (
    <Link href={`/${prerequisite.alias}`}>{prerequisite.title}</Link>
  ) : null

  const strategyElement = isEmptyRowsPlugin(strategy) ? null : (
    <StaticRenderer state={strategy} />
  )

  return (
    <SolutionRenderer
      prerequisite={prerequisiteElement}
      strategy={strategyElement}
      steps={
        <>
          <StaticRenderer state={steps} />
          {/* {license && <div className="px-side">{license}</div>} */}
          {/* {node.context.solutionId && (
            <Lazy>
              <CommentAreaEntity entityId={node.context.solutionId} />
            </Lazy>
          )} */}
        </>
      }
      solutionVisibleOnInit={solutionVisibleOnInit}
      // elementAfterToggle={renderLicense()}
      // elementBeforePrerequisite={
      //   authorTools ? (
      //     <div className="-mt-2 text-right">{authorTools}</div>
      //   ) : null
      // }
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
