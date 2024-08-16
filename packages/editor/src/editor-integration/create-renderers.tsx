import type {
  InitRenderersArgs,
  LinkRenderer,
} from '@editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@editor/plugins/article/static'
import { BlanksExerciseStaticRenderer } from '@editor/plugins/blanks-exercise/static'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { DropzoneImageStaticRenderer } from '@editor/plugins/dropzone-image/static'
import { EquationsStaticRenderer } from '@editor/plugins/equations/static'
import { ExerciseStaticRenderer } from '@editor/plugins/exercise/static'
import { GeogebraStaticRenderer } from '@editor/plugins/geogebra/static'
import { HighlightStaticRenderer } from '@editor/plugins/highlight/static'
import { ImageStaticRenderer } from '@editor/plugins/image/static'
import { InputExerciseStaticRenderer } from '@editor/plugins/input-exercise/static'
import { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
import { RowsStaticRenderer } from '@editor/plugins/rows/static'
import { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
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
import { ComponentProps } from 'react'
import { EdusharingAssetStaticRenderer } from '@editor/plugins/edusharing-asset/static'
import { SerloInjectionStaticRenderer } from '@editor/plugins/serlo-injection/static'

export function createRenderers(): InitRenderersArgs {
  return {
    pluginRenderers: [
      // plugins
      { type: EditorPluginType.Article, renderer: ArticleStaticRenderer },
      { type: EditorPluginType.Rows, renderer: RowsStaticRenderer },
      { type: EditorPluginType.Text, renderer: TextStaticRenderer },
      { type: EditorPluginType.Image, renderer: ImageStaticRenderer },
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
        type: EditorPluginType.SerloInjection,
        renderer: SerloInjectionStaticRenderer,
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
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    },
  }
}
