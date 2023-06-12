import { StateTypeSerializedType } from '@edtr-io/plugin'

import { BoxPluginState } from '@/edtr-io/plugins/box'
import { PageLayoutPluginState } from '@/edtr-io/plugins/page-layout'
import { PageTeamPluginState } from '@/edtr-io/plugins/page-team'
import { SerloTablePluginState } from '@/edtr-io/plugins/serlo-table'
import { AnchorPluginState } from '@/serlo-editor-repo/plugins/anchor'
import { BlockquotePluginState } from '@/serlo-editor-repo/plugins/blockquote'
import { GeogebraPluginState } from '@/serlo-editor-repo/plugins/geogebra'
import { HighlightPluginState } from '@/serlo-editor-repo/plugins/highlight'
import { ImagePluginState } from '@/serlo-editor-repo/plugins/image'
import { SerloInjectionPluginState } from '@/serlo-editor-repo/plugins/injection'
import { MultimediaExplanationPluginState } from '@/serlo-editor-repo/plugins/multimedia-explanation'
import { RowsPluginState } from '@/serlo-editor-repo/plugins/rows'
import { SpoilerPluginState } from '@/serlo-editor-repo/plugins/spoiler'
import { TablePluginState } from '@/serlo-editor-repo/plugins/table'
import {
  CustomElement,
  CustomText,
  TextEditorState,
} from '@/serlo-editor-repo/plugins/text'
import { VideoPluginState } from '@/serlo-editor-repo/plugins/video'

export type SlateBlockElement = CustomElement
export type SlateTextElement = CustomText

// types for all supported @edtr-io plugins

export interface EdtrPluginArticle {
  plugin: 'article'
  state: {
    introduction: EdtrPluginArticleIntroduction
    content: EdtrPluginRows
    exercises: EdtrPluginSerloInjection[]
    exerciseFolder: {
      id: string
      title: string
    }
    relatedContent: {
      articles: {
        id: string
        title: string
      }[]
      courses: {
        id: string
        title: string
      }[]
      videos: {
        id: string
        title: string
      }[]
    }
    sources: {
      href: string
      title: string
    }[]
  }
}

export interface EdtrPluginArticleIntroduction {
  plugin: 'articleIntroduction'
  state: StateTypeSerializedType<MultimediaExplanationPluginState>
}

export interface EdtrPluginGeogebra {
  plugin: 'geogebra'
  state: StateTypeSerializedType<GeogebraPluginState>
}

export interface EdtrPluginAnchor {
  plugin: 'anchor'
  state: StateTypeSerializedType<AnchorPluginState>
}

export interface EdtrPluginVideo {
  plugin: 'video'
  state: StateTypeSerializedType<VideoPluginState>
}

export interface EdtrPluginTable {
  plugin: 'table'
  state: StateTypeSerializedType<TablePluginState>
}

export interface EdtrPluginSerloTable {
  plugin: 'serloTable'
  state: StateTypeSerializedType<SerloTablePluginState>
}

export interface EdtrPluginHighlight {
  plugin: 'highlight'
  state: StateTypeSerializedType<HighlightPluginState>
}

export interface EdtrPluginSerloInjection {
  plugin: 'injection'
  state: StateTypeSerializedType<SerloInjectionPluginState>
}

interface LayoutChild {
  child: EdtrState
  width: number
}
export interface EdtrPluginLayout {
  plugin: 'layout'
  state: LayoutChild[]
}

export interface EdtrPluginMultimediaExplanation {
  plugin: 'multimedia'
  state: StateTypeSerializedType<MultimediaExplanationPluginState>
}

export interface EdtrPluginSpoiler {
  plugin: 'spoiler'
  state: StateTypeSerializedType<SpoilerPluginState>
}

export interface EdtrPluginImportant {
  plugin: 'important'
  state: EdtrPluginText
}

export interface EdtrPluginBlockquote {
  plugin: 'blockquote'
  state: StateTypeSerializedType<BlockquotePluginState>
}

export interface EdtrPluginBox {
  plugin: 'box'
  state: StateTypeSerializedType<BoxPluginState>
}

export interface EdtrPluginImage {
  plugin: 'image'
  state: StateTypeSerializedType<ImagePluginState>
}

export interface EdtrPluginText {
  plugin: 'text'
  state: StateTypeSerializedType<TextEditorState>
}

export interface EdtrPluginRows {
  plugin: 'rows'
  state: StateTypeSerializedType<RowsPluginState>
}

export interface EdtrPluginEquations {
  plugin: 'equations'
  state: {
    steps: {
      left: string
      right: string
      transform: string
      explanation: EdtrPluginText
      sign: string
    }[]
    firstExplanation: EdtrPluginText
    transformationTarget: 'term' | 'equation'
  }
}

export interface EdtrPluginPageLayout {
  plugin: 'pageLayout'
  state: StateTypeSerializedType<PageLayoutPluginState>
}

export interface EdtrPluginPageTeam {
  plugin: 'pageTeam'
  state: StateTypeSerializedType<PageTeamPluginState>
}

export interface EdtrPluginPagePartners {
  plugin: 'pagePartners'
  state: undefined
}

export type EdtrState =
  | EdtrPluginArticle
  | EdtrPluginGeogebra
  | EdtrPluginAnchor
  | EdtrPluginVideo
  | EdtrPluginTable
  | EdtrPluginSerloTable
  | EdtrPluginHighlight
  | EdtrPluginSerloInjection
  | EdtrPluginLayout
  | EdtrPluginMultimediaExplanation
  | EdtrPluginSpoiler
  | EdtrPluginImportant
  | EdtrPluginBlockquote
  | EdtrPluginBox
  | EdtrPluginImage
  | EdtrPluginText
  | EdtrPluginRows
  | EdtrPluginEquations
  | EdtrPluginPageLayout
  | EdtrPluginPageTeam
  | EdtrPluginPagePartners

export interface UnknownEdtrState {
  plugin: string
  state?: unknown
}
