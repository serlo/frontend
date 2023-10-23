import { EditorPluginType } from './editor-plugin-type'
import { TemplatePluginType } from './template-plugin-type'
import type { ArticlePluginState } from '../../serlo-editor/plugins/article'
import type { ExercisePluginState } from '../../serlo-editor/plugins/exercise'
import type { InjectionPluginState } from '../../serlo-editor/plugins/injection'
import type { SolutionPluginState } from '../../serlo-editor/plugins/solution'
import type { UnsupportedPluginState } from '../../serlo-editor/plugins/unsupported'
import { License } from '@/fetcher/query-types'
import type { StateTypeStaticType } from '@/serlo-editor/plugin'
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

// All supported editor plugins in their static versions

export interface EditorAnchorDocument {
  plugin: EditorPluginType.Anchor
  state: Prettify<StateTypeStaticType<AnchorPluginState>>
  id?: string
}
export interface EditorArticleDocument {
  plugin: EditorPluginType.Article
  state: Prettify<StateTypeStaticType<ArticlePluginState>>
  id?: string
}
export interface EditorArticleIntroductionDocument {
  plugin: EditorPluginType.ArticleIntroduction
  state: Prettify<StateTypeStaticType<MultimediaPluginState>>
  id?: string
}
export interface EditorBoxDocument {
  plugin: EditorPluginType.Box
  state: Prettify<StateTypeStaticType<BoxPluginState>>
  id?: string
}
export interface EditorUnsupportedDocument {
  plugin: EditorPluginType.Unsupported
  state: Prettify<StateTypeStaticType<UnsupportedPluginState>>
  id?: string
}
export interface EditorEquationsDocument {
  plugin: EditorPluginType.Equations
  state: Prettify<StateTypeStaticType<EquationsPluginState>>
  id?: string
}
export interface EditorExerciseDocument {
  plugin: EditorPluginType.Exercise
  state: Prettify<StateTypeStaticType<ExercisePluginState>>
  id?: string

  // additional data for serlo, not part of normal state
  serloContext?: {
    uuid?: number
    revisionId?: number
    trashed?: boolean
    grouped?: boolean
    unrevisedRevisions?: number
    license?: License
  }

  // until we actually move solution into exercise we add it here
  solution?: EditorSolutionDocument
}
export interface EditorGeogebraDocument {
  plugin: EditorPluginType.Geogebra
  state: Prettify<StateTypeStaticType<GeogebraPluginState>>
  id?: string
}
export interface EditorHighlightDocument {
  plugin: EditorPluginType.Highlight
  state: Prettify<StateTypeStaticType<HighlightPluginState>>
  id?: string
}
export interface EditorImageDocument {
  plugin: EditorPluginType.Image
  state: Prettify<StateTypeStaticType<ImagePluginState>>
  id?: string
}
export interface EditorInjectionDocument {
  plugin: EditorPluginType.Injection
  state: Prettify<StateTypeStaticType<InjectionPluginState>>
  id?: string
}
export interface EditorInputExerciseDocument {
  plugin: EditorPluginType.InputExercise
  state: Prettify<StateTypeStaticType<InputExercisePluginState>>
  id?: string
}
export interface EditorMultimediaDocument {
  plugin: EditorPluginType.Multimedia
  state: Prettify<StateTypeStaticType<MultimediaPluginState>>
  id?: string
}
export interface EditorRowsDocument {
  plugin: EditorPluginType.Rows
  state: Prettify<StateTypeStaticType<RowsPluginState>>
  id?: string
}
export interface EditorScMcExerciseDocument {
  plugin: EditorPluginType.ScMcExercise
  state: Prettify<StateTypeStaticType<ScMcExercisePluginState>>
  id?: string
}
export interface EditorSpoilerDocument {
  plugin: EditorPluginType.Spoiler
  state: Prettify<StateTypeStaticType<SpoilerPluginState>>
  id?: string
}
export interface EditorSerloInjectionDocument {
  plugin: EditorPluginType.Injection
  state: Prettify<StateTypeStaticType<InjectionPluginState>>
  id?: string
}
export interface EditorSolutionDocument {
  plugin: EditorPluginType.Solution
  state: Prettify<StateTypeStaticType<SolutionPluginState>>
  id?: string

  // additional data for serlo, not part of normal state
  serloContext?: {
    uuid?: number
    exerciseId?: number
    trashed?: boolean
    unrevisedRevisions?: number
    license?: License
  }
}
export interface EditorSerloTableDocument {
  plugin: EditorPluginType.SerloTable
  state: Prettify<StateTypeStaticType<SerloTablePluginState>>
  id?: string
}
export interface EditorTextDocument {
  plugin: EditorPluginType.Text
  state: Prettify<StateTypeStaticType<TextEditorState>>
  id?: string
}
export interface EditorVideoDocument {
  plugin: EditorPluginType.Video
  state: Prettify<StateTypeStaticType<VideoPluginState>>
  id?: string
}
export interface EditorAudioDocument {
  plugin: EditorPluginType.Audio
  state: Prettify<StateTypeStaticType<AudioPluginState>>
  id?: string
}
export interface EditorPageLayoutDocument {
  plugin: EditorPluginType.PageLayout
  state: Prettify<StateTypeStaticType<PageLayoutPluginState>>
  id?: string
}
export interface EditorPageTeamDocument {
  plugin: EditorPluginType.PageTeam
  state: Prettify<StateTypeStaticType<PageTeamPluginState>>
  id?: string
}
export interface EditorPagePartnersDocument {
  plugin: EditorPluginType.PagePartners
  state: Prettify<StateTypeStaticType<PagePartnersPluginState>>
  id?: string
}
export interface EditorH5PDocument {
  plugin: EditorPluginType.H5p
  state: Prettify<StateTypeStaticType<H5pPluginState>>
  id?: string
}

// Template Plugins
export interface EditorTemplateExerciseGroupDocument {
  plugin: TemplatePluginType.TextExerciseGroup
  state: Prettify<StateTypeStaticType<TextExerciseGroupTypePluginState>> & {
    // extra field that is not actually part of the state until we move solutions into exercises
    exercises: EditorExerciseDocument[]
  }
  id?: string

  // additional data for serlo, not part of normal state
  serloContext?: {
    uuid?: number
    trashed?: boolean
    unrevisedRevisions?: number
    license?: License
  }
}

export type SupportedEditorDocument =
  | EditorArticleDocument
  | EditorArticleIntroductionDocument
  | EditorGeogebraDocument
  | EditorAnchorDocument
  | EditorVideoDocument
  | EditorAudioDocument
  | EditorSerloTableDocument
  | EditorHighlightDocument
  | EditorSerloInjectionDocument
  | EditorMultimediaDocument
  | EditorSpoilerDocument
  | EditorBoxDocument
  | EditorImageDocument
  | EditorTextDocument
  | EditorRowsDocument
  | EditorEquationsDocument
  | EditorExerciseDocument
  | EditorPageLayoutDocument
  | EditorPageTeamDocument
  | EditorPagePartnersDocument

export interface UnknownEditorDocument {
  plugin: string
  state?: unknown
  id?: string
}

export type AnyEditorDocument = SupportedEditorDocument | UnknownEditorDocument

// dark ts magic ✨
type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown
