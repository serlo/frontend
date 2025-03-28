import {
  EquationsRenderer,
  EquationsRendererStep,
} from '@editor/plugins/equations/renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import type { EditorEquationsDocument } from '@editor/types/editor-plugins'
import { lazy, Suspense } from 'react'

import { isEmptyTextDocument } from '../text/utils/static-is-empty'

const StaticMath = lazy(() =>
  import('../text/static-components/static-math').then((module) => ({
    default: module.StaticMath,
  }))
)

export function EquationsStaticRenderer({ state }: EditorEquationsDocument) {
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
    return (
      <Suspense>
        <StaticMath src={formula} type="math" inline />
      </Suspense>
    )
  }
}
