import { Link } from '../link'
import { FrontendSolutionNode } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'
import { SolutionRenderer } from '@/serlo-editor/plugins/solution/renderer'

export interface SolutionProps {
  node: FrontendSolutionNode['solution']
  renderNested: RenderNestedFunction
}

export function Solution({ node, renderNested }: SolutionProps) {
  const solutionContent = getSolutionContent()
  if (!solutionContent) return null
  const { prerequisite, strategy, steps } = solutionContent

  return (
    <SolutionRenderer
      prerequisite={
        prerequisite ? (
          <Link href={prerequisite.href}>{prerequisite.title}</Link>
        ) : null
      }
      strategy={<>{renderNested(strategy)}</>}
      steps={<>{renderNested(steps)}</>}
    />
  )

  // simplify after migration
  function getSolutionContent() {
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
}
