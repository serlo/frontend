import { EditorPluginType } from './editor-plugin-type'
import type {
  AnyEditorDocument,
  EditorAnchorDocument,
  EditorArticleIntroductionDocument,
  EditorArticleDocument,
  EditorAudioDocument,
  EditorBoxDocument,
  EditorEquationsDocument,
  EditorExerciseDocument,
  EditorGeogebraDocument,
  EditorHighlightDocument,
  EditorImageDocument,
  EditorInjectionDocument,
  EditorInputExerciseDocument,
  EditorMultimediaDocument,
  EditorPageLayoutDocument,
  EditorPagePartnersDocument,
  EditorPageTeamDocument,
  EditorRowsDocument,
  EditorScMcExerciseDocument,
  EditorSerloInjectionDocument,
  EditorEdusharingAssetDocument,
  EditorSerloTableDocument,
  EditorSolutionDocument,
  EditorSpoilerDocument,
  EditorTextDocument,
  EditorUnsupportedDocument,
  EditorVideoDocument,
  EditorTemplateExerciseGroupDocument,
  EditorExerciseGroupDocument,
  EditorCourseDocument,
  EditorInteractiveVideoDocument,
} from './editor-plugins'
import { TemplatePluginType } from './template-plugin-type'

export function isAnchorDocument(
  document: AnyEditorDocument
): document is EditorAnchorDocument {
  return document.plugin === EditorPluginType.Anchor
}
export function isArticleDocument(
  document: AnyEditorDocument
): document is EditorArticleDocument {
  return document.plugin === EditorPluginType.Article
}
export function isArticleIntroductionDocument(
  document: AnyEditorDocument
): document is EditorArticleIntroductionDocument {
  return document.plugin === EditorPluginType.ArticleIntroduction
}
export function isBoxDocument(
  document: AnyEditorDocument
): document is EditorBoxDocument {
  return document.plugin === EditorPluginType.Box
}
export function isCourseDocument(
  document: AnyEditorDocument
): document is EditorCourseDocument {
  return document.plugin === EditorPluginType.Course
}
export function isUnsupportedDocument(
  document: AnyEditorDocument
): document is EditorUnsupportedDocument {
  return document.plugin === EditorPluginType.Unsupported
}
export function isEquationsDocument(
  document: AnyEditorDocument
): document is EditorEquationsDocument {
  return document.plugin === EditorPluginType.Equations
}
export function isExerciseDocument(
  document: AnyEditorDocument
): document is EditorExerciseDocument {
  return document.plugin === EditorPluginType.Exercise
}
export function isExerciseGroupDocument(
  document: AnyEditorDocument
): document is EditorExerciseGroupDocument {
  return document.plugin === EditorPluginType.ExerciseGroup
}
export function isGeogebraDocument(
  document: AnyEditorDocument
): document is EditorGeogebraDocument {
  return document.plugin === EditorPluginType.Geogebra
}
export function isHighlightDocument(
  document: AnyEditorDocument
): document is EditorHighlightDocument {
  return document.plugin === EditorPluginType.Highlight
}
export function isImageDocument(
  document: AnyEditorDocument
): document is EditorImageDocument {
  return document.plugin === EditorPluginType.Image
}
export function isInjectionDocument(
  document: AnyEditorDocument
): document is EditorInjectionDocument {
  return document.plugin === EditorPluginType.Injection
}
export function isInputExerciseDocument(
  document: AnyEditorDocument
): document is EditorInputExerciseDocument {
  return document.plugin === EditorPluginType.InputExercise
}
export function isMultimediaDocument(
  document: AnyEditorDocument
): document is EditorMultimediaDocument {
  return document.plugin === EditorPluginType.Multimedia
}
export function isRowsDocument(
  document: AnyEditorDocument
): document is EditorRowsDocument {
  return document?.plugin === EditorPluginType.Rows
}
export function isScMcExerciseDocument(
  document: AnyEditorDocument
): document is EditorScMcExerciseDocument {
  return document.plugin === EditorPluginType.ScMcExercise
}
export function isSpoilerDocument(
  document: AnyEditorDocument
): document is EditorSpoilerDocument {
  return document.plugin === EditorPluginType.Spoiler
}
export function isSolutionDocument(
  document: AnyEditorDocument
): document is EditorSolutionDocument {
  return document.plugin === EditorPluginType.Solution
}
export function isSerloTableDocument(
  document: AnyEditorDocument
): document is EditorSerloTableDocument {
  return document.plugin === EditorPluginType.SerloTable
}
export function isTextDocument(
  document: AnyEditorDocument
): document is EditorTextDocument {
  return document.plugin === EditorPluginType.Text
}
export function isVideoDocument(
  document: AnyEditorDocument
): document is EditorVideoDocument {
  return document.plugin === EditorPluginType.Video
}
export function isInteractiveVideoDocument(
  document: AnyEditorDocument
): document is EditorInteractiveVideoDocument {
  return document.plugin === EditorPluginType.InteractiveVideo
}
export function isAudioDocument(
  document: AnyEditorDocument
): document is EditorAudioDocument {
  return document.plugin === EditorPluginType.Audio
}
export function isPageLayoutDocument(
  document: AnyEditorDocument
): document is EditorPageLayoutDocument {
  return document.plugin === EditorPluginType.PageLayout
}
export function isPageTeamDocument(
  document: AnyEditorDocument
): document is EditorPageTeamDocument {
  return document.plugin === EditorPluginType.PageTeam
}
export function isPagePartnersDocument(
  document: AnyEditorDocument
): document is EditorPagePartnersDocument {
  return document.plugin === EditorPluginType.PagePartners
}
export function isTemplateExerciseGroupDocument(
  document: AnyEditorDocument
): document is EditorTemplateExerciseGroupDocument {
  return document.plugin === TemplatePluginType.TextExerciseGroup
}
export function isEdusharingAssetDocument(
  document: AnyEditorDocument
): document is EditorEdusharingAssetDocument {
  return document.plugin === EditorPluginType.EdusharingAsset
}
export function isSerloInjectionDocument(
  document: AnyEditorDocument
): document is EditorSerloInjectionDocument {
  return document.plugin === EditorPluginType.SerloInjection
}
