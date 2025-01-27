import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import type { PluginMenuItem } from '@editor/plugins/rows/utils/plugin-menu'
import { cn } from '@editor/utils/cn'

function getTooltipPosition(index: number) {
  return index % 5 === 0 ? 'right' : index % 5 === 4 ? 'left' : undefined
}

export function PluginMenuItems({
  mockOptions,
  basicOptions,
  interactiveOptions,
  focusedItemIndex,
  setFocusedItemIndex,
  itemRefs,
  onInsertPlugin,
}: {
  mockOptions: PluginMenuItem[]
  basicOptions: PluginMenuItem[]
  interactiveOptions: PluginMenuItem[]
  focusedItemIndex: number | null
  setFocusedItemIndex: (index: number | null) => void
  itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
  onInsertPlugin: (pluginType: PluginMenuItem) => void
}) {
  const editorStrings = useEditStrings()

  return (
    <>
      {mockOptions.length ? (
        <>
          <h3 className="pl-6 pt-4 text-lg font-bold text-almost-black">
            Bestehende Inhalte
          </h3>
          <ul className="grid grid-cols-5 gap-4 p-4">
            {renderListItems(mockOptions, 0)}
          </ul>
        </>
      ) : null}
      {basicOptions.length ? (
        <>
          <h3 className="pl-6 pt-4 text-lg font-bold text-almost-black">
            {editorStrings.addPluginsModal.basicPluginsTitle}
          </h3>
          <ul className="grid grid-cols-5 gap-4 p-4">
            {renderListItems(basicOptions, mockOptions.length)}
          </ul>
        </>
      ) : null}

      {interactiveOptions.length ? (
        <>
          <h3 className="pl-6 pt-1 text-lg font-bold text-almost-black">
            {editorStrings.addPluginsModal.interactivePluginsTitle}
          </h3>
          <ul className="grid grid-cols-5 gap-4 p-4">
            {renderListItems(
              interactiveOptions,
              mockOptions.length + basicOptions.length
            )}
          </ul>
        </>
      ) : null}
    </>
  )

  function renderListItems(options: PluginMenuItem[], offset: number) {
    return options.map((pluginMenuItem, index) => {
      const { type, initialState, title, IconComponent, description } =
        pluginMenuItem
      const currentIndex = index + offset
      const selected = currentIndex === focusedItemIndex
      const tooltipPosition = getTooltipPosition(index)
      const tooltipClassName = tooltipPosition
        ? tooltipPosition === 'left'
          ? 'right-0 [&>span]:!min-w-80'
          : ''
        : '-left-24'

      return (
        <li key={type}>
          <button
            data-qa={`plugin-suggestion-${initialState.plugin}`}
            ref={(el) => (itemRefs.current[currentIndex] = el)}
            onClick={() => onInsertPlugin(pluginMenuItem)}
            onFocus={() => setFocusedItemIndex(currentIndex)}
            onBlur={() => setFocusedItemIndex(null)}
            className={cn(
              'serlo-tooltip-trigger w-full rounded-md p-2 hover:shadow-xl',
              selected && 'shadow-xl'
            )}
          >
            <EditorTooltip className={tooltipClassName} text={description} />
            <IconComponent />
            <b className="mt-2 block text-sm">{title}</b>
          </button>
        </li>
      )
    })
  }
}
