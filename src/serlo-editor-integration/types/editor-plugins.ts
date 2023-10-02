import { EditorPluginType } from './editor-plugin-type'
import { TemplatePluginType } from './template-plugin-type'
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
import { TextExerciseGroupTypePluginState } from '@/serlo-editor/plugins/serlo-template-plugins/exercise-group/text-exercise-group'
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
  state: Prettify<StateTypeSerializedType<AnchorPluginState>>
  id?: string
}
export interface EditorArticlePlugin {
  plugin: EditorPluginType.Article
  state: Prettify<StateTypeSerializedType<ArticlePluginState>>
  id?: string
}
export interface EditorArticleIntroductionPlugin {
  plugin: EditorPluginType.ArticleIntroduction
  state: Prettify<StateTypeSerializedType<MultimediaPluginState>>
  id?: string
}
export interface EditorBoxPlugin {
  plugin: EditorPluginType.Box
  state: Prettify<StateTypeSerializedType<BoxPluginState>>
  id?: string
}
export interface EditorUnsupportedPlugin {
  plugin: EditorPluginType.Unsupported
  state: Prettify<StateTypeSerializedType<UnsupportedPluginState>>
  id?: string
}
export interface EditorEquationsPlugin {
  plugin: EditorPluginType.Equations
  state: Prettify<StateTypeSerializedType<EquationsPluginState>>
  id?: string
}
export interface EditorExercisePlugin {
  plugin: EditorPluginType.Exercise
  state: Prettify<StateTypeSerializedType<ExercisePluginState>>
  id?: string
}
export interface EditorGeogebraPlugin {
  plugin: EditorPluginType.Geogebra
  state: Prettify<StateTypeSerializedType<GeogebraPluginState>>
  id?: string
}
export interface EditorHighlightPlugin {
  plugin: EditorPluginType.Highlight
  state: Prettify<StateTypeSerializedType<HighlightPluginState>>
  id?: string
}
export interface EditorImagePlugin {
  plugin: EditorPluginType.Image
  state: Prettify<StateTypeSerializedType<ImagePluginState>>
  id?: string
}
export interface EditorInjectionPlugin {
  plugin: EditorPluginType.Injection
  state: Prettify<StateTypeSerializedType<InjectionPluginState>>
  id?: string
}
export interface EditorInputExercisePlugin {
  plugin: EditorPluginType.InputExercise
  state: Prettify<StateTypeSerializedType<InputExercisePluginState>>
  id?: string
}
export interface EditorLayoutPlugin {
  plugin: EditorPluginType.Layout
  state: Prettify<StateTypeSerializedType<LayoutPluginState>>
  id?: string
}
export interface EditorMultimediaPlugin {
  plugin: EditorPluginType.Multimedia
  state: Prettify<StateTypeSerializedType<MultimediaPluginState>>
  id?: string
}
export interface EditorRowsPlugin {
  plugin: EditorPluginType.Rows
  state: Prettify<StateTypeSerializedType<RowsPluginState>>
  id?: string
}
export interface EditorScMcExercisePlugin {
  plugin: EditorPluginType.ScMcExercise
  state: Prettify<StateTypeSerializedType<ScMcExercisePluginState>>
  id?: string
}
export interface EditorSpoilerPlugin {
  plugin: EditorPluginType.Spoiler
  state: Prettify<StateTypeSerializedType<SpoilerPluginState>>
  id?: string
}
export interface EditorSerloInjectionPlugin {
  plugin: EditorPluginType.Injection
  state: Prettify<StateTypeSerializedType<InjectionPluginState>>
  id?: string
}
export interface EditorSolutionPlugin {
  plugin: EditorPluginType.Solution
  state: Prettify<StateTypeSerializedType<SolutionPluginState>>
  id?: string
}
export interface EditorSerloTablePlugin {
  plugin: EditorPluginType.SerloTable
  state: Prettify<StateTypeSerializedType<SerloTablePluginState>>
  id?: string
}
export interface EditorTextPlugin {
  plugin: EditorPluginType.Text
  state: Prettify<StateTypeSerializedType<TextEditorState>>
  id?: string
}
export interface EditorVideoPlugin {
  plugin: EditorPluginType.Video
  state: Prettify<StateTypeSerializedType<VideoPluginState>>
  id?: string
}
export interface EditorAudioPlugin {
  plugin: EditorPluginType.Audio
  state: Prettify<StateTypeSerializedType<AudioPluginState>>
  id?: string
}
export interface EditorPageLayoutPlugin {
  plugin: EditorPluginType.PageLayout
  state: StateTypeSerializedType<PageLayoutPluginState>
  id?: string
}
export interface EditorPageTeamPlugin {
  plugin: EditorPluginType.PageTeam
  state: Prettify<StateTypeSerializedType<PageTeamPluginState>>
  id?: string
}
export interface EditorPagePartnersPlugin {
  plugin: EditorPluginType.PagePartners
  state: Prettify<StateTypeSerializedType<PagePartnersPluginState>>
  id?: string
}
export interface EditorH5PPlugin {
  plugin: EditorPluginType.H5p
  state: Prettify<StateTypeSerializedType<H5pPluginState>>
  id?: string
}

// Template Plugins
export interface EditorTemplateGroupedExercise {
  plugin: TemplatePluginType.TextExerciseGroup
  state: Prettify<StateTypeSerializedType<TextExerciseGroupTypePluginState>> & {
    // extra field that is not actually part of the state until we move solutions into exercises
    exercisesWithSolutions: (
      | []
      | [EditorExercisePlugin, EditorSolutionPlugin]
      | [EditorExercisePlugin]
    )[]
  }
  id?: string
}

export type SupportedEditorPlugin =
  | EditorArticlePlugin
  | EditorArticleIntroductionPlugin
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
  | EditorExercisePlugin
  | EditorPageLayoutPlugin
  | EditorPageTeamPlugin
  | EditorPagePartnersPlugin

export interface UnknownEditorPlugin {
  plugin: string
  state?: unknown
  id?: string
}

type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown
