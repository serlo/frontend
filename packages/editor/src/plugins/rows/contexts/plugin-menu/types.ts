import { EditorPluginType } from '@editor/types/editor-plugin-type'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum PluginMenuActionTypes {
  OPEN = 'OPEN',
  OPEN_WITH_SLASH_KEY = 'OPEN_WITH_SLASH_KEY',
  CLOSE = 'CLOSE',
}

interface PluginMenuPayload {
  [PluginMenuActionTypes.OPEN]: {
    insertIndex: number | undefined
  }
  [PluginMenuActionTypes.OPEN_WITH_SLASH_KEY]: {
    insertIndex: number | undefined
    onInsertComplete: () => void
  }
  [PluginMenuActionTypes.CLOSE]: undefined
}

export type PluginMenuActions =
  ActionMap<PluginMenuPayload>[keyof ActionMap<PluginMenuPayload>]

export interface PluginMenuState {
  allowedChildPlugins: string[] | undefined
  showPluginMenu: boolean
  insertIndex: number | undefined
  onInsertComplete: (() => void) | undefined
}

export interface PluginMenuItemType {
  pluginType: EditorPluginType
  title: string
  description?: string
  icon?: JSX.Element
}
