import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { MultimediaEditor } from './editor'
import {
  type ChildStateTypeConfig,
  type EditorPlugin,
  type EditorPluginProps,
  boolean,
  child,
  number,
  object,
} from '../../plugin'
import { TemplatePluginType } from '@editor/package'

export const defaultConfig: MultimediaConfig = {
  allowedPlugins: [EditorPluginType.Image, EditorPluginType.Geogebra],
  explanation: {
    plugin: EditorPluginType.Rows,
    config: {
      allowedPlugins: [EditorPluginType.Text],
    },
  },
}

function createMultimediaState(config: MultimediaConfig) {
  const { allowedPlugins, explanation } = config
  return object({
    explanation: child(explanation),
    multimedia: child({ plugin: allowedPlugins[0] }),
    illustrating: boolean(true),
    width: number(50), // percent
  })
}

export function createMultimediaPlugin(
  config = defaultConfig
): EditorPlugin<MultimediaPluginState, MultimediaConfig> {
  return {
    Component: MultimediaEditor,
    config,
    state: createMultimediaState(config),
  }
}

export type MultimediaPluginState = ReturnType<typeof createMultimediaState>

export interface MultimediaConfig {
  allowedPlugins: (EditorPluginType | TemplatePluginType)[]
  explanation: ChildStateTypeConfig
}

export type MultimediaProps = EditorPluginProps<
  MultimediaPluginState,
  MultimediaConfig
>
