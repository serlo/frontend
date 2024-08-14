import {
  PluginMenuActionTypes,
  type PluginMenuActions,
  type PluginMenuState,
} from './types'

export const pluginMenuReducer = (
  state: PluginMenuState,
  action: PluginMenuActions
) => {
  switch (action.type) {
    case PluginMenuActionTypes.OPEN:
      return {
        ...state,
        showPluginMenu: true,
        insertIndex: action.payload.insertIndex,
      }
    case PluginMenuActionTypes.OPEN_WITH_SLASH_KEY:
      return {
        ...state,
        showPluginMenu: true,
        insertIndex: action.payload.insertIndex,
        onInsertComplete: action.payload.onInsertComplete,
      }
    case PluginMenuActionTypes.CLOSE:
      return {
        ...state,
        showPluginMenu: false,
        insertIndex: undefined,
        onInsertComplete: undefined,
      }
  }
}