import type { ImportantPluginState } from '../../serlo-editor/plugins/_on-the-way-out/important/important'
import type { LayoutPluginState } from '../../serlo-editor/plugins/_on-the-way-out/layout'
import type { ArticlePluginState } from '../../serlo-editor/plugins/article'
import type { ExercisePluginState } from '../../serlo-editor/plugins/exercise'
import type { InjectionPluginState } from '../../serlo-editor/plugins/injection'
import type { SolutionPluginState } from '../../serlo-editor/plugins/solution'
import type { UnsupportedPluginState } from '../../serlo-editor/plugins/unsupported'
import { EditorPluginType } from './editor-plugin-type'
import type { StateTypeSerializedType } from '@/serlo-editor/plugin'
import type { BlockquotePluginState } from '@/serlo-editor/plugins/_on-the-way-out/blockquote'
import type { TablePluginState } from '@/serlo-editor/plugins/_on-the-way-out/table'
import type { AnchorPluginState } from '@/serlo-editor/plugins/anchor'
import { BoxPluginState } from '@/serlo-editor/plugins/box'
import { EquationsPluginState } from '@/serlo-editor/plugins/equations'
import type { GeogebraPluginState } from '@/serlo-editor/plugins/geogebra'
import type { HighlightPluginState } from '@/serlo-editor/plugins/highlight'
import type { ImagePluginState } from '@/serlo-editor/plugins/image'
import type { InputExercisePluginState } from '@/serlo-editor/plugins/input-exercise'
import type { MultimediaPluginState } from '@/serlo-editor/plugins/multimedia'
import { PageLayoutPluginState } from '@/serlo-editor/plugins/page-layout'
import { PagePartnersPluginState } from '@/serlo-editor/plugins/page-partners'
import { PageTeamPluginState } from '@/serlo-editor/plugins/page-team'
import type { RowsPluginState } from '@/serlo-editor/plugins/rows'
import type { ScMcExercisePluginState } from '@/serlo-editor/plugins/sc-mc-exercise'
import { SerloTablePluginState } from '@/serlo-editor/plugins/serlo-table'
import type { SpoilerPluginState } from '@/serlo-editor/plugins/spoiler'
import type {
  TextEditorState,
  CustomElement,
  CustomText,
} from '@/serlo-editor/plugins/text'
import type { VideoPluginState } from '@/serlo-editor/plugins/video'

export type SlateBlockElement = CustomElement
export type SlateTextElement = CustomText

// All supported editor plugins in their serialized versions

export interface EditorAnchorPlugin {
  plugin: EditorPluginType.Anchor
  state: StateTypeSerializedType<AnchorPluginState>
}
export interface EditorArticlePlugin {
  plugin: EditorPluginType.Article
  state: StateTypeSerializedType<ArticlePluginState>
}
export interface EditorBlockquotePlugin {
  plugin: EditorPluginType.Blockquote
  state: StateTypeSerializedType<BlockquotePluginState>
}
export interface EditorBoxPlugin {
  plugin: EditorPluginType.Box
  state: StateTypeSerializedType<BoxPluginState>
}
export interface EditorUnsupportedPlugin {
  plugin: EditorPluginType.Unsupported
  state: StateTypeSerializedType<UnsupportedPluginState>
}
export interface EditorEquationsPlugin {
  plugin: EditorPluginType.Equations
  state: StateTypeSerializedType<EquationsPluginState>
}
export interface EditorExercisePlugin {
  plugin: EditorPluginType.Exercise
  state: StateTypeSerializedType<ExercisePluginState>
}
export interface EditorGeogebraPlugin {
  plugin: EditorPluginType.Geogebra
  state: StateTypeSerializedType<GeogebraPluginState>
}
export interface EditorHighlightPlugin {
  plugin: EditorPluginType.Highlight
  state: StateTypeSerializedType<HighlightPluginState>
}
export interface EditorImagePlugin {
  plugin: EditorPluginType.Image
  state: StateTypeSerializedType<ImagePluginState>
}
export interface EditorImportantPlugin {
  plugin: EditorPluginType.Important
  state: StateTypeSerializedType<ImportantPluginState>
}
export interface EditorInjectionPlugin {
  plugin: EditorPluginType.Injection
  state: StateTypeSerializedType<InjectionPluginState>
}
export interface EditorInputExercisePlugin {
  plugin: EditorPluginType.InputExercise
  state: StateTypeSerializedType<InputExercisePluginState>
}
export interface EditorLayoutPlugin {
  plugin: EditorPluginType.Layout
  state: StateTypeSerializedType<LayoutPluginState>
}
export interface EditorMultimediaPlugin {
  plugin: EditorPluginType.Multimedia
  state: StateTypeSerializedType<MultimediaPluginState>
}
export interface EditorRowsPlugin {
  plugin: EditorPluginType.Rows
  state: StateTypeSerializedType<RowsPluginState>
}
export interface EditorScMcExercisePlugin {
  plugin: EditorPluginType.ScMcExercise
  state: StateTypeSerializedType<ScMcExercisePluginState>
}
export interface EditorSpoilerPlugin {
  plugin: EditorPluginType.Spoiler
  state: StateTypeSerializedType<SpoilerPluginState>
}
export interface EditorSerloInjectionPlugin {
  plugin: EditorPluginType.Injection
  state: StateTypeSerializedType<InjectionPluginState>
}
export interface EditorSolutionPlugin {
  plugin: EditorPluginType.Solution
  state: StateTypeSerializedType<SolutionPluginState>
}
export interface EditorTablePlugin {
  plugin: EditorPluginType.Table
  state: StateTypeSerializedType<TablePluginState>
}
export interface EditorSerloTablePlugin {
  plugin: EditorPluginType.SerloTable
  state: StateTypeSerializedType<SerloTablePluginState>
}
export interface EditorTextPlugin {
  plugin: EditorPluginType.Text
  state: StateTypeSerializedType<TextEditorState>
}
export interface EditorVideoPlugin {
  plugin: EditorPluginType.Video
  state: StateTypeSerializedType<VideoPluginState>
}
export interface EditorPageLayoutPlugin {
  plugin: EditorPluginType.PageLayout
  state: StateTypeSerializedType<PageLayoutPluginState>
}
export interface EditorPageTeamPlugin {
  plugin: EditorPluginType.PageTeam
  state: StateTypeSerializedType<PageTeamPluginState>
}
export interface EditorPagePartnersPlugin {
  plugin: EditorPluginType.PagePartners
  state: StateTypeSerializedType<PagePartnersPluginState>
}

export type SupportedEditorPlugin =
  | EditorArticlePlugin
  | EditorGeogebraPlugin
  | EditorAnchorPlugin
  | EditorVideoPlugin
  | EditorTablePlugin
  | EditorSerloTablePlugin
  | EditorHighlightPlugin
  | EditorSerloInjectionPlugin
  | EditorLayoutPlugin
  | EditorMultimediaPlugin
  | EditorSpoilerPlugin
  | EditorImportantPlugin
  | EditorBlockquotePlugin
  | EditorBoxPlugin
  | EditorImagePlugin
  | EditorTextPlugin
  | EditorRowsPlugin
  | EditorEquationsPlugin
  | EditorPageLayoutPlugin
  | EditorPageTeamPlugin
  | EditorPagePartnersPlugin

export interface UnknownEditorPlugin {
  plugin: string
  state?: unknown
}
