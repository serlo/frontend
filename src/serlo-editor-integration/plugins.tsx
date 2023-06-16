import type { SerializedDocument } from './types/serialized-document'
import { LoggedInData } from '@/data-types'
import type { EditorPlugin } from '@/serlo-editor/plugin'
import { createBlockquotePlugin } from '@/serlo-editor/plugins/_on-the-way-out/blockquote'
import { importantPlugin } from '@/serlo-editor/plugins/_on-the-way-out/important/important'
import { layoutPlugin } from '@/serlo-editor/plugins/_on-the-way-out/layout'
import { tablePlugin } from '@/serlo-editor/plugins/_on-the-way-out/table/table-with-markdown'
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

export enum SerloEntityPluginType {
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

type PluginType = SerializedDocument['plugin'] | SerloEntityPluginType

export function createPlugins({
  editorStrings,
}: {
  editorStrings: LoggedInData['strings']['editor']
}): Record<string, EditorPlugin<any, any>> &
  Record<PluginType, EditorPlugin<any, any>> {
  return {
    anchor: anchorPlugin,
    article: articlePlugin,
    articleIntroduction: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'text',
        config: {
          placeholder: editorStrings.article.writeShortIntro,
        },
      },
      plugins: ['image'],
    }),
    blockquote: createBlockquotePlugin(),
    box: createBoxPlugin({}),
    error: errorPlugin,
    deprecated: deprecatedPlugin,
    equations: equationsPlugin,
    exercise: exercisePlugin,
    geogebra: geoGebraPlugin,
    highlight: createHighlightPlugin(),
    h5p: H5pPlugin,
    image: imagePlugin,
    important: importantPlugin,
    injection: injectionPlugin,
    inputExercise: createInputExercisePlugin({}),
    layout: layoutPlugin,
    pageLayout: pageLayoutPlugin,
    pageTeam: pageTeamPlugin,
    pagePartners: pagePartnersPlugin,
    pasteHack: pasteHackPlugin,
    multimedia: createMultimediaExplanationPlugin(),
    rows: createRowsPlugin(),
    scMcExercise: createScMcExercisePlugin(),
    separator: separatorPlugin,
    serloTable: createSerloTablePlugin(),
    solution: solutionPlugin,
    spoiler: createSpoilerPlugin({}),
    table: tablePlugin,
    text: createTextPlugin(),
    video: videoPlugin,

    // Internal plugins for our content types
    [SerloEntityPluginType.Applet]: appletTypePlugin,
    [SerloEntityPluginType.Article]: articleTypePlugin,
    [SerloEntityPluginType.Course]: courseTypePlugin,
    [SerloEntityPluginType.CoursePage]: coursePageTypePlugin,
    [SerloEntityPluginType.Event]: eventTypePlugin,
    [SerloEntityPluginType.Page]: pageTypePlugin,
    [SerloEntityPluginType.Taxonomy]: taxonomyTypePlugin,
    [SerloEntityPluginType.TextExercise]: textExerciseTypePlugin,
    [SerloEntityPluginType.TextExerciseGroup]: textExerciseGroupTypePlugin,
    [SerloEntityPluginType.TextSolution]: textSolutionTypePlugin,
    [SerloEntityPluginType.User]: userTypePlugin,
    [SerloEntityPluginType.Video]: videoTypePlugin,
  }
}
