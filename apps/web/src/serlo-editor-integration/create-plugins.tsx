import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg'
import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconFillGaps from '@editor/editor-ui/assets/plugin-icons/icon-fill-the-gap.svg'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconPencil from '@editor/editor-ui/assets/plugin-icons/icon-pencil.svg'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg'
import IconImageGallery from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-image-gallery.svg'
import type { PluginsWithData } from '@editor/plugin/helpers/editor-plugins'
import { anchorPlugin } from '@editor/plugins/anchor'
import { articlePlugin } from '@editor/plugins/article'
import { audioPlugin } from '@editor/plugins/audio'
import { blanksExercise } from '@editor/plugins/blanks-exercise'
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
import { createMultimediaPlugin } from '@editor/plugins/multimedia'
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
    ...(isProduction
      ? []
      : [
          {
            type: EditorPluginType.ImageGallery,
            plugin: createImageGalleryPlugin(),
            visibleInSuggestions: true,
            icon: <IconImageGallery />,
          },
        ]),
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(),
      visibleInSuggestions: true,
      icon: <IconMultimedia />,
    },
    {
      type: EditorPluginType.DropzoneImage,
      plugin: createDropzoneImagePlugin(),
      visibleInSuggestions: false,
      icon: <IconDropzones />,
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
      icon: <IconPencil />,
    },
    { type: EditorPluginType.H5p, plugin: H5pPlugin, icon: <IconH5p /> },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin(),
      icon: <IconTextArea />,
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: createScMcExercisePlugin(),
      icon: <IconScMcExercise />,
      visibleInSuggestions: true,
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: blanksExercise,
      icon: <IconFillGaps />,
    },

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
}
