import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import type { PluginMenuItem } from '@editor/plugins/rows/utils/plugin-menu'
import { cn } from '@editor/utils/cn'

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

  function renderListItems(options: PluginMenuItem[], offset: number) {
    return options.map((pluginMenuItem, index) => {
      const { type, initialState, title, icon, description } = pluginMenuItem
      const currentIndex = index + offset
      const selected = currentIndex === focusedItemIndex
      const tooltipPosition = getTooltipPosition(index)
      const tooltipClassName = tooltipPosition
        ? tooltipPosition === 'left'
          ? 'right-0 [&>span]:!min-w-80'
          : ''
        : '-left-24'

      // The icon in next.js gets correctly turned into a component, in vite, we
      // want to expose the raw svg string to the packages. As this is also used
      // by the web-component, we can't expose a React component. Therefore, we
      // have to turn the string here into an svg element using
      // dangerouslySetInnerHTML. There should not be any XSS risk with this, as we
      // are loading the svgs ourselves from the assets and they can never come
      // from a user.
      const iconElement =
        typeof icon === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: icon }} />
        ) : typeof icon !== 'string' ? (
          icon()
        ) : (
          <IconFallback />
        )

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
            {iconElement}
            <b className="mt-2 block text-sm">{title}</b>
          </button>
        </li>
      )
    })
  }
}
