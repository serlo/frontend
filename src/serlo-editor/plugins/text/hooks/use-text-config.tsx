import type { TextEditorConfig, TextEditorPluginConfig } from '../types'
import { articleColors } from '@/helper/colors'
import { TextEditorFormattingOption } from '@/serlo-editor/core/plugin-toolbar/text-controls/types'

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

export function useTextConfig(
  config: TextEditorConfig
): TextEditorPluginConfig {
  const { placeholder, noLinebreaks, controls } = config

  return {
    formattingOptions: config.formattingOptions ?? defaultFormattingOptions,
    placeholder,
    noLinebreaks,
    serloLinkSearch: config.serloLinkSearch ?? true,
    controls,
  }
}
