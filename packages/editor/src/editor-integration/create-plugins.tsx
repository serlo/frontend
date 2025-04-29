import type { EditorPlugin, StringStateType } from '@editor/plugin'
import { anchorPlugin } from '@editor/plugins/anchor'
import { articlePlugin } from '@editor/plugins/article'
import { blanksExercisePlugin } from '@editor/plugins/blanks-exercise'
import { boxPlugin } from '@editor/plugins/box'
import { coursePlugin } from '@editor/plugins/course'
import { dropzoneImagePlugin } from '@editor/plugins/dropzone-image'
import { edusharingAssetPlugin } from '@editor/plugins/edusharing-asset'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { exerciseGroupPlugin } from '@editor/plugins/exercise-group'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { highlightPlugin } from '@editor/plugins/highlight'
import { imagePlugin } from '@editor/plugins/image'
import { imageGalleryPlugin } from '@editor/plugins/image-gallery'
import { injectionPlugin } from '@editor/plugins/injection'
import { inputExercisePlugin } from '@editor/plugins/input-exercise'
import { interactiveVideoPlugin } from '@editor/plugins/interactive-video'
import {
  articleIntroduction,
  multimediaPlugin,
} from '@editor/plugins/multimedia'
import { pageLayoutPlugin } from '@editor/plugins/page-layout'
import { rowsPlugin } from '@editor/plugins/rows'
import { scMcExercisePlugin } from '@editor/plugins/sc-mc-exercise'
import { serloInjectionPlugin } from '@editor/plugins/serlo-injection'
import { tablePlugin } from '@editor/plugins/serlo-table'
import { appletTypePlugin } from '@editor/plugins/serlo-template-plugins/applet'
import { articleTypePlugin } from '@editor/plugins/serlo-template-plugins/article'
import { courseTypePlugin } from '@editor/plugins/serlo-template-plugins/course'
import { eventTypePlugin } from '@editor/plugins/serlo-template-plugins/event'
import { textExerciseGroupTypePlugin } from '@editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import { genericContentTypePlugin } from '@editor/plugins/serlo-template-plugins/generic-content'
import { pageTypePlugin } from '@editor/plugins/serlo-template-plugins/page'
import { taxonomyTypePlugin } from '@editor/plugins/serlo-template-plugins/taxonomy'
import { textExerciseTypePlugin } from '@editor/plugins/serlo-template-plugins/text-exercise'
import { userTypePlugin } from '@editor/plugins/serlo-template-plugins/user'
import { videoTypePlugin } from '@editor/plugins/serlo-template-plugins/video'
import { solutionPlugin } from '@editor/plugins/solution'
import { spoilerPlugin } from '@editor/plugins/spoiler'
import { textPlugin } from '@editor/plugins/text'
import { textAreaExercisePlugin } from '@editor/plugins/text-area-exercise'
import { unsupportedPlugin } from '@editor/plugins/unsupported'
import { videoPlugin } from '@editor/plugins/video'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

export interface ExtraSerloPlugins {
  h5p: EditorPlugin<StringStateType>
}

export function createPlugins(
  plugins: (EditorPluginType | TemplatePluginType)[],
  extraSerloPlugins?: ExtraSerloPlugins
) {
  const allPlugins = [
    {
      type: EditorPluginType.Text,
      plugin: textPlugin,
    },
    {
      type: EditorPluginType.Image,
      plugin: imagePlugin,
    },
    {
      type: EditorPluginType.ImageGallery,
      plugin: imageGalleryPlugin,
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: multimediaPlugin,
    },
    {
      type: EditorPluginType.Video,
      plugin: videoPlugin,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: spoilerPlugin,
    },
    {
      type: EditorPluginType.Equations,
      plugin: equationsPlugin,
    },
    {
      type: EditorPluginType.Box,
      plugin: boxPlugin,
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: tablePlugin,
    },
    {
      type: EditorPluginType.Geogebra,
      plugin: geoGebraPlugin,
    },
    {
      type: EditorPluginType.Highlight,
      plugin: highlightPlugin,
    },
    {
      type: EditorPluginType.EdusharingAsset,
      plugin: edusharingAssetPlugin,
    },
    {
      type: EditorPluginType.SerloInjection,
      plugin: serloInjectionPlugin,
    },
    // Exercises etc.
    // ===================================================
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
    },
    {
      type: EditorPluginType.Solution,
      plugin: solutionPlugin,
    },
    {
      type: EditorPluginType.InputExercise,
      plugin: inputExercisePlugin,
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: scMcExercisePlugin,
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: blanksExercisePlugin,
    },
    {
      type: EditorPluginType.TextAreaExercise,
      plugin: textAreaExercisePlugin,
    },
    {
      type: EditorPluginType.DropzoneImage,
      plugin: dropzoneImagePlugin,
    },
    {
      type: EditorPluginType.InteractiveVideo,
      plugin: interactiveVideoPlugin,
    },

    // Special plugins, never visible in suggestions
    // ===================================================
    { type: EditorPluginType.Rows, plugin: rowsPlugin },
    { type: EditorPluginType.Unsupported, plugin: unsupportedPlugin },
    {
      type: TemplatePluginType.GenericContent,
      plugin: genericContentTypePlugin,
    },
    ...(extraSerloPlugins
      ? [
          {
            type: EditorPluginType.H5p,
            plugin: extraSerloPlugins.h5p,
          },
          {
            type: TemplatePluginType.Applet,
            plugin: appletTypePlugin,
          },
          {
            type: TemplatePluginType.Article,
            plugin: articleTypePlugin,
          },
          {
            type: TemplatePluginType.Course,
            plugin: courseTypePlugin,
          },
          {
            type: TemplatePluginType.Event,
            plugin: eventTypePlugin,
          },
          {
            type: TemplatePluginType.Page,
            plugin: pageTypePlugin,
          },
          {
            type: TemplatePluginType.Taxonomy,
            plugin: taxonomyTypePlugin,
          },
          {
            type: TemplatePluginType.TextExercise,
            plugin: textExerciseTypePlugin,
          },
          {
            type: TemplatePluginType.TextExerciseGroup,
            plugin: textExerciseGroupTypePlugin,
          },
          {
            type: TemplatePluginType.User,
            plugin: userTypePlugin,
          },
          {
            type: TemplatePluginType.Video,
            plugin: videoTypePlugin,
          },
          {
            type: EditorPluginType.Article,
            plugin: articlePlugin,
          },
          {
            type: EditorPluginType.Course,
            plugin: coursePlugin,
          },
          {
            type: EditorPluginType.ArticleIntroduction,
            plugin: articleIntroduction,
          },
          {
            type: EditorPluginType.ExerciseGroup,
            plugin: exerciseGroupPlugin,
          },
          {
            type: EditorPluginType.PageLayout,
            plugin: pageLayoutPlugin,
          },
          {
            type: EditorPluginType.Injection,
            plugin: injectionPlugin,
          },
          {
            type: EditorPluginType.Anchor,
            plugin: anchorPlugin,
          },
        ]
      : []),
  ]

  return allPlugins.filter(({ type }) => plugins.includes(type))
}
