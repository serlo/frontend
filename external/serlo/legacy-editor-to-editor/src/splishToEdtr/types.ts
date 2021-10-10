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
export enum Plugin {
  AlphabetSort = '@serlo-org/alphabet-sort',
  Anchor = '@serlo-org/anchor',
  Blockquote = '@serlo-org/blockquote',
  Equations = '@serlo-org/equations',
  Geogebra = '@serlo-org/geogebra',
  H5p = '@serlo-org/h5p',
  Highlight = '@serlo-org/highlight',
  Hint = '@serlo-org/hint',
  Image = '@splish-me/image',
  Injection = '@serlo-org/injection',
  InputExercise = '@serlo-org/input-exercise',
  License = '@serlo-org/license',
  MatchingExercise = '@serlo-org/matching-exercise',
  ScMcExercise = '@serlo-org/sc-mc-exercise',
  Solution = '@serlo-org/solution',
  Spoiler = '@serlo-org/spoiler',
  StepByStep = '@serlo-org/step-by-step',
  Table = '@serlo-org/table',
  Text = '@splish-me/slate',
}
export type Legacy = LegacyRow[] | string

export type LegacyRow = {
  col: number
  content: string
}[]

export type Splish = {
  id?: string
  cells: Cell[]
}
export type Row = Splish

export type Cell = RowCell | ContentCell

type RowCell = {
  id?: string
  size?: number
  rows: Row[]
}

export type ContentCell<S = unknown> = {
  id?: string
  size?: number
  inline?: null
  content: {
    plugin: SplishPlugin
    state: S
  }
}

export function isContentCell(cell: Cell): cell is ContentCell {
  const c = cell as ContentCell
  return typeof c.content !== 'undefined'
}

type SplishPlugin = { name: Plugin | 'code'; version?: string }

export type Edtr = RowsPlugin | LayoutPlugin | OtherPlugin

export type RowsPlugin = { plugin: 'rows'; state: Edtr[] }
export type LayoutPlugin = {
  plugin: 'layout'
  state: { child: Edtr; width: number }[]
}

export type OtherPlugin = {
  plugin:
    | 'anchor'
    | 'article'
    | 'blockquote'
    | 'error'
    | 'exercise'
    | 'geogebra'
    | 'highlight'
    | 'image'
    | 'important'
    | 'injection'
    | 'inputExercise'
    | 'spoiler'
    | 'scMcExercise'
    | 'solution'
    | 'table'
    | 'text'
    | 'video'
  state: unknown
}

export function isSplish(content: Legacy | Splish): content is Splish {
  return (content as Splish).cells !== undefined
}

export function isEdtr(content: Legacy | Splish | Edtr): content is Edtr {
  return (content as Edtr).plugin !== undefined
}
