import {
  TextEditorFormattingOption,
  Heading,
  TextEditorConfig,
  TextEditorPluginConfig,
} from '../types'
import { articleColors } from '@/helper/colors'
import { merge } from '@/serlo-editor-repo/ui'

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
  const {
    placeholder = 'Write something or add elements with \u2295.',
    i18n = {},
    noLinebreaks,
  } = config

  return {
    formattingOptions: config.formattingOptions || defaultFormattingOptions,
    placeholder,
    i18n: merge({
      fallback: {
        code: {
          toggleTitle: 'Code',
        },
        colors: {
          setColorTitle: 'Set color',
          resetColorTitle: 'Reset color',
          openMenuTitle: 'Colors',
          closeMenuTitle: 'Close sub menu',
          colorNames: textColors.map((color) => color.name),
        },
        headings: {
          setHeadingTitle(level: Heading['level']) {
            return `Heading ${level}`
          },
          openMenuTitle: 'Headings',
          closeMenuTitle: 'Close sub menu',
        },
        link: {
          toggleTitle: 'Link (Strg + K)',
          placeholder: 'Enter URL',
          openInNewTabTitle: 'Open in new tab',
        },
        list: {
          toggleOrderedList: 'Ordered list',
          toggleUnorderedList: 'Unordered list',
          openMenuTitle: 'Lists',
          closeMenuTitle: 'Close sub menu',
        },
        math: {
          toggleTitle: 'Math formula (Strg + M)',
          displayBlockLabel: 'Display as block',
          placeholder: '[formula]',
          editors: {
            visual: 'visual',
            latex: 'LaTeX',
            noVisualEditorAvailableMessage: 'Only LaTeX editor available',
          },
          helpText(
            KeySpan: React.ComponentType<{ children: React.ReactNode }>
          ) {
            return (
              <>
                Shortcuts:
                <br />
                <br />
                <p>
                  Fraction: <KeySpan>/</KeySpan>
                </p>
                <p>
                  Superscript: <KeySpan>↑</KeySpan> or <KeySpan>^</KeySpan>
                </p>
                <p>
                  Subscript: <KeySpan>↓</KeySpan> oder <KeySpan>_</KeySpan>
                </p>
                <p>
                  π, α, β, γ: <KeySpan>pi</KeySpan>, <KeySpan>alpha</KeySpan>,{' '}
                  <KeySpan>beta</KeySpan>,<KeySpan>gamma</KeySpan>
                </p>
                <p>
                  ≤, ≥: <KeySpan>{'<='}</KeySpan>, <KeySpan>{'>='}</KeySpan>
                </p>
                <p>
                  Root: <KeySpan>\sqrt</KeySpan>, <KeySpan>\nthroot</KeySpan>
                </p>
                <p>
                  Math symbols: <KeySpan>{'\\<NAME>'}</KeySpan>, e.g.{' '}
                  <KeySpan>\neq</KeySpan> (≠), <KeySpan>\pm</KeySpan> (±), ...
                </p>
                <p>
                  Functions: <KeySpan>sin</KeySpan>, <KeySpan>cos</KeySpan>,{' '}
                  <KeySpan>ln</KeySpan>, ...
                </p>
              </>
            )
          },
        },
        richText: {
          toggleStrongTitle: 'Bold (Strg + B)',
          toggleEmphasizeTitle: 'Italic (Strg + I)',
        },
        suggestions: {
          noResultsMessage: 'No items found',
        },
      },
      values: i18n,
    }),
    noLinebreaks,
  }
}
