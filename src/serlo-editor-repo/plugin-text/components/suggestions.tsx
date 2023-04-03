import React from 'react'

import { styled } from '../../ui'
import type { TextEditorPluginConfig } from '../types'

interface SuggestionsProps {
  config: TextEditorPluginConfig
  options: { name: string; title?: string }[]
  currentValue: string
  selected: number
  onMouseDown: (option: string) => void
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const Suggestion = styled.div<{ isActive: boolean }>(({ isActive, theme }) => ({
  height: '32px',
  padding: '4px 8px',
  cursor: 'pointer',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  backgroundColor: isActive
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      theme.suggestions.background.highlight
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      theme.suggestions.background.default,
  borderRadius: '4px',
  '&:hover': {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    background: theme.suggestions.background.highlight,
  },
}))

const Container = styled.div({
  padding: '10px',
})

const StyledText = styled.span<{ isHighlighted: boolean }>(
  ({ isHighlighted, theme }) => ({
    color: isHighlighted
      ? theme.suggestions.text.highlight
      : theme.suggestions.text.default,
  })
)

export const Suggestions = (props: SuggestionsProps) => {
  const { config, options, currentValue, selected, onMouseDown } = props
  const { i18n, theme } = config

  if (options.length === 0) {
    return <Container>{i18n.suggestions.noResultsMessage}</Container>
  }

  return (
    <Container>
      {options.map(({ name, title }, index) => {
        const fragments = (title ?? name)
          .split(new RegExp(`(${escapeRegExp(currentValue)})`, 'i'))
          .map((text) => ({
            text,
            isHighlighted: text.toLowerCase() === currentValue.toLowerCase(),
          }))

        return (
          <Suggestion
            key={index}
            isActive={index === selected}
            onMouseDown={() => onMouseDown(name)}
            theme={theme}
          >
            {fragments.map((fragment, fragmentIndex) => (
              <StyledText
                key={fragmentIndex}
                isHighlighted={fragment.isHighlighted}
                theme={theme}
              >
                {fragment.text}
              </StyledText>
            ))}
          </Suggestion>
        )
      })}
    </Container>
  )
}
