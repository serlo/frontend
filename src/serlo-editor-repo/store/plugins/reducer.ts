import { EditorPlugin } from '../../internal__plugin'
import { createSelector, createSubReducer, SubReducer } from '../helpers'

/** @internal */
export const pluginsReducer: SubReducer<Record<string, EditorPlugin>> =
  createSubReducer('plugins', {}, {})

/** @public */
export const getPlugins = createSelector((state) => state.plugins)
/** @public */
export const getPlugin = createSelector(
  (state, type: string): EditorPlugin | null => {
    const plugins = getPlugins()(state)
    return plugins[type] || null
  }
)
