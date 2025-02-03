import type {
  InitRenderersArgs,
  LinkRenderer,
} from '@editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@editor/plugins/article/static'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { ImageStaticRenderer } from '@editor/plugins/image/static'
import { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
import { RowsStaticRenderer } from '@editor/plugins/rows/static'
import { GenericContentTypeStaticRenderer } from '@editor/plugins/serlo-template-plugins/generic-content/static'
import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import type { MathElement } from '@editor/plugins/text'
import { TextStaticRenderer } from '@editor/plugins/text/static'
import { TextAreaExerciseStaticRenderer } from '@editor/plugins/text-area-exercise/static'
import { VideoStaticRenderer } from '@editor/plugins/video/static'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { sanitizeHref } from '@editor/utils/sanitize-href'
import { ComponentProps, lazy } from 'react'

const StaticMath = lazy(() =>
  import('@editor/plugins/text/static-components/static-math').then(
    (module) => ({
      default: module.StaticMath,
    })
  )
)

const HighlightStaticRenderer = lazy(() =>
  import('@editor/plugins/highlight/static').then((module) => ({
    default: module.HighlightStaticRenderer,
  }))
)

const DropzoneImageStaticRenderer = lazy(() =>
  import('@editor/plugins/dropzone-image/static').then((module) => ({
    default: module.DropzoneImageStaticRenderer,
  }))
)

const EquationsStaticRenderer = lazy(() =>
  import('@editor/plugins/equations/static').then((module) => ({
    default: module.EquationsStaticRenderer,
  }))
)

const ExerciseStaticRenderer = lazy(() =>
  import('@editor/plugins/exercise/static').then((module) => ({
    default: module.ExerciseStaticRenderer,
  }))
)

const InputExerciseStaticRenderer = lazy(() =>
  import('@editor/plugins/input-exercise/static').then((module) => ({
    default: module.InputExerciseStaticRenderer,
  }))
)

const BlanksExerciseStaticRenderer = lazy(() =>
  import('@editor/plugins/blanks-exercise/static').then((module) => ({
    default: module.BlanksExerciseStaticRenderer,
  }))
)

const InteractiveVideoStaticRenderer = lazy(() =>
  import('@editor/plugins/interactive-video/static').then((module) => ({
    default: module.InteractiveVideoStaticRenderer,
  }))
)

const PageLayoutStaticRenderer = lazy(() =>
  import('@editor/plugins/page-layout/static').then((module) => ({
    default: module.PageLayoutStaticRenderer,
  }))
)

const ScMcExerciseStaticRenderer = lazy(() =>
  import('@editor/plugins/sc-mc-exercise/static').then((module) => ({
    default: module.ScMcExerciseStaticRenderer,
  }))
)
const StaticSolutionRenderer = lazy(() =>
  import('@editor/plugins/solution/static').then((module) => ({
    default: module.StaticSolutionRenderer,
  }))
)

const SerloTableStaticRenderer = lazy(() =>
  import('@editor/plugins/serlo-table/static').then((module) => ({
    default: module.SerloTableStaticRenderer,
  }))
)

const InjectionStaticRenderer = lazy(() =>
  import('@editor/plugins/injection/static').then((module) => ({
    default: module.InjectionStaticRenderer,
  }))
)

const SerloInjectionStaticRenderer = lazy(() =>
  import('@editor/plugins/serlo-injection/static').then((module) => ({
    default: module.SerloInjectionStaticRenderer,
  }))
)

const ImageGalleryStaticRenderer = lazy(() =>
  import('@editor/plugins/image-gallery/static').then((module) => ({
    default: module.ImageGalleryStaticRenderer,
  }))
)

const CourseStaticRenderer = lazy(() =>
  import('@editor/plugins/course/static/static').then((module) => ({
    default: module.CourseStaticRenderer,
  }))
)
const EdusharingAssetStaticRenderer = lazy(() =>
  import('@editor/plugins/edusharing-asset/static').then((module) => ({
    default: module.EdusharingAssetStaticRenderer,
  }))
)

const GeogebraStaticRenderer = lazy(() =>
  import('@editor/plugins/geogebra/static').then((module) => ({
    default: module.GeogebraStaticRenderer,
  }))
)

export interface ExtraSerloRenderers {
  audio: React.ComponentType<any>
  exerciseGroup: React.ComponentType<any>
  exercise: React.ComponentType<any>
  geogebra: React.ComponentType<any>
  h5p: React.ComponentType<any>
  image: React.ComponentType<any>
  input: React.ComponentType<any>
  multimedia: React.ComponentType<any>
  scMc: React.ComponentType<any>
  solution: React.ComponentType<any>
  video: React.ComponentType<any>
}

export function createRenderers(
  extraSerloRenderers?: ExtraSerloRenderers
): InitRenderersArgs {
  return {
    pluginRenderers: [
      // plugins
      { type: EditorPluginType.Article, renderer: ArticleStaticRenderer },
      { type: EditorPluginType.Course, renderer: CourseStaticRenderer },
      { type: EditorPluginType.Rows, renderer: RowsStaticRenderer },
      { type: EditorPluginType.Text, renderer: TextStaticRenderer },
      {
        type: EditorPluginType.Image,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.image
          : ImageStaticRenderer,
      },
      {
        type: EditorPluginType.ImageGallery,
        renderer: ImageGalleryStaticRenderer,
      },
      {
        type: EditorPluginType.Multimedia,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.multimedia
          : MultimediaStaticRenderer,
      },
      {
        type: EditorPluginType.Spoiler,
        renderer: SpoilerStaticRenderer,
      },
      {
        type: EditorPluginType.DropzoneImage,
        renderer: DropzoneImageStaticRenderer,
      },
      { type: EditorPluginType.Box, renderer: BoxStaticRenderer },
      { type: EditorPluginType.SerloTable, renderer: SerloTableStaticRenderer },
      { type: EditorPluginType.Equations, renderer: EquationsStaticRenderer },
      {
        type: EditorPluginType.Geogebra,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.geogebra
          : GeogebraStaticRenderer,
      },
      {
        type: EditorPluginType.Video,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.video
          : VideoStaticRenderer,
      },
      {
        type: EditorPluginType.Anchor,
        renderer: AnchorStaticRenderer,
      },

      // exercises
      {
        type: EditorPluginType.Exercise,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.exercise
          : ExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.Solution,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.solution
          : StaticSolutionRenderer,
      },
      {
        type: EditorPluginType.Highlight,
        renderer: HighlightStaticRenderer,
      },
      {
        type: EditorPluginType.InputExercise,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.input
          : InputExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.ScMcExercise,
        renderer: extraSerloRenderers
          ? extraSerloRenderers.scMc
          : ScMcExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.BlanksExercise,
        renderer: BlanksExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.TextAreaExercise,
        renderer: TextAreaExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.InteractiveVideo,
        renderer: InteractiveVideoStaticRenderer,
      },
      {
        type: EditorPluginType.EdusharingAsset,
        renderer: EdusharingAssetStaticRenderer,
      },
      {
        type: EditorPluginType.Injection,
        renderer: InjectionStaticRenderer,
      },
      {
        type: EditorPluginType.SerloInjection,
        renderer: SerloInjectionStaticRenderer,
      },
      {
        type: EditorPluginType.PageLayout,
        renderer: PageLayoutStaticRenderer,
      },
      {
        type: EditorPluginType.Unsupported,
        renderer: (state: unknown) => {
          // eslint-disable-next-line no-console
          console.warn('unsupported renderer: ', state)
          return null
        },
      },
      {
        type: TemplatePluginType.GenericContent,
        renderer: GenericContentTypeStaticRenderer,
      },
      ...(extraSerloRenderers
        ? [
            {
              type: EditorPluginType.Audio,
              renderer: extraSerloRenderers.audio,
            },
            {
              type: EditorPluginType.ExerciseGroup,
              renderer: extraSerloRenderers.exerciseGroup,
            },
            {
              type: EditorPluginType.H5p,
              renderer: extraSerloRenderers.h5p,
            },
          ]
        : []),
    ],
    mathRenderer: (element: MathElement) => <StaticMath {...element} />,
    linkRenderer: ({ href, children }: ComponentProps<LinkRenderer>) => {
      return (
        <a
          className="serlo-link cursor-pointer"
          href={sanitizeHref(href)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    },
  }
}
