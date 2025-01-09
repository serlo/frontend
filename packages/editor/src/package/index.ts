export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export type { SupportedLanguage } from '@editor/types/language-data'
export type { BaseEditor } from '@editor/core'
export type { LearnerEventData } from '@editor/plugin/helpers/editor-learner-event'

/**
 * We need to make a distinction between entries in our menu and
 * technical plugin types. For example, internally we have a
 * `scMcExercise` which has a configuration that defines whether
 * it is a single choice or a multiple choice exercise. However,
 * in the menu there are the two entries:  `singleChoiceExercise`
 * and `multipleChoiceExercise`. When somebody else uses our editor
 * as a block inside their own editor they would like to have two
 * entries: `singleChoiceExercise` and `multipleChoiceExercise`.
 * Thus we export our menu entries here.
 */
export { pluginMenuDe, pluginMenuEn } from './plugin-menu-export'
export { type PluginMenuType as Plugin } from '@editor/plugins/rows/utils/plugin-menu'

export { EditorPluginType } from '@editor/types/editor-plugin-type'

/**
 * Plugin state helpers and types
 */
export * from '@editor/types/plugin-type-guards'
export * from './static-is-plugin-empty'
export type * from '@editor/types/editor-plugins'

/**
 * Exported for serlo.org
 */
export { TemplatePluginType } from '@editor/types/template-plugin-type'
export { SerloOnlyFeaturesContext } from '@editor/core/contexts/serlo-only-features-context'

/**
 * Exported so that integrations can customize available plugins
 * based on the default plugins.
 */
export { defaultPlugins } from './config'
