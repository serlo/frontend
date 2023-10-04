import { RowsEditor } from './editor'
import {
  type ChildStateTypeConfig,
  type EditorPlugin,
  type EditorPluginProps,
  child,
  list,
} from '../../plugin'
import { ROOT } from '@/serlo-editor/store/root/constants'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

function createRowsState(content: ChildStateTypeConfig) {
  return list(child(content), 1)
}

const defaultConfig = {
  content: { plugin: EditorPluginType.Text },
  parentType: ROOT,
}

export function createRowsPlugin(
  config = defaultConfig
): EditorPlugin<RowsPluginState, RowsConfig> {
  const { content } = config

  return {
    Component: RowsEditor,
    config,
    state: createRowsState(content),
    insertChild(state, { previousSibling, document }) {
      if (!previousSibling) {
        state.insert(0, document)
        return
      }
      const index = state.findIndex(({ id }) => id === previousSibling)
      if (index !== -1) state.insert(index + 1, document)
    },
    removeChild(state, childId) {
      const index = state.findIndex(({ id }) => id === childId)
      if (index !== -1) state.remove(index)
    },
  }
}

export interface RowsConfig extends RowsPluginConfig {
  content: ChildStateTypeConfig
}

export type RowsPluginState = ReturnType<typeof createRowsState>

export interface RowsPluginConfig {
  allowedPlugins?: (EditorPluginType | string)[]
  parentType: string
}

export type RowsProps = EditorPluginProps<RowsPluginState, RowsConfig>

export * from './allowed-child-plugins-context'
export * from './store'
