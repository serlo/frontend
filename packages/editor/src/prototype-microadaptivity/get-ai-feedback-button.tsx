import { PrototypeStateStore } from '@editor/plugins/text-area-exercise/prototype-state'
import { cn } from '@editor/utils/cn'

export function GetAiFeedbackButton() {
  const silentmode = PrototypeStateStore.useState((s) => s.silentMode)
  return (
    <button
      className={cn(
        'z-1000 fixed bottom-5 right-5 flex flex-row items-center gap-3 rounded-md bg-purple-200 px-6 py-3 font-bold hover:cursor-pointer hover:bg-purple-300',
        silentmode && 'hidden'
      )}
    >
      KI Tutor
      <img src="/_assets/img/birdie.svg" className="max-w-6" />
    </button>
  )
}
