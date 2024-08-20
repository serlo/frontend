import type { AnyEditorDocument } from '@editor/types/editor-plugins'
import { Fragment } from 'react'

import { editorRenderers } from '../plugin/helpers/editor-renderer'

interface StaticRendererProps {
  document?: AnyEditorDocument | AnyEditorDocument[]
}

/**
 * StaticRenderer expects a serialized document and renders it.
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

  const Renderer = editorRenderers.getByType(document.plugin)

  return Renderer ? <Renderer {...document} /> : null
}
