/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { StateTypeSerializedType } from '@edtr-io/plugin'
import { AnchorPluginState } from '@edtr-io/plugin-anchor'
import { BlockquotePluginState } from '@edtr-io/plugin-blockquote'
import { ErrorPluginState } from './plugins/error'
import { DeprecatedPluginState } from './plugins/deprecated'
import { EquationsPluginState } from './plugins/equations'
import { ExercisePluginState } from './plugins/exercise'
import { GeogebraPluginState } from '@edtr-io/plugin-geogebra'
import { HighlightPluginState } from '@edtr-io/plugin-highlight'
import { ImagePluginState } from '@edtr-io/plugin-image'
import { ImportantPluginState } from './plugins/important'
import { InjectionPluginState } from './plugins/injection'
import { InputExercisePluginState } from '@edtr-io/plugin-input-exercise'
import { LayoutPluginState } from './plugins/layout'
import { MultimediaExplanationPluginState } from '@edtr-io/plugin-multimedia-explanation'
import { RowsPluginState } from '@edtr-io/plugin-rows'
import { ScMcExercisePluginState } from '@edtr-io/plugin-sc-mc-exercise'
import { SeparatorPluginState } from './plugins/separator'
import { SpoilerPluginState } from '@edtr-io/plugin-spoiler'
import { TablePluginState } from '@edtr-io/plugin-table'
import { TextPluginState } from '@edtr-io/plugin-text'
import { VideoPluginState } from '@edtr-io/plugin-video'
import { SolutionPluginState } from './plugins/solution'
import { ArticlePluginState } from './plugins/article'

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
