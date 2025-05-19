import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { RowsEditor } from './editor'
import {
  type EditorPlugin,
  type EditorPluginProps,
  child,
  list,
} from '../../plugin'

const rowsState = list(child({ plugin: EditorPluginType.Text }), 1)

export const rowsPlugin: EditorPlugin<RowsPluginState, RowsPluginConfig> = {
  Component: RowsEditor,
  state: rowsState,
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

export type RowsPluginState = typeof rowsState

export interface RowsPluginConfig {
  allowedPlugins?: (EditorPluginType | string)[]
  textPluginPlaceholder?: string
}

export type RowsProps = EditorPluginProps<RowsPluginState, RowsPluginConfig>

export * from './store'
