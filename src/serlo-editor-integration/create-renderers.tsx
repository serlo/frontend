import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

import { ExtraInfoIfRevisionView } from './extra-info-if-revision-view'
import { GeogebraSerloStaticRenderer } from './serlo-plugin-wrappers/geogebra-serlo-static-renderer'
import { ImageSerloStaticRenderer } from './serlo-plugin-wrappers/image-serlo-static-renderer'
import { VideoSerloStaticRenderer } from './serlo-plugin-wrappers/video-serlo-static-renderer'
import { EditorPluginType } from '../serlo-editor/types/editor-plugin-type'
import type {
  EditorFillInTheBlanksExerciseDocument,
  EditorAnchorDocument,
  EditorEquationsDocument,
  EditorExerciseDocument,
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
  EditorTemplateExerciseGroupDocument,
} from '../serlo-editor/types/editor-plugins'
import { TemplatePluginType } from '../serlo-editor/types/template-plugin-type'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import { isPrintMode } from '@/components/print-mode'
import { isProduction } from '@/helper/is-production'
import {
  InitRenderersArgs,
  LinkRenderer,
} from '@/serlo-editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@/serlo-editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@/serlo-editor/plugins/article/static'
import { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
import { RowsStaticRenderer } from '@/serlo-editor/plugins/rows/static'
import { SpoilerStaticRenderer } from '@/serlo-editor/plugins/spoiler/static'
import type { MathElement } from '@/serlo-editor/plugins/text'
import { TextStaticRenderer } from '@/serlo-editor/plugins/text/static'
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
const FillInTheBlanksStaticRenderer =
  dynamic<EditorFillInTheBlanksExerciseDocument>(() =>
    import('@/serlo-editor/plugins/fill-in-the-blanks-exercise/static').then(
      (mod) => mod.FillInTheBlanksStaticRenderer
    )
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
  dynamic<EditorTemplateExerciseGroupDocument>(() =>
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
  import('@/serlo-editor/plugins/text/static-components/static-math').then(
    (mod) => mod.StaticMath
  )
)

export function createRenderers(): InitRenderersArgs {
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
          if (!props.state) return null
          return (
            <Lazy>
              <InjectionStaticRenderer {...props} />
              <ExtraInfoIfRevisionView>{props.state}</ExtraInfoIfRevisionView>
            </Lazy>
          )
        },
      },
      { type: EditorPluginType.Equations, renderer: EquationsStaticRenderer },
      {
        type: EditorPluginType.Geogebra,
        renderer: GeogebraSerloStaticRenderer,
      },
      {
        type: EditorPluginType.Video,
        renderer: VideoSerloStaticRenderer,
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
      ...(isProduction
        ? []
        : [
            {
              type: EditorPluginType.FillInTheBlanksExercise,
              renderer: FillInTheBlanksStaticRenderer,
            },
          ]),
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
