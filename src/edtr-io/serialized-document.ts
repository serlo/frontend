import { StateTypeSerializedType } from '@edtr-io/plugin'

import { ArticlePluginState } from './plugins/article'
import { DeprecatedPluginState } from './plugins/deprecated'
import { EquationsPluginState } from './plugins/equations'
import { ErrorPluginState } from './plugins/error'
import { ExercisePluginState } from './plugins/exercise'
import { ImportantPluginState } from './plugins/important'
import { InjectionPluginState } from './plugins/injection'
import { LayoutPluginState } from './plugins/layout'
import { SeparatorPluginState } from './plugins/separator'
import { SolutionPluginState } from './plugins/solution'
import { AnchorPluginState } from '@/serlo-editor-repo/plugins/anchor'
import { BlockquotePluginState } from '@/serlo-editor-repo/plugins/blockquote'
import { GeogebraPluginState } from '@/serlo-editor-repo/plugins/geogebra'
import { HighlightPluginState } from '@/serlo-editor-repo/plugins/highlight'
import { ImagePluginState } from '@/serlo-editor-repo/plugins/image'
import { InputExercisePluginState } from '@/serlo-editor-repo/plugins/input-exercise'
import { MultimediaExplanationPluginState } from '@/serlo-editor-repo/plugins/multimedia-explanation'
import { RowsPluginState } from '@/serlo-editor-repo/plugins/rows'
import { ScMcExercisePluginState } from '@/serlo-editor-repo/plugins/sc-mc-exercise'
import { SpoilerPluginState } from '@/serlo-editor-repo/plugins/spoiler'
import { TablePluginState } from '@/serlo-editor-repo/plugins/table'
import { TextEditorState } from '@/serlo-editor-repo/plugins/text'
import { VideoPluginState } from '@/serlo-editor-repo/plugins/video'

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
      plugin: 'deprecated'
      state: StateTypeSerializedType<DeprecatedPluginState>
    }
  | {
      plugin: 'error'
      state: StateTypeSerializedType<ErrorPluginState>
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
      state: StateTypeSerializedType<MultimediaExplanationPluginState>
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
      plugin: 'separator'
      state: StateTypeSerializedType<SeparatorPluginState>
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
