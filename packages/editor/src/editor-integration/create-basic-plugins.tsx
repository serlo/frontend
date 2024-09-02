import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import IconFillGaps from '@editor/editor-ui/assets/plugin-icons/icon-fill-the-gap.svg'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconPencil from '@editor/editor-ui/assets/plugin-icons/icon-pencil.svg'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import { blanksExercise } from '@editor/plugins/blanks-exercise'
import { createBoxPlugin } from '@editor/plugins/box'
import { createDropzoneImagePlugin } from '@editor/plugins/dropzone-image'
import { createEdusharingAssetPlugin } from '@editor/plugins/edusharing-asset'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
import { createInputExercisePlugin } from '@editor/plugins/input-exercise'
import { createMultimediaPlugin } from '@editor/plugins/multimedia'
import { createRowsPlugin } from '@editor/plugins/rows'
import { createScMcExercisePlugin } from '@editor/plugins/sc-mc-exercise'
import { createSerloInjectionPlugin } from '@editor/plugins/serlo-injection'
import { SerloInjectionStaticRenderer } from '@editor/plugins/serlo-injection/static'
import { createSerloTablePlugin } from '@editor/plugins/serlo-table'
import { genericContentTypePlugin } from '@editor/plugins/serlo-template-plugins/generic-content'
import { solutionPlugin } from '@editor/plugins/solution'
import { createSpoilerPlugin } from '@editor/plugins/spoiler'
import { createTextPlugin } from '@editor/plugins/text'
import { textAreaExercisePlugin } from '@editor/plugins/text-area-exercise'
import { unsupportedPlugin } from '@editor/plugins/unsupported'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { createTestingImagePlugin } from './image-with-testing-config'

export function createBasicPlugins(
  plugins: (EditorPluginType | TemplatePluginType)[],
  testingSecret?: string
) {
  if (plugins.includes(EditorPluginType.Image) && testingSecret === undefined) {
    /* eslint-disable no-console */
    console.log(
      'The image plugin needs the `testingSecret` but it is missing. Image plugin was disabled. Either provide it or deactivate the image plugin in the editor API.'
    )
    plugins = plugins.filter((plugin) => plugin !== EditorPluginType.Image)
  }

  const allPlugins = [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
      visibleInSuggestions: true,
      icon: <IconText />,
    },
    ...(testingSecret
      ? [
          {
            type: EditorPluginType.Image,
            plugin: createTestingImagePlugin(testingSecret),
            visibleInSuggestions: true,
            icon: <IconImage />,
          },
        ]
      : []),
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(plugins),
      visibleInSuggestions: true,
      icon: <IconMultimedia />,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin(plugins),
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
      plugin: createBoxPlugin(plugins),
      visibleInSuggestions: true,
      icon: <IconBox />,
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin(),
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
    {
      type: EditorPluginType.EdusharingAsset,
      plugin: createEdusharingAssetPlugin(),
      visibleInSuggestions: true,
      icon: <IconImage />,
    },
    {
      type: EditorPluginType.SerloInjection,
      plugin: createSerloInjectionPlugin(),
      renderer: SerloInjectionStaticRenderer,
      visibleInSuggestions: true,
      icon: <IconInjection />,
    },

    // Exercises etc.
    // ===================================================
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.TextAreaExercise,
      plugin: textAreaExercisePlugin,
      icon: <IconFallback />,
    },
    {
      type: EditorPluginType.Solution,
      plugin: solutionPlugin,
      icon: <IconPencil />,
    },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin(),
      icon: <IconTextArea />,
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: createScMcExercisePlugin(),
      icon: <IconScMcExercise />,
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: blanksExercise,
      icon: <IconFillGaps />,
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

  return allPlugins.filter(({ type }) => plugins.includes(type))
}
