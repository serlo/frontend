import { FaIcon } from '@editor/editor-ui/fa-icon'
import { PrototypeStateStore } from '@editor/plugins/text-area-exercise/prototype-state'
import { cn } from '@editor/utils/cn'
import { faComment } from '@fortawesome/free-regular-svg-icons'

export function GetAiFeedbackButton() {
  const silentmode = PrototypeStateStore.useState((s) => s.silentMode)
  return (
    <button
      className={cn(
        'z-1000 fixed bottom-3 right-3 flex  flex-row items-center gap-2 rounded-md bg-purple-100 px-4 py-2 text-sm font-bold hover:cursor-pointer hover:bg-purple-200',
        silentmode && 'hidden'
      )}
    >
      {/* <FaIcon icon={faComment} /> */}
      Sprich mit
      <img src="/_assets/img/birdie.svg" className="max-w-6" />
    </button>
  )
}
