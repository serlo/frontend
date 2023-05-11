import { EditorPlugin } from '../../internal__plugin'
import { createSelector, createSubReducer, SubReducer } from '../helpers'

export const pluginsReducer: SubReducer<Record<string, EditorPlugin>> =
  createSubReducer('plugins', {}, {})

export const getPlugins = createSelector((state) => state.plugins)
export const getPlugin = createSelector(
  (state, type: string): EditorPlugin | null => {
    const plugins = getPlugins()(state)
    return plugins[type] || null
  }
)
