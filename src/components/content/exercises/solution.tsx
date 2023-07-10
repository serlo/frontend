import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { LicenseNotice } from '../license/license-notice'
import { Link } from '../link'
import { useAuthentication } from '@/auth/use-authentication'
import { CommentAreaEntityProps } from '@/components/comments/comment-area-entity'
import { Lazy } from '@/components/content/lazy'
import { isPrintMode, printModeSolutionVisible } from '@/components/print-mode'
import { AuthorToolsExercises } from '@/components/user-tools/foldout-author-menus/author-tools-exercises'
import { ExerciseInlineType } from '@/data-types'
import {
  FrontendExerciseNode,
  FrontendSolutionNode,
} from '@/frontend-node-types'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { RenderNestedFunction } from '@/schema/article-renderer'
import { SolutionRenderer } from '@/serlo-editor/plugins/solution/renderer'

const CommentAreaEntity = dynamic<CommentAreaEntityProps>(() =>
  import('@/components/comments/comment-area-entity').then(
    (mod) => mod.CommentAreaEntity
  )
)

export interface SolutionProps {
  node: FrontendExerciseNode
  loaded: boolean
  renderNested: RenderNestedFunction
}
export function Solution({ node, loaded, renderNested }: SolutionProps) {
  const { asPath } = useRouter()
  const auth = useAuthentication()
  const solutionVisibleOnInit = isPrintMode
    ? printModeSolutionVisible
    : typeof window === 'undefined'
    ? false
    : window.location.href.includes('#comment-')

  const license = node.solution.license && !node.solution.license.isDefault && (
    <LicenseNotice minimal data={node.solution.license} type="solution" />
  )
  const authorTools = loaded && auth && (
    <AuthorToolsExercises
      data={{
        type: ExerciseInlineType.Solution,
        id: node.context.solutionId!,
        parentId: node.context.id,
        grouped: node.grouped,
        unrevisedRevisions: node.unrevisedRevisions,
      }}
    />
  )

  const solutionContent = getSolutionContent({
    ...node.solution,
    trashed: !!node.solution.trashed,
  })

  if (!solutionContent) return null
  const { prerequisite, strategy, steps } = solutionContent

  return (
    <>
      <SolutionRenderer
        prerequisite={
          prerequisite ? (
            <Link href={prerequisite.href}>{prerequisite.title}</Link>
          ) : null
        }
        strategy={strategy.length ? <>{renderNested(strategy)}</> : null}
        steps={
          <>
            {renderNested(steps)}
            {license && <div className="px-side">{license}</div>}
            {node.context.solutionId && (
              <Lazy>
                <CommentAreaEntity entityId={node.context.solutionId} />
              </Lazy>
            )}
          </>
        }
        solutionVisibleOnInit={solutionVisibleOnInit}
        elementAfterToggle={renderLicense()}
        elementBeforePrerequisite={
          authorTools ? (
            <div className="-mt-2 text-right">{authorTools}</div>
          ) : null
        }
        hideToggle={
          (!node.solution.edtrState && !node.solution.legacy) ||
          node.solution.trashed ||
          (isPrintMode && !printModeSolutionVisible)
        }
        onSolutionOpen={() =>
          exerciseSubmission({
            path: asPath,
            entityId: node.context.id,
            revisionId: node.context.revisionId,
            type: 'text',
            result: 'open',
          })
        }
      />
    </>
  )

  function renderLicense() {
    if (!node.task.license) return null
    return <LicenseNotice minimal data={node.task.license} type="task" />
  }
}

// simplify after migration
function getSolutionContent(node: FrontendSolutionNode['solution']) {
  if (node.legacy)
    return { steps: node.legacy, strategy: [], prerequisite: undefined }
  if (!node.edtrState) return null

  const state = node.edtrState

  const prerequisite =
    state.prerequisite && state.prerequisite.id
      ? {
          href:
            state.prerequisite.href ?? `/${state.prerequisite.id.toString()}`, // for revisions
          title: state.prerequisite.title,
        }
      : undefined

  return { ...state, prerequisite }
}
