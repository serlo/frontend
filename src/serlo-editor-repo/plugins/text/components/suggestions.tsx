import { styled } from '../../../ui'
import type { TextEditorPluginConfig } from '../types'
import { colors } from '@/helper/colors'
import type { RegistryPlugin } from '@/serlo-editor-repo/plugins/rows'

interface SuggestionsProps {
  config: TextEditorPluginConfig
  options: RegistryPlugin[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (option: string) => void
  onMouseMove: (index: number) => void
}

const SuggestionsWrapper = styled.div({
  maxHeight: '387px',
  maxWidth: '620px',
})

const SuggestionIconWrapper = styled.div({
  border: '1px solid transparent',
  flex: '0 0 95px',
  marginRight: '12px',
  borderRadius: '3px',
  '& > svg': {
    borderRadius: '3px',
  },
})

const Suggestion = styled.div({
  padding: '10px 20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  '&:hover, &[data-active="true"]': {
    backgroundColor: colors.editorPrimary50,
    [SuggestionIconWrapper]: {
      border: '1px solid #ddd',
    },
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

export const Suggestions = ({
  config,
  options,
  suggestionsRef,
  selected,
  onMouseDown,
  onMouseMove,
}: SuggestionsProps) => {
  const { i18n } = config

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
          onMouseMove={() => {
            onMouseMove(index)
          }}
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
