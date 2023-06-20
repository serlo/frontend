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
import { LoggedInData, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'
import { importantPlugin } from '@/serlo-editor/plugins/_on-the-way-out/important/important'
import { layoutPlugin } from '@/serlo-editor/plugins/_on-the-way-out/layout'
import { anchorPlugin } from '@/serlo-editor/plugins/anchor'
import { articlePlugin } from '@/serlo-editor/plugins/article'
import { createBoxPlugin } from '@/serlo-editor/plugins/box'
import { deprecatedPlugin } from '@/serlo-editor/plugins/deprecated'
import { equationsPlugin } from '@/serlo-editor/plugins/equations'
import { errorPlugin } from '@/serlo-editor/plugins/error'
import { exercisePlugin } from '@/serlo-editor/plugins/exercise'
import { geoGebraPlugin } from '@/serlo-editor/plugins/geogebra'
import { H5pPlugin } from '@/serlo-editor/plugins/h5p/h5p'
import { createHighlightPlugin } from '@/serlo-editor/plugins/highlight'
import { imagePlugin } from '@/serlo-editor/plugins/image/image-with-serlo-config'
import { injectionPlugin } from '@/serlo-editor/plugins/injection'
import { createInputExercisePlugin } from '@/serlo-editor/plugins/input-exercise'
import { createMultimediaExplanationPlugin } from '@/serlo-editor/plugins/multimedia-explanation'
import { pageLayoutPlugin } from '@/serlo-editor/plugins/page-layout'
import { pagePartnersPlugin } from '@/serlo-editor/plugins/page-partners'
import { pageTeamPlugin } from '@/serlo-editor/plugins/page-team'
import { pasteHackPlugin } from '@/serlo-editor/plugins/paste-hack'
import { createRowsPlugin } from '@/serlo-editor/plugins/rows'
import { createScMcExercisePlugin } from '@/serlo-editor/plugins/sc-mc-exercise'
import { separatorPlugin } from '@/serlo-editor/plugins/separator'
import { createSerloTablePlugin } from '@/serlo-editor/plugins/serlo-table'
import { appletTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/applet'
import { articleTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/article'
import { courseTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/course'
import { coursePageTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/course-page'
import { eventTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/event'
import { pageTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/page'
import { taxonomyTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/taxonomy'
import { textExerciseTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/text-exercise'
import { textExerciseGroupTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/text-exercise-group'
import { textSolutionTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/text-solution'
import { userTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/user'
import { videoTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/video'
import { solutionPlugin } from '@/serlo-editor/plugins/solution'
import { createSpoilerPlugin } from '@/serlo-editor/plugins/spoiler'
import { createTextPlugin } from '@/serlo-editor/plugins/text'
import { videoPlugin } from '@/serlo-editor/plugins/video'

export enum TemplatePluginType {
  Applet = 'type-applet',
  Article = 'type-article',
  Course = 'type-course',
  CoursePage = 'type-course-page',
  Event = 'type-event',
  Page = 'type-page',
  Taxonomy = 'type-taxonomy',
  TextExercise = 'type-text-exercise',
  TextExerciseGroup = 'type-text-exercise-group',
  TextSolution = 'type-text-solution',
  Video = 'type-video',
  User = 'type-user',
}

// type PluginType = SerializedDocument['plugin'] | TemplatePluginType

export function createPlugins({
  editorStrings,
  instance,
  parentType,
}: {
  editorStrings: LoggedInData['strings']['editor']
  instance: Instance
  parentType?: string
}): PluginsContextPlugins {
  const isExercise =
    !!parentType &&
    ['grouped-text-exercise', 'text-exercise', 'text-exercise-group'].includes(
      parentType
    )
  const isPage = parentType === UuidType.Page

  return [
    {
      type: 'text',
      plugin: createTextPlugin({ serloLinkSearch: instance === Instance.De }),
      visible: true,
      icon: <IconText />,
    },
    { type: 'image', plugin: imagePlugin, visible: true, icon: <IconImage /> },
    {
      type: 'multimedia',
      plugin: createMultimediaExplanationPlugin(),
      visible: true,
      icon: <IconMultimedia />,
    },
    {
      type: 'spoiler',
      plugin: createSpoilerPlugin({}),
      visible: true,
      icon: <IconSpoiler />,
    },
    {
      type: 'box',
      plugin: createBoxPlugin({}),
      visible: true,
      icon: <IconBox />,
    },
    {
      type: 'serloTable',
      plugin: createSerloTablePlugin(),
      visible: true,
      icon: <IconTable />,
    },
    {
      type: 'injection',
      plugin: injectionPlugin,
      visible: true,
      icon: <IconInjection />,
    },
    {
      type: 'equations',
      plugin: equationsPlugin,
      visible: true,
      icon: <IconEquation />,
    },
    {
      type: 'geogebra',
      plugin: geoGebraPlugin,
      visible: true,
      icon: <IconGeogebra />,
    },
    {
      type: 'highlight',
      plugin: createHighlightPlugin(),
      visible: true,
      icon: <IconHighlight />,
    },
    { type: 'video', plugin: videoPlugin, visible: true, icon: <IconVideo /> },
    {
      type: 'anchor',
      plugin: anchorPlugin,
      visible: true,
    },
    {
      type: 'pasteHack',
      plugin: pasteHackPlugin,
      visible: shouldUseFeature('edtrPasteHack'),
    },
    {
      type: 'separator',
      plugin: separatorPlugin,
      visible: isExercise,
    },
    {
      type: 'pageLayout',
      plugin: pageLayoutPlugin,
      visible: isPage,
    },
    {
      type: 'pageTeam',
      plugin: pageTeamPlugin,
      visible: isPage,
    },
    {
      type: 'pagePartners',
      plugin: pagePartnersPlugin,
      visible: isPage,
    },

    // never visible in suggestions
    { type: 'article', plugin: articlePlugin },
    {
      type: 'articleIntroduction',
      plugin: createMultimediaExplanationPlugin({
        explanation: {
          plugin: 'text',
          config: {
            placeholder: editorStrings.templatePlugins.article.writeShortIntro,
          },
        },
        plugins: ['image'],
      }),
    },
    { type: 'error', plugin: errorPlugin },
    { type: 'deprecated', plugin: deprecatedPlugin },
    { type: 'exercise', plugin: exercisePlugin },
    { type: 'highlight', plugin: createHighlightPlugin() },
    { type: 'h5p', plugin: H5pPlugin },
    { type: 'important', plugin: importantPlugin },
    { type: 'inputExercise', plugin: createInputExercisePlugin({}) },
    { type: 'layout', plugin: layoutPlugin },
    { type: 'rows', plugin: createRowsPlugin() },
    { type: 'scMcExercise', plugin: createScMcExercisePlugin() },
    { type: 'solution', plugin: solutionPlugin },

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
