import { StateTypeSerializedType } from 'test-edtr-io/plugin'
import { AnchorPluginState } from 'test-edtr-io/plugin-anchor'
import { BlockquotePluginState } from 'test-edtr-io/plugin-blockquote'
import { GeogebraPluginState } from 'test-edtr-io/plugin-geogebra'
import { HighlightPluginState } from 'test-edtr-io/plugin-highlight'
import { ImagePluginState } from 'test-edtr-io/plugin-image'
import { MultimediaExplanationPluginState } from 'test-edtr-io/plugin-multimedia-explanation'
import { RowsPluginState } from 'test-edtr-io/plugin-rows'
import { SerloInjectionPluginState } from 'test-edtr-io/plugin-serlo-injection'
import { SpoilerPluginState } from 'test-edtr-io/plugin-spoiler'
import { TablePluginState } from 'test-edtr-io/plugin-table'
import {
  CustomElement,
  CustomText,
  TextEditorState,
} from 'test-edtr-io/plugin-text'
import { VideoPluginState } from 'test-edtr-io/plugin-video'

import { BoxPluginState } from '@/edtr-io/plugins/box'
import { PageLayoutPluginState } from '@/edtr-io/plugins/page-layout'
import { PageTeamPluginState } from '@/edtr-io/plugins/page-team'
import { SerloTablePluginState } from '@/edtr-io/plugins/serlo-table'

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
