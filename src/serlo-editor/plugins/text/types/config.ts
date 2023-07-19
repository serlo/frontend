import { Dispatch, SetStateAction } from 'react'
import { Descendant, Editor, Range } from 'slate'

import { useFormattingOptions } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/hooks/use-formatting-options'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { SerializedScalarStateType } from '@/serlo-editor/plugin'

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
  formattingOptions?: TextEditorFormattingOption[]
  noLinebreaks?: boolean
  serloLinkSearch: boolean
  controls?: InlineTextEditorControls
}
