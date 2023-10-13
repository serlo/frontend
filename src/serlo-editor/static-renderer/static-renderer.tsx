import { Fragment } from 'react'

import { editorRenderers } from '../plugin/helpers/editor-renderer'
import {
  AnyEditorDocument,
  ExerciseWithSolution,
} from '@/serlo-editor-integration/types/editor-plugins'

interface StaticRendererProps {
  document?: AnyEditorDocument | AnyEditorDocument[] | ExerciseWithSolution
}

/**
 * StaticRenderer expects a serialzied document and renders it.
 * Compared to the edit mode this renderer should have a small bundle size
 */
export function StaticRenderer({
  document,
}: StaticRendererProps): JSX.Element | null {
  if (!document) return null

  if (Array.isArray(document)) {
    return (
      <>
        {document.map((item, index) => {
          if (!item) return null
          return (
            <Fragment key={item.id ?? `${item.plugin}${index}`}>
              <StaticRenderer document={item} />
            </Fragment>
          )
        })}
      </>
    )
  }

  if (!Object.hasOwn(document, 'plugin')) {
    return (
      <>
        <StaticRenderer document={document.exercise} />
        <StaticRenderer document={document.solution} />
      </>
    )
  }

  const Renderer = editorRenderers.getByType(document.plugin)

  return Renderer ? <Renderer {...document} /> : null
}
