import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import { createBlanksTablePlugin } from '@editor/plugins/blanks-table'
import { createBoxPlugin } from '@editor/plugins/box'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
import { createInputExercisePlugin } from '@editor/plugins/input-exercise'
import {
  MultimediaConfig,
  createMultimediaPlugin,
} from '@editor/plugins/multimedia'
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

import { type LoggedInData } from '@/data-types'

export function createBasicPlugins({
  editorStrings,
  enableTextAreaExercise = false,
  exerciseVisibleInSuggestion,
  allowedChildPlugins,
  allowImageInTableCells,
  multimediaConfig,
}: {
  allowedChildPlugins?: string[]
  exerciseVisibleInSuggestion: boolean
  enableTextAreaExercise?: boolean
  allowImageInTableCells: boolean
  editorStrings: LoggedInData['strings']['editor']
  multimediaConfig?: MultimediaConfig
}) {
  return [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
      visibleInSuggestions: true,
      icon: <IconText />,
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(multimediaConfig),
      visibleInSuggestions: true,
      icon: <IconMultimedia />,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin({ allowedPlugins: allowedChildPlugins }),
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
      plugin: createBoxPlugin({ allowedPlugins: allowedChildPlugins }),
      visibleInSuggestions: true,
      icon: <IconBox />,
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin({ allowImageInTableCells }),
      visibleInSuggestions: true,
      icon: <IconTable />,
    },
    {
      type: EditorPluginType.BlanksTable,
      plugin: createBlanksTablePlugin(),
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

    // Exercises etc.
    // ===================================================
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
      visibleInSuggestions: exerciseVisibleInSuggestion,
    },
    ...(enableTextAreaExercise
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
      plugin: createInputExercisePlugin({
        feedback: {
          plugin: EditorPluginType.Text,
          config: {
            placeholder:
              editorStrings.templatePlugins.inputExercise.feedbackPlaceholder,
          },
        },
      }),
    },
    { type: EditorPluginType.ScMcExercise, plugin: createScMcExercisePlugin() },

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
