import React from 'react'

import { styled } from '../../ui'
import type { TextEditorPluginConfig, Theme } from '../types'
import type { RegistryPlugin } from '@/serlo-editor-repo/plugin-rows'

interface SuggestionsProps {
  config: TextEditorPluginConfig
  options: RegistryPlugin[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (option: string) => void
}

const SuggestionsWrapper = styled.div({
  maxHeight: '200px',
  maxWidth: '300px',
})

const Suggestion = styled.div(({ theme }: { theme: Theme }) => ({
  padding: '5px 12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'start',
  backgroundColor: theme.suggestions.background.default,
  '&:hover, &[data-active="true"]': {
    backgroundColor: theme.suggestions.background.highlight,
    [SuggestionIconWrapper]: {
      border: '0.1px solid #404040',
    },
  },
}))

const SuggestionIconWrapper = styled.div({
  border: '0.1px solid transparent',
  flex: '0 0 40px',
  marginRight: '8px',
})

const SuggestionTitle = styled.h5({
  fontSize: '14px',
  fontWeight: 'bold',
})

const SuggestionDescription = styled.p({
  fontSize: '12px',
  whiteSpace: 'pre-wrap',
})

export const Suggestions = (props: SuggestionsProps) => {
  const { config, options, suggestionsRef, selected, onMouseDown } = props
  const { i18n, theme } = config

  if (options.length === 0) {
    return <div>{i18n.suggestions.noResultsMessage}</div>
  }

  return (
    <SuggestionsWrapper ref={suggestionsRef}>
      {options.map(({ name, title, description, icon: Icon }, index) => (
        <Suggestion
          key={index}
          data-active={index === selected}
          onMouseDown={() => onMouseDown(name)}
          theme={theme}
        >
          {Icon && (
            <SuggestionIconWrapper>
              <Icon />
            </SuggestionIconWrapper>
          )}
          <div>
            <SuggestionTitle>{title ?? name}</SuggestionTitle>
            <SuggestionDescription>{description}</SuggestionDescription>
          </div>
        </Suggestion>
      ))}
    </SuggestionsWrapper>
  )
}
