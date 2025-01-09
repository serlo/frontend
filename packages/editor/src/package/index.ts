export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export type { BaseEditor } from '@editor/core'

// We need to make a distinction between entires on our menu and technical
// plugin types Internally we have for example a `scMcExercise` which has a
// configuration whether it is a single choice or multiple choice exercise.
// However on the menu there are the two entries `singleChoiceExercise` and
// `multipleChoiceExercise`. When somebody else uses our editor as a block
// inside their own editor they would like to have the two entries
// `singleChoiceExercise` and `multipleChoiceExercise`.
// Thus we export our menu entries here as plugin.
export { pluginMenuDe, pluginMenuEn } from './plugin-menu-export'
export { type PluginMenuType as Plugin } from '@editor/plugins/rows/utils/plugin-menu'

export { EditorPluginType } from '@editor/types/editor-plugin-type'

// Exported only so that integrations like serlo-editor-for-edusharing can customize available plugins based on the default plugins
export { defaultPlugins } from './config'

/** StaticMath is a simple component that renders a math formula.
 * it's used in the Editor and is exported here in case you want to
 * render pretty LaTeX without the whole editor.
 * It's relatively big so load it dynamically if you can. */
export {
  StaticMath,
  type StaticMathProps,
} from '@editor/plugins/text/static-components/static-math'
