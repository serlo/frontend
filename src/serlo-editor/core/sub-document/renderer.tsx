import * as R from 'ramda'
import { useRef } from 'react'

import type { SubDocumentProps } from '.'
import { selectDocument, useAppSelector } from '../../store'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'

export function SubDocumentRenderer({ id, pluginProps }: SubDocumentProps) {
  const document = useAppSelector((state) => selectDocument(state, id))
  const plugin = editorPlugins.getByType(document?.plugin ?? '')

  const focusRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  if (!document) return null
  if (!plugin) {
    // eslint-disable-next-line no-console
    console.warn('Plugin does not exist')
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const defaultConfig =
    typeof plugin.config === 'function' ? plugin.config() : plugin.config
  const overrideConfig = (pluginProps && pluginProps.config) || {}
  const config = R.mergeDeepRight(defaultConfig, overrideConfig)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pluginState = plugin.state.init(document.state, () => {})

  return (
    <plugin.Component
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state={pluginState}
      config={config}
      id={id}
      editable={false}
      domFocus={false}
      domFocusWithin={false}
      autofocusRef={focusRef}
    />
  )
}
