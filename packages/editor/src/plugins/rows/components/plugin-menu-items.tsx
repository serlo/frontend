import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import type { EditorPluginType } from '@editor/types/editor-plugin-type'

import type { PluginMenuItemType } from '../contexts/plugin-menu/types'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

function getTooltipPosition(index: number) {
  return index % 5 === 0 ? 'right' : index % 5 === 4 ? 'left' : undefined
}

export function PluginMenuItems({
  basicOptions,
  interactiveOptions,
  focusedItemIndex,
  setFocusedItemIndex,
  itemRefs,
  onInsertPlugin,
}: {
  basicOptions: PluginMenuItemType[]
  interactiveOptions: PluginMenuItemType[]
  focusedItemIndex: number | null
  setFocusedItemIndex: (index: number | null) => void
  itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
  onInsertPlugin: (pluginType: EditorPluginType) => void
}) {
  const editorStrings = useEditorStrings()

  return (
    <>
      {basicOptions.length ? (
        <>
          <h3 className="pl-6 pt-4 text-lg font-bold text-almost-black">
            {editorStrings.addPluginsModal.basicPluginsTitle}
          </h3>
          <ul className="grid grid-cols-5 gap-4 p-4">
            {renderListItems(basicOptions, 0)}
          </ul>
        </>
      ) : null}

      {interactiveOptions.length ? (
        <>
          <h3 className="pl-6 pt-1 text-lg font-bold text-almost-black">
            {editorStrings.addPluginsModal.interactivePluginsTitle}
          </h3>
          <ul className="grid grid-cols-5 gap-4 p-4">
            {renderListItems(interactiveOptions, basicOptions.length)}
          </ul>
        </>
      ) : null}
    </>
  )

  function renderListItems(options: PluginMenuItemType[], offset: number) {
    return options.map(({ pluginType, title, icon, description }, index) => {
      const currentIndex = index + offset
      const selected = currentIndex === focusedItemIndex
      const tooltipPosition = getTooltipPosition(index)
      const tooltipClassName = tooltipPosition
        ? tooltipPosition === 'left'
          ? '-right-0 [&>span]:!min-w-80'
          : ''
        : '-left-24'

      return (
        <li key={title}>
          <button
            data-qa={`plugin-suggestion-${pluginType}`}
            ref={(el) => (itemRefs.current[currentIndex] = el)}
            onClick={() => onInsertPlugin(pluginType)}
            onFocus={() => setFocusedItemIndex(currentIndex)}
            onBlur={() => setFocusedItemIndex(null)}
            onMouseEnter={() => setFocusedItemIndex(currentIndex)}
            onMouseLeave={() => {
              setFocusedItemIndex(null)
              itemRefs.current[currentIndex]?.blur()
            }}
            className={cn(
              'serlo-tooltip-trigger w-full rounded-md p-2 hover:shadow-xl',
              selected && 'shadow-xl'
            )}
          >
            <EditorTooltip className={tooltipClassName} text={description} />
            {icon || <IconFallback />}
            <b className="mt-2 block text-sm">{title}</b>
          </button>
        </li>
      )
    })
  }
}
