import {
  EquationsRenderer,
  EquationsRendererStep,
} from '@/serlo-editor/plugins/equations/renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorEquationsPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function EquationsStaticRenderer({ state }: EditorEquationsPlugin) {
  const { steps, firstExplanation, transformationTarget } = state
  return (
    <EquationsRenderer
      firstExplanation={getFirstExplanation()}
      steps={getSteps()}
      transformationTarget={transformationTarget as 'equation' | 'term'}
      formulaRenderer={formulaRenderer}
    />
  )

  function getFirstExplanation() {
    // return hasContent(firstExplanation) ? (
    // TODO: check if has content
    return <StaticRenderer state={firstExplanation} />
    // ) : null
  }

  function getSteps(): EquationsRendererStep[] {
    // @ts-expect-error maybe update root type
    return steps.map((step) => {
      // TODO: hasContent(step.explanation) ? (
      const explanation = <StaticRenderer state={step.explanation} />
      return {
        ...step,
        explanation,
      }
    })
  }

  function formulaRenderer(formula: string) {
    return (
      <>{formula}</>
      // TODO: move renderSlate out of TextStaticRenderer
      // <TextStaticRenderer state={[{ type: FrontendNodeType.InlineMath, formula }]} />
    )
  }

  // function hasContent(content: FrontendContentNode[]): boolean {
  //   if (content[0]?.type === 'slate-container')
  //     return hasContent(content[0].children ?? [])
  //   return content.some(
  //     (node) => node?.children?.length || node.type === 'math'
  //   )
  // }
}
