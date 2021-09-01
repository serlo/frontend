import { StateTypeSerializedType } from '@edtr-io/plugin'
import { AnchorPluginState } from '@edtr-io/plugin-anchor'
import { BlockquotePluginState } from '@edtr-io/plugin-blockquote'
import { GeogebraPluginState } from '@edtr-io/plugin-geogebra'
import { HighlightPluginState } from '@edtr-io/plugin-highlight'
import { ImagePluginState } from '@edtr-io/plugin-image'
import { MultimediaExplanationPluginState } from '@edtr-io/plugin-multimedia-explanation'
import { RowsPluginState } from '@edtr-io/plugin-rows'
import { SerloInjectionPluginState } from '@edtr-io/plugin-serlo-injection'
import { SpoilerPluginState } from '@edtr-io/plugin-spoiler'
import { TablePluginState } from '@edtr-io/plugin-table'
import { NewElement, NewText, TextPluginState } from '@edtr-io/plugin-text'
import { VideoPluginState } from '@edtr-io/plugin-video'

export type SlateBlockElement = NewElement
export type SlateTextElement = NewText

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

export interface EdtrPluginImage {
  plugin: 'image'
  state: StateTypeSerializedType<ImagePluginState>
}

export interface EdtrPluginText {
  plugin: 'text'
  state: StateTypeSerializedType<TextPluginState>
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
  }
}

export type EdtrState =
  | EdtrPluginArticle
  | EdtrPluginGeogebra
  | EdtrPluginAnchor
  | EdtrPluginVideo
  | EdtrPluginTable
  | EdtrPluginHighlight
  | EdtrPluginSerloInjection
  | EdtrPluginLayout
  | EdtrPluginMultimediaExplanation
  | EdtrPluginSpoiler
  | EdtrPluginImportant
  | EdtrPluginBlockquote
  | EdtrPluginImage
  | EdtrPluginText
  | EdtrPluginRows
  | EdtrPluginEquations

export interface UnsupportedEdtrState {
  plugin: string
  state: any
}
