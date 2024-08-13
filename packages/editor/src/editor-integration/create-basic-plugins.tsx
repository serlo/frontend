import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg'
import type { PluginsConfig } from '@editor/package/config'
import { blanksExercise } from '@editor/plugins/blanks-exercise'
import { createBoxPlugin } from '@editor/plugins/box'
import { createDropzoneImagePlugin } from '@editor/plugins/dropzone-image'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
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
import { videoPlugin } from '@editor/plugins/video'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { createEdusharingAssetPlugin } from '@editor/plugins/edusharing-asset'
import { createSerloInjectionPlugin } from '@editor/plugins/serlo-injection'
import { SerloInjectionStaticRenderer } from '@editor/plugins/serlo-injection/static'

import { createTestingImagePlugin } from './image-with-testing-config'

export function createBasicPlugins(config: Required<PluginsConfig>) {
  return [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
      visibleInSuggestions: true,
      icon: <IconText />,
    },
    ...(config.general.testingSecret
      ? [
          {
            type: EditorPluginType.Image,
            plugin: createTestingImagePlugin(config.general.testingSecret),
            visibleInSuggestions: true,
            icon: <IconImage />,
          },
        ]
      : []),
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(createMultimediaPluginConfig(config)),
      visibleInSuggestions: true,
      icon: <IconMultimedia />,
    },
    {
      type: EditorPluginType.Video,
      plugin: videoPlugin,
      visibleInSuggestions: true,
      icon: <IconVideo />,
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
    ...(config.general.enablePlugins?.some(
      (type) => type === EditorPluginType.EdusharingAsset
    )
      ? [
          {
            type: EditorPluginType.EdusharingAsset,
            plugin: createEdusharingAssetPlugin({
              ltik: config.edusharingAsset.ltik,
            }),
            visibleInSuggestions: true,
            icon: <IconImage />,
          },
        ]
      : []),
    ...(config.general.enablePlugins?.some(
      (type) => type === EditorPluginType.SerloInjection
    )
      ? [
          {
            type: EditorPluginType.SerloInjection,
            plugin: createSerloInjectionPlugin(),
            renderer: SerloInjectionStaticRenderer,
            visibleInSuggestions: true,
            icon: <IconInjection />,
          },
        ]
      : []),

    // Exercises etc.
    // ===================================================
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
      visibleInSuggestions: true,
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
    {
      type: EditorPluginType.DropzoneImage,
      plugin: createDropzoneImagePlugin(),
      visibleInSuggestions: false,
      icon: <IconDropzones />,
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

function createMultimediaPluginConfig(config: Required<PluginsConfig>) {
  const { general, multimedia } = config

  return {
    ...multimedia,
    allowedPlugins: multimedia.allowedPlugins.filter((allowedPlugin) => {
      if (
        // If the user didn't provide the Serlo Editor testing secret,
        // remove the Image plugin from Multimedia config allowed plugins
        allowedPlugin === EditorPluginType.Image &&
        !general?.testingSecret
      ) {
        return false
      }
      return true
    }),
  }
}
