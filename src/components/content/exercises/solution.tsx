import type { RenderNestedFunction } from '../../../schema/article-renderer'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendContentNode, FrontendSolutionNode } from '@/data-types'

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
        type: 'p',
        children: [
          { type: 'text', text: `${strings.content.prerequisite} ` },
          {
            type: 'a',
            href:
              state.prerequisite.href ?? `/${state.prerequisite.id.toString()}`, // for revisions
            children: [{ type: 'text', text: state.prerequisite.title }],
          },
        ],
      })
    }

    // quickfix for solution strategy
    const strategy: FrontendContentNode[] =
      state.strategy.length > 0
        ? [
            {
              type: 'important',
              children: [
                {
                  type: 'p',
                  children: [
                    {
                      type: 'text',
                      text: strings.content.strategy,
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
