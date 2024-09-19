import type { PluginsWithData } from '@editor/plugin/helpers/editor-plugins'
import { anchorPlugin } from '@editor/plugins/anchor'
import { articlePlugin } from '@editor/plugins/article'
import { audioPlugin } from '@editor/plugins/audio'
import { createBlanksExercisePlugin } from '@editor/plugins/blanks-exercise'
import { createBoxPlugin } from '@editor/plugins/box'
import { coursePlugin } from '@editor/plugins/course'
import { createDropzoneImagePlugin } from '@editor/plugins/dropzone-image'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { exerciseGroupPlugin } from '@editor/plugins/exercise-group'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
import { createImageGalleryPlugin } from '@editor/plugins/image-gallery'
import { injectionPlugin } from '@editor/plugins/injection'
import { createInputExercisePlugin } from '@editor/plugins/input-exercise'
import {
  createArticleIntroduction,
  createMultimediaPlugin,
} from '@editor/plugins/multimedia'
import { pageLayoutPlugin } from '@editor/plugins/page-layout'
import { pagePartnersPlugin } from '@editor/plugins/page-partners'
import { pageTeamPlugin } from '@editor/plugins/page-team'
import { pasteHackPlugin } from '@editor/plugins/paste-hack'
import { createRowsPlugin } from '@editor/plugins/rows'
import { createScMcExercisePlugin } from '@editor/plugins/sc-mc-exercise'
import { createSerloTablePlugin } from '@editor/plugins/serlo-table'
import { appletTypePlugin } from '@editor/plugins/serlo-template-plugins/applet'
import { articleTypePlugin } from '@editor/plugins/serlo-template-plugins/article'
import { courseTypePlugin } from '@editor/plugins/serlo-template-plugins/course'
import { eventTypePlugin } from '@editor/plugins/serlo-template-plugins/event'
import { textExerciseGroupTypePlugin } from '@editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import { pageTypePlugin } from '@editor/plugins/serlo-template-plugins/page'
import { taxonomyTypePlugin } from '@editor/plugins/serlo-template-plugins/taxonomy'
import { textExerciseTypePlugin } from '@editor/plugins/serlo-template-plugins/text-exercise'
import { userTypePlugin } from '@editor/plugins/serlo-template-plugins/user'
import { videoTypePlugin } from '@editor/plugins/serlo-template-plugins/video'
import { solutionPlugin } from '@editor/plugins/solution'
import { createSpoilerPlugin } from '@editor/plugins/spoiler'
import { createTextPlugin } from '@editor/plugins/text'
import { unsupportedPlugin } from '@editor/plugins/unsupported'
import { videoPlugin } from '@editor/plugins/video'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

import { shouldUseFeature } from '@/components/user/profile-experimental'
import { type LoggedInData, UuidType } from '@/data-types'
import { isProduction } from '@/helper/is-production'
import { H5pPlugin } from '@/serlo-editor-integration/h5p'
import { imagePlugin } from '@/serlo-editor-integration/image-with-serlo-config'

export function createPlugins({
  editorStrings,
  parentType,
}: {
  editorStrings: LoggedInData['strings']['editor']
  parentType?: string
}): PluginsWithData {
  const isPage = parentType === UuidType.Page

  const plugins = [
    EditorPluginType.Anchor,
    EditorPluginType.Article,
    EditorPluginType.Audio,
    EditorPluginType.ArticleIntroduction,
    EditorPluginType.Box,
    EditorPluginType.Course,
    EditorPluginType.Equations,
    EditorPluginType.Geogebra,
    EditorPluginType.H5p,
    EditorPluginType.Highlight,
    EditorPluginType.Image,
    EditorPluginType.ImageGallery,
    EditorPluginType.Injection,
    EditorPluginType.Multimedia,

    EditorPluginType.PageLayout,
    EditorPluginType.PagePartners,
    EditorPluginType.PageTeam,
    EditorPluginType.PasteHack,

    EditorPluginType.Rows,
    EditorPluginType.SerloTable,
    EditorPluginType.Spoiler,

    EditorPluginType.Text,
    EditorPluginType.Video,

    EditorPluginType.DropzoneImage,
    EditorPluginType.ExerciseGroup,
    EditorPluginType.Exercise,
    EditorPluginType.ScMcExercise,
    EditorPluginType.InputExercise,
    EditorPluginType.BlanksExercise,
    EditorPluginType.BlanksExerciseDragAndDrop,
    EditorPluginType.Solution,

    EditorPluginType.Unsupported,

    TemplatePluginType.Applet,
    TemplatePluginType.Article,
    TemplatePluginType.Course,
    TemplatePluginType.Event,
    TemplatePluginType.Page,
    TemplatePluginType.Taxonomy,
    TemplatePluginType.TextExercise,
    TemplatePluginType.TextExerciseGroup,
    TemplatePluginType.User,
    TemplatePluginType.Video,
  ]

  const allPlugins = [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Image,
      plugin: imagePlugin,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.ImageGallery,
      plugin: createImageGalleryPlugin(),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin([
        EditorPluginType.Image,
        EditorPluginType.Video,
        ...(isProduction ? [] : [EditorPluginType.Audio]),
        EditorPluginType.Geogebra,
      ]),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin(plugins),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Box,
      plugin: createBoxPlugin(plugins),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin(),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Injection,
      plugin: injectionPlugin,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Equations,
      plugin: equationsPlugin,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Geogebra,
      plugin: geoGebraPlugin,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Highlight,
      plugin: createHighlightPlugin(),
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Video,
      plugin: videoPlugin,
      visibleInSuggestions: true,
    },
    ...(isProduction
      ? []
      : [
          {
            type: EditorPluginType.Audio,
            plugin: audioPlugin,
            visibleInSuggestions: true,
          },
        ]),
    {
      type: EditorPluginType.Anchor,
      plugin: anchorPlugin,
      visibleInSuggestions: false,
    },
    {
      type: EditorPluginType.PasteHack,
      plugin: pasteHackPlugin,
      visibleInSuggestions: shouldUseFeature('edtrPasteHack'),
    },
    {
      type: EditorPluginType.PageLayout,
      plugin: pageLayoutPlugin,
      visibleInSuggestions: isPage,
    },
    {
      type: EditorPluginType.PageTeam,
      plugin: pageTeamPlugin,
      visibleInSuggestions: isPage,
    },
    {
      type: EditorPluginType.PagePartners,
      plugin: pagePartnersPlugin,
      visibleInSuggestions: isPage,
    },

    // Exercises etc.
    // ===================================================

    {
      type: EditorPluginType.ExerciseGroup,
      plugin: exerciseGroupPlugin,
      visibleInSuggestions: !isProduction,
    },
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.Solution,
      plugin: solutionPlugin,
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: createScMcExercisePlugin(),

      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin(),
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: createBlanksExercisePlugin(),
    },
    {
      type: EditorPluginType.DropzoneImage,
      plugin: createDropzoneImagePlugin(),
      visibleInSuggestions: false,
    },
    { type: EditorPluginType.H5p, plugin: H5pPlugin },

    // Special plugins, never visible in suggestions
    // ===================================================
    { type: EditorPluginType.Rows, plugin: createRowsPlugin() },
    { type: EditorPluginType.Unsupported, plugin: unsupportedPlugin },
    { type: EditorPluginType.Article, plugin: articlePlugin },
    {
      type: EditorPluginType.ArticleIntroduction,
      plugin: createArticleIntroduction(
        editorStrings.templatePlugins.article.writeShortIntro
      ),
    },
    { type: EditorPluginType.Course, plugin: coursePlugin },
    // Internal plugins for our content types
    // ===================================================
    { type: TemplatePluginType.Applet, plugin: appletTypePlugin },
    { type: TemplatePluginType.Article, plugin: articleTypePlugin },
    { type: TemplatePluginType.Course, plugin: courseTypePlugin },
    { type: TemplatePluginType.Event, plugin: eventTypePlugin },
    { type: TemplatePluginType.Page, plugin: pageTypePlugin },
    { type: TemplatePluginType.Taxonomy, plugin: taxonomyTypePlugin },
    { type: TemplatePluginType.TextExercise, plugin: textExerciseTypePlugin },
    {
      type: TemplatePluginType.TextExerciseGroup,
      plugin: textExerciseGroupTypePlugin,
    },
    { type: TemplatePluginType.User, plugin: userTypePlugin },
    { type: TemplatePluginType.Video, plugin: videoTypePlugin },
  ]

  return allPlugins.filter(({ type }) => plugins.includes(type))
}
