import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { colors } from '@/helper/colors'
import type { RegistryPlugin } from '@/serlo-editor/plugins/rows'
import { styled } from '@/serlo-editor/ui'

interface SuggestionsProps {
  options: RegistryPlugin[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (option: string) => void
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
    return <div>{editorStrings.text.noItemsFound}</div>
  }

  return (
    <div ref={suggestionsRef} className="max-h-[387px] max-w-[620px]">
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
          {Icon && <SuggestionIconWrapper>{Icon}</SuggestionIconWrapper>}
          <div>
            <h5 className="text-base font-bold">{title ?? name}</h5>
            <p className="whitespace-pre-wrap text-base">{description}</p>
          </div>
        </Suggestion>
      ))}
    </div>
  )
}
