import type { PluginWithData } from '@editor/plugin/helpers/editor-plugins'
import type { PluginStaticRenderer } from '@editor/plugin/helpers/editor-renderer'
import type { BoxConfig } from '@editor/plugins/box'
import {
  defaultConfig as defaultMultimediaConfig,
  type MultimediaConfig,
} from '@editor/plugins/multimedia'
import type { SerloTableConfig } from '@editor/plugins/serlo-table'
import type { SpoilerConfig } from '@editor/plugins/spoiler'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { SupportedLanguage } from '@editor/types/language-data'

export interface PluginsConfig {
  box?: BoxConfig
  multimedia?: MultimediaConfig
  spoiler?: SpoilerConfig
  table?: SerloTableConfig
  general?: {
    enableTextAreaExercise?: boolean
    exerciseVisibleInSuggestion?: boolean
  }
}

// Custom plugins and renderers are an Edusharing specific feature,
// and will not be supported in the future
export type CustomPlugin = PluginWithData & PluginStaticRenderer

const defaultPluginsConfig: Required<PluginsConfig> = {
  box: {
    allowedPlugins: [],
  },
  multimedia: defaultMultimediaConfig,
  spoiler: {
    allowedPlugins: [],
  },
  table: {
    allowImageInTableCells: true,
  },
  general: {
    exerciseVisibleInSuggestion: true,
    enableTextAreaExercise: false,
  },
}

export const emptyDocumentState = {
  plugin: EditorPluginType.Rows,
  state: [
    {
      plugin: EditorPluginType.Text,
      state: [],
    },
  ],
}

export const defaultSerloEditorProps = {
  pluginsConfig: defaultPluginsConfig,
  customPlugins: [],
  initialState: emptyDocumentState,
  language: 'de' as SupportedLanguage,
}
