import { EditorPluginType } from './editor-plugin-type'
import type {
  AnyEditorPlugin,
  EditorAnchorPlugin,
  EditorArticleIntroductionPlugin,
  EditorArticlePlugin,
  EditorAudioPlugin,
  EditorBoxPlugin,
  EditorEquationsPlugin,
  EditorExercisePlugin,
  EditorGeogebraPlugin,
  EditorH5PPlugin,
  EditorHighlightPlugin,
  EditorImagePlugin,
  EditorInjectionPlugin,
  EditorInputExercisePlugin,
  EditorLayoutPlugin,
  EditorMultimediaPlugin,
  EditorPageLayoutPlugin,
  EditorPagePartnersPlugin,
  EditorPageTeamPlugin,
  EditorRowsPlugin,
  EditorScMcExercisePlugin,
  EditorSerloInjectionPlugin,
  EditorSerloTablePlugin,
  EditorSolutionPlugin,
  EditorSpoilerPlugin,
  EditorTextPlugin,
  EditorUnsupportedPlugin,
  EditorVideoPlugin,
} from './editor-plugins'

export function isAnchorDocument(
  document: AnyEditorPlugin
): document is EditorAnchorPlugin {
  return document.plugin === EditorPluginType.Anchor
}
export function isArticleDocument(
  document: AnyEditorPlugin
): document is EditorArticlePlugin {
  return document.plugin === EditorPluginType.Article
}
export function isArticleIntroductionDocument(
  document: AnyEditorPlugin
): document is EditorArticleIntroductionPlugin {
  return document.plugin === EditorPluginType.ArticleIntroduction
}
export function isBoxDocument(
  document: AnyEditorPlugin
): document is EditorBoxPlugin {
  return document.plugin === EditorPluginType.Box
}
export function isUnsupportedDocument(
  document: AnyEditorPlugin
): document is EditorUnsupportedPlugin {
  return document.plugin === EditorPluginType.Unsupported
}
export function isEquationsDocument(
  document: AnyEditorPlugin
): document is EditorEquationsPlugin {
  return document.plugin === EditorPluginType.Equations
}
export function isExerciseDocument(
  document: AnyEditorPlugin
): document is EditorExercisePlugin {
  return document.plugin === EditorPluginType.Exercise
}
export function isGeogebraDocument(
  document: AnyEditorPlugin
): document is EditorGeogebraPlugin {
  return document.plugin === EditorPluginType.Geogebra
}
export function isHighlightDocument(
  document: AnyEditorPlugin
): document is EditorHighlightPlugin {
  return document.plugin === EditorPluginType.Highlight
}
export function isImageDocument(
  document: AnyEditorPlugin
): document is EditorImagePlugin {
  return document.plugin === EditorPluginType.Image
}
export function isInjectionDocument(
  document: AnyEditorPlugin
): document is EditorInjectionPlugin {
  return document.plugin === EditorPluginType.Injection
}
export function isInputExerciseDocument(
  document: AnyEditorPlugin
): document is EditorInputExercisePlugin {
  return document.plugin === EditorPluginType.InputExercise
}
export function isLayoutDocument(
  document: AnyEditorPlugin
): document is EditorLayoutPlugin {
  return document.plugin === EditorPluginType.Layout
}
export function isMultimediaDocument(
  document: AnyEditorPlugin
): document is EditorMultimediaPlugin {
  return document.plugin === EditorPluginType.Multimedia
}
export function isRowsDocument(
  document: AnyEditorPlugin
): document is EditorRowsPlugin {
  return document.plugin === EditorPluginType.Rows
}
export function isScMcExerciseDocument(
  document: AnyEditorPlugin
): document is EditorScMcExercisePlugin {
  return document.plugin === EditorPluginType.ScMcExercise
}
export function isSpoilerDocument(
  document: AnyEditorPlugin
): document is EditorSpoilerPlugin {
  return document.plugin === EditorPluginType.Spoiler
}
export function isSerloInjection(
  document: AnyEditorPlugin
): document is EditorSerloInjectionPlugin {
  return document.plugin === EditorPluginType.Injection
}
export function isSolutionDocument(
  document: AnyEditorPlugin
): document is EditorSolutionPlugin {
  return document.plugin === EditorPluginType.Solution
}
export function isSerloTableDocument(
  document: AnyEditorPlugin
): document is EditorSerloTablePlugin {
  return document.plugin === EditorPluginType.SerloTable
}
export function isTextDocument(
  document: AnyEditorPlugin
): document is EditorTextPlugin {
  return document.plugin === EditorPluginType.Text
}
export function isVideoDocument(
  document: AnyEditorPlugin
): document is EditorVideoPlugin {
  return document.plugin === EditorPluginType.Video
}
export function isAudioDocument(
  document: AnyEditorPlugin
): document is EditorAudioPlugin {
  return document.plugin === EditorPluginType.Audio
}
export function isPageLayoutDocument(
  document: AnyEditorPlugin
): document is EditorPageLayoutPlugin {
  return document.plugin === EditorPluginType.PageLayout
}
export function isPageTeamDocument(
  document: AnyEditorPlugin
): document is EditorPageTeamPlugin {
  return document.plugin === EditorPluginType.PageTeam
}
export function isPagePartnersDocument(
  document: AnyEditorPlugin
): document is EditorPagePartnersPlugin {
  return document.plugin === EditorPluginType.PagePartners
}
export function isH5PDocument(
  document: AnyEditorPlugin
): document is EditorH5PPlugin {
  return document.plugin === EditorPluginType.H5p
}
