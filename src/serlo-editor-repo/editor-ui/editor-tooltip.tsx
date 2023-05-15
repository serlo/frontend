import clsx from 'clsx'

import { useInstanceData } from '@/contexts/instance-context'
import { isMac } from '@/helper/client-detection'

export function EditorTooltip({
  text,
  hotkeys,
  className,
  hideOnHover,
}: {
  text?: string
  hotkeys?: string
  className?: string
  hideOnHover?: boolean
}) {
  const { strings } = useInstanceData()
  if (!text && !hotkeys) return null

  const hotkeysTranslated = hotkeys?.replace(
    '%ctrlOrCmd%',
    isMac ? '⌘' : strings.keys.ctrl
  )

  const blockEvent = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <span
      className={clsx(
        'serlo-tooltip block pointer-events-none opacity-0 transition-opacity sr-only cursor-default bottom-full pb-[0.7rem]',
        hideOnHover
          ? '!pointer-events-none'
          : 'hover:not-sr-only hover:absolute',
        className
      )}
      onClick={blockEvent}
      onMouseDown={blockEvent}
      onMouseUp={blockEvent}
    >
      <span className="block text-sm font-bold bg-almost-black py-1.5 px-2 rounded z-50 text-center text-white w-80 max-w-fit ">
        {text}
        {hotkeys ? (
          <span className="block text-gray-300">{hotkeysTranslated}</span>
        ) : null}
      </span>
    </span>
  )
}
