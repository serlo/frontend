import { EditorPluginType } from '../serlo-editor/types/editor-plugin-type'
import { type LoggedInData } from '@/data-types'
import IconBox from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconEquation from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconGeogebra from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconMultimedia from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-text.svg'
import { createBoxPlugin } from '@/serlo-editor/plugins/box'
import { equationsPlugin } from '@/serlo-editor/plugins/equations'
import { exercisePlugin } from '@/serlo-editor/plugins/exercise'
import { geoGebraPlugin } from '@/serlo-editor/plugins/geogebra'
import { createHighlightPlugin } from '@/serlo-editor/plugins/highlight'
import { createInputExercisePlugin } from '@/serlo-editor/plugins/input-exercise'
import {
  MultimediaConfig,
  createMultimediaPlugin,
} from '@/serlo-editor/plugins/multimedia'
import { createRowsPlugin } from '@/serlo-editor/plugins/rows'
import { createScMcExercisePlugin } from '@/serlo-editor/plugins/sc-mc-exercise'
import { createSerloTablePlugin } from '@/serlo-editor/plugins/serlo-table'
import { solutionPlugin } from '@/serlo-editor/plugins/solution'
import { createSpoilerPlugin } from '@/serlo-editor/plugins/spoiler'
import { createTextPlugin } from '@/serlo-editor/plugins/text'
import { unsupportedPlugin } from '@/serlo-editor/plugins/unsupported'

export function createBasicPlugins({
  editorStrings,
  exerciseVisibleInSuggestion,
  allowedChildPlugins,
  allowImageInTableCells,
  multimediaConfig,
}: {
  allowedChildPlugins?: string[]
  exerciseVisibleInSuggestion: boolean
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
    // TODO: Deactivate for RLP
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
  ]
}
