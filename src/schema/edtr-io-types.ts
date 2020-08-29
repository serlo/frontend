import { StateTypeValueType } from '@edtr-io/plugin'
import { AnchorPluginState } from '@edtr-io/plugin-anchor/src/index'
import { GeogebraPluginState } from '@edtr-io/plugin-geogebra/src/index'
// import { HighlightPluginState } from '@edtr-io/plugin-highlight/src/index'
import { ImagePluginState } from '@edtr-io/plugin-image/src/index'
import { MultimediaExplanationPluginState } from '@edtr-io/plugin-multimedia-explanation/src/index'
import { RowsPluginState } from '@edtr-io/plugin-rows/src/index'
import { SerloInjectionPluginState } from '@edtr-io/plugin-serlo-injection/src/index'
import { SpoilerPluginState } from '@edtr-io/plugin-spoiler/src/index'
import { TablePluginState } from '@edtr-io/plugin-table/src/index'
// import { TextPluginState } from '@edtr-io/plugin-text/src/index'
import { createHeadingNode } from '@edtr-io/plugin-text/src/model/schema'
import { VideoPluginState } from '@edtr-io/plugin-video/src/index'

export type PossibleChildren = EdtrState | SlateBlockMock | TextNodeMock
export type PossibleChildOrChildren = PossibleChildren[]

//TODO: mocked, import edtr types if possible
export type SlateBlockMock =
  | TextBlockP
  | TextBlockH
  | TextBlockA
  | TextBlockMath
  | TextBlockListItemChild
  | TextBlockListItem
  | TextBlockUnorderedList
  | TextBlockOrderedList

interface TextBlockP {
  type: 'p'
  children: SlateBlockMock[]
}

interface TextBlockH {
  type: 'h'
  level: Parameters<typeof createHeadingNode>[0]
  children: SlateBlockMock[]
}

interface TextBlockA {
  type: 'a'
  href: string
  children: TextNodeMock[]
}

interface TextBlockMath {
  type: 'math'
  src: string
  inline?: boolean
  children: TextNodeMock[]
}

interface TextBlockListItemChild {
  type: 'list-item-child'
  children: SlateBlockMock[]
}

interface TextBlockListItem {
  type: 'list-item'
  children: TextBlockListItemChild[]
}

interface TextBlockUnorderedList {
  type: 'unordered-list'
  children: TextBlockListItem[]
}

interface TextBlockOrderedList {
  type: 'ordered-list'
  children: TextBlockListItem[]
}

//TODO: mocked, import edtr types if possible
export interface TextNodeMock {
  text: string
  strong?: boolean
  em?: boolean
  color?: 0 | 1 | 2
}

// types for all supported @edtr-io plugins

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
  //TODO: Use import, but it currently triggers TS error
  // state: StateTypeValueType<HighlightPluginState>
  state: {
    code: string
    language: string
    showLineNumbers: boolean
  }
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

export type EdtrState = { plugin: string } & (
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
)
