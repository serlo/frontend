/**
 * @license Apache-2.0
 * Copyright (c) 2025-present Serlo Education
 */

export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export type { BaseEditor } from '@editor/core'
export type { SupportedLanguage } from '@editor/types/language-data'
export type { LearnerEventData } from '@editor/plugin/helpers/editor-learner-event'
export { EditorPluginType } from '@editor/types/editor-plugin-type'

// File upload configuration types
export type {
  FileUploadConfig,
  UploadHandler,
} from '@editor/core/contexts/editor-meta-context'

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

/**
 * Plugin state helpers and types
 */
export * from '@editor/types/plugin-type-guards'
export * from './static-is-plugin-empty'
export { extractStringFromTextDocument } from '@editor/plugins/text/utils/static-extract-text'
export type * from '@editor/types/editor-plugins'
export type * from '@editor/plugin/internal-plugin-state'
export type * from '@editor/plugin/internal-plugin'
export type { StorageFormat } from './storage-format'

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

/**
 * Exported for serlo.org
 */
export { TemplatePluginType } from '@editor/types/template-plugin-type'
export * from '@editor/core/contexts/serlo-only-features-context'
export {
  // Exported for H5P plugin
  string,
  type StringStateType,
  // Exported for image-with-serlo-config plugin wrapper
  type LoadedFile,
  type UploadValidator,
} from '@editor/plugin'
// Exported for ___experiments page
export {
  type PreferenceName,
  getWithoutContext,
  setWithoutContext,
} from '@editor/core/contexts/preference-context'
// Exported for H5P plugin
export { EditorInput } from '@editor/editor-ui'
export { editorLearnerEvent } from '@editor/plugin/helpers/editor-learner-event'
// Exported for InputExercise and Multimedia Serlo static renderers
export { TextStaticRenderer } from '@editor/plugins/text/static'
// Exported for Audio Serlo static renderer
export {
  AudioRenderer,
  getVocarooUrl,
  parseAudioUrl,
} from '@editor/plugins/audio/renderer'
// Exported for Exercise Serlo static renderer
export { ExerciseStaticRenderer } from '@editor/plugins/exercise/static'
// Exported for ExerciseGroup Serlo static renderer
export { ExerciseGroupStaticRenderer } from '@editor/plugins/exercise-group/static'
// Exported for Geogebra Serlo static renderer
export { parseId } from '@editor/plugins/geogebra/renderer'
export { GeogebraStaticRenderer } from '@editor/plugins/geogebra/static'
// Exported for Image Serlo static renderer
export { ImageStaticRenderer } from '@editor/plugins/image/static'
// Exported for InputExercise Serlo static renderer
export { InputExerciseStaticRenderer } from '@editor/plugins/input-exercise/static'
// Exported for Interactive Video Serlo static renderer
export { InteractiveVideoStaticRenderer } from '@editor/plugins/interactive-video/static'
// Exported for Multimedia Serlo static renderer
export { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
// Exported for ScMcExercise Serlo static renderer
export type { ScMcExerciseRendererAnswer } from '@editor/plugins/sc-mc-exercise/renderer/renderer'
export { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
// Exported for Solution Serlo static renderer
export { StaticSolutionRenderer } from '@editor/plugins/solution/static'
// Exported for Video Serlo static renderer
export { VideoType } from '@editor/plugins/video/renderer'
export { parseVideoUrl } from '@editor/plugins/video/utils/parse-video-url'
export { VideoStaticRenderer } from '@editor/plugins/video/static'
export { createEmptyDocument } from './storage-format'
