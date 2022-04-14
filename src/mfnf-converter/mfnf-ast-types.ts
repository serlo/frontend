export type MfnfElement =
  | MfnfDocument
  | MfnfHeading
  | MfnfText
  | MfnfFormatted
  | MfnfParagraph
  | MfnfTemplate
  | MfnfTemplateArgument
  | MfnfInternalReference
  | MfnfExternalReference
  | MfnfListItem
  | MfnfList
  | MfnfTable
  | MfnfTableRow
  | MfnfTableCell
  | MfnfComment
  | MfnfHtmlTag
  | MfnfGallery
  | MfnfError

// Inline: can be represented by edtr-io text plugin
export type MfnfElementForTextPlugin =
  | MfnfHeading
  | MfnfText
  | MfnfFormatted
  | MfnfParagraph
  | MfnfInternalReference
  | MfnfExternalReference
  | MfnfListItem
  | MfnfList

export interface MfnfDocument {
  type: 'document'
  position: MfnfSpan
  content: MfnfElement[]
}

export interface MfnfComment {
  type: 'comment'
  position: MfnfSpan
  text: string
}

export interface MfnfError {
  type: 'error'
  position: MfnfSpan
  message: string
}

export interface MfnfExternalReference {
  type: 'externalreference'
  position: MfnfSpan
  target: string
  caption: MfnfElement[]
}
export interface MfnfFormatted {
  type: 'formatted'
  position: MfnfSpan
  markup: MarkupType
  content: MfnfElement[]
}

export interface MfnfGallery {
  type: 'gallery'
  position: MfnfSpan
  attributes: MfnfTagAttribute[]
  content: MfnfElement[]
}

export interface MfnfHeading {
  type: 'heading'
  position: MfnfSpan
  depth: number
  caption: MfnfElement[]
  content: MfnfElement[]
}

export interface MfnfHtmlTag {
  type: 'htmltag'
  position: MfnfSpan
  name: string
  attributes: MfnfTagAttribute[]
  content: MfnfElement[]
}

export interface MfnfInternalReference {
  type: 'internalreference' | 'internalreference' // not sure why
  position: MfnfSpan
  target: MfnfElement[]
  options: Array<MfnfElement[]>
  caption: MfnfElement[]
}

export interface MfnfList {
  type: 'list'
  position: MfnfSpan
  content: MfnfElement[]
}

export interface MfnfListItem {
  type: 'listitem'
  position: MfnfSpan
  depth: number
  kind: ListItemKind
  content: MfnfElement[]
}

export type ListItemKind =
  | 'unordered'
  | 'definition'
  | 'definitionterm'
  | 'ordered'

export type MarkupType =
  | 'nowiki'
  | 'bold'
  | 'italic'
  | 'math'
  | 'strikethrough'
  | 'underline'
  | 'code'
  | 'blockquote'
  | 'preformatted'

export interface MfnfParagraph {
  type: 'paragraph'
  position: MfnfSpan
  content: MfnfElement[]
}

export interface MfnfPosition {
  type: 'position'
  offset: number
  line: number
  col: number
}

export interface MfnfSpan {
  type: 'mfnfspan'
  start: MfnfPosition
  end: MfnfPosition
}

export interface MfnfTable {
  type: 'table'
  position: MfnfSpan
  attributes: MfnfTagAttribute[]
  caption: MfnfElement[]
  caption_attributes: MfnfTagAttribute[]
  rows: MfnfElement[]
}

export interface MfnfTableCell {
  type: 'tablecell'
  position: MfnfSpan
  header: boolean
  attributes: MfnfTagAttribute[]
  content: MfnfElement[]
}

export interface MfnfTableRow {
  type: 'tablerow'
  position: MfnfSpan
  attributes: MfnfTagAttribute[]
  cells: MfnfElement[]
}

export interface MfnfTagAttribute {
  type: 'tagattribute'
  position: MfnfSpan
  key: string
  value: string
}

export interface MfnfTemplate {
  type: 'template'
  position: MfnfSpan
  name: MfnfElement[]
  content: MfnfElement[]
}

export interface MfnfTemplateArgument {
  type: 'templateargument'
  position: MfnfSpan
  name: string
  value: MfnfElement[]
}

export interface MfnfText {
  type: 'text'
  position: MfnfSpan
  text: string
}
