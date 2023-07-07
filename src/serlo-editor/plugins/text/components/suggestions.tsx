import styled from 'styled-components'

import type { SuggestionOption } from '../hooks/use-suggestions'
import IconFallback from '@/assets-webkit/img/editor/icon-fallback.svg'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { colors } from '@/helper/colors'

interface SuggestionsProps {
  options: SuggestionOption[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (pluginType: string) => void
  onMouseMove: (index: number) => void
}

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

export const Suggestions = ({
  options,
  suggestionsRef,
  selected,
  onMouseDown,
  onMouseMove,
}: SuggestionsProps) => {
  const editorStrings = useEditorStrings()

  if (options.length === 0) {
    return <div>{editorStrings.plugins.text.noItemsFound}</div>
  }

  return (
    <div ref={suggestionsRef} className="max-h-[387px] max-w-[620px]">
      {options.map(({ pluginType, title, description, icon }, index) => {
        return (
          <Suggestion
            key={index}
            data-active={index === selected}
            onMouseDown={(event: React.MouseEvent) => {
              event.preventDefault()
              onMouseDown(pluginType)
            }}
            onMouseMove={() => {
              onMouseMove(index)
            }}
          >
            <SuggestionIconWrapper>
              {icon ?? <IconFallback />}
            </SuggestionIconWrapper>
            <div>
              <h5 className="text-base font-bold">{title}</h5>
              <p className="whitespace-pre-wrap text-base">{description}</p>
            </div>
          </Suggestion>
        )
      })}
    </div>
  )
}
