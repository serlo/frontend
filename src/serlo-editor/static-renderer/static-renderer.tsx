import { Fragment } from 'react'

import { editorRenderers } from '../plugin/helpers/editor-renderer'
import { AnyEditorPlugin } from '@/serlo-editor-integration/types/editor-plugins'

interface StaticRendererProps {
  state?: AnyEditorPlugin | AnyEditorPlugin[]
}

/**
 * StaticRenderer expects serialzied plugin states and renders them.
 * Compared to the edit mode this renderer should have a small bundle size
 */
export function StaticRenderer({
  state,
}: StaticRendererProps): JSX.Element | null {
  if (!state) return null

  if (Array.isArray(state)) {
    return (
      <>
        {state.map((item, index) => {
          if (!item) return null
          return (
            <Fragment key={item.id ?? `${item.plugin}${index}`}>
              <StaticRenderer state={item} />
            </Fragment>
          )
        })}
      </>
    )
  }

  const Renderer = editorRenderers.getByType(state.plugin)

  if (!Renderer) return null

  return <Renderer {...state} />
}
