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

const defaultConfig = {
  content: { plugin: 'text' },
  parentType: 'root',
}

export function createRowsPlugin(
  config = defaultConfig
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
        const index = state.findIndex(({ id }) => id === previousSibling)
        return index === -1 ? null : index + 1
      }
    },

    removeChild(state, childId) {
      const index = state.findIndex(({ id }) => id === childId)
      if (index === -1) return
      state.remove(index)
    },
  }
}

export interface RowsConfig extends Omit<RowsPluginConfig, 'theme'> {
  content: ChildStateTypeConfig
}

export type RowsPluginState = ListStateType<ChildStateType>

export interface RowsPluginConfig {
  allowedPlugins?: string[]
  parentType: string
}

export type RowsProps = EditorPluginProps<RowsPluginState, RowsConfig>

export * from './allowed-child-plugins-context'
export * from './store'
