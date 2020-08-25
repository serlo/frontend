import React from 'react'

import { renderArticle } from '../../../schema/article-renderer'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendContentNode, FrontendSolutionNode } from '@/data-types'

export interface SolutionProps {
  node: FrontendSolutionNode['solution']
}

export function Solution({ node }: SolutionProps) {
  console.log('solution here.')
  const { strings } = useInstanceData()

  return <>{renderArticle(getSolutionContent(), false)}</>

  function getSolutionContent(): FrontendContentNode[] {
    if (node.legacy) {
      return node.legacy
    }
    if (!node.edtrState) return []
    const state = node.edtrState
    const prereq: FrontendContentNode[] = []
    if (state.prerequisite && state.prerequisite.href) {
      prereq.push({
        type: 'p',
        children: [
          { type: 'text', text: `${strings.content.prerequisite} ` },
          {
            type: 'a',
            href: state.prerequisite.href,
            children: [{ type: 'text', text: state.prerequisite.title }],
          },
        ],
      })
    }
    const strategy = state.strategy
    const steps = state.steps
    return [...prereq, ...strategy, ...steps]
  }
}
