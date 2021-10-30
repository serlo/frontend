import { StateTypeSerializedType } from '@edtr-io/plugin'
import { AnchorPluginState } from '@edtr-io/plugin-anchor'
import { BlockquotePluginState } from '@edtr-io/plugin-blockquote'
import { GeogebraPluginState } from '@edtr-io/plugin-geogebra'
import { HighlightPluginState } from '@edtr-io/plugin-highlight'
import { ImagePluginState } from '@edtr-io/plugin-image'
import { InputExercisePluginState } from '@edtr-io/plugin-input-exercise'
import { MultimediaExplanationPluginState } from '@edtr-io/plugin-multimedia-explanation'
import { RowsPluginState } from '@edtr-io/plugin-rows'
import { ScMcExercisePluginState } from '@edtr-io/plugin-sc-mc-exercise'
import { SpoilerPluginState } from '@edtr-io/plugin-spoiler'
import { TablePluginState } from '@edtr-io/plugin-table'
import { TextPluginState } from '@edtr-io/plugin-text'
import { VideoPluginState } from '@edtr-io/plugin-video'

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
