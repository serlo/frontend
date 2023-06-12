import { Descendant, Range } from 'slate'

import { Heading } from './text-editor'
import { SerializedScalarStateType } from '@/serlo-editor-repo/plugin'
import { DeepPartial } from '@/serlo-editor-repo/ui'

export type TextEditorState = SerializedScalarStateType<
  Descendant[],
  { value: Descendant[]; selection: Range | null }
>

export interface TextEditorConfig {
  placeholder?: TextEditorPluginConfig['placeholder']
  formattingOptions?: TextEditorFormattingOption[]
  i18n?: DeepPartial<TextEditorPluginConfig['i18n']>
  noLinebreaks?: boolean
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

interface I18n {
  code: {
    toggleTitle: string
  }
  colors: {
    setColorTitle: string
    resetColorTitle: string
    openMenuTitle: string
    closeMenuTitle: string
    colorNames: string[]
  }
  headings: {
    setHeadingTitle(level: Heading['level']): string
    openMenuTitle: string
    closeMenuTitle: string
  }
  link: {
    toggleTitle: string
    placeholder: string
    openInNewTabTitle: string
  }
  list: {
    toggleOrderedList: string
    toggleUnorderedList: string
    openMenuTitle: string
    closeMenuTitle: string
  }
  math: {
    toggleTitle: string
    displayBlockLabel: string
    placeholder: string
    editors: {
      visual: string
      latex: string
      noVisualEditorAvailableMessage: string
    }
    helpText(
      KeySpan: React.ComponentType<{ children: React.ReactNode }>
    ): React.ReactNode
  }
  richText: {
    toggleStrongTitle: string
    toggleEmphasizeTitle: string
  }
  suggestions: {
    noResultsMessage: string
  }
}

export interface TextEditorPluginConfig {
  placeholder: string
  formattingOptions: TextEditorFormattingOption[]
  i18n: I18n
  noLinebreaks?: boolean
}
