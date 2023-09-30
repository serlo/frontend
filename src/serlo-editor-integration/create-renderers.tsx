import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

import { EditorPluginType } from './types/editor-plugin-type'
import {
  EditorAnchorPlugin,
  EditorGeogebraPlugin,
  EditorHighlightPlugin,
  EditorImagePlugin,
  EditorInjectionPlugin,
  EditorVideoPlugin,
} from './types/editor-plugins'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { Instance } from '@/fetcher/graphql-types/operations'
import { ExternalProvider } from '@/helper/use-consent'
import { LinkRenderer } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@/serlo-editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@/serlo-editor/plugins/article/static'
import { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
import { EquationsStaticRenderer } from '@/serlo-editor/plugins/equations/static'
import { ExerciseStaticRenderer } from '@/serlo-editor/plugins/exercise/static'
import { parseId } from '@/serlo-editor/plugins/geogebra/renderer'
import { GeogebraStaticRenderer } from '@/serlo-editor/plugins/geogebra/static'
import { H5pSerloStaticRenderer } from '@/serlo-editor/plugins/h5p/serlo-static'
import { ImageStaticRenderer } from '@/serlo-editor/plugins/image/static'
import { InjectionStaticRenderer } from '@/serlo-editor/plugins/injection/static'
import { InputExerciseStaticRenderer } from '@/serlo-editor/plugins/input-exercise/static'
import { MultimediaStaticRendererWithLightbox } from '@/serlo-editor/plugins/multimedia/static-with-dynamic-lightbox'
import { PageLayoutStaticRenderer } from '@/serlo-editor/plugins/page-layout/static'
import { PagePartnersStaticRenderer } from '@/serlo-editor/plugins/page-partners/static'
import { PageTeamStaticRenderer } from '@/serlo-editor/plugins/page-team/static'
import { RowsStaticRenderer } from '@/serlo-editor/plugins/rows/static'
import { ScMcExerciseStaticRenderer } from '@/serlo-editor/plugins/sc-mc-exercise/static'
import { SerloTableStaticRenderer } from '@/serlo-editor/plugins/serlo-table/static'
import { StaticSolutionRenderer } from '@/serlo-editor/plugins/solution/static'
import { SpoilerStaticRenderer } from '@/serlo-editor/plugins/spoiler/static'
import type { MathElement } from '@/serlo-editor/plugins/text'
import { TextStaticRenderer } from '@/serlo-editor/plugins/text/static'
import { parseVideoUrl } from '@/serlo-editor/plugins/video/renderer'
import { VideoStaticRenderer } from '@/serlo-editor/plugins/video/static'

const HighlightStaticRenderer = dynamic<EditorHighlightPlugin>(() =>
  import('@/serlo-editor/plugins/highlight/static').then(
    (mod) => mod.HighlightStaticRenderer
  )
)

const StaticMath = dynamic<MathElement>(() =>
  import('@/serlo-editor/plugins/text/components/static-math').then(
    (mod) => mod.StaticMath
  )
)

export function createRenderers({
  instance,
  routerAsPath,
}: // isRevisionView,
{
  instance: Instance
  isRevisionView: boolean
  routerAsPath: string
}) {
  // const isPage = parentType === UuidType.Page

  return {
    pluginRenderers: [
      // plugins
      { type: EditorPluginType.Article, renderer: ArticleStaticRenderer },
      { type: EditorPluginType.Rows, renderer: RowsStaticRenderer },
      {
        type: EditorPluginType.Text,
        renderer: TextStaticRenderer,
      },
      {
        type: EditorPluginType.Image,
        renderer: (state: EditorImagePlugin) => {
          const pathNameBase = routerAsPath.split('/').pop()
          return <ImageStaticRenderer {...state} pathNameBase={pathNameBase} />
        },
      },
      {
        type: EditorPluginType.Multimedia,
        // special renderer for frontend because it uses nextjs dynamic import
        renderer: MultimediaStaticRendererWithLightbox,
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
        renderer: (state: EditorInjectionPlugin) => {
          return (
            <>
              <InjectionStaticRenderer {...state} />
              {/* {isRevisionView && <ExtraRevisionViewInfo element={element} />} */}
            </>
          )
        },
      },
      {
        type: EditorPluginType.Equations,
        renderer: EquationsStaticRenderer,
      },
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
        renderer: (state: EditorAnchorPlugin) => (
          <>
            <AnchorStaticRenderer {...state} />
            {/* {isRevisionView && (
            <span className="break-all bg-editor-primary-100 px-1 text-sm">
              {state.state}
            </span>
          )} */}
          </>
        ),
      },

      // only for pages
      {
        type: EditorPluginType.PageLayout,
        renderer: PageLayoutStaticRenderer,
      },
      {
        type: EditorPluginType.PageTeam,
        renderer: PageTeamStaticRenderer,
      },
      {
        type: EditorPluginType.PagePartners,
        renderer: PagePartnersStaticRenderer,
      },
      // { type: EditorPluginType.Unsupported, renderer: () => null },
      { type: EditorPluginType.Exercise, renderer: ExerciseStaticRenderer },
      {
        type: EditorPluginType.Highlight,
        renderer: (state: EditorHighlightPlugin) => {
          return (
            <>
              <HighlightStaticRenderer {...state} />
              {/* {isRevisionView && <ExtraRevisionViewInfo element={element} />} */}
            </>
          )
        },
      },
      { type: EditorPluginType.H5p, renderer: H5pSerloStaticRenderer },
      {
        type: EditorPluginType.InputExercise,
        renderer: InputExerciseStaticRenderer,

        // TODO: add frontend stuff
        // answers = { renderAnswers() }
        // onEvaluate = { onEvaluate }
        // { isRevisionView && renderRevisionExtra() }
      },
      {
        type: EditorPluginType.ScMcExercise,
        renderer: ScMcExerciseStaticRenderer,
      },
      { type: EditorPluginType.Solution, renderer: StaticSolutionRenderer },

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
    ],
    mathRenderer: (element: MathElement) =>
      element.inline ? (
        <StaticMath {...element} />
      ) : (
        <Lazy slim>
          <StaticMath {...element} />
        </Lazy>
      ),
    linkRenderer: ({ href, children }: ComponentProps<LinkRenderer>) => {
      // TODO: isOnProfile logic
      const isOnProfile = false
      return (
        <Link href={href} unreviewed={isOnProfile}>
          {children}
        </Link>
      )

      // {isRevisionView && <ExtraRevisionViewInfo element={element} />}
    },
  }
}
