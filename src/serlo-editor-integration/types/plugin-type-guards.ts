import { EditorPluginType } from './editor-plugin-type'
import type {
  AnyEditorDocument,
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
  document: AnyEditorDocument
): document is EditorAnchorPlugin {
  return document.plugin === EditorPluginType.Anchor
}
export function isArticleDocument(
  document: AnyEditorDocument
): document is EditorArticlePlugin {
  return document.plugin === EditorPluginType.Article
}
export function isArticleIntroductionDocument(
  document: AnyEditorDocument
): document is EditorArticleIntroductionPlugin {
  return document.plugin === EditorPluginType.ArticleIntroduction
}
export function isBoxDocument(
  document: AnyEditorDocument
): document is EditorBoxPlugin {
  return document.plugin === EditorPluginType.Box
}
export function isUnsupportedDocument(
  document: AnyEditorDocument
): document is EditorUnsupportedPlugin {
  return document.plugin === EditorPluginType.Unsupported
}
export function isEquationsDocument(
  document: AnyEditorDocument
): document is EditorEquationsPlugin {
  return document.plugin === EditorPluginType.Equations
}
export function isExerciseDocument(
  document: AnyEditorDocument
): document is EditorExercisePlugin {
  return document.plugin === EditorPluginType.Exercise
}
export function isGeogebraDocument(
  document: AnyEditorDocument
): document is EditorGeogebraPlugin {
  return document.plugin === EditorPluginType.Geogebra
}
export function isHighlightDocument(
  document: AnyEditorDocument
): document is EditorHighlightPlugin {
  return document.plugin === EditorPluginType.Highlight
}
export function isImageDocument(
  document: AnyEditorDocument
): document is EditorImagePlugin {
  return document.plugin === EditorPluginType.Image
}
export function isInjectionDocument(
  document: AnyEditorDocument
): document is EditorInjectionPlugin {
  return document.plugin === EditorPluginType.Injection
}
export function isInputExerciseDocument(
  document: AnyEditorDocument
): document is EditorInputExercisePlugin {
  return document.plugin === EditorPluginType.InputExercise
}
export function isLayoutDocument(
  document: AnyEditorDocument
): document is EditorLayoutPlugin {
  return document.plugin === EditorPluginType.Layout
}
export function isMultimediaDocument(
  document: AnyEditorDocument
): document is EditorMultimediaPlugin {
  return document.plugin === EditorPluginType.Multimedia
}
export function isRowsDocument(
  document: AnyEditorDocument
): document is EditorRowsPlugin {
  return document.plugin === EditorPluginType.Rows
}
export function isScMcExerciseDocument(
  document: AnyEditorDocument
): document is EditorScMcExercisePlugin {
  return document.plugin === EditorPluginType.ScMcExercise
}
export function isSpoilerDocument(
  document: AnyEditorDocument
): document is EditorSpoilerPlugin {
  return document.plugin === EditorPluginType.Spoiler
}
export function isSerloInjection(
  document: AnyEditorDocument
): document is EditorSerloInjectionPlugin {
  return document.plugin === EditorPluginType.Injection
}
export function isSolutionDocument(
  document: AnyEditorDocument
): document is EditorSolutionPlugin {
  return document.plugin === EditorPluginType.Solution
}
export function isSerloTableDocument(
  document: AnyEditorDocument
): document is EditorSerloTablePlugin {
  return document.plugin === EditorPluginType.SerloTable
}
export function isTextDocument(
  document: AnyEditorDocument
): document is EditorTextPlugin {
  return document.plugin === EditorPluginType.Text
}
export function isVideoDocument(
  document: AnyEditorDocument
): document is EditorVideoPlugin {
  return document.plugin === EditorPluginType.Video
}
export function isAudioDocument(
  document: AnyEditorDocument
): document is EditorAudioPlugin {
  return document.plugin === EditorPluginType.Audio
}
export function isPageLayoutDocument(
  document: AnyEditorDocument
): document is EditorPageLayoutPlugin {
  return document.plugin === EditorPluginType.PageLayout
}
export function isPageTeamDocument(
  document: AnyEditorDocument
): document is EditorPageTeamPlugin {
  return document.plugin === EditorPluginType.PageTeam
}
export function isPagePartnersDocument(
  document: AnyEditorDocument
): document is EditorPagePartnersPlugin {
  return document.plugin === EditorPluginType.PagePartners
}
export function isH5PDocument(
  document: AnyEditorDocument
): document is EditorH5PPlugin {
  return document.plugin === EditorPluginType.H5p
}
