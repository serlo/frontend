import { PluginMenuType } from '@editor/package/plugin-menu'
import type { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { AnyEditorDocument } from '@editor/types/editor-plugins'

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
    insertCallback: (plugin: AnyEditorDocument) => void
  }
  [PluginMenuActionTypes.CLOSE]: undefined
}

export type PluginMenuActions =
  ActionMap<PluginMenuPayload>[keyof ActionMap<PluginMenuPayload>]

export interface PluginMenuState {
  allowedChildPlugins: string[] | undefined
  parentPluginId: string
  showPluginMenu: boolean
  insertIndex: number | undefined
  insertCallback: ((plugin: AnyEditorDocument) => void) | undefined
}

export interface PluginMenuItemType {
  type: PluginMenuType
  pluginType: EditorPluginType
  title: string
  description?: string
  // until we use the editor package in the frontend (only having vite for building)
  // I'd like to keep this approach
  icon: string | (() => JSX.Element)
}
