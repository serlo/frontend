import { EditorPluginType } from './editor-plugin-type'
import type { LayoutPluginState } from '../../serlo-editor/plugins/_on-the-way-out/layout'
import type { ArticlePluginState } from '../../serlo-editor/plugins/article'
import type { ExercisePluginState } from '../../serlo-editor/plugins/exercise'
import type { InjectionPluginState } from '../../serlo-editor/plugins/injection'
import type { SolutionPluginState } from '../../serlo-editor/plugins/solution'
import type { UnsupportedPluginState } from '../../serlo-editor/plugins/unsupported'
import type { StateTypeSerializedType } from '@/serlo-editor/plugin'
import type { AnchorPluginState } from '@/serlo-editor/plugins/anchor'
import { AudioPluginState } from '@/serlo-editor/plugins/audio'
import { BoxPluginState } from '@/serlo-editor/plugins/box'
import { EquationsPluginState } from '@/serlo-editor/plugins/equations'
import type { GeogebraPluginState } from '@/serlo-editor/plugins/geogebra'
import { H5pPluginState } from '@/serlo-editor/plugins/h5p'
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
  id?: string
}
export interface EditorArticlePlugin {
  plugin: EditorPluginType.Article
  state: StateTypeSerializedType<ArticlePluginState>
  id?: string
}
export interface EditorBoxPlugin {
  plugin: EditorPluginType.Box
  state: StateTypeSerializedType<BoxPluginState>
  id?: string
}
export interface EditorUnsupportedPlugin {
  plugin: EditorPluginType.Unsupported
  state: StateTypeSerializedType<UnsupportedPluginState>
  id?: string
}
export interface EditorEquationsPlugin {
  plugin: EditorPluginType.Equations
  state: StateTypeSerializedType<EquationsPluginState>
  id?: string
}
export interface EditorExercisePlugin {
  plugin: EditorPluginType.Exercise
  state: StateTypeSerializedType<ExercisePluginState>
  id?: string
}
export interface EditorGeogebraPlugin {
  plugin: EditorPluginType.Geogebra
  state: StateTypeSerializedType<GeogebraPluginState>
  id?: string
}
export interface EditorHighlightPlugin {
  plugin: EditorPluginType.Highlight
  state: StateTypeSerializedType<HighlightPluginState>
  id?: string
}
export interface EditorImagePlugin {
  plugin: EditorPluginType.Image
  state: StateTypeSerializedType<ImagePluginState>
  id?: string
}
export interface EditorInjectionPlugin {
  plugin: EditorPluginType.Injection
  state: StateTypeSerializedType<InjectionPluginState>
  id?: string
}
export interface EditorInputExercisePlugin {
  plugin: EditorPluginType.InputExercise
  state: StateTypeSerializedType<InputExercisePluginState>
  id?: string
}
export interface EditorLayoutPlugin {
  plugin: EditorPluginType.Layout
  state: StateTypeSerializedType<LayoutPluginState>
  id?: string
}
export interface EditorMultimediaPlugin {
  plugin: EditorPluginType.Multimedia
  state: StateTypeSerializedType<MultimediaPluginState>
  id?: string
}
export interface EditorRowsPlugin {
  plugin: EditorPluginType.Rows
  state: StateTypeSerializedType<RowsPluginState>
  id?: string
}
export interface EditorScMcExercisePlugin {
  plugin: EditorPluginType.ScMcExercise
  state: StateTypeSerializedType<ScMcExercisePluginState>
  id?: string
}
export interface EditorSpoilerPlugin {
  plugin: EditorPluginType.Spoiler
  state: StateTypeSerializedType<SpoilerPluginState>
  id?: string
}
export interface EditorSerloInjectionPlugin {
  plugin: EditorPluginType.Injection
  state: StateTypeSerializedType<InjectionPluginState>
  id?: string
}
export interface EditorSolutionPlugin {
  plugin: EditorPluginType.Solution
  state: StateTypeSerializedType<SolutionPluginState>
  id?: string
}
export interface EditorSerloTablePlugin {
  plugin: EditorPluginType.SerloTable
  state: StateTypeSerializedType<SerloTablePluginState>
  id?: string
}
export interface EditorTextPlugin {
  plugin: EditorPluginType.Text
  state: StateTypeSerializedType<TextEditorState>
  id?: string
}
export interface EditorVideoPlugin {
  plugin: EditorPluginType.Video
  state: StateTypeSerializedType<VideoPluginState>
  id?: string
}
export interface EditorAudioPlugin {
  plugin: EditorPluginType.Audio
  state: StateTypeSerializedType<AudioPluginState>
  id?: string
}
export interface EditorPageLayoutPlugin {
  plugin: EditorPluginType.PageLayout
  state: StateTypeSerializedType<PageLayoutPluginState>
  id?: string
}
export interface EditorPageTeamPlugin {
  plugin: EditorPluginType.PageTeam
  state: StateTypeSerializedType<PageTeamPluginState>
  id?: string
}
export interface EditorPagePartnersPlugin {
  plugin: EditorPluginType.PagePartners
  state: StateTypeSerializedType<PagePartnersPluginState>
  id?: string
}
export interface EditorH5PPlugin {
  plugin: EditorPluginType.H5p
  state: StateTypeSerializedType<H5pPluginState>
  id?: string
}

export type SupportedEditorPlugin =
  | EditorArticlePlugin
  | EditorGeogebraPlugin
  | EditorAnchorPlugin
  | EditorVideoPlugin
  | EditorAudioPlugin
  | EditorSerloTablePlugin
  | EditorHighlightPlugin
  | EditorSerloInjectionPlugin
  | EditorLayoutPlugin
  | EditorMultimediaPlugin
  | EditorSpoilerPlugin
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
  id?: string
}
