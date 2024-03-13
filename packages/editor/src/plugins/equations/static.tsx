import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import {
  EquationsRenderer,
  EquationsRendererStep,
} from '@editor/plugins/equations/renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorEquationsDocument } from '@editor/types/editor-plugins'

import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function EquationsStaticRenderer({ state }: EditorEquationsDocument) {
  const { steps, firstExplanation, transformationTarget } = state
  const MathRenderer = editorRenderers.getMathRenderer()

  return (
    <EquationsRenderer
      firstExplanation={getFirstExplanation()}
      steps={getSteps()}
      transformationTarget={transformationTarget as 'equation' | 'term'}
      formulaRenderer={formulaRenderer}
    />
  )

  function getFirstExplanation() {
    return isEmptyTextDocument(firstExplanation) ? null : (
      <StaticRenderer document={firstExplanation} />
    )
  }

  function getSteps(): EquationsRendererStep[] {
    // @ts-expect-error maybe update root type
    return steps.map((step) => {
      const explanation = isEmptyTextDocument(step.explanation) ? null : (
        <StaticRenderer document={step.explanation} />
      )
      return {
        ...step,
        explanation,
      }
    })
  }

  function formulaRenderer(formula: string) {
    // eslint-disable-next-line react/no-children-prop
    return (
      <MathRenderer
        src={formula}
        type="math"
        inline
        // eslint-disable-next-line react/no-children-prop
        children={[{ text: '' }]}
      />
    )
  }
}
