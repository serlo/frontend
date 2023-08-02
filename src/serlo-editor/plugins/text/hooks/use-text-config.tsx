import type { TextEditorConfig } from '../types'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'

const defaultFormattingOptions: TextEditorFormattingOption[] = [
  TextEditorFormattingOption.code,
  TextEditorFormattingOption.colors,
  TextEditorFormattingOption.headings,
  TextEditorFormattingOption.links,
  TextEditorFormattingOption.lists,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.richText,
]

export const useTextConfig = (config: TextEditorConfig) => ({
  formattingOptions: config.formattingOptions ?? defaultFormattingOptions,
  placeholder: config.placeholder ?? undefined,
  noLinebreaks: config.noLinebreaks ?? false,
  serloLinkSearch: config.serloLinkSearch ?? true,
  controls: config.controls ?? undefined,
  isInlineChildEditor: config.isInlineChildEditor ?? undefined,
})
