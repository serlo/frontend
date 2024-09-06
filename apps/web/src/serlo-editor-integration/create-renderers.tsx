import {
  InitRenderersArgs,
  LinkRenderer,
} from '@editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@editor/plugins/article/static'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { CourseStaticRenderer } from '@editor/plugins/course/static/static'
import { ImageGalleryStaticRenderer } from '@editor/plugins/image-gallery/static'
import { RowsStaticRenderer } from '@editor/plugins/rows/static'
import type { MathElement } from '@editor/plugins/text'
import { TextStaticRenderer } from '@editor/plugins/text/static'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type {
  EditorBlanksExerciseDocument,
  EditorEquationsDocument,
  EditorExerciseDocument,
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
  EditorExerciseGroupDocument,
  EditorDropzoneImageDocument,
} from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

import { ExtraInfoIfRevisionView } from './extra-info-if-revision-view'
import { EditorH5PDocument } from './h5p'
import { GeogebraSerloStaticRenderer } from './serlo-plugin-wrappers/geogebra-serlo-static-renderer'
import { ImageSerloStaticRenderer } from './serlo-plugin-wrappers/image-serlo-static-renderer'
import { VideoSerloStaticRenderer } from './serlo-plugin-wrappers/video-serlo-static-renderer'
import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'
import { isPrintMode } from '@/components/print-mode'
import { MultimediaSerloStaticRenderer } from '@/serlo-editor-integration/serlo-plugin-wrappers/multimedia-serlo-static-renderer'

const EquationsStaticRenderer = dynamic<EditorEquationsDocument>(() =>
  import('@editor/plugins/equations/static').then(
    (mod) => mod.EquationsStaticRenderer
  )
)
const ExerciseSerloStaticRenderer = dynamic<EditorExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/exercise-serlo-static-renderer'
  ).then((mod) => mod.ExerciseSerloStaticRenderer)
)
const H5pSerloStaticRenderer = dynamic<EditorH5PDocument>(() =>
  import('@/serlo-editor-integration/h5p/h5p-serlo-static').then(
    (mod) => mod.H5pSerloStaticRenderer
  )
)
const InputSerloStaticRenderer = dynamic<EditorInputExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/input-serlo-static-renderer'
  ).then((mod) => mod.InputSerloStaticRenderer)
)
const BlanksSerloStaticRenderer = dynamic<EditorBlanksExerciseDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/blanks-exercise-static-renderer'
  ).then((mod) => mod.BlanksExerciseSerloStaticRenderer)
)
const InjectionSerloStaticRenderer = dynamic<EditorInjectionDocument>(() =>
  import(
    '@/serlo-editor-integration/serlo-plugin-wrappers/injection-serlo-static-renderer'
  ).then((mod) => mod.InjectionSerloStaticRenderer)
)
const SpoilerSerloStaticRenderer = dynamic<
  EditorSpoilerDocument & { openOverwrite?: boolean; onOpen?: () => void }
>(() =>
  import('./serlo-plugin-wrappers/spoiler-serlo-static-renderer').then(
    (mod) => mod.SpoilerSerloStaticRenderer
  )
)

const DropzoneImageStaticRenderer = dynamic<
  EditorDropzoneImageDocument & { openOverwrite?: boolean; onOpen?: () => void }
>(() =>
  import('@editor/plugins/dropzone-image/static').then(
    (mod) => mod.DropzoneImageStaticRenderer
  )
)

const PageLayoutStaticRenderer = dynamic<EditorPageLayoutDocument>(() =>
  import('@editor/plugins/page-layout/static').then(
    (mod) => mod.PageLayoutStaticRenderer
  )
)
const PageTeamStaticRenderer = dynamic<EditorPageTeamDocument>(() =>
  import('@editor/plugins/page-team/static').then(
    (mod) => mod.PageTeamStaticRenderer
  )
)
const PagePartnersStaticRenderer = dynamic<EditorPagePartnersDocument>(() =>
  import('@editor/plugins/page-partners/static').then(
    (mod) => mod.PagePartnersStaticRenderer
  )
)
const ScMcSerloStaticRenderer = dynamic<EditorScMcExerciseDocument>(() =>
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
  import('@editor/plugins/serlo-table/static').then(
    (mod) => mod.SerloTableStaticRenderer
  )
)
const ExerciseGroupSerloStaticRenderer = dynamic<EditorExerciseGroupDocument>(
  () =>
    import(
      '@/serlo-editor-integration/serlo-plugin-wrappers/exercise-group-serlo-static-renderer'
    ).then((mod) => mod.ExerciseGroupSerloStaticRenderer)
)
const HighlightStaticRenderer = dynamic<EditorHighlightDocument>(() =>
  import('@editor/plugins/highlight/static').then(
    (mod) => mod.HighlightStaticRenderer
  )
)
const StaticMath = dynamic<MathElement>(() =>
  import('@editor/plugins/text/static-components/static-math').then(
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
        type: EditorPluginType.ImageGallery,
        renderer: ImageGalleryStaticRenderer,
      },
      {
        type: EditorPluginType.Multimedia,
        // special renderer for frontend because it uses nextjs dynamic import
        renderer: MultimediaSerloStaticRenderer,
      },
      {
        type: EditorPluginType.Spoiler,
        renderer: (state: EditorSpoilerDocument) => {
          return (
            <SpoilerSerloStaticRenderer
              {...state}
              openOverwrite={isPrintMode ? true : undefined}
            />
          )
        },
      },
      {
        type: EditorPluginType.DropzoneImage,
        renderer: DropzoneImageStaticRenderer,
      },
      { type: EditorPluginType.Box, renderer: BoxStaticRenderer },
      { type: EditorPluginType.Course, renderer: CourseStaticRenderer },
      { type: EditorPluginType.SerloTable, renderer: SerloTableStaticRenderer },
      {
        type: EditorPluginType.Injection,
        renderer: (props: EditorInjectionDocument) => {
          if (!props.state) return null
          return (
            <Lazy>
              <InjectionSerloStaticRenderer {...props} />
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
        renderer: AnchorStaticRenderer,
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
        type: EditorPluginType.ExerciseGroup,
        renderer: ExerciseGroupSerloStaticRenderer,
      },
      { type: EditorPluginType.H5p, renderer: H5pSerloStaticRenderer },
      {
        type: EditorPluginType.InputExercise,
        renderer: InputSerloStaticRenderer,
      },
      {
        type: EditorPluginType.ScMcExercise,
        renderer: ScMcSerloStaticRenderer,
      },
      {
        type: EditorPluginType.BlanksExercise,
        renderer: BlanksSerloStaticRenderer,
      },
      {
        type: EditorPluginType.BlanksExerciseDragAndDrop,
        renderer: BlanksSerloStaticRenderer,
      },
      {
        type: EditorPluginType.Solution,
        renderer: SolutionSerloStaticRenderer,
      },
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
