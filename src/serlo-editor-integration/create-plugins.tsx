import { createBasicPlugins } from './create-basic-plugins'
import { EditorPluginType } from '../serlo-editor/types/editor-plugin-type'
import { TemplatePluginType } from '../serlo-editor/types/template-plugin-type'
import { shouldUseFeature } from '@/components/user/profile-experimental'
import { type LoggedInData, UuidType } from '@/data-types'
import { isProduction } from '@/helper/is-production'
import IconAudio from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-audio.svg'
import IconImage from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-image.svg'
import IconInjection from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-injection.svg'
import IconVideo from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-video.svg'
import type { PluginsWithData } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { anchorPlugin } from '@/serlo-editor/plugins/anchor'
import { articlePlugin } from '@/serlo-editor/plugins/article'
import { audioPlugin } from '@/serlo-editor/plugins/audio'
import { fillInTheBlanksExercise } from '@/serlo-editor/plugins/fill-in-the-blanks-exercise'
import { H5pPlugin } from '@/serlo-editor/plugins/h5p'
import { imagePlugin } from '@/serlo-editor/plugins/image/image-with-serlo-config'
import { injectionPlugin } from '@/serlo-editor/plugins/injection'
import { createMultimediaPlugin } from '@/serlo-editor/plugins/multimedia'
import { pageLayoutPlugin } from '@/serlo-editor/plugins/page-layout'
import { pagePartnersPlugin } from '@/serlo-editor/plugins/page-partners'
import { pageTeamPlugin } from '@/serlo-editor/plugins/page-team'
import { pasteHackPlugin } from '@/serlo-editor/plugins/paste-hack'
import { appletTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/applet'
import { articleTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/article'
import { courseTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/course/course'
import { coursePageTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/course/course-page'
import { eventTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/event'
import { textExerciseGroupTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
import { pageTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/page'
import { taxonomyTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/taxonomy'
import { textExerciseTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/text-exercise'
import { userTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/user'
import { videoTypePlugin } from '@/serlo-editor/plugins/serlo-template-plugins/video'
import { videoPlugin } from '@/serlo-editor/plugins/video'

export function createPlugins({
  editorStrings,
  parentType,
}: {
  editorStrings: LoggedInData['strings']['editor']
  parentType?: string
}): PluginsWithData {
  const isPage = parentType === UuidType.Page

  return [
    ...createBasicPlugins({
      editorStrings,
      exerciseVisibleInSuggestion: !isProduction,
      allowImageInTableCells: true,
    }),
    {
      type: EditorPluginType.Image,
      plugin: imagePlugin,
      visibleInSuggestions: true,
      icon: <IconImage />,
    },
    {
      type: EditorPluginType.Injection,
      plugin: injectionPlugin,
      visibleInSuggestions: true,
      icon: <IconInjection />,
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

    { type: EditorPluginType.H5p, plugin: H5pPlugin },
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
