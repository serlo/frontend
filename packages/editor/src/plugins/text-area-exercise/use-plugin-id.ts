import { useContext } from 'react'

import { TextAreaEditorContext } from './text-area-exercise-props-context'
import { TextAreaStaticRendererContext } from './text-area-static-renderer-context'

export function usePluginId() {
  const textAreaEditorContext = useContext(TextAreaEditorContext)
  const textAreaStaticRendererContext = useContext(
    TextAreaStaticRendererContext
  )
  const pluginId = textAreaEditorContext
    ? textAreaEditorContext.id
    : textAreaStaticRendererContext
      ? textAreaStaticRendererContext.id
      : null
  if (!pluginId) throw new Error('Text area context missing')

  return pluginId
}
