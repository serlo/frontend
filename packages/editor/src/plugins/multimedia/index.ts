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
import { TemplatePluginType } from '../../types/template-plugin-type'

const possiblePlugins = [
  EditorPluginType.Image,
  EditorPluginType.EdusharingAsset,
  EditorPluginType.Video,
  EditorPluginType.Audio,
  EditorPluginType.Geogebra,
]

const explanation = {
  plugin: EditorPluginType.Rows,
  config: {
    allowedPlugins: [EditorPluginType.Text],
  },
}

function createMultimediaState(allowedPlugins: EditorPluginType[]) {
  return object({
    explanation: child(explanation),
    multimedia: child({ plugin: allowedPlugins[0] }),
    illustrating: boolean(true),
    width: number(50), // percent
  })
}

export function createMultimediaPlugin(
  plugins: (EditorPluginType | TemplatePluginType)[]
): EditorPlugin<MultimediaPluginState, MultimediaConfig> {
  const allowedPlugins = possiblePlugins.filter((pluginType) =>
    plugins.includes(pluginType)
  )

  return {
    Component: MultimediaEditor,
    config: {
      allowedPlugins,
      explanation,
    },
    state: createMultimediaState(allowedPlugins),
  }
}

export function createArticleIntroduction(placeholder: string) {
  return {
    Component: MultimediaEditor,
    config: {
      allowedPlugins: [EditorPluginType.Image],
      explanation: {
        plugin: EditorPluginType.Text,
        config: { placeholder },
      },
    },
    state: object({
      explanation: child({ plugin: EditorPluginType.Text }),
      multimedia: child({ plugin: EditorPluginType.Image }),
      illustrating: boolean(true),
      width: number(50), // percent
    }),
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
