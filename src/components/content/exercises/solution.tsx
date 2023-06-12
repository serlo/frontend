import { useInstanceData } from '@/contexts/instance-context'
import {
  FrontendContentNode,
  FrontendNodeType,
  FrontendSolutionNode,
} from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export interface SolutionProps {
  node: FrontendSolutionNode['solution']
  renderNested: RenderNestedFunction
}

export function Solution({ node, renderNested }: SolutionProps) {
  const { strings } = useInstanceData()
  return <>{renderNested(getSolutionContent(), 'sol')}</>

  function getSolutionContent(): FrontendContentNode[] {
    if (node.legacy) {
      return node.legacy
    }
    if (!node.edtrState) return []
    const state = node.edtrState
    const prereq: FrontendContentNode[] = []
    if (state.prerequisite && state.prerequisite.id) {
      prereq.push({
        type: FrontendNodeType.P,
        children: [
          {
            type: FrontendNodeType.Text,
            text: `${strings.content.exercises.prerequisite} `,
          },
          {
            type: FrontendNodeType.A,
            href:
              state.prerequisite.href ?? `/${state.prerequisite.id.toString()}`, // for revisions
            children: [
              { type: FrontendNodeType.Text, text: state.prerequisite.title },
            ],
          },
        ],
      })
    }

    // quickfix for solution strategy
    const strategy: FrontendContentNode[] =
      state.strategy.length > 0
        ? [
            {
              type: FrontendNodeType.Important,
              children: [
                {
                  type: FrontendNodeType.P,
                  children: [
                    {
                      type: FrontendNodeType.Text,
                      text: strings.content.exercises.strategy,
                      strong: true,
                    },
                  ],
                },
                ...state.strategy,
              ],
            },
          ]
        : []

    const steps = state.steps
    return [...prereq, ...strategy, ...steps]
  }
}
