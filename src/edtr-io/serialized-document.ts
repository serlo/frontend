import { StateTypeSerializedType } from 'test-edtr-io/plugin'
import { AnchorPluginState } from 'test-edtr-io/plugin-anchor'
import { BlockquotePluginState } from 'test-edtr-io/plugin-blockquote'
import { GeogebraPluginState } from 'test-edtr-io/plugin-geogebra'
import { HighlightPluginState } from 'test-edtr-io/plugin-highlight'
import { ImagePluginState } from 'test-edtr-io/plugin-image'
import { InputExercisePluginState } from 'test-edtr-io/plugin-input-exercise'
import { MultimediaExplanationPluginState } from 'test-edtr-io/plugin-multimedia-explanation'
import { RowsPluginState } from 'test-edtr-io/plugin-rows'
import { ScMcExercisePluginState } from 'test-edtr-io/plugin-sc-mc-exercise'
import { SpoilerPluginState } from 'test-edtr-io/plugin-spoiler'
import { TablePluginState } from 'test-edtr-io/plugin-table'
import { TextPluginState } from 'test-edtr-io/plugin-text'
import { VideoPluginState } from 'test-edtr-io/plugin-video'

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
      state: StateTypeSerializedType<TextPluginState>
    }
  | {
      plugin: 'video'
      state: StateTypeSerializedType<VideoPluginState>
    }
