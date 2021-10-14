import { Renderer as Core, RendererProps } from '@edtr-io/renderer'
import * as React from 'react'

import { createPlugins } from './plugins'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function Renderer({ state }: { state: RendererProps['state'] }) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor
  const plugins = createPlugins({
    getCsrfToken: () => '',
    registry: [],
    editorStrings,
  })
  return <Core plugins={plugins} state={state || { plugin: 'text' }} />
}
