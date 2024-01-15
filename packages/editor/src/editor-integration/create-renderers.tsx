import {
  InitRenderersArgs,
  LinkRenderer,
} from '@editor/plugin/helpers/editor-renderer'
import { AnchorStaticRenderer } from '@editor/plugins/anchor/static'
import { ArticleStaticRenderer } from '@editor/plugins/article/static'
import { BoxStaticRenderer } from '@editor/plugins/box/static'
import { EquationsStaticRenderer } from '@editor/plugins/equations/static'
import { ExerciseStaticRenderer } from '@editor/plugins/exercise/static'
import { FillInTheBlanksStaticRenderer } from '@editor/plugins/fill-in-the-blanks-exercise/static'
import { GeogebraStaticRenderer } from '@editor/plugins/geogebra/static'
import { H5pStaticRenderer } from '@editor/plugins/h5p/static'
import { HighlightStaticRenderer } from '@editor/plugins/highlight/static'
import { ImageStaticRenderer } from '@editor/plugins/image/static'
import { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
import { RowsStaticRenderer } from '@editor/plugins/rows/static'
import { ScMcExerciseStaticRenderer } from '@editor/plugins/sc-mc-exercise/static'
import { SerloTableStaticRenderer } from '@editor/plugins/serlo-table/static'
import { SpoilerStaticRenderer } from '@editor/plugins/spoiler/static'
import type { MathElement } from '@editor/plugins/text'
import { TextStaticRenderer } from '@editor/plugins/text/static'
import { StaticMath } from '@editor/plugins/text/static-components/static-math'
import { VideoStaticRenderer } from '@editor/plugins/video/static'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { ComponentProps } from 'react'

import { Lazy } from '@/components/content/lazy'
import { Link } from '@/components/content/link'

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
        type: EditorPluginType.Highlight,
        renderer: HighlightStaticRenderer,
      },
      { type: EditorPluginType.H5p, renderer: H5pStaticRenderer },
      {
        type: EditorPluginType.InputExercise,
        renderer: H5pStaticRenderer,
      },
      {
        type: EditorPluginType.ScMcExercise,
        renderer: ScMcExerciseStaticRenderer,
      },
      {
        type: EditorPluginType.FillInTheBlanksExercise,
        renderer: FillInTheBlanksStaticRenderer,
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
      return <Link href={href}>{children}</Link>
    },
  }
}
