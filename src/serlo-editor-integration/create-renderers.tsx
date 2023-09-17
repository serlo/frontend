import { EditorPluginType } from './types/editor-plugin-type'
import { EditorAnchorPlugin } from './types/editor-plugins'
import { ExtraRevisionViewInfo } from '@/schema/extra-revision-view-info'
import type { PluginStaticRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@/serlo-editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@/serlo-editor/plugins/article/static'
import { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
import { EquationsStaticRenderer } from '@/serlo-editor/plugins/equations/static'
import { GeogebraStaticRenderer } from '@/serlo-editor/plugins/geogebra/static'
import { HighlightStaticRenderer } from '@/serlo-editor/plugins/highlight/static'
import { ImageStaticRenderer } from '@/serlo-editor/plugins/image/static'
import { InjectionStaticRenderer } from '@/serlo-editor/plugins/injection/static'
import { MultimediaStaticRenderer } from '@/serlo-editor/plugins/multimedia/static'
import { RowsStaticRenderer } from '@/serlo-editor/plugins/rows/static'
import { SerloTableStaticRenderer } from '@/serlo-editor/plugins/serlo-table/static'
import { SpoilerStaticRenderer } from '@/serlo-editor/plugins/spoiler/static'
import { TextStaticRenderer } from '@/serlo-editor/plugins/text/static'
import { VideoStaticRenderer } from '@/serlo-editor/plugins/video/static'

export function createRenderers(): PluginStaticRenderers {
  // const isPage = parentType === UuidType.Page

  return [
    { type: EditorPluginType.Article, renderer: ArticleStaticRenderer },
    { type: EditorPluginType.Rows, renderer: RowsStaticRenderer },
    {
      type: EditorPluginType.Text,
      renderer: TextStaticRenderer,
    },
    {
      type: EditorPluginType.Image,
      renderer: ImageStaticRenderer,
    },
    {
      type: EditorPluginType.Multimedia,
      renderer: MultimediaStaticRenderer,
    },
    {
      type: EditorPluginType.Spoiler,
      renderer: SpoilerStaticRenderer,
    },
    {
      type: EditorPluginType.Box,
      renderer: BoxStaticRenderer,
    },
    {
      type: EditorPluginType.SerloTable,
      renderer: SerloTableStaticRenderer,
    },
    {
      type: EditorPluginType.Injection,
      renderer: InjectionStaticRenderer,
    },
    {
      type: EditorPluginType.Equations,
      renderer: EquationsStaticRenderer,
    },
    {
      type: EditorPluginType.Geogebra,
      renderer: GeogebraStaticRenderer,
    },
    {
      type: EditorPluginType.Highlight,
      renderer: HighlightStaticRenderer,
    },
    {
      type: EditorPluginType.Video,
      renderer: VideoStaticRenderer,
    },
    // ...(isProduction
    //   ? []
    //   : [
    //       {
    //         type: EditorPluginType.Audio,
    //         renderer: audioPlugin,
    //       } as PluginWithData,
    //     ]),
    {
      type: EditorPluginType.Anchor,
      renderer: (state: EditorAnchorPlugin) => (
        <>
          <AnchorStaticRenderer {...state} />
          {/* TODO: use provider to activate Revision view */}
          {/* {isRevisionView && <ExtraRevisionViewInfo element={element} />} */}
        </>
      ),
    },
    // {
    //   type: EditorPluginType.PasteHack,
    //   renderer: PasteHackStaticRenderer,
    //   visibleInSuggestions: shouldUseFeature('edtrPasteHack'),
    // },
    // {
    //   type: EditorPluginType.PageLayout,
    //   renderer: PageLayoutStaticRenderer,
    //   visibleInSuggestions: isPage,
    // },
    // {
    //   type: EditorPluginType.PageTeam,
    //   renderer: PageTeamStaticRenderer,
    //   visibleInSuggestions: isPage,
    // },
    // {
    //   type: EditorPluginType.PagePartners,
    //   renderer: PagePartnersStaticRenderer,
    //   visibleInSuggestions: isPage,
    // },
    // {
    //   type: EditorPluginType.ArticleIntroduction,
    //   renderer: ArticleIntroductionStaticRenderer{
    //     explanation: {
    //       renderer: EditorPluginType.Text,
    //       config: {
    //         placeholder: editorStrings.templatePlugins.article.writeShortIntro,
    //       },
    //     },
    //     allowedPlugins: [EditorPluginType.Image],
    //   }),
    // },
    // { type: EditorPluginType.Unsupported, renderer: unsupportedPlugin },
    // { type: EditorPluginType.Exercise, renderer: exercisePlugin },
    // { type: EditorPluginType.Highlight, renderer: createHighlightPlugin() },
    // { type: EditorPluginType.H5p, renderer: H5pPlugin },
    // {
    //   type: EditorPluginType.InputExercise,
    //   renderer: InputExerciseStaticRenderer,
    // },
    // { type: EditorPluginType.Layout, renderer: layoutPlugin },

    // { type: EditorPluginType.ScMcExercise, renderer: createScMcExercisePlugin() },
    // { type: EditorPluginType.Solution, renderer: solutionPlugin },

    // // Internal plugins for our content types
    // { type: TemplatePluginType.Applet, renderer: appletTypePlugin },
    // { type: TemplatePluginType.Article, renderer: articleTypePlugin },
    // { type: TemplatePluginType.Course, renderer: courseTypePlugin },
    // { type: TemplatePluginType.CoursePage, renderer: coursePageTypePlugin },
    // { type: TemplatePluginType.Event, renderer: eventTypePlugin },
    // { type: TemplatePluginType.Page, renderer: pageTypePlugin },
    // { type: TemplatePluginType.Taxonomy, renderer: taxonomyTypePlugin },
    // { type: TemplatePluginType.TextExercise, renderer: textExerciseTypePlugin },
    // {
    //   type: TemplatePluginType.TextExerciseGroup,
    //   renderer: TextExerciseGroupStaticRenderer,
    // },
    // { type: TemplatePluginType.TextSolution, renderer: textSolutionTypePlugin },
    // { type: TemplatePluginType.User, renderer: userTypePlugin },
    // { type: TemplatePluginType.Video, renderer: videoTypePlugin },
  ]
}
