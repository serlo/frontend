import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import type { PluginsConfig } from '@editor/package/config'
import { blanksExercise } from '@editor/plugins/blanks-exercise'
import { createBoxPlugin } from '@editor/plugins/box'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
import { ImageConfig, createImagePlugin } from '@editor/plugins/image'
import { createInputExercisePlugin } from '@editor/plugins/input-exercise'
import { createMultimediaPlugin } from '@editor/plugins/multimedia'
import { createRowsPlugin } from '@editor/plugins/rows'
import { createScMcExercisePlugin } from '@editor/plugins/sc-mc-exercise'
import { createSerloTablePlugin } from '@editor/plugins/serlo-table'
import { genericContentTypePlugin } from '@editor/plugins/serlo-template-plugins/generic-content'
import { solutionPlugin } from '@editor/plugins/solution'
import { createSpoilerPlugin } from '@editor/plugins/spoiler'
import { createTextPlugin } from '@editor/plugins/text'
import { textAreaExercisePlugin } from '@editor/plugins/text-area-exercise'
import { unsupportedPlugin } from '@editor/plugins/unsupported'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

type CreateBasicPluginsConfig = Required<Omit<PluginsConfig, 'image'>> & {
  image: CreateImagePluginConfig
}

export function createBasicPlugins(config: CreateBasicPluginsConfig) {
  return [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
      visibleInSuggestions: true,
      icon: <IconText />,
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(createMultimediaPluginConfig(config)),
      visibleInSuggestions: true,
      icon: <IconMultimedia />,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin(config.spoiler),
      visibleInSuggestions: true,
      icon: <IconSpoiler />,
    },
    {
      type: EditorPluginType.Equations,
      plugin: equationsPlugin,
      visibleInSuggestions: true,
      icon: <IconEquation />,
    },
    {
      type: EditorPluginType.Box,
      plugin: createBoxPlugin(config.box),
      visibleInSuggestions: true,
      icon: <IconBox />,
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin(config.table),
      visibleInSuggestions: true,
      icon: <IconTable />,
    },
    {
      type: EditorPluginType.Geogebra,
      plugin: geoGebraPlugin,
      visibleInSuggestions: true,
      icon: <IconGeogebra />,
    },
    {
      type: EditorPluginType.Highlight,
      plugin: createHighlightPlugin(),
      visibleInSuggestions: true,
      icon: <IconHighlight />,
    },
    // Image plugin will have the `validate` prop by default, but if the user
    // didn't provide the `upload` prop, Image plugin will not be created
    ...(hasImagePluginConfigUploadPropertyDefined(config.image)
      ? [
          {
            type: EditorPluginType.Image,
            plugin: createImagePlugin(config.image),
            visibleInSuggestions: true,
            icon: <IconImage />,
          },
        ]
      : []),

    // Exercises etc.
    // ===================================================
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
      visibleInSuggestions: config.general.exerciseVisibleInSuggestion,
    },
    ...(config.general.enableTextAreaExercise
      ? [
          {
            type: EditorPluginType.TextAreaExercise,
            plugin: textAreaExercisePlugin,
            visibleInSuggestions: false,
          },
        ]
      : []),
    { type: EditorPluginType.Solution, plugin: solutionPlugin },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin(),
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: createScMcExercisePlugin(),
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: blanksExercise,
    },

    // Special plugins, never visible in suggestions
    // ===================================================
    { type: EditorPluginType.Rows, plugin: createRowsPlugin() },
    { type: EditorPluginType.Unsupported, plugin: unsupportedPlugin },
    {
      type: TemplatePluginType.GenericContent,
      plugin: genericContentTypePlugin,
    },
  ]
}

interface CreateImagePluginConfig {
  disableFileUpload?: ImageConfig['disableFileUpload']
  upload?: ImageConfig['upload']
  validate: ImageConfig['validate']
}

function hasImagePluginConfigUploadPropertyDefined(
  imagePluginConfig: CreateImagePluginConfig
): imagePluginConfig is ImageConfig {
  return imagePluginConfig.upload !== undefined
}

function createMultimediaPluginConfig(config: CreateBasicPluginsConfig) {
  const { image, multimedia } = config

  return {
    ...multimedia,
    allowedPlugins: multimedia.allowedPlugins.filter((allowedPlugin) => {
      if (
        // If the user didn't provide the `upload` prop for the Image plugin,
        // remove the Image plugin from Multimedia config allowed plugins
        allowedPlugin === EditorPluginType.Image &&
        !hasImagePluginConfigUploadPropertyDefined(image)
      ) {
        return false
      }
      return true
    }),
  }
}
