import * as R from 'ramda'

import {
  child,
  ChildStateType,
  ChildStateTypeConfig,
  EditorPlugin,
  EditorPluginProps,
  list,
  ListStateType,
} from '../../plugin'
import { RowsEditor } from './components/rows-editor'

export function createRowsPlugin(
  config: RowsConfig
): EditorPlugin<RowsPluginState, RowsConfig> {
  const { content } = config

  return {
    Component: RowsEditor,
    config,
    state: list(child(content), 1),
    insertChild(state, { previousSibling, document }) {
      const index = getIndexToInsert()
      if (index === null) return
      state.insert(index, document)

      function getIndexToInsert(): number | null {
        if (!previousSibling) return 0
        const index = R.findIndex(
          (sibling) => sibling.id === previousSibling,
          state
        )
        if (index === -1) return null
        return index + 1
      }
    },

    removeChild(state, id) {
      const index = R.findIndex((child) => child.id === id, state)
      if (index === -1) return
      state.remove(index)
    },
  }
}

export interface RowsConfig extends Omit<RowsPluginConfig, 'theme'> {
  content: ChildStateTypeConfig
}

export type RowsPluginState = ListStateType<ChildStateType>

export interface RegistryPlugin {
  name: string
  title?: string
  icon?: React.ComponentType
  description?: string
}

export interface RowsPluginConfig {
  plugins: RegistryPlugin[]
}

export type RowsProps = EditorPluginProps<RowsPluginState, RowsConfig>

export * from './registry-context'
export * from './store'
