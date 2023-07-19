import type { TextEditorConfig } from '../types'
import { articleColors } from '@/helper/colors'
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

export const textColors = Object.entries(articleColors).map(([key, value]) => {
  return { value, name: key.charAt(0).toUpperCase() + key.slice(1) }
})

export const useTextConfig = (config: TextEditorConfig) => ({
  formattingOptions: config.formattingOptions ?? defaultFormattingOptions,
  placeholder: config.placeholder ?? undefined,
  noLinebreaks: config.noLinebreaks ?? false,
  serloLinkSearch: config.serloLinkSearch ?? true,
  controls: config.controls ?? undefined,
})
