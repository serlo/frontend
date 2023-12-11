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
  | Blank

export interface Answer {
  answer: string
  // Here we could store feedback for the learner that shows up when answers are checked
  //learnerFeedback?: string
}

export interface Blank {
  type: 'blank'
  children: CustomText[]
  blankId: string // Used to uniquely identify a blank
  correctAnswers: Answer[]
  // Here we could specify incorrect answers for this blank with specific learner feedback
  // incorrectAnswers?: Answer[]
  // Here we could add a default feedback for the learner
  // defaultIncorrectAnswerFeedback: string
  // Here we could specify a method to check the answer
  // checkAnswerMethod?: 'text' | 'number' | 'math-expression'
}

export interface Heading {
  type: 'h'
  level: 1 | 2 | 3
  children: CustomText[]
}

export interface Paragraph {
  type: 'p'
  children: (CustomText | MathElement)[]
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

// Adds type info for custom elements to slate
// See: https://docs.slatejs.org/concepts/12-typescript
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & typeof ListsEditor
    Element: CustomElement
    Text: CustomText
  }
}
