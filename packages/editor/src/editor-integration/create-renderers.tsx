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

export function createRenderers(): InitRenderersArgs {
  return {
    pluginRenderers: [
      // plugins
      { type: EditorPluginType.Article, renderer: ArticleStaticRenderer },
      { type: EditorPluginType.Course, renderer: CourseStaticRenderer },
      { type: EditorPluginType.Rows, renderer: RowsStaticRenderer },
      { type: EditorPluginType.Text, renderer: TextStaticRenderer },
      { type: EditorPluginType.Image, renderer: ImageStaticRenderer },
      {
        type: EditorPluginType.ImageGallery,
        renderer: ImageGalleryStaticRenderer,
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
        type: EditorPluginType.DropzoneImage,
        renderer: DropzoneImageStaticRenderer,
      },
      { type: EditorPluginType.Box, renderer: BoxStaticRenderer },
      { type: EditorPluginType.SerloTable, renderer: SerloTableStaticRenderer },
      { type: EditorPluginType.Equations, renderer: EquationsStaticRenderer },
      {
        type: EditorPluginType.Geogebra,
        renderer: GeogebraStaticRenderer,
      },
      {
        type: EditorPluginType.Video,
        renderer: VideoStaticRenderer,
      },
      {
        type: EditorPluginType.InteractiveVideo,
        renderer: InteractiveVideoStaticRenderer,
      },
      {
        type: EditorPluginType.Anchor,
        renderer: AnchorStaticRenderer,
      },

      // exercises
      {
        type: EditorPluginType.Exercise,
        renderer: ExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.Solution,
        renderer: StaticSolutionRenderer,
      },
      {
        type: EditorPluginType.Highlight,
        renderer: HighlightStaticRenderer,
      },
      {
        type: EditorPluginType.InputExercise,
        renderer: InputExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.ScMcExercise,
        renderer: ScMcExerciseStaticRenderer,
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
