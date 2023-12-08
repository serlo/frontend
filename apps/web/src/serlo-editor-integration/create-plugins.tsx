import IconAudio from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-audio.svg'
import IconBox from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-box.svg'
import IconEquation from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconGeogebra from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconImage from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-image.svg'
import IconInjection from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-injection.svg'
import IconMultimedia from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-text.svg'
import IconVideo from '@serlo/editor/src/editor-ui/assets/plugin-icons/icon-video.svg'
import type { PluginsWithData } from '@serlo/editor/src/plugin/helpers/editor-plugins'
import { anchorPlugin } from '@serlo/editor/src/plugins/anchor'
import { articlePlugin } from '@serlo/editor/src/plugins/article'
import { audioPlugin } from '@serlo/editor/src/plugins/audio'
import { createBoxPlugin } from '@serlo/editor/src/plugins/box'
import { equationsPlugin } from '@serlo/editor/src/plugins/equations'
import { exercisePlugin } from '@serlo/editor/src/plugins/exercise'
import { fillInTheBlanksExercise } from '@serlo/editor/src/plugins/fill-in-the-blanks-exercise'
import { geoGebraPlugin } from '@serlo/editor/src/plugins/geogebra'
import { H5pPlugin } from '@serlo/editor/src/plugins/h5p'
import { createHighlightPlugin } from '@serlo/editor/src/plugins/highlight'
import { imagePlugin } from '@serlo/editor/src/plugins/image/image-with-serlo-config'
import { injectionPlugin } from '@serlo/editor/src/plugins/injection'
import { createInputExercisePlugin } from '@serlo/editor/src/plugins/input-exercise'
import { createMultimediaPlugin } from '@serlo/editor/src/plugins/multimedia'
import { pageLayoutPlugin } from '@serlo/editor/src/plugins/page-layout'
import { pagePartnersPlugin } from '@serlo/editor/src/plugins/page-partners'
import { pageTeamPlugin } from '@serlo/editor/src/plugins/page-team'
import { pasteHackPlugin } from '@serlo/editor/src/plugins/paste-hack'
import { createRowsPlugin } from '@serlo/editor/src/plugins/rows'
import { createScMcExercisePlugin } from '@serlo/editor/src/plugins/sc-mc-exercise'
import { createSerloTablePlugin } from '@serlo/editor/src/plugins/serlo-table'
import { appletTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/applet'
import { articleTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/article'
import { courseTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/course/course'
import { coursePageTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/course/course-page'
import { eventTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/event'
import { textExerciseGroupTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import { pageTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/page'
import { taxonomyTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/taxonomy'
import { textExerciseTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/text-exercise'
import { userTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/user'
import { videoTypePlugin } from '@serlo/editor/src/plugins/serlo-template-plugins/video'
import { solutionPlugin } from '@serlo/editor/src/plugins/solution'
import { createSpoilerPlugin } from '@serlo/editor/src/plugins/spoiler'
import { createTextPlugin } from '@serlo/editor/src/plugins/text'
import { unsupportedPlugin } from '@serlo/editor/src/plugins/unsupported'
import { videoPlugin } from '@serlo/editor/src/plugins/video'
import { EditorPluginType } from '@serlo/editor/src/types/editor-plugin-type'
import { TemplatePluginType } from '@serlo/editor/src/types/template-plugin-type'

import { shouldUseFeature } from '@/components/user/profile-experimental'
import { type LoggedInData, UuidType } from '@/data-types'
import { isProduction } from '@/helper/is-production'

export function createPlugins({
  editorStrings,
  parentType,
}: {
  editorStrings: LoggedInData['strings']['editor']
  parentType?: string
}): PluginsWithData {
  const isPage = parentType === UuidType.Page

  return [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
      visibleInSuggestions: true,
      icon: <IconText />,
    },
    {
      type: EditorPluginType.Image,
      plugin: imagePlugin,
      visibleInSuggestions: true,
      icon: <IconImage />,
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(),
      visibleInSuggestions: true,
      icon: <IconMultimedia />,
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin(),
      visibleInSuggestions: true,
      icon: <IconSpoiler />,
    },
    {
      type: EditorPluginType.Box,
      plugin: createBoxPlugin({}),
      visibleInSuggestions: true,
      icon: <IconBox />,
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin(),
      visibleInSuggestions: true,
      icon: <IconTable />,
    },
    {
      type: EditorPluginType.Injection,
      plugin: injectionPlugin,
      visibleInSuggestions: true,
      icon: <IconInjection />,
    },
    {
      type: EditorPluginType.Equations,
      plugin: equationsPlugin,
      visibleInSuggestions: true,
      icon: <IconEquation />,
    },
    {
      type: EditorPluginType.Geogebra,
      plugin: geoGebraPlugin,
      visibleInSuggestions: true,
      icon: <IconGeogebra />,
    },
    {
      type: EditorPluginType.Highlight,
      plugin: createHighlightPlugin(),
      visibleInSuggestions: true,
      icon: <IconHighlight />,
    },
    {
      type: EditorPluginType.Video,
      plugin: videoPlugin,
      visibleInSuggestions: true,
      icon: <IconVideo />,
    },
    ...(isProduction
      ? []
      : [
          {
            type: EditorPluginType.Audio,
            plugin: audioPlugin,
            visibleInSuggestions: true,
            icon: <IconAudio />,
          },
        ]),
    {
      type: EditorPluginType.Anchor,
      plugin: anchorPlugin,
      visibleInSuggestions: true,
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
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
      visibleInSuggestions: !isProduction,
    },
    { type: EditorPluginType.Solution, plugin: solutionPlugin },
    { type: EditorPluginType.H5p, plugin: H5pPlugin },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin({
        feedback: {
          plugin: EditorPluginType.Text,
          config: {
            placeholder:
              editorStrings.templatePlugins.inputExercise.feedbackPlaceholder,
          },
        },
      }),
    },
    { type: EditorPluginType.ScMcExercise, plugin: createScMcExercisePlugin() },
    ...(isProduction
      ? []
      : [
          {
            type: EditorPluginType.FillInTheBlanksExercise,
            plugin: fillInTheBlanksExercise,
          },
        ]),

    // Special plugins, never visible in suggestions
    // ===================================================
    { type: EditorPluginType.Rows, plugin: createRowsPlugin() },
    { type: EditorPluginType.Unsupported, plugin: unsupportedPlugin },
    { type: EditorPluginType.Article, plugin: articlePlugin },
    {
      type: EditorPluginType.ArticleIntroduction,
      plugin: createMultimediaPlugin({
        explanation: {
          plugin: EditorPluginType.Text,
          config: {
            placeholder: editorStrings.templatePlugins.article.writeShortIntro,
          },
        },
        allowedPlugins: [EditorPluginType.Image],
      }),
    },

    // Internal plugins for our content types
    // ===================================================
    { type: TemplatePluginType.Applet, plugin: appletTypePlugin },
    { type: TemplatePluginType.Article, plugin: articleTypePlugin },
    { type: TemplatePluginType.Course, plugin: courseTypePlugin },
    { type: TemplatePluginType.CoursePage, plugin: coursePageTypePlugin },
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
}
