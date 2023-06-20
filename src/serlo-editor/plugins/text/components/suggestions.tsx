import styled from 'styled-components'

import type { SuggestionOption } from '../hooks/use-suggestions'
import IconFallback from '@/assets-webkit/img/editor/icon-fallback.svg'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { colors } from '@/helper/colors'
import {
  getPluginByType,
  usePlugins,
} from '@/serlo-editor/core/contexts/plugins-context'
import { EditorPluginType } from '@/serlo-editor/core/editor'

interface SuggestionsProps {
  options: SuggestionOption[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (pluginType: EditorPluginType) => void
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
  const plugins = usePlugins()

  if (options.length === 0) {
    return <div>{editorStrings.plugins.text.noItemsFound}</div>
  }

  return (
    <div ref={suggestionsRef} className="max-h-[387px] max-w-[620px]">
      {options.map(({ pluginType, title, description }, index) => {
        const Icon = getPluginByType(plugins, pluginType)?.icon ?? (
          <IconFallback />
        )
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
            <SuggestionIconWrapper>{Icon}</SuggestionIconWrapper>
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
