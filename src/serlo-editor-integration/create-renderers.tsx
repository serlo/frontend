import dynamic from 'next/dynamic'

import { AnchorSerloStaticRenderer } from './serlo-plugin-wrappers/anchor-serlo-static-renderer'
import { ImageSerloStaticRenderer } from './serlo-plugin-wrappers/image-serlo-static-renderer'
import { InjectionSerloStaticRenderer } from './serlo-plugin-wrappers/injection-serlo-static-renderer'
import { LinkSerloRenderer } from './serlo-plugin-wrappers/link-renderer'
import { EditorPluginType } from './types/editor-plugin-type'
import type {
  EditorExercisePlugin,
  EditorGeogebraPlugin,
  EditorH5PPlugin,
  EditorHighlightPlugin,
  EditorInputExercisePlugin,
  EditorScMcExercisePlugin,
  EditorSolutionPlugin,
  EditorSpoilerPlugin,
  EditorTemplateGroupedExercise,
  EditorVideoPlugin,
} from './types/editor-plugins'
import { TemplatePluginType } from './types/template-plugin-type'
import { Lazy } from '@/components/content/lazy'
import type { PrivacyWrapperProps } from '@/components/content/privacy-wrapper'
import { isPrintMode } from '@/components/print-mode'
import { Instance } from '@/fetcher/graphql-types/operations'
import { ExternalProvider } from '@/helper/use-consent'
import { InitRenderersArgs } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { ArticleStaticRenderer } from '@/serlo-editor/plugins/article/static'
import { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
import { EquationsStaticRenderer } from '@/serlo-editor/plugins/equations/static'
import { parseId } from '@/serlo-editor/plugins/geogebra/renderer'
import { GeogebraStaticRenderer } from '@/serlo-editor/plugins/geogebra/static'
import { MultimediaStaticRendererWithLightbox } from '@/serlo-editor/plugins/multimedia/static-with-dynamic-lightbox'
import { PageLayoutStaticRenderer } from '@/serlo-editor/plugins/page-layout/static'
import { PagePartnersStaticRenderer } from '@/serlo-editor/plugins/page-partners/static'
import { PageTeamStaticRenderer } from '@/serlo-editor/plugins/page-team/static'
import { RowsStaticRenderer } from '@/serlo-editor/plugins/rows/static'
import { SerloTableStaticRenderer } from '@/serlo-editor/plugins/serlo-table/static'
import { SpoilerStaticRenderer } from '@/serlo-editor/plugins/spoiler/static'
import type { MathElement } from '@/serlo-editor/plugins/text'
import { TextStaticRenderer } from '@/serlo-editor/plugins/text/static'
import { parseVideoUrl } from '@/serlo-editor/plugins/video/renderer'
import { VideoStaticRenderer } from '@/serlo-editor/plugins/video/static'

const ExerciseSerloStaticRenderer = dynamic<EditorExercisePlugin>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/exercise-serlo-static-renderer'
  ).then((mod) => mod.ExerciseSerloStaticRenderer)
)
const H5pSerloStaticRenderer = dynamic<EditorH5PPlugin>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/h5p-serlo-static'
  ).then((mod) => mod.H5pSerloStaticRenderer)
)
const InputSerloStaticRenderer = dynamic<EditorInputExercisePlugin>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/input-serlo-static-renderer'
  ).then((mod) => mod.InputSerloStaticRenderer)
)
const SerloScMcExerciseStaticRenderer = dynamic<EditorScMcExercisePlugin>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/sc-mc-serlo-static-renderer'
  ).then((mod) => mod.ScMcSerloStaticRenderer)
)
const SolutionSerloStaticRenderer = dynamic<EditorSolutionPlugin>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/solution-serlo-static-renderer'
  ).then((mod) => mod.SolutionSerloStaticRenderer)
)
const TextExerciseGroupTypeStaticRenderer =
  dynamic<EditorTemplateGroupedExercise>(() =>
    import(
      '@/serlo-editor/plugins/serlo-template-plugins/exercise-group/static'
    ).then((mod) => mod.TextExerciseGroupTypeStaticRenderer)
  )
const HighlightSerloStaticRenderer = dynamic<EditorHighlightPlugin>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/highlight-serlo-static-renderer'
  ).then((mod) => mod.HighlightSerloStaticRenderer)
)
const StaticMath = dynamic<MathElement>(() =>
  import('@/serlo-editor/plugins/text/components/static-math').then(
    (mod) => mod.StaticMath
  )
)
const PrivacyWrapper = dynamic<PrivacyWrapperProps>(() =>
  import('@/components/content/privacy-wrapper').then(
    (mod) => mod.PrivacyWrapper
  )
)

export function createRenderers({
  instance,
}: {
  instance: Instance
  isRevisionView?: boolean
}): InitRenderersArgs {
  return {
    pluginRenderers: [
      // plugins
      { type: EditorPluginType.Article, renderer: ArticleStaticRenderer },
      { type: EditorPluginType.Rows, renderer: RowsStaticRenderer },
      { type: EditorPluginType.Text, renderer: TextStaticRenderer },
      { type: EditorPluginType.Image, renderer: ImageSerloStaticRenderer },
      {
        type: EditorPluginType.Multimedia,
        // special renderer for frontend because it uses nextjs dynamic import
        renderer: MultimediaStaticRendererWithLightbox,
      },
      {
        type: EditorPluginType.Spoiler,
        renderer: (state: EditorSpoilerPlugin) => {
          return (
            <SpoilerStaticRenderer {...state} openOverwrite={isPrintMode} />
          )
        },
      },
      { type: EditorPluginType.Box, renderer: BoxStaticRenderer },
      { type: EditorPluginType.SerloTable, renderer: SerloTableStaticRenderer },
      {
        type: EditorPluginType.Injection,
        renderer: InjectionSerloStaticRenderer,
      },
      { type: EditorPluginType.Equations, renderer: EquationsStaticRenderer },
      {
        type: EditorPluginType.Geogebra,
        renderer: (state: EditorGeogebraPlugin) => {
          if (!state.state) return null
          const { url } = parseId(state.state)
          return (
            <Lazy noPrint>
              <PrivacyWrapper
                type="applet"
                provider={ExternalProvider.GeoGebra}
                embedUrl={url}
                className="print:hidden"
              >
                <GeogebraStaticRenderer {...state} />
              </PrivacyWrapper>
              <p className="serlo-p hidden print:block">[{url}]</p>
            </Lazy>
          )
        },
      },
      {
        type: EditorPluginType.Video,
        renderer: (state: EditorVideoPlugin) => {
          const { src } = state.state
          if (!src) return null
          const [iframeSrc, type] = parseVideoUrl(src, instance)
          return (
            <Lazy noPrint>
              <PrivacyWrapper
                type="video"
                provider={type as unknown as ExternalProvider}
                embedUrl={iframeSrc}
                className="print:hidden"
              >
                <VideoStaticRenderer {...state} />
              </PrivacyWrapper>
              <p className="serlo-p hidden print:block">[{src}]</p>
            </Lazy>
          )
        },
      },
      {
        type: EditorPluginType.Anchor,
        renderer: AnchorSerloStaticRenderer,
      },

      // only for pages
      { type: EditorPluginType.PageLayout, renderer: PageLayoutStaticRenderer },
      { type: EditorPluginType.PageTeam, renderer: PageTeamStaticRenderer },
      {
        type: EditorPluginType.PagePartners,
        renderer: PagePartnersStaticRenderer,
      },

      // exercises
      {
        type: EditorPluginType.Exercise,
        renderer: ExerciseSerloStaticRenderer,
      },
      {
        type: EditorPluginType.Highlight,
        renderer: HighlightSerloStaticRenderer,
      },
      { type: EditorPluginType.H5p, renderer: H5pSerloStaticRenderer },
      {
        type: EditorPluginType.InputExercise,
        renderer: InputSerloStaticRenderer,
      },
      {
        type: EditorPluginType.ScMcExercise,
        renderer: SerloScMcExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.Solution,
        renderer: SolutionSerloStaticRenderer,
      },

      // // Internal template plugins for our content types
      // { type: TemplatePluginType.Applet, renderer: appletTypePlugin },
      // { type: TemplatePluginType.Article, renderer: articleTypePlugin },
      // { type: TemplatePluginType.Course, renderer: courseTypePlugin },
      // { type: TemplatePluginType.CoursePage, renderer: coursePageTypePlugin },
      // { type: TemplatePluginType.Event, renderer: eventTypePlugin },
      // { type: TemplatePluginType.Page, renderer: pageTypePlugin },
      // { type: TemplatePluginType.Taxonomy, renderer: taxonomyTypePlugin },
      // { type: TemplatePluginType.TextExercise, renderer: textExerciseTypePlugin },
      {
        type: TemplatePluginType.TextExerciseGroup,
        renderer: TextExerciseGroupTypeStaticRenderer,
      },
      {
        type: 'exercise-group',
        renderer: TextExerciseGroupTypeStaticRenderer,
      },
      // { type: TemplatePluginType.TextSolution, renderer: textSolutionTypePlugin },
      // { type: TemplatePluginType.User, renderer: userTypePlugin },
      // { type: TemplatePluginType.Video, renderer: videoTypePlugin },

      {
        type: EditorPluginType.Unsupported,
        renderer: (state: unknown) => {
          // eslint-disable-next-line no-console
          console.warn('unsupported renderer: ', state)
          return null
        },
      },
    ],
    mathRenderer: (element: MathElement) =>
      element.inline ? (
        <StaticMath {...element} />
      ) : (
        <Lazy slim>
          <StaticMath {...element} />
        </Lazy>
      ),
    linkRenderer: LinkSerloRenderer,
  }
}
