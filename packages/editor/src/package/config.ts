import type { PluginWithData } from '@editor/plugin/helpers/editor-plugins'
import type { PluginStaticRenderer } from '@editor/plugin/helpers/editor-renderer'
import type { MultimediaConfig } from '@editor/plugins/multimedia'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { SupportedLanguage } from '@editor/types/language-data'

interface BasicPluginsConfig {
  allowedChildPlugins?: string[]
  allowImageInTableCells?: boolean
  enableTextAreaExercise?: boolean
  exerciseVisibleInSuggestion?: boolean
  multimediaConfig?: MultimediaConfig
}

// Custom plugins and renderers are an Edusharing specific feature,
// and will not be supported in the future
export interface PluginsConfig {
  basicPluginsConfig?: BasicPluginsConfig
  customPlugins?: Array<PluginWithData & PluginStaticRenderer>
}

export const defaultBasicPluginConfig: Omit<
  Required<BasicPluginsConfig>,
  'multimediaConfig'
> = {
  allowedChildPlugins: [],
  allowImageInTableCells: true,
  enableTextAreaExercise: false,
  exerciseVisibleInSuggestion: true,
}

export const defaultPluginsConfig: Required<PluginsConfig> = {
  basicPluginsConfig: defaultBasicPluginConfig,
  customPlugins: [],
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
  initialState: emptyDocumentState,
  language: 'de' as SupportedLanguage,
}
