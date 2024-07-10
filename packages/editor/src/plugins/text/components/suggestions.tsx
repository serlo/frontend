import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { SuggestionOption } from '../hooks/use-suggestions'

interface SuggestionsProps {
  options: SuggestionOption[]
  suggestionsRef: React.MutableRefObject<HTMLDivElement | null>
  selected: number
  onMouseDown: (pluginType: string) => void
  onMouseMove: (index: number) => void
}

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
    <div ref={suggestionsRef} className="max-h-[387px] overflow-auto">
      {options.map(({ pluginType, title, description, icon }, index) => {
        return (
          <div
            key={index}
            data-qa={`plugin-suggestion-${pluginType}`}
            data-active={index === selected}
            onMouseDown={(event: React.MouseEvent) => {
              event.preventDefault()
              onMouseDown(pluginType)
            }}
            onMouseMove={() => {
              onMouseMove(index)
            }}
            className={cn(`
              group/suggestion flex cursor-pointer items-center px-5 py-2.5
              hover:bg-editor-primary-50 data-[active=true]:bg-editor-primary-50
            `)}
          >
            <div
              className={cn(`
               mr-3 flex-[0_0_95px] rounded-md border border-transparent group-hover/suggestion:border-gray-300
               group-data-[active=true]/suggestion:border-gray-300 [&>svg]:rounded-md
              `)}
            >
              {icon ?? <IconFallback />}
            </div>
            <div>
              <h5 className="text-base font-bold">{title}</h5>
              <p className="whitespace-pre-wrap text-base">{description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
