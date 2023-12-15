import { useFormattingOptions } from '@editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { SerializedScalarStateType } from '@editor/plugin'
import { Dispatch, SetStateAction } from 'react'
import { Descendant, Editor, Range } from 'slate'

export type TextEditorState = SerializedScalarStateType<
  Descendant[],
  { value: Descendant[]; selection: Range | null }
>

export interface InlineTextEditorControls {
  editor: Editor
  textFormattingOptions: ReturnType<typeof useFormattingOptions>
  isChanged: number
  onChange: Dispatch<SetStateAction<number>>
}

export interface TextEditorConfig {
  placeholder?: string
  isInlineChildEditor?: true
  formattingOptions?: TextEditorFormattingOption[]
  noLinebreaks?: boolean
  controls?: InlineTextEditorControls
}

export interface InlineTextEditorConfig {
  placeholder?: TextEditorConfig['placeholder']
  noLinebreaks?: TextEditorConfig['noLinebreaks']
  controls: Required<InlineTextEditorControls>
}
