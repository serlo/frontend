import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { isMac } from '@editor/utils/client-detection'
import { cn } from '@editor/utils/cn'

export function EditorTooltip({
  text,
  hotkeys,
  className,
}: {
  text?: string
  hotkeys?: string
  className?: string
}) {
  const staticString = useStaticStrings()
  if (!text && !hotkeys) return null

  const hotkeysTranslated = hotkeys?.replace(
    '%ctrlOrCmd%',
    isMac ? '⌘' : staticString.misc.ctrl
  )

  return (
    <span
      className={cn(
        'serlo-tooltip sr-only pointer-events-none bottom-full block cursor-default opacity-0 transition-opacity',
        className
      )}
    >
      <span className="block w-80 max-w-fit rounded bg-almost-black px-2 py-1.5 text-center text-sm font-bold text-white ">
        {text}
        {hotkeys ? (
          <span className="block text-gray-300">{hotkeysTranslated}</span>
        ) : null}
      </span>
    </span>
  )
}
