import { useInstanceData } from '@/contexts/instance-context'
import { isMac } from '@/helper/client-detection'

export function EditorTooltip({
  text,
  hotkeys,
}: {
  text?: string
  hotkeys?: string
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
      className="serlo-tooltip pointer-events-none opacity-0 transition-opacity hover:block absolute cursor-default bottom-full pb-[0.7rem]"
      onClick={blockEvent}
      onMouseDown={blockEvent}
      onMouseUp={blockEvent}
    >
      <span className="block text-sm font-bold bg-almost-black py-1.5 px-2 rounded z-50 text-center text-white w-80 max-w-fit ">
        {text}
        {hotkeys ? (
          <span className="block text-gray-400">{hotkeysTranslated}</span>
        ) : null}
      </span>
    </span>
  )
}
