import { EditorPluginType } from './editor-plugin-type'

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

export interface Splish {
  id?: string
  cells: Cell[]
}
export type Row = Splish

export type Cell = RowCell | ContentCell

interface RowCell {
  id?: string
  size?: number
  rows: Row[]
}

export interface ContentCell<S = unknown> {
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

interface SplishPlugin {
  name: Plugin | 'code'
  version?: string
}

export type Edtr = RowsPlugin | LayoutPlugin | OtherPlugin

export interface RowsPlugin {
  plugin: EditorPluginType.Rows
  state: Edtr[]
}
export interface LayoutPlugin {
  plugin: EditorPluginType.Layout
  state: { child: Edtr; width: number }[]
}

export interface OtherPlugin {
  plugin:
    | EditorPluginType.Anchor
    | EditorPluginType.Article
    | EditorPluginType.Blockquote
    | 'error'
    | EditorPluginType.Exercise
    | EditorPluginType.Geogebra
    | EditorPluginType.Highlight
    | EditorPluginType.Image
    | EditorPluginType.Important
    | EditorPluginType.Injection
    | EditorPluginType.InputExercise
    | EditorPluginType.Spoiler
    | EditorPluginType.ScMcExercise
    | EditorPluginType.Solution
    | EditorPluginType.Text
    | EditorPluginType.Video
  state: unknown
}

export function isSplish(content: Legacy | Splish): content is Splish {
  return (content as Splish).cells !== undefined
}

export function isEdtr(content: Legacy | Splish | Edtr): content is Edtr {
  return (content as Edtr).plugin !== undefined
}
