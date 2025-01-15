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
export { extractStringFromTextDocument } from '@editor/plugins/text/utils/static-extract-text'
export type * from '@editor/types/editor-plugins'
export type * from '@editor/plugin/internal-plugin-state'

/**
 * Exported for serlo.org
 */
export { TemplatePluginType } from '@editor/types/template-plugin-type'
export * from '@editor/core/contexts/serlo-only-features-context'
export type { AppletTypePluginState } from '@editor/plugins/serlo-template-plugins/applet'
export type { ArticleTypePluginState } from '@editor/plugins/serlo-template-plugins/article'
export type {
  Entity,
  Uuid,
} from '@editor/plugins/serlo-template-plugins/common/common'
export type { CourseTypePluginState } from '@editor/plugins/serlo-template-plugins/course'
export type { EventTypePluginState } from '@editor/plugins/serlo-template-plugins/event'
export type { TextExerciseGroupTypePluginState } from '@editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
export type { PageTypePluginState } from '@editor/plugins/serlo-template-plugins/page'
export type { TaxonomyTypePluginState } from '@editor/plugins/serlo-template-plugins/taxonomy'
export type { TextExerciseTypePluginState } from '@editor/plugins/serlo-template-plugins/text-exercise'
export type { VideoTypePluginState } from '@editor/plugins/serlo-template-plugins/video'

/**
 * Exported so that integrations can customize available plugins
 * based on the default plugins.
 */
export { defaultPlugins } from './config'

/** StaticMath is a simple component that renders a math formula.
 * it's used in the Editor and is exported here in case you want to
 * render pretty LaTeX without the whole editor.
 * It's relatively big so load it dynamically if you can. */
export {
  StaticMath,
  type StaticMathProps,
} from '@editor/plugins/text/static-components/static-math'
