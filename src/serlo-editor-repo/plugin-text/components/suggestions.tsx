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
  maxHeight: '387px',
  maxWidth: '620px',
})

const Suggestion = styled.div(({ theme }: { theme: Theme }) => ({
  padding: '10px 20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.suggestions.background.default,
  '&:hover, &[data-active="true"]': {
    backgroundColor: theme.suggestions.background.highlight,
    [SuggestionIconWrapper]: {
      border: '1px solid #ddd',
    },
  },
}))

const SuggestionIconWrapper = styled.div({
  border: '1px solid transparent',
  flex: '0 0 95px',
  marginRight: '12px',
  borderRadius: '3px',
  '& > svg': {
    borderRadius: '3px',
  },
})

const SuggestionTitle = styled.h5({
  fontSize: '16px',
  fontWeight: 'bold',
})

const SuggestionDescription = styled.p({
  fontSize: '16px',
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
          onMouseDown={(event: React.MouseEvent) => {
            event.preventDefault()
            onMouseDown(name)
          }}
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
