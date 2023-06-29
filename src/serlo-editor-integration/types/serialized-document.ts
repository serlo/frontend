import type { ImportantPluginState } from '../../serlo-editor/plugins/_on-the-way-out/important/important'
import type { LayoutPluginState } from '../../serlo-editor/plugins/_on-the-way-out/layout'
import type { ArticlePluginState } from '../../serlo-editor/plugins/article'
import type { EquationsPluginState } from '../../serlo-editor/plugins/equations'
import type { ExercisePluginState } from '../../serlo-editor/plugins/exercise'
import type { InjectionPluginState } from '../../serlo-editor/plugins/injection'
import type { SolutionPluginState } from '../../serlo-editor/plugins/solution'
import type { UnsupportedPluginState } from '../../serlo-editor/plugins/unsupported'
import type { StateTypeSerializedType } from '@/serlo-editor/plugin'
import type { BlockquotePluginState } from '@/serlo-editor/plugins/_on-the-way-out/blockquote'
import type { TablePluginState } from '@/serlo-editor/plugins/_on-the-way-out/table'
import type { AnchorPluginState } from '@/serlo-editor/plugins/anchor'
import type { GeogebraPluginState } from '@/serlo-editor/plugins/geogebra'
import type { HighlightPluginState } from '@/serlo-editor/plugins/highlight'
import type { ImagePluginState } from '@/serlo-editor/plugins/image'
import type { InputExercisePluginState } from '@/serlo-editor/plugins/input-exercise'
import type { MultimediaPluginState } from '@/serlo-editor/plugins/multimedia'
import type { RowsPluginState } from '@/serlo-editor/plugins/rows'
import type { ScMcExercisePluginState } from '@/serlo-editor/plugins/sc-mc-exercise'
import type { SpoilerPluginState } from '@/serlo-editor/plugins/spoiler'
import type { TextEditorState } from '@/serlo-editor/plugins/text'
import type { VideoPluginState } from '@/serlo-editor/plugins/video'

export type SerializedDocument =
  | {
      plugin: 'anchor'
      state: StateTypeSerializedType<AnchorPluginState>
    }
  | {
      plugin: 'article'
      state: StateTypeSerializedType<ArticlePluginState>
    }
  | {
      plugin: 'blockquote'
      state: StateTypeSerializedType<BlockquotePluginState>
    }
  | {
      plugin: 'unsupported'
      state: StateTypeSerializedType<UnsupportedPluginState>
    }
  | {
      plugin: 'equations'
      state: StateTypeSerializedType<EquationsPluginState>
    }
  | {
      plugin: 'exercise'
      state: StateTypeSerializedType<ExercisePluginState>
    }
  | {
      plugin: 'geogebra'
      state: StateTypeSerializedType<GeogebraPluginState>
    }
  | {
      plugin: 'highlight'
      state: StateTypeSerializedType<HighlightPluginState>
    }
  | {
      plugin: 'image'
      state: StateTypeSerializedType<ImagePluginState>
    }
  | {
      plugin: 'important'
      state: StateTypeSerializedType<ImportantPluginState>
    }
  | {
      plugin: 'injection'
      state: StateTypeSerializedType<InjectionPluginState>
    }
  | {
      plugin: 'inputExercise'
      state: StateTypeSerializedType<InputExercisePluginState>
    }
  | {
      plugin: 'layout'
      state: StateTypeSerializedType<LayoutPluginState>
    }
  | {
      plugin: 'multimedia'
      state: StateTypeSerializedType<MultimediaPluginState>
    }
  | {
      plugin: 'rows'
      state: StateTypeSerializedType<RowsPluginState>
    }
  | {
      plugin: 'scMcExercise'
      state: StateTypeSerializedType<ScMcExercisePluginState>
    }
  | {
      plugin: 'spoiler'
      state: StateTypeSerializedType<SpoilerPluginState>
    }
  | {
      plugin: 'solution'
      state: StateTypeSerializedType<SolutionPluginState>
    }
  | {
      plugin: 'table'
      state: StateTypeSerializedType<TablePluginState>
    }
  | {
      plugin: 'text'
      state: StateTypeSerializedType<TextEditorState>
    }
  | {
      plugin: 'video'
      state: StateTypeSerializedType<VideoPluginState>
    }
