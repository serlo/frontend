import type { SupportedLanguage } from '@editor/package'
import type { EditorPlugin, StringStateType } from '@editor/plugin'
import { aiGenerationPlugin } from '@editor/plugins/ai-generation'
import { anchorPlugin } from '@editor/plugins/anchor'
import { articlePlugin } from '@editor/plugins/article'
import { createBlanksExercisePlugin } from '@editor/plugins/blanks-exercise'
import { createBoxPlugin } from '@editor/plugins/box'
import { coursePlugin } from '@editor/plugins/course'
import { createDropzoneImagePlugin } from '@editor/plugins/dropzone-image'
import { createEdusharingAssetPlugin } from '@editor/plugins/edusharing-asset'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
import type { ImagePluginConfig, ImagePluginState } from '@editor/plugins/image'
import { createImageGalleryPlugin } from '@editor/plugins/image-gallery'
import { injectionPlugin } from '@editor/plugins/injection'
import { createInputExercisePlugin } from '@editor/plugins/input-exercise'
import { interactiveVideoPlugin } from '@editor/plugins/interactive-video'
import {
  createArticleIntroduction,
  createMultimediaPlugin,
} from '@editor/plugins/multimedia'
import { pageLayoutPlugin } from '@editor/plugins/page-layout'
import { createRowsPlugin } from '@editor/plugins/rows'
import { createScMcExercisePlugin } from '@editor/plugins/sc-mc-exercise'
import { createSerloInjectionPlugin } from '@editor/plugins/serlo-injection'
import { SerloInjectionStaticRenderer } from '@editor/plugins/serlo-injection/static'
import { createSerloTablePlugin } from '@editor/plugins/serlo-table'
import { articleTypePlugin } from '@editor/plugins/serlo-template-plugins/article'
import { courseTypePlugin } from '@editor/plugins/serlo-template-plugins/course'
import { textExerciseGroupTypePlugin } from '@editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import { genericContentTypePlugin } from '@editor/plugins/serlo-template-plugins/generic-content'
import { pageTypePlugin } from '@editor/plugins/serlo-template-plugins/page'
import { taxonomyTypePlugin } from '@editor/plugins/serlo-template-plugins/taxonomy'
import { textExerciseTypePlugin } from '@editor/plugins/serlo-template-plugins/text-exercise'
import { userTypePlugin } from '@editor/plugins/serlo-template-plugins/user'
import { solutionPlugin } from '@editor/plugins/solution'
import { createSpoilerPlugin } from '@editor/plugins/spoiler'
import { createTextPlugin } from '@editor/plugins/text'
import { textAreaExercisePlugin } from '@editor/plugins/text-area-exercise'
import { unsupportedPlugin } from '@editor/plugins/unsupported'
import { videoPlugin } from '@editor/plugins/video'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { createTestingImagePlugin } from './image-with-testing-config'

export interface ExtraSerloPlugins {
  h5p: EditorPlugin<StringStateType>
  image: EditorPlugin<ImagePluginState, ImagePluginConfig>
}

function isLocalOrDev() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname

  return (
    process.env.NODE_ENV === 'development' ||
    host === 'editor.serlo.dev' ||
    host === 'localhost'
  )
}

export function createPlugins(
  plugins: (EditorPluginType | TemplatePluginType)[],
  testingSecret?: string | null,
  language: SupportedLanguage = 'de',
  extraSerloPlugins?: ExtraSerloPlugins,
  isSerloProduction: boolean = false
) {
  const allPlugins = [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
    },
    {
      type: EditorPluginType.Image,
      plugin: extraSerloPlugins
        ? extraSerloPlugins.image
        : createTestingImagePlugin(testingSecret),
    },
    {
      type: EditorPluginType.ImageGallery,
      plugin: createImageGalleryPlugin(),
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(plugins),
    },
    {
      type: EditorPluginType.Video,
      plugin: videoPlugin,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin(plugins),
    },
    {
      type: EditorPluginType.Equations,
      plugin: equationsPlugin,
    },
    {
      type: EditorPluginType.Box,
      plugin: createBoxPlugin(plugins),
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin(),
    },
    {
      type: EditorPluginType.Geogebra,
      plugin: geoGebraPlugin,
    },
    {
      type: EditorPluginType.Highlight,
      plugin: createHighlightPlugin(),
    },
    {
      type: EditorPluginType.EdusharingAsset,
      plugin: createEdusharingAssetPlugin(),
    },
    {
      type: EditorPluginType.SerloInjection,
      plugin: createSerloInjectionPlugin(),
      renderer: SerloInjectionStaticRenderer,
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
      plugin: createInputExercisePlugin(),
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: createScMcExercisePlugin(),
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: createBlanksExercisePlugin(),
    },
    {
      type: EditorPluginType.TextAreaExercise,
      plugin: textAreaExercisePlugin,
    },
    {
      type: EditorPluginType.DropzoneImage,
      plugin: createDropzoneImagePlugin(),
    },
    ...(isLocalOrDev()
      ? [
          {
            type: EditorPluginType.InteractiveVideo,
            plugin: interactiveVideoPlugin,
          },
        ]
      : []),

    // Special plugins, never visible in suggestions
    // ===================================================
    { type: EditorPluginType.Rows, plugin: createRowsPlugin() },
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
            type: TemplatePluginType.Article,
            plugin: articleTypePlugin,
          },
          {
            type: TemplatePluginType.Course,
            plugin: courseTypePlugin,
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
            type: EditorPluginType.Article,
            plugin: articlePlugin,
          },
          {
            type: EditorPluginType.Course,
            plugin: coursePlugin,
          },
          {
            type: EditorPluginType.ArticleIntroduction,
            plugin: createArticleIntroduction(
              language === 'de'
                ? 'Fasse das Thema des Artikels kurz zusammen'
                : 'Write a short introduction'
            ),
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
          ...(isSerloProduction
            ? []
            : [
                {
                  type: EditorPluginType.AiGeneration,
                  plugin: aiGenerationPlugin,
                },
              ]),
        ]
      : []),
  ]

  return allPlugins.filter(({ type }) => plugins.includes(type))
}
