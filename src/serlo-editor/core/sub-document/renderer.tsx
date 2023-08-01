import * as R from 'ramda'
import { useRef } from 'react'

import { SubDocumentProps } from '.'
import { selectDocument, useAppSelector } from '../../store'
import { usePlugin } from '../contexts/plugins-context'
import { EditorPlugin } from '@/serlo-editor/types/internal__plugin'

export function SubDocumentRenderer({ id, pluginProps }: SubDocumentProps) {
  const document = useAppSelector((state) => selectDocument(state, id))
  const plugin = usePlugin(document?.plugin)?.plugin as EditorPlugin
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
      config={config}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state={pluginState}
      id={id}
      editable={false}
      focused={false}
      autofocusRef={focusRef}
      renderIntoSideToolbar={() => null}
    />
  )
}
