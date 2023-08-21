import { EditorPluginType } from './types/editor-plugin-type'
import { TemplatePluginType } from './types/template-plugin-type'
import IconBox from '@/assets-webkit/img/editor/icon-box.svg'
import IconEquation from '@/assets-webkit/img/editor/icon-equation.svg'
import IconGeogebra from '@/assets-webkit/img/editor/icon-geogebra.svg'
import IconHighlight from '@/assets-webkit/img/editor/icon-highlight.svg'
import IconImage from '@/assets-webkit/img/editor/icon-image.svg'
import IconInjection from '@/assets-webkit/img/editor/icon-injection.svg'
import IconMultimedia from '@/assets-webkit/img/editor/icon-multimedia.svg'
import IconSpoiler from '@/assets-webkit/img/editor/icon-spoiler.svg'
import IconTable from '@/assets-webkit/img/editor/icon-table.svg'
import IconText from '@/assets-webkit/img/editor/icon-text.svg'
import IconVideo from '@/assets-webkit/img/editor/icon-video.svg'
import { shouldUseFeature } from '@/components/user/profile-experimental'
import { type LoggedInData, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import type { PluginsWithData } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { importantPlugin } from '@/serlo-editor/plugins/_on-the-way-out/important/important'
import { layoutPlugin } from '@/serlo-editor/plugins/_on-the-way-out/layout'
import { anchorPlugin } from '@/serlo-editor/plugins/anchor'
import { articlePlugin } from '@/serlo-editor/plugins/article'
import { createBoxPlugin } from '@/serlo-editor/plugins/box'
import { equationsPlugin } from '@/serlo-editor/plugins/equations'
import { exercisePlugin } from '@/serlo-editor/plugins/exercise'
import { geoGebraPlugin } from '@/serlo-editor/plugins/geogebra'
import { H5pPlugin } from '@/serlo-editor/plugins/h5p'
import { createHighlightPlugin } from '@/serlo-editor/plugins/highlight'
import { imagePlugin } from '@/serlo-editor/plugins/image/image-with-serlo-config'
import { injectionPlugin } from '@/serlo-editor/plugins/injection'
import { createInputExercisePlugin } from '@/serlo-editor/plugins/input-exercise'
import { createMultimediaPlugin } from '@/serlo-editor/plugins/multimedia'
import { pageLayoutPlugin } from '@/serlo-editor/plugins/page-layout'
import { pagePartnersPlugin } from '@/serlo-editor/plugins/page-partners'
import { pageTeamPlugin } from '@/serlo-editor/plugins/page-team'
import { pasteHackPlugin } from '@/serlo-editor/plugins/paste-hack'
import { createRowsPlugin } from '@/serlo-editor/plugins/rows'
import { createScMcExercisePlugin } from '@/serlo-editor/plugins/sc-mc-exercise'
import { createSerloTablePlugin } from '@/serlo-editor/plugins/serlo-table'
import { appletTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/applet'
import { articleTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/article'
import { courseTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/course/course'
import { coursePageTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/course/course-page'
import { eventTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/event'
import { pageTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/page'
import { taxonomyTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/taxonomy'
import { textExerciseTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/text-exercise'
import { textExerciseGroupTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/text-exercise-group'
import { textSolutionTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/text-solution'
import { userTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/user'
import { videoTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/video'
import { solutionPlugin } from '@/serlo-editor/plugins/solution'
import { createSpoilerPlugin } from '@/serlo-editor/plugins/spoiler'
import { createTextPlugin } from '@/serlo-editor/plugins/text'
import { unsupportedPlugin } from '@/serlo-editor/plugins/unsupported'
import { videoPlugin } from '@/serlo-editor/plugins/video'

export function createPlugins({
  editorStrings,
  instance,
  parentType,
}: {
  editorStrings: LoggedInData['strings']['editor']
  instance: Instance
  parentType?: string
}): PluginsWithData {
  const isPage = parentType === UuidType.Page

  return [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({ serloLinkSearch: instance === Instance.De }),
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

    // never visible in suggestions
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
    { type: EditorPluginType.Unsupported, plugin: unsupportedPlugin },
    { type: EditorPluginType.Exercise, plugin: exercisePlugin },
    { type: EditorPluginType.Highlight, plugin: createHighlightPlugin() },
    { type: EditorPluginType.H5p, plugin: H5pPlugin },
    { type: EditorPluginType.Important, plugin: importantPlugin },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin({}),
    },
    { type: EditorPluginType.Layout, plugin: layoutPlugin },
    { type: EditorPluginType.Rows, plugin: createRowsPlugin() },
    { type: EditorPluginType.ScMcExercise, plugin: createScMcExercisePlugin() },
    { type: EditorPluginType.Solution, plugin: solutionPlugin },

    // Internal plugins for our content types
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
    { type: TemplatePluginType.TextSolution, plugin: textSolutionTypePlugin },
    { type: TemplatePluginType.User, plugin: userTypePlugin },
    { type: TemplatePluginType.Video, plugin: videoTypePlugin },
  ]
}
