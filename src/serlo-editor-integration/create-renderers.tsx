import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

import { ExtraInfoIfRevisionView } from './extra-info-if-revision-view'
import { ImageSerloStaticRenderer } from './serlo-plugin-wrappers/image-serlo-static-renderer'
import { EditorPluginType } from './types/editor-plugin-type'
import type {
  EditorAnchorDocument,
  EditorEquationsDocument,
  EditorExerciseDocument,
  EditorGeogebraDocument,
  EditorH5PDocument,
  EditorHighlightDocument,
  EditorInjectionDocument,
  EditorInputExerciseDocument,
  EditorPageLayoutDocument,
  EditorPagePartnersDocument,
  EditorPageTeamDocument,
  EditorScMcExerciseDocument,
  EditorSerloTableDocument,
  EditorSolutionDocument,
  EditorSpoilerDocument,
  EditorTemplateGroupedExerciseDocument,
  EditorVideoDocument,
} from './types/editor-plugins'
import { TemplatePluginType } from './types/template-plugin-type'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import type { PrivacyWrapperProps } from '@/components/content/privacy-wrapper'
import { isPrintMode } from '@/components/print-mode'
import { Instance } from '@/fetcher/graphql-types/operations'
import { ExternalProvider } from '@/helper/use-consent'
import {
  InitRenderersArgs,
  LinkRenderer,
} from '@/serlo-editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@/serlo-editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@/serlo-editor/plugins/article/static'
import { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
import { parseId } from '@/serlo-editor/plugins/geogebra/renderer'
import { GeogebraStaticRenderer } from '@/serlo-editor/plugins/geogebra/static'
import { RowsStaticRenderer } from '@/serlo-editor/plugins/rows/static'
import { SpoilerStaticRenderer } from '@/serlo-editor/plugins/spoiler/static'
import type { MathElement } from '@/serlo-editor/plugins/text'
import { TextStaticRenderer } from '@/serlo-editor/plugins/text/static'
import { parseVideoUrl } from '@/serlo-editor/plugins/video/renderer'
import { VideoStaticRenderer } from '@/serlo-editor/plugins/video/static'
import { MultimediaSerloStaticRenderer } from '@/serlo-editor-integration/serlo-plugin-wrappers/multimedia-serlo-static-renderer'

const EquationsStaticRenderer = dynamic<EditorEquationsDocument>(() =>
  import('@/serlo-editor/plugins/equations/static').then(
    (mod) => mod.EquationsStaticRenderer
  )
)
const ExerciseSerloStaticRenderer = dynamic<EditorExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/exercise-serlo-static-renderer'
  ).then((mod) => mod.ExerciseSerloStaticRenderer)
)
const H5pSerloStaticRenderer = dynamic<EditorH5PDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/h5p-serlo-static'
  ).then((mod) => mod.H5pSerloStaticRenderer)
)
const InputSerloStaticRenderer = dynamic<EditorInputExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/input-serlo-static-renderer'
  ).then((mod) => mod.InputSerloStaticRenderer)
)
const InjectionStaticRenderer = dynamic<EditorInjectionDocument>(() =>
  import('@/serlo-editor/plugins/injection/static').then(
    (mod) => mod.InjectionStaticRenderer
  )
)

const PageLayoutStaticRenderer = dynamic<EditorPageLayoutDocument>(() =>
  import('@/serlo-editor/plugins/page-layout/static').then(
    (mod) => mod.PageLayoutStaticRenderer
  )
)
const PageTeamStaticRenderer = dynamic<EditorPageTeamDocument>(() =>
  import('@/serlo-editor/plugins/page-team/static').then(
    (mod) => mod.PageTeamStaticRenderer
  )
)
const PagePartnersStaticRenderer = dynamic<EditorPagePartnersDocument>(() =>
  import('@/serlo-editor/plugins/page-partners/static').then(
    (mod) => mod.PagePartnersStaticRenderer
  )
)
const SerloScMcExerciseStaticRenderer = dynamic<EditorScMcExerciseDocument>(
  () =>
    import(
      '@/serlo-editor-integration/serlo-plugin-wrappers/sc-mc-serlo-static-renderer'
    ).then((mod) => mod.ScMcSerloStaticRenderer)
)
const SolutionSerloStaticRenderer = dynamic<EditorSolutionDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/solution-serlo-static-renderer'
  ).then((mod) => mod.SolutionSerloStaticRenderer)
)
const SerloTableStaticRenderer = dynamic<EditorSerloTableDocument>(() =>
  import('@/serlo-editor/plugins/serlo-table/static').then(
    (mod) => mod.SerloTableStaticRenderer
  )
)
const TextExerciseGroupTypeStaticRenderer =
  dynamic<EditorTemplateGroupedExerciseDocument>(() =>
    import(
      '@/serlo-editor/plugins/serlo-template-plugins/exercise-group/static'
    ).then((mod) => mod.TextExerciseGroupTypeStaticRenderer)
  )
const HighlightStaticRenderer = dynamic<EditorHighlightDocument>(() =>
  import('@/serlo-editor/plugins/highlight/static').then(
    (mod) => mod.HighlightStaticRenderer
  )
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
  instance = Instance.En,
}: {
  instance?: Instance
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
        renderer: MultimediaSerloStaticRenderer,
      },
      {
        type: EditorPluginType.Spoiler,
        renderer: (state: EditorSpoilerDocument) => {
          return (
            <SpoilerStaticRenderer
              {...state}
              openOverwrite={isPrintMode ? true : undefined}
            />
          )
        },
      },
      { type: EditorPluginType.Box, renderer: BoxStaticRenderer },
      { type: EditorPluginType.SerloTable, renderer: SerloTableStaticRenderer },
      {
        type: EditorPluginType.Injection,
        renderer: (props: EditorInjectionDocument) => {
          return (
            <>
              <InjectionStaticRenderer {...props} />
              <ExtraInfoIfRevisionView>{props.state}</ExtraInfoIfRevisionView>
            </>
          )
        },
      },
      { type: EditorPluginType.Equations, renderer: EquationsStaticRenderer },
      {
        type: EditorPluginType.Geogebra,
        renderer: (state: EditorGeogebraDocument) => {
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
        renderer: (state: EditorVideoDocument) => {
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
        renderer: (props: EditorAnchorDocument) => {
          return (
            <>
              <AnchorStaticRenderer {...props} />
              <ExtraInfoIfRevisionView>{props.state}</ExtraInfoIfRevisionView>
            </>
          )
        },
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
        renderer: (props: EditorHighlightDocument) => {
          return (
            <>
              <HighlightStaticRenderer {...props} />
              <ExtraInfoIfRevisionView>
                {props.state.language ?? '(keine Sprache)'}
              </ExtraInfoIfRevisionView>
            </>
          )
        },
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
    linkRenderer: ({ href, children }: ComponentProps<LinkRenderer>) => {
      return (
        <>
          <Link href={href}>{children}</Link>
          <ExtraInfoIfRevisionView>{href}</ExtraInfoIfRevisionView>
        </>
      )
    },
  }
}
