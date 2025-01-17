import type {
  InitRenderersArgs,
  LinkRenderer,
} from '@editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@editor/plugins/article/static'
import { BlanksExerciseStaticRenderer } from '@editor/plugins/blanks-exercise/static'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { CourseStaticRenderer } from '@editor/plugins/course/static/static'
import { DropzoneImageStaticRenderer } from '@editor/plugins/dropzone-image/static'
import { EdusharingAssetStaticRenderer } from '@editor/plugins/edusharing-asset/static'
import { EquationsStaticRenderer } from '@editor/plugins/equations/static'
import { ExerciseStaticRenderer } from '@editor/plugins/exercise/static'
import { GeogebraStaticRenderer } from '@editor/plugins/geogebra/static'
import { HighlightStaticRenderer } from '@editor/plugins/highlight/static'
import { ImageStaticRenderer } from '@editor/plugins/image/static'
import { ImageGalleryStaticRenderer } from '@editor/plugins/image-gallery/static'
import { InjectionStaticRenderer } from '@editor/plugins/injection/static'
import { InputExerciseStaticRenderer } from '@editor/plugins/input-exercise/static'
import { InteractiveVideoStaticRenderer } from '@editor/plugins/interactive-video/static'
import { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
import { PageLayoutStaticRenderer } from '@editor/plugins/page-layout/static'
import { RowsStaticRenderer } from '@editor/plugins/rows/static'
import { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
import { SerloInjectionStaticRenderer } from '@editor/plugins/serlo-injection/static'
import { SerloTableStaticRenderer } from '@editor/plugins/serlo-table/static'
import { GenericContentTypeStaticRenderer } from '@editor/plugins/serlo-template-plugins/generic-content/static'
import { StaticSolutionRenderer } from '@editor/plugins/solution/static'
import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import type { MathElement } from '@editor/plugins/text'
import { TextStaticRenderer } from '@editor/plugins/text/static'
import { StaticMath } from '@editor/plugins/text/static-components/static-math'
import { TextAreaExerciseStaticRenderer } from '@editor/plugins/text-area-exercise/static'
import { VideoStaticRenderer } from '@editor/plugins/video/static'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { sanitizeHref } from '@editor/utils/sanitize-href'
import { ComponentProps } from 'react'

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
