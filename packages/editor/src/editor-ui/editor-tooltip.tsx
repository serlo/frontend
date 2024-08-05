import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { isMac } from '@serlo/frontend/src/helper/client-detection'
import { cn } from '@serlo/frontend/src/helper/cn'

export function EditorTooltip({
  text,
  hotkeys,
  className,
  position = 'top',
}: {
  text?: string
  hotkeys?: string
  className?: string
  position?: 'top' | 'right' | 'left' | 'down'
}) {
  const { strings } = useInstanceData()
  if (!text && !hotkeys) return null

  const hotkeysTranslated = hotkeys?.replace(
    '%ctrlOrCmd%',
    isMac ? '⌘' : strings.keys.ctrl
  )

  const positionClasses = {
    top: 'bottom-full mb-2.5',
    right: 'left-full top-1/3 transform -translate-y-1/3 translate-x-2.5',
    left: 'right-full top-1/3 transform -translate-y-1/3 -translate-x-2.5',
    down: 'top-full mt-2.5',
  }

  return (
    <span
      className={cn(
        'serlo-tooltip sr-only pointer-events-none block cursor-default opacity-0 transition-opacity',
        positionClasses[position],
        className
      )}
    >
      <span className="block w-80 max-w-fit rounded bg-almost-black px-2 py-1.5 text-center text-sm font-bold text-white">
        {text}
        {hotkeys ? (
          <span className="block text-gray-300">{hotkeysTranslated}</span>
        ) : null}
      </span>
    </span>
  )
}
