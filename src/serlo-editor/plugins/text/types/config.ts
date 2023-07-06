import { Descendant, Range } from 'slate'

import { SerializedScalarStateType } from '@/serlo-editor/plugin'

export type TextEditorState = SerializedScalarStateType<
  Descendant[],
  { value: Descendant[]; selection: Range | null }
>

export interface TextEditorConfig {
  placeholder?: TextEditorPluginConfig['placeholder']
  formattingOptions?: TextEditorFormattingOption[]
  noLinebreaks?: boolean
  serloLinkSearch: boolean
}
export interface TextEditorPluginConfig {
  placeholder?: string
  formattingOptions: TextEditorFormattingOption[]
  noLinebreaks?: boolean
  serloLinkSearch: boolean
}

export enum TextEditorFormattingOption {
  code = 'code',
  colors = 'colors',
  headings = 'headings',
  katex = 'katex',
  links = 'links',
  lists = 'lists',
  math = 'math',
  paragraphs = 'paragraphs',
  richText = 'richText',
}
