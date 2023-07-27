import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import { RenderNestedFunction } from '@/schema/article-renderer'
import {
  EquationsRenderer,
  EquationsRendererStep,
} from '@/serlo-editor/plugins/equations/renderer'
import { Sign } from '@/serlo-editor/plugins/equations/sign'

export interface StepProps {
  left: string
  sign: Sign
  right: string
  transform: string
  explanation: FrontendContentNode[]
}

export interface EquationProps {
  steps: StepProps[]
  firstExplanation: FrontendContentNode[]
  transformationTarget: 'term' | 'equation'
  renderNested: RenderNestedFunction
}

export function Equations({
  steps,
  firstExplanation,
  renderNested,
  transformationTarget,
}: EquationProps) {
  return (
    <EquationsRenderer
      firstExplanation={getFirstExplanation()}
      steps={getSteps()}
      transformationTarget={transformationTarget}
      formulaRenderer={formulaRenderer}
    />
  )

  function getFirstExplanation() {
    return hasContent(firstExplanation) ? (
      <>{renderNested(firstExplanation, 'firstExplanation')}</>
    ) : null
  }

  function getSteps(): EquationsRendererStep[] {
    return steps.map((step, i) => {
      return {
        ...step,
        explanation: hasContent(step.explanation) ? (
          <>{renderNested(step.explanation, `step${i}`, 'explanation')}</>
        ) : null,
      }
    })
  }

  function formulaRenderer(formula: string) {
    return (
      <>
        {renderNested(
          [{ type: FrontendNodeType.InlineMath, formula }],
          `equation-step`
        )}
      </>
    )
  }

  function hasContent(content: FrontendContentNode[]): boolean {
    if (content[0]?.type === 'slate-container')
      return hasContent(content[0].children ?? [])
    return content.some(
      (node) => node?.children?.length || node.type === 'math'
    )
  }
}
