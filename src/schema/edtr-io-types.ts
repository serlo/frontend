// import { AnchorPluginState } from '@edtr-io/plugin-anchor/src/index'
// import { GeogebraPluginState } from '@edtr-io/plugin-geogebra/src/index'
// import { HighlightPluginState } from '@edtr-io/plugin-highlight/src/index'
// import { ImagePluginState } from '@edtr-io/plugin-image/src/index'
// import { SerloInjectionPluginState } from '@edtr-io/plugin-serlo-injection/src/index'
// import { MultimediaExplanationPluginState } from '@edtr-io/plugin-multimedia-explanation/src/index'
// import { RowsPluginState } from '@edtr-io/plugin-rows/src/index'
//  import { SpoilerPluginState } from '@edtr-io/plugin-spoiler/src/index'
// import { TablePluginState } from '@edtr-io/plugin-table/src/index'
// import { TextPluginState } from '@edtr-io/plugin-text/src/index'
// import { VideoPluginState } from '@edtr-io/plugin-video/src/index'

type MockChild = EdtrState | SlateBlockMock | TextNodeMock

export interface SlateBlockMock {
  type:
    | 'a'
    | 'h'
    | 'p'
    | 'unordered-list'
    | 'ordered-list'
    | 'list-item'
    | 'list-item-child'
    | 'math'
  child?: MockChild
  children?: MockChild
  content?: MockChild[]
  href?: string
  level?: 1 | 2 | 3 | 4 | 5
  inline?: boolean
  src?: string
}

/*
export interface EditorStateDummy {
  title?: string
  class?: string
  href?: string
  src?: string
  alt?: string
  id?: number | string
  maxWidth?: number
  text?: string
  size?: number
  formula?: string
  inline?: boolean
  alignLeft?: boolean
  level?: number
  strong?: boolean
  em?: boolean
  width?: number
  explanation: EditorStateDummy
  multimedia: EditorStateDummy
  interactive: EditorStateDummy[]
  code: string
  prerequisite: EditorStateDummy[]
  strategy: EditorStateDummy[]
  isSingleChoice: boolean
  type: string
  unit: string
  answers: EditorStateDummy[]
  steps: EditorStateDummy[]
  color: number | string
  left: EditorStateDummy[]
  // sign: StepProps['sign']
  right: EditorStateDummy[]
  transform: EditorStateDummy[]
  feedback: EditorStateDummy[]
  isCorrect: boolean
}
*/

//mocked
export interface TextNodeMock {
  text: string
  strong?: boolean
  em?: boolean
  color?: 0 | 1 | 2
}

// types for all supported @edtr-io plugins

//TODO: find a way to actually export the relevant type from the PluginState types...

export interface EdtrPluginGeogebra {
  plugin: 'geogebra'
  state: string //GeogebraPluginState
}

export interface EdtrPluginAnchor {
  plugin: 'anchor'
  state: string //AnchorPluginState
}

export interface EdtrPluginVideo {
  plugin: 'video'
  state: {
    //VideoPluginState
    src: string
    alt: string
  }
}

export interface EdtrPluginTable {
  plugin: 'table'
  // state: TablePluginState
  state: string
}

export interface EdtrPluginHighlight {
  plugin: 'highlight'
  // state: HighlightPluginState
  state: {
    code: string
    language: string
    showLineNumbers: boolean
  }
}

interface EdtrPluginSerloInjection {
  plugin: 'injection'
  // state: SerloInjectionPluginState
  state: string
}

//TODO: This is mocked, get real types
interface LayoutChild {
  child: EdtrState
  width: number
}
interface EdtrPluginLayout {
  plugin: 'layout'
  state: LayoutChild[]
}

interface EdtrPluginMultimediaExplanation {
  plugin: 'multimedia'
  // state:MultimediaExplanationPluginState
  state: {
    explanation: EdtrState
    multimedia: EdtrState
    illustrating: boolean
    width: number
  }
}

export interface EdtrPluginSpoiler {
  plugin: 'spoiler'
  // state: SpoilerPluginState
  state: { title: string; content: EdtrState }
}

//Compat: Unsupported Type
export interface EdtrPluginImportant {
  plugin: 'important'
  state: EdtrState
}

export interface EdtrPluginImage {
  plugin: 'image'
  // state: ImagePluginState
  state: {
    src: string
    link?: {
      href: string
      openInNewTab: boolean
    }
    alt?: string
    maxWidth?: number
  }
}

export interface EdtrPluginText {
  plugin: 'text'
  // state: TextPluginState
  state: any
}

export interface EdtrPluginRows {
  plugin: 'rows'
  // state: RowsPluginState
  state: EdtrState
}

//TODO: This is mocked, get real types
export interface EdtrPluginEquations {
  plugin: 'equations'
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
