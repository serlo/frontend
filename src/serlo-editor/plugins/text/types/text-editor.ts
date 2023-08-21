import { ListsEditor } from '@prezly/slate-lists'
import type { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

export type CustomElement =
  | Paragraph
  | List
  | ListItem
  | ListItemText
  | Heading
  | Link
  | MathElement

export interface Heading {
  type: 'h'
  level: 1 | 2 | 3
  children: CustomText[]
}

export interface Paragraph {
  type: 'p'
  children: (CustomText | MathElement)[] // TODO Restrict this to only inline MathElement
}

export interface Link {
  type: 'a'
  href: string
  children: CustomText[]
}

export enum ListElementType {
  UNORDERED_LIST = 'unordered-list',
  ORDERED_LIST = 'ordered-list',
  LIST_ITEM = 'list-item',
  LIST_ITEM_TEXT = 'list-item-child',
}

export interface List {
  type: ListElementType.UNORDERED_LIST | ListElementType.ORDERED_LIST
  children: ListItem[]
}

export interface ListItem {
  type: ListElementType.LIST_ITEM
  children: [ListItemText] | [ListItemText, List]
}

export interface ListItemText {
  type: ListElementType.LIST_ITEM_TEXT
  children: CustomText[]
}

export interface MathElement {
  type: 'math'
  src: string
  inline: boolean
  children: CustomText[]
}

export interface CustomText {
  text: string
  strong?: true
  em?: true
  code?: true
  color?: number
  showPlaceholder?: boolean
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & typeof ListsEditor
    Element: CustomElement
    Text: CustomText
  }
}
