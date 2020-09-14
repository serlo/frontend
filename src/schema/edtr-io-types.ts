import { StateTypeValueType } from '@edtr-io/plugin'
import { AnchorPluginState } from '@edtr-io/plugin-anchor'
import { GeogebraPluginState } from '@edtr-io/plugin-geogebra'
import { HighlightPluginState } from '@edtr-io/plugin-highlight'
import { ImagePluginState } from '@edtr-io/plugin-image'
import { MultimediaExplanationPluginState } from '@edtr-io/plugin-multimedia-explanation'
import { RowsPluginState } from '@edtr-io/plugin-rows'
import { SerloInjectionPluginState } from '@edtr-io/plugin-serlo-injection'
import { SpoilerPluginState } from '@edtr-io/plugin-spoiler'
import { TablePluginState } from '@edtr-io/plugin-table'
import { NewElement, NewText } from '@edtr-io/plugin-text' //TextPluginState
import { VideoPluginState } from '@edtr-io/plugin-video'

export type SlateBlockElement = NewElement
export type SlateTextElement = NewText

// types for all supported @edtr-io plugins

//TODO: StateTypeValueType<> returns State as string, so we have to do some type assertions in the converter
// see: https://github.com/edtr-io/edtr-io/issues/317

export interface EdtrPluginGeogebra {
  plugin: 'geogebra'
  state: StateTypeValueType<GeogebraPluginState>
}

export interface EdtrPluginAnchor {
  plugin: 'anchor'
  state: StateTypeValueType<AnchorPluginState>
}

export interface EdtrPluginVideo {
  plugin: 'video'
  state: StateTypeValueType<VideoPluginState>
}

export interface EdtrPluginTable {
  plugin: 'table'
  state: StateTypeValueType<TablePluginState>
}

export interface EdtrPluginHighlight {
  plugin: 'highlight'
  state: StateTypeValueType<HighlightPluginState>
}

interface EdtrPluginSerloInjection {
  plugin: 'injection'
  state: StateTypeValueType<SerloInjectionPluginState>
}

//TODO: This is mocked, get real types
interface LayoutChild {
  child: EdtrState
  width: number
}
export interface EdtrPluginLayout {
  plugin: 'layout'
  state: LayoutChild[]
}

interface EdtrPluginMultimediaExplanation {
  plugin: 'multimedia'
  state: StateTypeValueType<MultimediaExplanationPluginState>
}

export interface EdtrPluginSpoiler {
  plugin: 'spoiler'
  state: StateTypeValueType<SpoilerPluginState>
}

//Compat: Unsupported Type
export interface EdtrPluginImportant {
  plugin: 'important'
  state: EdtrState
}

export interface EdtrPluginImage {
  plugin: 'image'
  state: StateTypeValueType<ImagePluginState>
}

export interface EdtrPluginText {
  plugin: 'text'
  state: any
  //TODO: Import real state
  // state: StateTypeValueType<TextPluginState>
}

export interface EdtrPluginRows {
  plugin: 'rows'
  state: StateTypeValueType<RowsPluginState>
}

//TODO: This is mocked, get real types when npm package is public
export interface EdtrPluginEquations {
  plugin: 'equations'
  // state: StateTypeValueType<EquationsPluginState>
  state: {
    steps: [
      {
        left: {
          plugin: 'text'
          state: any
        }
        right: {
          plugin: 'text'
          state: any
        }
        transform: {
          plugin: 'text'
          state: any
        }
        symbol: string
      }
    ]
  }
}

export type EdtrState =
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
  | EdtrPluginImage
  | EdtrPluginText
  | EdtrPluginRows
  | EdtrPluginEquations

export interface UnsupportedEdtrState {
  plugin: string
  state: any
}
