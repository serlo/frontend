import * as R from 'ramda'
import * as React from 'react'

import { SubDocumentProps } from '.'
import { getDocument, getPlugin } from '../../store'
import { useScopedSelector } from '../store'

export function SubDocumentRenderer({ id, pluginProps }: SubDocumentProps) {
  const document = useScopedSelector(getDocument(id))
  const plugin = useScopedSelector(
    (state) => document && getPlugin(document.plugin)(state)
  )
  const focusRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  if (!document) return null
  if (!plugin) {
    // eslint-disable-next-line no-console
    console.log('Plugin does not exist')
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
      config={config}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state={pluginState}
      id={id}
      editable={false}
      focused={false}
      autofocusRef={focusRef}
      renderIntoSettings={() => null}
      renderIntoToolbar={() => null}
    />
  )
}
